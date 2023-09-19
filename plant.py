from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_restx import Api, Resource, fields
import requests
import json
import mysql.connector
import base64
from config import Config
from PIL import Image
from io import BytesIO
import requests
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app, expose_headers=["api_key"])
app.config.from_object(Config)
api = Api(app, version='1.0', title='Image Recognition API', description='An API for image recognition')
# ns = api.namespace('recognition', description='Recognition operations')

# 验证API密钥
def validate_api_key(api_key):
    # if api_key != Config.API_KEY :
    #    return False
    return True

# 调用百度API进行图片识别
def baidu_image_recognition(image_data, object_type):
    type_dict = {'Plant': 'plant', 'Cat': 'animal', 'Dog': 'animal'}
    itype = type_dict[object_type]
    request_url = f"https://aip.baidubce.com/rest/2.0/image-classify/v1/{itype}"

    img = base64.b64encode(image_data)
    API_KEY = 'i23a3ushd123egiqwuoasqw2378qer12132'

    params = {"image": img}
    access_token = Config.Access_token
    request_url = request_url + "?access_token=" + access_token
    headers = {'content-type': 'application/x-www-form-urlencoded'}
    response = requests.post(request_url, data=params, headers=headers)
    if response.status_code == 200:
        response_json = response.json()
        highest_score_result = max(response_json['result'], key=lambda x: float(x['score']))
        name = highest_score_result['name']
        if object_type == 'Plant':
            tree_dict = {
                "柏": "柏树",
                "松": "松树",
                "黄杨": "黄杨",
                "桤": "桤木",
                "桦": "桦",
                "梣": "梣",
                "白蜡": "梣",
                "柳": "柳树",
                "榆": "榆树",
                "榄": "橄榄",
                "桑": "桑树",
                "楝": "楝",
                "小麦": "小麦",
                "玉米": "玉米",
                "稻": "稻",
                "黑麦 ": "黑麦",
                "大麦": "大麦",
                "燕麦": "燕麦",
                "云杉": "云杉",
                "冷杉": "冷杉",
                "杨": "杨树",
                "核桃": "山核桃",
                "毛茛": "毛茛",
                "菊": "菊",
                "荨麻": "荨麻",
                "墙草": "荨麻",
                "车前": "车前",
                "二球悬铃木": "二球悬铃木"

            }

            for key, value in tree_dict.items():
                if key in name:
                    print(value)
                    return value
            print(name)
            return name

        return name
    else:
        print(f"Failed to get response from Baidu API. Status code: {response.status_code}")
        return None


# 调用谷歌API进行图片识别
def analyze_image(image_data):
    try:
        # img = base64.b64encode(image_data)
        img = base64.b64encode(image_data).decode("utf-8")  # Decode bytes to UTF-8 string

        # Google Cloud Vision API
        GOOGLE_CLOUD_VISION_API_KEY = Config.GOOGLE_CLOUD_VISION_API_KEY
        google_vision_url = f"https://vision.googleapis.com/v1/images:annotate?key={GOOGLE_CLOUD_VISION_API_KEY}"

        # Prepare the request payload
        google_vision_payload = {
            "requests": [
                {
                    "image": {"content": img},
                    "features": [{"type": "LABEL_DETECTION", "maxResults": 50}],
                }
            ]
        }

        # Perform Google Vision API call
        google_vision_response = requests.post(google_vision_url, json=google_vision_payload)
        google_api_response = json.loads(google_vision_response.text)

        labels = google_api_response['responses'][0]['labelAnnotations']
        filtered_labels = [label for label in labels if label['score'] > 0.6]
        label_info = [{"description": label["description"], "score": label["score"]} for label in filtered_labels]

        print(label_info)
        return label_info

    except Exception as e:
        print(f"Error analyzing image: {e}")
        return None




def get_info_from_db(recognized_labels):
    mydb = mysql.connector.connect(
        host=Config.DB_HOST,
        user=Config.DB_USER,
        passwd=Config.DB_PASSWORD,
        database=Config.DB_NAME
    )
    cursor = mydb.cursor()
    cursor.execute("SELECT name, objdes FROM Object")
    db_data = cursor.fetchall()

    db_names = [{"name": name, "objdes": objdes} for name, objdes in db_data]

    # Filter recognized labels
    matched_labels = [label for label in recognized_labels if
                      any(db_obj['name'].lower() == label['description'].lower() for db_obj in db_names)]

    # Enrich the labels
    enriched_labels = []
    for label in matched_labels:
        db_obj = next((db for db in db_names if db['name'].lower() == label['description'].lower()), None)

        # Step 5: Additional transformations
        if label['description'] == 'Shower':
            label['description'] = 'Shower - Mould'
        elif label['description'] == 'Sinks':
            label['description'] = 'Sinks - Mould'

        enriched_label = {
            'name': label['description'],
            'score': label['score'],
            'objdes': db_obj['objdes'] if db_obj else ''
        }
        enriched_labels.append(enriched_label)

    return enriched_labels

# 从MySQL数据库获取植物信息
def get_plant_info_from_db(plant_chinese_name, object_type):
    mydb = mysql.connector.connect(
        host=Config.DB_HOST,
        user=Config.DB_USER,
        passwd=Config.DB_PASSWORD,
        database=Config.DB_NAME
    )
    cursor = mydb.cursor()
    if object_type == 'Cat':
        query = "SELECT name, objdes, imageurl, safe FROM Cat_new WHERE chinese_name=%s"
        cursor.execute(query, (plant_chinese_name,))
        result = cursor.fetchone()
        if result:
            name, des, imageurl, safe = result
            return {"name": name, "description": des, "imageurl": imageurl, "safe": safe}
        else:
            return None
    elif object_type == 'Dog':
        query = "SELECT name, objdes, imageurl, safe FROM Dog_new WHERE chinese_name=%s"
        cursor.execute(query, (plant_chinese_name,))
        result = cursor.fetchone()
        if result:
            name, des, imageurl, safe = result

            return {"name": name, "description": des, "imageurl": imageurl, "safe": safe}
        else:
            return None
    else:
        query = "SELECT name, objdes, imageurl FROM {} WHERE chinese_name=%s".format(object_type)
        cursor.execute(query, (plant_chinese_name,))
        result = cursor.fetchone()
        if result:
            name, des, imageurl = result  # Unpacked tuple
            return {"name": name, "description": des, "imageurl": imageurl}
        else:
            return None


def valid_image(image_file):
    is_image = True
    print(image_file)
    try:
        # 检查文件类型
        filename = secure_filename(image_file.filename)

        if not filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            print(99)
            return False

        if not image_file.content_type.startswith('image/'):
            print(2)
            return False

        # 检查文件大小 (4MB = 4 * 1024 * 1024 Bytes)
        image_size = len(image_file.read())
        if image_size > 4 * 1024 * 1024:
            print(3)
            return False

        # 检查图片尺寸和长宽比
        image_file.seek(0)
        image_data = image_file.read()
        image = Image.open(BytesIO(image_data))
        width, height = image.size
        aspect_ratio = width / height

        if min(width, height) < 30:
            return False
        if max(width, height) > 4096:
            return False
        if aspect_ratio > 3 or aspect_ratio < 1 / 3:
            return False

        return is_image

    except Exception as e:

        return False


@api.route('/image_recognition')
class ImageRecognition(Resource):
    @api.doc(params={'api_key': 'Your API key', 'type': 'Type of object to recognize (Plant, Cat, Dog)', 'image': 'The image file'})

    def post(self):
        # print(request.headers)
        # print(request.form)
        api_key = request.headers.get('api_key')
        # print(f"API Key: {api_key}")
        if api_key is None:
            api_key = request.form.get('key')
        if api_key is None:
            api_key = request.headers.get('API-Key')
        object_type = request.form.get('type')
        # print(f"API Key: {api_key}, Object Type: {object_type}")

        if not validate_api_key(api_key):
            return {"error": "Invalid API Key"}, 401

        if object_type not in ['Plant', 'Cat', 'Dog']:
            return {"error": "Invalid type provided", "status": "failure"}, 400

        # print(object_type)
        image_file = request.files.get('image')

        if image_file:

            if not valid_image(image_file):
                return {"error": "File verification failed. Supported formats: PNG, JPG, JPEG. "
                                         "Please make sure the file size does not exceed 3.5M."}, 400

            # 重新定位文件指针，以便再次读取文件内容
            image_file.seek(0)
            image_data = image_file.read()

            recognized_name = baidu_image_recognition(image_data, object_type)
            print(f"Recognized Name: {recognized_name}")

            if recognized_name == "非动物":
                return {"error": "No animal found in the picture. Please check your images and try again."}, 404
            elif recognized_name == "非植物":
                return {"error": "No plant found in the picture. Please check your images and try again."}, 404

            plant_info = get_plant_info_from_db(recognized_name, object_type)
            # print(f"Plant Info: {plant_info}")

            if plant_info:
                return plant_info, 200  # Directly return the dictionary

            else:
                if object_type == 'Plant':
                    return {"error": "No high-risk plants were found."}, 404
                elif object_type == 'Cat':
                    return {"error": "Sorry, our model has not yet collected data for this breed."}, 404
                else:
                    return {"error": "Sorry, our model has not yet collected data for this breed."}, 404
        else:
            return {"error": "No image provided"}, 400


@api.route('/image_general')
class GeneralImageRecognition(Resource):

    def post(self):

        api_key = request.headers.get('api_key')
        if api_key is None:
            api_key = request.form.get('key')
        if api_key is None:
            api_key = request.headers.get('API-Key')
        object_type = request.form.get('type')

        if not validate_api_key(api_key):
            return {"error": "Invalid API Key"}, 401


        image_file = request.files.get('image')
        if image_file:
            # 检查文件类型
            if not valid_image(image_file):
                return {"error": "File verification failed. Supported formats: PNG, JPG, JPEG. "
                                 "Please make sure the file size does not exceed 3.5M."}, 400
            # 重新定位文件指针，以便再次读取文件内容
            image_file.seek(0)
            image_data = image_file.read()
            recognized_labals = analyze_image(image_data)
            iteminfo = get_info_from_db(recognized_labals)



            if iteminfo:
                return iteminfo, 200  # Directly return the dictionary

            else:
                return {"error": "Sorry, no asthma trigger found in the picture."}, 404
        else:
            return {"error": "No image provided"}, 400




if __name__ == '__main__':
    app.run(debug=True)




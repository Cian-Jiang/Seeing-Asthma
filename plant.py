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
                    "features": [{"type": "LABEL_DETECTION", "maxResults": 80}],
                }
            ]
        }

        # Perform Google Vision API call
        google_vision_response = requests.post(google_vision_url, json=google_vision_payload)
        google_api_response = json.loads(google_vision_response.text)

        labels = google_api_response['responses'][0]['labelAnnotations']
        # print(labels)
        filtered_labels = [label for label in labels if label['score'] > 0.5]
        label_info = [{"description": label["description"], "score": label["score"]} for label in filtered_labels]

        # print(label_info)
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
    print(object_type)
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
        query = "SELECT name, objdes, imageurl, safe FROM Plant_new WHERE chinese_name=%s"
        cursor.execute(query, (plant_chinese_name,))
        result = cursor.fetchone()
        if result:
            name, des, imageurl, safe = result  # Unpacked tuple
            return {"name": name, "description": des, "imageurl": imageurl, "safe": safe}
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
    @api.doc(params={'api_key': 'Your API key', 'type': 'Type of object to recognize (Plant, Cat, Dog)',
                     'image': 'The image file'})
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
    @api.doc(
        description="General triggers recognition of an image",
        params={
            'api_key': 'API key for authorization',
            'type': 'Type of object',
            'image': 'The image file'
        }
    )
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


def get_bound(image_data, object_type):
    try:

        img = base64.b64encode(image_data).decode("utf-8")  # Decode bytes to UTF-8 string

        # Google Cloud Vision API
        GOOGLE_CLOUD_VISION_API_KEY = Config.GOOGLE_CLOUD_VISION_API_KEY
        google_vision_url = f"https://vision.googleapis.com/v1/images:annotate?key={GOOGLE_CLOUD_VISION_API_KEY}"

        # Prepare the request payload
        google_vision_payload = {
            "requests": [
                {
                    "image": {"content": img},
                    "features": [{"type": "OBJECT_LOCALIZATION", "maxResults": 50}],
                }
            ]
        }

        # Perform Google Vision API call
        google_vision_response = requests.post(google_vision_url, json=google_vision_payload)
        google_api_response = json.loads(google_vision_response.text)
        print(google_api_response)

        bounding_polys = []
        object_type = ["Cat", "Dog", "Plant"]

        for obj in google_api_response['responses'][0]['localizedObjectAnnotations']:

            if obj['name'] in object_type:
                bounding_polys.append([obj['name'], obj['boundingPoly']['normalizedVertices']])

        return bounding_polys



    except Exception as e:
        print(f"Error analyzing image: {e}")
        return None


@api.route('/all_in_one')
class test(Resource):
    @api.doc(
        description="Perform multiple analyses on a single image",
        params={
            'api_key': 'API key for authorization',
            'image': 'The image file'
        }
    )
    def post(self):

        api_key = request.headers.get('api_key')
        if api_key is None:
            api_key = request.form.get('key')
        if api_key is None:
            api_key = request.headers.get('API-Key')

        if not validate_api_key(api_key):
            return {"error": "Invalid API Key"}, 401

        image_file = request.files.get('image')
        if image_file:
            # 检查文件类型
            if not valid_image(image_file):
                return {"error": "File verification failed. Supported formats: PNG, JPG, JPEG. "
                                 "Please make sure the file size does not exceed 3.5M."}, 400

            image_file.seek(0)
            image_data = image_file.read()
            recognized_labals = analyze_image(image_data)
            iteminfo = get_info_from_db(recognized_labals)
            print(iteminfo)

            if not iteminfo:
                return {"error": "Sorry, no asthma trigger found in the picture."}, 404

            search_terms = ["Cat", "Dog", "Plant"]
            object_type = []
            for item in iteminfo:
                for term in search_terms:
                    if term.lower() in item['name'].lower():
                        object_type.append(term)

            obj = []
            bounding_polys = get_bound(image_data, object_type)

            if bounding_polys:
                obj = crop_and_encode(image_data, bounding_polys)
                # print(bounding_polys)

            if iteminfo:
                return {"iteminfo": iteminfo,
                        "obj": obj
                        }, 200  # Directly return the dictionary


            else:
                return {"error": "Sorry, no asthma trigger found in the picture."}, 404
        else:
            return {"error": "No image provided"}, 400


def crop_and_encode(image_data, bounding_polys):
    # Load the image from image_data
    image = Image.open(BytesIO(image_data))
    width, height = image.size

    objs = []
    for obj in bounding_polys:
        print(obj)
        # Extract coordinates from bounding_poly
        min_x = min(vertex['x'] for vertex in obj[1])
        max_x = max(vertex['x'] for vertex in obj[1])
        min_y = min(vertex['y'] for vertex in obj[1])
        max_y = max(vertex['y'] for vertex in obj[1])

        # Calculate pixel coordinates
        left, upper, right, lower = min_x * width, min_y * height, max_x * width, max_y * height

        # Crop the image
        cropped_image = image.crop((left, upper, right, lower))

        # # Convert the cropped image to base64
        buffered = BytesIO()
        cropped_image.save(buffered, format="PNG")

        recognized_name = baidu_image_recognition(buffered.getvalue(), obj[0])
        print(recognized_name)
        obj_info = get_plant_info_from_db(recognized_name, obj[0])
        print(obj_info)
        if obj_info:
            obj_info['image'] = base64.b64encode(buffered.getvalue()).decode("utf-8")
            obj[1] = obj_info
            objs.append(obj_info)

    return objs


@api.route('/recipe_video')
class GetYoutubeVideo(Resource):
    @api.doc(
        description="Fetch YouTube videos based on recipe ingredients",
        params={
            'api_key': 'API key for authorization',
            'ingredients': 'The ingredients to search for in the recipe videos'
        }
    )

    def post(self):
        """
        Fetch YouTube videos based on recipe ingredients.
        This endpoint returns a list of YouTube video information based on the provided recipe ingredients.

        :returns: A list of dictionaries containing video title, description, thumbnail URL, and video URL.
        :rtype: list
        """
        api_key = request.headers.get('api_key')
        if api_key is None:
            api_key = request.form.get('key')
        if api_key is None:
            api_key = request.headers.get('API-Key')

        if not validate_api_key(api_key):
            return {"error": "Invalid API Key"}, 401

        query = ' recipe,' + request.form.get('ingredients')

        GOOGLE_CLOUD_API_KEY = Config.GOOGLE_CLOUD_VISION_API_KEY

        google_vision_url = f"https://youtube.googleapis.com/youtube/v3/search?key={GOOGLE_CLOUD_API_KEY}&part=snippet&q={query}&type=video"

        # Perform Google Vision API call
        response = requests.get(google_vision_url)
        if response.status_code != 200:
            return {"error": "YouTube API request failed"}, response.status_code
        google_api_response = json.loads(response.text)
        print(google_api_response)

        video_info_list = []

        for item in google_api_response.get('items', []):
            title = item['snippet']['title']
            description = item['snippet']['description']
            thumbnail_url = item['snippet']['thumbnails']['high']['url']
            video_url = f"https://www.youtube.com/watch?v={item['id']['videoId']}"

            video_info = {
                "title": title,
                "description": description,
                "thumbnailUrl": thumbnail_url,
                "videoUrl": video_url
            }

            # 将当前视频的信息添加到列表中
            video_info_list.append(video_info)

        return {"videos": video_info_list}, 200


@api.route('/image_test')
class ImageTest(Resource):
    @api.doc(
        description="Test recognition of an image",
        params={
            'api_key': 'API key for authorization',
            'type': 'Type of object to recognize (Plant, Cat, Dog)',
            'image': 'The image file'
        }
    )
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

            # plant_info = get_plant_info_from_db(recognized_name, object_type)
            # print(f"Plant Info: {plant_info}")

            if recognized_name:
                return recognized_name, 200  # Directly return the dictionary

            else:
                if object_type == 'Plant':
                    return {"error": "No high-risk plants were found."}, 404
                elif object_type == 'Cat':
                    return {"error": "Sorry, our model has not yet collected data for this breed."}, 404
                else:
                    return {"error": "Sorry, our model has not yet collected data for this breed."}, 404
        else:
            return {"error": "No image provided"}, 400


if __name__ == '__main__':
    app.run(debug=True)

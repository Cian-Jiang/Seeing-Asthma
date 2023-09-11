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

app = Flask(__name__)
CORS(app)
app.config.from_object(Config)
api = Api(app, version='1.0', title='Image Recognition API', description='An API for image recognition')
# ns = api.namespace('recognition', description='Recognition operations')

# 验证API密钥
def validate_api_key(api_key):
    if api_key != Config.API_KEY :
        return False
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
        return highest_score_result['name']
    else:
        print(f"Failed to get response from Baidu API. Status code: {response.status_code}")
        return None


# 从MySQL数据库获取植物信息
def get_plant_info_from_db(plant_chinese_name, object_type):
    mydb = mysql.connector.connect(
        host=Config.DB_HOST,
        user=Config.DB_USER,
        passwd=Config.DB_PASSWORD,
        database=Config.DB_NAME
    )
    cursor = mydb.cursor()
    # cursor.execute(f"SELECT name, objdes, imageurl FROM {object_type} WHERE Chinesename='{plant_chinese_name}'")
    query = "SELECT name, objdes, imageurl FROM {} WHERE chinese_name=%s".format(object_type)
    cursor.execute(query, (plant_chinese_name,))
    result = cursor.fetchone()
    if result:
        name, des, imageurl = result  # Unpacked tuple
        return {"name": name, "description": des, "imageurl": imageurl}
    else:
        return None

@api.route('/image_recognition')
class ImageRecognition(Resource):
    @api.doc(params={'api_key': 'Your API key', 'type': 'Type of object to recognize (Plant, Cat, Dog)', 'image': 'The image file'})

    def post(self):

        api_key = request.form.get('api_key')
        if api_key is None:
            api_key = request.headers.get('api_key')
        object_type = request.form.get('type')
        print(f"API Key: {api_key}, Object Type: {object_type}")

        if not validate_api_key(api_key):
            return {"error": "Invalid API Key"}, 401

        if object_type not in ['Plant', 'Cat', 'Dog']:
            return {"error": "Invalid type provided", "status": "failure"}, 400
        # print(object_type)
        image_file = request.files.get('image')
        if image_file:
            # 检查文件类型
            if not image_file.content_type.startswith('image/'):
                return jsonify({"error": "File is not an image"}), 400

            # 检查文件大小 (4MB = 4 * 1024 * 1024 Bytes)
            image_size = len(image_file.read())
            if image_size > 4 * 1024 * 1024:
                return jsonify({"error": "Image size exceeds 4MB"}), 400

            # 重新定位文件指针，以便再次读取文件内容
            image_file.seek(0)
            image_data = image_file.read()

            # 检查图片尺寸和长宽比
            image = Image.open(BytesIO(image_data))
            width, height = image.size
            aspect_ratio = width / height

            if min(width, height) < 30:
                return jsonify({"error": "Minimum dimension should be at least 30px"}), 400
            if max(width, height) > 4096:
                return jsonify({"error": "Maximum dimension should not exceed 4096px"}), 400
            if aspect_ratio > 3 or aspect_ratio < 1 / 3:
                return jsonify({"error": "Aspect ratio should be within 3:1"}), 400

            recognized_name = baidu_image_recognition(image_data, object_type)
            # print(f"Recognized Name: {recognized_name}")

            plant_info = get_plant_info_from_db(recognized_name, object_type)
            # print(f"Plant Info: {plant_info}")

            if plant_info:
                return plant_info, 200  # Directly return the dictionary

            else:
                return {"error": "Object not found in database"}, 404
        else:
            return {"error": "No image provided"}, 400

if __name__ == '__main__':
    app.run(debug=True)




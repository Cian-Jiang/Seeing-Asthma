from flask import Config
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

class Config(Config):
    enable_debug = True
    enable_utc = True
    APP_NAME = 'Seeing Asthma API'
    DB_HOST = 'database-1.cbycmzyztg27.us-east-1.rds.amazonaws.com'
    DB_HOST2 = 'tab09.mysql.database.azure.com'
    DB_USER = 'cianjiang597'
    DB_PASSWORD = 'Fk6DJEwzPY7x'
    DB_NAME = 'MAINDB'
    API_KEY = 'i23a3ushd123egiqwuoasqw2378qer12132'
    # Access_token = '24.33182af21a7c4c00a218ddad1bf0597e.2592000.1697022514.282335-39169061'
    Access_token = "24.38a016ddf193e1c64cc4a0b97c4663a7.2592000.1699656799.282335-39169061"



    GOOGLE_CLOUD_VISION_API_KEY = 'AIzaSyDSixvrSvxTKMKdd0rYO3ogivqSGdlqoRI'


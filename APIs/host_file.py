# create a server that hosts a file images/image.jpeg and third party get the file using a REST API get request

from flask import Flask, send_file
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

class HostFile(Resource):
    def get(self):
        return send_file('../images/image.jpeg', mimetype='image/jpeg')


api.add_resource(HostFile, '/')
if __name__ == '__main__':
    app.run(debug=True)
    
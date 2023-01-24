# This example uses the Python Requests Library and you will need to install requests package for python
# Documentation can be found at http://docs.python-requests.org/en/master/user/quickstart/
import requests
import pprint
import json


# Specify the Endpoint URL replacing instance with your ServiceNow Instance Name
url = 'https://dev77855.service-now.com/api/now/attachment/upload'


# Specify Parameters for File Being Uploaded, the table_name and table_sys_id should be replaced with values that make
# sense for your use case
payload = {'table_name': 'incident',
           'table_sys_id': 'beae271f97f71110232f341e6253afbb'}


# Specify Files To Send and Content Type. When specifying fles to send make sure you specify the path to the file, in
# this example the file was located in the same directory as the python script being executed.
# it is important to specify the correct file type

# https: // developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
# files types can be found here

files = {'file': ('image.jpeg', open(
    '../images/image.jpeg', 'rb'), 'image/jpg', {'Expires': '0'})}

# files = {'file': ('report.xls', open('report.xls', 'rb'),
#                   'application/vnd.ms-excel', {'Expires': '0'})}


# Eg. User name="username", Password="password" for this code sample. This will be sent across as basic authentication
user = 'Hafiz Awais'
pwd = 'Allah786@'


# Set the proper headers
headers = {"Accept": "*/*"}


# Send the HTTP request
response = requests.post(url, auth=(user, pwd),
                         headers=headers, files=files, data=payload, timeout=None)


# Check for HTTP codes other than 201
if response.status_code != 201:
    print('Status:', response.status_code, 'Headers:',
          response.headers, 'Error Response:', response.json())
    exit()


# Print Resopnse Details
print('Response Status Code:', response.status_code)


print('')
print('Reponse Payload:')
print(json.dumps(response.json(), indent=4))

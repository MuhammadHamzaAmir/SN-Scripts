#Need to install requests package for python
#easy_install requests
import requests

# Set the request parameters
url = 'https://<INSTANCE_URL/api/now/attachment/7f69ed7f07232110ab46f1d08c1ed088/file'

# Eg. User name="admin", Password="admin" for this code sample.
user = 'admin'
pwd = "<Password>"

# Set proper headers
headers = {"Content-Type": "text/html", "Accept": "*/*"}

# Do the HTTP request
response = requests.get(url, auth=(user, pwd), headers=headers)

# Check for HTTP codes other than 200
if response.status_code != 200:
    print('Status:', response.status_code, 'Headers:',
          response.headers, 'Error Response:', response.json())
    exit()

# Decode the JSON response into a dictionary and use the data
data = response.content
print(response.content)
print(response.encoding)
with open('progData.xlsx',"wb") as f:
    f.write(data)
# print(data)

# Path: APIs\get_file.py
# create a client that gets the file from the server using a REST API get request

import requests

url = 'https://d12d-182-191-93-131.in.ngrok.io'
r = requests.get(url);
# print(r.content)
# print("COnetnt end -----")
# print(r.text)
# print("Text end -----")
with open('image.jpeg', 'wb') as f:
    f.write(r.content)

# import http.client

# conn = http.client.HTTPSConnection("d12d-182-191-93-131.in.ngrok.io")

# payload = ""

# conn.request("GET", "/", payload)

# res = conn.getresponse()
# data = res.read()

# print(data)

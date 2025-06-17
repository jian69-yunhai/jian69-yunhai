import requests

print(requests.__version__)

url = 'https://www.baidu.com'

response = requests.get(url)

#print(response.text)

print(response.content.decode())



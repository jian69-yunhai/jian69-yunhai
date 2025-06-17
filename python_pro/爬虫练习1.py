import requests
# url = 'https://p1.music.126.net/TcyJ6K1NjGoSVI-R06HrMQ==/109951171316421488.jpg?imageView&quality=89'

# headers = {
#     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
# }
# res = requests.get(url, headers=headers)
# #print(res.content.decode())
# with open('网易云.jpg','wb') as f:
#     f.write(res.content)


url = 'https://m804.music.126.net/20250617144642/651ff75ba73efa43c4b7262ab071fe91/jdyyaac/obj/w5rDlsOJwrLDjj7CmsOj/14096409903/4f92/aa84/cc92/c80e8add2b04acf5730933324b19cc37.m4a?vuutv=H5wFrvmw/awPjxBglKFbVzy+h72f5AUofMb+87DiJmUQ9+UgZg+CgZ4APeju8H+y5xoZG94/jqWv8YUiSIrBHBOSnPvOTf6HUeSyg5rZu6U=&authSecret=000001977c8cf6ed1f110a3b18d6236b'

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 Edg/137.0.0.0'
}

res2 = requests.get(url, headers=headers)
# print(res2.content)

with open('网易云.m4a', 'wb') as f:
    f.write(res2.content)

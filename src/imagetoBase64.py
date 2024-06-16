import base64

with open("/Users/abdulsalamkagaji/Downloads/art/src/Images/_NP_0184.JPG", "rb") as image_file:
    encoded_string = base64.b64encode(image_file.read())
with open("test.txt", "w") as f:
    f.write(encoded_string.decode('utf-8'))
# print(encoded_string)
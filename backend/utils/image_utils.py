from PIL import Image

def resize_image(path):
    img = Image.open(path).convert("RGB")
    return img.resize((128,128))
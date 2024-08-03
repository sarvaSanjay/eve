import PIL.Image
import google.generativeai as genai

model = genai.GenerativeModel("gemini-1.5-flash")
organ = PIL.Image.open("organ.jpg")
response = model.generate_content(["Tell me about this instrument", organ])
print(response.text)

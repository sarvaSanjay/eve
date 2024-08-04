import os
from os import path

import PIL.Image
import google.generativeai as genai


class ReportGenerator:
    def __init__(self):
        GEMINI_KEY = os.environ.get("GOOGLE_API_KEY")
        genai.configure(api_key=GEMINI_KEY)
        self.model = genai.GenerativeModel("gemini-1.5-flash")
        self.chat = None
        self.cwd = path.dirname(path.realpath(__file__))
        self.static = path.join(path.dirname(self.cwd), 'static')

    def one_shot_prompt(self):
        initial_prompt = """
        Imagine that you are rating rooms in buildings on the basis on environmental sustainability. I shall be providing you with 3 images of a room and you need to assess the environmental sustainability of the place based on the following metrics and provide a general rating for each metric [Poor, Good, Very Good, Excellent] as well as a brief justification for why you chose that score:
        1. Energy Efficiency:
            - Lighting: Evaluation of natural versus artificial lighting and the energy efficiency of lighting systems (e.g., LED lights).
            - Appliances and Electronics: Identification and assessment of energy-efficient devices and systems (e.g., HVAC, kitchen appliances).
            - Provide a percentage breakdown of lighting: Natural vs Artificial
        
        2. Indoor Air Quality:
            - Air Quality: Presence of ventilation systems, air purifiers, and natural ventilation points.
            - Materials: Use of low-VOC materials to enhance air quality.
        
        3. Resource Efficiency and Waste Management:
            - Material Sustainability: Incorporation of recycled, reclaimed, or sustainably sourced materials.
            - Waste Management: Availability and effectiveness of recycling bins, waste segregation, and reduction initiatives.
            - Provide a percentage breakdown of the different materials used
        
        At the end provide an overall rating of the place in one of the following categories:
        - Eco-Champion (90-100%)
        - Green Advocate (60-89%)
        - Eco-Starter (below 60%)
        """
        one_shot_1 = PIL.Image.open(path.join(self.cwd, "one_shot_images/one_shot_1.jpeg"))
        one_shot_2 = PIL.Image.open(path.join(self.cwd, "one_shot_images/one_shot_2.jpeg"))
        one_shot_3 = PIL.Image.open(path.join(self.cwd, "one_shot_images/one_shot_3.jpeg"))
        one_shot_4 = PIL.Image.open(path.join(self.cwd, "one_shot_images/one_shot_4.jpeg"))
        with open(path.join(self.cwd, 'output.txt')) as f:
            one_shot_output = f.read()
        one_shot_input = [initial_prompt, one_shot_1, one_shot_2, one_shot_3, one_shot_4]
        self.chat = self.model.start_chat(
            history=[
                {"role": "user", "parts": one_shot_input},
                {"role": "model", "parts": one_shot_output}
            ]
        )
        #response = chat.send_message("generate your output")
        #print(response.text)
        #print(chat.history)

    def prompt_gemini(self):
        request = []
        for i in range(4):
            request.append(PIL.Image.open(path.join(self.static, f"{i+1}.jpeg")))
        request.append("Generate your response for these images. Remember to follow the same pattern as your previous response")
        response = self.chat.send_message(request)
        return response.text


if __name__ == '__main__':
    rg = Report_Generator()
    rg.one_shot_prompt()
    print(rg.prompt_gemini())

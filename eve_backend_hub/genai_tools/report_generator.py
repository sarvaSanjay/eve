import os
from os import path
import json

import PIL.Image
import google.generativeai as genai
from dotenv import load_dotenv


class ReportGenerator:
    def __init__(self):
        load_dotenv()
        GEMINI_KEY = os.environ.get("GOOGLE_API_KEY")
        print(GEMINI_KEY)
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
        print("finished one shot")

    def prompt_gemini(self):
        print("I am prompting")
        request = []
        for i in range(4):
            request.append(PIL.Image.open(path.join(self.static, f"{i+1}.jpeg")))
        request.append("Generate your response for these images. Remember to follow the same pattern as your previous response. Always provide the information for each subsection. If you feel information is insufficient default to the lowest. Do NOT skip any sections otherwise your report will be incomplete.")
        response = self.chat.send_message(request)
        print(response.text)
        return response.text

    def parse_text(self, text):
        lines = text.splitlines()
        result = {}
        current_section = None
        current_subsection = None
        in_subsection = False

        for line in lines:
            line = line.strip()

            if line.endswith(':') and not line.startswith('- '):
                # Handle sections
                current_section = line[:-1]
                result[current_section] = {}
                in_subsection = False
            elif line.startswith('- '):
                # Handle subsections
                line = line[2:].strip()
                if line.endswith(':'):
                    current_subsection = line[:-1].strip()
                    result[current_section][current_subsection] = {}
                    in_subsection = True
                else:
                    key, value = line.split(': ', 1)
                    if in_subsection:
                        result[current_section][current_subsection][key] = value
                    else:
                        result[current_section][key] = value
            elif line.startswith('    - '):
                # Handle nested subsections
                line = line[6:].strip()
                key, value = line.split(': ', 1)
                if in_subsection:
                    result[current_section][current_subsection][key] = value
                else:
                    result[current_section][key] = value
            elif line.startswith('        - '):
                # Handle further nesting if necessary
                line = line[8:].strip()
                key, value = line.split(': ', 1)
                if in_subsection:
                    result[current_section][current_subsection][key] = value
                else:
                    result[current_section][key] = value
            elif line == 'Final Rating:':
                current_section = 'Final Rating'
                result[current_section] = {}
                in_subsection = False
            elif line.startswith('Justification:'):
                # Handle justification
                value = line[13:].strip()
                if current_section == 'Final Rating':
                    result[current_section]['Justification'] = value
                elif in_subsection:
                    result[current_section][current_subsection]['Justification'] = value
                else:
                    result[current_section]['Justification'] = value

        json_data = json.dumps(result, indent=4)
        result['Location'] = {
            'Proximity to Public Transport': {
                'Rating': 'Excellent',
                'Justification': 'The closest public transportation is at College & Wellesley at around 150m (much better compared to the average 800m in Toronto, which should reduce your carbon footprint!'
            },
            'Proximity to Green Spaces': {
                'Rating': 'Very Good',
                'Justification':'The closes park is around 950m which is better than the average of 500m leading to better air quality and greener lifestyle!'
            }
        }
        map_rating = {'Poor': 1, 'Good': 2, 'Very Good': 4, 'Excellent': 5}
        return result


    def get_eco_report(self):
        return self.parse_text(self.prompt_gemini())


if __name__ == '__main__':
    rg = ReportGenerator()
    rg.one_shot_prompt()
    print(rg.get_eco_report())

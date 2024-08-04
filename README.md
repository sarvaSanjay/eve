                                                                                                          
                                              ███████╗██╗░░░██╗███████╗
                                              ██╔════╝██║░░░██║██╔════╝
                                              █████╗░░╚██╗░██╔╝█████╗░░
                                              ██╔══╝░░░╚████╔╝░██╔══╝░░
                                              ███████╗░░╚██╔╝░░███████╗
                                              ╚══════╝░░░╚═╝░░░╚══════╝  

# Introducing Eve: Your Autonomous Environmental Inspector

## Inspiration 🌟
Inspired by the vision of Eve from WALL-E, EVE is our answer to a world demanding sustainable spaces. We imagined a robot that could meticulously assess building health, just as Eve analyzed Earth's viability.

## What it does 🚀
Eve is a cutting-edge robot that assesses your building's environmental performance against LEED, BREEAM, and ISO 14001 standards.

## How we built it 🛠️
We started with a LEGO Mindstorms EV3 robot, interfacing it with an NVIDIA Jetson for advanced computational capabilities. To enable autonomous navigation, we integrated a Luxonis AI camera that captures high-definition images, which are then sent to a hub using async sockets for fast real-time data transmission. These images are analyzed using Google Gemini to generate a comprehensive environmental report. Throughout the process, we focused on developing robust concurrency, efficient socket communication, and precise localization and mapping techniques.

## Challenges we ran into 🚧
Building EVE came with its set of challenges. Integrating different hardware components and ensuring seamless communication between them required extensive debugging. Implementing real-time data processing while maintaining accuracy was another hurdle. Additionally, perfecting the robot's navigation and localization within various building environments demanded meticulous calibration and algorithm refinement.

## Accomplishments that we're proud of 🏆
We successfully created a fully autonomous robot capable of navigating complex indoor environments while collecting and analyzing environmental data in real time. Our integration of high-definition imaging and advanced AI for environmental assessment sets EVE apart. The project's ability to adhere to rigorous sustainability standards like LEED, BREEAM, and ISO 14001 is a significant achievement that we're extremely proud of.

## What we learned 📚
Throughout this project, we gained valuable insights into the intricacies of hardware-software integration, particularly in the realms of concurrency and real-time data processing. We enhanced our understanding of socket programming, which was crucial for efficient data transmission. Our experience with localization and mapping provided a deeper appreciation for the complexities of autonomous navigation in dynamic environments.

## What's next for Eve 🌍
The future for EVE is bright. We plan to enhance its capabilities by incorporating additional sensors for more comprehensive environmental assessments. Improving the AI algorithms for faster and more accurate data analysis is another priority. We also envision expanding EVE's application scope beyond buildings to include outdoor environments and larger infrastructure projects. Ultimately, we aim to make EVE an indispensable tool in the quest for sustainable and healthy living spaces.

# Built With
- LEGO Mindstorms EV3 🤖
- NVIDIA Jetson 💻
- Luxonis AI Camera 📸
- Google Gemini 🌐
- Async Sockets 🔗

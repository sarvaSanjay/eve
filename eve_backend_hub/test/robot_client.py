import asyncio
import base64
from os import path
import socketio

# Define a unique robot ID
robot_id = "robot123"

# Create a Socket.IO client instance
sio = socketio.AsyncClient()

# Define event handlers for the client

@sio.event
async def connect():
    print("Connected to the server.")
    # Register the robot with the server after connecting
    await sio.emit('connect_robot', {'robot_id': robot_id})

@sio.event
async def disconnect():
    print("Disconnected from the server.")

@sio.on("robot_registered")
async def robot_registered(data):
    print(f"message: {data.get('message')}")

@sio.on("browser_connected")
async def browser_connected(data):
    print(f"message: {data.get('message')}")

@sio.on('execute_command')
async def on_execute_command(data):
    # Handle the 'execute_command' event sent from the server
    command = data.get('command')
    print(f"Executing command: {command}")
    # Execute the command (replace with actual command handling logic)
    if command == 'start_robot':
        await send_images()
    result = f"Command '{command}' executed"

    # Optionally, send the result back to the server
    # sio.emit('command_result', {'robot_id': robot_id, 'result': result})
    print(result)

def get_image_data():
    # Open the image file in binary mode
    image_path = path.join(path.dirname(path.realpath(__file__)), 'static/robot/image.jpeg')
    with open(image_path, "rb") as image_file:
        # Encode the image data to base64
        encoded_image = base64.b64encode(image_file.read()).decode('utf-8')
        return encoded_image

async def send_images():
    # replace with better looping logic
    for i in range(3):
        encoded_image = get_image_data()
        await sio.emit('robot_send_image', {'index': i, 'image_data': encoded_image})

async def main():
    # Connect the client to the server
    await sio.connect('http://localhost:5000')

    # Wait for events indefinitely
    await sio.wait()


asyncio.run(main())

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
    await sio.emit('connect_browser', {'robot_id': robot_id})

@sio.event
async def disconnect():
    print("Disconnected from the server.")

@sio.on("browser_connected")
async def browser_connected(data):
    print(f"message: {data.get('message')}")

@sio.on('acknowledge_command')
async def on_acknowledge_command(data):
    print(f"Message: {data.get('message')}")

@sio.on('send_browser_image')
async def send_browser_image(data):
    file_name = f'static/browser/{data.get("index")}.jpeg'
    file_name = path.join(path.dirname(path.realpath(__file__)), file_name)
    print(f'received image {data.get("index")}')
    with open(file_name, 'wb+') as f:
        f.write(base64.b64decode(data.get('image_data')))


async def main():
    # Connect the client to the server
    await sio.connect('http://localhost:5000')

    # Send start robot command
    await sio.emit('send_command', {'command': 'start_robot'})

    # Wait for events indefinitely
    await sio.wait()

asyncio.run(main())

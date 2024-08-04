#!/usr/bin/env python3
# ev3_client.py

import socket

# Connect to the server
SERVER_IP = '10.42.0.1'  # Replace with your server's IP address
SERVER_PORT = 12345

def main():
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client_socket:
            client_socket.connect((SERVER_IP, SERVER_PORT))
            print("Connected to server at " + SERVER_IP + ":" + str(SERVER_PORT))
            
            # Send a simple message
            message = 'Hello from EV3'
            client_socket.sendall(message.encode())
            print("Message sent")
            
    except ConnectionError as e:
        print("Unable to connect to the server:" + e)
    except Exception as e:
        print("An error occurred:" + e)

if __name__ == '__main__':
    main()

#!/usr/bin/env python3
# File: ev3_slam_square.py

import time
import math
from ev3dev2.motor import LargeMotor, OUTPUT_B, OUTPUT_C, MoveTank
from ev3dev2.sensor import INPUT_4
from ev3dev2.sensor.lego import InfraredSensor
from ev3dev2.led import Leds
import socket


# Initialize motors, sensors, and LEDs
tank = MoveTank(OUTPUT_B, OUTPUT_C)
ir = InfraredSensor(INPUT_4)
leds = Leds()

# Constants
WHEEL_DIAMETER = 3.6  # Diameter of the wheel in cm
ROBOT_WIDTH = 19.8   # Distance between wheels in cm
MAP_SIZE = 400       # Size of the map (400x400 grid for 4x4 meters with 1 cm resolution)
MAP_RESOLUTION = 1   # Resolution of the map (1 cm per cell)
OBSTACLE_THRESHOLD = 30  # Distance threshold for obstacle detection in cm

# SLAM variables
map_grid = [[0 for _ in range(MAP_SIZE)] for _ in range(MAP_SIZE)]
robot_pos = [MAP_SIZE // 2, MAP_SIZE // 2]  # Start in the middle of the map
robot_angle = 0  # Facing north

recv_buffer = b""
end_char =  b"\0"

# Server details
SERVER_IP = '10.42.0.1'  # Replace with your server's IP address
SERVER_PORT = 12345

def move_forward_continuous():
    tank.on(-50, -50)

def stop_robot():
    tank.off()

def turn(angle):
    global robot_angle
    rotations = (ROBOT_WIDTH * math.pi * angle / 360) / (WHEEL_DIAMETER * math.pi)
    tank.on_for_rotations(55, -55 , rotations)
    robot_angle += angle
    robot_angle %= 360

def read_ir():
    return ir.proximity

def update_map(ir_distance, robot_pos, robot_angle, is_obstacle=False):
    x = robot_pos[0] + int(ir_distance * math.cos(math.radians(robot_angle)) / MAP_RESOLUTION)
    y = robot_pos[1] + int(ir_distance * math.sin(math.radians(robot_angle)) / MAP_RESOLUTION)
    
    if 0 <= x < MAP_SIZE and 0 <= y < MAP_SIZE:
        if is_obstacle:
            map_grid[y][x] = 2  # Mark the cell as occupied by an obstacle
        else:
            map_grid[y][x] = 1  # Mark the cell as free space

def avoid_obstacle():
    stop_robot()
    # Mark the detected obstacle on the map
    ir_distance = read_ir()
    update_map(ir_distance, robot_pos, robot_angle, is_obstacle=True)
    
    # Turn left 90 degrees
    turn(90)
    move_forward_continuous()
    time.sleep(1)  # Move forward a bit to clear the obstacle
    stop_robot()
    # Turn right to return to original orientation
    turn(-90)
    move_forward_continuous()
    time.sleep(1)  # Move forward a bit to clear the obstacle
    stop_robot()
    turn(-90)
    move_forward_continuous()
    time.sleep(1)  # Move forward a bit to clear the obstacle
    stop_robot()
    turn(90)

def write_to_server(client_socket, message):
    try:
        total = 0
        msg = message.encode() + end_char
        while total < len(msg):
            sent = client_socket.send(msg[total:])
            if sent == 0:
                raise RuntimeError("Socket connection broken")
            total += sent
        print("Message sent to server - " + message)    
    except ConnectionError as e:
        print("Unable to connect to the server:", str(e))
    except Exception as e:
        print("An error occurred:", str(e))

def read_from_server(client_socket):
    try:
        global recv_buffer
        while end_char not in recv_buffer:
            chunk = client_socket.recv(1024)
            print(chunk.decode)
            if chunk == b"":
                raise RuntimeError("Socket connection broken")
            recv_buffer += chunk
        end_char_loc = recv_buffer.index(end_char)
        msg = recv_buffer[:end_char_loc]
        recv_buffer = recv_buffer[end_char_loc + 1:]
        print("Message recieved from server - " + msg.decode())
        return msg.decode()
    except ConnectionError as e:
        print("Unable to connect to the server:", str(e))
    except Exception as e:
        print("An error occurred:", str(e))

def main():
    global robot_pos, robot_angle
    leds.set_color("LEFT", "GREEN")
    leds.set_color("RIGHT", "GREEN")

    square_length = 400  # 400 cm
    segment_length = square_length // 4

    # Establish connection to the server once
    try:
        client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        client_socket.connect((SERVER_IP, SERVER_PORT))
        print("Connected to server at " + SERVER_IP + ":" + str(SERVER_PORT))
    except ConnectionError as e:
        print("Unable to connect to the server:", str(e))
        return
    except Exception as e:
        print("An error occurred:", str(e))
        return
    # Receive response from the server
    response = read_from_server(client_socket)  # Buffer size is 1024 bytes
    try:
        for _ in range(4):
            move_forward_continuous()
            distance_traveled = 0
            while distance_traveled < segment_length:
                ir_distance = read_ir()
                
                if ir_distance < OBSTACLE_THRESHOLD:
                    avoid_obstacle()
                    move_forward_continuous()
                
                update_map(ir_distance, robot_pos, robot_angle)
                
                # Update robot position assuming it moves at a constant speed
                distance_traveled += 1
                time.sleep(0.1)
                
                robot_pos[0] += int(1 * math.cos(math.radians(robot_angle)) / MAP_RESOLUTION)
                robot_pos[1] += int(1 * math.sin(math.radians(robot_angle)) / MAP_RESOLUTION)
            
            stop_robot()
            turn(45)
            write_to_server(client_socket, "Take a picture")
            message = read_from_server(client_socket)
            if message == "Picture taken":
                turn(45)
                time.sleep(1)
            else:
                stop_robot()
                break
        else:
            stop_robot()
            message = "Robot Stopped"
            write_to_server(client_socket,message)
            client_socket.close()
    except KeyboardInterrupt:
        stop_robot()
        print("Program terminated")

if __name__ == '__main__':
    main()

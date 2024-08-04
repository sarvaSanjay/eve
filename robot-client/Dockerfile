# Use the NVIDIA L4T base image
FROM nvcr.io/nvidia/ai-workbench/python-cuda117:1.0.3

# Set environment variables
ENV DEBIAN_FRONTEND=noninteractive

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libopencv-dev \
    python3-opencv \
    python3-pip \
    python3-setuptools \
    && rm -rf /var/lib/apt/lists/*

# Create a directory for the application
WORKDIR /app

# Copy the requirements.txt file into the container
COPY requirements.txt /app/requirements.txt

# Install Python dependencies
RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt

# Copy the rest of the application code into the container
COPY robot_client_test.py /app/robot_client.py

# Set the entry point for the container
CMD ["python3", "robot_client.py"]

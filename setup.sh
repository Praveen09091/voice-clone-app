#!/bin/bash

# Color codes for better readability
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Setting up Praveen Kumar's Voice Bot Application ===${NC}"

# Check if Node.js is installed
echo -e "${YELLOW}Checking if Node.js is installed...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js is not installed. Please install Node.js (v14 or higher) and try again.${NC}"
    exit 1
fi

# Check Node.js version
node_version=$(node -v | cut -d 'v' -f 2)
node_major_version=$(echo $node_version | cut -d '.' -f 1)
if [ "$node_major_version" -lt 14 ]; then
    echo -e "${RED}Node.js version $node_version is too old. Please upgrade to v14 or higher.${NC}"
    exit 1
fi

echo -e "${GREEN}Node.js v$node_version is installed.${NC}"

# Install frontend dependencies
echo -e "${YELLOW}Installing frontend dependencies...${NC}"
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to install frontend dependencies.${NC}"
    exit 1
fi
echo -e "${GREEN}Frontend dependencies installed successfully.${NC}"

# Install backend dependencies
echo -e "${YELLOW}Installing backend dependencies...${NC}"
cd server && npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to install backend dependencies.${NC}"
    exit 1
fi
cd ..
echo -e "${GREEN}Backend dependencies installed successfully.${NC}"

# Create a .env file for the backend if it doesn't exist
if [ ! -f "./server/.env" ]; then
    echo -e "${YELLOW}Creating .env file for the backend...${NC}"
    read -p "Enter your OpenAI API key: " openai_key
    echo "OPENAI_API_KEY=$openai_key" > ./server/.env
    echo "PORT=3001" >> ./server/.env
    echo -e "${GREEN}.env file created successfully.${NC}"
else
    echo -e "${YELLOW}.env file already exists. Skipping...${NC}"
fi

echo -e "${GREEN}=== Setup completed successfully! ===${NC}"
echo -e "${BLUE}To start the application, run the following commands:${NC}"
echo -e "${YELLOW}Terminal 1:${NC} cd server && npm run dev"
echo -e "${YELLOW}Terminal 2:${NC} npm start"
echo -e "${BLUE}The application will be available at:${NC} http://localhost:3000" 
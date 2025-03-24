#!/bin/bash

# Color variables
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Fancy banner
echo -e "${BLUE}"
echo "========================================================================"
echo "                  Praveen Kumar's Voice Bot Installer                   "
echo "========================================================================"
echo -e "${NC}"

# Check if Node.js is installed
echo -e "${YELLOW}Checking if Node.js is installed...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js is not installed. Please install Node.js version 14 or higher.${NC}"
    echo -e "${YELLOW}Visit https://nodejs.org to download and install Node.js.${NC}"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d 'v' -f 2)
NODE_MAJOR_VERSION=$(echo $NODE_VERSION | cut -d '.' -f 1)

if [ $NODE_MAJOR_VERSION -lt 14 ]; then
    echo -e "${RED}Node.js version is too old. Please install Node.js version 14 or higher.${NC}"
    echo -e "${YELLOW}Current version: $NODE_VERSION${NC}"
    exit 1
fi

echo -e "${GREEN}Node.js $NODE_VERSION is installed. ✓${NC}"

# Install frontend dependencies
echo -e "${YELLOW}Installing frontend dependencies...${NC}"
npm install

# Set up frontend environment
if [ ! -f .env ]; then
    echo -e "${YELLOW}Creating frontend .env file...${NC}"
    echo "REACT_APP_BACKEND_URL=http://localhost:3001" > .env
    echo -e "${GREEN}Created frontend .env file. ✓${NC}"
else
    echo -e "${GREEN}Frontend .env file already exists. ✓${NC}"
fi

# Check if server directory exists
if [ ! -d "server" ]; then
    echo -e "${RED}Server directory not found. Creating it...${NC}"
    mkdir -p server
fi

# Navigate to server directory
cd server

# Install server dependencies
echo -e "${YELLOW}Installing server dependencies...${NC}"
if [ ! -f "package.json" ]; then
    echo -e "${YELLOW}Creating server package.json...${NC}"
    cat > package.json << EOF
{
  "name": "voice-clone-server",
  "version": "1.0.0",
  "description": "Backend server for Praveen Kumar's Voice Bot",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "morgan": "^1.10.0",
    "openai": "^4.14.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
EOF
    echo -e "${GREEN}Created server package.json. ✓${NC}"
fi

npm install

# Create .env file for server if not exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}Creating server .env file...${NC}"
    cat > .env << EOF
PORT=3001
OPENAI_API_KEY=your_openai_api_key_here
EOF
    echo -e "${PURPLE}===============================================================${NC}"
    echo -e "${PURPLE}IMPORTANT: Update the server/.env file with your OpenAI API key${NC}"
    echo -e "${PURPLE}===============================================================${NC}"
else
    echo -e "${GREEN}Server .env file already exists. ✓${NC}"
    echo -e "${YELLOW}Make sure your OpenAI API key is set correctly in server/.env${NC}"
fi

# Check if server.js exists
if [ ! -f "server.js" ]; then
    echo -e "${RED}Server file (server.js) not found. Please ensure it exists.${NC}"
    echo -e "${YELLOW}You can create it manually or run the app setup script.${NC}"
fi

# Return to parent directory
cd ..

# Final instructions
echo -e "${GREEN}"
echo "========================================================================"
echo "                      Installation Completed! ✓                         "
echo "========================================================================"
echo -e "${NC}"
echo -e "${BLUE}To start the application:${NC}"
echo "  1. Set your OpenAI API key in server/.env file"
echo "  2. Start the backend server:"
echo -e "     ${YELLOW}cd server && npm run dev${NC}"
echo "  3. In a new terminal, start the frontend:"
echo -e "     ${YELLOW}npm start${NC}"
echo ""
echo -e "${PURPLE}Enjoy using Praveen Kumar's Voice Bot!${NC}" 
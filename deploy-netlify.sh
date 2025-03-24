#!/bin/bash

# Color codes for better readability
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Deploying Praveen Kumar's Voice Bot to Netlify ===${NC}"

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo -e "${RED}Netlify CLI is not installed. Installing now...${NC}"
    npm install -g netlify-cli
fi

# Build the project
echo -e "${YELLOW}Building the project...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}Build failed. Please fix the errors and try again.${NC}"
    exit 1
fi
echo -e "${GREEN}Build succeeded!${NC}"

# Deploy to Netlify
echo -e "${YELLOW}Deploying to Netlify...${NC}"
echo -e "${BLUE}You may be prompted to log in to Netlify if you haven't already.${NC}"

# Ask if this is a new site or an existing site
echo -e "${YELLOW}Is this a new site or an existing site?${NC}"
echo "1. New site"
echo "2. Existing site"
read -p "Enter your choice (1/2): " site_choice

if [ "$site_choice" == "1" ]; then
    # Create a new site
    echo -e "${YELLOW}Creating a new site...${NC}"
    netlify init
elif [ "$site_choice" == "2" ]; then
    # Link to an existing site
    echo -e "${YELLOW}Linking to an existing site...${NC}"
    netlify link
else
    echo -e "${RED}Invalid choice. Exiting.${NC}"
    exit 1
fi

# Deploy
echo -e "${YELLOW}Deploying...${NC}"
netlify deploy --prod

echo -e "${GREEN}=== Deployment completed! ===${NC}"
echo -e "${BLUE}Don't forget to set up the OPENAI_API_KEY environment variable in your Netlify dashboard.${NC}"
echo -e "${YELLOW}Site settings > Environment variables > Add variable${NC}" 
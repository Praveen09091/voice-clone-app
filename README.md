# Praveen Kumar's Voice Bot

<div align="center">
  <img src="public/logo192.png" alt="Praveen Kumar's Voice Bot Logo" width="120" height="120" style="border-radius: 20%;">
  <h3>Interactive AI Voice Assistant</h3>
  <p>Ask questions about Praveen Kumar Oleti and get responses in a natural voice.</p>
</div>

## 🌟 Features

- **Voice Recognition**: Talk to the bot using your microphone
- **Natural Text-to-Speech**: Hear responses in a natural voice
- **Comprehensive Profile**: Learn about Praveen's education, skills, and experience
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Sleek interface with smooth animations and transitions

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key

### Automated Installation

1. Clone the repository
   ```bash
   git clone https://github.com/praveenkumaroleti/voice-clone-bot.git
   cd voice-clone-app
   ```

2. Run the installation script
   ```bash
   ./install.sh
   ```

3. Configure your OpenAI API key
   - Open `server/.env` file
   - Replace `your_openai_api_key_here` with your actual OpenAI API key

4. Start the application

   **Start the server**
   ```bash
   cd server
   npm run dev
   ```

   **In a separate terminal, start the frontend**
   ```bash
   cd voice-clone-app
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Manual Installation

If the automated installation script doesn't work for you, follow these steps:

1. Install frontend dependencies
   ```bash
   npm install
   ```

2. Create a frontend `.env` file (optional)
   ```bash
   echo "REACT_APP_BACKEND_URL=http://localhost:3001" > .env
   ```

3. Install backend dependencies
   ```bash
   cd server
   npm install
   ```

4. Create a server `.env` file
   ```bash
   echo "PORT=3001" > .env
   echo "OPENAI_API_KEY=your_openai_api_key_here" >> .env
   ```

5. Start both servers as described in the Automated Installation section

## 🌐 Deployment to Netlify

This application can be easily deployed to Netlify with serverless functions to handle the backend API.

### Automated Deployment

1. Ensure your code is committed to your repository
2. Run the deployment script:
   ```bash
   ./deploy-netlify.sh
   ```
3. Follow the prompts to configure your Netlify site
4. After deployment, set your OpenAI API key in the Netlify dashboard:
   - Go to Site settings > Environment variables
   - Add the variable `OPENAI_API_KEY` with your API key

### Manual Deployment

For step-by-step manual deployment instructions, see [NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md).

## 🧠 How It Works

1. **Voice Input**: The app uses the Web Speech API to convert your speech to text
2. **AI Processing**: Your question is sent to the backend, which uses OpenAI's API to generate a response
3. **Voice Output**: The response is converted back to speech using the Web Speech API
4. **Profile Information**: The app displays Praveen's profile information in an organized, tabbed interface

## 🛠️ Technologies

### Frontend
- React
- Material UI
- Web Speech API
- CSS Animations
- Responsive Design

### Backend
- Node.js
- Express
- OpenAI API
- Netlify Functions (for deployment)

## 📱 Mobile Support

The application is fully responsive and works on mobile devices. You can:
- Talk to the bot using your phone's microphone
- View Praveen's profile information
- Hear responses through your phone's speakers

## 🔧 Troubleshooting

### Microphone not working?
- Make sure you've granted microphone permissions to the browser
- Check if your microphone is correctly connected and working

### No response from the server?
- Check if the backend server is running
- Verify your OpenAI API key is correct
- Check the console for error messages

### Text-to-speech not working?
- Make sure your volume is turned up
- Some browsers may have limited support for the Web Speech API
- Try using Chrome for the best experience

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 About Praveen Kumar Oleti

Praveen Kumar Oleti is a Prompt Engineer and Gen AI Developer with expertise in natural language processing, machine learning, and software development. He created this voice bot as a demonstration of integrating various AI technologies.

---

<div align="center">
  <p>Built with ❤️ by Praveen Kumar Oleti</p>
  <p>© 2023 Praveen Kumar Oleti. All rights reserved.</p>
</div> 
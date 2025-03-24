# Deployment Guide for Praveen Kumar's Voice Bot

This guide provides instructions for deploying the Voice Bot application to various hosting platforms.

## Prerequisites

Before deploying, make sure you:
1. Have an OpenAI API key
2. Have tested the application locally
3. Have built the production version of the application with `npm run build`

## Deployment Options

### Frontend Deployment

#### Option 1: Netlify

Netlify is a great option for hosting the frontend of this application.

1. Create an account on [Netlify](https://www.netlify.com/)
2. Install the Netlify CLI: `npm install -g netlify-cli`
3. Build your application: `npm run build`
4. Deploy using the CLI:
   ```
   cd voice-clone-app
   netlify deploy
   ```
5. Follow the instructions to complete the deployment

#### Option 2: Vercel

Vercel is another excellent platform for hosting React applications.

1. Create an account on [Vercel](https://vercel.com/)
2. Install the Vercel CLI: `npm install -g vercel`
3. Deploy using the CLI:
   ```
   cd voice-clone-app
   vercel
   ```
4. Follow the instructions to complete the deployment

### Backend Deployment

#### Option 1: Render

Render is a unified cloud platform that works well for Node.js backends.

1. Create an account on [Render](https://render.com/)
2. Click "New Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - Name: `praveen-voice-bot-api`
   - Environment: `Node`
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && npm start`
5. Add environment variables:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `PORT`: 3001
6. Click "Create Web Service"

#### Option 2: Heroku

Heroku is a platform as a service (PaaS) that enables developers to build and run applications in the cloud.

1. Create an account on [Heroku](https://www.heroku.com/)
2. Install the Heroku CLI: `npm install -g heroku`
3. Create a new Heroku app:
   ```
   cd voice-clone-app/server
   heroku create praveen-voice-bot-server
   ```
4. Set environment variables:
   ```
   heroku config:set OPENAI_API_KEY=your_openai_api_key
   ```
5. Deploy to Heroku:
   ```
   git subtree push --prefix server heroku main
   ```

### Combined Deployment (for small applications)

#### Option: Railway

Railway is a platform that can host both frontend and backend applications.

1. Create an account on [Railway](https://railway.app/)
2. Install the Railway CLI: `npm install -g @railway/cli`
3. Login to Railway: `railway login`
4. Initialize a new project: `railway init`
5. Deploy the application: `railway up`
6. Set environment variables in the Railway dashboard

## Connecting Frontend to Backend

After deploying both the frontend and backend, you need to connect them:

1. Get the URL of your deployed backend (e.g., `https://praveen-voice-bot-api.onrender.com`)
2. Add this URL to your frontend environment variables:
   - For Netlify: In the Netlify dashboard, go to Site settings > Build & deploy > Environment variables
   - For Vercel: In the Vercel dashboard, go to your project settings > Environment Variables
3. Add the variable:
   ```
   REACT_APP_API_URL=https://your-backend-url.com
   ```
4. Redeploy your frontend to apply the changes

## Custom Domain (Optional)

To use a custom domain with your application:

1. Purchase a domain from a domain registrar like Namecheap or GoDaddy
2. Add the domain in your hosting platform's dashboard:
   - Netlify: Site settings > Domain management > Add custom domain
   - Vercel: Project settings > Domains > Add
3. Configure DNS settings as instructed by the hosting platform
4. Wait for DNS propagation (can take up to 48 hours)

## Troubleshooting

If you encounter issues with your deployment:

- Check the logs in your hosting platform's dashboard
- Verify that all environment variables are correctly set
- Ensure your OpenAI API key is valid and has sufficient credits
- Check CORS configuration in your backend if the frontend cannot communicate with it

## Monitoring and Maintenance

After deployment:

- Set up monitoring to get alerts if your application goes down
- Regularly update dependencies to fix security vulnerabilities
- Check your OpenAI API usage to manage costs
- Consider setting up a CI/CD pipeline for easier future deployments 
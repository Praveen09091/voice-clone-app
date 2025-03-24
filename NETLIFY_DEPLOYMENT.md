# Deploying to Netlify

This guide provides step-by-step instructions for deploying the Voice Bot application to Netlify.

## Prerequisites

- A GitHub account with your project repository
- A Netlify account
- An OpenAI API key

## Deployment Steps

### 1. Push Your Code to GitHub

Make sure your code is pushed to a GitHub repository:

```bash
git add .
git commit -m "Prepare for Netlify deployment"
git push origin main
```

### 2. Sign Up for Netlify

If you don't have a Netlify account, sign up at [https://app.netlify.com/signup](https://app.netlify.com/signup).

### 3. Deploy to Netlify

#### Option 1: Deploy via Netlify UI

1. Log in to your Netlify account
2. Click on "New site from Git"
3. Select GitHub as your Git provider
4. Authorize Netlify to access your GitHub repositories
5. Select your Voice Bot repository
6. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
7. Click "Show advanced" and add environment variables:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `NODE_ENV`: `production`
8. Click "Deploy site"

#### Option 2: Deploy via Netlify CLI

1. Install the Netlify CLI:
   ```bash
   npm install netlify-cli -g
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Initialize your site:
   ```bash
   netlify init
   ```

4. Follow the prompts to configure your site
   - Choose "Create & configure a new site"
   - Select your team
   - Enter a site name (or accept the generated one)
   - Set up environment variables when prompted

5. Deploy your site:
   ```bash
   netlify deploy --prod
   ```

### 4. Add Environment Variables

After deployment, you need to add your OpenAI API key:

1. Go to your site dashboard on Netlify
2. Navigate to Site settings > Environment variables
3. Add the following environment variables:
   - `OPENAI_API_KEY`: Your OpenAI API key

### 5. Enable Netlify Functions

1. Go to your site dashboard on Netlify
2. Navigate to Functions > Settings
3. Make sure the functions directory is set to `/netlify/functions`

### 6. Test Your Deployment

1. Visit your deployed site (the URL will be provided by Netlify)
2. Test the Voice Bot functionality to ensure everything works as expected
3. Check the Netlify Functions logs if you encounter any issues

## Troubleshooting

If you encounter issues with your deployment:

1. Check the Netlify deployment logs for errors
2. Verify your environment variables are set correctly
3. Ensure your Netlify Functions are correctly configured

For Netlify Functions issues:
- Check the function logs in the Netlify dashboard under Functions > Logs
- Try testing your functions locally using `netlify dev`

## Custom Domain (Optional)

To use a custom domain:

1. Go to Domain settings in your Netlify dashboard
2. Click "Add custom domain"
3. Follow the instructions to configure your DNS settings

## Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)
- [Environment Variables in Netlify](https://docs.netlify.com/configure-builds/environment-variables/) 
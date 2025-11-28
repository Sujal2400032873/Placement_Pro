<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/temp/2

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploying to Netlify

This project is configured for direct deployment from GitHub to Netlify.

1. Push your repository to GitHub (the `master` branch or any other branch).
2. In Netlify, choose "New site from Git" and connect your GitHub account.
3. Select the repository `Placement_Pro` and the branch you want to deploy.
4. Netlify will use the following build settings (configured in `netlify.toml`):

    - Build command: `npm run build`
    - Publish directory: `dist`

5. Client-side routing is handled by the SPA redirect. The `_redirects` file is included in `public/` and will be copied to `dist/` during build.

After connecting, Netlify will build and deploy automatically on each push.

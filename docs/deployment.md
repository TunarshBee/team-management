# Deployment Guide

This document provides step-by-step instructions for deploying the Team Management application to Vercel.

## Prerequisites

- A GitHub account
- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Git installed on your local machine

## Deployment Steps

### 1. Push Code to GitHub

1. Initialize Git repository (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Team Management application"
   ```

2. Create a new repository on GitHub

3. Push your code:
   ```bash
   git remote add origin <your-github-repo-url>
   git branch -M main
   git push -u origin main
   ```

### 2. Deploy to Vercel

#### Option A: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect Next.js and configure build settings
5. Click "Deploy"

#### Option B: Using Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from the project root:
   ```bash
   vercel
   ```

4. Follow the prompts to complete deployment

### 3. Verify Deployment

Once deployment is complete, you'll receive a URL like:
```
https://team-management-xxxx.vercel.app
```

Visit this URL to verify the application is working correctly.

## Build Configuration

Vercel automatically detects the following settings for Next.js:

- **Framework Preset**: Next.js
- **Build Command**: `next build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Development Command**: `next dev`

## Environment Variables

No environment variables are required for the basic functionality of this application.

If you need to add environment variables:
1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add your variables

## Custom Domain (Optional)

To add a custom domain:
1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## Continuous Deployment

Vercel automatically sets up continuous deployment:
- Every push to the `main` branch triggers a production deployment
- Pull requests create preview deployments
- Deployment status is visible in GitHub

## Troubleshooting

### Build Failures

If the build fails:
1. Check the build logs in Vercel dashboard
2. Ensure all dependencies are listed in `package.json`
3. Run `npm run build` locally to reproduce the error

### Runtime Errors

If the application runs but has errors:
1. Check the runtime logs in Vercel dashboard
2. Enable detailed error messages in development mode
3. Verify all environment variables are set correctly

## Performance Optimization

Vercel provides several optimizations automatically:
- Edge caching
- Automatic image optimization
- Code splitting
- Static generation where possible

## Monitoring

Monitor your application:
1. Vercel Analytics (optional, paid feature)
2. Vercel Logs for error tracking
3. Performance metrics in the dashboard

## Rollback

To rollback to a previous deployment:
1. Go to your project in Vercel
2. Navigate to "Deployments"
3. Find the previous successful deployment
4. Click "Promote to Production"

## Support

For deployment issues:
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)

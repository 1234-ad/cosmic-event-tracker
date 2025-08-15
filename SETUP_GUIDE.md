# 🚀 Quick Setup Guide for Cosmic Event Tracker

## Step-by-Step Setup (5 minutes)

### 1. Clone and Install
```bash
git clone https://github.com/1234-ad/cosmic-event-tracker.git
cd cosmic-event-tracker
npm install
```

### 2. Get NASA API Key (1 minute)
- Visit: https://api.nasa.gov/
- Click "Get Started"
- Fill out the form (name, email, use case: "Learning React")
- You'll get an API key instantly
- For immediate testing, you can use `DEMO_KEY`

### 3. Set Up Supabase (2 minutes)
- Go to: https://supabase.com/
- Click "Start your project"
- Sign up with GitHub/Google
- Create a new project:
  - Name: `cosmic-event-tracker`
  - Database Password: (choose a strong password)
  - Region: (closest to you)
- Wait for project creation (~30 seconds)
- Go to Settings → API
- Copy your Project URL and anon public key

### 4. Configure Environment Variables
```bash
cp .env.example .env
```

Edit `.env` file:
```env
REACT_APP_NASA_API_KEY=your_nasa_api_key_or_DEMO_KEY
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_anon_key
```

### 5. Start the App
```bash
npm start
```

Visit `http://localhost:3000` and you're ready! 🎉

## Quick Test Checklist

1. ✅ App loads without errors
2. ✅ Can create a new account
3. ✅ Can sign in/out
4. ✅ NEO data loads on home page
5. ✅ Can filter by hazardous asteroids
6. ✅ Can view event details
7. ✅ Can load more events

## Troubleshooting

**API Key Issues:**
- Use `DEMO_KEY` for testing (limited to 30 requests/hour)
- Get a personal key from NASA for unlimited access

**Supabase Issues:**
- Make sure project URL starts with `https://`
- Anon key should be very long (starts with `eyJ`)
- Check project is not paused (free tier auto-pauses after 1 week inactivity)

**Build Issues:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be 14+)

## Development Tips

- Use browser dev tools to inspect API calls
- Check Network tab for failed requests
- Console will show any JavaScript errors
- Supabase has built-in auth UI if needed

## Ready for Coding Agents

This project is optimized for:
- ✅ **Cursor IDE** with AI assistance
- ✅ **VSCode** with AugmentCode extension
- ✅ **GitHub Copilot** integration
- ✅ Modern React patterns for AI understanding

The codebase uses clear, semantic naming and follows React best practices that AI coding assistants understand well.

---

**Total Setup Time: ~5 minutes**
**Development Time: 5-7 hours with AI assistance**

Happy coding! 🌌
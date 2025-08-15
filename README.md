# 🌌 Cosmic Event Tracker

A React.js web application that displays information about Near-Earth Objects (NEOs) and cosmic events using NASA's Open APIs with user authentication.

## 🚀 Features

- **User Authentication**: Secure login/signup with Supabase
- **Real-time NEO Data**: Fetch and display Near-Earth Objects from NASA's API
- **Interactive Filtering**: Filter by hazardous asteroids, date ranges, and sorting options
- **Detailed Event Views**: Comprehensive information including orbital data
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Beautiful cosmic-themed interface with glassmorphism effects

## 🛠️ Tech Stack

- **Frontend**: React.js with Hooks (useState, useEffect, useCallback)
- **Routing**: React Router DOM
- **Authentication**: Supabase Auth
- **API Integration**: Axios for HTTP requests
- **Styling**: CSS3 with modern features (backdrop-filter, gradients)
- **Data Source**: NASA Near Earth Object Web Service (NeoWs)

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- NASA API key (free from https://api.nasa.gov/)
- Supabase account (free from https://supabase.com/)

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/1234-ad/cosmic-event-tracker.git
   cd cosmic-event-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your API keys:
   ```env
   REACT_APP_NASA_API_KEY=your_nasa_api_key_here
   REACT_APP_SUPABASE_URL=your_supabase_project_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Get your NASA API key**
   - Visit https://api.nasa.gov/
   - Sign up for a free API key
   - Use `DEMO_KEY` for immediate testing (rate limited)

5. **Set up Supabase**
   - Create a new project at https://supabase.com/
   - Go to Settings > API to find your URL and anon key
   - Authentication is automatically configured

6. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

7. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 Usage

1. **Sign Up/Login**: Create an account or sign in with existing credentials
2. **Browse Events**: View upcoming Near-Earth Objects on the main dashboard
3. **Filter & Sort**: Use filters to find specific types of cosmic events
4. **View Details**: Click on any event to see comprehensive information
5. **Load More**: Extend the date range to see more cosmic events

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.js       # Navigation header
│   ├── EventCard.js    # NEO event card
│   ├── LoadingSpinner.js # Animated loading component
│   └── ProtectedRoute.js # Route protection
├── contexts/           # React contexts
│   └── AuthContext.js  # Authentication state management
├── pages/              # Main application pages
│   ├── Home.js         # Event listing page
│   ├── EventDetail.js  # Detailed event view
│   └── Login.js        # Authentication page
├── lib/                # Utility libraries
│   └── supabase.js     # Supabase configuration
└── App.js              # Main application component
```

## 🔑 Key Features Implemented

### Core Requirements ✅
- [x] Functional Components with React Hooks
- [x] Component Structure (Header, EventList, EventCard, Filter, LoadingSpinner)
- [x] State Management (loading states, API data, filters)
- [x] API Integration with NASA NeoWs
- [x] Conditional Rendering
- [x] Event Handling
- [x] Props passing between components
- [x] Modern styling with CSS

### Authentication ✅
- [x] Supabase integration
- [x] Login/Signup functionality
- [x] Protected routes
- [x] User session management

### Advanced Features ✅
- [x] Date range filtering
- [x] Hazardous asteroid filtering
- [x] Sorting by date, size, distance
- [x] Load more functionality
- [x] Detailed orbital data
- [x] Responsive design
- [x] Error handling
- [x] Loading states

## 🌟 Bonus Features

- **Animated Loading Spinner**: Custom CSS animation with orbital theme
- **Glassmorphism UI**: Modern backdrop-filter effects
- **Comprehensive Error Handling**: User-friendly error messages
- **Mobile Responsive**: Optimized for all screen sizes
- **Orbital Data Integration**: Additional API calls for detailed information
- **Statistics Dashboard**: Real-time counts and metrics

## 🚀 Deployment

The app is ready for deployment on platforms like:
- Vercel
- Netlify
- GitHub Pages
- Heroku

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **Live Demo**: [Add your deployed URL here]
- **NASA API Documentation**: https://api.nasa.gov/
- **Supabase Documentation**: https://supabase.com/docs

## 👨‍💻 Development Notes

This project was built using modern React patterns and best practices:
- Functional components with hooks
- Custom hooks for authentication
- Context API for state management
- Async/await for API calls
- CSS Grid and Flexbox for layouts
- Mobile-first responsive design

**Estimated Development Time**: 5-7 hours
**Deadline**: 24 hours ✅

---

Built with ❤️ and ☕ for the cosmic community 🌌
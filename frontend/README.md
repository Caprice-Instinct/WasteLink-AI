# WasteLink AI - Next.js Frontend

This is the Next.js frontend for the WasteLink AI platform, Africa's premier circular economy platform for waste-to-resource trading.

## Features

- **Landing Page**: Hero section with platform overview and statistics
- **Marketplace**: Browse and purchase waste materials with AI-powered matching
- **Scanner**: AI-powered waste analysis and quality grading
- **My Listings**: Manage your waste listings and track sales
- **Impact Dashboard**: Track environmental and social impact metrics
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Pages Structure

- `/` - Landing page with hero section and platform overview
- `/marketplace` - Browse available waste materials
- `/scanner` - AI waste scanner for analysis and listing creation
- `/listings` - Manage your waste listings
- `/impact` - View impact metrics and success stories

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- pnpm, npm, or yarn package manager

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
# or
yarn install
```

3. Run the development server:
```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build for Production

```bash
pnpm build && pnpm start
# or
npm run build && npm start
# or
yarn build && yarn start
```

## Technology Stack

- **Next.js 14** - React framework for production
- **React 18** - JavaScript library for building user interfaces
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful & consistent icon toolkit

## Project Structure

```
frontend/
├── pages/
│   ├── _app.js          # App wrapper component
│   ├── index.js         # Landing page
│   ├── marketplace.js   # Marketplace page
│   ├── scanner.js       # AI scanner page
│   ├── listings.js      # My listings page
│   └── impact.js        # Impact dashboard
├── components/
│   └── Layout.js        # Shared layout component
├── styles/
│   └── globals.css      # Global styles with Tailwind
├── public/              # Static assets (images, icons)
└── package.json         # Dependencies and scripts
```

## Key Components

### Layout Component
- Shared navigation and header
- Responsive design
- Integrated chatbot (TakaBot)
- User profile display

### Pages
- **Home**: Landing page with hero section and platform features
- **Marketplace**: Product listings with search and filtering
- **Scanner**: AI-powered waste analysis tool
- **Listings**: User's waste listings management
- **Impact**: Environmental and social impact tracking

## Features

### AI Scanner
- Image upload for waste analysis
- Real-time AI processing simulation
- Quality grading and value estimation
- Market demand analysis

### Marketplace
- Advanced search and filtering
- Location-based results
- AI confidence scoring
- Purchase and offer functionality

### Impact Tracking
- Environmental metrics (CO₂ saved, waste diverted)
- Social impact (jobs created, revenue generated)
- UN SDG contribution tracking
- Success stories showcase

## Styling

The application uses Tailwind CSS for styling with:
- Responsive design patterns
- Consistent color scheme (green/blue gradient theme)
- Modern UI components
- Accessibility considerations

## Development Notes

- All components are functional components using React hooks
- State management is handled locally with useState
- Mock data is used for demonstration purposes
- Images are referenced from the public directory
- The design maintains the original color scheme and styling

## Next Steps

To connect with a real backend:
1. Replace mock data with API calls
2. Implement authentication
3. Add real image upload functionality
4. Connect to actual AI analysis services
5. Implement real payment processing
# Modern eCommerce - React Next.js Application

A fully functional eCommerce application built with React, Next.js, Redux Toolkit, and SCSS.

## Developer Contact

**Pradip Mourya**
- Email: pradipmourya172@gmail.com
- Phone: +91 8057196070
- Location: India

## Features

- 🏠 **Home page** with hero section, categories, best-selling products
- 🛍️ **Products page** with filtering, search, and pagination
- 🛒 **Shopping cart** with add/remove functionality
- 👤 **Authentication** (login/signup pages)
- 📞 **Contact page**
- ℹ️ **About page**
- 💳 **Checkout process**
- 🎨 **Responsive design** with SCSS styling
- 🔄 **Redux state management**

## Tech Stack

- **Frontend**: React 19, Next.js 16
- **State Management**: Redux Toolkit
- **Styling**: SCSS/Sass
- **Build Tool**: Next.js with Turbopack
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ecommerce-project
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Netlify Deployment

This project is configured for easy deployment on Netlify:

1. **Connect to Netlify**:
   - Push your code to GitHub/GitLab/Bitbucket
   - Connect your repository to Netlify
   - Netlify will automatically detect the build settings

2. **Build Settings** (auto-configured):
   - Build command: `npm run build`
   - Publish directory: `out`
   - Node version: 18

3. **Manual Deployment**:
```bash
# Build the project
npm run build

# The 'out' folder contains the static files ready for deployment
```

### Environment Variables

No environment variables are required for basic functionality.

## Project Structure

```
├── app/                    # Next.js App Router pages
├── src/
│   ├── components/         # Reusable components
│   │   ├── common/        # Header, Footer
│   │   ├── pages/         # Page-specific components
│   │   ├── product/       # Product-related components
│   │   └── ui/            # UI components
│   ├── constants/         # App constants
│   ├── data/             # Mock data
│   ├── redux/            # Redux store and slices
│   ├── styles/           # Global SCSS styles
│   └── utils/            # Utility functions
├── public/               # Static assets
├── netlify.toml         # Netlify configuration
└── next.config.ts       # Next.js configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contact

For any questions or support, please contact:

**Pradip Mourya**
- 📧 Email: pradipmourya172@gmail.com
- 📱 Phone: +91 8057196070
- 🌍 Location: India

---

Built with ❤️ by Pradip Mourya

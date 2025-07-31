# Multi-Theme Switcher App

A modern React-based web application with a dynamic theme switcher that allows users to switch between three distinct themes, each with unique layouts, fonts, spacing, and visual styles.
https://superlative-rugelach-8d86a7.netlify.app/
## 🎨 Features

### Theme System
- **Theme 1 (Default)**: Minimalist layout with light background and simple sans-serif font
- **Theme 2**: Dark mode with sidebar layout and bold serif font
- **Theme 3**: Colorful theme with card-based grid layout and playful Google Font (Pacifico)

### Core Functionality
- ✅ **Theme Persistence**: Themes persist across page reload using localStorage
- ✅ **Redux State Management**: Centralized theme and product data management
- ✅ **API Integration**: Fetches product data from [FakeStore API](https://fakestoreapi.com/products)
- ✅ **Responsive Design**: Fully responsive layout for desktop and mobile devices
- ✅ **Smooth Animations**: Subtle animations during theme switching using Framer Motion
- ✅ **React Router**: Multi-page navigation (Home, About, Contact, Product Detail)
- ✅ **TypeScript**: Full TypeScript implementation for type safety
- ✅ **Security**: Input validation, error handling, and secure API calls
- ✅ **Accessibility**: Focus management, semantic HTML, and keyboard navigation

### Technical Stack
- **Frontend**: React 19 with TypeScript
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS with custom theme configurations
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Build Tool**: Vite

## 🚀 Quick Start

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shivprataps123/Multi-Theme-Switcher-App.git
   cd multi-theme-switcher-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Header/          # Navigation and theme switcher
│   ├── ProductCard/     # Product display component
│   └── LoadingSpinner/  # Loading state component
├── pages/               # Page components
│   ├── Home/           # Main product listing page
│   ├── About/          # Company information page
│   ├── Contact/        # Contact form page
│   └── ProductDetail/  # Individual product page
├── store/              # Redux store configuration
│   ├── index.ts        # Store setup
│   └── slices/         # Redux slices
│       ├── themeSlice.ts    # Theme management
│       └── productsSlice.ts # Product data management
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles and theme configurations
```

## 🎯 Theme System Architecture

### Theme Configuration
The application uses a sophisticated theme system with:

- **Dynamic CSS Classes**: Theme-specific classes applied to the body element
- **Tailwind Custom Colors**: Extended color palette for each theme
- **Font Families**: Different fonts for each theme (Inter, Georgia, Pacifico)
- **Layout Variations**: Different layouts and spacing for each theme

### Theme Switching
1. **Redux State**: Theme selection stored in Redux store
2. **localStorage Persistence**: Theme preference saved to browser storage
3. **CSS Class Application**: Theme classes applied to body element
4. **Smooth Transitions**: Animated theme switching with Framer Motion

## 🔧 Configuration

### Tailwind Configuration
The `tailwind.config.js` file includes:
- Custom color palettes for each theme
- Custom font families
- Animation keyframes
- Responsive breakpoints

### Environment Variables
Create a `.env` file in the root directory for any environment-specific configurations:

```env
VITE_API_BASE_URL=https://fakestoreapi.com
VITE_APP_TITLE=Multi-Theme Switcher App
```

## 🛡️ Security Features

- **Input Validation**: Form inputs validated on client-side
- **Error Handling**: Comprehensive error handling for API calls
- **XSS Prevention**: Sanitized user inputs
- **CORS Handling**: Proper CORS configuration for API requests
- **Timeout Protection**: API request timeouts to prevent hanging requests

## 📱 Responsive Design

The application is fully responsive with:
- **Mobile-First Approach**: Designed for mobile devices first
- **Breakpoint System**: Tailwind's responsive breakpoints
- **Flexible Layouts**: Adaptive layouts for different screen sizes
- **Touch-Friendly**: Optimized for touch interactions

## 🎨 Customization

### Adding New Themes
1. Add theme colors to `tailwind.config.js`
2. Create theme-specific CSS classes in `src/index.css`
3. Update theme slice with new theme type
4. Add theme option to header dropdown

### Modifying Existing Themes
- Edit color values in `tailwind.config.js`
- Update CSS classes in `src/index.css`
- Modify component styling in respective theme sections

## 🧪 Testing

### Manual Testing Checklist
- [ ] Theme switching works correctly
- [ ] Theme persistence across page reload
- [ ] Responsive design on different screen sizes
- [ ] Form validation and submission
- [ ] API data loading and error handling
- [ ] Navigation between pages
- [ ] Product detail page functionality

### Automated Testing (Future Enhancement)
```bash
npm run test        # Run unit tests
npm run test:e2e    # Run end-to-end tests
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```
### Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
3. Deploy automatically on push to main branch

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [FakeStore API](https://fakestoreapi.com/) for providing product data
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for animations
- [React](https://reactjs.org/) for the UI library
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management

**Happy Coding! 🎉**

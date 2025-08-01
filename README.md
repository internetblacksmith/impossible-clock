# The Impossible Clock

[![Netlify Status](https://api.netlify.com/api/v1/badges/69b0dcaa-051c-42a9-96b2-a4dc35d966af/deploy-status)](https://app.netlify.com/sites/impossible-clock/deploys)
[![impossible-clock](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/rckh63/master&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/rckh63/runs)

Try to understand it if you dare ;)

## 🎯 Features

- Interactive digital clock with seven-segment displays
- Toggle switches for hours, minutes, and seconds
- Responsive design that works on all devices
- Automatic dark mode support
- Smooth animations and transitions

## 🚀 Getting Started

### Prerequisites

- Node.js 17.3.0 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/internetblacksmith/impossible-clock.git
cd impossible-clock

# Install dependencies
npm install
```

### Development

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Testing

The project includes comprehensive test coverage with 53 tests:

```bash
# Run all tests (includes visual regression)
npm run test

# Open Cypress test runner
npm run cy:open

# Run specific test suites
npm run cy:run -- --spec="cypress/e2e/clock.cy.js"
```

#### Test Suites:
- **Functional Tests**: Clock behavior, toggle functionality, accessibility
- **Visual Regression**: 21 baseline images comparing visual appearance
- **Performance Tests**: Load times, smooth animations, keyboard navigation
- **Responsive Tests**: Mobile, tablet, desktop, and 4K viewports

## 🛠️ Built With

- **Vite** - Lightning fast build tool
- **SCSS** - For styling with modern CSS features
- **Cypress** - For end-to-end testing
- **Vanilla JavaScript** - No frameworks needed!

## 📱 Browser Support

The clock works on all modern browsers and includes legacy support through polyfills:
- Chrome, Firefox, Safari, Edge (latest 2 versions)
- Mobile browsers
- Firefox ESR

## 🎨 Customization

The clock uses CSS custom properties for easy theming. Colors, spacing, and animations can be customized in `app/styles/variables.scss`.

## 🌐 Deployment

The project is configured for easy deployment to Netlify. Simply connect your GitHub repository and Netlify will automatically build and deploy your changes.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Remember**: The clock's behavior is intentionally mysterious. Can you figure out how to read it? 🕐✨
# uiloft

Hey there! 👋 Welcome to **uiloft**, an open-source React UI library that's built on a solid design system. We've got everything you need to build beautiful, consistent, and accessible React apps. Think of it as your UI toolkit that follows atomic design principles to keep things organized and maintainable.

[![0.1.0](https://badge.fury.io/js/uiloft.svg)](https://badge.fury.io/js/uiloft)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

---

## 🎨 Design System

- Rock-solid design system that keeps your UI consistent
- Atomic design principles that make scaling a breeze
- Flexible theming with customizable design tokens
- Built with accessibility in mind (WCAG compliant)

## 🎨 Theming System

Our library comes with a comprehensive theming system that's built on CSS custom properties (variables). The `theme-variables.scss` file contains all the design tokens used throughout the components.

### Theme Structure

```scss
// theme-variables.scss
:root {
  // Light theme variables
  --colors-text-text-primary-900: #181d27;
  --colors-background-bg-primary: #ffffff;
  // ... more light theme variables
}

[data-theme="dark"] {
  // Dark theme variables
  --colors-text-text-primary-900: #f7f7f7;
  --colors-background-bg-primary: #0c0e12;
  // ... more dark theme variables
}
```

### Using Custom Themes

1. Copy the `theme-variables.scss` file to your project
2. Customize the variables to match your brand
3. Import the file in your main SCSS file:

```scss
@import "path/to/theme-variables.scss";
```

### Available Design Tokens

- **Colors**: Text, background, border, and semantic colors
- **Typography**: Font families, sizes, weights, and line heights
- **Spacing**: Consistent spacing scale
- **Border Radius**: Component corner radiuses
- **Shadows**: Elevation and depth
- **Component-specific**: Tokens for specific component states

### Theme Switching

```jsx
// Switch between light and dark themes
document.documentElement.setAttribute("data-theme", "dark");
```

## 🚀 What's Coming Up

1. **Already Done: Building Components**

   - Creating and maintaining React components that follow our design system
   - Making sure frontend and backend teams can work together smoothly
   - Keeping our docs up to date with props, variants, and design tokens

2. **Already Done: Storybook Integration**

   - Building out our React components
   - Setting up Storybook for interactive component previews
   - Adding detailed docs, props tables, and examples
   - Showing off all the cool component variants

3. **Right Now: NPM Package**
   - Packaging everything up as an NPM package
   - Adding TypeScript support
   - Writing clear docs and guides
   - Making it super easy to use in any React project

---

## 📂 What's Inside

```plaintext
uiloft/
├── design-system/     # All our design tokens and guidelines
├── library/          # The main component library
    ├── atoms/        # Basic building blocks (buttons, inputs, typography)
    ├── molecules/    # Composite components (forms, cards, navigation)
    ├── components/   # Complex UI components and layouts
    └── particles/    # Utility components and helpers
```

## 🛠️ Quick Start

```bash
# Install with npm
npm install uiloft

# Or with yarn
yarn add uiloft
```

## 🤝 Contributing

We love contributions! Here's how you can help:

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Bug Reports

Found a bug? Please [open an issue](https://github.com/ajay1773/uiloft/issues) and we'll get right on it!

## 💡 Feature Requests

Have an idea for a new feature? We'd love to hear it! [Open an issue](https://github.com/ajay1773/uiloft/issues) and let's discuss.

## 📝 License

MIT License - feel free to use it however you want!

## 🙏 Acknowledgments

Thanks to all our contributors and the open-source community for their support and feedback!

## 🌟 Star Us

If you find this project helpful, please consider giving it a star on GitHub!

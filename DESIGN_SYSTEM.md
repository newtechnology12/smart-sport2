# SmartSports RW - Apple-Inspired Design System

## Overview
This document outlines the modern Apple-inspired design system implemented for SmartSports RW, featuring a responsive navigation system and world-class user experience.

## Color Palette

### Primary Colors
- **Primary Orange**: `#ff6b35` - Main brand color
- **Secondary Orange**: `#ff8c42` - Supporting brand color
- **Background**: `#ffffff` (light) / `#000000` (dark)
- **Foreground**: `#1d1d1f` (light) / `#f5f5f7` (dark)

### Semantic Colors
- **Success**: `#34c759`
- **Warning**: `#ff9500`
- **Error**: `#ff3b30`
- **Info**: `#007aff`

## Navigation System

### Mobile Navigation (Bottom Bar)
- **Fixed bottom navigation** with centered notch design
- **Smooth curved notch** for the primary action (Tickets)
- **Apple-style icons** replacing emoji icons
- **Responsive animations** with scale and color transitions
- **Safe area support** for modern mobile devices

### Desktop Navigation (Top Bar)
- **Fixed top navigation** with glass morphism effect
- **Horizontal layout** with proper spacing
- **Hover animations** with subtle lift effects
- **Focus states** for accessibility

## Typography

### Font Hierarchy
- **Titles**: Playfair Display (serif) - Apple-style letter spacing
- **Body**: Source Sans 3 - Optimized for readability
- **UI Elements**: System font stack with proper weights

### Apple-Inspired Classes
- `.apple-title` - Large headings with tight letter spacing
- `.apple-subtitle` - Section headings
- `.apple-body` - Regular content
- `.apple-caption` - Small text and labels

## Components

### Buttons
- **Apple-style hover effects** with subtle lift
- **Rounded corners** (12px border radius)
- **Smooth transitions** using cubic-bezier easing
- **Focus states** for accessibility

### Cards
- **Glass morphism effect** with backdrop blur
- **Rounded corners** (16px border radius)
- **Hover animations** with scale and shadow
- **Subtle borders** and transparency

### Icons
- **Custom SVG icons** replacing emoji
- **Consistent sizing** and stroke width
- **Semantic naming** and proper accessibility

## Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Optimizations
- **App-like experience** with essential elements only
- **Touch-friendly targets** (minimum 44px)
- **Optimized spacing** for thumb navigation
- **Reduced cognitive load** with simplified layouts

### Desktop Enhancements
- **Larger interactive areas**
- **Hover states** and micro-interactions
- **Multi-column layouts**
- **Enhanced visual hierarchy**

## Animations & Interactions

### Timing Functions
- **Standard**: `cubic-bezier(0.4, 0, 0.2, 1)` - 200ms
- **Emphasized**: `cubic-bezier(0.4, 0, 0.2, 1)` - 300ms
- **Decelerated**: `cubic-bezier(0.0, 0, 0.2, 1)` - 250ms

### Micro-interactions
- **Button press feedback** with scale animation
- **Card hover effects** with lift and shadow
- **Navigation transitions** with smooth easing
- **Loading states** with skeleton screens

## Accessibility

### Focus Management
- **Visible focus indicators** with primary color
- **Keyboard navigation** support
- **Screen reader** optimized markup
- **Color contrast** meeting WCAG AA standards

### Touch Targets
- **Minimum 44px** touch targets on mobile
- **Adequate spacing** between interactive elements
- **Clear visual feedback** for all interactions

## Implementation Notes

### CSS Classes
- `.apple-button` - Standard button styling with hover effects
- `.apple-card` - Card component with glass effect
- `.apple-focus` - Focus state styling
- `.glass-effect` - Backdrop blur and transparency

### Safe Areas
- `.safe-area-top` - Top safe area padding
- `.safe-area-bottom` - Bottom safe area padding

### Responsive Utilities
- Mobile-first approach with progressive enhancement
- Tailwind CSS breakpoint system
- Flexible grid layouts

## Browser Support
- **Modern browsers** with CSS Grid and Flexbox support
- **Safari** (iOS 12+)
- **Chrome** (80+)
- **Firefox** (75+)
- **Edge** (80+)

## Performance Considerations
- **Optimized animations** using transform and opacity
- **Reduced motion** support for accessibility
- **Efficient CSS** with minimal repaints
- **Progressive enhancement** for older devices

# CampusPulse

CampusPulse is a campus-based community issue reporting and tracking platform designed to help students report problems around their university and follow their progress toward resolution.

The goal is to make campus communities cleaner, safer, and better connected through transparent issue reporting and management.

## Current Project Status

**Phase:** Frontend foundation and landing page

CampusPulse is currently under development. The frontend foundation and responsive landing page have been implemented. Authentication, report management, and backend functionality are planned for future development.

## Current Features

- Responsive landing page
- Navigation between application routes
- Reusable UI components
- Responsive Navbar, Footer, and Sidebar components
- Placeholder login and registration pages
- Placeholder student and administrator dashboard routes
- Consistent colors, typography, and design tokens

## Planned Features

- Student registration and authentication
- Submit campus issue reports
- Attach images to reports
- Add issue locations
- Track report status and progress
- Search and filter reported issues
- Map-based issue visualization
- Administrator dashboard and report management
- Status updates and notifications
- Optional AI-assisted issue categorization

## Technology Stack

**Frontend**
- React
- Vite
- Tailwind CSS v4
- React Router
- Lucide React
- Axios
- Leaflet

**Planned backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication
- Cloudinary for image storage

**Planned testing**
- Vitest
- Supertest

## Getting Started

### Prerequisites

- Node.js 20.19+ (or a compatible newer release)
- npm
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/keiven12a/campuspulse.git
   ```

2. Navigate into the project directory:

   ```bash
   cd campuspulse
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in your terminal, usually:

   ```text
   http://localhost:5173
   ```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates a production build |
| `npm run lint` | Checks code using ESLint |
| `npm run preview` | Previews the production build |

## Project Structure

```text
campuspulse/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── landing/
│   │   └── layout/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

### Component Organization

- `common/` — Reusable UI components such as buttons, inputs, cards, and badges.
- `landing/` — Components used to build the public landing page.
- `layout/` — Shared navigation and layout components.

## Development Roadmap

CampusPulse is being developed as a six-week learning and portfolio project.

The development plan covers:

1. Frontend foundations and reusable components
2. Authentication and student interfaces
3. Backend and database development
4. Core reporting and tracking functionality
5. Administrator features and optional AI enhancements
6. Testing, deployment, and documentation

## Project Status

This is an educational portfolio project under active development. The backend and database have not yet been implemented.

## License

No license has been specified yet.

# BOCRA - Botswana Communications Regulatory Authority

A modern, mobile-first, and accessible remake of the BOCRA website, providing comprehensive regulatory information and consumer services. This platform transforms BOCRA's digital presence into a unified, user-centric regulatory ecosystem.

## 🚀 Features

- **Unified Regulatory Portal:** Centralized access to licensing, spectrum management, and consumer protection services.
- **Role-Based Navigation:** Tailored experiences for citizens, licensees, and industry stakeholders.
- **AI-Powered Assistance:** Integrated BOCRAB (AI assistant) for 24/7 regulatory guidance.
- **Real-Time Dashboards:** Visualizations for sector statistics, licensing activity, and complaint resolution.
- **GigaMeter (QoS Tool):** Browser-based network diagnostic tool for measuring internet speeds against regulatory thresholds.
- **Secure Licensing Workflow:** Digital application and tracking for various communication sectors.
- **Responsive & Accessible:** Built with a mobile-first approach and adhering to WCAG 2.1 AA standards.
- **Dark Mode Support:** Toggle between light and dark themes for better accessibility and user preference.

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite 6, TypeScript
- **Styling:** Tailwind CSS 4, Motion (Animations)
- **Icons:** Lucide React
- **Routing:** React Router DOM 7
- **AI Integration:** Google GenAI (Gemini 2.5 Flash)
- **Form Management:** React Hook Form, Zod
- **Utilities:** clsx, tailwind-merge

## 📁 Project Structure

```text
src/
├── components/     # Reusable UI components (Layout, ThemeProvider, etc.)
├── data/           # Structured content and mock data (News, Projects, etc.)
├── lib/            # Utility functions and shared logic
├── pages/          # Main application pages (Home, Licensing, Media, etc.)
├── App.tsx         # Main routing and application entry point
├── index.css       # Global styles and Tailwind configuration
└── main.tsx        # React DOM rendering
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📄 Documentation

For more detailed information on the solution design and technical architecture, please refer to the [BOCRA Digital Transformation Proposal](./BOCRA_Proposal.docx) (if available) or the internal technical documentation.

## 🤝 Contributing

This project is part of a digital transformation initiative. Contributions and feedback are welcome to further enhance the platform's capabilities.

## ⚖️ License

Proprietary - Developed for the Botswana Communications Regulatory Authority.

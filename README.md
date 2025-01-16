# QuizStack

QuizStack is a modern, interactive quiz application built with React and TypeScript. It features a beautiful UI with dark mode support, progress tracking, and detailed analytics.

## Features

- 📝 Interactive quiz interface with immediate feedback
- 📊 Detailed progress dashboard with statistics
- 📈 Visual progress tracking with charts
- 🌓 Dark mode support
- 📱 Responsive design
- 📁 Question set management
- ⏱️ Time tracking for each attempt
- 📊 Success rate analytics

## Tech Stack

- React 18
- TypeScript
- Vite
- TailwindCSS
- Chart.js
- Lucide Icons

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/quiz-stack.git
cd quiz-stack
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

### Creating Question Sets

Question sets can be uploaded in JSON format with the following structure:

```json
{
  "id": "unique-id",
  "name": "Question Set Name",
  "questions": [
    {
      "id": "q1",
      "text": "Question text?",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "correctAnswer": "Option 1",
      "explanation": "Optional explanation for the answer"
    }
  ]
}
```

### Dashboard

The dashboard provides:
- Average score across all attempts
- Total questions attempted
- Overall success rate
- Total time spent
- Progress visualization (table and graph views)
- Filtering by question sets

## Development

### Project Structure

```
quiz-stack/
├── src/
│   ├── components/     # React components
│   ├── context/        # React context providers
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── public/             # Static assets
└── index.html          # HTML template
```

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

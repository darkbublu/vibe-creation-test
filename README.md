# Tic-Tac-Toe Online

A modern, interactive online tic-tac-toe game built with React and TypeScript. Play against friends or challenge the AI in this beautifully designed web application.

## Features

- 🎮 **Interactive Gameplay**: Smooth, responsive tic-tac-toe game interface
- 🤖 **AI Opponent**: Play against an intelligent computer opponent
- 👥 **Two Player Mode**: Play with friends on the same device
- 🎨 **Modern UI**: Clean, responsive design with smooth animations
- 📱 **Mobile Friendly**: Optimized for both desktop and mobile devices
- 🔄 **Game Statistics**: Track your wins, losses, and draws
- ⚡ **Real-time Updates**: Instant game state updates

## How to Play

1. Choose your game mode (vs AI or vs Player)
2. Players take turns placing X's and O's on the 3x3 grid
3. First player to get 3 in a row (horizontally, vertically, or diagonally) wins!
4. If all squares are filled with no winner, it's a draw

## Game Rules

- X always goes first
- Players alternate turns
- A player wins by placing three marks in a row:
  - Horizontally (across)
  - Vertically (up and down)
  - Diagonally (corner to corner)
- The game ends when someone wins or all squares are filled

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tic-tac-toe-online
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
tic-tac-toe-online/
├── README.md
├── package.json
├── tsconfig.json
├── public/
│   └── index.html
├── core/
│   ├── types.ts          # Game types and interfaces
│   ├── game/
│   │   ├── logic.ts      # Game logic and rules
│   │   ├── ai.ts         # AI opponent logic
│   │   └── utils.ts      # Game utilities
│   └── hooks/
│       ├── useGame.ts    # Game state management
│       └── useStats.ts   # Statistics tracking
└── ui/
    ├── components/
    │   ├── Game/
    │   │   ├── Board.tsx
    │   │   ├── Square.tsx
    │   │   └── GameInfo.tsx
    │   ├── Menu/
    │   │   ├── GameMenu.tsx
    │   │   └── ModeSelector.tsx
    │   └── common/
    │       ├── Button.tsx
    │       └── Card.tsx
    ├── styles/
    │   ├── globals.css
    │   └── components.css
    └── App.tsx
```

## Technologies Used

- **React 18** - Frontend framework
- **TypeScript** - Type safety and better development experience
- **Emotion** - CSS-in-JS styling
- **React Router** - Navigation and routing
- **Modern CSS** - Responsive design and animations

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run lint` - Runs ESLint to check code quality
- `npm run format` - Formats code using Prettier

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Inspired by the classic tic-tac-toe game
- Built with modern web technologies for the best user experience
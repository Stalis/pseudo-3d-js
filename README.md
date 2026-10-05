# pseudo-3d-js

[![Node.js CI](https://github.com/Stalis/pseudo-3d-js/actions/workflows/node.js.yml/badge.svg)](https://github.com/Stalis/pseudo-3d-js/actions/workflows/node.js.yml)
[![CodeQL](https://github.com/Stalis/pseudo-3d-js/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Stalis/pseudo-3d-js/actions/workflows/codeql-analysis.yml)

A browser-based pseudo-3D game engine built in TypeScript. It uses raycasting for rendering and an entity-component-system architecture powered by ECSY.

## Screenshots

![Game screenshot 1](docs/images/screenshot-1.png)


## Features

- Raycasting-based pseudo-3D renderer
- Entity-component-system architecture
- Keyboard-controlled movement and rotation
- Animated sprites and character portraits
- JSON-based game configuration
- Separate engine, gameplay, and UI layers
- Automated builds and CodeQL analysis with GitHub Actions

## Technology

- TypeScript
- ECSY
- HTML Canvas
- Webpack
- GitHub Actions

## Getting started

Prerequisites:

- Node.js
- npm

Install the dependencies and start the development server:

```bash
npm install
npm start
```

Webpack will build the project and open it in your browser.

To create a production build:

```bash
npm run build
```

## Controls

| Action | Keys |
|---|---|
| Move forward | `W` or `Arrow Up` |
| Move backward | `S` or `Arrow Down` |
| Strafe left | `A` or `Arrow Left` |
| Strafe right | `D` |
| Turn left | `Q` |
| Turn right | `E` |

## Project structure

- `src/engine` — rendering engine and shared utilities
- `src/game/components` — ECS components
- `src/game/systems` — input, movement, actions, UI, and raycasting systems
- `src/game/ui` — game interface
- `assets` — textures and UI assets

## License

Distributed under the BSD 3-Clause License. See [LICENSE](LICENSE) for details.

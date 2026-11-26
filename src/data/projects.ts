import CalcDemoImg from "../assets/CalcDemo.JPG";
import toDoDemo from "../assets/todo.JPG";
import windowsXPImg from "../assets/windowsxp.JPG";
import cryptoImg from "../assets/crypto.JPG";
import lavaImg from "../assets/lava.png";
import bwImg from "../assets/bw.png";
import boredImg from "../assets/bored.png";
import bookImg from "../assets/bookImg.png";
import greenilityImg from "../assets/greenility.png";
import { Project } from "../types";

export const projects: Project[] = [
  {
    id: "1",
    title: "Windows XP Emulated in React",
    description:
      "A nostalgic, fully interactive Windows XP desktop recreated in the browser with React and TypeScript.",
    longDescription:
      "A Windows XP desktop in the browser with draggable, resizable windows, a Start menu, taskbar, folder navigation, a file explorer and a text editor with file saving. It also runs DOS games like DOOM alongside Minesweeper and Solitaire, complete with classic Windows sounds.",
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Zustand",
      "XP.css",
      "React-RND",
      "Framer Motion",
      "js-dos",
    ],
    imageUrl: windowsXPImg,
    demoUrl: "https://windows-xp-orpin.vercel.app/",
    codeUrl: "https://github.com/BrandonGreenDev/WindowsOSinBrowser",
    featured: true,
  },
  {
    id: "9",
    title: "Greenility UI: Accessible React Component Library",
    description:
      "An accessible, themeable React component library built from scratch, targeting WCAG 2.2 AA.",
    longDescription:
      "21 React components, from Button and TextField to Dialog, Menu, Select and a sortable DataTable, each built on native HTML or a WAI-ARIA pattern, with design tokens driving light and dark themes and zero runtime dependencies. Backed by about 1,400 unit tests plus axe checks on every Storybook story in Chromium, Firefox and WebKit, with theme contrast tested in CI.",
    technologies: [
      "React",
      "TypeScript",
      "Storybook",
      "Vite",
      "Vitest",
      "Testing Library",
      "Playwright",
      "axe-core",
      "WAI-ARIA",
      "Design Tokens",
      "GitHub Actions",
    ],
    imageUrl: greenilityImg,
    demoUrl: "https://greenility-ui.vercel.app",
    codeUrl: "https://github.com/BrandonGreenDev/greenility-ui",
    featured: true,
  },
  {
    id: "2",
    title: "A Simple Calculator",
    description:
      "A working calculator built on top of an image of a real one, so it feels like pressing physical keys.",
    longDescription:
      "Calculator logic mapped directly onto an image of a physical calculator, so every key on the picture works as a real button. Built with React, TypeScript and Tailwind CSS.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    imageUrl: CalcDemoImg,
    demoUrl: "https://brandongreendev.github.io/anothercalculator/",
    codeUrl: "https://github.com/BrandonGreenDev/anothercalculator",
    featured: false,
  },
  {
    id: "3",
    title: "Crypto Currency Portfolio Tracker",
    description:
      "A modern cryptocurrency tracker and portfolio management app with real-time market data.",
    longDescription:
      "A cryptocurrency tracker and portfolio manager that pulls real-time market data from a third-party API. Built to showcase polished UI/UX design and smooth animations on top of a live data integration.",
    technologies: [
      "React",
      "TypeScript",
      "JSX/TSX",
      "Vite",
      "Tailwind CSS",
      "PostCSS",
      "Autoprefixer",
      "Axios",
      "Recharts",
      "ESLint",
      "Prettier",
    ],
    imageUrl: cryptoImg,
    demoUrl: "https://bg-dev-cryptotracker.vercel.app/",
    codeUrl: "https://github.com/BrandonGreenDev/cryptotracker",
    featured: true,
  },
  {
    id: "4",
    title: "Task Management App",
    description:
      "A to-do app inspired by Things, with section, date and priority filtering.",
    longDescription:
      "A task manager inspired by the Things app, with sectional filtering, date-time filtering and important-task filtering. Tasks persist in LocalStorage, and the UI is built with Material-UI.",
    technologies: ["React", "TypeScript", "LocalStorage", "Material-UI"],
    imageUrl: toDoDemo,
    demoUrl: "https://brandongreendev.github.io/ThingsAlternative/",
    codeUrl: "https://github.com/BrandonGreenDev/ThingsAlternative",
    featured: false,
  },
  {
    id: "5",
    title: "Lava Wall",
    description:
      "A full-screen, interactive lava lamp you can stir, slice and heat by hand.",
    longDescription:
      "An interactive lava lamp in raw WebGL with no runtime dependencies: glossy metaball blobs heat, rise, cool and sink, and merge or split as you stir and swipe through them. Any color, adjustable settings, keyboard shortcuts, and reduced-motion support.",
    technologies: [
      "TypeScript",
      "Vite",
      "WebGL",
      "Canvas API",
      "Pointer Events",
      "HTML5",
      "CSS3",
    ],
    imageUrl: lavaImg,
    demoUrl: "https://lava-wall.vercel.app/",
    featured: true,
  },
  {
    id: "6",
    title: "Beautiful Weather",
    description:
      "A design-first weather app that presents real-time conditions in a clean, modern interface.",
    longDescription:
      "A weather app focused on modern, polished design, fetching real-time weather data from the Open-Meteo API. Built with TypeScript, HTML5 and CSS3 on Vite.",
    technologies: ["TypeScript", "HTML5", "CSS3", "Vite", "Open-Meteo API"],
    imageUrl: bwImg,
    demoUrl: "https://beautiful-weather-one.vercel.app/",
    codeUrl: "https://github.com/BrandonGreenDev/beautiful-weather",
    featured: false,
  },
  {
    id: "7",
    title: "Bored APIs!",
    description:
      "An Angular app that pulls from multiple APIs using RxJS for when you're bored.",
    longDescription:
      "An Angular app that uses RxJS to fetch data from multiple API endpoints and present it in a clean, modern layout. It mixes fun components with real-life use cases.",
    technologies: ["TypeScript", "Angular", "HTML5", "CSS3", "RxJS"],
    imageUrl: boredImg,
    demoUrl: "https://bg-bored-app.vercel.app/",
    codeUrl: "https://github.com/BrandonGreenDev/bored",
    featured: false,
  },
  {
    id: "8",
    title: "Book Explorer",
    description:
      "Search, filter and favorite books from the Open Library public API.",
    longDescription:
      "An Angular 20 app built with Signals and a reactive RxJS search pipeline over the Open Library public API. Search, filter and favorite any book in the catalog.",
    technologies: [
      "TypeScript",
      "HTML5",
      "CSS3",
      "Angular 20.0",
      "Angular Signals",
      "RxJS",
      "API",
    ],
    imageUrl: bookImg,
    demoUrl: "https://bg-book-explorer.vercel.app/search",
    codeUrl: "https://github.com/BrandonGreenDev/BookExplorer",
    featured: true,
  },
];

# Tennessee Association of Pupil Transportation

The official website for the Tennessee Association of Pupil Transportation (TAPT), promoting safe transportation for all Tennessee school children through education, training, and advocacy.

## 🚀 Features

- Conference registration system
- Regional luncheon registration
- Hall of Fame nominations
- Board member directory
- Resource library
- Administrative dashboard

## 🛠️ Tech Stack

- [Astro](https://astro.build) - Static site generator
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [LibSQL](https://github.com/libsql/libsql) - SQLite-compatible database for local and production use

## 📦 Dependencies

```json
{
  "dependencies": {
    "astro": "^5.2.5",
    "@astrojs/tailwind": "^5.1.0",
    "@libsql/client": "^0.5.6",
    "tailwindcss": "^3.4.1"
  }
}
```

## 🚦 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 📝 Available Commands

| Command                   | Action                                           |
| :----------------------- | :----------------------------------------------- |
| `npm install`            | Installs dependencies                            |
| `npm run dev`            | Starts local dev server at `localhost:4321`      |
| `npm run build`          | Build your production site to `./dist/`          |
| `npm run preview`        | Preview your build locally, before deploying     |
| `npm run astro ...`      | Run CLI commands like `astro add`, `astro check` |

## 🗄️ Database

This project uses LibSQL, a SQLite-compatible database that automatically creates a local `conference.db` file when you first run the application. No additional configuration is required for development.

## 📄 License

All rights reserved. © Tennessee Association of Pupil Transportation.
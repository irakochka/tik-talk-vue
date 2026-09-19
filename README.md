# Tik Talk

Tik Talk is a social network training project built with Vue 3, TypeScript and Vite.

The app is still in progress: not all planned screens and features are implemented yet. At the moment the main focus is the profile flow, profile editing and basic post interactions.

## Demo

GitHub Pages:

https://irakochka.github.io/tik-talk-vue/

## Tech Stack

- Vue 3
- TypeScript
- Vite
- Vue Router
- Pinia
- Axios
- Vue Toastification

## Implemented

- Authentication screen
- Profile page
- Profile editing
- Avatar upload preview
- Creating posts
- Updating posts
- Deleting posts
- Creating comments
- Subscribers block
- Protected and guest-only routes
- GitHub Pages deployment workflow

## In Progress

The project is not feature-complete yet.

Known current limitations:

- comments can be created, but comment editing and deleting are not implemented yet
- chats page is not implemented yet
- search page is not implemented yet
- some UI states and error states may still be missing
- production deployment depends on the external course API

## Project Setup

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## API

In development, API requests are proxied through Vite:

```txt
/yt-course -> https://icherniakov.ru
```

In production, requests are sent directly to:

```txt
https://icherniakov.ru/yt-course
```

## Deployment

The project is configured for GitHub Pages. Production build uses the repository base path:

```txt
/tik-talk-vue/
```

Deployment runs through GitHub Actions on pushes to the `main` branch.

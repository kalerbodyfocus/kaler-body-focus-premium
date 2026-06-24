# Kaler Body Focus — Premium Web Platform

A premium, evidence-based personal training and online coaching web application for Kaler Body Focus. Built with **TanStack Start**, **React**, **TypeScript**, and **Vite** with a responsive layout and customized Framer Motion scroll interactions.

---

## Technical Stack

- **Framework**: [TanStack Start](https://tanstack.com/router/v1/docs/start/overview) (React SSR/hydration framework)
- **Build System**: Vite & Nitro (production server compiler)
- **Styling**: Tailwind CSS v4 & custom utility classes
- **Animations**: Framer Motion & CSS custom keyframes
- **Icons**: Lucide React
- **Hosting targets**: VPS, Vercel, Netlify, Cloudflare Pages, Render, Railway, AWS

---

## Local Development

### 1. Installation

Install the project dependencies:

```bash
npm install
```

### 2. Run Dev Server

Launch the development server with hot-module reloading:

```bash
npm run dev
```

_The dev server typically starts at `http://localhost:3000`._

---

## Production Build & Run

To build the application for production, compile the SSR build, and generate a standalone Nitro server:

### 1. Build

```bash
npm run build
```

This generates:

- `dist/client/` — Client-side hydrated assets.
- `dist/server/` — Server-side renderer.
- `.output/` — Standalone production server bundle compiled by Nitro.

### 2. Start the Server

Launch the compiled production SSR server:

```bash
npm run start
```

_The default production server runs at `http://localhost:3000`._

---

## Configuration & Environment Variables

All core constants and values are centralized in `src/config/site-config.ts` for ease of maintenance. You can also override default values using environment variables in a `.env` file at the root of the project:

| Variable               | Description                                             | Default Value              |
| ---------------------- | ------------------------------------------------------- | -------------------------- |
| `VITE_WHATSAPP_NUMBER` | WhatsApp phone number with country code (no `+` or `-`) | `64220749673`              |
| `VITE_CONTACT_EMAIL`   | Contact and inquiry email address                       | `kalerbodyfocus@gmail.com` |
| `PORT`                 | Server port in production                               | `3000`                     |

---

## Deployment Guide

This project is configured with a portable Nitro backend, which means it compiles to a standalone application that can run on any server or edge network.

### 1. Deploying to Vercel (recommended)

Vercel automatically detects TanStack Start / Nitro builds.

1. Connect your Git repository to Vercel.
2. The framework preset should auto-detect as **Vite** or **TanStack Start**.
3. If manual settings are required:
   - **Build Command**: `npm run build`
   - **Output Directory**: `.output/public` (static) or configure the project as a server.

### 2. Deploying to Netlify

1. Connect the repository to Netlify.
2. Netlify will auto-detect the build config.
3. If configuring manually:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `.output/public`

### 3. Deploying to Cloudflare Pages

Nitro supports compiling directly to a Cloudflare Pages functions target.

1. Install wrangler globally: `npm install -g wrangler`
2. Run build with Cloudflare preset:
   ```bash
   NITRO_PRESET=cloudflare-pages npm run build
   ```
3. Deploy the `.output/public` folder to Cloudflare Pages.

### 4. Deploying to VPS (Hostinger, DigitalOcean, AWS, Render, Railway)

To host the app on a VPS or cloud service running Node.js:

1. Clone the project onto your server.
2. Install dependencies:
   ```bash
   npm install --production
   ```
3. Build the project:
   ```bash
   npm run build
   ```
4. Start the server using a process manager like **PM2** to keep it running in the background:
   ```bash
   pm2 start .output/server/index.mjs --name "kaler-body-focus"
   ```
5. Set up a reverse proxy using Nginx to route traffic from port 80/443 to port 3000.

---

## Codebase Structure

- [src/config/site-config.ts](file:///h:/client/New%20zealand/kaler-body-focus-premium-main/src/config/site-config.ts) — Centralized configuration for all text, CTAs, FAQ items, and social URLs.
- [src/components/site/Logo.tsx](file:///h:/client/New%20zealand/kaler-body-focus-premium-main/src/components/site/Logo.tsx) — Reusable premium logo component rendering the high-res white brand logo.
- [src/components/site/Sections.tsx](file:///h:/client/New%20zealand/kaler-body-focus-premium-main/src/components/site/Sections.tsx) — Layout components for sections (Hero, Services, Testimonials, FAQ, Contact, Footer).
- [src/components/site/Nav.tsx](file:///h:/client/New%20zealand/kaler-body-focus-premium-main/src/components/site/Nav.tsx) — Sticky header navigation component.
- [src/components/site/Floating.tsx](file:///h:/client/New%20zealand/kaler-body-focus-premium-main/src/components/site/Floating.tsx) — Floating actions (WhatsApp chat button, scroll-to-top) and Mobile Sticky CTA.
- [src/routes/\_\_root.tsx](file:///h:/client/New%20zealand/kaler-body-focus-premium-main/src/routes/__root.tsx) — Root application shell, viewport configuration, and Favicon meta tags.

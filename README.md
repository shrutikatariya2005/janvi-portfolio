# Janvi Movaliya — Portfolio

React + Vite + Three.js. Light, icy, cold-palette creative portfolio.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into /dist
```

## Edit your content

Everything (text, skills, projects, Figma links) lives in **`src/data.js`**.

- Live demo link for Next Hire: set `project.demoUrl`.
- Résumé shown in the site: replace `public/resume.pdf`.

## Add your Figma designs

### Option A — live Figma embed (recommended)
1. Open your design in Figma → click **Share**.
2. Under "General access" choose **Anyone with the link → can view**.
3. Click **Copy link**.
4. Paste it into `figmaUrl` for the matching item in `designs` in `src/data.js`.
5. Save. The prototype appears in the **Design Lab** section, with an "Open in Figma" link.

You can link a specific frame: right-click the frame → **Copy link to selection**.

### Option B — images
1. In Figma select a frame → **Export** (right panel) → PNG, 2x → Export.
2. Put the file in `public/figma/` (e.g. `public/figma/next-hire.png`).
3. Set `image: '/figma/next-hire.png'` in `src/data.js`.

Add more cards by copying an object in the `designs` array.

## Deploy

### Vercel (easiest)
1. Push this folder to a GitHub repository.
2. Go to vercel.com → **Add New → Project** → import the repo.
3. Framework: **Vite** (auto-detected). Build command `npm run build`, output `dist`. Click **Deploy**.

### Netlify
- Drag the built `dist` folder onto app.netlify.com/drop, **or** connect the GitHub repo
  (build command `npm run build`, publish directory `dist`).

### GitHub Pages
```bash
npm run build
npx gh-pages -d dist
```
Then enable Pages from the `gh-pages` branch in repo settings.

## Contact (static)

The contact section is static: email (mailto + copy button), phone, GitHub, and résumé view/download.
There is no form and no backend.

## Hero background

By default the hero has an animated cold aurora and a fine grid behind the 3D prisms.
To use your own image instead, put it in `public/` (e.g. `public/hero.jpg`) and set `heroImage: '/hero.jpg'` in `src/data.js`.

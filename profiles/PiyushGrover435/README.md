# Piyush Grover — Profile Card

This folder contains a self-contained profile card component ready for Netlify deploy.

How to test locally

1. Open a terminal in this folder and run a simple static server (Python):

```powershell
python -m http.server 8000
# open http://localhost:8000 in your browser
```

2. Confirm the card loads and the background (provided in `assets/images/bg.jpeg`) appears behind the glass card.

Netlify deploy

1. In Netlify dashboard choose "Add new site" → "Deploy manually" and drag this folder (`PiyushGrover435`) only.
2. Change site name in settings and copy the live URL.

Remember to update the root `contributors.json` with the live Netlify URL and add `tags` before creating your PR.

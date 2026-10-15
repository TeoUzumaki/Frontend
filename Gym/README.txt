FORM / Exercise Atlas — /Gym/ installation

1. Create a folder named Gym (capital G) inside your website frontend/public web root.
2. Extract the CONTENTS of this ZIP directly into that Gym folder. Do not create Gym/Gym.
3. Ensure your server serves the frontend directory as the website root and supports static files.
4. Visit https://your-domain.example/Gym/ (case sensitive on many hosts).
5. On iPhone Safari: Share > Add to Home Screen > Open as Web App > Add.

This app has its own /Gym/ manifest, icon paths, and service worker scope. It does not claim the rest of your website.
Requires HTTPS for service worker / installation behavior (localhost is an exception).
The 3D viewer uses an external Three.js library and requires network access; other app assets are cached.
Animations remain schematic and should not be used as authoritative form instruction.

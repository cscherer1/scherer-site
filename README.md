SCHERER SITE (FRONTEND)

DESCRIPTION
React + TypeScript + Vite single page app for christianscherer.dev. Public pages are Landing, Projects, About, and Contact. A hidden Admin page at /admin lets you log in, then create, edit, or delete projects through the API. Styling uses plain CSS modules and a dark theme with CSS variables. SEO meta, Open Graph, robots.txt, sitemap.xml, and Vercel Analytics are included.

REQUIREMENTS
Node 20 or newer.
pnpm installed.

QUICK START (LOCAL)
Open a terminal in the site folder.
cd .\scherer-site
pnpm install
Create a .env file with the API URL you want to use.
echo VITE_API_URL=https://localhost:7210
 > .env
Start the dev server.
pnpm dev --host
Open http://localhost:5173

BUILD AND PREVIEW
Build a production bundle.
pnpm build
Preview the built app locally.
pnpm preview
Open the address printed in the terminal (defaults to http://localhost:4173
)

ENVIRONMENT VARIABLES
VITE_API_URL is required so the site knows where your API lives.
Example for local development:
VITE_API_URL=https://localhost:7210

Example for production with Render:
VITE_API_URL=https://YOUR-RENDER-SERVICE.onrender.com

Set this in a .env file locally and in Vercel Project Settings for Production (and Preview if desired).

ROUTING
Client routing is handled by react-router-dom.
Routes:
/
/projects
/about
/contact
/admin (hidden, not linked in the header)
Deep links require an SPA rewrite in production. If you see 404 on refresh for /about or /projects, configure Vercel to rewrite all paths to /index.html. You can do this either via Vercel project settings (Enable “Single Page Application” behavior) or by adding a vercel.json file at the repo root with the following content:
{
"rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}

ADMIN PAGE
Open /admin.
Enter the admin password. The site calls POST /api/auth/login and stores the returned JWT token in memory only (not in localStorage). Refreshing the page clears the token.
After login you can Create, Edit, and Delete projects. Field validation errors from the API appear inline under the fields. If you get 401 errors, your token likely expired; log in again.

PROJECT STRUCTURE (HIGH LEVEL)
src/main.tsx bootstraps React and the router.
src/pages contains Landing, Projects, About, Contact, Admin, and NotFound.
src/components contains shared UI such as Header, Footer, and ProjectCard.
src/lib contains api.ts, auth.ts, and types.ts.
public contains index.html, robots.txt, sitemap.xml, favicon files, and og.png.
styles are component-scoped with *.module.css plus a global index.css for variables.

API INTEGRATION
All API calls go through src/lib/api.ts. The base URL is read from VITE_API_URL. The Authorization header is attached automatically when a JWT token is present in memory. To change or add endpoints, extend api.ts and types.ts.

SEO AND META
index.html includes the title, description, canonical tag, Open Graph tags, a Twitter card, and the favicon link. Update the title, description, and canonical URL if your domain changes. Replace /og.png with a 1200x630 social image that fits your brand. robots.txt disallows /admin and allows indexing of public pages. sitemap.xml lists your public routes.

ANALYTICS AND SPEED INSIGHTS
Vercel Analytics and Speed Insights scripts are included in index.html. No extra code is needed beyond deploying on Vercel. You can verify events in the Vercel dashboard after traffic.

STYLING
The app uses a dark theme based on CSS variables declared in index.css. Components can import module CSS files (example: hero.module.css). Keep spacing consistent and prefer CSS variables for colors and sizes to maintain theme consistency.

ACCESSIBILITY AND PERFORMANCE NOTES
Use semantic tags where possible (header, main, footer). Provide alt text on images. Keep link texts descriptive. Avoid large images in /public. Vite automatically code-splits; keep third party libraries minimal.

DEPLOYMENT ON VERCEL
Connect your GitHub repo to Vercel and import the project. Set the Build Command to pnpm build and the Output Directory to dist. Set the Environment Variable VITE_API_URL to your production API base URL (for example https://YOUR-RENDER-SERVICE.onrender.com
). Enable the SPA rewrite or include vercel.json as described above to avoid 404s on deep links. After deploy, open your custom domain and verify navigation and the /admin flow.

CORS AND HTTPS
If you see CORS errors in the browser console when calling the API, add your site origin to the API CORS policy and redeploy the API. Always use https for both site and API in production to avoid mixed content and to keep tokens safe in transit.

TROUBLESHOOTING
If clicking a tab works but refreshing on that page returns 404, add the SPA rewrite so all paths serve index.html. If Admin login fails with 401 or 403, check that VITE_API_URL points to the correct API and that the API is running and reachable over https. If the admin form shows red validation messages, the API rejected input according to server rules; adjust the fields and resubmit. If images or icons do not appear, confirm files exist in /public and paths are correct (for example /favicon.svg and /og.png).

MAINTENANCE
When adding new fields to a project, update both the API DTOs and validators, then update the site’s types in src/lib/types.ts, the forms in src/pages/Admin, and the project cards in src/pages/Projects. If you change the API base route or auth behavior, update src/lib/api.ts accordingly and redeploy both the API and the site.

LICENSE
Private portfolio project. © Christian Scherer.

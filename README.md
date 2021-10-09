[![Netlify Status](https://api.netlify.com/api/v1/badges/55d0e9f5-8e0d-422e-a3d0-38a79ecf2413/deploy-status)](https://app.netlify.com/sites/lancer-briefings/deploys)
# Lancer Briefings

**[Live Demo](https://lancer.kuenaimaku.com/)** (No Room for a Wallflower Spoilers)

Go over mission briefings within the LANCER Universe in style by showing your players a fully animated mission briefing screen, with a Mirrorsmoke Mercenary Company theme.

## Credits

* Alkyama#2737 (discord) for the original [Figma Template](figma.com/community/file/983540597915480981) used as reference.
* [VantaJS](https://www.vantajs.com/) for the slick 3d openGL backgrounds.

## Requirements
- Node (v14+)
- Light Text Editor (VSCode Recommended)
## Setup

`npm install`

## Build Scripts

`npm run dev` - Serve the webapp with hot reloads (for development work)  
`npm run build` - Build for production  
`npm run serve` - Locally preview production build

## Customization
Customization is handled in a couple of places.

### Main.scss
This file holds a majority of the colors, fonts, and sizes of the webapp. Play around with the values in the marked customization section.

### Index.html
This file houses the [VantaJS](https://www.vantajs.com/) background used in the web application. Go to the site, mess with the different effect options, and once you're ready, replace the `VANTA.WAVES` script with your customized one. Note that if you use a different effect, you'll have to replace the script url above it with one from [their CDN repository](https://cdn.jsdelivr.net/npm/vanta@latest/dist/).

### /public folder
This folder holds all of the assets.

- `/icons` - If you want to replace the icons used across the application, this is where you'd swap them.
- `/missions` - This is where the summaries of missions are held. The filename MUST match the `slug` property within the App's data.
- `/pilots` - This is where the images of pilots and their bios are held. Filenames MUST match the `callsign` property on pilots.
- `/mechs` - This is where the images of mechs are held. Filenames MUST match the `mech` property on pilots.
- `bullet.png` - This replaces the default bullet point in Markdown areas.
- `events.md` - This is the Markdown file used to create the Event Log pane.
- `planet.webm` - This is the planet rotation video used in the header.
- `startup.ogg` - This is the sound that plays on page load.

### App.vue
This file contains the basic structure of the entire application - and houses the data for all the various places. within the file, find the `data()` method. Edit this to change what missions are available, which one loads initially, set the pilot information, and change what the header says. Below are the values you might have to change.

- `mission_slug` - Controls what mission file is selected on startup. This MUST match a markdown file within the `/public/missions/` directory.
- `missions.slug` - Controls what markdown file is selected when this mission is selected. This MUST match a markdown file within the `/public/missions/` directory.
- `missions.name` - Controls what name the mission has in the mission list.
- `missions.status` - controls what badge the mission has. Acceptable values are `start`, `partial-success`, `success`, and `failure`. 
- `pilots.callsign` - Controls what appears in the callsign section of the pilot roster. MUST match pilot portraits and biography markdown files within the `/public/pilots/` directory.
- `pilots.alias` - Controls what appears in the Name or Legal Alias section of the pilot roster.
- `pilots.code` - Controls what appears underneath the Name or Legal Alias section of the pilot roster.
- `pilots.corpro` - Controls what appears first in the mech's header section.
- `pilots.frame` - Controls what appears second in the mech's header section.
- `pilots.mech` - Controls what appears under the mech's header section. MUST match mech images within the `/public/mechs/` directory.
- `header` section - this should be self explanitory.

## Hosting Recommendations

I would strongly recommend using [Netlify](https://www.netlify.com/) for hosting, as there's no cost for hosting, has Continuous Deployment, and they'll provide a url. Register for an account, and click the `New Site from Git` button.  
On the next page, pick the git service you used to fork this repo with, and authenticate. On the next page, select the `lancer-briefings` repository. If you can't see the repository listed on the page, click the `Can’t see your repo here? Configure the Netlify app on <git site>` link at the bottom of the page.  
Finally, make sure the branch being deployed is `master`, the `base directory` field is blank, the `build command` is `npm run build`, and the publish directory is `dist`. 

Once the site builds remotely, click on the link provided in the `site overview` tab and make sure everything looks right.

Alternatively, if you use github, you can probably rely on github-pages. Take a look at the [vite documentation](https://vitejs.dev/guide/static-deploy.html#github-pages) for more info.

## Usage within FoundryVTT

install the [Inline Webviewer](https://foundryvtt.com/packages/inlinewebviewer) module and use the new button to send websites to your players - namely this one. Best viewed at 1920x1080.


# Ben Mackert: Portfolio Website

A static one-page portfolio (plain HTML/CSS/JS, no build step) ready for Cloudflare Pages with automatic deployments from GitHub.

```
Portfolio/
├── firebase.json        Hosting config (serves ./public)
├── .firebaserc          Firebase project ID: edit this
└── public/
    ├── index.html       The site
    ├── styles.css
    ├── script.js        Theme toggle, project filters, scroll reveal
    ├── 404.html
    └── assets/
        ├── img/         Board photos, layouts, diagrams (resized)
        └── docs/        Resume + report PDFs linked from the site
```

## Preview locally

```bash
cd ~/Documents/Portfolio && python3 -m http.server 8080 --directory public
```

Then open http://localhost:8080. Or use `firebase serve` / `firebase emulators:start --only hosting`.

## Deploy to Cloudflare Pages (GitHub)

1. In Cloudflare, open Workers & Pages → Create application → Pages → Import an existing Git repository.
2. Connect GitHub and select `ben-mackert/Ben-Mackert-Portfolio`.
3. Use these settings:

   | Setting | Value |
   | --- | --- |
   | Production branch | `main` |
   | Framework preset | None |
   | Build command | `exit 0` |
   | Build output directory | `public` |
   | Root directory | Leave blank (repository root) |

4. Save and deploy. Cloudflare supplies a `pages.dev` address.
5. Optionally add your domain from the project's Custom domains tab.

After connecting, pushes to `main` automatically deploy the updated site. A Pages project originally created using Direct Upload requires a new Git-integrated project.

## Publish future changes

Edit files in `public/`, preview locally, then:

```bash
git add public README.md
git commit -m "Update portfolio"
git push
```

The repository is `git@github.com:ben-mackert/Ben-Mackert-Portfolio.git`.

[Cloudflare static HTML deployment documentation](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/)

## Deploy to Firebase

1. Create a project at https://console.firebase.google.com (e.g. `ben-mackert`). The project ID becomes your URL: `https://<project-id>.web.app`.
2. Log in and link the project:
   ```bash
   firebase login
   cd ~/Documents/Portfolio
   firebase use --add          # pick your project, alias it "default"
   ```
   (or just replace `YOUR-FIREBASE-PROJECT-ID` in `.firebaserc`)
3. Deploy:
   ```bash
   firebase deploy --only hosting
   ```
4. Optional: add a custom domain in the Firebase console under Hosting → Add custom domain.

## Where the content came from

| Site section | Source in ~/Documents |
|---|---|
| Experience, skills, courses | `Resume/Full-Time Resume/Ben_Mackert_Resume_2026.tex` |
| Board 2 noise PCB | `WindBorneApplication/README.md` (+ images) |
| Board 1 / Trace resistance reports | `Fall 2026/ECEN 3730/*/` (compiled PDFs) |
| RTOS Labyrinth | `Spring 2026/ECEN 3753/final-project-benmackert/docs/finalReport.md` → PDF |
| Embedded AI | `Fall 2026/ECEN 5003/PROJECT-SUMMARY.md` → PDF; wake-word metrics from `lab1…/submission/*.json` |
| RISC-V CPU | `Spring 2026/ECEN 3593 /phase-1…7` |
| Capstone (SPICE) | `Fall 2026/ECEN 4610/Senior-Capstone-F2` |
| Linear Systems projects | `Spring 2026/ECEN 3300/*/` |
| Writing sample | `Spring 2026/WRTG 3030/…Final Professional Researched Paper….docx` → PDF |
| Skopos / Slice | `Skopos/lidar-drone`, `Slice/` |
| Marathon | `Fall 2025/Ben_Mackert_Boulderthon_Results.jpg` |

To update the resume, recompile the LaTeX and copy the PDF over `public/assets/docs/Ben_Mackert_Resume.pdf`.

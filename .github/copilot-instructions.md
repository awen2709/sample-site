Purpose

This file gives Copilot sessions repository-specific guidance: where to find build/deploy plumbing, the high-level architecture, and repo conventions that affect automated edits or suggestions.

1) Build, test, and lint commands

- No build, test, or linter configuration detected (no package.json, Makefile, pytest/Go/Java configs, or CI test jobs).
- Preview locally (single-file static site):
  - Open the HTML file in a browser (file://...).
  - Or run a lightweight local server from the repo root to preview a single file:
    - Python 3: python -m http.server 8000
    - Node (if installed): npx http-server . -p 8000
- CI / deployment: GitHub Actions workflow at .github/workflows/deploy.yaml deploys site to GitHub Pages on push to branch "master". The workflow uploads the repository root (path: '.') as the artifact.

2) High-level architecture

- Static site (single-page HTML + CSS). Primary front-end assets are simple HTML and a stylesheet. No build step or static site generator detected.
- Deployment is handled by a GitHub Actions workflow named "Deploy Static Site to Pages" that:
  - Triggers on pushes to master
  - Checks out the repo, configures Pages, uploads the repository root as the artifact, and deploys via actions/deploy-pages
- Expectation: GitHub Pages will serve whatever is present at the repository root at deployment time.

3) Key conventions and notes for Copilot sessions

- Where to look for entry point(s): check for index.html at the repository root. The current index.html is located at .github/workflows/index.html, which is non-standard for Pages deployments (the workflow uploads '.'). When suggesting moves/edits, prefer placing site entry files and public assets at the repository root unless the workflow is intentionally changed.
- Branch convention: deployment workflow listens to branch "master". If suggesting CI changes or new branches, account for that trigger.
- Deployment path: the Actions job uploads path '.'; any content outside the repository root will not be published unless the workflow is edited. When automating edits, validate that files intended to be served are under the uploaded path.
- Minimal CSS conventions present: uses .container wrapper and system-ui font stack; simple centered layout. Avoid assumptions about frameworks (no framework files detected).

4) Where to look next (for human reviewers or automation)

- .github/workflows/deploy.yaml — deployment behavior and branch trigger
- .github/workflows/index.html — raw site HTML (note: location under workflows)
- style.css — stylesheet used by the site

Summary

Created repository-specific Copilot guidance covering deploy workflow, lack of build/test tooling, high-level static-site architecture, and conventions about where entry files should live for Pages deployment.

If you'd like, adjust this to include recommended file moves (e.g., move index.html to repo root), add preview/test scripts, or coverage for other areas (docs, contributors, code owners).
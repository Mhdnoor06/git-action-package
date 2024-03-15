# MSA Connect Mazjid Masjid Administrator
Welcome to the MSA Connect Masjid Portals React app! This application serves as the frontend interface for managing the Masjid Administrator within the MSA Connect ecosystem.

TypeScript is used to add type safety to the project. The project is built using a layered architecture. The layers are as follows:


Folder structure:

```
Connect Mazjid Admin  
- .env.dev
- .env.production
- .github
  - workflows
    - publish.yml
- .gitignore
- build
- dist
  - assets
  - favicon.ico
  - Front-End Assignment.docx
  - index.html
  - manifest.json
  - photos
    - bg.png
  - robots.txt
- dist.zip
- index.html
- netlify.toml
- package-lock.json
- package.json
- project_structure.text
- public
  - favicon.ico
  - manifest.json
  - photos
    - bg.png
  - robots.txt
- README.md
- src
  - App.css
  - App.test.js
  - App.tsx
  - index.css
  - index.tsx
  - react-app-env.d.ts
  - v1
    - api-calls
      - index.ts
    - ClientApi-Calls
      - index.ts
    - components
     - helpers
     - hooks
      - Paginationhook.ts
    - pages
     - photos
    - redux
      - actions
      - actiontype.ts
      - hooks.ts
      - reducers
      - store.ts
      - Types
        - index.ts
    - resources
      - resources.ts
    - routes
      - protectedroutes.js
  - vite-env.d.ts
- tsconfig.json
- vite.config.ts
- yarn.lock
```

## Getting Started

### Prerequisites

- React.js
- Material UI
- Redux
- NPM
- Docker
- TypeScript

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/mustafasa/connectMazjid-masjidAdminPortal.git
    ```
2. Install NPM packages
    ```sh
    NPM install
    ```
3. Run the Dev server
    ```sh
    NPM dev
    ```
4. Run the tests
    ```sh
    NPM test
    ```
5. Build the project
    ```sh
    NPM build
    ```
6. Run the production 
    ```sh
    NPM start
    ```

## Usage

### Environment Variables
All required environment variables are located in the `.env` file.

### Docker
The project can be built and run using Docker. The Dockerfile is located in the root directory of the project. The `.dockerignore` file is used to ignore files and folders when building the Docker image.


## URLs
The following URLs are used to access the portal:

- [Local Env](http://localhost:5173/)
- [Test Env](https://musali-admin.netlify.app/)
- [Production Env](https://portal.connectmazjid.com/)





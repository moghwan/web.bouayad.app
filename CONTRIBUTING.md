## Contributing
- The project is using [Kanban]() as an Agile framework.
- To raise a bug or submit a feature request, please [open an issue](https://github.com/moghwan/web.bouayad.app/issues/new).
- If you want to work on an existing issue please ask to be assigned, this will help to let others know you'll be working on it.

### Submitting a Pull Request (PR)
- The pull request name must be titled as below: **prefix(#issue_number): _issue_name_**. See [an example](https://github.com/moghwan/web.bouayad.app/pull/22)
- Use one of the prefixes defined below:
  - **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
  - **chore**: Updating tasks etc; no production code change
  - **doc**: Documentation only changes
  - **feat**: for new features
  - **fix**: bug fixes
  - **i18n**: translations related
  - **perf**: A code change that improves performance
  - **refactor**: A code change that neither fixes a bug nor adds a feature
  - **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)

## Development Setup
This Vue 3 project was initialized with Vite.
- After cloning the repo, run:
```sh
$ npm install
```
- create the `.env` file:
```sh
$ cp .env.example .env
```
- add your secret key to the `.env` file after subscribing to the API hosted in [RapidAPI Hub](https://rapidapi.com/chaouimar2/api/bouayadapi/) (it's free):
```
VITE_BOUAYADAPP_API_URL=bouayadapi.p.rapidapi.com
VITE_BOUAYADAPP_API_SECRET=${your_secret}
```

### Commonly used NPM scripts
```sh
# Compile and Hot-Reload for Development
npm run dev

# Compile and Minify for Production
npm run build

# Lint with ESLint
npm run lint
```

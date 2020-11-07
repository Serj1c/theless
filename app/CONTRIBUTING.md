# App service

## Project structure

- `components/common` - project-specific common components;
- `components/messages` - project-specific messages components;
- `components/pages` - pages components of the whole project;
- `components/providers` - providers of the whole project;
- `components/ui` - project-agnostic common components;
- `constants` - whole project's constants;
- `hooks` - common hooks;
- `models` - project's types;
- `pages` - next.js pages;
- `public` - static files;
- `utils` - whole project's common utils.

## Code style

- Don't use default export;
- Don't use `memo` without reasons;
- Use `index.ts` for every component for public exports;
- Function components has `React.FunctionComponent` type;
- Place all components static data into `data` directory;
- Place all components utils into `utils` directory.

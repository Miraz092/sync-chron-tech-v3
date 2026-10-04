<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Repository Guidelines

## Project Structure & Module Organization

This repository currently contains no application code, tests, assets, or build configuration. Keep the root focused on project documentation and configuration. When implementation begins, organize source code in `src/`, automated tests in `tests/`, and static resources in `assets/`, unless the selected framework requires another layout. Group related code by feature and document any deviations in `README.md`.

## Build, Test, and Development Commands

No build, test, or local development commands are configured yet. When adding the initial toolchain, provide reproducible commands for installing dependencies, starting development, building, and running tests. Document the exact commands in `README.md` and update this guide. Use the chosen package manager consistently and commit its lockfile when applicable.

## Coding Style & Naming Conventions

Follow the selected language and framework conventions. Add formatter and lint configuration with the first source contribution so formatting can be checked automatically. Until then, use two-space indentation for Markdown examples and configuration files where supported. Prefer descriptive names, consistent filename casing within each module, and small functions with clear responsibilities.

## Testing Guidelines

No testing framework or coverage threshold has been established. Select a framework appropriate to the implementation and document how to run it. Name tests after the behavior they verify, and follow the framework's discovery convention, such as `feature.test.ts` if using a compatible JavaScript runner. Include tests for new behavior and regression tests for bug fixes.

## Commit & Pull Request Guidelines

No Git history is available to establish existing commit conventions. Use concise, imperative commit subjects, such as `Add initial project configuration`. Keep each change focused. Pull requests should describe the purpose, summarize changes, list validation performed, and link relevant issues. Include screenshots for visible UI changes and explain any setup requirements.

## Security & Configuration

Never commit credentials or local secrets. Once configuration is introduced, provide a sanitized example such as `.env.example` and ignore local environment files and generated artifacts.

# Repository Guidelines

## Project Structure & Module Organization
This repo is an Obsidian vault (offline Reverse: 1999 wiki), not a traditional app.

- `000-箱的构造/`: infrastructure (`templates/`, `script/`, shared `assets/`, button/plugin notes, homepage).
- `100-UTTU人物合辑/`: character profiles.
- `200-相从心生/`: psychubes and related materials.
- `300-以影像之/`: story notes (主线/支线/映像/轶事).
- `400-箱外世界/`, `500-箱外阵营/`, `600-箱中日历/`: lore, factions, calendar logs.
- `.obsidian/`: themes, snippets, plugin and workspace configuration.
- `Drafts/`: in-progress notes only.

## Build, Test, and Development Commands
No `npm`/`make` pipeline is used. Development is vault-first + git:

- `open -a Obsidian .` to open the vault locally.
- `git status` and `git diff -- <path>` to review note/frontmatter/config changes.
- `rg "<关键词>"` to locate backlinks and references before rename/move.
- `git add <paths>` then `git commit -m "更新..."` for focused, single-topic commits.

## Coding Style & Naming Conventions
- Markdown + YAML frontmatter is required; create notes from `000-箱的构造/templates/`.
- Keep bilingual filenames where established: `中文名｜English Name.md`.
- Preserve numeric section prefixes (`100-...`, `300-...`) for navigation stability.
- Character/template metadata should keep key fields consistent (for example `Name`, `exonym`, `aliases`, `tags`), because Dataview indexing depends on them.
- Put images/audio in nearby `assets/` directories and reference via relative path or wikilink.
- JS scripts in `000-箱的构造/script/` should stay modular and consistent with existing CommonJS usage.

## Testing Guidelines
No automated test suite exists; validate in Obsidian:

1. Open changed notes and confirm callouts, tabs, and embeds render correctly.
2. Verify Dataview/DataviewJS output and QuickAdd/Templater entry points still work.
3. Check newly added media resolves from intended relative paths.
4. Use Obsidian link suggestions/search to catch unresolved wikilinks.

## Commit & Pull Request Guidelines
Recent commits use short, action-first Chinese subjects such as `增加...`, `更新...`, `修复...`, `删除...`, `优化...`. Follow the same style and keep one concern per commit.

PRs should include changed directories, rationale (for example game patch or plugin update), and screenshots when homepage/theme/layout behavior changes. If `.obsidian/` is modified, state whether it is intentional plugin/theme config drift.

## Plugin & Workflow Notes
Core workflow depends on `Dataview`, `Templater`, `QuickAdd`, and `Buttons`. Prefer button/template-driven creation over manual structure edits to keep fields, links, and rendering behavior uniform across the vault.

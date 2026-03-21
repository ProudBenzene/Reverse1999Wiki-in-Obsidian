# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is an Obsidian vault serving as an offline wiki for the game "Reverse: 1999" (重返未来：1999). The vault is structured as a comprehensive knowledge base containing character information, story content, game assets, and interactive navigation tools.

## Vault Structure

- `000-箱的构造/` - Infrastructure folder containing templates, tools, configuration, and documentation
- `100-UTTU人物合辑/` - Character collection organized by character types (神秘学家｜Arcanists, 人类｜Human, 意识唤醒者｜Awakened, etc.)
- `200-相从心生/` - Character portraits and psychube collections
- `300-以影像之/` - Story content (301-主线 main story, 302-支线 side stories, 303-映像 reflections, 304-轶事 anecdotes)
- `400-箱外世界/` - External world content and assets
- `500-箱外阵营/` - External faction information
- `.obsidian/` - Obsidian configuration with plugins, themes, and settings

## Key Technologies and Plugins

### Essential Obsidian Plugins
- **QuickAdd** - Template-based content creation system
- **Buttons** - Interactive navigation and quick actions
- **Templater** - Dynamic template processing with JavaScript
- **Workspaces Plus** - Workspace management

### Themes and Styling
- **Blue Topaz** - Primary theme with extensive customization
- **Border Theme** - Alternative modern theme
- **AnuPpuccin** - Aesthetic theme option
- Custom CSS snippets in `.obsidian/snippets/`

## Content Creation Workflow

### Templates System
Templates are located in `000-箱的构造/templates/`:
- `基本模板.md` - Basic template with YAML frontmatter
- `剧情章节-主线.md` - Main story chapter template
- `剧情章节-支线.md` - Side story template
- `剧情章节-映像.md` - Reflection story template
- `剧情章节-轶事.md` - Anecdote template

### Button System
Interactive buttons defined in `000-箱的构造/插件/buttons.md`:
- Content creation buttons (新角色登场, 添加心相, etc.)
- Navigation buttons (角色, 心相, 故事面板)
- Quick access buttons (README, GitHub)

### Character Files Structure
Character files follow a standardized format with:
- YAML frontmatter with game mechanics data
- Character overview and stats
- Skills and abilities (神秘术)
- Weapon combinations (武器组合)
- Cultural background (文化)
- Voice lines (语音)

## Working with This Vault

### Adding New Content
1. Use QuickAdd commands via buttons for consistent formatting
2. Follow existing naming conventions: `中文名｜English Name.md`
3. Use appropriate templates for different content types
4. Maintain asset organization in corresponding `assets/` folders

### File Naming Conventions
- Characters: `角色中文名｜English Name.md`
- Stories: `章节编号 章节中文名｜English Title.md`
- Assets: Organized in `assets/` subfolders with descriptive names

### Metadata Standards
All content files use YAML frontmatter with standardized fields:
- `tags:` for categorization
- `cssclasses:` for styling
- `aliases:` for alternative names
- Game-specific fields (星级, 属性, 伤害类型, etc.)

### Asset Management
- Images stored in `assets/` folders alongside content
- Audio files in `000-箱的构造/氛围制造机/`
- Use relative paths for asset references
- Maintain organized folder structure

## Important Notes

### Language and Localization
- Primary language: Chinese (Simplified)
- Secondary language: English
- Bilingual naming convention throughout
- Cultural context important for game content

### Obsidian-Specific Features
- Extensive use of wikilinks `[[]]` for internal linking
- Callout blocks for structured information display
- Custom CSS classes for styling
- Button embeds for interactive navigation

### Content Guidelines
- Maintain consistency with existing character and story formats
- Use appropriate game terminology and classifications
- Include both Chinese and English names where applicable
- Follow established metadata schemas

## Common Commands

### Content Creation
- Use button system in `常用工具.md` for guided content creation
- Access templates via QuickAdd plugin
- Follow established folder structure for new files

### Navigation
- Use workspace configurations for different content types
- Leverage button system for quick access to major sections
- Utilize tag system for content discovery

This vault represents a comprehensive fan-created wiki with sophisticated organization and interactive features designed for optimal user experience in Obsidian.
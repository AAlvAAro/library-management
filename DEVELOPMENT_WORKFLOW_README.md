# Development Workflow

## Overview

This project follows a structured, AI-assisted development workflow that combines planning, design, and iterative coding practices to deliver quality results efficiently.

## Workflow Phases

### 1. Planning & Research

- Upload project requirements to **Perplexity** (Claude Sonnet 4.5)
- Discuss requirements, tools, and implementation strategies
- Break down features into manageable, progressive steps

### 2. Project Foundation

**Base Stack:**
- Inertia Rails React Starter Kit
- Ruby 3.4.8
- SQLite (for speed but production-grade database pick would be PostgreSQL)
- React with TypeScript
- shadcn/ui components

**Testing:**
- RSpec, FactoryBot, Faker, Shoulda Matchers

### 3. Design System (Lovable)

Use **Lovable AI** to generate:
- Design guidelines and style guide
- Color palette and typography
- Component library
- Landing page and main pages
- Tailwind theme configuration

Export the theme for Rails integration.

### 4. Feature Development Cycle

For each feature, follow this iterative process:

```
┌─────────────────────────────────────────────────────────────────┐
│                    FEATURE DEVELOPMENT CYCLE                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Plan      → Discuss feature requirements with Perplexity    │
│  2. Document  → Write detailed specs in Notion (Windsurf prompt)│
│  3. Branch    → Ideal but skipped this for speed atm            │
│  4. Generate  → Paste prompt into Windsurf for implementation   │
│  5. Test      → Run RSpec tests and fix any failures            │
│  6. Review    → Manually review generated code and clean up     │
│  7. Commit    → Push branch to GitHub                           │
│  8. Review    → Use GitHub Copilot for quick review             │
│  9. Merge     → Approve and merge to main                       │
│  10. Deploy   → Deploy changes (if deployment configured)       │
│  11. Iterate  → Pull locally and continue with next feature     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Step-by-Step Details

| Step | Action | Tool/Method |
|------|--------|-------------|
| **Plan** | Discuss feature requirements | Perplexity AI |
| **Document** | Write detailed specifications | Notion → becomes Windsurf prompt |
| **Branch** | Create feature branch | `git checkout -b feature/feature-name` |
| **Generate** | Initial implementation | Windsurf AI |
| **Test** | Run and fix tests | `bundle exec rspec` |
| **Review** | Manual code review | IDE + personal review |
| **Commit** | Push to GitHub | `git push origin feature/feature-name` |
| **Code Review** | Quick automated review | GitHub Copilot |
| **Merge** | Approve and merge | GitHub PR |
| **Deploy** | Deploy changes | Kamal (if configured) |
| **Iterate** | Continue development | `git pull origin main` |

### 5. Quality Assurance

- Run `annotate` after model changes for better AI assistance
- Maintain high test coverage with RSpec
- Use RuboCop for consistent code style
- Review generated code for edge cases and security

## Tools Summary

| Purpose | Tool |
|---------|------|
| Planning & Research | Perplexity (Claude Sonnet 4.5) |
| Prompt Management | [Notion](https://www.notion.so/aalvaaro/Feature-Prompts-and-Details-2ceff2692fbb80eeaa9bce576948b822) |
| Design System | Lovable AI |
| Code Generation | Windsurf AI |
| Code Review | GitHub Copilot |
| Testing | RSpec, FactoryBot |
| Deployment | Kamal |

## Best Practices

1. **Always start with planning** - Don't jump into code without understanding requirements
2. **Document everything** - Good prompts lead to better AI-generated code
3. **Use Ruby and Rails commands** - Prefer `rails` and `ruby` commands when possible since they don't lead to errors
4. **Test first** - Write or generate tests before implementation when possible
5. **Review thoroughly** - AI-generated code needs human oversight
6. **Iterate quickly** - Small, focused features are easier to develop and review
7. **Keep branches small** - Easier to review and less prone to conflicts

## Getting Started

1. Read the main [README.md](README.md) for project setup
2. Familiarize yourself with the tech stack
3. Set up your AI tools (Perplexity, Windsurf, GitHub Copilot)
4. Follow the feature development cycle for each new feature

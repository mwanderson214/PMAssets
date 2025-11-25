# CLAUDE.md - AI Assistant Guide for PMAssets

This document provides comprehensive guidance for AI assistants working with the PMAssets codebase. It covers architecture, conventions, workflows, and important context that AI tools need to provide effective assistance.

## Table of Contents

1. [Repository Overview](#repository-overview)
2. [Codebase Structure](#codebase-structure)
3. [Development Setup](#development-setup)
4. [Architecture & Design Patterns](#architecture--design-patterns)
5. [Code Conventions](#code-conventions)
6. [Development Workflow](#development-workflow)
7. [Testing Guidelines](#testing-guidelines)
8. [Common Tasks](#common-tasks)
9. [Deployment](#deployment)
10. [AI Assistant Guidelines](#ai-assistant-guidelines)

---

## Repository Overview

**Project Name:** PMAssets

**Purpose:** [To be documented as project develops]

**Tech Stack:** [To be documented]

**Key Dependencies:** [To be documented]

**Repository Structure:** [To be documented]

---

## Codebase Structure

### Directory Layout

```
PMAssets/
├── [To be documented as structure develops]
```

### Key Directories

- **[Directory Name]**: [Purpose and contents]
- **[Directory Name]**: [Purpose and contents]

### Entry Points

- **[File/Module]**: [Description and purpose]

---

## Development Setup

### Prerequisites

- [List required tools, languages, and versions]
- [Package managers]
- [Environment requirements]

### Initial Setup

```bash
# Clone the repository
git clone [repository-url]
cd PMAssets

# Install dependencies
[installation commands]

# Setup environment
[environment setup steps]
```

### Environment Variables

- `[VAR_NAME]`: [Description and default/example value]

---

## Architecture & Design Patterns

### Overall Architecture

[Describe the high-level architecture - e.g., MVC, microservices, monolithic, etc.]

### Key Design Patterns

- **[Pattern Name]**: [Where and why it's used]
- **[Pattern Name]**: [Where and why it's used]

### Data Flow

[Describe how data flows through the application]

### External Dependencies

- **[Service/API Name]**: [Purpose and how it's integrated]

---

## Code Conventions

### Naming Conventions

- **Files**: [Convention - e.g., camelCase, kebab-case, PascalCase]
- **Classes**: [Convention]
- **Functions**: [Convention]
- **Variables**: [Convention]
- **Constants**: [Convention]

### Code Style

- **Formatting**: [Prettier/ESLint/Black/etc. configuration]
- **Indentation**: [Spaces/Tabs and size]
- **Line Length**: [Maximum characters]
- **Comments**: [When and how to comment]

### File Organization

- **Imports**: [How to order and group imports]
- **Exports**: [Named vs default exports preference]
- **File Structure**: [Typical structure within a file]

### Best Practices

1. [Practice #1]
2. [Practice #2]
3. [Practice #3]

---

## Development Workflow

### Branch Strategy

- **main/master**: [Production-ready code]
- **develop**: [Integration branch]
- **feature/**: [Feature branches - naming convention]
- **bugfix/**: [Bug fix branches]
- **hotfix/**: [Emergency fixes]

### Commit Message Format

```
[type]: [subject]

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Example:**
```
feat: add user authentication module

Implement JWT-based authentication with refresh tokens.
Includes login, logout, and token refresh endpoints.

Closes #123
```

### Pull Request Process

1. Create feature branch from appropriate base branch
2. Implement changes with tests
3. Ensure all tests pass locally
4. Update documentation as needed
5. Create PR with descriptive title and description
6. Address review feedback
7. Merge after approval

### Code Review Guidelines

**For Authors:**
- Keep PRs focused and reasonably sized
- Provide context in PR description
- Respond to feedback promptly

**For Reviewers:**
- Check for logic errors and edge cases
- Verify test coverage
- Ensure code follows conventions
- Look for security issues

---

## Testing Guidelines

### Test Structure

```
[Describe test directory structure]
```

### Testing Frameworks

- **Unit Tests**: [Framework and approach]
- **Integration Tests**: [Framework and approach]
- **E2E Tests**: [Framework and approach]

### Running Tests

```bash
# Run all tests
[command]

# Run specific test suite
[command]

# Run with coverage
[command]
```

### Test Coverage Requirements

- Minimum coverage: [percentage]
- Critical paths must have [percentage] coverage

### Writing Tests

**Guidelines:**
1. Test one thing per test
2. Use descriptive test names
3. Follow AAA pattern (Arrange, Act, Assert)
4. Mock external dependencies
5. Test edge cases and error conditions

**Example:**
```
[Language-specific test example]
```

---

## Common Tasks

### Adding a New Feature

1. [Step-by-step process]
2. [Required files/changes]
3. [Testing requirements]

### Fixing a Bug

1. Write a failing test that reproduces the bug
2. Fix the bug
3. Ensure test passes
4. Check for similar issues elsewhere

### Adding Dependencies

```bash
[Command to add dependency]
```

**Before adding:**
- Check if existing dependency can be used
- Verify license compatibility
- Assess maintenance status and security

### Database Migrations

[If applicable - describe migration process]

### Updating Documentation

- Update CLAUDE.md for architectural changes
- Update README.md for user-facing changes
- Update inline comments for complex logic
- Update API documentation

---

## Deployment

### Environments

- **Development**: [Description and access]
- **Staging**: [Description and access]
- **Production**: [Description and access]

### Deployment Process

1. [Step-by-step deployment process]
2. [Verification steps]
3. [Rollback procedure]

### CI/CD Pipeline

[Describe automated build, test, and deployment process]

### Monitoring & Logging

- **Logs**: [Where and how to access]
- **Metrics**: [What's monitored and where]
- **Alerts**: [Alert conditions and notifications]

---

## AI Assistant Guidelines

### Context-Aware Assistance

**Before Making Changes:**
1. Read relevant files completely before suggesting modifications
2. Understand the existing architecture and patterns
3. Check for similar implementations in the codebase
4. Consider backward compatibility

**When Implementing Features:**
1. Follow existing conventions and patterns
2. Keep changes minimal and focused
3. Don't over-engineer solutions
4. Avoid adding unnecessary abstractions
5. Don't add features beyond what's requested

### Security Considerations

**Always Watch For:**
- SQL injection vulnerabilities
- XSS vulnerabilities
- CSRF vulnerabilities
- Authentication/authorization bypasses
- Sensitive data exposure
- Insecure dependencies

**Never:**
- Commit secrets or credentials
- Disable security features without explicit request
- Use known vulnerable dependencies
- Implement custom crypto (use established libraries)

### Code Quality Standards

**Do:**
- Write self-documenting code with clear names
- Add comments only for non-obvious logic
- Keep functions small and focused
- Handle errors appropriately
- Write tests for new functionality

**Don't:**
- Add comments restating what code does
- Add unnecessary error handling for impossible cases
- Create helpers for one-time operations
- Add TODOs (implement it or create an issue)
- Use backwards-compatibility hacks

### Communication Style

- Be concise and direct
- Focus on technical accuracy
- Ask clarifying questions when requirements are ambiguous
- Explain trade-offs when multiple approaches exist
- Reference specific files and line numbers (e.g., `path/to/file.js:42`)

### File Operations

**Prefer:**
- Editing existing files over creating new ones
- Using specific tools (Read, Edit, Write) over bash commands
- Reading files completely before editing

**Avoid:**
- Creating unnecessary documentation files
- Creating files that duplicate existing functionality
- Modifying files you haven't read

### Git Operations

**Commit Practices:**
- Only commit when explicitly requested
- Write clear, descriptive commit messages
- Follow the project's commit message format
- Group related changes in single commits
- Don't amend commits from other developers

**Pull Request Practices:**
- Create PRs with descriptive titles and context
- Include summary of changes and test plan
- Reference related issues
- Push to feature branches, never directly to main

### Task Management

**Use TodoWrite Tool:**
- For tasks with 3+ steps
- For complex, non-trivial tasks
- When user provides multiple tasks
- To track progress visibly

**Todo States:**
- `pending`: Not started
- `in_progress`: Currently working (only ONE at a time)
- `completed`: Finished successfully

**Mark todos completed:**
- Immediately after finishing each task
- Only when fully accomplished (tests pass, no errors)
- Before moving to the next task

### Research & Exploration

**Use Task Tool (Explore agent) for:**
- Understanding codebase structure
- Finding how features are implemented
- Answering "how does X work" questions
- Locating relevant code across multiple files

**Use Direct Tools for:**
- Finding specific files by name (Glob)
- Finding specific text/code (Grep)
- Reading known files (Read)

---

## Project-Specific Notes

### Important Gotchas

[Document any project-specific quirks, gotchas, or non-obvious behaviors]

### Performance Considerations

[Document any performance-critical sections or considerations]

### Known Issues

[Document any known issues or technical debt]

### Future Improvements

[Document planned improvements or refactoring]

---

## Changelog

### [Date] - Repository Initialization
- Created initial CLAUDE.md template
- Established documentation structure

---

## Additional Resources

- **Main README**: [Link to README.md]
- **API Documentation**: [Link if applicable]
- **Design Documentation**: [Link if applicable]
- **Contributing Guide**: [Link if applicable]

---

**Last Updated:** 2025-11-25

**Note to AI Assistants:** This document should be updated as the codebase evolves. When making significant architectural changes or establishing new patterns, update the relevant sections to keep this guide current and useful.

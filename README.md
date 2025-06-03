# Example Project

This is a sample project to demonstrate the narrative-based code visualization in Vibe IDE. The project structure showcases:

- Program level (this README and configuration files)
- Module level (shared types and configurations)
- Submodule level (second and third-level directories)
- File level (source files with descriptions)
- Code level (parsed code blocks within files)

## Project Structure

```
example-repo/
├── README.md
├── tsconfig.json
├── package.json
├── core/
│   ├── types.ts
│   ├── auth/
│   │   ├── providers/
│   │   │   ├── oauth.ts
│   │   │   └── local.ts
│   │   ├── utils/
│   │   │   ├── tokens.ts
│   │   │   └── validation.ts
│   │   ├── login.ts
│   │   └── session.ts
│   └── database/
│       ├── models/
│       │   ├── user.ts
│       │   └── profile.ts
│       ├── migrations/
│       │   └── initial.ts
│       ├── models.ts
│       └── connection.ts
└── ui/
    ├── theme.ts
    ├── components/
    │   ├── buttons/
    │   │   ├── Button.tsx
    │   │   └── IconButton.tsx
    │   ├── inputs/
    │   │   ├── TextInput.tsx
    │   │   └── Select.tsx
    │   └── common/
    │       └── Card.tsx
    └── hooks/
        ├── auth/
        │   ├── useAuth.ts
        │   └── usePermissions.ts
        └── forms/
            ├── useForm.ts
            └── useValidation.ts
```

## File Organization

1. **Root Level**
   - `README.md`: Project documentation
   - `tsconfig.json`: TypeScript configuration
   - `package.json`: Project dependencies and scripts

2. **Core Module**
   - `types.ts`: Shared type definitions
   - Auth submodule: Authentication related code
   - Database submodule: Data persistence layer

3. **UI Module**
   - `theme.ts`: Global theme configuration
   - Components submodule: Reusable UI components
   - Hooks submodule: Custom React hooks
## How to Create Sequelize Database Models with TypeScript

### Step-by-Step Guide

#### 1. Generate the Sequelize Model

To create a database model named `Todo` with attributes `title` (string) and `completed` (boolean), use the following command:

```bash
npx sequelize-cli model:generate --name Todo --attributes title:string,completed:boolean
```

#### 2. Convert Files to TypeScript

After generating the model, update the file extensions to TypeScript:

- Rename the migration file `*-create-todo.js` to `*-create-todo.ts` in the `migration` directory.
- Rename the model file `todo.js` to `todo.ts` in the `models` directory.

#### 3. Run Migrations

Execute the migration command to apply changes to your database:

```bash
pnpm run db:migrate
# or
npm run db:migrate
```

### Notes

- Ensure your `tsconfig.json` is configured correctly to compile TypeScript files.
- Adjust Sequelize typings or configurations in TypeScript as per your project requirements.

## How to Create Seeders

### Step-by-Step Guide

#### 1. Generate the Sequelize Seeders

To create a seeder named `User`, run the following command:

```bash
npx sequelize-cli seed:generate --name demo-user
```

This will create a new file in the `seeders` directory.

#### 2. Modify the Seeders

1. Navigate to the `seeders` directory.
2. Rename the generated JavaScript file to a TypeScript file (change `.js` to `.ts`).
3. Open the file and add the necessary data for seeding.

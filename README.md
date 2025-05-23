This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Prisma Database

## Database Setup

1. **Environment Setup**:
   Run the following command to setup the environment:
   ```bash
   npx prisma init --db --output ../src/app/generated/prisma
   ```

   It will:
   - Create a prisma directory with a schema.prisma file.
   - Create a Prisma Postgres database.
   - Create a `.env` file in the root directory and your database connection string:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name"
   ```
   - Make sure PostgreSQL is installed and running on your machine

2. **Install Dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Database Migration**:
   For first-time setup (i.e. one-time command for the initial database setup):
   ```bash
   npx prisma migrate dev --name init
   ```
   For subsequent schema changes:
   ```bash
   npx prisma migrate dev
   ```
   These commands will:
   - Create the database if it doesn't exist
   - Apply all pending migrations
   - Generate the Prisma Client

4. **Verify Setup**:
   ```bash
   npx prisma studio
   ```
   This will open Prisma Studio in your browser where you can verify the database structure and data.

## Important Notes
- The `migrate dev` command is used for development. In production, use `prisma migrate deploy`
- If you get errors about the database not existing, create it first using your PostgreSQL client
- Ensure your PostgreSQL server is running before running the migrations
- The database user specified in the DATABASE_URL needs permissions to create databases and tables

# Shadcn UI Setup

Shadcn UI is a collection of reusable components built on top of Tailwind CSS and Radix UI, providing accessible and customizable UI elements for your Next.js applications.

## Installation

1. **Add Shadcn UI to your project**:
   ```bash
   pnpm dlx shadcn@latest init
   ```
   During initialization, you'll be prompted to:
   - Choose a style (Default, New York, etc.)
   - Select a color scheme
   - Choose a location for your components
   - Select your preferred CSS variables naming convention

2. **Add Components**:
   To add individual components, use:
   ```bash
   pnpm dlx shadcn-ui@latest add button
   pnpm dlx shadcn-ui@latest add card
   pnpm dlx shadcn-ui@latest add dialog
   # etc...
   ```

3. **Usage**:
   After adding components, you can import them from your components directory:
   ```tsx
   import { Button } from "@/components/ui/button"
   
   export default function Page() {
     return <Button>Click me</Button>
   }
   ```

## Important Notes
- Components are added to your project as source code, allowing for full customization
- Each component is added individually to keep your bundle size minimal
- You can customize the components by modifying their source code in your components directory
- The components are built on top of Radix UI primitives for accessibility

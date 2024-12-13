# Task Management System

## Overview
A modern task management application built with Next.js, designed to help individuals and teams organize, track, and collaborate on tasks efficiently.

## Technologies
- **Framework**: Next.js 15
- **Frontend**: React 19
- **Authentication**: NextAuth
- **ORM**: Prisma
- **Styling**: Heroicons
- **Additional Libraries**: 
  - bcryptjs (Authentication)
  - jsonwebtoken
  - Lodash

## Features
- 🚀 Create, update, and delete tasks
- 🔐 Secure user authentication
- 📊 Task prioritization and categorization
- 🤝 Team collaboration
- 📱 Responsive design

## Prerequisites
- Node.js (v18.x or later)
- npm (v9.x or later)
- Database (PostgreSQL recommended)

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/gnarayanachetty/task-management-system.git
cd task-management-system        
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file and set the required environment variables:
DATABASE_URL=your_database_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

### 4. Initialize Database

npx prisma generate
npx prisma migrate dev

### 5. Start the Development Server
```bash
npm run dev
```

Open http://localhost:3000

Available Scripts
npm run dev: Start development server
npm run build: Create production build
npm start: Start production server
npm run lint: Run ESLint


### ---------------------------------------------

### Docker Setup (if you want to start the server using docker)

#### Prerequisites
- Docker
- Docker Compose

#### Build and Run with Docker
```bash
# Build the Docker images
docker-compose build

# Start the services
docker-compose up -d

# View running containers
docker-compose ps

# Stop the services
docker-compose down

#### -------------------------------------------------

Project Structure

task-management-system/
│
├── app/             # Next.js app directory
├── components/      # React components
├── lib/             # Utility functions
├── prisma/          # Database schema
├── public/          # Static assets
└── styles/          # Global styles

### Database
Managed with Prisma. See prisma/schema.prisma for the current schema.

### Authentication
Implemented using NextAuth with multiple authentication strategies.

### Contributing
Fork the repository
Create a feature branch (git checkout -b feature/NewFeature)
Commit changes (git commit -m 'Add new feature')
Push to branch (git push origin feature/NewFeature)
Open a Pull Request
Troubleshooting
Ensure all environment variables are set
Run npx prisma generate after schema changes
Check console for detailed error messages
License
Distributed under the MIT License.

### Contact
Narayana Chetty - gnarayana1755@gmail.com

Project Link: https://github.com/gnarayanachetty/task-management-system


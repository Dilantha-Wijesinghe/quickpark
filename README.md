# QuickPark: Parking Management System

This repository contains the QuickPark project, which includes multiple applications and libraries. This guide will help you set up the project locally and run the applications.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (18.x recommended)
- Yarn (>= 1.22.x)
- Docker
- Git

## Getting Started

### 1. Clone the Repository

Clone the repository to your local machine using Git.

```bash
git clone https://github.com/Dilantha-Wijesinghe/quickpark.git
cd quickpark
```

### 2. Install Dependencies

Install the project dependencies using Yarn.

```
yarn install
```

### 3. Set Up Environment Variables

Create a .env file in the root directory and add the necessary environment variables. Refer to .env.example for the required variables.

### 4. Run the Database with Docker Compose

Start the PostgreSQL database using Docker Compose inside apps/api.

```
docker-compose up -d
```

### 5. Run Prisma Migrations

After the database is running, apply Prisma migrations to set up the database schema.

```
yarn prisma migrate dev
```

### 6. Run the Applications

You can run the individual applications using the following commands:

#### API Application

Navigate to the apps/api directory and start the API server.

```
cd apps/api
yarn dev
```

#### WEB Applications

Navigate to the apps/web directory and start the WEB server. Do the same for apps/web-admin, apps/web-manager and apps/web-valet

```
cd apps/web
yarn dev
```

License
This project is licensed under the MIT License.

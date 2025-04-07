# Electricity Invoices

This project is designed to manage electricity invoices efficiently. Below is the setup guide and available commands for development and deployment.

## Technology Stack

This project is built using the following technologies:

- **Node.js + TypeScript**: For building the backend and frontend.
- **NestJS**: A progressive Node.js framework for efficient and scalable server-side applications.
- **React**: For building the frontend user interface.

## Prerequisites

- **Docker**: Ensure Docker is installed and running on your system.

## Setup Instructions

1. **Clone the Repository**  
  ```bash
  git clone --recurse-submodules https://github.com/VictorMGomes/electricity-invoices.git
  ```

2. **Go to the project folder**
  ```bash
  cd electricity-invoices
  ```

4. **Copy Environment Files**  
  > App envirioment
  ```bash
  cp env.example .env
  ```

  > Docker envirioment
  ```bash
  cp slim-containers/.env.example slim-containers/.env
  ```

  > ⚠️ **Warning**: The configuration may vary depending on your host operating system. Configure the `.env` file with the necessary environment variables. 

5. **Start PostgreSQL and Node.js**  
  ```bash
  docker-compose -f slim-containers/docker-compose.yml up -d postgresql nodejs
  ```

6. **Enter the Node.js Container**  
  ```bash
  docker exec -it development_nodejs sh
  ```

7. **Install Dependencies**  
  ```bash
  npm install
  ```

## Run App in development mode

### Start Backend Commands

1. **Generate Database Schema**  
  ```bash
  npm run Backend:DB:Generate
  ```
2. **Run Database Migrations**  
  ```bash
  npm run Backend:DB:Migrate
  ```
3. **Start Development Server**  
  ```bash
  npm run Backend:Start:Dev
  ```
### Start Frontend Commands

1. **Start Development Server**  
  ```bash
  npm run Frontend:Start:Dev
  ```

  ### Additional Commands

  For more available commands, refer to the `scripts` section in the `package.json` file. Below are some commonly used commands:

  ## API Documentation

  During development, you can access the API documentation at the following endpoints:

  - **OpenAPI UI**: [http://localhost:3000/api/doc](http://localhost:3000/api/doc)  
  - **OpenAPI JSON**: [http://localhost:3000/api/doc/json](http://localhost:3000/api/doc/json)

## Notes

- Ensure all dependencies are installed and environment variables are correctly configured before running the commands.
- Use the provided `docker-compose` file to manage the PostgreSQL database container.

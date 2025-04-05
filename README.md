# Electricity Invoices

This project is designed to manage electricity invoices efficiently. Below is the setup guide and available commands for development and deployment.

## Technology Stack

This project is built using the following technologies:

- **Node.js + TypeScript**: For building the backend and frontend.
- **NestJS**: A progressive Node.js framework for efficient and scalable server-side applications.
- **React**: For building the frontend user interface.

## Prerequisites

- **Docker**: Ensure Docker is installed and running on your system.
- **Node.js**: Version `22.14 LTS` is required.

## Setup Instructions

1. **Clone the Repository**  
  ```bash
  git clone https://github.com/VictorMGomes/electricity-invoices.git
  cd electricity-invoices
  ```

2. **Copy Environment Files**  
  ```bash
  cp env.example .env
  cp slim-containers/.env.example slim-containers/.env
  ```

3. **Set Up Environments**  
  > ⚠️ **Warning**: The configuration may vary depending on your host operating system:
  
  Configure the `.env` file with the necessary environment variables. 

  > - **Windows**: Use a text editor like Notepad or VS Code to edit the `.env` file. Ensure paths and environment variables are compatible with Windows.
  > - **Linux/macOS**: Use a terminal-based editor like `vim` or `nano`, or a GUI editor, to modify the `.env` file. Ensure file permissions and paths are correctly set for your system.

4. **Start PostgreSQL**  
  ```bash
  docker-compose -f slim-containers/docker-compose.yml up -d postgresql
  ```

5. **Install Dependencies**  
  ```bash
  npm install
  ```

## Available Commands

### Backend Commands
- **Start Development Server**  
  ```bash
  npm run Backend:Start:Dev
  ```

- **Generate Database Schema**  
  ```bash
  npm run Backend:DB:Generate
  ```

- **Run Database Migrations**  
  ```bash
  npm run Backend:DB:Migrate
  ```

### Frontend Commands
- **Start Development Server**  
  ```bash
  npm run Frontend:Start:Dev
  ```

- **Build Frontend**  
  ```bash
  npm run Frontend:Build
  ```

- **Start Preview Server**  
  ```bash
  npm run Frontend:Start:Preview
  ```
  ## API Documentation

  During development, you can access the API documentation at the following endpoints:

  - **OpenAPI UI**: [http://localhost:3000/api/doc](http://localhost:3000/api/doc)  
  - **OpenAPI JSON**: [http://localhost:3000/api/doc/json](http://localhost:3000/api/doc/json)

## Notes

- Ensure all dependencies are installed and environment variables are correctly configured before running the commands.
- Use the provided `docker-compose` file to manage the PostgreSQL database container.

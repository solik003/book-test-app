# Book Management System

## Overview
This project is a simple Book Management System that allows users to create, edit, and manage books. It utilizes React, TypeScript, and a Fake API for data persistence.

## Features
- Create new books with title, author, category, ISBN, createdAt, modifiedAt.
- Edit existing books.
- Manage book status (active/inactive).

## Technologies Used
- **Frontend**: React, TypeScript
- **State Management**: React Hooks
- **Styling**: CSS/Tailwind 
- **Backend**: fake REST API (ensure API is running)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/solik003/book-test-app.git
   ```
2. Navigate to the project directory:
   ```sh
   cd book-test-app
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. If using JSON Server as a Fake API, run:
   ```sh
   npx json-server --watch db.json --port 5000
   ```
5. Start the development server:
   ```sh
   npm run dev
   ```

## API Endpoints
- `POST /books` - Create a new book
- `GET /books/:id` - Fetch book by ID
- `PUT /books/:id` - Update book details

## Usage
- Fill out the book form and submit to create a book.

- Ensure the backend API is running and accessible.

## Troubleshooting
- If book `id` is empty when creating a book, check backend API response.
- Verify API URL in the project configuration.

## License
This project is licensed under the MIT License.


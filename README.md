# PromptHub - AI Prompt Library

A modern, responsive full-stack application for managing, organizing, and saving your reusable AI prompts. Built with React on the frontend and Express/MongoDB on the backend. 


## Features

- **Prompt Management:** Create, read, update, duplicate, and delete AI prompts.
- **Organization:** Categorize and tag prompts. Filter by category, tags, favorites, and search by title or description.
- **Favorites & Pins:** Pin prompts to the top of your list or mark them as favorites for quick access.
- **Drag & Drop:** Custom order your prompts via drag and drop using `@dnd-kit`.
- **Import/Export:** Export your entire prompt library to JSON and import existing lists in bulk.
- **Dark Mode:** Seamlessly switch between light and dark mode with persistent user preferences.
- **Dashboard Overview:** View statistics on total prompts, favorites, categories used, and recently added prompts.
- **Responsive:** Works seamlessly across desktop and mobile browsers.

## Tech Stack

### Frontend
- React (Vite)
- React Router (Routing)
- Context API (State Management)
- Axios & native Fetch (API calls)
- `@dnd-kit` (Drag and drop ordering)
- `react-hot-toast` (Notifications)
- `react-icons` (Icons)
- Vanilla CSS (Styling)

### Backend
- Node.js
- Express
- MongoDB & Mongoose
- CORS

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB instance (local or Atlas)

### Backend Setup
1. Navigate to the `server` directory: `cd server`
2. Install dependencies: `npm install`
3. Create a `.env` file in the `server` directory and add your MongoDB connection string:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```
4. Start the server: `npm run dev`

### Frontend Setup
1. Navigate to the `client` directory: `cd client`
2. Install dependencies: `npm install`
3. Create a `.env` file in the `client` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the Vite dev server: `npm run dev`

## API Endpoints

- `GET /api/prompts` - Retrieve all prompts
- `GET /api/prompts/:id` - Retrieve a single prompt
- `POST /api/prompts` - Create a new prompt
- `PUT /api/prompts/:id` - Update a prompt
- `DELETE /api/prompts/:id` - Delete a prompt
- `PATCH /api/prompts/reorder` - Reorder prompts (custom ordering)
- `POST /api/prompts/bulk` - Bulk insert prompts (for importing)

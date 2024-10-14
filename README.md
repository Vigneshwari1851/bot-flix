# BotFlix

BotFlix is a client-side rendered React Single Page Application (SPA) built using [The Movie Database (TMDb)](https://www.themoviedb.org/) API. The app allows users to view trending movies on the homepage and search for movies using dynamic search functionality.

## Features

### 1. Home Page
- **Default Landing Page**: The homepage shows a list of trending movies.
- **Movie Table**: Displays trending movies in a table format using the `React Table Library`.
- **Pagination**: Browse through movie results using pagination.

### 2. Search Page
- **Search Functionality**: Users can search for movies using an input box.
- **Dynamic Search**: Implements search with debouncing for efficient querying as the user types.
- **Movie Cards**: Search results are displayed as cards with movie posters, titles, ratings, and release dates.

### 3. State Management
- **React Query**: All server state (API calls) is managed using React Query.
- **Zustand**: Zustand is used to manage UI-related global state.

## Tech Stack

- **Frontend Framework**: React
- **State Management**: 
  - React Query (for server state)
  - Zustand (for UI state)
- **Routing**: React Router
- **UI Library**: BlueprintJS
- **API**: TMDb API

## Getting Started

### Prerequisites

Make sure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (v14 or above)
- [npm](https://www.npmjs.com/) (or Yarn if preferred)

### Installation

To get started with BotFlix, follow these steps:

1. Clone the repository:

   ```bash
   git clone 
   cd bot-flix

2. Install dependencies:
   
   npm install

3. Create a .env file in the root of the project and add the following variables:
   
   VITE_TMDB_API_KEY=your_tmdb_api_key
   VITE_TMDB_BASE_URL=https://api.themoviedb.org/3

4.Running the Application:

 To run the application, use the following command:
 npm run dev


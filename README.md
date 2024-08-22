# Uber Clone

A clone of Uber built with React Native using Expo, Zustand, PostgreSQL, Clerk for authentication, and Google Maps for navigation and directions.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project is a mobile application that replicates the core functionalities of Uber, including ride-hailing, real-time tracking, and user authentication. It leverages a modern tech stack to provide a seamless and responsive user experience.

## Features

- **User Authentication**: Secure sign-up and login using Clerk.
- **Real-Time Tracking**: Track rides and view driver locations in real-time with Google Maps integration.
- **Ride Booking**: Request rides, choose pickup and drop-off locations, and view ride estimates.
- **Navigation and Directions**: Get directions from Google Maps API.
- **State Management**: Efficient state management using Zustand.
- **Database**: Persistent data storage and management with PostgreSQL.

## Tech Stack

- **React Native**: Framework for building native apps using React.
- **Expo**: Framework and platform for universal React Native applications.
- **Nativewing:** A css based styling framework for React Native apps.
- **Zustand**: State management library for React.
- **PostgreSQL**: Open-source relational database for data storage.
- **Clerk**: User authentication and management.
- **Google Maps API**: For maps, geocoding, and directions.

## Getting Started

To get started with this project, follow the instructions below.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [PostgreSQL](https://www.postgresql.org/download/) (for database setup)
- [Clerk Account](https://clerk.dev/) (for authentication)

### Installation

   1. **Clone the repository:**
   
      ```bash
      git clone https://github.com/your-username/uber-clone.git
      cd uber-clone
      ```
      
   2. **Install dependencies:**
   
      ```bash
      yarn install
      ```
   
   3. **Set up PostgreSQL:**
   
      - Create a PostgreSQL database and update the configuration in `config/database.js`.
   
      
   4. **Configure Clerk:**
   
      - Create a Clerk account and add your API keys to the `.env` file.
   
      
   5. **Configure Google Maps API:**
   
      - Obtain a Google Maps API key and add it to the `.env` file.


## Configuration

Create a .env file in the root of your project and add the following environment variables:

   ```.env
   DATABASE_URL=your_postgresql_database_url
   CLERK_API_KEY=your_clerk_api_key
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```


## Running the Application

   1. Start the development server:
   
      ```bash
      yarn start
      ```
   2. Open the app on a mobile device or emulator.


### Usage

- **Sign Up/Login:** Use Clerk for authentication.
- **Book a Ride:** Choose your pickup and drop-off locations, and request a ride.
- **Track Your Ride:** View real-time location updates on the map.
- **Get Directions:** Use the integrated Google Maps API for turn-by-turn navigation.


### Contributing
Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.


### License
This project is licensed under the MIT License. See the [LICENSE](https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt) file for details.


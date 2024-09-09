React Leaflet Map with Storybook and Tailwind CSS

This project demonstrates the integration of React Leaflet for interactive maps, Storybook for UI component development, and Tailwind CSS for styling. It includes features for polygon drawing using the Leaflet Draw plugin and a custom-styled button.
Features

    Interactive Map: Integrates React Leaflet for displaying an interactive map with polygon drawing capabilities.
    Custom Button: A button styled with Tailwind CSS.
    Storybook: Used for developing and showcasing UI components in isolation.
    Tailwind CSS: Provides utility-first CSS styling for the project.

Prerequisites

    Node.js (>= 14.x)
    npm or pnpm

Installation

    Clone the Repository

    bash

git clone https://github.com/Pratiyush2003/leaflet.git
cd React Leaflet

Install Dependencies

bash

    npm install
    # or
    pnpm install

Development

    Start the Development Server

    bash

npm start
# or
pnpm start

This command will run the application, and you can view it at http://localhost:3000.

Run Storybook

bash

    npm run storybook
    # or
    pnpm storybook

    This will start the Storybook server, allowing you to view and interact with UI components at http://localhost:6006.

Components
Map

The Map component renders an interactive map using React Leaflet and includes the Leaflet Draw plugin for polygon drawing. It features a custom button styled with Tailwind CSS.

    Dependencies:
        react-leaflet
        leaflet
        react-leaflet-draw
        @emotion/react (for inline styling)

    Features:
        Displays a map centered at a location specified in the global context.
        Provides a feature group for drawing polygons.
        Includes a Tailwind CSS-styled button.

Banner

The Banner component displays a styled banner message with different variants.

    Props:
        variant: The style variant of the banner (info, congrats, documentation, danger).
        children: The content to be displayed within the banner.

Button

The Button component provides different styles and sizes for buttons, integrated with Tailwind CSS and used in the map component.

    Props:
        primary: Indicates if the button is the primary action.
        backgroundColor: Custom background color for the button.
        size: Size of the button (small, medium, large).
        label: Button text.
        onClick: Optional click handler.

Folder Structure

bash

src/
│
├── components/
│   ├── Map.tsx          # Map component with Leaflet and custom button
│
├── Context/
│   └── GlobalProvider.tsx # Context provider for global state
│
├── stories/
└── Banner.tsx           # Banner component for styled messages
│
├── App.tsx              # Main application component
├── index.tsx            # Entry point of the application
└── .storybook/
    ├── main.js          # Storybook configuration
    └── preview.js       # Storybook preview configuration

Styling

    Tailwind CSS: Utility-first CSS framework used for responsive design and component styling.
    Custom CSS: Includes additional styling for the map container and button.
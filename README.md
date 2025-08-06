# Grammar and Typos Fixer

This is a web application that automatically corrects grammar and spelling mistakes in your text in real-time. Simply start typing, and the corrected text will appear, with all changes highlighted.

## About The Project

This application provides a simple and intuitive interface for fixing grammar and spelling errors. It's designed to help you write better and more accurate text with minimal effort.

### Core Features:

*   **Real-time Correction**: Automatically corrects your text as you type.
*   **Highlighting Changes**: Clearly highlights spelling and grammar corrections.
*   **Copy to Clipboard**: Easily copy the corrected text.
*   **Responsive Design**: Works on all devices.

## Tech Stack

*   [Next.js](https://nextjs.org/) - React framework for production.
*   [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
*   [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript at any scale.
*   [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework.
*   [Google Generative AI](https://ai.google/) - Used for the grammar and spelling correction.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18 or later)
*   pnpm (or npm/yarn)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies:**
    ```sh
    pnpm install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root of your project and add your Google API key:
    ```
    GOOGLE_API_KEY=your_google_api_key
    ```

4.  **Run the development server:**
    ```sh
    pnpm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How It Works

The application uses a debounced function to send the user's input to the backend API. After the user stops typing for 1.5 seconds, the text is sent to the `/api/fix-grammar` endpoint. The backend then uses the Google Generative AI API to correct the text and returns the corrected version along with a list of corrections. The frontend then highlights these corrections to the user.

# Veritas AI - Advanced AI-Powered School ERP

Veritas AI is a modern, feature-rich Enterprise Resource Planning (ERP) system designed for educational institutions. It leverages the power of generative AI to provide deep insights, automate reporting, and offer actionable strategies to drive school growth. The dashboard is built with a focus on a clean, intuitive, and premium user experience.

![Veritas AI Dashboard](https://storage.googleapis.com/studiostack/screenshots/veritas-ai-dashboard-v1.png)

## Key Features

-   **AI-Powered Dashboard:** Get a quick, AI-generated summary of daily activities, including attendance, fee collection, and admission enquiries.
-   **Growth Dashboard:** Track key metrics like student strength, fee collection, admissions, and enquiries over time with a responsive line chart. Includes an AI assistant to analyze trends and suggest growth strategies.
-   **Interactive Admission Funnel:** A visually engaging and detailed funnel chart that tracks students from enquiry to enrollment, with an AI assistant to identify bottlenecks and recommend marketing actions.
-   **Teacher Morale Assessment:** The "Teacher Pulse" board uses AI to assess staff morale based on performance metrics, providing actionable feedback for the principal.
-   **Dropout Radar:** Identifies at-risk students based on performance decline and other factors, allowing for timely intervention.
-   **Geotag Marketing Analysis:** Analyzes the geographic distribution of students and provides AI-driven marketing strategies tailored to specific locations.
-   **Meera AI Chat Assistant:** A powerful, copilot-style AI assistant that can answer questions, perform actions (like adding tasks), and present data using rich UI components directly in the chat.
-   **Comprehensive AI Reports:** Generate in-depth reports for the entire school or specific classes, covering everything from growth and admissions to academic performance and staff morale.

## Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/) (App Router)
-   **UI Library:** [React](https://react.dev/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
-   **Generative AI:** [Google's Genkit](https://firebase.google.com/docs/genkit)
-   **Charts:** [Recharts](https://recharts.org/)

---

## Getting Started

Follow these instructions to set up and run the project on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (version 20 or later recommended)
-   `npm` or `yarn`

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

### Environment Variables

The project uses Google's Generative AI. To connect to the AI service, you need to set up an API key.

1.  Create a `.env` file in the root of the project.
2.  Add your Google AI API key to the file:
    ```.env
    GEMINI_API_KEY=your_google_ai_api_key_here
    ```
    You can obtain a key from [Google AI Studio](https://aistudio.google.com/).

### How to Use Without Firebase or AI services

This project is configured to run entirely on mock data out-of-the-box.
-   All dashboard components are powered by static data located in `src/lib/school-data.ts`.
-   The AI features will not work without a `GEMINI_API_KEY`, but the rest of the application will remain fully functional. You can explore the UI and component interactions without any external service setup.

---

## Running the Application

### 1. Running in Development Mode

This mode is ideal for development, as it includes hot-reloading.

```sh
npm run dev
```

The application will be available at **http://localhost:9002**.

### 2. Running a Production Build Locally

To test the application in a production-like environment on your local machine:

1.  **Build the application:**
    ```sh
    npm run build
    ```
2.  **Start the production server:**
    ```sh
    npm run start
    ```
The application will be available at **http://localhost:3000**.

---

## Deployment

### Deploying to cPanel or Similar Shared Hosting

To get the full functionality of this application, including the AI features, you need to run it in a Node.js environment. Many cPanel providers offer a "Setup Node.js App" feature, which is the recommended method.

**Important:** This app requires a server to run its AI features, so it cannot be deployed as a simple static website.

#### Running as a Node.js Application

1.  **Upload Project Files:**
    -   Zip all your project files and folders, but **do not include** the `node_modules` or `.next` directories.
    -   Log in to your cPanel and open the "File Manager".
    -   Navigate to a new directory for your app (e.g., `/home/youruser/my-next-app`) and upload the zip file.
    -   Unzip the file.

2.  **Set up the Node.js App in cPanel:**
    -   Find and open the "Setup Node.js App" tool in cPanel.
    -   Click "Create Application".
    -   Set the "Application root" to the directory where you uploaded your files (e.g., `my-next-app`).
    -   Set the "Application startup file" to `node_modules/.bin/next`.
    -   Set the "Application mode" to `production`.
    -   In the "Environment Variables" section, add your `GEMINI_API_KEY`.
    -   Click "Create".

3.  **Install Dependencies and Build:**
    -   The Node.js app interface in cPanel usually provides a command to run. Use it to execute the following in your application root:
        ```sh
        npm install
        npm run build
        ```
    -   Once the commands finish, click **"Restart"** for your application in the cPanel interface. Your app should now be live at the domain provided by cPanel.

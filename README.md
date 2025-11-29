# AI Prompt Creator

**AI Prompt Creator** is a powerful React-based web application designed to help users generate structured JSON prompts for AI image generation models. It provides a dynamic, user-friendly interface to construct complex prompts with nested properties, arrays, and templates.

## 🚀 Features

*   **Dynamic JSON Generation**: Build complex JSON structures by adding nested fields and values dynamically.
*   **Root-Level Editing**: Directly edit root properties of the `image_description`.
*   **Subject Templates**:
    *   **Human**: Automatically adds fields for clothing, expression, holding, etc.
    *   **Car**: Adds fields for brand, model, year, color, etc.
    *   **Animal**: Adds fields for species, breed, action, etc.
    *   **Object**: Adds fields for material, color, shape, etc.
*   **Multiple Subjects**: Support for defining multiple subjects (e.g., two people, a person and a car) in a single prompt.
*   **Array Support**: Easily create arrays of strings or objects for lists of elements or modifications.
*   **Upload Placeholders**: Quick-action buttons to insert `[Uploaded image]` or `[Uploaded document]` placeholders.
*   **Real-Time Preview**: View the generated JSON instantly as you edit.
*   **One-Click Copy**: Copy the entire JSON structure to your clipboard.
*   **Premium UI**: A sleek, dark-mode interface built with Tailwind CSS, featuring glassmorphism and smooth animations.

## 🛠️ Tech Stack

*   **Frontend**: React.js
*   **Build Tool**: Vite
*   **Styling**: Tailwind CSS
*   **Icons**: Lucide React

## 📦 Installation & Usage

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd prompt-creator
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the development server**:
    ```bash
    npm run dev
    ```

4.  **Open the application**:
    Navigate to `http://localhost:5173` in your browser.

## 📝 Usage Guide

1.  **Image Description**: Add top-level details about the image in the "Image Description" section.
2.  **Subjects**:
    *   Click "Add Subject" to add a new character or object.
    *   Select a "Type" (Human, Car, etc.) to auto-populate relevant fields.
    *   Add specific details like clothing or expression.
3.  **Environment & Others**: Fill in details for Environment, Camera Style, Lighting, Mood, and Art Style using the respective cards.
4.  **Dynamic Fields**:
    *   Click "Add Field" to add custom properties anywhere.
    *   Select "Array" to create a list of items.
    *   Use "Img" or "Doc" buttons to insert upload placeholders.
5.  **Export**: Click the "Copy JSON" button in the preview pane to get your prompt.

## 📄 License

This project is open-source and available under the MIT License.

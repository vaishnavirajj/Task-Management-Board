# Task Management Board with Drag-and-Drop

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

---

## Description

The **Task Management Board** is a web-based application designed to help users organize and manage their tasks efficiently. It provides a simple, interactive, and flexible platform to move tasks between different categories like "To-Do," "In Progress," and "Done" with an intuitive drag-and-drop interface. This project is ideal for personal productivity, project management, and workflow visualization.

## Features

- **Drag-and-Drop Functionality**: Easily drag tasks from one category to another to update their status.
- **Customizable Categories**: Organize tasks into predefined categories or create new ones that match your workflow.
- **Persistent Task Storage**: Tasks are stored in the browser's local storage, allowing users to pick up right where they left off, even after refreshing the page.
- **Responsive Design**: Ensures a smooth experience across all screen sizes and devices.
- **Dynamic Category Addition**: Add new categories as needed to further customize the board according to your unique requirements.

## Tech Stack

The project is developed using core web technologies:
- **HTML**: Structures the layout of the task management board.
- **CSS**: Provides styling and responsiveness, ensuring a visually appealing user experience.
- **JavaScript**: Implements drag-and-drop functionality, task management, and local storage for data persistence.

## Usage

1. **Add a Task**:
   - Click the "+ Add New Task" button in the sidebar.
   - Enter a task description and select a category from the dropdown.
   - Click "Add Task" to save the task in the selected category.

2. **Move Tasks**:
   - Drag a task from one category and drop it into another to update its status.

3. **Add a New Category**:
   - Click "+ Add New Category" in the sidebar to create a custom category.
   - Enter a name for the new category, and it will appear as a new column on the board.

4. **Persistent Storage**:
   - Tasks and categories are saved automatically to the browser's local storage, allowing users to retain their data even after refreshing the page.

## Project Structure

```
task-management-board/
├── index.html       # The main HTML file
├── style.css        # CSS for styling the interface
├── script.js        # JavaScript for functionality and local storage
└── README.md        # Project documentation
```

## Future Enhancements

Here are some potential future features and improvements:

- **Task Editing and Deletion**: Allow users to edit and delete tasks directly on the board.
- **Task Prioritization**: Add priority indicators (e.g., High, Medium, Low) for each task.
- **Due Dates and Reminders**: Set due dates for tasks and send reminders as deadlines approach.
- **Dark Mode**: Provide a dark theme for improved accessibility and aesthetics.
- **User Authentication**: Enable multiple users to manage individual task boards with user accounts.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

# Unit Manager

## What I Learned

Through this project, I enhanced my skills by:
- Building a **responsive frontend** with a clean UI/UX for both admin and resident interfaces.
- Leveraging **TypeScript** to improve type safety, code clarity, and reduce runtime errors.
- Developing scalable UI components using **Tailwind CSS** for fast styling and consistency.
- Implementing **Next.js** for optimized performance.
- Integrating **Framer Motion** to add smooth animations and enhance the user experience.
- Creating a **role-based access system (RBAC)** for secure and organized user management.
- Ensuring a seamless experience across devices by focusing on responsive design best practices.

## Description
This project is a **Unit Manager** designed to manage users, residents, and units efficiently. It includes a robust role-based system with support for administrators, receptionists, and residents. The entire application is fully responsive, ensuring a seamless experience across devices.

## Key Features
- **Next.js** for enhanced performance and SEO benefits.
- **TypeScript** for improved type safety and maintainability.
- **Tailwind CSS** for fast, scalable, and consistent styling.
- **Framer Motion** for fluid and engaging animations.
- **Role-Based Access Control (RBAC)** for improved security and user management.
- Fully **responsive design**, ensuring optimal usability on all devices.

## Folder Structure

``` bash
/src
 ├── api/            # API endpoints and data fetching logic
 ├── app/            # Main application structure (Next.js app folder)
 ├── components/     # Reusable UI components
 ├── config/         # Configuration files and constants
 ├── context/        # Global state management with Context API
 ├── hooks/          # Custom React hooks for logic reuse
 ├── mocks/          # Mock data for testing and development
 ├── types/          # TypeScript types for better type safety
 ├── utils/          # Utility functions for common tasks
 ├── index.tsx       # Main entry point for the Next.js app
```

## Features

### Responsive Design
- **Fully Responsive**: The entire application is fully responsive, including all admin pages, ensuring usability across devices such as desktops, tablets, and phones.


### User Management
- **User Listing**: A list of all users with search, pagination, and filtering.
- **Create/Edit Users**: Admins can create or edit user details through a dynamic route.
- **Role-Based Views**: Each user role (`admin`, `receptionist`, `resident`) has specific permissions and accessible views.
- **Search Bar**: A reusable search bar to filter users.

---

### Resident Management
- **Resident Listing**: View all residents with their details (e.g., name, email, phone, unit number, and family members).
- **Create/Edit Residents**: Add or update resident details using a dynamic route.
- **Family Members**: Residents can include details about family members.

---

### Unit Management
- **Unit Listing**: A list of all units with details such as unit number, floor, square footage, type, owner, lease agreement, and parking spots.
- **Create/Edit Units**: Add or update unit details using a dynamic route.

---

### Dashboard
- **Admin Dashboard**: Displays user statistics, system logs, and quick links for management.
- **Receptionist Dashboard**: Focused on managing residents and units.
- **Resident Dashboard**: Personal information, useful contacts, and updates related to the resident.

---

### Modals
- **Reusable Modal Component**: 
  - **Warning**: Used to confirm destructive actions.
  - **Success**: Provides feedback for successful actions.
  - **Error**: Displays error messages.
- **Example Use**: Confirmation modals for deleting users, residents, or units.

---

### Protected Routes
- **Role-Based Route Guard**: Ensures pages are accessible only to specific roles.
- **Centralized Routes**: Defines all routes and their allowed roles in a single configuration.

---

### Reusable Components
- **Search Bar**: Dynamic search bar to filter data across different pages.
- **Pagination**: Custom pagination component for data-heavy pages, responsive for smaller screens.
- **Table Component**: Reusable table with configurable columns, row actions, and stacked view for small screens.

---

### Form Components
- **Reusable InputField Component**: Simplifies input management with built-in support for labels, validation, and optional disabled states.
- **Reusable SelectField Component**: Standardized dropdown menus with placeholder, validation, and optional disabled states.
- **Dynamic Form Features**: Both components integrate seamlessly into forms for consistent styling and functionality.

---

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/samuelfuchs/resident-unit-management
   
2. Clone the repository:
   ```bash
   npm install

3. Install dependencies:
    ```bash
   npm run dev
   
4. Install dependencies:
    ```bash
   http://localhost:3000
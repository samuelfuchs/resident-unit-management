# Resident Management System

## Description
This project is a **Resident Management System** designed to manage users, residents, and units efficiently. It includes a robust role-based system with support for administrators, receptionists, and residents.

---

## Features

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
- **Emergency Contacts**: Add emergency contact details for each resident.

---

### Unit Management
- **Unit Listing**: A list of all units with details such as unit number, floor, square footage, type, owner, lease agreement, and parking spots.
- **Create/Edit Units**: Add or update unit details using a dynamic route.

---

### Dashboard
- **Admin Dashboard**: Displays user statistics, system logs, and quick links for management.
- **Receptionist Dashboard**: Focused on managing residents and units.
- **Resident Dashboard**: Personal information and updates related to the resident.

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
- **Pagination**: Custom pagination component for data-heavy pages.
- **Table Component**: Reusable table with configurable columns and row actions.

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

---

## Technologies Used
- Frontend: React, Next.js, Tailwind CSS
- Icons: Heroicons
- State Management: Context API
- TypeScript: For static typing and robust type definitions

---

## Future Features
- Detailed analytics and reporting.
- Notifications for admins and residents.
- Advanced unit and resident filtering options.
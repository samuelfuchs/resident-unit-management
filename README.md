# Resident Management System

## Description
This project is a **Resident Management System** designed to manage users, residents, and units efficiently. It includes a robust role-based system with support for administrators, receptionists, and residents. The entire application is fully responsive, including all admin pages, ensuring a seamless experience across devices.

---

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
- **Emergency Contacts**: Add emergency contact details for each resident.

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

### Notifications
- **Notification Types**: Includes `general`, `mail`, and `critical` notifications.
- **Role-Specific Notifications**:
  - Admins and receptionists can send and receive notifications.
  - Receptionists cannot edit notifications.
  - Residents can only receive notifications.
- **Tabs for Sent/Received**: Notifications are grouped into "Sent" and "Received" tabs.
- **Pagination**: Both "Sent" and "Received" notifications have pagination if there are more than 10 items.
- **Message Preview**: Notifications are displayed as a list with a truncated message preview.
- **Detailed View**: Clicking on a notification opens a modal with full details.
- **Read Status**: Notifications are marked as read when viewed.
- **Unread Badge**: Displays a badge with the count of unread notifications in the sidebar.

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

### Profile Page
- **Enhanced Profile Page**: Uses the new `InputField` and `SelectField` components for improved maintainability and consistent user experience.
- **User-Friendly UI**: Dynamic display of profile information with editable fields.
- **Customizable Profile Picture**: Display initials or a user-uploaded picture for personalization.

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
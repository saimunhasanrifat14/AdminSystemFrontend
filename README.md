# Role-Based Admin & Project Management Frontend

## Overview
This is the **frontend** for the Role-Based Admin & Project Management System.  
The application provides an admin panel for managing users and projects with invite-based onboarding.

The frontend communicates with the backend REST API and implements authentication, role-based UI rendering, and protected routes.

---

## Tech Stack
- React.js
- React Router 
- Axios
- Tailwind CSS

---

## Features

### Authentication
- Login system using JWT
- Auth state persisted
- Protected routes

### Invite-Based Registration
- User registers using admin-generated invite token
- Registration page validates token
- Role assigned from invite

### User Management (Admin Only)
- View all users
- Change roles (ADMIN | MANAGER | STAFF)
- Activate / deactivate users
- Restricted UI for non-admin users

### Project Management
- All users can create projects
- Only admins can edit/delete projects
- Role-based action buttons


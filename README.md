# CampusConnect

A beginner-friendly campus event dashboard built with React, JavaScript, JSX and CSS. JSONPlaceholder provides mock data. There is no backend, database, router, UI library, or authentication service. Vite only runs and builds the React project.

## Run the project

Install Node.js (version 22.12 or newer), then open a terminal in this folder:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. In Windows PowerShell, use `npm.cmd` if script execution policy blocks `npm`.

```text
Email: admin@campus.com
Password: 1234
```

Build for deployment with `npm run build`; preview that build with `npm run preview`.

## Project structure

```text
src/
  components/
    Login.jsx         Login form and validation
    Dashboard.jsx     API, state, filter, statistics and event handlers
    EventTable.jsx    Table rows made with map()
    EventDetails.jsx  Selected event details
    AddEvent.jsx      New event form and validation
  App.jsx             Login protection and logout
  App.css             All styling, including mobile layout
  main.jsx            React entry point
```

## Important behavior

- The API request gets posts from `https://jsonplaceholder.typicode.com/posts`. The first eight posts become events. Their IDs and descriptions come from the API; names, categories, status and registration counts are mock values for the practical.
- The three cards are calculated from the currently filtered events. Registration counts are illustrative; there is no student registration workflow.
- Newly added events live in React state. Reloading or logging out clears them. They are not posted to the API.
- Local Storage keeps `isLoggedIn` and `selectedCategory`. Refresh retains the login and filter. Logout removes only the login flag.
- This is demo login protection for a practical, not secure authentication. The password is intentionally in the frontend.
- Fonts use Google Fonts with local Arial fallbacks. No image assets or UI packages are required.

## Manual checks

1. Submit empty login fields, an invalid email, a short password, and wrong credentials. Check the validation messages.
2. Login with the demo account. Confirm eight events, six upcoming events and 448 mock registrations under All.
3. Select Sports. Confirm two rows, two upcoming events and 104 registrations. Refresh and confirm Sports stays selected.
4. Click View, read the API description, then Close. Also try Escape and clicking outside the dialog.
5. Open Add Event, submit empty fields and check all four errors. Fill them, submit, and confirm the success message and new table row. The filter resets to All so the new row is visible.
6. Open Add Event again and confirm the form is empty. Cancel it.
7. Logout and refresh. Confirm the login screen returns. Login again and confirm API events load anew.
8. Simulate an offline API request in browser developer tools and reload while logged in. Confirm an error and Try again button; reconnect and retry.

See [Viva Preparation](VIVA_PREPARATION.md) for all twenty answers and the two-minute script.

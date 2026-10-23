# Viva Preparation

### 1. What is React?

React is a JavaScript library for building user interfaces. We build small parts called components and combine them into a page.

### 2. Why did we use React?

React makes it easy to update the screen when data changes. For example, adding an event changes state and React updates the table and cards automatically.

### 3. What is an API?

An API lets programs exchange information. Our application requests mock posts from JSONPlaceholder and displays them as campus events.

### 4. What is JSON?

JSON stands for JavaScript Object Notation. It is a text format for exchanging data, using objects, arrays, keys and values.

### 5. What does fetch() do?

`fetch(url)` sends an HTTP request to a URL. It returns a Promise because the response takes time to arrive.

### 6. What does response.json() do?

It reads the response body and converts JSON text into JavaScript data. It also returns a Promise. Our next `.then()` receives the posts array.

### 7. What is useState()?

`useState()` stores data for a component. It returns the current value and a setter function. Calling the setter asks React to render with the updated data. We use it for inputs, events, errors and selected events.

### 8. What is useEffect()?

`useEffect()` runs code after React renders. We use it to fetch events when the dashboard opens. Its dependency array contains `requestNumber`, so Try again can trigger another request. Cleanup ignores a response if the dashboard has already closed.

### 9. What does .map() do?

`map()` creates a new array by transforming each item. We use it to turn API posts into events, and then turn event objects into table rows. Each row has a unique `key` so React can identify it.

### 10. What does .filter() do?

`filter()` creates a new array containing only elements that satisfy a condition. It does not change the original array. For Sports, we keep only events whose category equals Sports.

### 11. What is localStorage?

It is browser storage that saves text as key-value pairs. The values remain after a page refresh or browser restart until removed. It belongs to the site's origin.

### 12. Why did we use localStorage?

We store the demo login flag and selected category. `setItem()` saves a value, `getItem()` reads one, and `removeItem()` deletes one. We do not save the password there.

### 13. What happens when Login is clicked?

The form calls `handleSubmit()`. `preventDefault()` stops a page reload. We check the inputs and credentials. If valid, `App` saves `isLoggedIn` as the string `"true"` and changes state to show the dashboard. Otherwise errors appear.

### 14. What happens when the API is called?

Loading becomes true and we show “Loading events...”. `fetch()` requests posts. We check `response.ok`, call `response.json()`, then map eight posts into event objects. Updating state shows the table. `.catch()` handles request or parsing failures.

### 15. What happens when View is clicked?

The button passes the row's event to `viewEvent(event)`. That sets `selectedEvent`. Conditional rendering shows EventDetails, and props provide the data. Close sets the selected event back to null.

### 16. What happens when Add Event is clicked?

The button opens a form. Submitting validates four fields. A valid event gets a unique ID and zero registrations. We use `[...events, newEvent]` to create a new array in state. We clear the form, close it, reset the filter to All and show success. We do not send the event to the API.

### 17. How does category filtering work?

The dropdown's `onChange` calls `changeCategory()`. It updates state and saves the preference. During rendering, `filter()` keeps matching events. Choosing All keeps every event. The cards use the same filtered array.

### 18. How is form validation implemented?

We create an errors object in the submit handler. Empty or invalid fields add messages. `trim()` catches whitespace-only text. A regular expression checks email format, and `.length` checks password length. We stop submission when `Object.keys(errors).length` is greater than zero. The forms use `noValidate` so our JavaScript messages handle validation.

### 19. How does Logout work?

The button calls `logout()` in App through a prop. It removes `isLoggedIn` from Local Storage and changes login state to false. React then renders Login. On refresh, App reads the storage value and shows the dashboard only if it is exactly `"true"`.

### 20. What happens if the API fails?

`.catch()` sets an error message and stops loading. We show a Try again button. Clicking it changes `requestNumber`, so the effect makes another request. We do not silently replace the failed response with fake local data.

## Two-minute explanation script

“My project is CampusConnect, a simple college event management dashboard. I built it using React, JavaScript, JSX and CSS. Vite helps run and build it. I kept the application in small components so I can understand and explain each part.

The application begins with a login page. The demo email is admin@campus.com and the password is 1234. When the form is submitted, JavaScript checks for empty fields, a valid email format, password length and matching credentials. A successful login saves a flag in Local Storage and opens the dashboard. This is only a demo login, not secure authentication.

The dashboard calls the JSONPlaceholder posts API using fetch inside useEffect. I check the response, convert it using response.json, and use then to handle the data. I take eight posts and map them into mock events. Their descriptions and IDs come from the API. While waiting, I display a loading message. If the request fails, catch displays an error with a retry button.

The events appear in a table created with map. A category dropdown uses filter to show matching events. The selected category is saved in Local Storage, so it stays selected after refreshing. Three statistic cards calculate the number of events, upcoming events and mock registrations from the displayed data.

Each View button opens the selected event's details. Add Event opens a validated form. Submitting adds a new object to React state and updates the table without reloading the page. New events last for the current session. Finally, Logout removes the login flag and returns to the login screen.

This project demonstrates components, props, useState, useEffect, API calls, array methods, validation, event handlers and Local Storage.”

## A few extra questions

- **What are props?** Data or functions passed from a parent component to a child. Dashboard passes `events` and `onView` to EventTable.
- **Why use spread syntax?** `[...events, newEvent]` makes a new array instead of changing the existing state array directly.
- **What does reduce() do?** It combines array values into one result. We start at zero and add each event's mock registration count.
- **What is conditional rendering?** Showing different JSX based on a condition, such as Login versus Dashboard or loading versus the table.
- **Why no backend?** The brief asks for a simple frontend practical. JSONPlaceholder supplies mock read data, while React state handles session additions.
- **What is framework experimentation here?** Rebuilding a normal static page as React components shows reusable UI and state-driven rendering. React is technically a UI library; Vite is the build tool. No second framework is necessary.

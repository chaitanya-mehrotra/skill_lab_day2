import { useEffect, useState } from "react";
import EventTable from "./EventTable";
import EventDetails from "./EventDetails";
import AddEvent from "./AddEvent";

const categories = ["Technical", "Sports", "Cultural", "Workshop"];
const eventNames = [
  "Tech Hackathon",
  "Badminton Tournament",
  "Cultural Fest",
  "AI Workshop",
  "Coding Club Meetup",
  "Intercollege Football",
  "Open Mic Night",
  "Design Thinking Workshop",
];

export default function Dashboard({ onLogout }) {
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState(() => {
    const saved = localStorage.getItem("selectedCategory");
    return categories.includes(saved) ? saved : "All";
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [success, setSuccess] = useState("");
  const [requestNumber, setRequestNumber] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (!response.ok) throw new Error("The server could not load events.");
        return response.json();
      })
      .then((posts) => {
        if (!active) return;
        const mockEvents = posts.slice(0, 8).map((post, index) => ({
          id: post.id,
          name: eventNames[index],
          description: post.body,
          category: categories[index % categories.length],
          status: index === 2 || index === 6 ? "Completed" : "Upcoming",
          registeredStudents: 20 + post.id * 8,
        }));
        setEvents(mockEvents);
        setLoading(false);
      })
      .catch(() => {
        if (!active) return;
        setError(
          "Unable to load events. Check your internet connection and try again.",
        );
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [requestNumber]);

  function changeCategory(value) {
    setCategory(value);
    localStorage.setItem("selectedCategory", value);
  }

  function addEvent(form) {
    const nextId = Math.max(0, ...events.map((event) => event.id)) + 1;
    setEvents([...events, { ...form, id: nextId, registeredStudents: 0 }]);
    changeCategory("All");
    setShowAddForm(false);
    setSuccess("Event added successfully. It is available for this session.");
  }

  function viewEvent(event) {
    setSelectedEvent(event);
  }

  // filter() returns a new array containing only items that match the condition.
  const filteredEvents = events.filter(
    (event) => category === "All" || event.category === category,
  );
  const upcomingEvents = filteredEvents.filter(
    (event) => event.status === "Upcoming",
  ).length;
  const registeredStudents = filteredEvents.reduce(
    (total, event) => total + event.registeredStudents,
    0,
  );

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">c.</span> CampusConnect
        </div>
        <span className="nav-caption">WORKSPACE</span>
        <a className="nav-active" href="#events">
          <span>▦</span> Event dashboard <span>↗</span>
        </a>
        <div className="sidebar-note">
          <span className="note-shape">✳</span>
          <h3>
            Bring campus
            <br />
            to life.
          </h3>
          <p>The next great campus experience starts with an idea.</p>
          <button onClick={() => setShowAddForm(true)}>
            Create an event ↗
          </button>
        </div>
        <div className="sidebar-bottom">
          <span className="avatar">A</span>
          <div>
            <strong>Campus Admin</strong>
            <small>Event coordinator</small>
          </div>
        </div>
      </aside>
      <div className="main-area">
        <header className="topbar">
          <span>
            Workspace <span className="slash">/</span> <strong>Overview</strong>
          </span>
          <span className="admin-greeting">
            Welcome, Admin <span className="avatar small">A</span>
          </span>
        </header>
        <main className="dashboard">
          <div className="page-heading">
            <div>
              <span className="eyebrow">MAKE SOMETHING HAPPEN</span>
              <h1>Campus Event Dashboard</h1>
              <p className="muted">
                A little planning. A lot of possibilities.
              </p>
            </div>
            <div className="heading-actions">
              <button className="secondary" onClick={onLogout}>
                Logout ↗
              </button>
              <button className="primary" onClick={() => setShowAddForm(true)}>
                ＋ Add Event
              </button>
            </div>
          </div>
          <section className="stats" aria-label="Event statistics">
            <article className="stat-card">
              <div>
                <span>Total Events</span>
                <span className="stat-icon">▦</span>
              </div>
              <strong>{loading ? "—" : filteredEvents.length}</strong>
              <small>Events in this selection</small>
            </article>
            <article className="stat-card">
              <div>
                <span>Upcoming Events</span>
                <span className="stat-icon">◷</span>
              </div>
              <strong>{loading ? "—" : upcomingEvents}</strong>
              <small>Good things on the horizon</small>
            </article>
            <article className="stat-card featured">
              <div>
                <span>Registered Students</span>
                <span className="stat-icon">♧</span>
              </div>
              <strong>{loading ? "—" : registeredStudents}</strong>
              <small>Mock registrations · API demo data</small>
            </article>
          </section>
          {success && (
            <div className="success-message" role="status">
              ✓ {success}
              <button
                aria-label="Dismiss success message"
                onClick={() => setSuccess("")}
              >
                ×
              </button>
            </div>
          )}
          <section id="events" className="events-panel">
            <div className="table-heading">
              <div>
                <h2>
                  Campus events{" "}
                  <span className="count-pill">{filteredEvents.length}</span>
                </h2>
                <p className="muted">
                  Discover what’s happening around campus.
                </p>
              </div>
              <div className="filter-control">
                <label htmlFor="category-filter">Category</label>
                <select
                  id="category-filter"
                  value={category}
                  onChange={(event) => changeCategory(event.target.value)}
                >
                  <option>All</option>
                  {categories.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>
            {loading ? (
              <div className="empty-state" role="status">
                Loading events...
              </div>
            ) : error ? (
              <div className="empty-state" role="alert">
                <p>{error}</p>
                <button
                  className="secondary"
                  onClick={() => setRequestNumber(requestNumber + 1)}
                >
                  Try again
                </button>
              </div>
            ) : (
              <EventTable events={filteredEvents} onView={viewEvent} />
            )}
            <div className="table-footer">
              <span>
                {loading
                  ? "Connecting to campus events…"
                  : `Showing ${filteredEvents.length} event${filteredEvents.length === 1 ? "" : "s"}`}
              </span>
              <span>
                <i className="green-dot" /> Powered by JSONPlaceholder
              </span>
            </div>
          </section>
          <footer className="page-footer">
            <span>CampusConnect · College Event Management Portal</span>
            <span>Made for the moments that matter.</span>
          </footer>
        </main>
      </div>
      {selectedEvent && (
        <EventDetails
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
      {showAddForm && (
        <AddEvent
          categories={categories}
          onAdd={addEvent}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
}

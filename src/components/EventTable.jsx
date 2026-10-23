export default function EventTable({ events, onView }) {
  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Event Name</th>
            <th>Category</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td className="event-id">{String(event.id).padStart(2, "0")}</td>
              <td>
                <span
                  className={`event-symbol ${event.category.toLowerCase()}`}
                  aria-hidden="true"
                >
                  {event.category === "Technical"
                    ? "⌘"
                    : event.category === "Sports"
                      ? "↗"
                      : event.category === "Cultural"
                        ? "✳"
                        : "✎"}
                </span>
                <strong>{event.name}</strong>
              </td>
              <td>{event.category}</td>
              <td>
                <span className={`status ${event.status.toLowerCase()}`}>
                  <i />
                  {event.status}
                </span>
              </td>
              <td>
                <button className="view-button" onClick={() => onView(event)}>
                  View <span>↗</span>
                </button>
              </td>
            </tr>
          ))}
          {events.length === 0 && (
            <tr>
              <td colSpan="5" className="empty-state">
                No events in this category yet. Add an event to get started.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function EventDetails({ event, onClose }) {
  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      onKeyDown={(key) => {
        if (key.key === "Escape") onClose();
      }}
    >
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="details-title"
        onClick={(click) => click.stopPropagation()}
      >
        <div className="modal-heading">
          <div>
            <span className="eyebrow">CAMPUSCONNECT / EVENT {event.id}</span>
            <h2 id="details-title">Event Details</h2>
          </div>
          <button
            autoFocus
            className="close-button"
            aria-label="Close event details"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <dl>
          <dt>Name</dt>
          <dd className="detail-name">{event.name}</dd>
          <dt>Category</dt>
          <dd>{event.category}</dd>
          <dt>Description</dt>
          <dd className="description">{event.description}</dd>
          <dt>Status</dt>
          <dd>
            <span className={`status ${event.status.toLowerCase()}`}>
              <i />
              {event.status}
            </span>
          </dd>
          <dt>Registered Students</dt>
          <dd>{event.registeredStudents} (demo)</dd>
        </dl>
        <div className="modal-actions">
          <button className="primary" onClick={onClose}>
            Close
          </button>
        </div>
      </section>
    </div>
  );
}

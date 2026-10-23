import { useState } from "react";

const emptyForm = { name: "", category: "", description: "", status: "" };

export default function AddEvent({ categories, onAdd, onClose }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Event name cannot be empty.";
    if (!form.category) nextErrors.category = "Select a category.";
    if (!form.description.trim())
      nextErrors.description = "Description cannot be empty.";
    if (!form.status) nextErrors.status = "Select a status.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    onAdd({
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
    });
    setForm(emptyForm);
  }

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      onKeyDown={(event) => {
        if (event.key === "Escape") onClose();
      }}
    >
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-heading">
          <div>
            <span className="eyebrow">SOMETHING TO LOOK FORWARD TO</span>
            <h2 id="add-title">Add Event</h2>
          </div>
          <button
            className="close-button"
            aria-label="Close add event"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <p className="muted">Bring your next campus idea to the calendar.</p>
        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="event-name">Event Name</label>
          <input
            autoFocus
            id="event-name"
            name="name"
            placeholder="e.g. Robotics Exhibition"
            value={form.name}
            onChange={updateField}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="field-error" role="alert">
              {errors.name}
            </p>
          )}
          <div className="form-row">
            <div>
              <label htmlFor="event-category">Category</label>
              <select
                id="event-category"
                name="category"
                value={form.category}
                onChange={updateField}
                aria-invalid={!!errors.category}
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
              {errors.category && (
                <p className="field-error" role="alert">
                  {errors.category}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="event-status">Status</label>
              <select
                id="event-status"
                name="status"
                value={form.status}
                onChange={updateField}
                aria-invalid={!!errors.status}
              >
                <option value="">Select status</option>
                <option>Upcoming</option>
                <option>Completed</option>
              </select>
              {errors.status && (
                <p className="field-error" role="alert">
                  {errors.status}
                </p>
              )}
            </div>
          </div>
          <label htmlFor="event-description">Description</label>
          <textarea
            id="event-description"
            name="description"
            rows="4"
            placeholder="What is this event about?"
            value={form.description}
            onChange={updateField}
            aria-invalid={!!errors.description}
          />
          {errors.description && (
            <p className="field-error" role="alert">
              {errors.description}
            </p>
          )}
          <p className="form-note">
            New events stay in this session. No API write is needed.
          </p>
          <div className="modal-actions">
            <button type="button" className="secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary">
              ＋ Add Event
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

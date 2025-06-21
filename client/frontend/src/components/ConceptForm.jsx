import React, { useState, useEffect } from "react";

export default function ConceptForm({ onSave, editingConcept, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Prefill form when editingConcept changes
  useEffect(() => {
    if (editingConcept) {
      setTitle(editingConcept.title || "");
      setDescription(editingConcept.description || "");
      setTags(editingConcept.tags ? editingConcept.tags.join(", ") : "");
    } else {
      // Clear form when not editing
      setTitle("");
      setDescription("");
      setTags("");
      setError(null);
    }
  }, [editingConcept]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    try {
      const url = editingConcept
        ? `http://localhost:5000/api/concepts/${editingConcept._id}`
        : "http://localhost:5000/api/concepts";

      const method = editingConcept ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, tags: tagsArray }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save concept");
      }

      const savedConcept = await res.json();

      onSave(savedConcept, !!editingConcept);

      // Clear form only if adding new concept
      if (!editingConcept) {
        setTitle("");
        setDescription("");
        setTags("");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 600,
        margin: "2rem auto",
        padding: "1rem",
        border: "1px solid #ddd",
        borderRadius: 8,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2>{editingConcept ? "Edit Concept" : "Add New Concept"}</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          Title:<br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem" }}
            placeholder="Concept title"
          />
        </label>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          Description:<br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem" }}
            rows={4}
            placeholder="Concept description"
          />
        </label>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          Tags (comma separated):<br />
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. javascript, node, backend"
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </label>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: loading ? "not-allowed" : "pointer",
            marginRight: "1rem",
          }}
        >
          {loading ? (editingConcept ? "Updating..." : "Adding...") : (editingConcept ? "Update Concept" : "Add Concept")}
        </button>

        {editingConcept && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: 4,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

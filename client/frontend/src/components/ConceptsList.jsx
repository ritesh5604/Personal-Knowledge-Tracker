import React, { useEffect, useState } from "react";
import ConceptForm from "./ConceptForm";

export default function ConceptsList() {
  const [concepts, setConcepts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingConcept, setEditingConcept] = useState(null); // to hold concept being edited

  // Fetch concepts from backend
  const fetchConcepts = () => {
    setLoading(true);
    setError(null);

    fetch("http://localhost:5000/api/concepts")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch concepts");
        return res.json();
      })
      .then((data) => {
        setConcepts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchConcepts();
  }, []);

  // Called when new concept added or updated via form
  const handleSaveConcept = (concept, isEdit = false) => {
    if (isEdit) {
      // Update in concepts list
      setConcepts((prev) =>
        prev.map((c) => (c._id === concept._id ? concept : c))
      );
    } else {
      // Add new concept on top
      setConcepts((prev) => [concept, ...prev]);
    }
    setEditingConcept(null);
  };

  // Delete concept handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this concept?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/concepts/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete concept");
      setConcepts((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // Edit button handler
  const handleEdit = (concept) => {
    setEditingConcept(concept);
  };

  if (loading) return <p>Loading concepts...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "Arial, sans-serif" }}>
      {/* Pass editing concept to form */}
      <ConceptForm
        onSave={handleSaveConcept}
        editingConcept={editingConcept}
        onCancel={() => setEditingConcept(null)}
      />

      <h2>Concepts</h2>
      {concepts.length === 0 ? (
        <p>No concepts found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {concepts.map(({ _id, title, description, tags }) => (
            <li
              key={_id}
              style={{
                border: "1px solid #ccc",
                borderRadius: 8,
                padding: "1rem",
                marginBottom: "1rem",
                boxShadow: "1px 1px 5px rgba(0,0,0,0.1)",
                position: "relative",
              }}
            >
              <h3>{title}</h3>
              <p>{description}</p>
              {tags && (
                <p>
                  <strong>Tags:</strong> {tags.join(", ")}
                </p>
              )}

              <div style={{ position: "absolute", top: 10, right: 10 }}>
                <button onClick={() => handleEdit({ _id, title, description, tags })} style={{ marginRight: 8 }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(_id)} style={{ color: "red" }}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

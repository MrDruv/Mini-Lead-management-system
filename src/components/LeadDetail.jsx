// src/components/LeadDetail.jsx
import { useParams, useNavigate } from "react-router-dom";

export default function LeadDetail({ leads }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const lead = leads.find((item) => String(item.id) === String(id));

  if (!lead) {
    return (
      <div className="container">
        <div className="card">
          <p>Lead not found.</p>
          <button
            className="btn"
            style={{ marginTop: "1rem" }}
            onClick={() => navigate("/leads")}
          >
            Back to Leads
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <button
          className="btn"
          style={{ marginBottom: "1rem" }}
          onClick={() => navigate("/leads")}
        >
          ← Back to Leads
        </button>

        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Lead Details
        </h1>

        <div style={{ display: "grid", gap: "0.75rem" }}>
          <div>
            <strong>Name:</strong> {lead.name}
          </div>
          <div>
            <strong>Phone:</strong> {lead.phone}
          </div>
          <div>
            <strong>Status:</strong> {lead.status}
          </div>
          <div>
            <strong>Created At:</strong> {lead.createdAt}
          </div>
          {lead.notes && (
            <div>
              <strong>Notes:</strong> {lead.notes}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import LeadList from "./components/LeadList";
import LeadDetail from "./components/LeadDetail";
import LeadForm from "./components/LeadForm";
import LeadEditForm from "./components/LeadEditForm";

const STORAGE_KEY = "leads";

function getInitialLeads() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Failed to parse leads from localStorage", e);
    return [];
  }
}

// Home page
function HomePage() {
  return (
    <div className="container">
      <div className="card" style={{ textAlign: "center" }}>
        <h1
          style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}
        >
          Mini Lead Management Dashboard
        </h1>
        <Link to="/leads" className="btn btn-primary">
          Go to Leads →
        </Link>
        <p style={{ marginTop: "1rem", color: "#6b7280" }}>
          Manage and track your leads in one place.
        </p>
      </div>
    </div>
  );
}

function App() {
  const [leads, setLeads] = useState(getInitialLeads);

  // Save whenever leads change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    } catch (e) {
      console.error("Failed to save leads to localStorage", e);
    }
  }, [leads]);

  // CREATE
  const addLead = (lead) => {
    setLeads((prev) => [
      ...prev,
      {
        ...lead,
        id: crypto.randomUUID(),
        createdAt: new Date().toLocaleString(),
      },
    ]);
  };

  // UPDATE
  const updateLead = (id, updates) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, ...updates } : lead)),
    );
  };

  // DELETE
  const deleteLead = (id) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
  };

  return (
    <div className="app-root">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/leads"
          element={<LeadList leads={leads} onDelete={deleteLead} />}
        />
        <Route path="/leads/new" element={<LeadForm onSubmit={addLead} />} />
        <Route path="/leads/:id" element={<LeadDetail leads={leads} />} />
        <Route
          path="/leads/:id/edit"
          element={<LeadEditForm leads={leads} onSubmit={updateLead} />}
        />
      </Routes>
    </div>
  );
}

export default App;

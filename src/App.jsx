import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LeadList from "./components/LeadList";
import LeadDetail from "./components/LeadDetail";
import LeadForm from "./components/LeadForm";

{
  /* HomePage component */
}
function HomePage() {
  return (
    <div className="container">
      <div className="card" style={{ textAlign: "center" }}>
        <h1
          style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}
        >
          Mini Lead Management Dashboard
        </h1>
        <a href="/leads" className="btn btn-primary">
          Go to Leads →
        </a>
        <p style={{ marginTop: "1rem", color: "#6b7280" }}>
          Manage and track your leads in one place.
        </p>
      </div>
    </div>
  );
}

function App() {
  const [leads, setLeads] = useState([]);
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
  return (
    <BrowserRouter>
      <div className="app-root">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/leads" element={<LeadList leads={leads} />} />
          <Route path="/leads/new" element={<LeadForm onSubmit={addLead} />} />
          <Route path="/leads/:id" element={<LeadDetail leads={leads} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

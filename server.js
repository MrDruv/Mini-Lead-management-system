// server.js
import express from "express";
import cors from "cors";

const app = express();
const PORT = 4000;

// middleware
app.use(cors());
app.use(express.json());

// in-memory leads store
let leads = [];

// list all leads
app.get("/api/leads", (req, res) => {
  res.json(leads);
});

// get one lead
app.get("/api/leads/:id", (req, res) => {
  const lead = leads.find((l) => String(l.id) === String(req.params.id));
  if (!lead) return res.status(404).json({ message: "Lead not found" });
  res.json(lead);
});

// create lead
app.post("/api/leads", (req, res) => {
  const { name, phone, status, notes } = req.body;
  const newLead = {
    id: crypto.randomUUID(),
    name,
    phone,
    status,
    notes,
    createdAt: new Date().toISOString(),
  };
  leads.push(newLead);
  res.status(201).json(newLead);
});

// delete lead
app.delete("/api/leads/:id", (req, res) => {
  const { id } = req.params;
  const before = leads.length;
  leads = leads.filter((l) => String(l.id) !== String(id));
  if (leads.length === before) {
    return res.status(404).json({ message: "Lead not found" });
  }
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});

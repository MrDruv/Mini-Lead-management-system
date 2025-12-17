// src/components/LeadList.jsx
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useMemo, useState } from "react";
import ConfirmDialog from "./ConfirmDialog";

export default function LeadList({ leads, onDelete }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL"); // NEW
  const [deleteId, setDeleteId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const filteredLeads = useMemo(() => {
    const q = search.toLowerCase();

    return leads.filter((lead) => {
      const matchesSearch =
        !q ||
        (lead.name && lead.name.toLowerCase().includes(q)) ||
        (lead.phone && lead.phone.toLowerCase().includes(q)) ||
        (lead.notes && lead.notes.toLowerCase().includes(q));

      const matchesStatus =
        statusFilter === "ALL" ||
        (lead.status &&
          lead.status.toLowerCase() === statusFilter.toLowerCase());

      return matchesSearch && matchesStatus;
    });
  }, [leads, search, statusFilter]); // include statusFilter

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
    }
    setDeleteId(null);
    setConfirmOpen(false);
  };

  const handleCancelDelete = () => {
    setDeleteId(null);
    setConfirmOpen(false);
  };

  return (
    <div className="container">
      <div className="card" style={{ marginBottom: "1rem" }}>
        <button className="btn" onClick={() => navigate("/")}>
          ← Home
        </button>
      </div>

      <h1 className="page-header">Leads</h1>
      <p className="page-subtitle">Track and manage your incoming leads.</p>

      <div className="leads-card">
        {/* header row: label + filters on right */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
            alignItems: "center",
            marginBottom: "0.75rem",
          }}
        >
          <span
            style={{
              fontWeight: 600,
              color: "#111827",
            }}
          >
            Lead list
          </span>

          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            {/* status dropdown */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                padding: "0.35rem 0.5rem",
                fontSize: "0.85rem",
              }}
            >
              <option value="ALL">All</option>
              <option value="NEW">NEW</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="CLOSED">CLOSED</option>
            </select>

            {/* text search */}
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              style={{
                padding: "0.4rem 0.6rem",
                minWidth: "200px",
              }}
            />
          </div>
        </div>

        {filteredLeads.length === 0 ? (
          <p>No leads found.</p>
        ) : (
          <div className="leads-table-wrapper">
            <table className="leads-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead.id}>
                    <td>{lead.name}</td>
                    <td>{lead.phone}</td>
                    <td>{lead.status}</td>
                    <td>{lead.createdAt}</td>
                    <td>
                      <div className="actions">
                        <Link
                          to={`/leads/${lead.id}`}
                          className="btn-link"
                          title="View"
                        >
                          <FaEye size={12} />
                        </Link>
                        <Link
                          to={`/leads/${lead.id}/edit`}
                          className="btn-link"
                          title="Edit"
                        >
                          <FaEdit size={12} />
                        </Link>
                        <button
                          type="button"
                          className="btn-link btn-link-danger"
                          title="Delete"
                          onClick={() => handleDeleteClick(lead.id)}
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Link to="/leads/new" className="add-new-link">
          <span>＋</span>
          <span>Add New Lead</span>
        </Link>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete lead?"
        message="This will permanently remove the lead from your dashboard."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}

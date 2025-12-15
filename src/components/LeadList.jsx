import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function LeadList({ leads }) {
  const navigate = useNavigate();
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
        {leads.length === 0 ? (
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
                {leads.map((lead) => (
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
                          title="view"
                        >
                          <FaEye size={12} />
                        </Link>
                        <Link
                          to={`/leads/${lead.id}/edit`}
                          className="btn-link"
                          title="edit"
                        >
                          <FaEdit size={12} />
                        </Link>
                        <Link
                          to={`/leads/${lead.id}/delete`}
                          className="btn-link btn-link-danger"
                          title="Delete"
                        >
                          <FaTrash size={12} />
                        </Link>
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
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function LeadEditForm({ leads, onSubmit }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const existing = leads.find((item) => String(item.id) === String(id));

  const [name, setName] = useState("");
  const [areaCode, setAreaCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("NEW");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (existing) {
      setName(existing.name || "");
      const match = (existing.phone || "").match(/^(\+\d{1,3})(\d{10})$/);
      if (match) {
        setAreaCode(match[1]);
        setPhone(match[2]);
      } else {
        setPhone(existing.phone || "");
      }
      setStatus(existing.status || "NEW");
      setNotes(existing.notes || "");
    }
  }, [existing]);

  if (!existing) {
    return (
      <div className="container">
        <div className="card">
          <p>Lead not found.</p>
          <button className="btn" onClick={() => navigate("/leads")}>
            Back to Leads
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!phone.trim()) newErrors.phone = "Phone is required";
    if (phone && !/^\d{10}$/.test(phone)) {
      newErrors.phone = "Enter valid phone number";
    }
    if (!status) newErrors.status = "Status is required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(existing.id, {
      name: name.trim(),
      phone: `${areaCode}${phone.trim()}`,
      status,
      notes: notes.trim(),
    });

    navigate("/leads");
  };

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
          Edit Lead
        </h1>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
          {/* Name */}
          <div>
            <label>
              Name
              <br />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  marginTop: "0.25rem",
                }}
              />
            </label>
            {errors.name && (
              <div
                style={{
                  color: "#dc2626",
                  fontSize: "0.8rem",
                  marginTop: "0.25rem",
                }}
              >
                {errors.name}
              </div>
            )}
          </div>

          {/* Phone */}
          <div>
            <label>
              Phone
              <br />
              <div
                style={{ display: "flex", gap: "0.5rem", marginTop: "0.25rem" }}
              >
                <select
                  value={areaCode}
                  onChange={(e) => setAreaCode(e.target.value)}
                  style={{
                    padding: "0.5rem",
                    width: "80px",
                  }}
                >
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+61">+61</option>
                </select>

                <input
                  type="text"
                  value={phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    setPhone(val.slice(0, 10));
                  }}
                  placeholder="Mobile number"
                  style={{
                    flex: 1,
                    padding: "0.5rem",
                  }}
                />
              </div>
            </label>
            {errors.phone && (
              <div
                style={{
                  color: "#dc2626",
                  fontSize: "0.8rem",
                  marginTop: "0.25rem",
                }}
              >
                {errors.phone}
              </div>
            )}
          </div>

          {/* Status */}
          <div>
            <label>
              Status
              <br />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  marginTop: "0.25rem",
                }}
              >
                <option value="">Select</option>
                <option value="NEW">NEW</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="CLOSED">CLOSED</option>
              </select>
            </label>
            {errors.status && (
              <div
                style={{
                  color: "#dc2626",
                  fontSize: "0.8rem",
                  marginTop: "0.25rem",
                }}
              >
                {errors.status}
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <label>
              Notes (optional)
              <br />
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  marginTop: "0.25rem",
                }}
              />
            </label>
          </div>

          <div>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

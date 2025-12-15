// netlify/functions/leads.js

let leads = []; // in-memory "storage"

exports.handler = async (event, context) => {
  const { httpMethod, path } = event;

  // path looks like "/.netlify/functions/leads" or "/.netlify/functions/leads/123"
  const idMatch = path.match(/\/leads\/([^/]+)$/);
  const id = idMatch ? idMatch[1] : null;

  try {
    // GET /leads  -> list
    if (httpMethod === "GET" && !id) {
      return json(200, leads);
    }

    // GET /leads/:id -> one
    if (httpMethod === "GET" && id) {
      const lead = leads.find((l) => String(l.id) === String(id));
      if (!lead) return json(404, { message: "Lead not found" });
      return json(200, lead);
    }

    // POST /leads -> create
    if (httpMethod === "POST") {
      const body = JSON.parse(event.body || "{}");
      const { name, phone, status, notes } = body;

      const newLead = {
        id: crypto.randomUUID(),
        name,
        phone,
        status,
        notes,
        createdAt: new Date().toLocaleString(),
      };

      leads.push(newLead);
      return json(201, newLead);
    }

    // PUT /leads/:id -> update
    if (httpMethod === "PUT" && id) {
      const body = JSON.parse(event.body || "{}");
      const { name, phone, status, notes } = body;

      const index = leads.findIndex((l) => String(l.id) === String(id));
      if (index === -1) return json(404, { message: "Lead not found" });

      const updated = {
        ...leads[index],
        name,
        phone,
        status,
        notes,
      };

      leads[index] = updated;
      return json(200, updated);
    }

    // DELETE /leads/:id -> delete
    if (httpMethod === "DELETE" && id) {
      const before = leads.length;
      leads = leads.filter((l) => String(l.id) !== String(id));
      if (leads.length === before) {
        return json(404, { message: "Lead not found" });
      }
      return {
        statusCode: 204,
        body: "",
        headers: cors(),
      };
    }

    return json(405, { message: "Method Not Allowed" });
  } catch (err) {
    console.error(err);
    return json(500, { message: "Server error" });
  }
};

function cors() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function json(statusCode, data) {
  return {
    statusCode,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      ...cors(),
    },
  };
}

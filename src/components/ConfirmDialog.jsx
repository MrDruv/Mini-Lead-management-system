// src/components/ConfirmDialog.jsx
export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(15,23,42,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: "10px",
          padding: "1.5rem",
          width: "100%",
          maxWidth: "360px",
          boxShadow: "0 20px 40px rgba(15,23,42,0.35)",
        }}
      >
        <h2
          style={{
            fontSize: "1.1rem",
            fontWeight: "600",
            marginBottom: "0.5rem",
            color: "#111827",
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontSize: "0.9rem",
            color: "#4b5563",
            marginBottom: "1rem",
          }}
        >
          {message}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "0.5rem",
          }}
        >
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: "0.4rem 0.8rem",
              fontSize: "0.85rem",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
              background: "#ffffff",
              color: "#374151",
              cursor: "pointer",
            }}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            style={{
              padding: "0.4rem 0.8rem",
              fontSize: "0.85rem",
              borderRadius: "6px",
              border: "none",
              background: "#dc2626",
              color: "#ffffff",
              cursor: "pointer",
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

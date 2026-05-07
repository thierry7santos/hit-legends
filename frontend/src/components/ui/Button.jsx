export default function Button({ children, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        background: "hsl(var(--primary))",
        color: "hsl(var(--primary-foreground))",
        border: "none",
        padding: "10px 16px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold"
      }}
    >
      {children}
    </button>
  );
}
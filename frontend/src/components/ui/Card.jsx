export default function Card({ children, style }) {
  return (
    <div
      style={{
        ...cardStyle,
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow =
          "0 8px 30px rgba(255, 200, 0, 0.15)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow =
          "0 4px 20px rgba(0,0,0,0.4)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {children}
    </div>
  );
}

const cardStyle = {
  background: "hsl(var(--card))",
  borderRadius: "12px",
  padding: "16px",
  border: "1px solid hsl(var(--border))",
  boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
  transition: "all 0.2s ease",
};
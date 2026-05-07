import { Link } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

async function onSubmit() {
  try {
    await handleLogin(email, password);
    navigate("/");
  } catch (err) {
    alert(err.message);
  }
}

  return (
    <div style={container}>
      <Card>
        <h1>Login</h1>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />

        <Button onClick={onSubmit}>Entrar</Button>

        <p style={{ marginTop: "10px" }}>
          Não tem conta? <Link to="/register">Cadastrar-se</Link>
        </p>
      </Card>
    </div>
  );
}

const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid hsl(var(--border))",
  background: "hsl(var(--input))",
  color: "white",
};
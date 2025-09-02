import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Login() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const [Gato] = useState("/cat.png");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, senha })
      });

    if (response.status === 200) {
        const data = await response.json();
        Swal.fire({
            title: "Login realizado com sucesso!",
            text: "Parabéns! :)",
            icon: "success",
            iconColor: "#1976d2",
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true
        });
        navigate("/sucesso");
        } 
        else if (response.status === 400) {
        Swal.fire({
            title: "Credenciais Incorretas!",
            text: "Usuário ou senha incorretos. Por favor, tente novamente.",
            icon: "error",
            showConfirmButton: false,
        });
        } 
        else if (response.status === 401) {
        Swal.fire({
            title: "Credenciais Ausentes!",
            text: "Você precisa informar usuário e senha para continuar.",
            icon: "warning",
            iconColor: "#e08e28",
            showConfirmButton: false,
        });
        }
    } catch (error) {
        Swal.fire({
        title: "Erro de Conexão",
        text: "Ops! Parece que ocorreu um erro de conexão com o nosso servidor. Tente novamente!",
        icon: "error",
        iconColor: "#e08e28",
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
        });
    }
  };

  return (
    <>
        <img src={Gato} alt="Gato" style={{ display: "block", margin: "20px auto", width: "200px" }} />

        <div className="form-container">
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Usuário"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                style={{
                    width: "100%",
                    height: "30px",
                    paddingRight: "60px",
                    boxSizing: "border-box",
                }}
            />

            <div style={{ position: "relative", width: "100%" }}>
                <input
                    type={mostrarSenha ? "text" : "password"}
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    style={{
                        width: "100%",
                        height: "30px",
                        paddingRight: "60px",
                        boxSizing: "border-box",
                    }}
                />
                <button
                    type="button"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    style={{
                        position: "absolute",
                        right: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "30px",
                        height: "30px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                    }}
                >
                    {mostrarSenha ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </button>
            </div>

            <button
                style={{
                    backgroundColor: usuario.trim() === "" || senha.trim() === "" ? "#90caf9" : "#1976d2",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "10px 20px",
                    cursor: usuario.trim() === "" || senha.trim() === "" ? "not-allowed" : "pointer",
                    opacity: usuario.trim() === "" || senha.trim() === "" ? 0.6 : 0.9,
                }}
                
                onClick={handleLogin}
            >
                Entrar
            </button>
        </div>

        <footer
            style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                background: "#1976d2",
                color: "#fff",
                textAlign: "center",
                fontSize: "0.95rem",
                boxShadow: "0 -1px 6px rgba(0,0,0,0.07)",
                zIndex: 100,
            }}
        >
            <p>
                Projeto desenvolvido por Arthur Gabriel Peruchi Trindade (RA: 2410487) e Guilherme Quaglio e Silva (RA: 2410513).
            </p>
        </footer>
    </>

  );
}

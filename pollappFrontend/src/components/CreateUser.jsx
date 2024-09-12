import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";


export default function CreateUser() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(username === "" || email === "") {
            alert("Please provide a username and a email");
            return;
        }
        
        try {
            const response = await fetch("http://localhost:8080/users", { 
                method: "POST", 
                body: JSON.stringify({username: username, email: email}),
                headers: {
                        "Content-Type": "application/json",
                    }},)
    
            if (response.status === 409) {
                
                alert(`Try again, with another username or email`);
                return; 
            }
    
            if (!response.ok) {
                alert("There is an internal error, try again later.");
                throw new Error('Failed to create user');
            }
            
            navigate("/votepoll", {state: {username: username}});
        } catch(err) {
            console.error("Error creating a new user", err);
        }
    }

    console.log("Username change", username);
    console.log("Email change", email);

    return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "#f7f7f7",
            }}>
                <div style={{
                    backgroundColor: "#fff",
                    padding: "30px",
                    borderRadius: "15px",
                    width: "400px",
                    textAlign: "center"
                }}>
                    <h2 style={{
                        marginBottom: "20px",
                        color: "#333",
                        fontWeight: "bold"
                    }}>Create User</h2>
                    <form method="post" onSubmit={handleSubmit}>
                        <div style={{ marginBottom: "20px" }}>
                            <TextField 
                                id="outlined-basic" 
                                label="Username" 
                                variant="outlined" 
                                fullWidth 
                                value={username} 
                                onChange={e => setUsername(e.target.value)} 
                            />
                        </div>
                        <div style={{ marginBottom: "20px" }}>
                            <TextField 
                                id="outlined-basic" 
                                label="Email" 
                                variant="outlined" 
                                fullWidth 
                                value={email} 
                                onChange={e => setEmail(e.target.value)} 
                            />
                        </div>
                        <Button 
                            variant="contained" 
                            type="submit" 
                            style={{
                                backgroundColor: "#007bff",
                                color: "#fff",
                                padding: "10px 20px",
                                borderRadius: "25px",
                                fontWeight: "bold",
                                textTransform: "none",
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                                transition: "transform 0.2s, box-shadow 0.2s"
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = "scale(1.05)";
                                e.target.style.boxShadow = "0 6px 15px rgba(0, 0, 0, 0.3)";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = "scale(1)";
                                e.target.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
                            }}
                        >
                            Create User
                        </Button>
                    </form>
                </div>
            </div>
        );
}
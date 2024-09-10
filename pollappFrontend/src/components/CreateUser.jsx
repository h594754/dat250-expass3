import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            const response = await fetch("http://localhost:8080/users", { 
                method: "POST", 
                body: JSON.stringify({username: username, email: email}),
                headers: {
                        "Content-Type": "application/json",
                    }},)
    
            console.log(response);
            navigate("/menu", {state: {username: username}});
        } catch(err) {
            console.error("Error creating a new user", err);
        }
    }

    console.log("Username change", username);
    console.log("Email change", email);

    return (
        <div>
            <h2>Create user</h2>
            <form method="post" onSubmit={handleSubmit}>
                    <label>Username</label>
                <div>
                    <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                    <label>Email</label>
                <div>
                    <input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <button type="submit">Create user</button>
            </form>
        </div>
    )
}
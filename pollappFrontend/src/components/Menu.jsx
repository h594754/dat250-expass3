import { useNavigate, useLocation } from "react-router-dom";



export default function Menu() {
    const location = useLocation();
    const navigate = useNavigate();
    const username = location.state.username;

    console.log(username);


    return (
        <div>
            <h2>Welcome {username} </h2>
            <ul style={{listStyle: "none"}}>
                <li>
                    <a style={{ color: "blue", textDecoration: "underline" }} onClick={() => navigate("/createpoll", {state: {username: username}})}>Create a poll</a>
                </li>
                <li>
                    <a href="/votepoll">Vote on a poll</a>
                </li>
            </ul>
        </div>
    )
}
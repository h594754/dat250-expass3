import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";


export default function VotePoll() {
    const [allPolls, setAllPolls] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const username = location.state?.username;
    
    useEffect(() => {
        const getAllPolls = async () => {
            const response = await fetch("http://localhost:8080/listPolls", { 
                method: "GET", 
                headers: {
                        "Content-Type": "application/json",
                    }},)
    
            
                    console.log(response);
                    const data = await response.json();
                    console.log(data);
                    setAllPolls(data);
        }

        getAllPolls();
    }, []);

    const voteOnPoll = async (questionId, voteOptionId) => {
        try {
            const response = await fetch(`http://localhost:8080/votePoll/${encodeURIComponent(questionId)}/vote?username=${encodeURIComponent(username)}&voteOptionId=${encodeURIComponent(voteOptionId)}`, { 
                method: "POST", 
                headers: {
                        "Content-Type": "application/json",
                    }},)
    
            console.log(response);
            
            
        } catch (err) {
            console.error("Error voting on a poll: ", err);
        }

    }
    

    return (
    <div>
        <h2>All polls</h2>
        <p>You are logged in as {username}</p>
        <Button variant="contained" onClick={() => navigate("/createpoll", {state: {username: username}})}>Create your own poll</Button>
        {allPolls ? allPolls.map(poll => (
            <ul key={poll.id} style={{listStyle: "none"}}>
                <Box sx={{
                     p: 2,
                     border: "1px solid #ccc",
                     borderRadius: "15px",
                     width: "750px",
                     margin: "0 auto", // Centers the box horizontally
                     textAlign: "center", // Optional, centers text inside the box
                     marginBottom: "16px",
                     marginTop: "20px",
                }}>
                
                <Typography variant="h5" style={{marginTop: "20px"}}>Question:</Typography>
                <Typography variant="h6">{poll.question}</Typography>
                <li>Valid until: {poll.validUntil ? poll.validUntil.slice(0, -1) : ''}</li>
                <Typography variant="h6" sx={{marginTop: "10px"}}>Vote options</Typography>
                <li>{poll.voteOptions ? poll.voteOptions.map(option => (
                    <ul key = {option.id} style={{listStyle: "none"}}>
                        
                        <div>
                             {option.caption &&  <li style={{ marginTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "25px"}}>
                                
                                {option.caption} 
                            
                            <button style={{
                                marginLeft: "16px",
                                padding: "10px 20px",
                                backgroundColor: "blue",
                                color: "#fff",
                                border: "none",
                                borderRadius: "25px",
                                cursor: "pointer",
                                fontWeight: "bold",
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                                transition: "transform 0.2s, box-shadow 0.2s",
                            }} onClick={() => voteOnPoll(poll.id, option.optionId)}>Vote for this</button></li>
                            
                            }
                            
                        </div>
                    </ul>
                )) : '' }</li>
                
                <li style={{marginTop: "20px"}}>Poll created by: {poll.creator}</li>
                <li>No. of votes: {poll.votes ? poll.votes.length : 'No votes yet'}</li>
                </Box>
            </ul>
        )) : 
        "There are no polls to get"}


    </div>
    )

}
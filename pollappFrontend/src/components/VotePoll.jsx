import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";


export default function VotePoll() {
    const [allPolls, setAllPolls] = useState(null);
    const location = useLocation();
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
            console.error("Error creating a poll: ", err);
        }
    }
    

    return (
    <div>
        <h2>All polls</h2>
        <p>You are logged in as {username}</p>
        {allPolls ? allPolls.map(poll => (
            <ul key={poll.id} style={{listStyle: "none"}}>
                <label>Question:</label>
                <li>{poll.question}</li>
                <label>Valid until: </label>
                <li>{poll.validUntil ? poll.validUntil.slice(0, -1) : ''}</li>
                <label>Vote options</label>
                <li>{poll.voteOptions ? poll.voteOptions.map(option => (
                    <ul key = {option.id} style={{listStyle: "none"}}>
                        
                        <div>
                             {option.caption && <li>{option.caption} 
                            <button onClick={() => voteOnPoll(poll.id, option.optionId)}>Vote for this</button></li>}
                        </div>
                    </ul>
                )) : '' }</li>
                <label> Poll created by:</label>
                <li>{poll.creator}</li>
                <li>No. of votes: {poll.votes ? poll.votes.length : 'No votes yet'}</li>
            </ul>
        )) : 
        "There are no polls to get"}
    </div>
    )

}
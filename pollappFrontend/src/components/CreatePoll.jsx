import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import DatePicker from "react-datepicker";


export default function CreatePoll() {
    const location = useLocation();
    const navigate = useNavigate();
    const username = location.state?.username;
    const [question, setQuestion] = useState("");
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState(null); 
    const [option3, setOption3] = useState(null);
    const [option4, setOption4] = useState(null);
    const [presentationOrder1, setPresentationOrder1] = useState(1);
    const [presentationOrder2, setPresentationOrder2] = useState(2);
    const [presentationOrder3, setPresentationOrder3] = useState(3);
    const [presentationOrder4, setPresentationOrder4] = useState(4);

    const [date, setDate] = useState(null);

    console.log("Create poll user:", username);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(question === "") {
            alert("You must write a question");
            return;
        }

        if(option1 === "") {
            alert("You must have atleast one option on your poll");
            return;
        }

        if (option2 !== "" && option1 === "") {
            alert("You cannot have option 2 without filling option 1");
            return;
        }
    
        if (option4 !== "" && option3 === "") {
            alert("You cannot select option 4 without filling option 3");
            return;
        }

        const voteOptions = [];

        

        if (option1 !== "") voteOptions.push({ caption: option1, presentationOrder: presentationOrder1 });
        if (option2 !== "") voteOptions.push({ caption: option2, presentationOrder: presentationOrder2 });
        if (option3 !== "") voteOptions.push({ caption: option3, presentationOrder: presentationOrder3 });
        if (option4 !== "") voteOptions.push({ caption: option4, presentationOrder: presentationOrder4 });

        const presentationOrders = voteOptions.map(option => option.presentationOrder);
        const hasDuplicates = new Set(presentationOrders).size !== presentationOrders.length;

        if (hasDuplicates) {
            alert("Presentation order must be unique for each option");
            return;
        }

        if(date === null) {
            alert("You must select a validUntil date before continuing.");
            return;
        }


        try {
            const response = await fetch(`http://localhost:8080/createPoll?username=${encodeURIComponent(username)}`, { 
                method: "POST", 
                body: JSON.stringify({
                    question: question, 
                    validUntil: date.toISOString(),
                    voteOptions: voteOptions
                }),
                headers: {
                        "Content-Type": "application/json",
                    }},)
    
            console.log(response);
            navigate("/votepoll", {state: {username: username}});
        } catch (err) {
            console.error("Error creating a poll: ", err);
        }

    }
    
    return (
        <div>
            <h2> Your username is {username}</h2>
            <label>Write your question</label>
            <div>
                <input type="text" name="question" onChange={e => setQuestion(e.target.value)} />
            </div>

            <label>When should it be valid until?</label>
            <div>
                <DatePicker
                    selected={date}
                    onChange={(date) => setDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm:ss"
                    timeIntervals={15}  
                    dateFormat="yyyy-MM-dd HH:mm:ss"
                    timeCaption="Time"  
                />
            </div>

        <div>

        <form method="post" onSubmit={handleSubmit}>
        <label>Add options</label>
                <ul style={{listStyle: "none"}}>
                    <li>
                        <label>Option 1</label>
                        <div>
                            <input type="text" name="option1" onChange={e => setOption1(e.target.value)} />
                            <input type="number" name="presentationOrder1" value={presentationOrder1} onChange={e => setPresentationOrder1(Number(e.target.value))} min="1" max="4" />
                        </div>
                    </li>
                    <li>
                        <label>Option 2</label>
                        <div>
                            <input type="text" name="option2" onChange={e => setOption2(e.target.value)} />
                            <input type="number" name="presentationOrder2" value={presentationOrder2} onChange={e => setPresentationOrder2(Number(e.target.value))} min="1" max="4" />
                        </div>
                    </li>
                    <li>
                        <label>Option 3</label>
                        <div>
                            <input type="text" name="option3" onChange={e => setOption3(e.target.value)} />
                            <input type="number" name="presentationOrder3" value={presentationOrder3} onChange={e => setPresentationOrder3(Number(e.target.value))} min="1" max="4" />
                        </div>
                    </li>
                    <li>
                        <label>Option 4</label>
                        <div>
                            <input type="text" name="option4" onChange={e => setOption4(e.target.value)} />
                            <input type="number" name="presentationOrder4" value={presentationOrder4} onChange={e => setPresentationOrder4(Number(e.target.value))} min="1" max="4" />
                        </div>
                    </li>
                </ul>
                <button type="submit">Create poll</button>
                </form>
            </div>
        </div>
    )
}
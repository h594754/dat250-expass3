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
        <div style={{ width: "500px", margin: "0 auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
          <h2 style={{ textAlign: "center" }}>Create a New Poll</h2>
          <p style={{ textAlign: "center", marginBottom: "20px" }}>Your username: <strong>{username}</strong></p>
    
          <label style={{ fontWeight: "bold" }}>Write your question:</label>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              name="question"
              onChange={(e) => setQuestion(e.target.value)}
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>
    
          <label style={{ fontWeight: "bold" }}>When should it be valid until?</label>
          <div style={{ marginBottom: "20px" }}>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              showTimeSelect
              timeFormat="HH:mm:ss"
              timeIntervals={15}
              dateFormat="yyyy-MM-dd HH:mm:ss"
              timeCaption="Time"
              style={{ width: "100%" }}
            />
          </div>
    
          <form method="post" onSubmit={handleSubmit}>
            <label style={{ fontWeight: "bold", marginBottom: "10px", display: "block" }}>Add options:</label>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {[1, 2, 3, 4].map((optionIndex) => (
                <li key={optionIndex} style={{ marginBottom: "15px" }}>
                  <label>Option {optionIndex}</label>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px" }}>
                    <input
                      type="text"
                      name={`option${optionIndex}`}
                      onChange={(e) =>
                        optionIndex === 1 ? setOption1(e.target.value) :
                        optionIndex === 2 ? setOption2(e.target.value) :
                        optionIndex === 3 ? setOption3(e.target.value) : setOption4(e.target.value)
                      }
                      style={{ width: "75%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                    <input
                      type="number"
                      name={`presentationOrder${optionIndex}`}
                      value={
                        optionIndex === 1 ? presentationOrder1 :
                        optionIndex === 2 ? presentationOrder2 :
                        optionIndex === 3 ? presentationOrder3 : presentationOrder4
                      }
                      onChange={(e) =>
                        optionIndex === 1 ? setPresentationOrder1(Number(e.target.value)) :
                        optionIndex === 2 ? setPresentationOrder2(Number(e.target.value)) :
                        optionIndex === 3 ? setPresentationOrder3(Number(e.target.value)) : setPresentationOrder4(Number(e.target.value))
                      }
                      min="1"
                      max="4"
                      style={{ width: "20%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginTop: "20px",
              }}
            >
              Create poll
            </button>
          </form>
        </div>
      );
}
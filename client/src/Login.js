import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login(){
    const [name, setName] = useState("")

    const navigate = useNavigate();

    const makeLogin = (e) => {
        e.preventDefault()
        navigate(`/chat/${name}`)
    }

    return(
        <div>
            <form onSubmit={makeLogin}>
                <input value={name} onChange={e => setName(e.target.value)}></input>
                <button type="submit">ENTER</button>
            </form>
        </div>
    )
}
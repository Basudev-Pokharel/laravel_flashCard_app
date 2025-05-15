import { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [nameColors, setNameColors] = useState([]);
    const [error, setError] = useState(null);
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    //For editing
    const [editName, setEditName] = useState("");
    const [editColor, setEditColor] = useState("");
    const [update, setUpdate] = useState([]);

    useEffect(() => {
        fetchNameColors();
    }, []);

    const fetchNameColors = async () => {
        try {
            const response = await axios.get("/api/name-colors");
            setNameColors(response.data);
        } catch (err) {
            setError("Failed to fetch entries");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("api/name-colors", { name, color });
            setName("");
            setColor("");
            fetchNameColors();
        } catch (err) {
            setError("Failed to add entry");
        }
    };
    //Delete Goes here
    const handleDelete = async (e, id) => {
        e.preventDefault();
        try {
            await axios.delete(`/api/name-colors/${id}`);
            fetchNameColors();
        } catch (err) {
            setError("Failed to add entry");
        }
    };

    //Update Goes here
    const handleUpdate = async (e, item) => {
        e.preventDefault();
        try {
            await axios.patch(`api/name-colors/${id}`);
            setEditName(item.name);
            setEditColor(item.color);
            let data = update;
            data[id] = !data[item.id];
            setUpdate((prev) => [...prev, data]);
            // setUpdate((prev) => !prev);
            fetchNameColors();
        } catch (err) {
            setError("Failed to add entry");
        }
    };

    // edit
    const handleEdit = async (e, id) => {
        e.preventDefault();
        try {
            name = e.target.name;
            color = e.target.value;
            let response = await axios.put(`api/name-colors/${id}`);
            response.name = name;
            response.color = color;
            // let data = update;
            // data[id] = false;
            // setUpdate((prev) => !prev);
            fetchNameColors();
        } catch (err) {
            setError("Failed to add entry");
        }
    };
    return (
        <div style={{ padding: "20px" }}>
            <h1>Name and Color Manager</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    name="name"
                    onChange={(e) => handleEdit(e, item.id)}
                    style={{ marginRight: "10px" }}
                />
                <input
                    type="text"
                    placeholder="Color"
                    value={color}
                    name="color"
                    onChange={(e) => handleEdit(e, item.id)}
                    style={{ marginRight: "10px" }}
                />
                <button type="submit">Add</button>
            </form>
            <ul>
                {nameColors.map((item) => (
                    <li key={item.id}>
                        {update[item.id] ?? item.name}
                        {update[item.id] && (
                            <>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={editName}
                                    onChange={(e) =>
                                        setEditName(e.target.value)
                                    }
                                    style={{ marginRight: "10px" }}
                                />
                                -<span> </span>
                                <span></span>
                                <input
                                    type="text"
                                    placeholder="Color"
                                    value={editColor}
                                    onChange={(e) =>
                                        setEditColor(e.target.value)
                                    }
                                    style={{ marginRight: "10px" }}
                                />
                            </>
                        )}{" "}
                        {update[item.id] ?? " - "}
                        {update[item.id] ?? item.color}{" "}
                        <button
                            style={{
                                color: "red",
                                margin: "3px 10px",
                                padding: "2px",
                            }}
                            onClick={(e) => {
                                handleDelete(e, item.id);
                            }}
                        >
                            Delete
                        </button>{" "}
                        <button
                            style={{
                                color: "blue",
                                margin: "3px 10px",
                                padding: "2px",
                            }}
                            onClick={(e) => {
                                handleUpdate(e, item);
                            }}
                        >
                            Update
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;

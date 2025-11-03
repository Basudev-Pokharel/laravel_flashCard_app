import { useState, useEffect } from "react";
import axios from "axios";
import FlashCard from "./FashCard";

function App() {
    const [nameColorApp, setNameColorApp] = useState(true);
    const [nameColors, setNameColors] = useState([]);
    const [error, setError] = useState(null);
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [editName, setEditName] = useState("");
    const [editColor, setEditColor] = useState("");
    const [update, setUpdate] = useState({});

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
            await axios.post("/api/name-colors", { name, color });
            setName("");
            setColor("");
            fetchNameColors();
        } catch (err) {
            setError("Failed to add entry");
        }
    };

    const handleDelete = async (e, id) => {
        e.preventDefault();
        try {
            await axios.delete(`/api/name-colors/${id}`);
            fetchNameColors();
        } catch (err) {
            setError("Failed to delete entry");
        }
    };

    const handleToggleEdit = (item) => {
        setEditName(item.name);
        setEditColor(item.color);
        setUpdate((prev) => ({ ...prev, [item.id]: !prev[item.id] }));
    };

    const handleEdit = async (e, id) => {
        e.preventDefault();
        try {
            await axios.patch(`/api/name-colors/${id}`, {
                name: editName,
                color: editColor,
            });
            setUpdate((prev) => ({ ...prev, [id]: false }));
            fetchNameColors();
        } catch (err) {
            setError("Failed to update entry");
        }
    };
    //Here goes Vocab App Logic

    return (
        <>
            <button
                onClick={() => {
                    setNameColorApp((prev) => !prev);
                }}
                style={{
                    padding: "10px 18px",
                    margin: "5px",
                    border: "none",
                    borderRadius: "8px",
                    backgroundColor: nameColorApp ? "#27ae60" : "#1e90ff",
                    color: "white",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    transition: "0.3s",
                }}
            >
                Toogle to {nameColorApp ? "FlashCardApp" : "NameColor"}
            </button>
            {nameColorApp && (
                <div style={{ padding: "20px" }}>
                    <h1>Name and Color Manager</h1>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ marginRight: "10px" }}
                        />
                        <input
                            type="text"
                            placeholder="Color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            style={{ marginRight: "10px" }}
                        />
                        <button type="submit">Add</button>
                    </form>
                    <ul>
                        {nameColors.map((item) => (
                            <li key={item.id}>
                                {update[item.id] ? (
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
                                        <input
                                            type="text"
                                            placeholder="Color"
                                            value={editColor}
                                            onChange={(e) =>
                                                setEditColor(e.target.value)
                                            }
                                            style={{ marginRight: "10px" }}
                                        />
                                        <button
                                            onClick={(e) =>
                                                handleEdit(e, item.id)
                                            }
                                        >
                                            Save
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        {item.name} - {item.color}
                                    </>
                                )}
                                <button
                                    style={{
                                        color: "red",
                                        margin: "3px 10px",
                                        padding: "2px",
                                    }}
                                    onClick={(e) => handleDelete(e, item.id)}
                                >
                                    Delete
                                </button>
                                <button
                                    style={{
                                        color: "blue",
                                        margin: "3px 10px",
                                        padding: "2px",
                                    }}
                                    onClick={() => handleToggleEdit(item)}
                                >
                                    {update[item.id] ? "Cancel" : "Edit"}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {!nameColorApp && <FlashCard />}
        </>
    );
}

export default App;

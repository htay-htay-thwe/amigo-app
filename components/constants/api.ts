import axios from "axios";


export  const gemini = axios.create({
        baseURL: "https://generativelanguage.googleapis.com/v1beta",
        headers: {
            "Content-Type": "application/json",
        },
    });
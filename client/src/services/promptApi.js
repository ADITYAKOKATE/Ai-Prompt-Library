import axios from 'axios'

const API_URL = `${import.meta.env.VITE_API_URL}/prompts`;

//Get All Prompt
export const getPrompts = async()=> {
    const response = await axios.get(API_URL);
    return response.data;
}

//Get Single Prompt
export const getSinglePrompt = async(id)=>{
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
}

//Create a prompt
export const createPrompt = async(promptData)=>{
    const response = await axios.post(API_URL,promptData);
    return response.data;
}

//Update a prompt
export const updatePrompt = async(id,promptData)=>{
    const response = await axios.put(`${API_URL}/${id}`,promptData);
    return response.data;
}

//Delete a prompt
export const deletePrompt = async(id)=>{
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
}

// Reorder prompts
export const reorderPrompts = async (prompts) => {
    const response = await fetch(`${API_URL}/reorder`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            prompts: prompts.map((prompt) => ({
                id: prompt._id,
                order: prompt.order,
            })),
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to reorder prompts");
    }

    return response.json();
};

// Bulk create prompts
export const bulkCreatePrompts = async (prompts) => {
    const response = await fetch(`${API_URL}/bulk`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompts }),
    });

    if (!response.ok) {
        throw new Error("Failed to bulk create prompts");
    }

    return response.json();
};
import { createContext, useContext, useState, useEffect } from 'react'

import { getPrompts, createPrompt, updatePrompt, deletePrompt, reorderPrompts, bulkCreatePrompts } from '../services/promptApi.js'

const PromptContext = createContext();

export const PromptProvider = ({ children }) => {
    const [prompts, setPrompts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPrompts = async () => {
        try {
            setLoading(true);
            setError(null)
            const response = await getPrompts();
            const normalizedPrompts = response.data.map(
                (prompt, index) => ({
                    ...prompt,
                    order: typeof prompt.order === "number" ? prompt.order : index,
                })
            );
            setPrompts(normalizedPrompts);

        } catch (error) {
            console.error(error)
            setError("Prompts Not Found");
        } finally {
            setLoading(false);
        }
    }

    const addPrompt = async (promptData) => {
        try {
            setError(null);
            setLoading(true);
            const maxOrder = prompts.length
                ? Math.max(...prompts.map((p) => p.order ?? 0))
                : -1;
            const newPromptData = {
                ...promptData,
                order: maxOrder + 1,
            };
            const response = await createPrompt(newPromptData);
            setPrompts((currentPrompts) => [
                response.data,
                ...currentPrompts
            ])
        } catch (error) {
            console.error(error);
            setError("Failed to create Prompt");
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const updatePromptFunction = async (id, promptData) => {
        try {
            setError(null);
            setLoading(true);
            const response = await updatePrompt(id, promptData);
            setPrompts((currentPrompts) => 
                currentPrompts.map((prompt) => (
                    prompt._id === id ? response.data : prompt
                ))
            )
        } catch (error) {
            console.error(error);
            setError("Error Updating Prompt");
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const deletePrompts = async (id) => {
        try {
            setLoading(true);
            setError(null);
            await deletePrompt(id);
            setPrompts((currentPrompts) => (
                currentPrompts.filter((prompt) => prompt._id !== id)
            ))
        } catch (error) {
            console.error(error);
            setError("Failed to delete prompt.");
            throw error;
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchPrompts();
    }, [])

    const toggleFavorite = async(id)=>{
        const prompt = await prompts.find((item)=>item._id===id);
        if(!prompt)return;
        await updatePromptFunction(id,{
            isFavorite:!prompt.isFavorite,
        })
    }
    const togglePin = async(id)=>{
        const prompt = await prompts.find((item)=>item._id===id);
        if(!prompt) return;
        await updatePromptFunction(id,{
            isPinned: !prompt.isPinned,
        })
    }

    const updatePromptOrder = async (reorderedPrompts) => {
        const previousPrompts = [...prompts];
        setPrompts(reorderedPrompts);
        try {
            await reorderPrompts(reorderedPrompts);
        } catch (error) {
            console.error("Failed to save prompt order", error);
            setPrompts(previousPrompts);
        }
    };

    const importPrompts = async (promptsData) => {
        try {
            setError(null);
            setLoading(true);
            const maxOrder = prompts.length
                ? Math.max(...prompts.map((p) => p.order ?? 0))
                : -1;
            
            const newPrompts = promptsData.map((p, index) => ({
                title: p.title,
                prompt: p.prompt,
                category: p.category,
                tags: p.tags,
                description: p.description,
                isFavorite: p.isFavorite,
                isPinned: p.isPinned,
                order: maxOrder + 1 + index,
            }));

            await bulkCreatePrompts(newPrompts);
            await fetchPrompts(); // Refresh the list
        } catch (error) {
            console.error("Failed to import prompts", error);
            setError("Failed to import prompts");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return (
        <PromptContext.Provider value={{ prompts, error, loading, fetchPrompts, addPrompt,updatePromptFunction,deletePrompts,toggleFavorite, togglePin, updatePromptOrder, importPrompts }}>
            {children}
        </PromptContext.Provider>
    )
}

export const usePromptContext = () => {
    return useContext(PromptContext);
}
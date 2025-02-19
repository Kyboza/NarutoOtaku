import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosAPI from "../lib/axios";

// Define the character type
interface ICharacter {
    _id: string;
    name: string;
    description: string;
    image: string;
    gender: string;
    age: number;
    likes: number;
    weight: number;
    style: string;
    content: string;
}

const initialState: {
    characters: ICharacter[];
    loading: boolean;
    error: string | null;
} = {
    characters: [],
    loading: false,
    error: null,
};

// Async thunk to fetch all characters from the database
export const fetchCharacters = createAsyncThunk("characters/fetchCharacters", async () => {
    const response = await axiosAPI.get("/api/characters");
    return response.data;
});

// Create the slice to manage character data
const characterSlice = createSlice({
    name: "character",
    initialState,
    reducers: {
        // Action to increment the like for a specific character
        incrementLike: (state, action: PayloadAction<string>) => {
            const characterId = action.payload;
            const character = state.characters.find((char) => char._id === characterId);
            if (character) {
                character.likes += 1;
            }
        },

        // Action to decrement the like for a specific character
        decrementLike: (state, action: PayloadAction<string>) => {
            const characterId = action.payload;
            const character = state.characters.find((char) => char._id === characterId);
            if (character) {
                character.likes -= 1;
            }
        },

        // Optional: Action to set or update all characters
        setCharacters: (state, action: PayloadAction<ICharacter[]>) => {
            state.characters = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchCharacters.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCharacters.fulfilled, (state, action) => {
                state.loading = false;
                state.characters = action.payload; // Load the characters fetched from the API
            })
            .addCase(fetchCharacters.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch characters";
            });
    },
});

// Export actions for use in components
export const { incrementLike, decrementLike, setCharacters } = characterSlice.actions;

// Export the reducer to be used in the store
export default characterSlice.reducer;

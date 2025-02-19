import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LikesState {
  likedCharacters: string[]; // Håller reda på id:n för gillade karaktärer
  toggleStatus: 'increment' | 'decrement' | ''; // Håller reda på om vi ska öka eller minska likes
}

const initialState: LikesState = {
  likedCharacters: [],
  toggleStatus: '',
};

const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<string>) => {
      const characterId = action.payload;
      
      // Om karaktären redan finns i likedCharacters, ta bort den och sätt toggleStatus till "decrement"
      if (state.likedCharacters.includes(characterId)) {
        state.likedCharacters = state.likedCharacters.filter(id => id !== characterId);
        state.toggleStatus = 'decrement';
      } else {
        // Annars, lägg till karaktären i likedCharacters och sätt toggleStatus till "increment"
        state.likedCharacters.push(characterId);
        state.toggleStatus = 'increment';
      }
    },
    
    // Lägg till andra actions om du behöver
  }
});

export const { toggleLike } = likesSlice.actions;

export default likesSlice.reducer;

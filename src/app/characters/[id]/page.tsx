"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation'; // Use useParams from next/navigation
import Image from 'next/image';
import { toggleLike } from '../../store/likesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store/store';
import axiosAPI from '@/app/lib/axios';

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

export default function CharacterAbout() {
  const [character, setCharacter] = useState<ICharacter | null>(null);
  const { likedCharacters, toggleStatus } = useSelector((state: RootState) => state.likes);
  const dispatch = useDispatch();
  const params = useParams();
  const id = params?.id;
  console.log(id);

  const fetchCharacter = useCallback(async () => {
    if (!id || typeof id !== "string") return; 

    try {
      const response = await axiosAPI.get(`/api/characters/${id}`);
      if (response.status === 200) {
        const data = await response.data
        console.log("Fetched character data:", data);
        setCharacter(data);
      } else {
        console.error("Error fetching character:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error fetching character:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchCharacter();
  }, [fetchCharacter]);


  const handleLikeClick = async (id: string) => {
    if (typeof id !== 'string') return console.error("Invalid id format");

    dispatch(toggleLike(id));

    const action = toggleStatus === 'increment' ? 'increment' : 'decrement';
    const result = await updateLikes(id, action);

    if (result) {
      await fetchCharacter();
    } else {
      console.error("Could not update likes");
    }
  };

  const updateLikes = async (id: string, action: 'increment' | 'decrement') => {
    try {
      const response = await axiosAPI.put(`/api/characters/${id}/likes`, { action });
      if (response.status === 200) {
        console.log('Likes updated successfully:', response.data);
        return true;
      } else {
        console.error('Failed to update likes:', response.data);
        return false;
      }
    } catch (error) {
      console.error('Error updating likes:', error);
      return false;
    }
  };

  if (!character) {
    return <p>No character data found.</p>;
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className="mb-4 mt-4 text-xl sm:text-2xl md:text-4xl lg:text-5xl font-rock text-white text-stroke-title text-shadow-xl">
        Character Info
      </h1>
      <section className='flex flex-col h-auto w-full max-w-[90vw] lg:max-w-[900px] bg-[#A5A5A5] bg-opacity-[75%] border border-black rounded-md mb-4'>
        <div className='flex flex-row h-auto w-full border-b border-black'>
          {/* Character Image */}
          <div className='flex items-center justify-center w-[40%] mb-2'>
            <div className='w-[90%] h-[95%] border border-black rounded-md'>
              <Image src={character.image} alt={character.name} className='w-full h-full object-cover object-center rounded-md' width={1920} height={1080} />
            </div>
          </div>

          {/* Character Details */}
          <div className='flex flex-col justify-evenly items-start w-[40%] mb-2'>
            <h2 className='font-bold text-xl landscape-sm:text-lg sm:text-2xl md:text-4xl landscape-md:text-3xl lg:text-4xl font-notojp text-white text-shadow-xl self-start'>
              {character.name}
            </h2>
            <p className='font-notojp text-white text-xs sm:text-sm md:text-2xl lg:text-3xl xl:text-xl text-stroke text-shadow-lg'>Gender: {character.gender}</p>
            <p className='font-notojp text-white text-xs sm:text-sm md:text-2xl lg:text-3xl xl:text-xl text-stroke text-shadow-lg'>Age: {character.age}</p>
            <p className='font-notojp text-white text-xs sm:text-sm md:text-2xl lg:text-3xl xl:text-xl text-stroke text-shadow-lg'>Weight: {character.weight}</p>
            <p className='font-notojp text-white text-xs sm:text-sm md:text-2xl lg:text-3xl xl:text-xl text-stroke text-shadow-lg'>Fighting Style: {character.style}</p>
          </div>

          {/* Like Button */}
          <div className='flex items-center justify-center mb-1 mr-1 w-[20%]'>
            <button onClick={() => {if (typeof id === 'string') { handleLikeClick(id) } else { console.error("Invalid id format") }}}
              className='flex flex-row items-center bg-[#737373] h-[33%] sm:h-[50%] md:h-[25%] xl:h-[25%] border border-black rounded-md p-1'>
              <p className='text-shadow-lg mr-0.5 text-sm sm:text-sm md:text-xl lg:text-3xl'>
                {likedCharacters.includes(id as string) ? '🖤' : '❤️'}
              </p>
              <p className='font-notojp text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl text-white text-shadow-lg'>
                {character.likes}
              </p>
            </button>
          </div>
        </div>

        {/* Character Content */}
        <article className='w-full p-4 overflow-hidden'>
          <p className='font-notojp text-white text-xs sm:text-xs md:text-xl lg:text-2xl xl:text-xl leading-6 text-stroke text-shadow-lg'>
            {character.content}
          </p>
        </article>
      </section>
    </div>
  );
}

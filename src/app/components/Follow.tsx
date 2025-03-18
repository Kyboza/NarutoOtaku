// "use client"
// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState, AppDispatch } from '@/app/store/store';
// import { handleFollow, updateFollowAmount } from '../store/followSlice';

// interface FollowProps {
//   visitingUser?: { username: string }; // Den inloggade användaren som besöker profilen
//   currentUser: string; // Den aktuella användaren (i.e. den som besöker profilen)
//   user: { username: string; followers: number }; // Profilen för den visade användaren
// }

// export default function Follow({ visitingUser, currentUser, user }: FollowProps) {
//   const dispatch = useDispatch<AppDispatch>();
  
//   // Hämta följande listan från Redux
//   const { following } = useSelector((state: RootState) => state.follow); 

//   // Kontrollera om den besökande användaren följer den aktuella användaren
//   const isFollowing = following.includes(user.username);

//   // Hantera följ/följ inte-åtgärd
//   const handleFollowClick = async () => {
//     if (visitingUser && visitingUser.username !== currentUser) {
//       try {
//         // Uppdatera följarlistan
//         dispatch(handleFollow(user.username)); // Uppdatera Redux med följa-status
//         await dispatch(updateFollowAmount(user.username)); // Uppdatera antalet följare för användaren
//       } catch (error) {
//         console.error("Error while following/unfollowing user:", error);
//       }
//     }
//   };

//   // Om vi är på den egna användarens profil, visa inte knappen
//   if (visitingUser?.username === currentUser) return null;

//   return (
//     <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-4">
//       {/* Endast visa knappen om användaren inte är den aktuella profilen */}
//       <button
//         onClick={handleFollowClick}
//         className="w-28 h-10 border border-black text-sm md:text-base font-notojp text-white hover:cursor-pointer mb-2"
//       >
//         {isFollowing ? 'Unfollow -' : 'Follow +'}
//       </button>

//       {/* Visa antal följare */}
//       <p className="text-sm md:text-base text-white font-notojp text-stroke">
//         {user.followers} Followers
//       </p>
//     </div>
//   );
// }

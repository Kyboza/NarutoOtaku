// app/user/page.tsx
import React from 'react';
import Image from 'next/image';
import { getUserFromParams } from '@/app/actions/userActions';


export default async function UserPage({params}: {params: {name: string}}) {
  const parameters = await params;
  const currentUser = parameters.name
  let user = null;
  let visitingUser = null;


  try {
    const response = await getUserFromParams(currentUser);
    user = response?.user
    visitingUser = response?.visitingUser
  } catch (error) {
    console.error("Error fetching user data:", error);
  }


  // Om användaren inte finns, visa ett meddelande
  if (!user) {
    return <div>User not found or error fetching data</div>;
  }

  return (
    <div className="flex flex-col items-center px-4">
      {/* Profile Section */}
      <section className="flex flex-col md:flex-row w-full max-w-[90vw] mt-6 bg-[#A5A5A5] bg-opacity-75 border border-black rounded-md overflow-hidden shadow-sm">
        {/* Image Column */}
        <div className="w-full md:w-1/3 flex justify-center items-center p-4">
          <div className="relative w-40 h-40 border rounded-md border-black">
            <Image
              src={user.imgPath ? user.imgPath : '/images/profilepic/default.webp'}
              alt="Profile Picture"
              className={`rounded-md ${user.imgPath ? 'object-cover' : 'object-contain'}`}
              fill
            />
          </div>
        </div>
        {/* Info Column */}
        <div className="w-full md:w-1/3 flex flex-col justify-center items-center p-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-notojp text-white drop-shadow mb-2">
            {user.username}
          </h1>
          <div className="flex flex-col gap-1">
            <p className="text-sm md:text-base text-white font-notojp"> {'Gender: '}
                <span className='font-bold text-stroke'>{user.gender ? user.gender: '?'}</span>
            </p>
            <p className="text-sm md:text-base text-white font-notojp">{'Age: '}
                <span className="font-bold text-stroke">{user.age ? user.age : '?'}</span>
            </p>
            <p className="text-sm md:text-base text-white font-notojp">{'Weight: '}
                <span className="font-bold text-stroke">{user.weight ? user.weight + ' Kg' : '?'}</span>
            </p>
            <p className="text-sm md:text-base text-white font-notojp">{'Style: '}
                <span className="font-bold text-stroke">{user.style ? user.style : '?'}</span>
            </p>
          </div>
        </div>
        {/* Follow Column */}
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-4">
        {visitingUser && visitingUser.username === currentUser ? ( null ) : 
        (<button className="w-28 h-10 border border-black text-sm md:text-base font-notojp text-white hover:cursor-pointer mb-2">Follow +</button>)}
         
          <p className="text-sm md:text-base text-white font-notojp text-stroke">{user.followers} Followers</p>
        </div>
      </section>

      {/* About Me Section */}
      <section className="w-full max-w-[90vw] p-4 bg-[#A5A5A5] bg-opacity-75 border border-black rounded-md mt-4 mb-6 max-h-[40vh] overflow-y-auto scrollbar-hide">
        <h2 className="text-2xl md:text-3xl font-notojp text-white drop-shadow mb-2 text-stroke">About Me</h2>
        <p className="text-sm md:text-base text-white font-notojp break-words">
          {user.about ? user.about : 'No Content Yet'}
        </p>
      </section>
    </div>
  );
}

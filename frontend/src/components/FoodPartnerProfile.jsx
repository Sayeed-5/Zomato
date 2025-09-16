import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// --- SVG Icon Components ---

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 inline-block" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
);

const ReelsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
    </svg>
);

const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


// --- Main Profile Component ---

function FoodPartnerProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);
  // const { name, address, profileImageUrl, stats, reels } = foodPartnerData;

  useEffect(() => {
    axios.get(`http://localhost:3000/api/partner-profile/${id}`,{ withCredentials: true })
      .then((response) => {
        setProfile(response.data.foodPartner);
        setVideos(response.data.foodPartner.foodItems || []);
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
      });
  }, [id]);

  // console.log("id from url:", id);
  // console.log("profile from API:", profile);

  if (!profile) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return (
    <div className="bg-slate-900 min-h-screen font-sans text-gray-200">
      <div className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
        
        {/* Profile Header */}
        <header className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-4 sm:space-y-0 sm:space-x-8 md:space-x-12 mb-8">
          <div className="flex-shrink-0">
            <img
              className="h-28 w-28 sm:h-36 sm:w-36 rounded-full object-cover border-4 border-slate-700 shadow-lg"
              src={"https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" || profile.profileImageUrl}
              alt={`${profile?.name}'s profile`}
            />
          </div>

          <div className="flex flex-col justify-center flex-grow">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">{profile?.name}</h1>
            <p className="text-slate-400 mt-1.5 flex items-center justify-center sm:justify-start">
              <LocationIcon /> {profile?.address}
            </p>
            
            {/* Stats Section */}
            <div className="flex justify-center sm:justify-start space-x-8 mt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{profile?.totalDishes}</p>
                <p className="text-sm text-slate-400">Dishes</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{profile?.served}</p>
                <p className="text-sm text-slate-400">Customers Served</p>
              </div>
            </div>
          </div>
        </header>

        <hr className="border-slate-700 my-8" />

        {/* Reels Section Header */}
        <div className="flex items-center justify-center space-x-3 text-slate-300 mb-6">
            <ReelsIcon />
            <h2 className="text-xl font-semibold uppercase tracking-wider">Reels</h2>
        </div>

        {/* Reels Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-1.5 sm:gap-4">
          {videos.map((reel) => (
            <div key={reel.id} className="relative group aspect-[9/16] cursor-pointer rounded-lg overflow-hidden">
              <video className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" src={reel.video} muted></video>
              {/* <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300"></div> */}
              {/* <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <PlayIcon />
              </div> */}
               {/* <div className="absolute bottom-2 left-2 flex items-center space-x-1 text-white text-xs font-semibold bg-black/50 px-2 py-1 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                <span>{reel.views}</span>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FoodPartnerProfile;
import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import ActionBar from './ActionBar';
import BottomNav from './BottomNav';

// This component renders a single video reel with its overlay content.
const Reel = ({ videoUrl, description, storeUrl }) => {
  // const handleVisitStore = () => {
  //   console.log(`Navigating to store: ${storeUrl}`);
  // };

  return (
    // Each reel is a full-screen container with snap-start for scrolling
    <div className="relative w-full h-full snap-start flex items-center justify-center bg-black rounded-none md:rounded-2xl overflow-hidden">
      {/* The video element autoplays, is muted, and loops */}
      <video
        className="w-full h-full object-cover"
        src={videoUrl}
        autoPlay
        muted
        loop
        playsInline // Important for iOS devices
        preload='metadata'
      ></video>

      {/* right vertical interaction bar */}
      <div className="absolute right-3 bottom-28 md:bottom-32">
        <ActionBar />
      </div>

      {/* Overlay for description and button */}
      <div className="absolute bottom-0 left-0 right-0 p-6 pb-24 text-white bg-gradient-to-t from-black/60 to-transparent">
        {/* Description with two-line truncation */}
        <p className="text-sm font-light mb-4 line-clamp-2">
          {description}
        </p>
        {/* "Visit Store" button */}
        <button
          className="w-full font-bold text-center py-3 rounded-lg text-md transition-colors duration-300 backdrop-blur-md bg-white/20 dark:bg-black/20 text-white hover:bg-white/30 dark:hover:bg-black/30"
        >
          <Link className="reel-btn" to={storeUrl} aria-label="Visit store">Visit store</Link>
        </button>
      </div>
    </div>
  );
};

// --- Main App Component ---
function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/food",{ withCredentials: true})
    .then((res)=>{
      const foodData = res.data.foodItems;
      setVideos(Array.isArray(foodData) ? foodData : [foodData]);
    })
  },[])

  // console.log(videos);

  return (
    <>
      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
      {/* themed gradient background wrapper */}
      <div className="min-h-screen w-screen bg-gradient-to-b from-gray-900 via-gray-900/95 to-black text-white">
        {/* Main container for the reels feed (mobile-first width) */}
        <div className="mx-auto w-full max-w-md">
          <main className="h-screen overflow-y-scroll snap-y snap-mandatory">
            {videos.map((item) => (
              <div key={item._id} className="h-screen">
                <Reel
                  videoUrl={item.video}
                  description={item.description}
                  storeUrl={`/partner-profile/${item.foodPartner}`} // Dynamic store URL
                />
              </div>
            ))}
          </main>
        </div>

        {/* bottom nav */}
        <BottomNav />
      </div>
    </>
  );
}

export default Home;
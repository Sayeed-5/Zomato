import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

// This component renders a single video reel with its overlay content.
const Reel = ({ videoUrl, description, storeUrl }) => {
  // const handleVisitStore = () => {
  //   console.log(`Navigating to store: ${storeUrl}`);
  // };

  return (
    // Each reel is a full-screen container with snap-start for scrolling
    <div className="relative w-screen h-screen snap-start flex items-center justify-center bg-black">
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

      {/* Overlay for description and button */}
      <div className="absolute bottom-0 left-0 right-0 p-6 pb-8 text-white bg-gradient-to-t from-black/60 to-transparent">
        {/* Description with two-line truncation */}
        <p className="text-sm font-light mb-4 line-clamp-2">
          {description}
        </p>
        
        {/* "Visit Store" button */}
        <button
        
          className="w-full bg-white text-black font-bold text-center py-3 rounded-lg text-md hover:bg-gray-200 transition-colors duration-300"
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
      
      {/* Main container for the reels feed */}
      <main className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory">
        {videos.map((item) => (
          <Reel
            key={item._id}
            videoUrl={item.video}
            description={item.description}
            storeUrl={`/partner-profile/${item.foodPartner}`} // Dynamic store URL
          />
        ))}
      </main>
    </>
  );
}

export default Home;
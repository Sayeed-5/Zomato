import React from 'react';

// --- Mock Data ---
// In a real application, you would fetch this data from an API.
const videosData = [
  {
    id: 1,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-walking-on-a-paved-road-in-the-countryside-47029-large.mp4',
    description: 'Explore our latest autumn collection. Handcrafted with the finest materials for a cozy and stylish season. Limited stock available!',
    storeUrl: '#',
  },
  {
    id: 2,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-surfer-running-on-the-beach-47035-large.mp4',
    description: 'Catch the wave with our new swimwear line. Designed for maximum comfort and performance. Dive in now!',
    storeUrl: '#',
  },
  {
    id: 3,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-a-woman-works-out-in-the-rain-47040-large.mp4',
    description: 'Unleash your potential with our high-performance activewear. This is a much longer description designed to test the two-line truncation feature to ensure it works correctly and doesn\'t overflow the container.',
    storeUrl: '#',
  },
  {
    id: 4,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-mountain-bikers-riding-on-a-rocky-trail-47041-large.mp4',
    description: 'Adventure awaits. Gear up with our all-terrain equipment.',
    storeUrl: '#',
  },
];

// --- Reel Video Component ---
// This component renders a single video reel with its overlay content.
const Reel = ({ videoUrl, description, storeUrl }) => {
  const handleVisitStore = () => {
    // In a real app, this would navigate to the storeUrl
    console.log(`Navigating to store: ${storeUrl}`);
  };

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
      ></video>

      {/* Overlay for description and button */}
      <div className="absolute bottom-0 left-0 right-0 p-6 pb-8 text-white bg-gradient-to-t from-black/60 to-transparent">
        {/* Description with two-line truncation */}
        <p className="text-sm font-light mb-4 line-clamp-2">
          {description}
        </p>
        
        {/* "Visit Store" button */}
        <button
          onClick={handleVisitStore}
          className="w-full bg-white text-black font-bold text-center py-3 rounded-lg text-md hover:bg-gray-200 transition-colors duration-300"
        >
          Visit Store
        </button>
      </div>
    </div>
  );
};

// --- Main App Component ---
// This is the root component that sets up the scroll container and maps the videos.
function Home() {
  return (
    <>
      {/* We need to inject this style for the line-clamp utility to work */}
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
        {videosData.map((video) => (
          <Reel
            key={video.id}
            videoUrl={video.videoUrl}
            description={video.description}
            storeUrl={video.storeUrl}
          />
        ))}
      </main>
    </>
  );
}

export default Home;
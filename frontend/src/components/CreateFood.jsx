import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Simple SVG Icon for the video upload area
const VideoUploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10 text-gray-300 mb-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  </svg>
);

function CreateFood() {
  const [foodName, setFoodName] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState('');

    const navigate = useNavigate();

  // Handler for when a video file is selected
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      // Create a temporary URL for video preview
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!foodName || !description || !videoFile) {
      alert('Please fill out all fields and upload a video.');
      return;
    }
    const formData = new FormData();
    formData.append('name', foodName);
    formData.append('description', description);
    formData.append('video', videoFile);

    const response = await axios.post('http://localhost:3000/api/food', formData, { withCredentials: true })
    //console.log(response.data);
    
    alert(`Food "${foodName}" added successfully!`);
    navigate('/');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-gray-900/95 to-black text-white">
      <div className="mx-auto w-full max-w-md px-4 pt-5 pb-24">
        <div className="rounded-2xl shadow-xl backdrop-blur-md bg-white/10 dark:bg-black/20 border border-white/10 p-5 space-y-6">
          {/* Form Header */}
          <div className="text-center">
            <h1 className="text-2xl font-bold">Add New Food</h1>
            <p className="text-white/70 mt-1 text-sm">Upload a video and details.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Video Input */}
            <div>
              <label htmlFor="video-upload" className="block text-sm font-medium text-white/80 mb-2">
                Food Video
              </label>
              <label htmlFor="video-upload" className="mt-1 flex justify-center px-5 pt-5 pb-6 border border-white/20 border-dashed rounded-xl cursor-pointer hover:border-white/40 transition-colors">
                <div className="space-y-2 text-center w-full">
                  {videoPreview ? (
                    <video src={videoPreview} controls className="max-h-60 rounded-lg w-full"></video>
                  ) : (
                    <>
                      <VideoUploadIcon />
                      <p className="text-sm text-white/75">Upload a video</p>
                      <p className="text-xs text-white/60">MP4, MOV, AVI up to 50MB</p>
                    </>
                  )}
                </div>
              </label>
              <input
                id="video-upload"
                name="video-upload"
                type="file"
                className="sr-only"
                accept="video/*"
                onChange={handleVideoChange}
              />
            </div>

            {/* Food Name Input */}
            <div>
              <label htmlFor="food-name" className="block text-sm font-medium text-white/80">
                Name
              </label>
              <input
                type="text"
                id="food-name"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                placeholder="e.g., Spicy Ramen"
                className="mt-2 block w-full rounded-lg bg-white/10 border border-white/15 text-white placeholder-white/50 py-3 px-3 focus:outline-none focus:ring-2 focus:ring-white/40"
              />
            </div>

            {/* Description Input */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-white/80">
                Description
              </label>
              <textarea
                id="description"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A short description of the food..."
                className="mt-2 block w-full rounded-lg bg-white/10 border border-white/15 text-white placeholder-white/50 py-3 px-3 focus:outline-none focus:ring-2 focus:ring-white/40"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg active:scale-[.99] transition-transform"
              >
                Add Food
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateFood
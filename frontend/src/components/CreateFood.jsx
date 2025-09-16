import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Simple SVG Icon for the video upload area
const VideoUploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10 text-gray-500 mb-2"
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

    // Send POST request to backend API
    const response = await axios.post('http://localhost:3000/api/food', formData, { withCredentials: true })
    //console.log(response.data);
    
    alert(`Food "${foodName}" added successfully!`);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center font-sans p-4">
      <div className="w-full max-w-sm bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
        {/* Form Header */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Add New Food</h1>
          <p className="text-gray-400 mt-1">Upload a video and details.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Video Input */}
          <div>
            <label htmlFor="video-upload" className="block text-sm font-medium text-gray-300 mb-2">
              Food Video
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer hover:border-indigo-500 transition-colors duration-300">
              <div className="space-y-1 text-center">
                {videoPreview ? (
                  <video src={videoPreview} controls className="max-h-60 rounded-lg w-3xl mx-auto"></video>
                ) : (
                  <>
                    <VideoUploadIcon />
                    <div className="flex text-sm text-gray-400">
                      <p className="pl-1">Upload a video</p>
                    </div>
                    <p className="text-xs text-gray-500">MP4, MOV, AVI up to 50MB</p>
                  </>
                )}
                <input
                  id="video-upload"
                  name="video-upload"
                  type="file"
                  className="sr-only"
                  accept="video/*"
                  onChange={handleVideoChange}
                />
              </div>
            </div>
          </div>

          {/* Food Name Input */}
          <div>
            <label htmlFor="food-name" className="block text-sm font-medium text-gray-300">
              Name
            </label>
            <input
              type="text"
              id="food-name"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              placeholder="e.g., Spicy Ramen"
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-300"
            />
          </div>

          {/* Description Input */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300">
              Description
            </label>
            <textarea
              id="description"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A short description of the food..."
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-300"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-transform transform hover:scale-105 duration-300"
            >
              Add Food
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateFood
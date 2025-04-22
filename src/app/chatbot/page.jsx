
// pages/index.js
'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  // Pre-load the iframe when the component mounts
  useEffect(() => {
    // Create a hidden iframe to preload the chat widget
    const preloadIframe = document.createElement('iframe');
    preloadIframe.src = "https://widget.kommunicate.io/chat?appId=39e182632861b3b88e26c8e3e264d1f54";
    preloadIframe.style.display = 'none';
    document.body.appendChild(preloadIframe);
    
    // Set a timeout to mark the iframe as loaded after a short delay
    const timer = setTimeout(() => {
      setIsIframeLoaded(true);
      // Clean up the preloaded iframe when it's no longer needed
      document.body.removeChild(preloadIframe);
    }, 2000);
    
    return () => {
      clearTimeout(timer);
      if (document.body.contains(preloadIframe)) {
        document.body.removeChild(preloadIframe);
      }
    };
  }, []);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="relative min-h-screen">
      {/* Header/Navigation */}
      <header className="fixed w-full bg-white z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <svg className="h-10 w-10 text-green-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <nav>
            <ul className="flex space-x-8">
              <li><a href="#" className="text-gray-800 hover:text-green-600 font-medium">Home</a></li>
              <li><a href="#" className="text-gray-800 hover:text-green-600 font-medium">Blog</a></li>
              <li><a href="#" className="text-gray-800 hover:text-green-600 font-medium">About Us</a></li>
              <li>
                <div className="relative group">
                  <a href="#" className="text-gray-800 hover:text-green-600 font-medium flex items-center">
                    More
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </a>
                </div>
              </li>
            </ul>
          </nav>
          <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-full transition">
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <Image
            src="/bg-mount.jpg"
            alt="Glamping tent in forest"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>

        <div className="relative h-full flex flex-col justify-center items-center px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 max-w-4xl">
            Secure Your Dream Vacation with a Reservation
          </h1>

          {/* Search Form */}
          <div className="mt-12 bg-white rounded-full shadow-xl max-w-4xl w-full p-2 flex flex-wrap md:flex-nowrap">
            <div className="flex items-center px-4 py-2 flex-1 min-w-0">
              <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <input type="text" placeholder="Location" className="w-full focus:outline-none" />
            </div>
            <div className="border-l border-gray-300 h-8 my-auto hidden md:block"></div>
            <div className="flex items-center px-4 py-2 flex-1 min-w-0">
              <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <input type="text" placeholder="Check in - Check out" className="w-full focus:outline-none" />
            </div>
            <div className="border-l border-gray-300 h-8 my-auto hidden md:block"></div>
            <div className="flex items-center px-4 py-2 flex-1 min-w-0">
              <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <input type="text" placeholder="Person" className="w-full focus:outline-none" />
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-full flex items-center justify-center ml-2">
              <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              Search
            </button>
          </div>
        </div>

        {/* Quote Section */}
        <div className="absolute bottom-20 left-0 right-0 px-4">
          <div className="container mx-auto">
            <div className="max-w-xl bg-black bg-opacity-40 p-6 rounded-lg text-white">
              <p className="text-lg">
                We believe in the power of the great outdoors. We think that everyone deserves the chance to explore the wild and to find their very own adventure.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="absolute bottom-0 left-0 right-0 px-4">
          <div className="container mx-auto flex justify-end pb-8">
            <div className="flex space-x-12 text-white">
              <div className="text-center">
                <div className="text-4xl font-bold">121+</div>
                <div className="text-sm">Capital Raised</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">80+</div>
                <div className="text-sm">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">1K+</div>
                <div className="text-sm">Property options</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isChatOpen ? (
          <button 
            onClick={toggleChat}
            className="bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </button>
        ) : (
          <div className="bg-white rounded-lg shadow-xl overflow-hidden w-96">
            <div className="bg-green-600 text-white px-4 py-3 flex justify-between items-center">
              
              <button onClick={toggleChat} className="text-white hover:text-green-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            {isIframeLoaded && (
              <iframe
                style={{ border: "2px solid #000", borderRadius: "12px" }}
                height="600px"
                width="382px"
                src="https://widget.kommunicate.io/chat?appId=39e182632861b3b88e26c8e3e264d1f54"
                allow="microphone; geolocation;"
              />
            )}
            {!isIframeLoaded && (
              <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
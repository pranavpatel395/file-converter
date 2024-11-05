import React, { useEffect, useState } from 'react';
import LineAnimation from './LineAnimation';
import img from '../assets/FileCov.png';
import img1 from '../assets/FileCov2.png';
import img2 from '../assets/FileCov3.png';

const features = [
  {
    title: "Easy to Use",
    description: "Simply upload your VSDX files and click the convert button. You can also batch convert VSDX to PDF format.",
  },
  {
    title: "Best Quality",
    description: "We use both open source and custom software to make sure our conversions are of the highest quality.",
  },
  {
    title: "Free & Secure",
    description: "Our VSDX to PDF converter is free and works on any web browser. We guarantee file security and privacy.",
  },
];

const Home = ({ refresh }) => {
  const [content, setContent] = useState('Loading content...');

  useEffect(() => {
    const fetchContent = async () => {
      console.log('Fetching Home content...');
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API fetch delay
      setContent('Home page content refreshed!');
    };

    fetchContent();
  }, [refresh]); // Re-run useEffect when "refresh" state changes

  return (
    <div id="main-container" className="bg-white px-4 sm:px-6 lg:px-8">
      {/* Main Section */}
      <div className="color-section flex flex-col lg:flex-row justify-center items-center lg:space-x-8">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="hvr cursor-pointer text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
            Convert All Your Files With
          </h2>
          <span className="hvr cursor-pointer text-2xl sm:text-3xl lg:text-4xl font-extrabold text-purple-600">
            One Click
          </span>
          <p className="mt-4 text-base sm:text-lg text-gray-500">
            Simply upload your files and click the convert button.
          </p>
          <a href="#" className="mt-8 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-700">
            Try it for free
          </a>
        </div>
        <div id="bimg" className="mt-8 lg:mt-0 lg:w-1/2 flex justify-center">
          <img className="w-full max-w-xs sm:max-w-sm lg:max-w-lg" src={img} alt="File conversion illustration" />
        </div>
      </div>

      {/* Line Animation */}
      <LineAnimation />

      {/* Tools Section */}
      <div className="color-section text-center my-16">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-black">Tools</h1>
      </div>

      <div className="flex justify-center items-center gap-6 flex-wrap mt-8">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="card w-40 sm:w-48 lg:w-64 h-64 rounded-3xl bg-gray-300 shadow-lg shadow-gray-500/50 p-4">
            <h2 className="text-center font-bold">Convert to PDF</h2>
            <p className="mt-2 text-center text-sm sm:text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, ad.</p>
          </div>
        ))}
      </div>

      {/* Static Content (No Animations) */}
      <div className="color-section flex flex-col lg:flex-row justify-center items-center lg:space-x-16 mt-24 lg:mt-36">
        <div id="anime" className="mb-8 lg:mb-0">
          <img src={img1} alt="Editing PDF" className="w-full max-w-xs sm:max-w-sm lg:max-w-lg" />
        </div>
        <div className="text-center lg:text-left">
          <h2 className="font-bold text-2xl sm:text-4xl lg:text-6xl">Edit Your PDF In A Second</h2>
          <p className="mt-4 text-gray-500 text-sm sm:text-base lg:text-lg">
            Do more than just view PDFs. Highlight and add text, images, shapes, and freehand annotations to your documents.
          </p>
        </div>
      </div>

      <div className="color-section flex flex-col lg:flex-row justify-center items-center lg:space-x-16 mt-24 lg:mt-36">
        <div className="text-center lg:text-left mb-8 lg:mb-0">
          <h2 className="font-bold text-2xl sm:text-4xl lg:text-6xl">Edit Your PDF In A Second</h2>
          <p className="mt-4 text-gray-500 text-sm sm:text-base lg:text-lg">
            Highlight, add text, and annotations to PDFs. You can also connect to 20 other tools to enhance your files further.
          </p>
        </div>
        <div id="anime">
          <img src={img2} alt="Editing PDF" className="w-full max-w-xs sm:max-w-sm lg:max-w-lg" />
        </div>
      </div>

      {/* Features Section */}
      <div className="color-section h-auto bg-gray-900 py-12 my-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              We come with some amazing features
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="pt-6">
                <div className="flow-root bg-gray-800 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <h3 className="mt-8 text-lg font-medium text-white">{feature.title}</h3>
                    <p className="mt-5 text-base text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

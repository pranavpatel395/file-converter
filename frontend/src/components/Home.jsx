import React, { useEffect } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import LineAnimation from './LineAnimation';
import img from '../assets/FileCov.png';
import img1 from '../assets/FileCov2.png';
import img2 from '../assets/FileCov3.png';
import gsap from 'gsap';


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



const Home = () => {
  useEffect(() => {
    // Initialize Locomotive Scroll after the component mounts
    const scroll = new LocomotiveScroll({
      el: document.querySelector('#main-container'),
      smooth: true,
    });

    // Ensure Shery.js is loaded
    if (window.Shery) {
      if (typeof window.Shery.hoverWithMediaCircle === 'function') {
        window.Shery.hoverWithMediaCircle(".hvr", {
          images: [img],
        });
      }

      if (typeof window.Shery.imageEffect === 'function') {
        window.Shery.imageEffect("#bimg", {
          style: 5,
          config:{"a":{"value":0.4,"range":[0,30]},"b":{"value":-0.98,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":1},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":true},"growSize":{"value":4.63,"range":[1,15]},"durationOut":{"value":0.55,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.1,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":false},"onMouse":{"value":1},"noise_speed":{"value":0.76,"range":[0,10]},"metaball":{"value":0.2,"range":[0,2],"_gsap":{"id":13}},"discard_threshold":{"value":0.44,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.46,"range":[0,2]},"noise_scale":{"value":9.92,"range":[0,100]}},
          gooey:true
        });
      }

      if (typeof window.Shery.imageEffect === 'function') {
        window.Shery.imageEffect("#anime img", {
          style: 3,
          config:{"uFrequencyX":{"value":10.69,"range":[0,100]},"uFrequencyY":{"value":4.58,"range":[0,100]},"uFrequencyZ":{"value":45.8,"range":[0,100]},"geoVertex":{"range":[1,64],"value":17.35},"zindex":{"value":1,"range":[-9999999,9999999]},"aspect":{"value":1},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":false},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.21,"range":[1,5]},"scrollType":{"value":0},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":0.2,"range":[0,10]},"metaball":{"value":0.2,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0.002,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}},
          // debug:true
        });
      }
    }

    // Apply GSAP animation
    gsap.from('.anim2', {
      y: 50,
      stagger: 1,
      ease: 'Expo.easeOut',
      duration: 1,
    });

    // Cleanup on unmount
    return () => {
      if (scroll) {
        scroll.destroy();
      }
    };
  }, []);

  return (
    <div id="main-container" data-scroll-container className="bg-white mx-11">
      {/* Main Section */}
      <div className='flex justify-center items-center'>
        <div className="lg:w-1/2">
          <h2 className="hvr  text-5xl font-extrabold text-gray-900 sm:text-5xl">
            Convert All Your Files With
          </h2>
          <span className="hvr text-3xl font-extrabold text-purple-600 sm:text-4xl"> One Click</span>
          <p className="mt-4 text-lg text-gray-500">
            Simply upload your files and click the convert button.
          </p>
          <a href="#" className="mt-8 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-700">
            Try it for free
          </a>
        </div>
        <div id='bimg' className=" mt-10 lg:mt-0 lg:w-1/2 flex justify-center">
          <img className='w-auto' src={img} alt="File conversion illustration" />
          <img className='w-auto' src={img1} alt="File conversion illustration" />
          <img className='w-auto' src={img2} alt="File conversion illustration" />

        </div>
      </div>
      <LineAnimation />

      <div className='flex justify-center items-center '>
        <h1 className='text-6xl font-bold text-black'>Tools</h1>
      </div>

      <div className='flex justify-center items-center gap-28 flex-wrap mt-16'>
        {[...Array(10)].map((_, index) => (
          <div key={index} className="card w-48 h-64 rounded-3xl bg-gray-300 shadow-lg shadow-gray-500/50">
            <h2 className='flex justify-center items-center'>convert to pdf</h2>
            <p className='flex justify-center items-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, ad.</p>
          </div>
        ))}
      </div>

      <div className='flex justify-center items-center'>
        <div id='anime' className='anim2'>
          <img src={img1} alt="Editing PDF" />
        </div>
        <div>
          <h2 className='font-bold text-6xl'>Edit Your Pdf In A Second</h2>
          <p>Do more than just view PDFs. Highlight and add text, images, shapes, and freehand annotations to your documents. You can connect to 20 other tools to enhance your files further.</p>
        </div>
      </div>

      <div className='flex justify-center items-center'>
        <div>
          <h2 className='font-bold text-6xl'>Edit Your Pdf In A Second</h2>
          <p>Do more than just view PDFs. Highlight and add text, images, shapes, and freehand annotations to your documents. You can connect to 20 other tools to enhance your files further.</p>
        </div>
        <div id='anime' className='anim2'>
          <img src={img2} alt="Editing PDF" />
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-900 py-12 my-9">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              We come with some amazing features
            </p>
          </div>
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
    </div>
  );
};

export default Home;

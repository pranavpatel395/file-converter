import React, { useEffect } from 'react';
import gsap from 'gsap';
import './LineAnimation.css'; // Import the CSS file

const LineAnimation = () => {
  useEffect(() => {
    const main = document.querySelector('#main');

    const initialPath = 'M 10 100 Q 635 100 1200 100';
    const finalPath = 'M 10 100 Q 635 100 1200 100';

    const handleMouseMove = (e) => {
      const boundingRect = main.getBoundingClientRect();
      const x = e.clientX - boundingRect.left;
      const y = e.clientY - boundingRect.top;

      const path = `M 10 100 Q ${x} ${y} 1200 100`;
      gsap.to('svg path', {
        attr: { d: path },
        duration: 0.2,
        ease: 'power3.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to('svg path', {
        attr: { d: finalPath },
        duration: 1.5,
        ease: 'elastic.out(1, 0.2)',
      });
    };

    main.addEventListener('mousemove', handleMouseMove);
    main.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      main.removeEventListener('mousemove', handleMouseMove);
      main.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div id="main" className="line-animation-container relative overflow-hidden w-full  ">   {/* h-48 , lg:h-64*/}
      <svg className='w-full' viewBox="0 0 1200 200">  {/* h-full */}
        <path d="M 10 100 Q 635 100 1200 100" stroke="black" fill="transparent" />
      </svg>
    </div>
  );
};

export default LineAnimation;

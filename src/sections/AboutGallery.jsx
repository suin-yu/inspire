import React, { useEffect } from 'react';
import './AboutGallery.css';

import pic1 from '../assets/img/pic1.png';
import pic2 from '../assets/img/pic2.png';
import pic3 from '../assets/img/pic3.png';
import pic4 from '../assets/img/pic4.png';
import pic5 from '../assets/img/pic5.png';
import pic6 from '../assets/img/pic6.png';

const AboutGallery = () => {

    // Parallax Effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            const images = document.querySelectorAll('.gallery-img');
            const x = (window.innerWidth / 2 - e.pageX) / 50;
            const y = (window.innerHeight / 2 - e.pageY) / 50;

            images.forEach((img, index) => {
                const factor = (index + 1) * 0.2;
                // We combine the base float animation (CSS) with this mouse offset
                // However, directly setting transform overrides CSS animation transform.
                // Solution: Wrap image in a div. Animate div (float). Move image (parallax).
                // Or use CSS variables.
                img.style.setProperty('--mouse-x', `${x * factor}px`);
                img.style.setProperty('--mouse-y', `${y * factor}px`);
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section id="about-gallery" className="about-gallery-section" data-theme="dark">
            <h1 className="name-title">
                <span className="name-part">SUIN</span>
                <span className="name-part text-gray">YU</span>
            </h1>

            <div className="gallery-container">
                <div className="img-wrapper pos-1">
                    <img src={pic1} alt="Profile 1" className="gallery-img" />
                </div>
                <div className="img-wrapper pos-2">
                    <img src={pic2} alt="Profile 2" className="gallery-img" />
                </div>
                <div className="img-wrapper pos-3">
                    <img src={pic3} alt="Profile 3" className="gallery-img" />
                </div>
                <div className="img-wrapper pos-4">
                    <img src={pic4} alt="Profile 4" className="gallery-img" />
                </div>
                <div className="img-wrapper pos-5">
                    <img src={pic5} alt="Profile 5" className="gallery-img" />
                </div>
                <div className="img-wrapper pos-6">
                    <img src={pic6} alt="Profile 6" className="gallery-img" />
                </div>
            </div>
        </section>
    );
};

export default AboutGallery;

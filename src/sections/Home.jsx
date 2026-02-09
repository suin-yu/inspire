import React, { useState, useEffect, useRef } from 'react';
import './Home.css';

import homeImg1 from '../assets/img/home_img1.png';
import homeImg2 from '../assets/img/home_img2.png';
import homeImg3 from '../assets/img/home_img3.png';
import workImg1 from '../assets/img/work_area1.png';
import workImg2 from '../assets/img/work_area2.png';
import workImg3 from '../assets/img/work_area3.png';
import workImg4 from '../assets/img/work_area4.png';

const mainImageModules = import.meta.glob('../assets/img/main/*.jpg', { eager: true, import: 'default' });
const allMainImages = Object.values(mainImageModules);

const Home = () => {
    const textItem = "CREATIVE DESIGN";
    const repeatCount = 10;
    const marqueeText = Array(repeatCount).fill(textItem);

    // 6 images for hexagon
    // 6 images for hexagon (Randomly selected)
    const [images] = useState(() => {
        if (!allMainImages || allMainImages.length === 0) {
            return [
                "https://picsum.photos/600/700?random=1",
                "https://picsum.photos/600/700?random=2",
                "https://picsum.photos/600/700?random=3",
                "https://picsum.photos/600/700?random=4",
                "https://picsum.photos/600/700?random=5",
                "https://picsum.photos/600/700?random=6",
            ];
        }
        const shuffled = [...allMainImages].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 6);
    });

    // Scroll Logic
    const containerRef = useRef(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const { top, height } = containerRef.current.getBoundingClientRect();
            const winHeight = window.innerHeight;

            // Calculate progress: 0 when container starts stickiness, 1 when it ends
            // Sticky behavior typically involves the parent being tall.
            // The content is sticky for (height - winHeight) duration.
            const scrollDist = height - winHeight;
            const scrollTop = -top; // How far we've scrolled into the container

            let p = scrollTop / scrollDist;
            p = Math.min(Math.max(p, 0), 1);
            setProgress(p);
        };

        window.addEventListener('scroll', handleScroll);
        // Ensure body allows scroll (reset from potential overrides)
        document.body.style.overflowX = 'hidden';
        document.body.style.overflowY = 'auto';

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    // Color Interpolation
    // Gray (#EAEAEA): [234, 234, 234] -> Orange (#FB6C1C): [251, 108, 28]
    // Color Interpolation
    // Finish color transition by 0.6 progress
    const getBgColor = (p) => {
        const endProgress = 0.6;
        let localP = p / endProgress;
        if (localP > 1) localP = 1;
        if (localP < 0) localP = 0;

        const start = [234, 234, 234];
        const end = [251, 108, 28];
        const r = Math.round(start[0] + (end[0] - start[0]) * localP);
        const g = Math.round(start[1] + (end[1] - start[1]) * localP);
        const b = Math.round(start[2] + (end[2] - start[2]) * localP);
        return `rgb(${r}, ${g}, ${b})`;
    };

    // Style Interpolation
    const getImgStyle = (p, staggerOffset = 0, customEndMargin = 38) => {
        // We want the whole transition to happen between 0.1 and 0.6
        // Stagger offset adds a little delay per item
        const userStart = 0.1 + staggerOffset;
        const userEnd = 0.6;

        let lp = (p - userStart) / (userEnd - userStart);
        if (lp < 0) lp = 0;
        if (lp > 1) lp = 1;

        const opacity = 1 - lp;
        const maxWidth = `${300 * (1 - lp)}px`;

        // margin: 30px -> customEndMargin
        const startMargin = 30;
        const endMargin = customEndMargin;
        const currentMargin = startMargin - ((startMargin - endMargin) * lp);

        return {
            opacity,
            maxWidth,
            margin: `0 ${currentMargin / 2}px`,
            transform: `scale(${1 - 0.2 * lp})`,
            overflow: 'hidden'
        };
    };

    const workCards = [
        { id: "01.", title: "Website", img: workImg1 },
        { id: "02.", title: "Advertising", img: workImg2 },
        { id: "03.", title: "Graphic", img: workImg3 },
        { id: "04.", title: "Branding", img: workImg4 },
    ];

    // Card Rotation Logic
    const [activeIndex, setActiveIndex] = useState(0);
    const [titleVisible, setTitleVisible] = useState(false);
    const titleRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % workCards.length);
        }, 1300); // Rotate every 1.3 seconds

        return () => clearInterval(interval);
    }, [workCards.length]);

    // Title Reveal logic
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setTitleVisible(true);
            } else {
                setTitleVisible(false);
            }
        }, { threshold: 0.3 });

        if (titleRef.current) observer.observe(titleRef.current);
        return () => observer.disconnect();
    }, []);

    // Helper to determine card class based on position relative to activeIndex
    const getCardClass = (index) => {
        const total = workCards.length;
        // Calculate relative position (0 to 3)
        // Adjust arithmetic so negative modulo behaves correctly if needed, but here simple math works
        const relativePos = (index - activeIndex + total) % total;
        return `card-pos-${relativePos}`;
    };

    return (
        <section id="home" className="home-section">
            <div className="home-intro" data-theme="default">
                <div className="text-background">
                    <div className="marquee-row">
                        <div className="marquee-track animate-right">
                            {marqueeText.map((text, i) => <span key={i} className="marquee-text">{text}</span>)}
                            {marqueeText.map((text, i) => <span key={`dup-${i}`} className="marquee-text">{text}</span>)}
                        </div>
                    </div>
                    <div className="marquee-row">
                        <div className="marquee-track animate-left">
                            {marqueeText.map((text, i) => <span key={i} className="marquee-text">{text}</span>)}
                            {marqueeText.map((text, i) => <span key={`dup-${i}`} className="marquee-text">{text}</span>)}
                        </div>
                    </div>
                    <div className="marquee-row">
                        <div className="marquee-track animate-right">
                            {marqueeText.map((text, i) => <span key={i} className="marquee-text">{text}</span>)}
                            {marqueeText.map((text, i) => <span key={`dup-${i}`} className="marquee-text">{text}</span>)}
                        </div>
                    </div>
                    <div className="marquee-row">
                        <div className="marquee-track animate-left">
                            {marqueeText.map((text, i) => <span key={i} className="marquee-text">{text}</span>)}
                            {marqueeText.map((text, i) => <span key={`dup-${i}`} className="marquee-text">{text}</span>)}
                        </div>
                    </div>
                </div>

                <div className="scene">
                    <div className="carousel">
                        {images.map((src, index) => (
                            <div className="carousel__face" key={index}>
                                <img src={src} alt={`Gallery ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div
                className="home-design-2"
                ref={containerRef}
            >
                {/* Invisible Logical Triggers for GNB */}
                <div className="theme-trigger trigger-gray" data-theme="gray"></div>
                <div className="theme-trigger trigger-orange" data-theme="orange"></div>

                <div className="sticky-wrapper" style={{ backgroundColor: getBgColor(progress) }}>
                    <div className="design-row">
                        <span className="design-text">Create</span>
                        <img
                            src={homeImg1}
                            alt="design 1"
                            className="design-img"
                            style={getImgStyle(progress, 0)}
                        />
                        <span className="design-text">crafted</span>
                    </div>
                    <div className="design-row">
                        <span className="design-text">experiences</span>
                        <img
                            src={homeImg2}
                            alt="design 2"
                            className="design-img"
                            style={getImgStyle(progress, 0.05, 0)}
                        />
                    </div>
                    <div className="design-row">
                        <span className="design-text">that</span>
                        <img
                            src={homeImg3}
                            alt="design 3"
                            className="design-img"
                            style={getImgStyle(progress, 0.1)}
                        />
                        <span className="design-text">move people</span>
                    </div>
                </div>
            </div>

            <div className="home-work" data-theme="orange">
                <div className="work-container">
                    <div className="work-left">
                        <h2
                            className={`work-title ${titleVisible ? 'visible' : ''}`}
                            ref={titleRef}
                        >
                            <span className="reveal-text">I approach digital projects</span>
                            <span className="reveal-text">with design thinking,</span>
                            <span className="reveal-text">clear processes, and</span>
                            <span className="reveal-text">intentional execution.</span>
                        </h2>
                        <div className="work-desc-box">
                            <div className="work-line"></div>
                            <p className="work-desc">
                                디자인 사고를 바탕으로 문제를 정의하고,<br />
                                명확한 프로세스와 실행으로 결과를 만듭니다.
                            </p>
                        </div>
                    </div>
                    <div className="work-right">
                        <div className="card-stack">
                            {workCards.map((card, idx) => (
                                <div className={`work-card ${getCardClass(idx)}`} key={idx}>
                                    <div className="work-card-header">
                                        <span className="work-card-num">{card.id}</span>
                                        <span className="work-card-title">{card.title}</span>
                                    </div>
                                    <div className="card-img-box">
                                        <img src={card.img} alt={card.title} className="card-img" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;

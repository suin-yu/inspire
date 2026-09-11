import React, { useRef, useEffect, useState } from 'react';
import './Contact.css';
import contactVideo from '../assets/video/contact.mp4';

const Contact = () => {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            const element = sectionRef.current;
            const { top, height } = element.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            const scrollLength = height - viewportHeight;
            const scrolled = -top;

            let p = scrolled / scrollLength;
            if (p < 0) p = 0;
            if (p > 1) p = 1;

            setProgress(p);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Style calculations based on progress
    const getToggleStyle = () => {
        let p = progress * 5;
        if (p > 1) p = 1;
        if (p < 0) p = 0;

        const isSmallMobile = windowWidth <= 480;
        const isMobile = windowWidth <= 768;

        const startWidth = isSmallMobile ? 120 : (isMobile ? 160 : 420);
        const endWidth = isSmallMobile ? 48 : (isMobile ? 64 : 170);
        const currentWidth = startWidth - (startWidth - endWidth) * p;

        const startPad = isMobile ? 6 : 20;
        const endPad = 0;
        const currentPad = startPad - (startPad - endPad) * p;

        return {
            width: `${currentWidth}px`,
            padding: `0 ${currentPad}px`
        };
    };

    const getCircleStyle = () => {
        let p = progress * 5;
        if (p > 1) p = 1;
        if (p < 0) p = 0;

        return {
            backgroundColor: `rgba(255, 255, 255, ${p})`
        };
    };

    const getTextStyle = () => {
        let pColor = progress / 0.65;
        if (pColor > 1) pColor = 1;
        if (pColor < 0) pColor = 0;
        const pPct = pColor * 100;

        return {
            backgroundImage: `linear-gradient(90deg, #111 ${pPct}%, #ccc ${pPct}%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            display: 'inline-block'
        };
    };

    const getTrackTransform = () => {
        if (windowWidth <= 768) {
            if (trackRef.current) {
                const trackWidth = trackRef.current.scrollWidth;
                const vw = windowWidth;
                const startX = vw <= 480 ? vw * 0.05 : vw * 0.08;
                // 우측 여백이 정확히 5%가 되는 위치 (오른쪽 끝 = 화면의 95%)
                const endX = (vw * 0.95) - trackWidth;
                const dist = Math.max(0, startX - endX);
                const currentX = startX - (progress * dist);
                return `translateX(${currentX}px)`;
            }
            const fallbackDist = windowWidth <= 480 ? 95 : 85;
            return `translateX(calc(${windowWidth <= 480 ? '5vw' : '8vw'} - ${progress * fallbackDist}vw))`;
        }
        return `translateX(calc(10vw - ${progress * 100}vw))`;
    };

    const scrollToSection = (id) => {
        if (id === 'home') {
            window.scrollTo({ top: 0, behavior: 'auto' });
            return;
        }
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <section id="contact" className="contact-section" ref={sectionRef} data-theme="gray">
                <div className="contact-sticky">
                    <div
                        ref={trackRef}
                        className="contact-track"
                        style={{ transform: getTrackTransform() }}
                    >
                        <div className="hero-text-wrap">
                            <span className="text-orange">Contact</span>
                            <div
                                className="design-toggle"
                                style={getToggleStyle()}
                            >
                                <div className="toggle-circle" style={getCircleStyle()}>
                                    <span className="asterisk">＊</span>
                                </div>
                            </div>
                            <span
                                className="text-white"
                                style={getTextStyle()}
                            >
                                Build it together
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <div className="contact-details" data-theme="gray">
                <video src={contactVideo} autoPlay loop muted playsInline className="contact-video" />
                <div className="contact-info">
                    <p>010.4159.5093</p>
                    <p>voish1204@naver.com</p>
                </div>
            </div>

            <footer className="footer-section" data-theme="hidden">
                <div className="footer-content">
                    <ul className="footer-menu">
                        <li onClick={() => scrollToSection('home')}>Home</li>
                        <li onClick={() => scrollToSection('about')}>About</li>
                        <li onClick={() => scrollToSection('skill')}>Skill</li>
                        <li onClick={() => scrollToSection('work')}>Work</li>
                        <li onClick={() => scrollToSection('contact')}>Contact</li>
                    </ul>
                    <p className="copyright">Copyright 2026. INSPIRE All rights reserved.</p>
                </div>
                <div className="footer-bg-logo">INSPIRE</div>
            </footer>
        </>
    );
};

export default Contact;

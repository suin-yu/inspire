import React, { useRef, useEffect, useState } from 'react';
import './Contact.css';
import contactVideo from '../assets/video/contact.mp4';

const Contact = () => {
    const sectionRef = useRef(null);
    const [progress, setProgress] = useState(0);

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

    // Style calculations based on progress
    const getToggleStyle = () => {
        // Accelerate: Finishes at 20% scroll (p * 5)
        let p = progress * 5;
        if (p > 1) p = 1;
        if (p < 0) p = 0;

        // Start at 420px, shrink to 170px (Perfect circle)
        const startWidth = 420;
        const endWidth = 170;
        const currentWidth = startWidth - (startWidth - endWidth) * p;

        const startPad = 20;
        const endPad = 0;
        const currentPad = startPad - (startPad - endPad) * p;

        return {
            width: `${currentWidth}px`,
            padding: `0 ${currentPad}px`
        };
    }

    const getCircleStyle = () => {
        // Background: Transparent -> White (#fff)
        let p = progress * 5;
        if (p > 1) p = 1;
        if (p < 0) p = 0;

        return {
            backgroundColor: `rgba(255, 255, 255, ${p})`
        };
    }

    const getTextStyle = () => {
        const pPct = Math.min(100, Math.max(0, progress * 100));

        return {
            backgroundImage: `linear-gradient(90deg, #111 ${pPct}%, #ccc ${pPct}%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            display: 'inline-block'
        };
    }

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
                        className="contact-track"
                        style={{ transform: `translateX(calc(10vw - ${progress * 100}vw))` }}
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
                </div >
            </section >

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

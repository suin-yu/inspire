import React, { useRef, useEffect, useState } from 'react';
import './Skill.css';

const Skill = () => {
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

        // Padding: 20px -> 0px
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
        // Typing reveal effect: Gray (#555) -> White (#fff)
        const pPct = Math.min(100, Math.max(0, progress * 100));

        return {
            backgroundImage: `linear-gradient(90deg, #111 ${pPct}%, #ccc ${pPct}%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            display: 'inline-block'
        };
    }

    return (
        <section id="skill" className="skill-section" ref={sectionRef} data-theme="gray">
            <div className="skill-sticky">
                <div
                    className="skill-track"
                    style={{ transform: `translateX(calc(10vw - ${progress * 72}vw))` }}
                >
                    <div className="hero-text-wrap">
                        <span className="text-orange">Skill</span>
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
                            Mastery of detail
                        </span>
                    </div>
                </div>
            </div >
        </section >
    );
};

export default Skill;

import React, { useEffect, useRef, useState } from 'react';
import './SkillTools.css';

const SkillTools = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    const tools = [
        { name: 'Ps', percent: 95, color: '#6fa5d6' },     // Blue
        { name: 'Ai', percent: 95, color: '#eda845' },     // Orange
        { name: 'Figma', percent: 90, color: '#e3655b' },  // Red
        { name: 'React', percent: 90, color: '#5fb374ff' },  // Teal (Muted)
        { name: 'Html', percent: 95, color: '#6da8b8' },   // Yellow
        { name: 'Css', percent: 90, color: '#4867aa' },    // Deep Blue
        { name: 'Js', percent: 80, color: '#7a6abf' },     // Purple
        { name: 'Jq', percent: 70, color: '#9b63b6' },     // Magenta
    ];

    // Circle config
    const radius = 90;
    const circumference = 2 * Math.PI * radius; // ~565.48

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting);
        }, { threshold: 0.2 });

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section id="skill-tools" className={`skill-tools-section ${isVisible ? 'active' : ''}`} ref={sectionRef}>
            <div className="tools-container">
                {tools.map((tool, index) => {
                    const offset = circumference - (tool.percent / 100) * circumference;

                    return (
                        <div className="tool-item" key={index}>
                            <svg className="circle-svg" viewBox="0 0 220 220">
                                {/* Background Circle (Optional, invisible in reference) */}
                                <circle
                                    className="circle-bg"
                                    cx="110"
                                    cy="110"
                                    r={radius}
                                />
                                {/* Progress Circle */}
                                <circle
                                    className="circle-progress"
                                    cx="110"
                                    cy="110"
                                    r={radius}
                                    style={{
                                        stroke: tool.color,
                                        strokeDasharray: circumference,
                                        strokeDashoffset: isVisible ? offset : circumference
                                    }}
                                />
                            </svg>
                            <span className="tool-name" style={{ color: tool.color }}>
                                {tool.name}
                            </span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default SkillTools;

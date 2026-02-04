import React, { useState, useEffect } from 'react';
import './Gnb.css';

const Gnb = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [gnbTheme, setGnbTheme] = useState('default');

    useEffect(() => {
        // Section observer for active menu highlighting
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Special handling needed? 
                        // If multiple sections intersect, we usually want the one taking up the most space or the top one.
                        // For now standard behavior is fine unless "About" starts appearing too early.
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-45% 0px -45% 0px' }
        );

        const sections = document.querySelectorAll('section');
        sections.forEach((section) => sectionObserver.observe(section));

        // Theme observer for GNB color
        const themeObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setGnbTheme(entry.target.dataset.theme || 'default');
                    }
                });
            },
            {
                rootMargin: '-80px 0px -80% 0px', // Trigger when element hits the top area
                threshold: 0
            }
        );

        // Standard sections might not have data-theme, so specific interior divs are targeted first
        // But we should also observe main sections if they have data-theme, or just all that do.
        // Let's observe anything with data-theme.
        const themedElements = document.querySelectorAll('[data-theme]');
        themedElements.forEach((el) => themeObserver.observe(el));

        return () => {
            sectionObserver.disconnect();
            themeObserver.disconnect();
        };
    }, []);

    const scrollToSection = (id) => {
        if (id === 'home') {
            window.scrollTo({ top: 0, behavior: 'auto' });
            return;
        }
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className={`gnb ${gnbTheme}`}>
            <div className="gnb-logo" onClick={() => scrollToSection('home')}>
                INSPIRE
            </div>
            <ul className="gnb-menu">
                <li className={activeSection === 'home' ? 'active' : ''} onClick={() => scrollToSection('home')}>Home</li>
                <li className={activeSection && activeSection.includes('about') ? 'active' : ''} onClick={() => scrollToSection('about')}>About</li>
                <li className={activeSection && activeSection.includes('skill') ? 'active' : ''} onClick={() => scrollToSection('skill')}>Skill</li>
                <li className={activeSection && activeSection.includes('work') ? 'active' : ''} onClick={() => scrollToSection('work')}>Work</li>
                <li className={activeSection === 'contact' ? 'active' : ''} onClick={() => scrollToSection('contact')}>Contact</li>
            </ul>
        </nav>
    );
};

export default Gnb;

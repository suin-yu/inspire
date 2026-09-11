import React, { useState, useEffect } from 'react';
import './Gnb.css';

const Gnb = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [gnbTheme, setGnbTheme] = useState('default');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Section observer for active menu highlighting
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
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

        const themedElements = document.querySelectorAll('[data-theme]');
        themedElements.forEach((el) => themeObserver.observe(el));

        return () => {
            sectionObserver.disconnect();
            themeObserver.disconnect();
        };
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isOpen]);

    const scrollToSection = (id) => {
        setIsOpen(false);
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
        <nav className={`gnb ${gnbTheme} ${isOpen ? 'open' : ''}`}>
            <div className="gnb-logo" onClick={() => scrollToSection('home')}>
                INSPIRE
            </div>

            {/* Desktop Menu */}
            <ul className="gnb-menu desktop-menu">
                <li className={activeSection === 'home' ? 'active' : ''} onClick={() => scrollToSection('home')}>Home</li>
                <li className={activeSection && activeSection.includes('about') ? 'active' : ''} onClick={() => scrollToSection('about')}>About</li>
                <li className={activeSection && activeSection.includes('skill') ? 'active' : ''} onClick={() => scrollToSection('skill')}>Skill</li>
                <li className={activeSection && activeSection.includes('work') ? 'active' : ''} onClick={() => scrollToSection('work')}>Work</li>
                <li className={activeSection === 'contact' ? 'active' : ''} onClick={() => scrollToSection('contact')}>Contact</li>
            </ul>

            {/* Mobile Hamburger Button */}
            <button 
                className={`hamburger-btn ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
            >
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
            </button>

            {/* Mobile Menu Overlay */}
            <div className={`gnb-mobile-overlay ${isOpen ? 'show' : ''}`}>
                <ul className="mobile-menu-list">
                    <li className={activeSection === 'home' ? 'active' : ''} onClick={() => scrollToSection('home')}>Home</li>
                    <li className={activeSection && activeSection.includes('about') ? 'active' : ''} onClick={() => scrollToSection('about')}>About</li>
                    <li className={activeSection && activeSection.includes('skill') ? 'active' : ''} onClick={() => scrollToSection('skill')}>Skill</li>
                    <li className={activeSection && activeSection.includes('work') ? 'active' : ''} onClick={() => scrollToSection('work')}>Work</li>
                    <li className={activeSection === 'contact' ? 'active' : ''} onClick={() => scrollToSection('contact')}>Contact</li>
                </ul>
            </div>
        </nav>
    );
};

export default Gnb;

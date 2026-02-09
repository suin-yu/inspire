

import React, { useEffect, useState, useRef } from 'react';
import './Work.css';
// import workImg from '../assets/img/work1.png'; // Removed unused
import workImg2 from '../assets/img/work2.png';
import workImg3 from '../assets/img/work3.png';
import workImg3_1 from '../assets/img/work3_1.png';
import workImg4 from '../assets/img/work4.png';
import workImg4_1 from '../assets/img/work4_1.png';
import workImg5 from '../assets/img/work5.png';
import workImg5_1 from '../assets/img/work5_1.png';
import cloneImg1 from '../assets/img/clone1.png';
import cloneImg2 from '../assets/img/clone2.png';
import cloneImg3 from '../assets/img/clone3.png';
import cloneImg4 from '../assets/img/clone4.png';
import cloneImg5 from '../assets/img/clone5.png';
import snsImg1 from '../assets/img/sns1.png';
import snsImg2 from '../assets/img/sns2.png';
import snsImg3 from '../assets/img/sns3.png';
import snsImg4 from '../assets/img/sns4.png';
import snsImg5 from '../assets/img/sns5.png';
import snsImg6 from '../assets/img/sns6.png';
import paparecipeVideo from '../assets/video/paparecipe.mp4';


const WorkGalleryHeader = ({ leftText = "UXUI", rightText = "Design", marginTop, isClone }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.2 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            className={`work-gallery-header ${isVisible ? 'animate' : ''} ${isClone ? 'clone-header' : ''}`}
            ref={ref}
            style={{ marginTop: marginTop || 0 }}
        >
            <h2 className="work-gallery-title-left">{leftText}</h2>
            <h2 className="work-gallery-title-right">{rightText}</h2>
        </div>
    );
};

const WorkGalleryItem = ({ image, images, video, title, sub, marginTop, marginBottom, overlay, noButtons, layout, overlayPosition, rightText, align, link, uxLink, siteLink, conceptLink, conceptText }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isConceptOpen, setIsConceptOpen] = useState(false);

    // Handle multiple images
    const slides = images || (image ? [image] : []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.2 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    // Slideshow Effect
    useEffect(() => {
        if (slides.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // Change every 5 seconds
        return () => clearInterval(interval);
    }, [slides.length]);

    const ImageWrapper = link ? 'a' : 'div';
    const wrapperProps = link ? { href: link, className: 'work-gallery-image-wrapper' } : { className: 'work-gallery-image-wrapper' };

    const toggleConcept = (e) => {
        e.preventDefault(); // Prevent navigation if it's an anchor (though we'll use button/div)
        setIsConceptOpen(!isConceptOpen);
    };

    return (
        <div
            className={`work-gallery-item ${layout ? layout : ''} ${align ? `align-${align}` : ''} ${isVisible ? 'animate' : ''}`}
            ref={ref}
            style={{
                marginTop: marginTop ? marginTop : 0,
                marginBottom: marginBottom ? marginBottom : 0
            }}
        >
            <ImageWrapper {...wrapperProps} onMouseEnter={() => conceptText && setIsConceptOpen(true)}>
                {video ? (
                    <video
                        src={video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="work-gallery-image"
                    />
                ) : (
                    slides.map((src, index) => (
                        <img
                            key={index}
                            src={src}
                            alt={title}
                            className={`work-gallery-image ${index !== currentSlide ? 'slide-hidden' : ''}`}
                        />
                    ))
                )}

                {/* Regular Overlay */}
                {overlay && (
                    <div className={`work-image-overlay ${overlayPosition === 'left' ? 'overlay-left' : ''} ${currentSlide !== 0 ? 'overlay-hidden' : ''}`}>
                        {overlay}
                    </div>
                )}

                {/* Project Concept Overlay */}
                {conceptText && (
                    <div className={`work-concept-overlay ${isConceptOpen ? 'open' : ''}`}>
                        <button className="work-concept-close" onClick={() => setIsConceptOpen(false)} aria-label="Close">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <div className="work-concept-content">
                            {typeof conceptText === 'string' ? (
                                <p className="work-concept-desc">
                                    {conceptText.split('\n').map((line, i) => (
                                        <React.Fragment key={i}>
                                            {line}
                                            <br />
                                        </React.Fragment>
                                    ))}
                                </p>
                            ) : (
                                <div className="work-concept-desc" style={{ textAlign: 'left', margin: '0 auto', maxWidth: '1100px' }}>
                                    {conceptText}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </ImageWrapper>

            <div className="work-gallery-details">
                <div className="work-gallery-text-left">
                    <h3>{title}</h3>
                    <p>{sub}</p>
                </div>
                {(!noButtons || rightText) && (
                    <div className="work-gallery-text-right">
                        {rightText && <span className="work-year-text">{rightText}</span>}
                        {!noButtons && (
                            <>
                                {conceptText ? (
                                    <button
                                        className="work-btn"
                                        onClick={toggleConcept}
                                        style={{ backgroundColor: '#fff', color: '#111', cursor: 'pointer' }}
                                    >
                                        {isConceptOpen ? 'Close' : 'Project Concept'}
                                    </button>
                                ) : (
                                    conceptLink && (
                                        <a
                                            href={conceptLink}
                                            className="work-btn"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ backgroundColor: '#fff', color: '#111' }}
                                        >
                                            Project Concept
                                        </a>
                                    )
                                )}
                                <a href={uxLink || '#'} className="work-btn" target={uxLink ? "_blank" : "_self"} rel="noopener noreferrer">UX view</a>
                                <a href={siteLink || '#'} className="work-btn" target={siteLink ? "_blank" : "_self"} rel="noopener noreferrer">Site view</a>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};



const Work = () => {
    // ---------------------------------------------
    // 1. SCROLL ANIMATION (Original)
    // ---------------------------------------------
    // ... (Code omitted for brevity in thought process but will be preserved in replace/file content)
    // Actually I need to keep the full context if I'm replacing the whole component or block.
    // I will use previous context.
    const sectionRef = useRef(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            const element = sectionRef.current;
            if (!element) return;

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

    const getToggleStyle = () => {
        let p = progress * 5;
        if (p > 1) p = 1;
        if (p < 0) p = 0;

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
            backgroundImage: `linear-gradient(90deg, #fff ${pPct}%, #333 ${pPct}%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            display: 'inline-block'
        };
    }

    return (
        <>
            {/* ORIGINAL SECTION */}
            <section id="work" className="work-main-section" ref={sectionRef} data-theme="dark">
                <div className="work-main-sticky">
                    <div
                        className="work-main-track"
                        style={{ transform: `translateX(calc(10vw - ${progress * 86}vw))` }}
                    >
                        <div className="work-hero-text-wrap">
                            <span className="work-text-primary">Work</span>
                            <div className="work-design-toggle" style={getToggleStyle()}>
                                <div className="work-toggle-circle" style={getCircleStyle()}>
                                    <span className="work-asterisk">＊</span>
                                </div>
                            </div>
                            <span className="work-text-secondary" style={getTextStyle()}>
                                Impact in motion
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW GALLERY SECTION WRAPPER */}
            <section id="work-gallery" className="work-gallery-section" data-theme="dark">
                <div className="work-gallery-content">
                    <WorkGalleryHeader />

                    <WorkGalleryItem
                        video={paparecipeVideo}
                        title="PapaRecipe"
                        sub="2026 EZEN Academy Team Project | Team Leader"
                        uxLink="https://www.figma.com/design/1770h8SO1bWlGHzLjKFqFJ/%EC%9C%A0%EC%88%98%EC%9D%B8-%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4?node-id=1-2594&t=qBve6p0Epz02VnwW-1"
                        siteLink="https://suin-yu.github.io/paparecipe/"
                        conceptText={
                            <div style={{ display: 'flex', gap: '1rem', textAlign: 'left', color: '#ccc', width: '100%', fontSize: '1rem' }}>
                                <div style={{ flex: '0 0 20%', borderRight: '1px solid rgba(255, 255, 255, 0.3)', paddingRight: '1rem', display: 'flex', alignItems: 'baseline' }}>
                                    <h3 style={{ fontSize: '2.2rem', fontWeight: '600', color: '#fff', lineHeight: '1.3', margin: 0 }}>
                                        Papa Recipe Renewal <span style={{ display: 'block', fontSize: '1.05rem', fontWeight: '400', marginTop: '0.5rem', color: '#aaa' }}>자연주의 철학과 AI 기술을 융합한 반응형 프로젝트</span>
                                    </h3>
                                </div>

                                <div style={{ flex: '1', paddingLeft: '0.5rem' }}>
                                    <p style={{ lineHeight: '1' }}>
                                        본 프로젝트는 파파레서피의 자연주의 브랜드 철학을 현대적인 감각으로 재해석한 디자인 중심의 웹 리뉴얼 작업입니다.
                                    </p>
                                    <p style={{ marginBottom: '1.5rem', lineHeight: '1' }}>
                                        팀 리더로서 프로젝트 전반을 총괄하며, 브랜드 정체성의 일관성 확립과 반응형 웹 환경에 최적화된 구현을 핵심 목표로 설정했습니다.
                                    </p>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', columnGap: '1.5rem', rowGap: '1rem' }}>
                                        <div>
                                            <h4 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#fff', marginBottom: '0.2rem' }}>· Design Leadership</h4>
                                            <p style={{ lineHeight: '1.3' }}>
                                                브랜드 철학을 반영한 디자인 시스템을 정의하고, 팀의 시각적 결과물이 일관된 톤앤매너로 완성되도록 방향성과 기준을 주도했습니다.
                                            </p>
                                        </div>

                                        <div>
                                            <h4 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#fff', marginBottom: '0.2rem' }}>· AI Visual Directing</h4>
                                            <p style={{ lineHeight: '1.3' }}>
                                                Midjourney AI를 활용한 비주얼 제작을 리드하며, 프롬프트 전략 수립부터 결과물 선별까지 전 과정을 관리했습니다.
                                                <br />
                                                반복적인 실험과 정제 과정을 통해 브랜드에 적합한 고퀄리티 비주얼 톤을 완성했습니다.
                                            </p>
                                        </div>

                                        <div>
                                            <h4 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#fff', marginBottom: '0.2rem' }}>· Creative Planning</h4>
                                            <p style={{ lineHeight: '1.3' }}>
                                                Gemini를 활용해 추상적인 영상 흐름을 구조화하고, 팀원들이 즉시 활용할 수 있는 기획안으로 구체화했습니다.
                                            </p>
                                        </div>

                                        <div>
                                            <h4 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#fff', marginBottom: '0.2rem' }}>· Bridge Role</h4>
                                            <p style={{ lineHeight: '1.3' }}>
                                                AI 비주얼과 웹 구현 간의 간극을 줄이기 위해 디자인·개발 간 커뮤니케이션을 주도했습니다.
                                            </p>
                                        </div>

                                        <div style={{ gridColumn: '1 / -1' }}>
                                            <h4 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#fff', marginBottom: '0.2rem' }}>· Core Value</h4>
                                            <p style={{ lineHeight: '1.3' }}>
                                                본 프로젝트는 AI 기반 디자인 프로세스로 반응형 웹 완성도와 팀 협업 효율을 함께 높인 프로젝트입니다.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    />

                    <WorkGalleryItem
                        image={workImg2}
                        title="Force1 APP"
                        sub="2026 EZEN Academy Team Project | Team Leader"
                        marginTop="8rem"
                        uxLink="https://www.figma.com/design/1770h8SO1bWlGHzLjKFqFJ/%EC%9C%A0%EC%88%98%EC%9D%B8-%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4?node-id=1-3&t=qBve6p0Epz02VnwW-1"
                        siteLink="https://force1-five.vercel.app/"
                        conceptText={
                            <div style={{ display: 'flex', gap: '1rem', textAlign: 'left', color: '#ccc', width: '100%', fontSize: '1rem' }}>
                                <div style={{ flex: '0 0 20%', borderRight: '1px solid rgba(255, 255, 255, 0.3)', paddingRight: '1rem', display: 'flex', alignItems: 'baseline' }}>
                                    <h3 style={{ fontSize: '1.75rem', fontWeight: '600', color: '#fff', lineHeight: '1.3', margin: 0 }}>
                                        Force1 APP <span style={{ display: 'block', fontSize: '1.05rem', fontWeight: '400', marginTop: '0.5rem', color: '#aaa' }}>국내 F1 팬덤을 위한<br />정보·커뮤니티 중심<br />반응형 프로젝트</span>
                                    </h3>
                                </div>

                                <div style={{ flex: '1', paddingLeft: '0.5rem' }}>
                                    <p style={{ marginBottom: '0.1rem', lineHeight: '1.3' }}>
                                        본 프로젝트는 국내 Formula 1 팬들을 위한 팬덤 플랫폼으로, 경기 정보와 커뮤니티 경험을 하나의 흐름으로 연결한 APP 프로젝트입니다.
                                    </p>
                                    <p style={{ marginBottom: '1.5rem', lineHeight: '1.3' }}>
                                        팀 리더로서 기획부터 UX/UI 구조 설계까지 프로젝트 전반을 총괄하며, 명확한 정보 전달과 사용자 몰입도를 핵심 가치로 설계했습니다.
                                    </p>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', columnGap: '1.5rem', rowGap: '1rem' }}>
                                        <div>
                                            <h4 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#fff', marginBottom: '0.2rem' }}>· Design Leadership</h4>
                                            <p style={{ lineHeight: '1.3' }}>
                                                F1 팬덤의 성격을 반영한 시각적 톤과 레이아웃 기준을 수립하고, 정보 밀도가 높은 콘텐츠를 효과적으로 전달할 수 있도록 디자인 방향을 주도했습니다.
                                            </p>
                                        </div>

                                        <div>
                                            <h4 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#fff', marginBottom: '0.2rem' }}>· Service Planning</h4>
                                            <p style={{ lineHeight: '1.3' }}>
                                                경기 일정, 드라이버 정보, 결과 데이터 등 주요 콘텐츠의 구조를 정의하고, 사용자가 빠르게 탐색할 수 있는 사용자 흐름을 설계했습니다.
                                            </p>
                                        </div>

                                        <div>
                                            <h4 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#fff', marginBottom: '0.2rem' }}>· UX Problem Solving</h4>
                                            <p style={{ lineHeight: '1.3' }}>
                                                정보량이 많은 환경에서 가독성과 사용성을 동시에 확보하는 것이 가장 큰 과제였으며, 반복적인 화면 개선과 사용자 흐름 조정을 통해 이를 해결했습니다.
                                            </p>
                                        </div>

                                        <div>
                                            <h4 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#fff', marginBottom: '0.2rem' }}>· Bridge Role</h4>
                                            <p style={{ lineHeight: '1.3' }}>
                                                기획, 디자인, 개발 간의 요구사항을 조율하며 기능 구현 과정에서 발생한 이슈를 정리하고 해결 방향을 제시했습니다.
                                            </p>
                                        </div>

                                        <div style={{ gridColumn: '1 / -1' }}>
                                            <h4 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#fff', marginBottom: '0.2rem' }}>· Core Value</h4>
                                            <p style={{ lineHeight: '1.3' }}>
                                                본 프로젝트는 팬 경험 중심의 UX 설계와 팀 리딩을 통해 반응형 환경에서도 완성도 높은 팬덤 서비스를 구현한 사례입니다.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    />

                    <WorkGalleryItem
                        images={[workImg3, workImg3_1]}
                        title="Promotion"
                        sub="2024 Kyowon Tour"
                        marginTop="8rem"
                        noButtons={true}
                        overlay={
                            <div className="work-overlay-text">
                                <h3>2024 교원투어 가정의 달</h3>
                                <p>
                                    가정의 달 시즌성 메시지를 ‘HI-FIVE’ 콘셉트로 시각화해 함께 하는 순간의 즐거움과 축하의 의미를 감각적으로 표현했습니다.
                                    <br /><br />
                                    하이파이브 모션을 활용해 페이지 진입 시 시선을 유도하고 혜택 중심의 정보 구조로 복잡한 프로모션 내용을 명확하게 정리했습니다.
                                    <br /><br />
                                    타겟별 여행 큐레이션을 통해 사용자에게 맞는 선택을 직관적으로 제안했습니다.
                                </p>
                            </div>
                        }
                    />

                    <WorkGalleryItem
                        images={[workImg4, workImg4_1]}
                        title="Promotion"
                        sub="2024 Kyowon Tour"
                        marginTop="8rem"
                        noButtons={true}
                        overlayPosition="left"
                        overlay={
                            <div className="work-overlay-text">
                                <h3>홈쇼핑 프로모션 <span style={{ fontWeight: '300', margin: '0 5px' }}>|</span> 두바이를 사랑한 튀르키예</h3>
                                <p>
                                    교원투어 홈쇼핑 프로모션을 위한 튀르키예&두바이 10일을 작업했습니다.
                                    <br />
                                    두 도시의 대비되는 매력을 메인 비주얼로 강조해 여행의 기대감을 높였으며,
                                    <br />
                                    핵심 혜택과 일정 포인트를 한 눈에 인지할 수 있는 정보 구조로 설계 했습니다.
                                    <br /><br />
                                    체크 포인트 · 도시별 하이라이트 · 지도 기반 일정 안내를 통해
                                    <br />
                                    복잡한 상품 정보를 직관적이고 신뢰감 있게 전달 했습니다.
                                </p>
                            </div>
                        }
                    />

                    <WorkGalleryItem
                        images={[workImg5, workImg5_1]}
                        title="Promotion"
                        sub="2023 Kyowon Tour"
                        marginTop="8rem"
                        noButtons={true}
                        overlay={
                            <div className="work-overlay-text">
                                <h3>채널A 여행설계자들</h3>
                                <p>
                                    여행이지와 채널A가 합작한 여행 예능 콘텐츠를 기반으로 디자인 작업했습니다.
                                    <br /><br />
                                    일러스트 중심의 밝은 톤앤매너로 예능 콘셉트를 시각화하고, 여행지 상품을 VS 구조로 비교 제안해 선택을 돕는 UX를 설계했습니다.
                                    <br /><br />
                                    혜택과 이벤트 정보를 카드형 UI와 명확한 CTA로 구성해 콘텐츠 시청에서 상품 전환까지 자연스럽게 연결했습니다.
                                </p>
                            </div>
                        }
                    />

                    <WorkGalleryHeader
                        leftText="Clone"
                        rightText="Cording"
                        marginTop="15rem"
                        isClone={true}
                    />

                    <WorkGalleryItem
                        image={cloneImg1}
                        title="Musign"
                        marginTop="1rem"
                        align="left"
                        noButtons={true}
                        rightText="2026"
                        link="https://suin-yu.github.io/Musign/"
                    />

                    <WorkGalleryItem
                        image={cloneImg2}
                        title="Y.Studio"
                        marginTop="8rem"
                        align="right"
                        noButtons={true}
                        rightText="2026"
                        link="https://suin-yu.github.io/Y_Studio/"
                    />

                    <WorkGalleryItem
                        image={cloneImg3}
                        title="Crew a la mode"
                        marginTop="8rem"
                        align="left"
                        noButtons={true}
                        rightText="2026"
                        link="https://suin-yu.github.io/Crew_a_la_mode/"
                    />

                    <WorkGalleryItem
                        image={cloneImg4}
                        title="Phomein"
                        marginTop="8rem"
                        align="right"
                        noButtons={true}
                        rightText="2026"
                        link="https://suin-yu.github.io/Phomein/"
                    />

                    <WorkGalleryItem
                        image={cloneImg5}
                        title="Hanhwa"
                        marginTop="8rem"
                        marginBottom="8rem"
                        align="left"
                        noButtons={true}
                        rightText="2026"
                        link="https://suin-yu.github.io/Hanhwa/"
                    />

                    <WorkGalleryHeader
                        leftText="SNS"
                        rightText="Contents"
                        marginTop="8rem"
                    />

                    <div className="sns-marquee-container">
                        <div className="sns-marquee-track">
                            <img src={snsImg1} alt="SNS Contents" />
                            <img src={snsImg2} alt="SNS Contents" />
                            <img src={snsImg3} alt="SNS Contents" />
                            <img src={snsImg4} alt="SNS Contents" />
                            <img src={snsImg5} alt="SNS Contents" />
                            <img src={snsImg6} alt="SNS Contents" />

                            {/* Duplicate for infinite loop */}
                            <img src={snsImg1} alt="SNS Contents" />
                            <img src={snsImg2} alt="SNS Contents" />
                            <img src={snsImg3} alt="SNS Contents" />
                            <img src={snsImg4} alt="SNS Contents" />
                            <img src={snsImg5} alt="SNS Contents" />
                            <img src={snsImg6} alt="SNS Contents" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Work;

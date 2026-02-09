import React, { useRef, useEffect, useState } from 'react';
import './AboutProfile.css';
import profileImg from '../assets/img/profile.png';

const AboutProfile = () => {
    const sectionRef = useRef(null);
    const eduRef = useRef(null);
    const [stickyOpacity, setStickyOpacity] = useState(1);

    useEffect(() => {
        const handleScroll = () => {
            if (!eduRef.current) return;
            const { top } = eduRef.current.getBoundingClientRect();
            const winH = window.innerHeight;

            // Start fading when Education card top reaches 80% of viewport
            // Complete fade (opacity 0) when it reaches 20% of viewport
            const startFade = winH * 0.8;
            const endFade = winH * 0.2;
            const range = startFade - endFade;

            let op = (top - endFade) / range;
            op = Math.max(0, Math.min(1, op));

            setStickyOpacity(op);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Init
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    // Helper to wrap numbers in spans for styling
    const formatPeriod = (text) => {
        return text.split(/(\d+)/).map((part, i) =>
            /\d+/.test(part) ? <span key={i} className="num">{part}</span> : part
        );
    };

    const careers = [
        {
            type: 'career',
            period: "6개월",
            date: "2025. 8 ~ 2026. 2",
            headerSub: "",
            bodyTitle: "강남 이젠 아카데미 | UXUI디자인&웹기획 프론트엔드 부트캠프 수료",
            details: [
                "AI를 활용한 UX 리서치와 사용자 흐름 설계를 기반으로 UX/UI 디자인 역량 강화",
                "웹 기획부터 프론트엔드 구현까지 연결하는 실무 중심 과정 이수"
            ]
        },
        {
            type: 'career',
            period: "2년 10개월",
            date: "2022. 1 ~ 2024. 10",
            headerSub: "교원투어 / 매니저",
            bodyTitle: "담당업무 | 이벤트 프로모션, 홈페이지 운영/UX·UI 개선",
            details: [
                "매출 폭발적 성장: 2022년(100억) 대비 2023년 매출 364억 원 달성 (264% 성장)",
                "수익 구조 개선: 고마진 패키지 집중 프로모션으로 여행알선수익 374% 증대 기여",
                "라이브 커머스 활성화: '이지라이브' 운영 최적화를 통해 월평균 거래액 217% 증가",
                "운영 효율화: 마케팅 최적화로 영업비용 비중 2.5%p 절감 및 전환율 극대화"
            ]
        },
        {
            type: 'career',
            period: "11년 3개월",
            date: "2010. 4 ~ 2021. 7",
            headerSub: "모두투어 / 과장",
            bodyTitle: "담당업무 | 프로모션 작업, 제휴·BP·대리점 웹/SNS 관리, 외부 웹 프로젝트 수행",
            details: [
                "영업이익 163% 성장 견인: 2010년(122억) 대비 역대 최고치 321억 달성 기여",
                "고마진 직판 구조 확립: '오반할' 프로모션 운영으로 수수료 절감 및 직판 이익 확대",
                "모바일 거래액 퀀텀 점프: 모바일 퍼스트 전략을 통한 모바일 예약 비중 40% 돌파",
                "B2B 운영 프로세스 혁신: 시스템 고도화로 지원 프로세스 30% 단축 및 효율 극대화"
            ]
        },
        {
            type: 'career',
            period: "1년 1개월",
            date: "2009. 3 ~ 2010. 3",
            headerSub: "한국옐로우페이지 / 사원",
            bodyTitle: "담당업무 | 중소기업 홈페이지 리뉴얼 및 관리",
            details: [
                "정부지원 해외진출 사업을 통해 중소기업 웹사이트 리뉴얼과 온라인 홍보를 추진",
                "해외 문의 20% 이상 증가 성과 달성",
                "수출 계약으로 이어지는 디지털 영업 기반 구축에 기여"
            ]
        },
        {
            type: 'career',
            period: "1년 1개월",
            date: "2008. 3 ~ 2010. 3",
            headerSub: "브이애드 / 사원",
            bodyTitle: "담당업무 | 광고디자인, 웹디자인, 웹마케팅",
            details: [
                "병원 홍보 마케팅 전담으로 온·오프라인 연계 홍보 전략 수행",
                "지속적인 채널 관리로 고객 유입 흐름을 개선하고 매출 상승에 기여"
            ]
        },
        {
            type: 'orange',
            category: "자격증",
            date: "2008.11",
            headerSub: "한국산업인력공단",
            bodyTitle: "컬러리스트 산업기사",
            details: [
                "데이터 기반 분석과 색채 심리학을 결합한 UX/UI를 통해 가독성과 브랜드 일관성을 확보하고",
                "최적화된 사용자 여정으로 고객 전환율 및 비즈니스 매출 성장을 견인합니다."
            ]
        },
        {
            type: 'orange',
            category: "학력",
            eduBlocks: [
                {
                    title: "2006. 3~2008. 2 부천대학교 광고디자인과 졸업",
                    desc: [
                        "디자인 실무 기초: 레이아웃, 색채, 타이포그래피 등 시각 전달 원리 습득",
                        "전략적 시각화: 소비자 인사이트 기반의 광고 컨셉 도출 및 비주얼 구현 역량 확보",
                        "학업 성실성 입증: 평점 3.41/4.5 달성으로 디자인 및 기획의 탄탄한 기초 역량 증명"
                    ]
                },
                {
                    title: "2011. 9~2013. 8 한양사이버대학교 디지털디자인학과 졸업",
                    desc: [
                        "디지털 디자인 전문성: 웹·모바일 UI/UX 중심의 온라인 플랫폼 디자인 역량 확보",
                        "실무 확장: 광고·디지털 통합 역량 기반의 온·오프라인 플랫폼 운영 전문성 확보",
                        "우수한 학업 성취도: 평점 3.85/4.5 달성으로 디지털 디자인 기획 및 실무 역량 입증"
                    ]
                }
            ]
        }
    ];

    return (
        <section id="about-profile" className="about-profile-section" ref={sectionRef} data-theme="dark">
            <div className="profile-container">
                {/* Left Side: Sticky */}
                <div className="profile-left">
                    <div className="sticky-content" style={{ opacity: stickyOpacity, transition: 'opacity 0.1s linear' }}>
                        <h2 className="profile-title">
                            <span className="text-orange">Why</span> <span className="text-gray">work</span><br />
                            <span className="text-gray">with</span> <span className="text-orange">me</span>
                        </h2>
                        <div className="profile-img-box">
                            <img src={profileImg} alt="Profile" className="profile-img" />
                        </div>
                    </div>
                </div>

                {/* Right Side: Scrollable */}
                <div className="profile-right">
                    <div className="career-list">
                        {careers.map((item, index) => {
                            // Render Orange Card (Cert/Edu)
                            if (item.type === 'orange') {
                                return (
                                    <div className="career-card orange-card" key={index} ref={item.category === '자격증' ? eduRef : null}>
                                        <div className="card-header orange-header">
                                            <h3 className="card-category">{item.category}</h3>
                                            {(item.date || item.headerSub) && (
                                                <div className="card-header-right orange-right">
                                                    {item.date && <span className="card-date orange-date">{item.date}</span>}
                                                    {item.headerSub && <span className="card-sub orange-sub">{item.headerSub}</span>}
                                                </div>
                                            )}
                                        </div>
                                        <div className="card-body">
                                            {item.eduBlocks ? (
                                                // Education layout with blocks
                                                <div className="edu-container">
                                                    {item.eduBlocks.map((block, bIdx) => (
                                                        <div className="edu-block" key={bIdx}>
                                                            <h4 className="edu-title">{block.title}</h4>
                                                            <ul className="card-details orange-details">
                                                                {block.desc.map((line, l) => <li key={l}>{line}</li>)}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                // Standard Orange Layout (Cert)
                                                <>
                                                    {item.bodyTitle && <h4 className="card-body-title orange-title">{item.bodyTitle}</h4>}
                                                    <ul className="card-details orange-details">
                                                        {item.details.map((detail, i) => (
                                                            <li key={i}>{detail}</li>
                                                        ))}
                                                    </ul>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                );
                            }

                            // Render Standard White Card
                            return (
                                <div className="career-card" key={index}>
                                    <div className="card-header">
                                        <h3 className="card-period">{formatPeriod(item.period)}</h3>
                                        <div className="card-header-right">
                                            <span className="card-date">{item.date}</span>
                                            {item.headerSub && <span className="card-sub">{item.headerSub}</span>}
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <h4 className="card-body-title">{item.bodyTitle}</h4>
                                        <ul className="card-details">
                                            {item.details.map((detail, i) => (
                                                <li key={i}>{detail}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            );
                        })}
                        <div className="career-end-spacer"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutProfile;

'use client';
import CarouselComponent from '@/app/components/portfolio/CarouselComponent';
import LatestTrack from "@/app/components/portfolio/LatestTrack";
import VideoCarousel from "@/app/components/portfolio/VideoCarousal";
import styled from 'styled-components';
import Footer from "@/app/components/layout/Footer";
import SocialMedia from "@/app/components/common/SocialMedia";
import MarucciStory from "@/app/components/portfolio/MarucciStory";
import MarucciStorySection from "@/app/components/portfolio/AboutMarucci";
import LanguageToggle from "./components/common/LanguageToggle";
import { useLanguage } from "./hooks/LanguageContext";
import React, { useState, useEffect } from 'react';

// Elegant Gradient Separator
const GradientSeparator = styled.div`
    height: 4px;
    width: 80%;
    margin: 50px auto;
    background: linear-gradient(to right, rgba(0, 0, 0, 0), #333, rgba(0, 0, 0, 0));
    opacity: 0.8;
    border-radius: 2px;
`;

const LoadingOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #111;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999;
    font-size: 2rem;
    font-weight: bold;
    letter-spacing: 2px;
    transition: opacity 0.3s;
    pointer-events: all;
    opacity: 1;
`;

export default function Home() {
    // Prepare for translation usage
    const { t } = useLanguage();
    const [hydrated, setHydrated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showStory, setShowStory] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    useEffect(() => {
        if (hydrated) {
            // Wait a bit to ensure fonts/styles are loaded
            const timeout = setTimeout(() => setLoading(false), 400);
            return () => clearTimeout(timeout);
        }
    }, [hydrated]);

    return (
        <>
            {loading && (
                <LoadingOverlay>
                    Loading...
                </LoadingOverlay>
            )}
            {!loading && (
                <>
                    <LanguageToggle />
                    <main>
                        <SocialMedia/>
                        {/* Carousel Section */}
                        <section id="home">
                            <CarouselComponent />
                        </section>
                        {/* Latest Track Section */}
                        <section id="latest">
                            <LatestTrack />
                        </section>
                        {/* Elegant Gradient Separator */}
                        <GradientSeparator />
                        {/* Video Carousel Section */}
                        <section id="videos">
                            <VideoCarousel />
                        </section>
                        {/* Marucci's Story Section */}
                        <section id="marucci-story" style={{ marginTop: 60, marginBottom: 60, maxWidth: '80%', marginLeft: 'auto', marginRight: 'auto', position: 'relative' }}>
                          <div style={{ display: 'flex', padding: '2rem 0rem', position: 'relative', width: '50%' }}>
                            <h1 style={{
                              fontSize: '2.5rem',
                              fontWeight: 600,
                              color: 'white',
                              textTransform: 'uppercase',
                              letterSpacing: '2px',
                              padding: '10px 20px',
                              width: '100%',
                              background: 'linear-gradient(to right, black 75%, rgba(0, 0, 0, 0))',
                              textAlign: 'left',
                              margin: 0
                            }}>

                              Marucci&apos;s Story
                            </h1>
                          </div>
                          <MarucciStorySection onReadMore={() => setShowStory(true)} />
                        </section>
                        {/* Marucci's Story Modal */}
                        <MarucciStory open={showStory} onClose={() => setShowStory(false)} />
                        <Footer />
                    </main>
                </>
            )}
        </>
    );
}

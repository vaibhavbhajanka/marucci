'use client';
import Head from 'next/head';
import CarouselComponent from '@/app/components/CarouselComponent';
import LatestTrack from "@/app/components/LatestTrack";
import VideoCarousel from "@/app/components/VideoCarousal";
import styled from 'styled-components';
import Footer from "@/app/components/Footer";
import SocialMedia from "@/app/components/SocialMedia";
import LanguageToggle from "./components/LanguageToggle";
import { useLanguage } from "./LanguageContext";
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
                    <Head>
                        <title>Marucci Official Website</title>
                        <meta name="description" content="Official website of Marucci"/>
                        {/* Favicon */}
                        <link rel="icon" href="/logo-white.png" type="image/png" sizes="32x32"/>
                    </Head>
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
                        <Footer />
                    </main>
                </>
            )}
        </>
    );
}

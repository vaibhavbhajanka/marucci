'use client';
import Image from 'next/image';
import styled from 'styled-components';
import SpotifyIcon from 'mdi-react/SpotifyIcon';
import YoutubeIcon from 'mdi-react/YoutubeIcon';
import { useLanguage } from "../LanguageContext";
import { useState, useEffect } from 'react';

// Styled-components for the container and the heading
const Container = styled.div`
    padding: 0px 60px 0px 60px;
    position: relative;
    color: #fff;
`;

// Wrapper for both heading and track section to ensure they have the same width
const ContentWrapper = styled.div`
    max-width: 80%;
    margin: 0 auto;
    position: relative;
`;

// Styled-components for the heading with a black strip background and fading effect
const HeadingWrapper = styled.div`
    display: flex;
    padding: 2rem 0rem;
    position: relative;
    width: 50%;
`;

const Heading = styled.h1`
    font-size: 2.5rem;
    font-weight: 600;
    color: white;
    text-transform: uppercase;
    letter-spacing: 2px;
    padding: 10px 20px;
    width: 100%;
    background: linear-gradient(to right, black 75%, rgba(0, 0, 0, 0)); /* Black strip with fading effect */
`;

// Styled-components for the section (Track Card)
const TrackSection = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 60px;
    color: #fff;
    border-radius: 20px;
    margin: 40px auto; /* Increased margin for more space between heading and card */
    width: 100%; /* Match the width of the heading */
    background: linear-gradient(135deg, #1a1a1a 0%, #333 100%);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
`;

const TrackInfo = styled.div`
    max-width: 55%;
    text-align: left;
`;

const TrackName = styled.h2`
    font-size: 3rem;
    margin-bottom: 20px;
    color: #fff;
    text-shadow: 2px 4px 10px rgba(0, 0, 0, 0.9);
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
    z-index: 1;
`;

const ArtistName = styled.h3`
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #ffffff;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    text-transform: uppercase;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 15px;
    padding: 40px 0px;
`;

const PlayButton = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 25px;
    font-size: 1rem;
    color: #fff;
    background-color: ${({ $bgColor }) => $bgColor || '#1DB954'};
    border-radius: 50px;
    text-decoration: none;
    transition: all 0.3s ease-in-out;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);

    &:hover {
        background-color: ${({ $hoverColor }) => $hoverColor || '#1ed760'};
        transform: translateY(-3px);
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.5);
    }

    svg {
        margin-right: 10px;
        font-size: 1.5rem;
    }
`;

const Thumbnail = styled.div`
    width: 35%;
    padding-top: 35%;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.7);
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.05);
    }

    /* Overlay for "NOW AVAILABLE" text */
    &::after {
        content: "NOW AVAILABLE";
        position: absolute;
        bottom: 10px;
        right: 10px;
        background-color: rgba(0, 0, 0, 0.7);
        color: #ffffff;
        padding: 5px 15px;
        border-radius: 5px;
        font-size: 1rem;
        font-weight: bold;
        text-transform: uppercase;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
        z-index: 10;
    }
`;

// Styled-components for the loading state
const LoadingWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;  /* Full viewport height */
    text-align: center;
`;

const LoadingText = styled.p`
    font-size: 1.5rem;
    margin-top: 20px;
    color: #000;
    font-weight: bold;
`;

const LatestTrack = () => {
    const { t } = useLanguage();
    const [spotifyError, setSpotifyError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [track, setTrack] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetch('/api/spotify-latest-track')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch latest track');
                return res.json();
            })
            .then(data => {
                setTrack(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const TranslatedThumbnail = styled(Thumbnail)`
        &::after {
            content: '${t("now_available")}';
        }
    `;
    // Extract Spotify track ID from URL
    const getSpotifyTrackId = (url) => {
        const match = url.match(/track\/([a-zA-Z0-9]+)/);
        return match ? match[1] : null;
    };
    const spotifyTrackId = track && track.external_urls ? getSpotifyTrackId(track.external_urls.spotify) : null;
    return (
        <Container>
            <ContentWrapper>
                <HeadingWrapper>
                    <Heading>{t("latest_track")}</Heading>
                </HeadingWrapper>
                <TrackSection>
                    {
                        loading ? (
                            <LoadingWrapper>
                                <LoadingText>{t("loading_latest_track")}</LoadingText>
                            </LoadingWrapper>
                        ) : error ? (
                            <LoadingWrapper>
                                <LoadingText>{t("failed_to_load_track")}</LoadingText>
                            </LoadingWrapper>
                        ) : track ? (
                            <>
                                <TrackInfo>
                                    <TrackName>{track.name}</TrackName>
                                    <ArtistName>{t("album").toUpperCase()} | {track.album.name}</ArtistName>
                                    <ButtonContainer>
                                        <PlayButton
                                            href={track.external_urls.spotify}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            $bgColor="#000"
                                            $hoverColor="#1ed760"
                                        >
                                            <SpotifyIcon />
                                            {t("listen_on_spotify")}
                                        </PlayButton>
                                        <PlayButton
                                            href={track.youtube_url || `https://www.youtube.com`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            $bgColor="#000"
                                            $hoverColor="#ff4d4d"
                                        >
                                            <YoutubeIcon />
                                            {t("listen_on_youtube")}
                                        </PlayButton>
                                    </ButtonContainer>
                                    {/* Spotify Embed */}
                                    {spotifyTrackId && !spotifyError && (
                                        <div style={{ margin: '20px 0', maxWidth: 400 }}>
                                            <iframe
                                                src={`https://open.spotify.com/embed/track/${spotifyTrackId}?utm_source=generator`}
                                                width="100%"
                                                height="80"
                                                frameBorder="0"
                                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                                loading="lazy"
                                                title="Spotify Player"
                                                style={{ borderRadius: 12, minWidth: 200 }}
                                                onError={() => setSpotifyError(true)}
                                            />
                                        </div>
                                    )}
                                    {/* Fallback if Spotify embed fails */}
                                    {spotifyError && (
                                        <div style={{ margin: '20px 0' }}>
                                            <PlayButton
                                                href={`https://www.youtube.com/watch?v=LzbGadeMY1M`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                $bgColor="#ff0000"
                                                $hoverColor="#ff4d4d"
                                            >
                                                <YoutubeIcon />
                                                {t("listen_on_youtube")}
                                            </PlayButton>
                                            <div style={{ color: '#ffaaaa', marginTop: 8, fontWeight: 'bold' }}>{t("spotify_embed_unavailable")}</div>
                                        </div>
                                    )}
                                </TrackInfo>
                                <TranslatedThumbnail>
                                    <Image
                                        src={track.album.images && track.album.images[0] ? track.album.images[0].url : '/super.webp'}
                                        alt={track.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        style={{ objectFit: 'cover' }}
                                    />
                                </TranslatedThumbnail>
                            </>
                        ) : null
                    }
                </TrackSection>
            </ContentWrapper>
        </Container>
    );
};

export default LatestTrack;

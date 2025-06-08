import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styled from 'styled-components';
import PlayCircleOutlineIcon from 'mdi-react/PlayCircleOutlineIcon';
import { useLanguage } from "../../hooks/LanguageContext";

const Container = styled.div`
    --swiper-navigation-size: 1.5rem;
    max-width: 124rem;
    padding: 2rem 1rem;
    margin: 0 auto;
`;

const SwiperContainer = styled(Swiper)`
    height: 35rem;
    padding: 2rem 0;
    position: relative;
`;

const SliderControler = styled.div`
    position: absolute;
    top: 50%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 2rem;
    transform: translateY(-50%);
    z-index: 10;
`;

const SliderArrow = styled.div`
    background: white;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    filter: drop-shadow(0px 8px 24px rgba(18, 28, 53, 0.1));
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    cursor: pointer;

    ion-icon {
        font-size: 1rem;
        color: #000;
    }

    &:hover {
        background-color: #e0e0e0;
    }
`;

const PaginationStyled = styled.div`
    position: relative;
    bottom: 1rem;
    .swiper-pagination-bullet-active {
        background: #000;
    }
`;

const IframeWrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #000;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
    z-index: 1000;

    iframe {
        width: 840px;
        height: 472px;
    }
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.7);
`;

const SwiperSlideStyled = styled(SwiperSlide)`
    width: 45rem;
    height: 25rem;
    position: relative;
    background-color: transparent;
`;

const Thumbnail = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background-image: ${({ $thumbnail }) => `url(${$thumbnail})`};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 3rem;
    overflow: hidden;
    background-color: transparent;

    svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 4rem;
    }
`;

const HeadingWrapper = styled.div`
    display: flex;
    padding: 2rem 0rem;
    position: relative;
    width: 40%;
    left:13%;
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

const Underline = styled.div`
    height: 10px;
    width: 150px;
    margin-top: 10px;
    background-color: #000;
`;

const TitleStrip = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7); // Semi-transparent black background
    color: white;
    text-align: center;
    padding: 0.5rem 1rem;
    font-size: 1.2rem;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    border-bottom-left-radius: 3rem;
    border-bottom-right-radius: 3rem;
`;

const VideoCarousel = () => {
    const { t } = useLanguage();
    const [videos, setVideos] = useState([]);
    const [activeVideo, setActiveVideo] = useState(null);
    const [videoTitle, setVideoTitle] = useState('');

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const channelId = 'UCu_qna2BIiOgNMB1pFzKENg'; // Replace with your channel ID
                const response = await fetch(`/api/youtube?channelId=${channelId}`);
                const data = await response.json();
                setVideos(data);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };
        fetchVideos();
    }, []);

    const handleVideoClick = (videoId, title) => {
        setActiveVideo(videoId);
        setVideoTitle(title);
    };

    const handleClose = () => {
        setActiveVideo(null);
        setVideoTitle('');
    };

    return (
        <Container>
            <HeadingWrapper>
                <Heading>{t("video_carousel_title")}</Heading>
            </HeadingWrapper>
            <SwiperContainer
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                }}
                pagination={{ el: '.swiper-pagination', clickable: true }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    clickable: true,
                }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="swiper_container"
            >
                {Array.isArray(videos) && videos.length > 0 ? (
                    videos.map((video) => (
                        <SwiperSlideStyled key={video.videoId}>
                            <Thumbnail
                                $thumbnail={video.thumbnail}
                                onClick={() => handleVideoClick(video.videoId, video.title)}
                            >
                                <TitleStrip>{video.title}</TitleStrip>
                                <PlayCircleOutlineIcon />
                            </Thumbnail>
                        </SwiperSlideStyled>
                    ))
                ) : (
                    <div style={{ color: '#fff', textAlign: 'center', padding: '3rem 0', fontSize: '1.25rem' }}>
                        Sorry, videos are currently unavailable. Please try again later.
                    </div>
                )}

                <SliderControler>
                    <SliderArrow className="swiper-button-prev slider-arrow">
                        <ion-icon name="arrow-back-outline"></ion-icon>
                    </SliderArrow>
                    <SliderArrow className="swiper-button-next slider-arrow">
                        <ion-icon name="arrow-forward-outline"></ion-icon>
                    </SliderArrow>
                </SliderControler>
                <PaginationStyled className="swiper-pagination"></PaginationStyled>
            </SwiperContainer>

            {activeVideo && (
                <>
                    <Overlay onClick={handleClose} />
                    <IframeWrapper>
                        <iframe
                            src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </IframeWrapper>
                </>
            )}
        </Container>
    );
};

export default VideoCarousel;

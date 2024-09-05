// import {useState} from 'react';
// import styled from 'styled-components';
// import PlayCircleOutlineIcon from 'mdi-react/PlayCircleOutlineIcon';
// import ChevronLeftIcon from 'mdi-react/ChevronLeftIcon';
// import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
//
// const CarouselWrapper = styled.div`
//     position: relative;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     padding: 50px 0;
//     overflow: hidden;
// `;
//
// const VideoContainer = styled.div`
//     display: flex;
//     align-items: center;
//     position: relative;
//     perspective: 1000px;
//     transition: transform 0.5s ease-in-out;
// `;
//
// const VideoThumbnail = styled.div`
//     width: 300px;
//     height: 200px;
//     background-image: ${({thumbnail}) => `url(${thumbnail})`};
//     background-size: cover;
//     background-position: center;
//     border-radius: 10px;
//     box-shadow: 0 4px 15px rgba(0, 0, 0, 0.7);
//     transition: transform 0.5s ease-in-out;
//     position: relative;
//     z-index: ${({zIndex}) => zIndex || 1};
//     cursor: pointer;
//     margin: 0 20px;
//
//     &:hover {
//         transform: scale(1.1) rotateY(20deg);
//     }
//
//     &.active {
//         transform: scale(1.2) rotateY(0deg);
//         z-index: 10;
//     }
//
//     &:before {
//         content: '';
//         position: absolute;
//         top: 0;
//         left: 0;
//         width: 100%;
//         height: 100%;
//         background: rgba(0, 0, 0, 0.3);
//         border-radius: 10px;
//     }
//
//     svg {
//         position: absolute;
//         top: 50%;
//         left: 50%;
//         transform: translate(-50%, -50%);
//         color: white;
//         font-size: 3rem;
//     }
// `;
//
// const IframeWrapper = styled.div`
//     position: fixed;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     background-color: #000;
//     padding: 20px;
//     border-radius: 10px;
//     box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
//     z-index: 1000;
//
//     iframe {
//         width: 560px;
//         height: 315px;
//     }
// `;
//
// const Overlay = styled.div`
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background-color: rgba(0, 0, 0, 0.7);
//     z-index: 999;
// `;
//
// const ArrowButton = styled.button`
//     position: absolute;
//     top: 50%;
//     transform: translateY(-50%);
//     background: none;
//     border: none;
//     color: black;
//     cursor: pointer;
//     z-index: 100;
//     padding: 10px;
//
//     svg {
//         font-size: 2.5rem;
//     }
//
//     &:hover {
//         color: #333;
//     }
//
//     &:disabled {
//         cursor: not-allowed;
//         opacity: 0.5;
//     }
// `;
//
// const LeftArrowButton = styled(ArrowButton)`
//     left: 20px; /* Positioning the left arrow */
// `;
//
// const RightArrowButton = styled(ArrowButton)`
//     right: 20px; /* Positioning the right arrow */
// `;
// <iframe width="996" height="560"
//         src="https://www.youtube.com/embed/eue4640L_Ws?list=OLAK5uy_l3zSrJ354ORQ8H7nW_15roPz8qVWvNau4"
//         title="Marucci Ft Lennox, Eix- Tu Aroma [Video Concept]" frameBorder="0"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//         referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
//
// const videos = [
//     {id: 1, thumbnail: 'https://img.youtube.com/vi/3XUhxJdNhK8/maxresdefault.jpg', videoId: '3XUhxJdNhK8'},
//     {id: 2, thumbnail: 'https://img.youtube.com/vi/4UgQYTkjzyI/maxresdefault.jpg', videoId: '4UgQYTkjzyI'},
//     {id: 3, thumbnail: 'https://img.youtube.com/vi/v84SQm_pwrk/maxresdefault.jpg', videoId: 'v84SQm_pwrk'},
//     {id: 4, thumbnail: 'https://img.youtube.com/vi/eue4640L_Ws/maxresdefault.jpg', videoId: 'eue4640L_Ws'},
//     {id: 5, thumbnail: 'https://img.youtube.com/vi/LzbGadeMY1M/maxresdefault.jpg', videoId: 'LzbGadeMY1M'},
// ];
//
// const VideoCarousel = () => {
//     const [activeVideo, setActiveVideo] = useState(null);
//     const [currentIndex, setCurrentIndex] = useState(1);
//
//     const handleVideoClick = (videoId) => {
//         setActiveVideo(videoId);
//     };
//
//     const handleClose = () => {
//         setActiveVideo(null);
//     };
//
//     const handlePrevClick = () => {
//         setCurrentIndex((prevIndex) => (prevIndex === 0 ? videos.length - 1 : prevIndex - 1));
//     };
//
//     const handleNextClick = () => {
//         setCurrentIndex((prevIndex) => (prevIndex === videos.length - 1 ? 0 : prevIndex + 1));
//     };
//
//     return (
//         <CarouselWrapper>
//             <LeftArrowButton onClick={handlePrevClick} disabled={videos.length <= 1}>
//                 <ChevronLeftIcon/>
//             </LeftArrowButton>
//             <VideoContainer style={{transform: `translateX(-${currentIndex * 320}px)`}}>
//                 {videos.map((video, index) => (
//                     <VideoThumbnail
//                         key={video.id}
//                         thumbnail={video.thumbnail}
//                         onClick={() => handleVideoClick(video.videoId)}
//                         className={index === currentIndex ? 'active' : ''}
//                         zIndex={index === currentIndex ? 10 : index === currentIndex - 1 ? 5 : 1}
//                     >
//                         <PlayCircleOutlineIcon/>
//                     </VideoThumbnail>
//                 ))}
//             </VideoContainer>
//             <RightArrowButton onClick={handleNextClick} disabled={videos.length <= 1}>
//                 <ChevronRightIcon/>
//             </RightArrowButton>
//             {activeVideo && (
//                 <>
//                     <Overlay onClick={handleClose}/>
//                     <IframeWrapper>
//                         <iframe
//                             src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
//                             frameBorder="0"
//                             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                             allowFullScreen
//                         />
//                     </IframeWrapper>
//                 </>
//             )}
//         </CarouselWrapper>
//     );
// };
//
// export default VideoCarousel;
//
// import React, { useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/effect-coverflow';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import styled from 'styled-components';
// import PlayCircleOutlineIcon from 'mdi-react/PlayCircleOutlineIcon';
//
// const videos = [
//     { id: 1, thumbnail: 'https://img.youtube.com/vi/3XUhxJdNhK8/maxresdefault.jpg', videoId: '3XUhxJdNhK8' },
//     { id: 2, thumbnail: 'https://img.youtube.com/vi/4UgQYTkjzyI/maxresdefault.jpg', videoId: '4UgQYTkjzyI' },
//     { id: 3, thumbnail: 'https://img.youtube.com/vi/v84SQm_pwrk/maxresdefault.jpg', videoId: 'v84SQm_pwrk' },
//     { id: 4, thumbnail: 'https://img.youtube.com/vi/eue4640L_Ws/maxresdefault.jpg', videoId: 'eue4640L_Ws' },
//     { id: 5, thumbnail: 'https://img.youtube.com/vi/LzbGadeMY1M/maxresdefault.jpg', videoId: 'LzbGadeMY1M' },
// ];
//
// const Container = styled.div`
//     max-width: 124rem;
//     padding: 4rem 1rem;
//     margin: 0 auto;
// `;
//
// const SwiperContainer = styled(Swiper)`
//     height: 42rem;
//     padding: 2rem 0;
//     position: relative;
// `;
//
// const SwiperSlideStyled = styled(SwiperSlide)`
//     width: 40rem;
//     height: 25rem;
//     position: relative;
// `;
//
// const Thumbnail = styled.div`
//     position: relative;
//     width: 100%;
//     height: 100%;
//     background-image: ${({ thumbnail }) => `url(${thumbnail})`};
//     background-size: cover;
//     background-position: center;
//     border-radius: 2rem;
//     overflow: hidden;
//
//     svg {
//         position: absolute;
//         top: 50%;
//         left: 50%;
//         transform: translate(-50%, -50%);
//         color: white;
//         font-size: 4rem;
//     }
// `;
//
// const SliderControler = styled.div`
//     position: relative;
//     bottom: 2rem;
//     display: flex;
//     align-items: center;
//     justify-content: center;
// `;
//
// const SliderArrow = styled.div`
//     background: white;
//     width: 2rem;
//     height: 2rem;
//     border-radius: 50%;
//     filter: drop-shadow(0px 8px 24px rgba(18, 28, 53, 0.1));
//     display: flex;
//     align-items: center;
//     justify-content: center;
//
//     ion-icon {
//         font-size: 2rem;
//         color: #222224;
//     }
// `;
//
// const PaginationStyled = styled.div`
//     position: relative;
//     width: 15rem !important;
//     bottom: 1rem;
//
//     .swiper-pagination-bullet {
//         filter: drop-shadow(0px 8px 24px rgba(18, 28, 53, 0.1));
//     }
//
//     .swiper-pagination-bullet-active {
//         background: #6a59ff;
//     }
// `;
//
// const IframeWrapper = styled.div`
//     position: fixed;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     background-color: #000;
//     padding: 20px;
//     border-radius: 10px;
//     box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
//     z-index: 1000;
//
//     iframe {
//         width: 560px;
//         height: 315px;
//     }
// `;
//
// const Overlay = styled.div`
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background-color: rgba(0, 0, 0, 0.7);
//     z-index: 999;
// `;
//
// const VideoCarousel = () => {
//     const [activeVideo, setActiveVideo] = useState(null);
//
//     const handleVideoClick = (videoId) => {
//         setActiveVideo(videoId);
//     };
//
//     const handleClose = () => {
//         setActiveVideo(null);
//     };
//
//     return (
//         <Container>
//             <SwiperContainer
//                 effect={'coverflow'}
//                 grabCursor={true}
//                 centeredSlides={true}
//                 loop={true}
//                 slidesPerView={'auto'}
//                 coverflowEffect={{
//                     rotate: 0,
//                     stretch: 0,
//                     depth: 100,
//                     modifier: 2.5,
//                 }}
//                 pagination={{ el: '.swiper-pagination', clickable: true }}
//                 navigation={{
//                     nextEl: '.swiper-button-next',
//                     prevEl: '.swiper-button-prev',
//                     clickable: true,
//                 }}
//                 modules={[EffectCoverflow, Pagination, Navigation]}
//                 className="swiper_container"
//             >
//                 {videos.map((video) => (
//                     <SwiperSlideStyled key={video.id}>
//                         <Thumbnail thumbnail={video.thumbnail} onClick={() => handleVideoClick(video.videoId)}>
//                             <PlayCircleOutlineIcon />
//                         </Thumbnail>
//                     </SwiperSlideStyled>
//                 ))}
//
//                 <SliderControler>
//                     <SliderArrow className="swiper-button-prev slider-arrow">
//                         <ion-icon name="arrow-back-outline"></ion-icon>
//                     </SliderArrow>
//                     <SliderArrow className="swiper-button-next slider-arrow">
//                         <ion-icon name="arrow-forward-outline"></ion-icon>
//                     </SliderArrow>
//                     <PaginationStyled className="swiper-pagination"></PaginationStyled>
//                 </SliderControler>
//             </SwiperContainer>
//
//             {activeVideo && (
//                 <>
//                     <Overlay onClick={handleClose} />
//                     <IframeWrapper>
//                         <iframe
//                             src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
//                             frameBorder="0"
//                             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                             allowFullScreen
//                         />
//                     </IframeWrapper>
//                 </>
//             )}
//         </Container>
//     );
// };
//
// export default VideoCarousel;
//
// import React, { useState, useEffect } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/effect-coverflow';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import styled from 'styled-components';
// import PlayCircleOutlineIcon from 'mdi-react/PlayCircleOutlineIcon';
//
// const Container = styled.div`
//     max-width: 124rem;
//     padding: 4rem 1rem;
//     margin: 0 auto;
// `;
//
// const SwiperContainer = styled(Swiper)`
//     height: 35rem;
//     padding: 2rem 0;
//     position: relative;
// `;
//
// const SwiperSlideStyled = styled(SwiperSlide)`
//     width: 45rem;
//     height: 25rem;
//     position: relative;
//     background-color: transparent;
// `;
//
// const Thumbnail = styled.div`
//     position: relative;
//     width: 100%;
//     height: 100%;
//     background-image: ${({ thumbnail }) => `url(${thumbnail})`};
//     background-size: cover;
//     background-position: center;
//     background-repeat: no-repeat;
//     border-radius: 3rem;
//     overflow: hidden;
//     background-color: transparent;
//     svg {
//         position: absolute;
//         top: 50%;
//         left: 50%;
//         transform: translate(-50%, -50%);
//         color: white;
//         font-size: 4rem;
//     }
// `;
//
// const SliderControler = styled.div`
//     position: relative;
//     bottom: 2rem;
//     display: flex;
//     align-items: center;
//     justify-content: center;
// `;
//
// const SliderArrow = styled.div`
//     background: white;
//     width: 1rem;
//     height: 1rem;
//     border-radius: 40%;
//     filter: drop-shadow(0px 8px 24px rgba(18, 28, 53, 0.1));
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     color: #000;
//     ion-icon {
//         font-size: 1rem;
//         color: #000;
//     }
// `;
//
// const PaginationStyled = styled.div`
//     position: relative;
//     width: 15rem !important;
//     bottom: 1rem;
//
//     .swiper-pagination-bullet {
//         filter: drop-shadow(0px 8px 24px rgba(18, 28, 53, 0.1));
//     }
//
//     .swiper-pagination-bullet-active {
//         background: #000;
//     }
// `;
//
// const IframeWrapper = styled.div`
//     position: fixed;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     background-color: #000;
//     padding: 20px;
//     border-radius: 10px;
//     box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
//     z-index: 1000;
//
//     iframe {
//         width: 560px;
//         height: 315px;
//     }
// `;
//
// const Overlay = styled.div`
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background-color: rgba(0, 0, 0, 0.7);
//     z-index: 999;
// `;
//
// const VideoTitle = styled.h3`
//     text-align: center;
//     margin-top: 10px;
//     color: white;
//     font-size: 1.5rem;
// `;
//
// const VideoCarousel = () => {
//     const [videos, setVideos] = useState([]);
//     const [activeVideo, setActiveVideo] = useState(null);
//     const [videoTitle, setVideoTitle] = useState('');
//
//     useEffect(() => {
//         const fetchVideos = async () => {
//             try {
//                 const channelId = 'UCu_qna2BIiOgNMB1pFzKENg'; // Replace with your channel ID
//                 const response = await fetch(`/api/youtube?channelId=${channelId}`);
//                 const data = await response.json();
//                 setVideos(data);
//             } catch (error) {
//                 console.error('Error fetching videos:', error);
//             }
//         };
//         fetchVideos();
//     }, []);
//
//     const handleVideoClick = (videoId, title) => {
//         setActiveVideo(videoId);
//         setVideoTitle(title);
//     };
//
//     const handleClose = () => {
//         setActiveVideo(null);
//         setVideoTitle('');
//     };
//
//     return (
//         <Container>
//             <SwiperContainer
//                 effect={'coverflow'}
//                 grabCursor={true}
//                 centeredSlides={true}
//                 loop={true}
//                 slidesPerView={'auto'}
//                 coverflowEffect={{
//                     rotate: 0,
//                     stretch: 0,
//                     depth: 100,
//                     modifier: 2.5,
//                 }}
//                 pagination={{ el: '.swiper-pagination', clickable: true }}
//                 navigation={{
//                     nextEl: '.swiper-button-next',
//                     prevEl: '.swiper-button-prev',
//                     clickable: true,
//                 }}
//                 modules={[EffectCoverflow, Pagination, Navigation]}
//                 className="swiper_container"
//             >
//                 {videos.map((video) => (
//                     <SwiperSlideStyled key={video.videoId}>
//                         <Thumbnail
//                             thumbnail={video.thumbnail}
//                             onClick={() => handleVideoClick(video.videoId, video.title)}
//                         >
//                             <PlayCircleOutlineIcon />
//                         </Thumbnail>
//                     </SwiperSlideStyled>
//                 ))}
//
//                 <SliderControler>
//                     <SliderArrow className="swiper-button-prev slider-arrow">
//                         <ion-icon name="arrow-back-outline"></ion-icon>
//                     </SliderArrow>
//                     <SliderArrow className="swiper-button-next slider-arrow">
//                         <ion-icon name="arrow-forward-outline"></ion-icon>
//                     </SliderArrow>
//                     <PaginationStyled className="swiper-pagination"></PaginationStyled>
//                 </SliderControler>
//             </SwiperContainer>
//
//             {activeVideo && (
//                 <>
//                     <Overlay onClick={handleClose} />
//                     <IframeWrapper>
//                         <iframe
//                             src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
//                             frameBorder="0"
//                             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                             allowFullScreen
//                         />
//                         {/*<VideoTitle>{videoTitle}</VideoTitle>*/}
//                     </IframeWrapper>
//                 </>
//             )}
//         </Container>
//     );
// };
//
// export default VideoCarousel;

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styled from 'styled-components';
import PlayCircleOutlineIcon from 'mdi-react/PlayCircleOutlineIcon';

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
//
// const SwiperSlideStyled = styled(SwiperSlide)`
//     width: 45rem;
//     height: 25rem;
//     position: relative;
//     background-color: transparent;
// `;
//
// const Thumbnail = styled.div`
//     position: relative;
//     width: 100%;
//     height: 100%;
//     background-image: ${({ thumbnail }) => `url(${thumbnail})`};
//     background-size: cover;
//     background-position: center;
//     background-repeat: no-repeat;
//     border-radius: 3rem;
//     overflow: hidden;
//     background-color: transparent;
//     svg {
//         position: absolute;
//         top: 50%;
//         left: 50%;
//         transform: translate(-50%, -50%);
//         color: white;
//         font-size: 4rem;
//     }
// `;

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
    //.swiper-pagination-bullet {
    //    filter: drop-shadow(0px 8px 24px rgba(18, 28, 53, 0.1));
    //}
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
                <Heading>VIDEOS</Heading>
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
                {videos.map((video) => (
                    <SwiperSlideStyled key={video.videoId}>
                        <Thumbnail
                            $thumbnail={video.thumbnail}
                            onClick={() => handleVideoClick(video.videoId, video.title)}
                        >
                            <TitleStrip>{video.title}</TitleStrip>
                            <PlayCircleOutlineIcon />
                        </Thumbnail>
                    </SwiperSlideStyled>
                ))}

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

// const VideoCarousel = () => {
//     const [videos, setVideos] = useState([]);
//     const [activeVideo, setActiveVideo] = useState(null);
//     const [videoTitle, setVideoTitle] = useState('');
//
//     useEffect(() => {
//         const fetchVideos = async () => {
//             try {
//                 const channelId = 'UCu_qna2BIiOgNMB1pFzKENg'; // Replace with your channel ID
//                 const response = await fetch(`/api/youtube?channelId=${channelId}`);
//                 const data = await response.json();
//                 setVideos(data);
//             } catch (error) {
//                 console.error('Error fetching videos:', error);
//             }
//         };
//         fetchVideos();
//     }, []);
//
//     const handleVideoClick = (videoId, title) => {
//         setActiveVideo(videoId);
//         setVideoTitle(title);
//     };
//
//     const handleClose = () => {
//         setActiveVideo(null);
//         setVideoTitle('');
//     };
//
//     return (
//         <Container>
//             <SwiperContainer
//                 effect={'coverflow'}
//                 grabCursor={true}
//                 centeredSlides={true}
//                 loop={true}
//                 slidesPerView={'auto'}
//                 coverflowEffect={{
//                     rotate: 0,
//                     stretch: 0,
//                     depth: 100,
//                     modifier: 2.5,
//                 }}
//                 pagination={{ el: '.swiper-pagination', clickable: true }}
//                 navigation={{
//                     nextEl: '.swiper-button-next',
//                     prevEl: '.swiper-button-prev',
//                     clickable: true,
//                 }}
//                 modules={[EffectCoverflow, Pagination, Navigation]}
//                 className="swiper_container"
//             >
//                 {videos.map((video) => (
//                     <SwiperSlideStyled key={video.videoId}>
//                         <Thumbnail
//                             thumbnail={video.thumbnail}
//                             onClick={() => handleVideoClick(video.videoId, video.title)}
//                         >
//                             <PlayCircleOutlineIcon />
//                         </Thumbnail>
//                     </SwiperSlideStyled>
//                 ))}
//
//                 <SliderControler>
//                     <SliderArrow className="swiper-button-prev slider-arrow">
//                         <ion-icon name="arrow-back-outline"></ion-icon>
//                     </SliderArrow>
//                     <SliderArrow className="swiper-button-next slider-arrow">
//                         <ion-icon name="arrow-forward-outline"></ion-icon>
//                     </SliderArrow>
//                 </SliderControler>
//                 <PaginationStyled className="swiper-pagination"></PaginationStyled>
//             </SwiperContainer>
//
//             {activeVideo && (
//                 <>
//                     <Overlay onClick={handleClose} />
//                     <IframeWrapper>
//                         <iframe
//                             src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
//                             frameBorder="0"
//                             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                             allowFullScreen
//                         />
//                     </IframeWrapper>
//                 </>
//             )}
//         </Container>
//     );
// };
//
// export default VideoCarousel;

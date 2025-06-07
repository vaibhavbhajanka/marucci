import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import Image from 'next/image';
import { useLanguage } from "../LanguageContext";

const CarouselWrapper = styled.div`
    position: relative;
    height: 100vh;
    overflow: hidden;

    .slick-slide {
        height: 100vh;
    }

    .slick-list {
        height: 100vh;
    }

    .logo-overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
    }
`;

const NavigationBar = styled.div`
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    justify-items: flex-end;
    padding: 20px;
    background-color: transparent; /* Semi-transparent background */
    z-index: 20;
`;

const NavButton = styled.a`
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    transition: color 0.3s, text-shadow 0.3s, transform 0.3s, letter-spacing 0.3s;
    text-decoration: none;
    font-weight: 100;

    /* Hover effect with glow, bold, and spacing */
    &:hover {
        text-shadow: 0 0 5px rgba(255, 255, 255, 0.8); /* Soft glow */
        transform: scale(1.1); /* Slightly enlarges on hover */
        letter-spacing: 2px; /* Increases letter spacing for a modern effect */
        font-weight: 400; /* Slightly bold on hover */
    }

    &:focus {
        outline: none;
    }
`;

const HalfBackground = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    position: relative;
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    /* Image on the left half and gradient on the right half */
    .left-half {
        width: 50%;
        position: relative;
        margin: 0;
        padding: 0;
        box-sizing: border-box;

        /* Adding gradient overlay on the left half to blend with the right */
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to right, rgba(14, 14, 14, 0) 0%, rgba(14, 14, 14, 1) 100%);
            z-index: 1;
        }

        img {
            position: relative;
            z-index: 0;
        }
    }

    .right-half {
        width: 50%;
        background: linear-gradient(to right, #0e0e0e, #707070);
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`;


const CarouselComponent = () => {
    const { t } = useLanguage();
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        fade: true, // This allows smooth fading between slides
    };
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <CarouselWrapper>
            {/* Navigation Bar with anchor links */}
            <NavigationBar>
                <NavButton onClick={() => scrollToSection('home')}>{t("home")}</NavButton>
                <NavButton onClick={() => scrollToSection('latest')}>{t("latest_track")}</NavButton>
                <NavButton onClick={() => scrollToSection('videos')}>{t("video_carousel_title")}</NavButton>
                <NavButton onClick={() => scrollToSection('home')}>{t("discography")}</NavButton>
                <NavButton onClick={() => scrollToSection('home')}>{t("marucci_story")}</NavButton>
            </NavigationBar>

            {/* Logo Overlay */}
            <div className="logo-overlay">
                <Image
                    src="/marucci-logo.png"
                    alt="Marucci Logo"
                    width={900}
                    height={300}
                    priority={true}
                />
            </div>

            {/* Slick Slider */}
            <Slider {...settings}>
                {/* First Slide with image on left and gradient on right */}
                <div>
                    <HalfBackground>
                        <div className="left-half">
                            <Image
                                src="/foto-1.jpg"
                                alt="Marucci Image 1"
                                fill
                                quality={100}
                                style={{ objectFit: 'cover' }}
                                priority={true}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                        <div className="right-half"></div>
                    </HalfBackground>
                </div>
                <div>
                    <Image
                        src="/foto-2.jpg"
                        alt="Marucci Image 2"
                        fill
                        quality={100}
                        style={{ objectFit: 'cover', objectPosition: 'top' }}
                        priority={true}
                    />
                </div>
                <div>
                    <Image
                        src="/foto-3.png"
                        alt="Marucci Image 3"
                        fill
                        quality={100}
                        style={{ objectFit: 'cover' }}
                        priority={true}
                    />
                </div>
                <div>
                    <Image
                        src="/foto-4.jpg"
                        alt="Marucci Image 4"
                        fill
                        quality={100}
                        style={{ objectFit: 'cover', objectPosition: '0% 20%' }}
                        priority={true}
                    />
                </div>
            </Slider>
        </CarouselWrapper>
    );
};

export default CarouselComponent;

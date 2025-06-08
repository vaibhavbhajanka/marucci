import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '../../hooks/LanguageContext';
import Image from 'next/image';

const Section = styled.section`
  position: relative;
  max-width: 1000px;
  margin: 56px auto 40px auto;
  border-radius: 32px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0,0,0,0.21);
  min-height: 340px;
  display: flex;
  align-items: stretch;
  background: none;
  @media (max-width: 900px) {
    flex-direction: column;
    min-height: 0;
    margin: 32px 0 24px 0;
  }
`;

const HeroImage = styled.div`
  flex: 1.3;
  min-width: 320px;
  position: relative;
  overflow: hidden;
  background: #181818;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  z-index: 1;
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(120deg, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.93) 100%);
    z-index: 2;
    pointer-events: none;
  }
  img {
    filter: grayscale(1) contrast(1.1);
    transition: transform 0.5s cubic-bezier(.22,.61,.36,1), filter 0.3s;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  &:hover img {
    transform: scale(1.04) rotate(-1deg);
    filter: grayscale(0.2) contrast(1.25);
  }
`;

const HeroContent = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 48px 40px 48px 40px;
  background: rgba(24,24,24,0.82);
  backdrop-filter: blur(2.5px);
  z-index: 2;
  @media (max-width: 900px) {
    padding: 36px 18px 32px 18px;
  }
`;

const Headline = styled.h2`
  font-size: 2.5rem;
  font-weight: 900;
  color: #fff;
  margin: 0 0 18px 0;
  letter-spacing: 1.5px;
  line-height: 1.1;
  position: relative;
  display: inline-block;
  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #fff 0%, #888 100%);
    border-radius: 2px;
    margin-top: 10px;
    opacity: 0.7;
  }
`;

const Tagline = styled.div`
  font-size: 1.19rem;
  color: #e0e0e0;
  margin-bottom: 18px;
  font-style: italic;
  opacity: 0.82;
  animation: fadeInTagline 1.1s cubic-bezier(.22,.61,.36,1);
  @keyframes fadeInTagline {
    from { opacity: 0; transform: translateY(18px); }
    to { opacity: 0.82; transform: none; }
  }
`;

const Intro = styled.p`
  font-size: 1.09rem;
  color: #f5f5f5;
  margin: 0 0 18px 0;
  line-height: 1.7;
`;

const ReadMoreBtn = styled.button`
  background: rgba(255,255,255,0.12);
  color: #fff;
  border: 2px solid #fff;
  border-radius: 28px;
  padding: 14px 38px 14px 28px;
  font-size: 1.13rem;
  font-weight: 800;
  letter-spacing: 0.5px;
  cursor: pointer;
  box-shadow: 0 2px 16px rgba(0,0,0,0.18);
  position: relative;
  overflow: hidden;
  transition: background 0.25s, color 0.25s, border 0.2s, box-shadow 0.18s, transform 0.13s;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  &:hover, &:focus {
    background: #fff;
    color: #111;
    border: 2px solid #fff;
    box-shadow: 0 6px 24px rgba(0,0,0,0.23);
    transform: translateY(-2px) scale(1.035);
  }
  &::after {
    content: '→';
    font-size: 1.3em;
    margin-left: 7px;
    transition: margin 0.2s;
  }
  &:hover::after, &:focus::after {
    margin-left: 15px;
  }
`;

const aboutContent = {
  en: {
    headline: 'About Marucci',
    intro: `Ángel G. Rosado López, also known as MARUCCI and known in the old school reggaetón scene as COBRA, was born on March 15, 1985, in Caguas, Puerto Rico. He grew up in Rochester, New York, where at the young age of 9 he discovered his passion for music. Back then, he became known in his community as "La inspiración juvenil" (The Youthful Inspiration). He started by imitating prominent artists in the movement, such as Vico C, Big Boy, and Don Chezina.`,
    image: '/foto-5.jpg',
    alt: 'Young Marucci in Rochester, NY (placeholder)',
    readMore: 'Read More',
  },
  es: {
    headline: 'Sobre Marucci',
    intro: 'Ángel G. Rosado López, alias MARUCCI y conocido como COBRA, nació en Caguas, Puerto Rico y creció en Rochester, Nueva York. Desde pequeño mostró pasión por la música y se convirtió en "La inspiración juvenil" de su comunidad, colaborando en proyectos radiales y grandes eventos. Hoy, MARUCCI es una figura destacada del reggaetón, reconocido por su talento, versatilidad y compromiso con la cultura latina.',
    image: '/foto-5.jpg',
    alt: 'Próximamente',
    readMore: 'Leer más',
  },
};

function MarucciStorySection({ onReadMore }) {
  const { language } = useLanguage();
  // Change headline to 'Marucci's Story' in both languages
  const content = {
    ...aboutContent[language],
    headline: language === 'es' ? 'Sobre Marucci' : 'About Marucci'
  };

  return (
    <Section>
      <HeroImage>
        <Image
          src={content.image}
          alt={content.alt}
          fill
          style={{ objectFit: 'cover', filter: 'brightness(1.28) contrast(1.13)' }}
          sizes="(max-width: 900px) 100vw, 420px"
          priority
        />
      </HeroImage>
      <HeroContent>
        <Headline>{content.headline}</Headline>
        <Tagline>{language === 'es' ? 'La inspiración juvenil del reggaetón.' : 'The youthful inspiration of reggaetón.'}</Tagline>
        <Intro>{content.intro}</Intro>
        <ReadMoreBtn onClick={onReadMore}>{aboutContent[language].readMore}</ReadMoreBtn>
      </HeroContent>
    </Section>
  );
}

export default MarucciStorySection; 
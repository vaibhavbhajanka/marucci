// components/Footer.js
import styled from 'styled-components';
import Link from 'next/link';
import { FaSpotify, FaInstagram, FaFacebookF, FaTiktok, FaGlobe } from 'react-icons/fa';
import Image from "next/image";

const FooterContainer = styled.footer`
    background-color: #0a0a0a;
    color: #fff;
    padding: 50px 0;
    text-align: center;
`;

const FooterLinks = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: center;
    gap: 20px;

    li {
        font-size: 1rem;
    }

    a {
        color: #fff;
        text-decoration: none;
        transition: color 0.3s ease-in-out;

        &:hover {
            color: #ffcc00;
        }
    }
`;

const SocialIcons = styled.div`
    margin: 20px 0;
    display: flex;
    justify-content: center;
    gap: 15px;

    svg {
        font-size: 1.5rem;
        cursor: pointer;
        transition: color 0.3s ease-in-out;
        color: white;
    }

    //a:hover svg {
    //    color: inherit;
    //    fill: currentColor;
    //}
`;

const FooterText = styled.p`
  font-size: 0.9rem;
  color: #888;
  margin-top: 20px;
`;

const Footer = () => {
    return (
        <FooterContainer>
            <Image
                src="/logo-white.png"
                alt="Logo"
                width={50}
                height={50}
            />

            <SocialIcons>
                <Link href="https://open.spotify.com/artist/2ur81OwaZ3OwOLYlOJjzJV?si=UuS3v05_Qle7PbejNkuBMQ" target="_blank" rel="noopener noreferrer">
                    <FaSpotify title="Spotify" />
                </Link>
                <Link href="https://instagram.com/maruccipr" target="_blank" rel="noopener noreferrer">
                    <FaInstagram title="Instagram" />
                </Link>
                <Link href="https://facebook.com/maruccipr" target="_blank" rel="noopener noreferrer">
                    <FaFacebookF title="Facebook" />
                </Link>
                <Link href="https://tiktok.com/@marucci" target="_blank" rel="noopener noreferrer">
                    <FaTiktok title="TikTok" />
                </Link>
                <Link href="https://maruccipr.com" target="_blank" rel="noopener noreferrer">
                    <FaGlobe title="Official Website" />
                </Link>
            </SocialIcons>

            <FooterText>&copy; 2024 Marucci. All rights reserved.</FooterText>
        </FooterContainer>
    );
};

export default Footer;

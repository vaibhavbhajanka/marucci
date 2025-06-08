import styled from 'styled-components';
import { FaSpotify, FaInstagram, FaFacebookF, FaTiktok, FaGlobe } from 'react-icons/fa';
import { useLanguage } from "../../hooks/LanguageContext";

// Styled component for the vertical strip
const SocialMediaStrip = styled.div`
    position: fixed;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 10px;
    border-radius: 10px 0 0 10px;
    z-index: 1000;
`;

const SocialMediaIcon = styled.a`
    color: #fff;
    font-size: 2rem;
    margin: 10px 0;
    transition: all 0.3s ease-in-out;
    text-decoration: none;
    //box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4); /* Default shadow for a 3D look */

    &:hover {
        transform: scale(1.2) translateY(-3px); /* Slight pop-out effect */
        //box-shadow: 0 8px 20px rgba(0, 0, 0, 0.7); /* Stronger shadow on hover for 3D effect */
    }
`;

const SocialMedia = () => {
    const { t } = useLanguage();
    return (
        <SocialMediaStrip aria-label={t("social_media_strip")}>
            <SocialMediaIcon
                href="https://open.spotify.com/artist/2ur81OwaZ3OwOLYlOJjzJV?si=UuS3v05_Qle7PbejNkuBMQ"
                target="_blank"
                rel="noopener noreferrer"
                title="Spotify"
            >
                <FaSpotify />
            </SocialMediaIcon>

            <SocialMediaIcon
                href="https://instagram.com/maruccipr"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
            >
                <FaInstagram />
            </SocialMediaIcon>

            <SocialMediaIcon
                href="https://facebook.com/maruccipr"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
            >
                <FaFacebookF />
            </SocialMediaIcon>

            <SocialMediaIcon
                href="https://tiktok.com/@marucci"
                target="_blank"
                rel="noopener noreferrer"
                title="TikTok"
            >
                <FaTiktok />
            </SocialMediaIcon>

            <SocialMediaIcon
                href="https://maruccipr.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Official Website"
            >
                <FaGlobe />
            </SocialMediaIcon>
        </SocialMediaStrip>
    );
};

export default SocialMedia;

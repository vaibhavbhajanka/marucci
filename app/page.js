// 'use client';
// import Head from 'next/head';
// import CarouselComponent from '@/app/components/CarouselComponent';
// import LatestTrack from "@/app/components/LatestTrack";
// import VideoCarousel from "@/app/components/VideoCarousal";
// import styled from 'styled-components';
// import Footer from "@/app/components/Footer";
// import SocialMedia from "@/app/components/SocialMedia"; // Import styled-components
//
// // Elegant Gradient Separator
// const GradientSeparator = styled.div`
//     height: 4px;
//     width: 80%;
//     margin: 50px auto;
//     background: linear-gradient(to right, rgba(0, 0, 0, 0), #333, rgba(0, 0, 0, 0));
//     opacity: 0.8;
//     border-radius: 2px;
// `;
//
// export default function Home() {
//     return (
//         <div>
//             <Head>
//                 <title>Marucci Official Website</title>
//                 <meta name="description" content="Official website of Marucci"/>
//                 {/*<link rel="icon" href="/favicon.ico"/>*/}
//             </Head>
//
//             <main>
//                 <SocialMedia/>
//                 {/* Carousel Section */}
//                 <section id="home">
//                     <CarouselComponent />
//                 </section>
//
//                 {/* Latest Track Section */}
//                 <section id="latest">
//                     <LatestTrack />
//                 </section>
//
//                 {/* Elegant Gradient Separator */}
//                 <GradientSeparator />
//
//                 {/* Video Carousel Section */}
//                 <section id="videos">
//                     <VideoCarousel />
//                 </section>
//                 <Footer></Footer>
//             </main>
//         </div>
//     );
// }
'use client';
import Head from 'next/head';
import CarouselComponent from '@/app/components/CarouselComponent';
import LatestTrack from "@/app/components/LatestTrack";
import VideoCarousel from "@/app/components/VideoCarousal";
import styled from 'styled-components';
import Footer from "@/app/components/Footer";
import SocialMedia from "@/app/components/SocialMedia";

// Elegant Gradient Separator
const GradientSeparator = styled.div`
    height: 4px;
    width: 80%;
    margin: 50px auto;
    background: linear-gradient(to right, rgba(0, 0, 0, 0), #333, rgba(0, 0, 0, 0));
    opacity: 0.8;
    border-radius: 2px;
`;

export default function Home() {
    return (
        <div>
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
        </div>
    );
}

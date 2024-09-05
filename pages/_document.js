// import Document, { Html, Head, Main, NextScript } from 'next/document'
//
// class MyDocument extends Document {
//     render() {
//         return (
//             <Html>
//                 <Head>
//                     {/* Preload Slick Carousel CSS */}
//                     <link
//                         rel="preload"
//                         href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"
//                         as="style"
//                     />
//                     <link
//                         rel="preload"
//                         href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css"
//                         as="style"
//                     />
//
//                     {/* Inline critical CSS */}
//                     <style dangerouslySetInnerHTML={{__html: `
//             /* Add any critical styles here */
//             body { margin: 0; padding: 0; }
//             .slick-slider { position: relative; }
//             /* Add more critical styles as needed */
//           `}} />
//
//                     {/* Load Slick Carousel CSS */}
//                     <link
//                         rel="stylesheet"
//                         href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"
//                     />
//                     <link
//                         rel="stylesheet"
//                         href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css"
//                     />
//                 </Head>
//                 <body>
//                 <Main />
//                 <NextScript />
//                 </body>
//             </Html>
//         )
//     }
// }
//
// export default MyDocument
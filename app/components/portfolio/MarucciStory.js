import React, { useEffect } from 'react';
import { Inter } from 'next/font/google';
import styled from 'styled-components';
import { useLanguage } from '../../hooks/LanguageContext';
import Image from 'next/image';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.7);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: rgba(24,24,24,0.77);
  backdrop-filter: blur(18px) saturate(1.15);
  border-radius: 32px;
  max-width: 960px;
  width: 98vw;
  max-height: 96vh;
  overflow-y: auto;
  box-shadow: 0 14px 48px rgba(0,0,0,0.44);
  padding: 0 0 32px 0;
  position: relative;
  animation: modalFadeIn 0.7s cubic-bezier(.22,.61,.36,1);
  font-family: ${inter.style.fontFamily};
  font-weight: 300;
  @keyframes modalFadeIn {
    from { opacity: 0; transform: translateY(32px) scale(0.97); }
    to { opacity: 1; transform: none; }
  }
`;

const HeroImage = styled.div`
  position: relative;
  width: 100%;
  height: 320px;
  min-height: 220px;
  background: #181818;
  overflow: hidden;
  border-radius: 32px 32px 0 0;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  z-index: 1;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    filter: grayscale(1) contrast(1.13);
    transition: filter 0.35s, transform 0.5s cubic-bezier(.22,.61,.36,1);
  }
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(120deg, rgba(0,0,0,0.62) 60%, rgba(0,0,0,0.93) 100%);
    z-index: 2;
    pointer-events: none;
  }
`;

const FrostedHeadline = styled.h1`
  position: absolute;
  left: 50%;
  bottom: 32px;
  transform: translateX(-50%);
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(8px) saturate(1.1);
  color: #fff;
  font-size: 2.3rem;
  font-weight: 900;
  letter-spacing: 1.2px;
  padding: 18px 40px;
  border-radius: 22px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.22);
  z-index: 3;
  text-align: center;
  @media (max-width: 600px) {
    font-size: 1.3rem;
    padding: 10px 16px;
    bottom: 12px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(255,255,255,0.14);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.7rem;
  font-weight: bold;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 12px rgba(0,0,0,0.19);
  transition: box-shadow 0.18s, background 0.18s, color 0.18s, transform 0.18s;
  animation: closePulse 1.6s infinite alternate cubic-bezier(.22,.61,.36,1);
  &:hover, &:focus {
    background: #fff;
    color: #111;
    box-shadow: 0 6px 24px rgba(0,0,0,0.29);
    transform: scale(1.12) rotate(8deg);
  }
  @keyframes closePulse {
    from { box-shadow: 0 2px 12px rgba(0,0,0,0.19); }
    to { box-shadow: 0 8px 32px rgba(0,0,0,0.33); }
  }
`;

const bioContent = {
  en: {
    headline: "About Marucci",
    sections: [
      {
        text: `Ángel G. Rosado López, also known as MARUCCI and known in the old school reggaetón scene as COBRA, was born on March 15, 1985, in Caguas, Puerto Rico. He grew up in Rochester, New York, where at the young age of 9 he discovered his passion for music. Back then, he became known in his community as "La inspiración juvenil" (The Youthful Inspiration). He started by imitating prominent artists in the movement, such as Vico C, Big Boy, and Don Chezina. During elementary and high school, his biggest distraction was filling his notebooks with song compositions. Little by little, he honed his talent, creating rhythms and musical arrangements. Over time, this talent led him into the world of music, where he began collaborating on commercial radio projects for La Mega in New York alongside well-known radio hosts.

This enterprising young man also had the opportunity to actively participate in major events such as the traditional Puerto Rican Day Parade, Dominican Day Parade, among others. Despite his young age, he has always been attracted to and proud of representing his Latin culture, bringing it to life through innovative ideas embedded in his lyrics.`,
        image: '/foto-5.jpg',
        coverImage: '/foto-6.jpg',
        caption: 'Young Marucci in Rochester, NY & early parades',
      },
      {
        text: `MARUCCI has proven with actions what was once just a promise. One example is his first project as a lead artist, "Tradición y Reggaetón" (Tradition and Reggaetón), where he emphasizes aspects of his culture. His abilities have allowed him to contribute as both a singer and a music producer on albums like "Reggaetón Power," "Fatal Fantasy G-69," "Reggaetón Out of Control," among others. A testament to MARUCCI's appeal is the track "Melodía con Calle" (Melody with Street), a collaboration with Draggo that stayed among the top 10 most-played songs for over five consecutive weeks on the radio station Reggaetón 94. Thanks to this exposure, new opportunities arose, leading to the formation of the duo "YAVIELL Y COBRA."

This duo received the support of major genre icons such as Nicky Jam, Wibal & Alex, Lennox, Kartier, Manny Montes, Ñengo Flow, among others. They worked on several tracks together including "Del Cielo a la Tierra," "Jamás," "Quieren Janguiar," "Gata Freak," "Por Detrás," and "Buscándote," collaborating with well-known producers like Mekka "La Nueva Amenaza," Mindwella, Mr. Greenz, Walde "The Beat Maker," and Radikal. Their partnership allowed them to gain greater recognition, participating in major reggaetón events such as "The Show en la Feria" with El Coyote The Show, the famous Justas, and trips to the Dominican Republic where they appeared on more than 14 TV and radio programs, including the popular show "Sábado de Corporán."`,
        image: '/foto-2.jpg',
        caption: 'Early music career and duo YAVIELL Y COBRA',
      },
      {
        text: `Between 2012 and 2013, MARUCCI toured various parts of Honduras including Tegucigalpa, Danlí, and Comayagua, performing at events and different social venues. In Guatemala, he promoted his music through the Emisoras Unidas network. In 2014, Nicky Jam officially announced MARUCCI as a member of La Industria Inc. Nicky Jam himself said in a video posted on his social media: "One of my boys, one of the talents of Industria Inc... working with us..."

In 2017, MARUCCI released "Mamasita," receiving strong support from fans with views and downloads. That same year, he joined the Team The Noise (led by DJ Negro, who discovered Vico-C and is a pioneer of the urban genre). As part of the duo Las Guanábanas, he performed at the Choliseo in Puerto Rico for the Reggaetón Old School event, reviving the genre's early energy and highlighting the native roots and history of the movement initially known as Underground.`,
        image: '/foto-3.png',
        caption: 'With Nicky Jam, Team The Noise, and major events',
      },
      {
        text: `In November 2018, he traveled to Colombia to negotiate with a record company to advance his career as an artist and songwriter. In December, MARUCCI recorded the video for his single "Solita" in Miami, FL, directed by Nicky Jam himself. By March 2019, he achieved a major milestone by signing with CODISCOS, a record label with more than 60 years of history and an extensive artist roster that includes other Puerto Ricans like Nicky Jam, J Álvarez, and Valentino. His new phase launched with the release of "Solita" on April 26, 2019.

During the pandemic, MARUCCI was hired as a sound engineer by NICKY JAM LLC, managing the recording studio where Nicky Jam records his music. He contributed to the production of Nicky Jam's album "INFINITY", worked on the movie Tom & Jerry under Warner Bros. Pictures, and handled vocal engineering for the track "Billetes" by producers Play-N-Skillz featuring Nathanael Cano. Additionally, he released tracks like "Dámelo," "Talón De Aquiles," "Amor De Mentiras," and "Me Gustas Así."

Today, MARUCCI presents his latest single titled "Tu Aroma," in collaboration with Lennox and Eix, which he is currently promoting.

This humble young man has captivated fans with his electrifying performances, personality, and stage energy. Even in his early solo days, his music ranked among the most downloaded across urban music websites and platforms. Throughout his career, MARUCCI has been a part of the history of a once-banned genre that captivated many in the 90s. With God's help, MARUCCI now promises to deliver not just music, but a refreshing and infectious sound sure to leave a lasting mark on the history of Latin music.`,
        image: '/foto-4.jpg',
        caption: 'Recent performances & releases',
      },
    ],
    ctas: [
      { label: "Share Marucci's Story", onClick: () => {} },
      { label: "Learn More / Contact", onClick: () => {} },
    ],
  },
  es: {
    headline: "Sobre Marucci",
    sections: [
      {
        text: `Ángel G. Rosado López alias MARUCCI y conocido en la vieja escuela del reggaetón como COBRA. Nació un 15 de marzo de 1985 en la ciudad Caguas, Puerto Rico. Creció en la ciudad de Rochester, Nueva York. Allí a su corta edad de 9 años descubre su pasión por la música. Se dio a conocer en su comunidad para esos tiempos, como "La inspiración juvenil". Comenzó imitando artistas del movimiento, de talla como Vico C, Big Boy, Don Chezina, entre otros. En la escuela primaria y secundaria, su distracción mayor era llenar sus libretas, componiendo canciones. De esta manera, poco a poco fue perfeccionando su talento, creando ritmos y arreglos musicales. Con el paso del tiempo, este talento lo condujo al mundo de la música donde comenzó a colaborar en proyectos comerciales de la radio emisora La Mega en Nueva York, junto a conocidos locutores. Este emprendedor joven también tuvo la oportunidad de participar activamente en actividades de gran envergadura como la tradicional Parada Puertorriqueña, Parada Dominicana, entre otros eventos. A pesar de su corta edad, siempre le ha atrae y enorgullece respaldar y llevar con la frente en alto, su cultura latina a través de innovadoras ideas plasmadas en sus liricas.`,
        image: '/foto-5.jpg',
        coverImage: '/foto-6.jpg',
        caption: 'Marucci de niño en Rochester, NY y primeras paradas',
      },
      {
        text: `MARUCCI ha evidenciado con hechos lo que en el pasado era una promesa. Como ejemplo de esto, presentó su primer proyecto como artista principal "Tradición y Reggaetón" donde hace hincapié en aspectos de nuestra cultura. Su idoneidad le ha permitido contribuir como cantante y productor musical en "Reggaetón Power, Fatal Fantassy G-69, Reggaetón out of Control", entre otras producciones. Una muestra de que MARUCCI se pega y envenena es el tema "Melodía con Calle" donde junto a Draggo, esta canción se mantuvo por más de 5 semanas consecutivas entre los 10 temas más escuchados por la radio emisora Reggaetón 94. Gracias a esta exposición, le surgieron nuevas oportunidades y fue cuando establece el dúo "YAVIELL Y COBRA". Para este, contó con el apoyo de grandes exponentes del género como: Nicky Jam, Wilbal y Alex, Lennox, Kartier, Manny Montes, Nengo Flow, entre otros; trabajando la mayoría de los temas "Del Cielo a la Tierra, Jamás, Quieren Janguiar, Gata Freak, Por Detrás, Buscándote y muchos más" junto a productores conocidos como Mekka "La Nueva Amenaza" Mindwella, Mr.Greenz, Walde "The beat Maker" y Radikal. La unión en este dúo le permitió darse a conocer siendo participe de grandes eventos del reggaetón como por ejemplo "The Show en la Feria" con El Coyote The Show, los famosos eventos de las Justas y también viajes a la República Dominicana donde se presentó en más de 14 programas de televisión y radio, entre estos, el exitoso y popular programa "Sábado de Corporán".`,
        image: '/foto-2.jpg',
        caption: 'Carrera temprana y dúo YAVIELL Y COBRA',
      },
      {
        text: `Entre los años 2012 - 2013, realizó giras por zonas del país Honduras como Tegucigalpa, Danlí, Comayagua, donde se presentó en eventos y diferentes establecimientos de entretenimiento social. Por Guatemala, a través de la Cadena Emisoras Unidas estuvo trabajando la promoción de sus temas. Para el 2014, Nicky Jam anuncia oficialmente a MARUCCI como integrante de la familia La Industria Inc. "Uno de los panas míos, uno de los talentos de la Industria Inc….Trabaja con Nosotros…" éstas fueron las palabras a través de un video que publicó Nicky Jam, en sus redes. Para el 2017 estrena "Mamasita" logrando un gran respaldo de sus seguidores en las vistas y descargas del tema. En este mismo año, formó parte del Team The Noise (Dj Negro) Dj quien descubre a Vico-C, pioneros del género urbano, con quienes ejecuta varias presentaciones como parte del dúo Las Guanábanas. En el Choliseo de Puerto Rico con Reggeaton Old School, revive la euforia del género y da a conocer mediante su primera presentación con este dúo, las raíces e historia autóctona de este movimiento en la Isla, conocido en sus comienzos como Underground.`,
        image: '/foto-5.jpg',
        caption: 'Con Nicky Jam, Team The Noise y grandes eventos',
      },
      {
        text: `En Noviembre 2018, viaja a Colombia a establecer negociaciones con la empresa discográfica que vislumbra encaminar su carrera como artista y compositor. Durante el mes de Diciembre, MARUCCI graba el video de su sencillo "Solita" en Miami, FL, para el cual, el exponente del género Nicky Jam funge como su Director. En Marzo 2019, alcanza una de sus grandes retos, la firma con la empresa discográfica de más 60 años de historia y trayectoria, CODISCOS, quien cuenta con un extenso catálogo de artistas. Entre otros puertorriqueños que forman parte del portafolio de la disquera se encuentran: Nicky Jam, J Álvarez y Valentino. Esta nueva etapa inicia con el lanzamiento de "Solita" para el 26 de abril de 2019. Durante el receso de la pandemia MARUCCI es contratado como ingeniero de sonido por la compañía NICKY JAM LLC para manejar el estudio de grabación donde el mismo reconocido artista realiza sus grabaciones logrando tener parte en la producion discográfica llamada INFINITY, la película de TOM & JERRY Bajo el sello de WARNER BROS PICTURES, Tema "Billetes" de los productores PLAY-N-SKILLZ junto al artista Nathanael Cano (como ingeniero de voces) logrando lanzar los temas "Damelo", "Talon De Aquiles", "Amor De Mentiras" y "Me Gustas Asi". Hoy dia MARUCCI nos presenta su mas reciente sencillo titulado "Tu Aroma" en colaboración con los artistas Lennox y Eix en el cual se encuentra en promoción de el mismo. Este humilde joven ha contagiado a sus seguidores con su electrizante espectáculo, personalidad y dinamismo en el escenario. En su etapa inicial como solista, su música logró colocarse entre las más descargadas entre las páginas y plataformas de música Urbana por toda la internet. Con su trayectoria, cabe destacar ha sido participe de la historia del crecimiento de un ritmo prohibido que se adueñó de muchos en los 90's. Y, sin duda, MARUCCI de la mano del Todopoderoso, hoy promete llevarle a su público algo más que música, un sonido refrescante y contagioso, que seguro dejará su huella plasmada en la historia de la música latin`,
        image: '/foto-10.jpg',
        caption: 'Presentaciones recientes y lanzamientos',
      },
    ],
    ctas: [
      { label: "Compartir la historia de Marucci", onClick: () => {} },
      { label: "Más información / Contacto", onClick: () => {} },
    ],
  },
};

// Styled components for section layout
const inter = Inter({ subsets: ['latin'], weight: ['300','400'] });

const SectionsWrapper = styled.div`
  padding: 32px;
  color: #fff;
`;
const SectionRow = styled.div`
  display: flex;
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
  align-items: center;
  gap: 36px;
  margin-bottom: 48px;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 18px;
    text-align: left;
  }
`;
const SectionImageWrapper = styled.div`
  flex: 1.1;
  min-width: 220px;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SectionCaption = styled.div`
  font-size: 0.98rem;
  color: #e0e0e0;
  margin-top: 8px;
  text-align: center;
`;
const SectionText = styled.div`
  flex: 2;
  font-size: 1.13rem;
  line-height: 1.7;
  margin-bottom: 8px;
  font-family: ${inter.style.fontFamily};
  font-weight: 300;
  @media (max-width: 900px) {
    margin-bottom: 0;
  }
`;

export default function MarucciStory({ open, onClose }) {
  const { language } = useLanguage();
  const content = bioContent[language] || bioContent.en;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <HeroImage>
          <Image src={content.sections[0].coverImage || '/foto-6.jpg'} alt={content.sections[0].caption} fill style={{ objectFit: 'cover' }} sizes="(max-width: 900px) 100vw, 420px" priority />
          <FrostedHeadline>{content.headline}</FrostedHeadline>
          <CloseButton onClick={onClose} aria-label="Close">×</CloseButton>
        </HeroImage>
        {/* Render all biography sections with side-by-side layout */}
        <SectionsWrapper>
          {content.sections.map((section, idx) => (
            <SectionRow key={idx} reverse={idx % 2 !== 0}>
              {section.image && (
                <SectionImageWrapper>
                  <Image src={section.image} alt={section.caption || ''} width={480} height={320} style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '18px', boxShadow: '0 4px 18px rgba(0,0,0,0.18)' }} />
                  {section.caption && <SectionCaption>{section.caption}</SectionCaption>}
                </SectionImageWrapper>
              )}
              <SectionText>{section.text}</SectionText>
            </SectionRow>
          ))}
        </SectionsWrapper>
      </ModalContent>
    </ModalOverlay>
  );
}

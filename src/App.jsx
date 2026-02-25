import React from 'react';
import DomeGallery from './components/DomeGallery';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import './index.css';

import imgHen1 from './assets/gallina-1.jpg';
import imgHen2 from './assets/gallina-2.jpg';
import imgHen3 from './assets/gallina-3.jpg';
import imgHen4 from './assets/gallina-4.jpg';
import imgHen5 from './assets/gallina-5.jpg';
import imgHen6 from './assets/gallina-6.jpg';
import imgHen7 from './assets/gallina-7.jpg';
import imgHen8 from './assets/gallina-8.jpg';
import imgHen9 from './assets/gallina-9.jpg';
import imgHen10 from './assets/gallina-10.jpg';
import imgHen11 from './assets/gallina-11.jpg';
import imgHen12 from './assets/gallina-12.jpg';
import imgHen13 from './assets/gallina-13.jpg';
import imgHen14 from './assets/gallina-14.jpg';
import imgHen15 from './assets/gallina-15.jpg';
import imgHen16 from './assets/gallina-16.jpg';
import imgHen17 from './assets/gallina-17.jpg';
import imgHen18 from './assets/gallina-18.jpg';
import imgHen19 from './assets/gallina-19.jpg';
import imgHen20 from './assets/gallina-20.jpg';

// Nuevas imágenes añadidas por el usuario
import userImg1 from './assets/user-gallina-1.jpg';
import userImg2 from './assets/user-gallina-2.jpg';
import userImg3 from './assets/user-gallina-3.jpg';
import userImg4 from './assets/user-gallina-4.jpg';
import userImg5 from './assets/user-gallina-5.jpg';

// Create a list of images (repeating the ones we have for the demo)
const galleryImages = Array.from({ length: 110 }).map((_, i) => {
    const imgs = [
        userImg1,
        userImg2,
        userImg3,
        userImg4,
        userImg5,
        imgHen1,
        imgHen2,
        imgHen3,
        imgHen4,
        imgHen5,
        imgHen6,
        imgHen7,
        imgHen8,
        imgHen9,
        imgHen10,
        imgHen11,
        imgHen12,
        imgHen13,
        imgHen14,
        imgHen15,
        imgHen16,
        imgHen17,
        imgHen18,
        imgHen19,
        imgHen20
    ];
    return {
        src: imgs[i % imgs.length],
        title: 'Gallinas de Campo'
    };
});

function Header() {
    const [isNavOpen, setIsNavOpen] = React.useState(false);

    return (
        <motion.header
            className="site-header floating-header"
            style={{
                position: 'fixed',
                width: 'calc(100% - 40px)',
                maxWidth: '900px',
                top: 20,
                left: '50%',
                background: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '999px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                border: '1px solid rgba(255,255,255,0.6)',
                zIndex: 100
            }}
            initial={{ y: -100, x: '-50%', opacity: 0 }}
            animate={{ y: 0, x: '-50%', opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="container header-inner" style={{ width: '100%', padding: '10px 20px', margin: 0 }}>
                <div className="brand-badge">
                    <span className="cow">🥚</span>
                    <div className="brand-text">
                        <span className="brand-name">Hacienda La Serena</span>
                        <span className="brand-sub">Gallinas de Libre Pastoreo</span>
                    </div>
                </div>

                <button
                    className="nav-toggle"
                    onClick={() => setIsNavOpen(!isNavOpen)}
                    aria-label="Toggle navigation"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <nav className={`nav ${isNavOpen ? 'open' : ''}`}>
                    <a href="#contacto" className="btn btn-small" onClick={() => setIsNavOpen(false)}>Pedir por WhatsApp</a>
                </nav>
            </div>
        </motion.header>
    );
}

function Overlay() {
    return (
        <div className="overlay-container">
            <motion.div
                className="overlay-card"
                initial={{ y: 100, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
                <motion.h1
                    style={{
                        fontSize: 'clamp(1.8rem, 4.5vw, 2.6rem)',
                        marginBottom: '0.8rem',
                        lineHeight: 1.1,
                        color: 'var(--brand)',
                        textShadow: '0 2px 10px rgba(0,0,0,0.1)'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    Gallinas de<br />Libre Pastoreo
                </motion.h1>
                <motion.p
                    className="lead"
                    style={{ marginBottom: '1.5rem', fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', maxWidth: '350px', margin: '0 auto 1.5rem' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    Criadas al aire libre, nuestras gallinas disfrutan de la naturaleza para darte los mejores huevos de campo, directos a tu mesa.
                </motion.p>
                <motion.div
                    style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <a
                        href="https://wa.me/593992061458?text=Hola%20Hacienda%20La%20Serena,%20quiero%20huevos%20frescos"
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-whatsapp"
                        style={{
                            textDecoration: 'none',
                            fontSize: '1rem',
                            padding: '12px 28px',
                            borderRadius: '999px',
                            fontWeight: 'bold',
                            boxShadow: '0 6px 20px rgba(37, 211, 102, 0.3)'
                        }}
                    >
                        💬 Pedir por WhatsApp
                    </a>
                </motion.div>
            </motion.div>
        </div>
    );
}


export default function App() {
    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative', background: '#f3efe6', overflow: 'hidden' }}>
            <Header />

            {/* Gallery Layer */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
                <DomeGallery
                    fit={0.8}
                    minRadius={1500} // increased to give images space
                    maxVerticalRotationDeg={90} // allow full sphere rotation
                    segments={110}
                    dragDampening={2}
                    grayscale={false}
                    images={galleryImages}
                />
            </div>

            {/* Content Overlay */}
            <Overlay />

        </div>
    );
}

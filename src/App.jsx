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
const galleryImages = Array.from({ length: 50 }).map((_, i) => {
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
            className="site-header"
            style={{ position: 'fixed', width: '100%', top: 0, background: 'rgba(243,239,230,0.6)' }}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="container header-inner">
                <div className="brand-badge">
                    <span className="cow">🥚</span>
                    <div className="brand-text">
                        <span className="brand-name">Hacienda<br />La Serena</span>
                        <span className="brand-sub">Huevos de Campo</span>
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
                    style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', marginBottom: '1rem', lineHeight: 1.1 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    Sabor Real, Vida Libre
                </motion.h1>
                <motion.p
                    className="lead"
                    style={{ marginBottom: '1.5rem', fontSize: 'clamp(0.9rem, 3vw, 1.1rem)' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    La mejor selección de huevos de campo, directo de nuestras gallinas felices a tu mesa.
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
                        style={{ textDecoration: 'none', fontSize: '1rem', padding: '12px 24px' }}
                    >
                        💬 Pedir Ahora
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
                    minRadius={600}
                    maxVerticalRotationDeg={10} // allow slight tilt
                    segments={34}
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

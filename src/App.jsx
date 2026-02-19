import React from 'react';
import DomeGallery from './components/DomeGallery';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import './index.css';

import imgEggs from './assets/producto-huevos.jpg';
import imgHistory from './assets/historia.jpg';
import imgHero from './assets/hero.jpg';

// Create a list of images (repeating the ones we have for the demo)
const galleryImages = Array.from({ length: 50 }).map((_, i) => {
    const imgs = [imgEggs, imgHero, imgHistory];
    return {
        src: imgs[i % imgs.length],
        title: i % 3 === 0 ? 'Huevos Frescos' : (i % 3 === 1 ? 'Vida de Campo' : 'Nuestra Historia')
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

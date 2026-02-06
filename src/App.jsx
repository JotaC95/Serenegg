import React from 'react';
import DomeGallery from './components/DomeGallery';
import { ShoppingCart } from 'lucide-react';
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
    return (
        <header className="site-header" style={{ position: 'fixed', width: '100%', top: 0, background: 'rgba(243,239,230,0.6)' }}>
            <div className="container header-inner">
                <div className="brand-badge">
                    <span className="cow">🥚</span>
                    <div className="brand-text">
                        <span className="brand-name">Hacienda<br />La Serena</span>
                        <span className="brand-sub">Huevos de Campo</span>
                    </div>
                </div>
                <nav className="nav">
                    <a href="#contacto" className="btn btn-small">Pedir por WhatsApp</a>
                </nav>
            </div>
        </header>
    );
}

function Overlay() {
    return (
        <div style={{
            position: 'absolute',
            bottom: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            pointerEvents: 'none', // Allow clicking through to gallery
            zIndex: 10
        }}>
            <div style={{ pointerEvents: 'auto', background: 'rgba(255,255,255,0.7)', padding: '2rem', borderRadius: '32px', backdropFilter: 'blur(10px)' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Sabor Real, Vida Libre</h1>
                <p className="lead" style={{ marginBottom: '1.5rem' }}>
                    La mejor selección de huevos de campo, directo de nuestras gallinas felices a tu mesa.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <a
                        href="https://wa.me/593992061458?text=Hola%20Hacienda%20La%20Serena,%20quiero%20huevos%20frescos"
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-whatsapp"
                        style={{ textDecoration: 'none' }}
                    >
                        💬 Pedir Ahora
                    </a>
                </div>
            </div>
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

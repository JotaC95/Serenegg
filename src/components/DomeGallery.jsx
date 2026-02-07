import React, { useRef, useEffect, useState } from 'react';
import { useDrag } from '@use-gesture/react';
import './DomeGallery.css';
import Lightbox from './Lightbox';

// Helper to create images if none provided
const placeholderImages = Array.from({ length: 34 }).map((_, i) => ({
    src: `https://picsum.photos/seed/${i * 123}/600/800`,
    title: `Egg Image ${i}`
}));

export default function DomeGallery({
    fit = 0.8,
    minRadius = 600,
    maxVerticalRotationDeg = 0,
    segments = 34,
    dragDampening = 2,
    grayscale = false,
    images = placeholderImages
}) {
    const containerRef = useRef(null);
    const galleryRef = useRef(null);

    // State for rotation and lightbox
    const rotation = useRef({ x: 0, y: 0 });
    const velocity = useRef({ x: 0, y: 0 });
    const isDragging = useRef(false);
    const reqId = useRef(null);

    const [selectedImage, setSelectedImage] = useState(null);
    const [screenFactor, setScreenFactor] = useState(1);

    // Responsive logic
    useEffect(() => {
        const handleResize = () => {
            setScreenFactor(window.innerWidth < 768 ? 0.6 : 1);
        };
        handleResize(); // init
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const radius = Math.max(minRadius * screenFactor, 400 * screenFactor);

    // Inertia loop
    useEffect(() => {
        const loop = () => {
            if (!isDragging.current) {
                // Apply decay
                velocity.current.x *= 0.95; // Decay factor
                velocity.current.y *= 0.95;

                // Stop if very slow
                if (Math.abs(velocity.current.x) < 0.01) velocity.current.x = 0;
                if (Math.abs(velocity.current.y) < 0.01) velocity.current.y = 0;

                // Apply velocity to rotation
                rotation.current.x += velocity.current.x;
                rotation.current.y += velocity.current.y;

                // Clamp vertical
                rotation.current.x = Math.min(Math.max(rotation.current.x, -maxVerticalRotationDeg), maxVerticalRotationDeg);

                // Update DOM
                if (galleryRef.current && (velocity.current.x !== 0 || velocity.current.y !== 0)) {
                    galleryRef.current.style.transform = `
            rotateX(${rotation.current.x}deg) 
            rotateY(${rotation.current.y}deg)
          `;
                }
            }
            reqId.current = requestAnimationFrame(loop);
        };
        loop();
        return () => cancelAnimationFrame(reqId.current);
    }, [maxVerticalRotationDeg]);

    const bind = useDrag(({ active, movement: [mx, my], velocity: [vx, vy], direction: [dx, dy], delta: [delx, dely] }) => {
        isDragging.current = active;

        if (active) {
            // Direct control
            // We accumulate rotation based on delta
            rotation.current.y += delx / dragDampening;
            rotation.current.x -= dely / dragDampening;
            // Clamp vertical
            rotation.current.x = Math.min(Math.max(rotation.current.x, -maxVerticalRotationDeg), maxVerticalRotationDeg);

            // Track velocity for release
            velocity.current.y = delx / dragDampening;
            velocity.current.x = -dely / dragDampening;

            if (galleryRef.current) {
                galleryRef.current.style.transform = `
          rotateX(${rotation.current.x}deg) 
          rotateY(${rotation.current.y}deg)
        `;
            }
        }
    });

    return (
        <>
            <Lightbox selectedImage={selectedImage} onClose={() => setSelectedImage(null)} />

            <div
                className="dome-container"
                ref={containerRef}
                {...bind()}
                style={{
                    perspective: '1500px',
                    overflow: 'hidden',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    touchAction: 'none',
                    cursor: isDragging.current ? 'grabbing' : 'grab',
                    background: '#000'
                }}
            >
                <div
                    ref={galleryRef}
                    className="dome-gallery"
                    style={{
                        transformStyle: 'preserve-3d',
                        width: 0,
                        height: 0,
                        position: 'relative',
                        // transition: isDragging.current ? 'none' : 'transform 0.5s cubic-bezier(0.1, 0.5, 0.1, 1)', // Don't fight the loop
                    }}
                >
                    {images.map((img, i) => {
                        const total = images.length;
                        const k = i + 0.5;
                        const phi_fibo = Math.acos(1 - 2 * k / total);
                        const theta_fibo = Math.PI * (1 + Math.sqrt(5)) * k;

                        const yPos = Math.cos(phi_fibo) * radius;
                        const xPos = Math.cos(theta_fibo) * Math.sin(phi_fibo) * radius;
                        const zPos = Math.sin(theta_fibo) * Math.sin(phi_fibo) * radius;

                        const rotY = (theta_fibo * 180 / Math.PI) + 90;
                        const rotX = (phi_fibo * 180 / Math.PI) - 90;

                        return (
                            <div
                                key={i}
                                className="dome-item"
                                style={{
                                    position: 'absolute',
                                    left: '-100px',
                                    top: '-130px',
                                    width: '200px',
                                    height: '260px',
                                    transform: `
                  translate3d(${xPos}px, ${yPos}px, ${zPos}px) 
                  rotateY(${rotY}deg) 
                  rotateX(${rotX}deg)
                `,
                                    backfaceVisibility: 'hidden',
                                    cursor: 'pointer'
                                }}
                                onClick={() => {
                                    if (!isDragging.current) {
                                        setSelectedImage(img);
                                    }
                                }}
                            >
                                <div className="dome-img-wrapper" style={{ width: '100%', height: '100%', transition: 'transform 0.3s ease, filter 0.3s ease' }}>
                                    <img
                                        src={img.src}
                                        alt=""
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '12px',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                                            border: '2px solid rgba(255,255,255,0.8)',
                                        }}
                                        draggable={false}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

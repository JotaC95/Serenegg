import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function Lightbox({ selectedImage, onClose }) {
    // Prevent body scroll when open
    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [selectedImage]);

    return (
        <AnimatePresence>
            {selectedImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999, // High z-index to overlay everything
                        background: 'rgba(0,0,0,0.9)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(10px)'
                    }}
                    onClick={onClose}
                >
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            background: 'none',
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer',
                            zIndex: 10000
                        }}
                    >
                        <X size={32} />
                    </button>

                    <motion.img
                        layoutId={`img-${selectedImage.src}`} // Optional if we matched ID
                        src={selectedImage.src}
                        alt={selectedImage.title}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                        style={{
                            maxWidth: '90vw',
                            maxHeight: '90vh',
                            objectFit: 'contain',
                            borderRadius: '16px',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                        }}
                        onClick={(e) => e.stopPropagation()} // Don't close when clicking image
                    />

                    {selectedImage.title && (
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            style={{
                                position: 'absolute',
                                bottom: '40px',
                                color: 'white',
                                background: 'rgba(0,0,0,0.5)',
                                padding: '10px 20px',
                                borderRadius: '999px',
                                fontFamily: 'Fraunces, serif',
                                fontSize: '1.2rem'
                            }}
                        >
                            {selectedImage.title}
                        </motion.div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

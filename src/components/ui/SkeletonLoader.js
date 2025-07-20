import React from 'react';
import { motion } from 'framer-motion';

const SkeletonLoader = ({ 
    type = 'card', 
    count = 1, 
    darkMode = false,
    className = '' 
}) => {
    const skeletonVariants = {
        animate: {
            opacity: [0.5, 1, 0.5],
            transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const renderSkeleton = () => {
        switch (type) {
            case 'card':
                return (
                    <div className={`skeleton-card ${darkMode ? 'dark' : 'light'} ${className}`}>
                        <motion.div 
                            className="skeleton-image"
                            variants={skeletonVariants}
                            animate="animate"
                        />
                        <div className="skeleton-content">
                            <motion.div 
                                className="skeleton-title"
                                variants={skeletonVariants}
                                animate="animate"
                            />
                            <motion.div 
                                className="skeleton-text"
                                variants={skeletonVariants}
                                animate="animate"
                            />
                            <motion.div 
                                className="skeleton-price"
                                variants={skeletonVariants}
                                animate="animate"
                            />
                        </div>
                    </div>
                );
            
            case 'list':
                return (
                    <div className={`skeleton-list-item ${darkMode ? 'dark' : 'light'} ${className}`}>
                        <motion.div 
                            className="skeleton-avatar"
                            variants={skeletonVariants}
                            animate="animate"
                        />
                        <div className="skeleton-list-content">
                            <motion.div 
                                className="skeleton-list-title"
                                variants={skeletonVariants}
                                animate="animate"
                            />
                            <motion.div 
                                className="skeleton-list-text"
                                variants={skeletonVariants}
                                animate="animate"
                            />
                        </div>
                    </div>
                );
            
            case 'grid':
                return (
                    <div className={`skeleton-grid ${darkMode ? 'dark' : 'light'} ${className}`}>
                        <motion.div 
                            className="skeleton-grid-item"
                            variants={skeletonVariants}
                            animate="animate"
                        />
                        <motion.div 
                            className="skeleton-grid-item"
                            variants={skeletonVariants}
                            animate="animate"
                        />
                        <motion.div 
                            className="skeleton-grid-item"
                            variants={skeletonVariants}
                            animate="animate"
                        />
                    </div>
                );
            
            case 'text':
                return (
                    <div className={`skeleton-text-container ${darkMode ? 'dark' : 'light'} ${className}`}>
                        <motion.div 
                            className="skeleton-text-line"
                            variants={skeletonVariants}
                            animate="animate"
                        />
                        <motion.div 
                            className="skeleton-text-line"
                            variants={skeletonVariants}
                            animate="animate"
                        />
                        <motion.div 
                            className="skeleton-text-line short"
                            variants={skeletonVariants}
                            animate="animate"
                        />
                    </div>
                );
            
            default:
                return null;
        }
    };

    if (count === 1) {
        return renderSkeleton();
    }

    return (
        <div className="skeleton-container">
            {Array.from({ length: count }, (_, index) => (
                <div key={index}>
                    {renderSkeleton()}
                </div>
            ))}
        </div>
    );
};

export default SkeletonLoader; 
import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'medium', darkMode = false }) => {
    const sizeClasses = {
        small: 'w-6 h-6',
        medium: 'w-12 h-12',
        large: 'w-16 h-16'
    };

    return (
        <div className="flex justify-center items-center p-8">
            <motion.div
                className={`${sizeClasses[size]} border-4 border-gray-300 border-t-blue-600 rounded-full`}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
};

export default LoadingSpinner; 
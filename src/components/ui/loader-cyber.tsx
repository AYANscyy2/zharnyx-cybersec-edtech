"use client";

import { motion } from "motion/react";
import React from "react";

export const LoaderCyber = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-8 font-mono">
            {/* Neo-brutalist Box */}
            <div className="relative flex items-center justify-center border-4 border-red-600 w-20 h-20 shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] bg-black">
                <motion.div
                    animate={{ scaleY: [0, 1, 1, 0], originY: [1, 1, 0, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "circInOut", times: [0, 0.4, 0.6, 1] }}
                    className="absolute bottom-0 w-full bg-white h-full"
                />
            </div>
            
            {/* Terminal Text */}
            <div className="flex items-center gap-1">
                <span className="text-white font-bold text-sm uppercase tracking-[0.25em]">
                    INITIALIZING
                </span>
                <motion.span
                    animate={{ opacity: [1, 1, 0, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear", times: [0, 0.5, 0.5, 1] }}
                    className="text-red-500 font-black text-sm"
                >
                    _
                </motion.span>
            </div>
        </div>
    );
};

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getExperience } from '../../api';
import { ExperienceItem } from '../../types';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
};

const ExperienceContent: React.FC = () => {
    const [items, setItems] = useState<ExperienceItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const result = await getExperience();
                setItems(result);
            } catch (err) {
                console.error('Failed to load experience timeline', err);
            } finally {
                setLoading(false);
            }
        };
        fetchExperience();
    }, []);

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center bg-white/40">
                <svg className="animate-spin h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
            </div>
        );
    }

    // Split into work experience and education
    const workItems = items.filter(item => item.type === 'work');
    const eduItems = items.filter(item => item.type === 'education');

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-6 md:p-8 space-y-8 select-text"
        >
            {/* Work Experience Section */}
            <div className="space-y-6">
                <div className="border-b border-black/5 pb-3">
                    <h2 className="text-lg font-extrabold text-gray-900 tracking-tight">Professional Experience</h2>
                </div>

                <div className="relative pl-6 border-l-2 border-pink-100 space-y-8">
                    {workItems.map((item, index) => (
                        <motion.div
                            variants={cardVariants}
                            key={index}
                            className="relative space-y-2"
                        >
                            {/* Timeline Connector Dot */}
                            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-pink-500 border-4 border-white shadow-sm" />

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                <div>
                                    <h3 className="font-extrabold text-gray-800 text-sm">{item.role}</h3>
                                    <p className="text-xs text-pink-600 font-semibold">{item.organization}</p>
                                </div>
                                <span className="text-[10px] font-bold text-gray-400 bg-gray-150/70 border border-gray-200/50 px-2 py-0.5 rounded-md shrink-0 self-start sm:self-auto">
                                    {item.period}
                                </span>
                            </div>

                            <ul className="list-disc pl-4 text-xs font-normal text-gray-600 space-y-1.5 leading-relaxed pt-2">
                                {item.bulletPoints?.map((pt, idx) => (
                                    <li key={idx} className="pl-0.5">{pt}</li>
                                ))}
                            </ul>

                            {/* Skill chips for internship */}
                            <div className="flex flex-wrap gap-1.5 pt-2.5">
                                {item.techStack?.map((tech) => (
                                    <span key={tech} className="px-2 py-0.5 bg-pink-500/5 text-pink-600 text-[9px] font-bold rounded-md border border-pink-500/10">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Education Timeline Section */}
            <div className="space-y-6">
                <div className="border-b border-black/5 pb-3">
                    <h2 className="text-lg font-extrabold text-gray-900 tracking-tight">Academic History</h2>
                </div>

                <div className="relative pl-6 border-l-2 border-blue-105 space-y-6">
                    {eduItems.map((item, index) => (
                        <motion.div
                            variants={cardVariants}
                            key={index}
                            className="relative space-y-1.5"
                        >
                            {/* Timeline Connector Dot */}
                            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow-sm" />

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                <div>
                                    <h3 className="font-extrabold text-gray-800 text-sm">{item.role}</h3>
                                    <p className="text-xs text-blue-600 font-semibold">{item.organization}</p>
                                </div>
                                <span className="text-[10px] font-bold text-gray-400 bg-gray-150/70 border border-gray-200/50 px-2 py-0.5 rounded-md shrink-0 self-start sm:self-auto">
                                    {item.period}
                                </span>
                            </div>

                            <ul className="list-disc pl-4 text-xs font-normal text-gray-650 space-y-1.5 leading-relaxed pt-1.5">
                                {item.bulletPoints?.map((pt, idx) => (
                                    <li key={idx} className="pl-0.5">{pt}</li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Education Footer */}
            <div className="border-t border-black/5 pt-4 text-center">
                <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">
                    Technocrats Institute of Technology • Bhopal, INDIA
                </p>
            </div>
        </motion.div>
    );
};

export default ExperienceContent;

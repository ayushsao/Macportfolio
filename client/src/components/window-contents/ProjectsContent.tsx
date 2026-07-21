import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProjects } from '../../api';
import { Project } from '../../types';

const ProjectsContent: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const result = await getProjects();
                setProjects(result);
                if (result.length > 0) {
                    // Expand first project by default for visual interest
                    setExpandedId(result[0]._id || result[0].title);
                }
            } catch (err) {
                console.error('Failed to load projects', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const handleCardClick = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

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

    return (
        <div className="p-6 md:p-8 space-y-6 select-text overflow-x-hidden">
            <div className="border-b border-black/5 pb-4">
                <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Main Projects</h2>
                <p className="text-xs text-gray-500 mt-1">
                    Click any card to expand details, architectural notes, and metrics.
                </p>
            </div>

            <motion.div layout="position" className="space-y-4">
                {projects.map((project) => {
                    const uniqueId = project._id || project.title;
                    const isExpanded = expandedId === uniqueId;

                    return (
                        <motion.div
                            layout
                            key={uniqueId}
                            onClick={() => handleCardClick(uniqueId)}
                            className={`p-5 rounded-2xl border transition duration-200 cursor-pointer overflow-hidden
                ${isExpanded
                                    ? 'bg-white border-pink-200 shadow-lg shadow-pink-100/50'
                                    : 'bg-white/50 border-gray-150 hover:bg-white hover:border-gray-300 hover:shadow-md'
                                }`}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        >
                            {/* Header Info */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <div className="flex items-center space-x-2">
                                    <svg className="w-4 h-4 text-pink-500 mr-1.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                                    </svg>
                                    <h3 className="font-extrabold text-gray-800 text-base tracking-tight">{project.title}</h3>
                                </div>
                                <div className="flex items-center space-x-1.5 shrink-0 self-start sm:self-auto">
                                    <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                        {isExpanded ? 'Click to Close' : 'Click to Expand'}
                                    </span>
                                </div>
                            </div>

                            <p className="text-xs text-gray-600 mt-2 font-normal leading-relaxed max-w-2xl">
                                {project.description}
                            </p>

                            {/* Tech Stack Horizontal List */}
                            <div className="flex flex-wrap gap-1.5 mt-3.5">
                                {project.techStack?.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-2 py-0.5 bg-gray-50 text-gray-600 text-[10px] font-semibold rounded-md border border-gray-100/60"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Expanded Bullet Points and Links */}
                            <AnimatePresence initial={false}>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                    >
                                        {/* Architectural Bullet Points */}
                                        <div className="mt-5 border-t border-black/5 pt-4 space-y-2.5">
                                            <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Key Accomplishments & Metrics</h4>
                                            <ul className="list-disc pl-4 text-xs font-normal text-gray-600 space-y-2 leading-relaxed">
                                                {project.bulletPoints?.map((point, index) => (
                                                    <li key={index} className="pl-1">
                                                        {point}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* External Buttons */}
                                        <div className="mt-6 flex items-center space-x-3" onClick={(e) => e.stopPropagation()}>
                                            {project.githubLink && (
                                                <a
                                                    href={project.githubLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center space-x-1.5 px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl border border-slate-700/20 transition active:scale-95 shadow-sm cursor-pointer"
                                                >
                                                    <svg className="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.193 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" />
                                                    </svg>
                                                    <span>GitHub Repo</span>
                                                </a>
                                            )}
                                            {project.liveLink && (
                                                <a
                                                    href={project.liveLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center space-x-1.5 px-4 py-1.5 bg-pink-500 hover:bg-pink-600 text-white text-xs font-semibold rounded-xl border border-pink-400/20 transition active:scale-95 shadow-sm cursor-pointer"
                                                >
                                                    <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                                    </svg>
                                                    <span>Live App</span>
                                                </a>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
};

export default ProjectsContent;

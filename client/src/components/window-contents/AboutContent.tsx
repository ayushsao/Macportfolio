import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getAbout } from '../../api';
import { AboutInfo } from '../../types';
import profileImg from './profile.jpg';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 15
        }
    },
};

const AboutContent: React.FC = () => {
    const [data, setData] = useState<AboutInfo | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAbout();
                setData(result);
            } catch (err) {
                console.error('Failed to load about details', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
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

    if (!data) return null;

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-6 md:p-8 space-y-8 select-text"
        >
            {/* Bio / Heading */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-start gap-6 border-b border-black/5 pb-6 animate-fade-in">
                {/* Profile Photo */}
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border-2 border-pink-500/20 shadow-md shrink-0 bg-gray-50 flex items-center justify-center">
                    <img
                        src={profileImg}
                        alt={data.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-extrabold text-gray-900 leading-tight tracking-tight">
                            {data.name}
                        </h2>
                        <p className="text-pink-600 font-semibold text-sm mt-0.5">{data.title}</p>
                        <p className="text-gray-400 text-xs mt-1 flex items-center">
                            <svg className="w-3.5 h-3.5 text-pink-500 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {data.location}
                        </p>
                    </div>
                    <div className="bg-pink-50/50 border border-pink-100/50 rounded-2xl p-4 max-w-md">
                        <p className="text-gray-600 text-xs leading-relaxed font-normal">
                            {data.bio}
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Education */}
            <motion.div variants={itemVariants} className="space-y-3">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Education</h3>
                <div className="bg-gray-50/50 border border-gray-150 p-4 rounded-xl">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                        <span className="font-semibold text-gray-800 text-sm">{data.education.degree}</span>
                        <span className="text-xs text-gray-500 font-medium shrink-0">{data.education.period}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{data.education.college}</p>
                    <div className="mt-2 inline-flex items-center space-x-1.5 px-2.5 py-0.5 bg-yellow-50 text-yellow-700 font-bold text-[10px] rounded-full border border-yellow-200">
                        <span>CGPA:</span>
                        <span>{data.education.cgpa}</span>
                    </div>
                </div>
            </motion.div>

            {/* Skills Grid */}
            <motion.div variants={itemVariants} className="space-y-3">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Skills & Expertise</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div className="bg-white/60 border border-gray-100 p-4 rounded-xl space-y-2">
                        <h4 className="text-xs font-bold text-gray-800">Programming Languages</h4>
                        <div className="flex flex-wrap gap-1.5">
                            {data.skills?.languages?.map((skill) => (
                                <span key={skill} className="px-2 py-1 bg-violet-50 text-violet-700 text-xs font-medium rounded-md border border-violet-100">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white/60 border border-gray-100 p-4 rounded-xl space-y-2">
                        <h4 className="text-xs font-bold text-gray-800">Frontend Tech</h4>
                        <div className="flex flex-wrap gap-1.5">
                            {data.skills?.frontend?.map((skill) => (
                                <span key={skill} className="px-2 py-1 bg-pink-50 text-pink-700 text-xs font-medium rounded-md border border-pink-100">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white/60 border border-gray-100 p-4 rounded-xl space-y-2">
                        <h4 className="text-xs font-bold text-gray-800">Backend & API</h4>
                        <div className="flex flex-wrap gap-1.5">
                            {data.skills?.backend?.map((skill) => (
                                <span key={skill} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md border border-blue-100">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white/60 border border-gray-100 p-4 rounded-xl space-y-2">
                        <h4 className="text-xs font-bold text-gray-800">Caching & Databases</h4>
                        <div className="flex flex-wrap gap-1.5">
                            {data.skills?.databases?.map((skill) => (
                                <span key={skill} className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-md border border-emerald-100">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white/60 border border-gray-100 p-4 rounded-xl col-span-1 md:col-span-2 space-y-2">
                        <h4 className="text-xs font-bold text-gray-800">DevOps & Middleware Tools</h4>
                        <div className="flex flex-wrap gap-2">
                            {data.skills?.toolsDevOps?.map((skill) => (
                                <span key={skill} className="px-2 py-1 bg-rose-50 text-rose-700 text-xs font-medium rounded-md border border-rose-100">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>
            </motion.div>

            {/* Certifications */}
            <motion.div variants={itemVariants} className="space-y-3">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Certifications & Ranks</h3>
                <div className="grid grid-cols-1 gap-2">
                    {data.certifications?.map((cert) => {
                        const isRank = cert.includes('Rank') || cert.includes('Star');
                        return (
                            <div
                                key={cert}
                                className={`p-3 rounded-lg border text-xs font-medium flex items-center space-x-2.5 
                  ${isRank ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-gray-50 border-gray-150 text-gray-700'}`}
                            >
                                <span>
                                    {isRank ? (
                                        <svg className="w-4 h-4 text-amber-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4 text-blue-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    )}
                                </span>
                                <span>{cert}</span>
                            </div>
                        );
                    })}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default AboutContent;

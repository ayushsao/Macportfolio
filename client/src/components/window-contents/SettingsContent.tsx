import React from 'react';

const SettingsContent: React.FC = () => {
    const applyWallpaper = (theme: 'blue' | 'teal' | 'purple' | 'pink') => {
        const root = document.documentElement;
        if (theme === 'blue') {
            root.style.setProperty('--bg-gradient-start', '#0b132b');
            root.style.setProperty('--bg-gradient-end', '#1c2541');
            root.style.setProperty('--accent-glow', '#38bdf8');
        } else if (theme === 'teal') {
            root.style.setProperty('--bg-gradient-start', '#022c22');
            root.style.setProperty('--bg-gradient-end', '#064e3b');
            root.style.setProperty('--accent-glow', '#34d399');
        } else if (theme === 'purple') {
            root.style.setProperty('--bg-gradient-start', '#1e1b4b');
            root.style.setProperty('--bg-gradient-end', '#311042');
            root.style.setProperty('--accent-glow', '#c084fc');
        } else if (theme === 'pink') {
            root.style.setProperty('--bg-gradient-start', '#4c0519');
            root.style.setProperty('--bg-gradient-end', '#831843');
            root.style.setProperty('--accent-glow', '#f43f5e');
        }
    };

    return (
        <div className="h-full flex flex-col p-5 bg-slate-900/50 text-white select-none">
            <div className="flex items-center space-x-3 mb-6 pb-2 border-b border-white/5">
                <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center border border-zinc-700 shadow-inner">
                    <svg className="w-7 h-7 text-zinc-300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="26" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="10 8" />
                        <circle cx="50" cy="50" r="16" fill="currentColor" opacity="0.8" />
                        <circle cx="50" cy="50" r="6" fill="#18181b" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-base font-bold text-slate-100">System Preferences</h3>
                    <p className="text-[10px] text-gray-400">Customize desktop scenery & sensory toggles</p>
                </div>
            </div>

            <div className="space-y-5 flex-1">
                <div>
                    <h4 className="text-xs font-bold text-gray-300 mb-2.5 uppercase tracking-wider">Wallpaper Scenery</h4>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => applyWallpaper('blue')}
                            className="bg-slate-950/40 hover:bg-slate-950/70 border border-white/5 active:scale-95 transition p-2.5 rounded-xl flex items-center space-x-2.5"
                        >
                            <span className="w-4.5 h-4.5 rounded-full bg-indigo-900 border border-blue-400" />
                            <span className="text-[11.5px] font-semibold">Midnight Blue</span>
                        </button>
                        <button
                            onClick={() => applyWallpaper('teal')}
                            className="bg-slate-950/40 hover:bg-slate-950/70 border border-white/5 active:scale-95 transition p-2.5 rounded-xl flex items-center space-x-2.5"
                        >
                            <span className="w-4.5 h-4.5 rounded-full bg-emerald-950 border border-emerald-400" />
                            <span className="text-[11.5px] font-semibold">Emerald Green</span>
                        </button>
                        <button
                            onClick={() => applyWallpaper('purple')}
                            className="bg-slate-950/40 hover:bg-slate-950/70 border border-white/5 active:scale-95 transition p-2.5 rounded-xl flex items-center space-x-2.5"
                        >
                            <span className="w-4.5 h-4.5 rounded-full bg-purple-950 border border-purple-400" />
                            <span className="text-[11.5px] font-semibold">Cyber Purple</span>
                        </button>
                        <button
                            onClick={() => applyWallpaper('pink')}
                            className="bg-slate-950/40 hover:bg-slate-950/70 border border-white/5 active:scale-95 transition p-2.5 rounded-xl flex items-center space-x-2.5"
                        >
                            <span className="w-4.5 h-4.5 rounded-full bg-rose-950 border border-rose-400" />
                            <span className="text-[11.5px] font-semibold">Blossom Pink</span>
                        </button>
                    </div>
                </div>

                <div className="pt-2 border-t border-white/5">
                    <h4 className="text-xs font-bold text-gray-300 mb-2.5 uppercase tracking-wider">Sensory Variables</h4>
                    <p className="text-[10px] text-gray-400 leading-normal mb-3">
                        Wallpaper incorporates 3D spatial soundscapes and responsive point-cloud wave interactions that execute dynamically based on screen movements.
                    </p>
                </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 text-[10px] text-gray-400 text-center">
                <span>macOS Ventura Portfolio Edition v1.2</span>
            </div>
        </div>
    );
};

export default SettingsContent;

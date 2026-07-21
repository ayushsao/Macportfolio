import React, { useState } from 'react';

interface Task {
    id: number;
    text: string;
    completed: boolean;
    category: 'frontend' | 'backend' | 'devops';
}

const RemindersContent: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, text: 'Design responsive macOS desktop grid framework', completed: true, category: 'frontend' },
        { id: 2, text: 'Implement spatial synth soundscape with Web Audio API', completed: true, category: 'frontend' },
        { id: 3, text: 'Integrate instanced 3D Sakura petals using React Three Fiber', completed: true, category: 'frontend' },
        { id: 4, text: 'Build interactive 3D point cloud wave with cursor warp', completed: true, category: 'frontend' },
        { id: 5, text: 'Configure Node/Express API with secure JSON Web Tokens', completed: false, category: 'backend' },
        { id: 6, text: 'Set up MongoDB cluster scope with mongoose schema bindings', completed: false, category: 'backend' },
        { id: 7, text: 'Deploy package builds on high-performance cloud server', completed: false, category: 'devops' },
    ]);

    const toggleComplete = (id: number) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    return (
        <div className="h-full flex flex-col p-5 bg-slate-900/50 text-white select-none overflow-y-auto">
            <div className="mb-4">
                <h3 className="text-xl font-bold text-slate-100 flex items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-2 animate-pulse" />
                    Ayush's Project Board
                </h3>
                <p className="text-[11px] text-gray-400 mt-0.5">Tracking milestones for the macOS portfolio launch</p>
            </div>

            <div className="space-y-3.5 flex-1 pb-3">
                {tasks.map(task => (
                    <div
                        key={task.id}
                        onClick={() => toggleComplete(task.id)}
                        className="flex items-start space-x-3 p-2.5 rounded-xl bg-slate-950/40 hover:bg-slate-950/60 border border-white/5 cursor-pointer transition active:scale-[0.99]"
                    >
                        <div className={`mt-0.5 w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition-all ${task.completed
                                ? 'bg-blue-600 border-blue-500 text-white'
                                : 'border-slate-500 hover:border-blue-400'
                            }`}>
                            {task.completed && (
                                <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </div>
                        <div className="flex-1 flex flex-col">
                            <span className={`text-[12.5px] font-medium leading-tight ${task.completed ? 'line-through text-gray-500' : 'text-slate-200'}`}>
                                {task.text}
                            </span>
                            <span className={`text-[9px] uppercase font-extrabold tracking-wider mt-1 w-max px-1.5 py-0.5 rounded ${task.category === 'frontend' ? 'bg-cyan-500/20 text-cyan-400' :
                                    task.category === 'backend' ? 'bg-amber-500/20 text-amber-400' :
                                        'bg-purple-500/20 text-purple-400'
                                }`}>
                                {task.category}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-auto pt-3 border-t border-white/5 flex justify-between text-[11px] text-gray-400">
                <span>Completed: {tasks.filter(t => t.completed).length} / {tasks.length}</span>
                <span className="text-blue-400 font-semibold">Active Sprint v1.0</span>
            </div>
        </div>
    );
};

export default RemindersContent;

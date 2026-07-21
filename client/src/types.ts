export type AppId = 'welcome' | 'about' | 'projects' | 'experience' | 'resume' | 'contact' | 'tictactoe' | 'reminders' | 'settings';

export interface WindowPosition {
    x: number;
    y: number;
}

export interface WindowState {
    id: AppId;
    title: string;
    isOpen: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    position: WindowPosition;
    size: { width: number | string; height: number | string };
    zIndex: number;
}

export interface Project {
    _id?: string;
    id?: string; // fallback
    title: string;
    description: string;
    techStack: string[];
    bulletPoints: string[];
    githubLink?: string;
    liveLink?: string;
    featured?: boolean;
}

export interface AboutInfo {
    _id?: string;
    name: string;
    title: string;
    location: string;
    bio: string;
    education: {
        degree: string;
        college: string;
        period: string;
        cgpa: string;
    };
    skills: {
        languages: string[];
        frontend: string[];
        backend: string[];
        databases: string[];
        toolsDevOps: string[];
    };
    certifications: string[];
}

export interface ExperienceItem {
    _id?: string;
    role: string;
    organization: string;
    period: string;
    type: 'work' | 'education';
    bulletPoints: string[];
    techStack: string[];
}

export interface ContactMessage {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export interface DockItem {
    id: AppId | string;
    label: string;
    icon: string; // Lucide icon name or emoji
    isExternal?: boolean;
    url?: string;
}

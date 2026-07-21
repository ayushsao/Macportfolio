import axios from 'axios';
import { AboutInfo, Project, ExperienceItem, ContactMessage } from '../types';
import { fallbackAbout, fallbackProjects, fallbackExperience } from './fallbackData';

const API = axios.create({
    baseURL: '/api',
    timeout: 3000, // fast timeout for snappy local fallbacks
});

export const getAbout = async (): Promise<AboutInfo> => {
    try {
        const response = await API.get<AboutInfo>('/about');
        return response.data;
    } catch (error) {
        console.warn('API is unreachable, falling back to local About content.', error);
        return fallbackAbout;
    }
};

export const getProjects = async (): Promise<Project[]> => {
    try {
        const response = await API.get<Project[]>('/projects');
        return response.data;
    } catch (error) {
        console.warn('API is unreachable, falling back to local Projects content.', error);
        return fallbackProjects;
    }
};

export const getExperience = async (): Promise<ExperienceItem[]> => {
    try {
        const response = await API.get<ExperienceItem[]>('/experience');
        return response.data;
    } catch (error) {
        console.warn('API is unreachable, falling back to local Experience content.', error);
        return fallbackExperience;
    }
};

export const sendContact = async (message: ContactMessage): Promise<{ success: boolean; message: string }> => {
    try {
        const response = await API.post<{ success: boolean; message: string }>('/contact', message);
        return response.data;
    } catch (error) {
        console.warn('API is unreachable for contact form submissions. Simulating response locally.', error);
        // If it fails because the server is not running, we still want to give the user a great feedback
        // so we simulate local success to demonstrate the UI flow, but log a warning.
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.05) {
                    resolve({
                        success: true,
                        message: 'Your message has been sent successfully (Simulated: Server offline).'
                    });
                } else {
                    reject(new Error('Network error. Failed to send message.'));
                }
            }, 1000);
        });
    }
};

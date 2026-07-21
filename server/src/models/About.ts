import { Schema, model, Document } from 'mongoose';

export interface IAbout extends Document {
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

const AboutSchema = new Schema<IAbout>({
    name: { type: String, required: true },
    title: { type: String, required: true },
    location: { type: String, required: true },
    bio: { type: String, required: true },
    education: {
        degree: { type: String, required: true },
        college: { type: String, required: true },
        period: { type: String, required: true },
        cgpa: { type: String, required: true }
    },
    skills: {
        languages: [{ type: String }],
        frontend: [{ type: String }],
        backend: [{ type: String }],
        databases: [{ type: String }],
        toolsDevOps: [{ type: String }]
    },
    certifications: [{ type: String }]
}, { timestamps: true });

export default model<IAbout>('About', AboutSchema);

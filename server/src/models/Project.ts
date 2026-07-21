import { Schema, model, Document } from 'mongoose';

export interface IProject extends Document {
    title: string;
    description: string;
    techStack: string[];
    bulletPoints: string[];
    githubLink?: string;
    liveLink?: string;
    featured?: boolean;
}

const ProjectSchema = new Schema<IProject>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    techStack: [{ type: String }],
    bulletPoints: [{ type: String }],
    githubLink: { type: String },
    liveLink: { type: String },
    featured: { type: Boolean, default: false }
}, { timestamps: true });

export default model<IProject>('Project', ProjectSchema);

import { Schema, model, Document } from 'mongoose';

export interface IExperience extends Document {
    role: string;
    organization: string;
    period: string;
    type: 'work' | 'education';
    bulletPoints: string[];
    techStack: string[];
}

const ExperienceSchema = new Schema<IExperience>({
    role: { type: String, required: true },
    organization: { type: String, required: true },
    period: { type: String, required: true },
    type: { type: String, enum: ['work', 'education'], required: true },
    bulletPoints: [{ type: String }],
    techStack: [{ type: String }]
}, { timestamps: true });

export default model<IExperience>('Experience', ExperienceSchema);

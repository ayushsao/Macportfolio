import { Schema, model, Document } from 'mongoose';

export interface IContactMessage extends Document {
    name: string;
    email: string;
    subject?: string;
    message: string;
}

const ContactMessageSchema = new Schema<IContactMessage>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String },
    message: { type: String, required: true }
}, { timestamps: true });

export default model<IContactMessage>('ContactMessage', ContactMessageSchema);

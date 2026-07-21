import React, { useState } from 'react';
import { sendContact } from '../../api';
import { ContactMessage } from '../../types';

const ContactContent: React.FC = () => {
    const [form, setForm] = useState<ContactMessage>({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [responseMsg, setResponseMsg] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Quick validation
        if (!form.name || !form.email || !form.message) {
            setStatus('error');
            setResponseMsg('Please fill in all required fields (Name, Email, Message).');
            return;
        }

        setStatus('sending');
        try {
            const response = await sendContact(form);
            if (response.success) {
                setStatus('success');
                setResponseMsg(response.message || 'Thank you! Your message was sent.');
                setForm({ name: '', email: '', subject: '', message: '' });
            } else {
                setStatus('error');
                setResponseMsg('Something went wrong. Please try again.');
            }
        } catch (err: any) {
            setStatus('error');
            setResponseMsg(err.message || 'Failed to submit form. Network error.');
        }
    };

    return (
        <div className="h-full flex flex-col md:flex-row bg-slate-50/50 select-text p-6 md:p-8 gap-6 md:gap-8">
            {/* Side Details card */}
            <div className="w-full md:w-5/12 space-y-4">
                <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Let's Connect!</h2>
                <p className="text-xs text-gray-500 leading-relaxed font-normal">
                    Have an opening, a project idea, or just want to chat details? Feel free to reach out. I will respond as soon as possible.
                </p>

                <div className="pt-4 space-y-3">
                    <div className="flex items-center space-x-3 text-xs text-gray-600 bg-white border border-gray-150 p-3 rounded-xl w-full">
                        <span className="text-lg flex-shrink-0">📧</span>
                        <div className="min-w-0 flex-1">
                            <p className="font-bold text-gray-400 uppercase text-[9px] tracking-wider whitespace-nowrap">Email</p>
                            <a href="mailto:ayushsao32@gmail.com" className="font-semibold text-pink-600 hover:underline break-all block text-[11px] sm:text-xs">ayushsao32@gmail.com</a>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-gray-600 bg-white border border-gray-150 p-3 rounded-xl w-full">
                        <span className="text-lg flex-shrink-0">📞</span>
                        <div className="min-w-0 flex-1">
                            <p className="font-bold text-gray-400 uppercase text-[9px] tracking-wider whitespace-nowrap">Call / Text</p>
                            <a href="tel:+919693701652" className="font-semibold text-blue-600 hover:underline truncate block text-[11px] sm:text-xs">+91-9693701652</a>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-gray-600 bg-white border border-gray-150 p-3 rounded-xl w-full">
                        <span className="text-lg flex-shrink-0">📍</span>
                        <div className="min-w-0 flex-1">
                            <p className="font-bold text-gray-400 uppercase text-[9px] tracking-wider whitespace-nowrap">Location</p>
                            <span className="font-semibold text-gray-800 truncate block text-[11px] sm:text-xs">Bangalore, India</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Input Fields / Submissions */}
            <form onSubmit={handleSubmit} className="flex-1 bg-white border border-gray-150 p-6 rounded-2xl shadow-sm space-y-3.5">
                <div>
                    <label htmlFor="contact-name" className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        disabled={status === 'sending'}
                        className="w-full text-xs px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-pink-500 focus:bg-white transition"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 gap-3.5">
                    <div>
                        <label htmlFor="contact-email" className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="contact-email"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@email.com"
                            disabled={status === 'sending'}
                            className="w-full text-xs px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-pink-500 focus:bg-white transition"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="contact-subject" className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                            Subject
                        </label>
                        <input
                            id="contact-subject"
                            type="text"
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            placeholder="Job / Chat"
                            disabled={status === 'sending'}
                            className="w-full text-xs px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-pink-500 focus:bg-white transition"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="contact-message" className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                        Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Type your message details here..."
                        disabled={status === 'sending'}
                        className="w-full text-xs px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-pink-500 focus:bg-white resize-none transition"
                        required
                    />
                </div>

                {/* Action button status notifications */}
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={status === 'sending'}
                        className={`w-full py-2.5 rounded-xl text-xs font-bold text-white shadow-md active:scale-98 transition duration-150 cursor-pointer
              ${status === 'sending'
                                ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed shadow-none'
                                : 'bg-pink-500 hover:bg-pink-600'}`}
                    >
                        {status === 'sending' ? '⚡ Transmission Active...' : 'Send Message'}
                    </button>
                </div>

                {/* Feedback Messages */}
                {status === 'success' && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold rounded-xl flex items-center space-x-2">
                        <span>✨</span>
                        <span>{responseMsg}</span>
                    </div>
                )}

                {status === 'error' && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-semibold rounded-xl flex items-center space-x-2">
                        <span>⚠️</span>
                        <span>{responseMsg}</span>
                    </div>
                )}
            </form>
        </div>
    );
};

export default ContactContent;

import { Router, Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import About from '../models/About';
import Project from '../models/Project';
import Experience from '../models/Experience';
import ContactMessage from '../models/ContactMessage';

const router = Router();

// Rate limiter for contact form submissions (max 5 submissions per 15 minutes per IP)
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    message: {
        success: false,
        message: 'Too many message submissions from this IP, please try again in 15 minutes.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// GET /api/about
router.get('/about', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const aboutData = await About.findOne();
        if (!aboutData) {
            return res.status(404).json({ message: 'About information not found.' });
        }
        res.json(aboutData);
    } catch (error) {
        next(error);
    }
});

// GET /api/projects
router.get('/projects', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const projects = await Project.find().sort({ featured: -1, createdAt: -1 });
        res.json(projects);
    } catch (error) {
        next(error);
    }
});

// GET /api/experience
router.get('/experience', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const experienceList = await Experience.find().sort({ createdAt: 1 });
        res.json(experienceList);
    } catch (error) {
        next(error);
    }
});

// POST /api/contact
router.post('/contact', contactLimiter, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, subject, message } = req.body;

        // Direct structural validation
        if (!name || typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ success: false, message: 'Please provide a valid name.' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
        }

        if (!message || typeof message !== 'string' || message.trim() === '') {
            return res.status(400).json({ success: false, message: 'Please provide a valid message.' });
        }

        // Save contact message to MongoDB
        const newMessage = new ContactMessage({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            subject: subject ? subject.trim() : undefined,
            message: message.trim(),
        });

        await newMessage.save();

        res.status(201).json({
            success: true,
            message: 'Your message has been captured successfully!',
        });
    } catch (error) {
        next(error);
    }
});

export default router;

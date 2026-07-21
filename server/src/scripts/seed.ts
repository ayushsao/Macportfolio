import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import * as path from 'path';
import About from '../models/About';
import Project from '../models/Project';
import Experience from '../models/Experience';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/macos-portfolio';

const seedData = async () => {
    try {
        console.log('Connecting to database...');
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB.');

        // 1. Seed About Details
        console.log('Cleaning About collection...');
        await About.deleteMany({});

        const aboutInfo = {
            name: "Ayush Kumar Sao",
            title: "Full Stack MERN Developer",
            location: "Bangalore, India",
            bio: "Highly motivated Full Stack MERN Developer specializing in building scalable web applications, event-driven architectures, and high-performance backend pipelines. Experienced in containerization, caching layers, and cloud infrastructure.",
            education: {
                degree: "B.Tech in Computer Science and Engineering",
                college: "Technocrats Institute of Technology, Bhopal",
                period: "October 2022 – June 2026",
                cgpa: "7.77/10"
            },
            skills: {
                languages: ["JavaScript", "TypeScript", "Python", "C++"],
                frontend: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion", "Three.js", "Zustand"],
                backend: ["Node.js", "Express.js", "REST APIs", "GraphQL", "WebSockets"],
                databases: ["MongoDB", "MySQL", "Redis", "PostgreSQL"],
                toolsDevOps: ["Docker", "Git", "GitHub Actions", "AWS (EC2, S3, IAM)", "Kafka"]
            },
            certifications: [
                "AWS Certified Cloud Practitioner",
                "GitHub Foundations Certification",
                "CodeChef 2-Star (Rank 565, 500+ DSA Problems Solved)"
            ]
        };

        await About.create(aboutInfo);
        console.log('Successfully seeded About collection.');

        // 2. Seed Projects
        console.log('Cleaning Projects collection...');
        await Project.deleteMany({});

        const projectsList = [
            {
                title: "PrepAI",
                description: "AI Interview Preparation Platform",
                techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "Gemini API", "Kafka", "Redis"],
                bulletPoints: [
                    "Built a scalable AI interview platform using React.js, Node.js, Express.js, MongoDB, Apache Kafka, and Redis, implementing JWT authentication, RESTful APIs, and an event-driven architecture to support 50+ concurrent users with sub-300ms API latency.",
                    "Designed an asynchronous code execution pipeline using Apache Kafka, Wandbox API, and Gemini API, while leveraging Redis for caching, reducing execution delay by ~ 25%, database queries by 45%, and manual evaluation effort by ~ 40%."
                ],
                githubLink: "https://github.com/ayushsao/PrepAI",
                liveLink: "https://prepai-qem5.onrender.com/"
            },
            {
                title: "HiringSignal",
                description: "AI-Powered Resume Shortlisting Simulator",
                techStack: ["React.js", "Node.js", "MongoDB", "Groq API"],
                bulletPoints: [
                    "Built an AI-powered resume analysis system using React.js, Node.js, MongoDB, and Groq API, following a RESTful client-server architecture to simulate ATS-based shortlisting, tested across 50–200 users.",
                    "Implemented text parsing, keyword extraction, and scoring logic to evaluate resumes based on skills, projects, and role alignment, optimizing resume processing across multiple formats."
                ],
                githubLink: "https://github.com/ayushsao/HiringSignal",
                liveLink: "https://hiring-signal-seven.vercel.app/"
            }
        ];

        await Project.create(projectsList);
        console.log('Successfully seeded Projects collection.');

        // 3. Seed Experiences
        console.log('Cleaning Experience collection...');
        await Experience.deleteMany({});

        const experiencesList = [
            {
                role: "Backend Developer Intern",
                organization: "Infosys Springboard",
                period: "Jan 2026 – Apr 2026",
                type: "work",
                techStack: ["Node.js", "Express.js", "MongoDB", "JWT", "REST APIs", "JavaScript"],
                bulletPoints: [
                    "Developed robust REST APIs with secure JWT authentication and role-based access control for a civic-tech petitions/polling platform.",
                    "Implemented optimized geo-filtered queries in MongoDB, allowing location-bound users to view/create localized polls and civic petitions.",
                    "Designed public data aggregation endpoints for analytics charts, ensuring query response speeds under 120ms.",
                    "Tested endpoints using Postman/Supertest to maintain high performance with active user groups ranging between 50 and 200 users."
                ]
            },
            {
                role: "B.Tech Student",
                organization: "Technocrats Institute of Technology, Bhopal",
                period: "Oct 2022 – June 2026",
                type: "education",
                techStack: ["C++", "Python", "Data Structures", "Algorithms", "Software Engineering", "DBMS"],
                bulletPoints: [
                    "Acquired solid fundamentals in Computer Science including Object Oriented Programming, Data Structures & Algorithms, and Database Management.",
                    "Maintained a strong CGPA of 7.77/10 while active in coding platforms like CodeChef (2-Star, Rank 565) and LeetCode.",
                    "Spearheaded tech-club workshops on Full-Stack MERN development and Cloud Computing basics."
                ]
            }
        ];

        await Experience.create(experiencesList);
        console.log('Successfully seeded Experience collection.');

        console.log('All collections seeded successfully.');
        process.exit(0);

    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedData();

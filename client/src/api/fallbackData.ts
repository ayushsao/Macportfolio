import { AboutInfo, Project, ExperienceItem } from '../types';

export const fallbackAbout: AboutInfo = {
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

export const fallbackProjects: Project[] = [
    {
        title: "PrepCode",
        description: "An advanced technical coding judge platform designed to compile source code, execute custom test cases, and simulate real-time programming interviews.",
        techStack: ["React", "Express", "Node.js", "MongoDB", "Kafka", "Redis", "TypeScript", "Wandbox API"],
        bulletPoints: [
            "Built a secure JWT-based authentication system supporting email/password and session management.",
            "Architected an event-driven async compilation pipeline utilizing Apache Kafka to handle compiler requests safely under load.",
            "Integrated a Redis caching layer, decreasing database query loads by 45% and reduced system latency by ~25%.",
            "Engineered automated code checking and logic verification using the Wandbox compilers API to run code against pre-defined test suites.",
            "Optimized performance to sustain 50+ concurrent users with sub-300ms core code execution feedback latency."
        ],
        githubLink: "https://github.com/ayushsao/PrepCode",
        liveLink: "https://prepcode-interview.vercel.app"
    },
    {
        title: "TalentStream",
        description: "A recruitment Applicant Tracking System (ATS) designed to parse resume files, rank candidates based on keyword matching, and manage pipeline progression.",
        techStack: ["React", "Express", "Node.js", "MongoDB", "Tailwind CSS", "TypeScript", "PDF-parse"],
        bulletPoints: [
            "Engineered an ATS scoring engine evaluating skills, credentials, and match parameters against job post conditions.",
            "Implemented secure multi-file upload handling and text parsing algorithms to extract unstructured text from PDF and PDF-parse metadata.",
            "Tested and scaled server capacity to support 50–200 simultaneous users during simulations.",
            "Designed an interactive dashboard dashboard for HR recruiters to search, catalog, filter, and score candidates in real-time."
        ],
        githubLink: "https://github.com/ayushsao/TalentStream",
        liveLink: "https://talentstream-ats.netlify.app"
    }
];

export const fallbackExperience: ExperienceItem[] = [
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

export const contactDetails = {
    email: "ayushsao32@gmail.com",
    phone: "+91-9693701652",
    github: "https://github.com/ayushsao",
    linkedin: "https://linkedin.com/in/ayush-kumar-sao",
    leetcode: "https://leetcode.com/ayushsao32",
    codechef: "https://www.codechef.com/users/ayushsao"
};

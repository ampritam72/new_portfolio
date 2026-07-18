import { Project, Skill, Tool, WorkExperience, Education, Publication } from "./types";

export const initialProjects: Project[] = [
  {
    id: "academic-x",
    title: "Academic X",
    subtitle: "AI-Powered Smart Ecosystem for Students",
    category: "Web",
    description: "Designed a student-focused web app concept with AI study tools, smart notes, CGPA calculator, notice management, assignment/deadline support, and club zone features. Built responsive UI flow for academic productivity and campus engagement.",
    tech: ["React", "Vite", "Tailwind CSS", "Firebase", "AI APIs"],
    link: "https://academic-x.vercel.app",
    github: "https://github.com/abirmahmudpritam/Academic-X",
    featured: true
  },
  {
    id: "rent-rush",
    title: "RentRush",
    subtitle: "Rental House Finder Mobile App",
    category: "Mobile",
    description: "Developed a mobile app idea focused on helping users find rental houses through a simple, user-friendly interface. Designed rental listing experiences, map routes, local search filters, and smooth custom navigations.",
    tech: ["FlutterFlow", "Mobile UI Design", "Firebase Concepts", "Prototyping"],
    link: "https://rentrush-app.example.com",
    github: "https://github.com/abirmahmudpritam/RentRush",
    featured: true
  },
  {
    id: "ecg-heartbeat",
    title: "ECG Heartbeat Classification",
    subtitle: "CNN Deep Learning Health Assistant",
    category: "AI/ML",
    description: "Completed a DSP (Digital Signal Processing) academic project using Python and deep convolutional neural networks (CNN) to detect and classify heartbeat anomalies from ECG records for early cardiac diagnostics.",
    tech: ["Python", "CNN", "TensorFlow", "Signal Processing", "Kaggle"],
    link: "https://kaggle.com/code/abirmahmudpritam/ecg-classification",
    github: "https://github.com/abirmahmudpritam/ECG-Heartbeat-Classification-using-CNN",
    featured: true
  },
  {
    id: "brain-tumor",
    title: "Brain Tumor MRI Classification",
    subtitle: "Hybrid CNN-ViT Architecture",
    category: "AI/ML",
    description: "A research-oriented Brain Tumor MRI classification model exploring a state-of-the-art hybrid Convolutional Neural Network and Vision Transformer (CNN-ViT) framework. Implements Explainable AI concepts for medical heatmaps.",
    tech: ["Python", "CNN", "Vision Transformer", "Computer Vision", "Explainable AI"],
    link: "https://kaggle.com/code/abirmahmudpritam/brain-tumor-vit",
    github: "https://github.com/abirmahmudpritam/Brain-Tumor-MRI-Classification-using-CNN-ViT",
    featured: false
  },
  {
    id: "finneon-family",
    title: "FinneonFamily",
    subtitle: "Aquarium & Bonsai Plant Concept",
    category: "Web",
    description: "Designed and built an e-commerce catalog layout and brand concept for aquarium fish, premium aquatics, and bonsai trees. Focused on high-fidelity visual UI, interactive cart drawer, and responsive browsing filters.",
    tech: ["HTML", "CSS", "JavaScript", "UI/UX Layout", "E-commerce Layout"],
    link: "https://finneonfamily.example.com",
    github: "https://github.com/abirmahmudpritam/FinneonFamily",
    featured: false
  },
  {
    id: "alphatech-ws",
    title: "AlphaTech WS",
    subtitle: "Social Media Banner & Pfp Customizer",
    category: "Design",
    description: "Social media assets curation and automation service. Helped over 100+ clients find and customize the best matched profile pictures and background banners optimized for modern social networks (Facebook, YouTube, LinkedIn).",
    tech: ["Figma", "Photoshop", "Branding", "Social Media Management"],
    link: "https://alphatech-ws.example.com",
    github: "https://github.com/abirmahmudpritam/AlphaTech-WS",
    featured: false
  }
];

export const initialSkills: Skill[] = [
  { name: "HTML", percentage: 95, iconName: "Code2", category: "frontend" },
  { name: "CSS", percentage: 90, iconName: "Palette", category: "frontend" },
  { name: "JavaScript / React", percentage: 95, iconName: "Cpu", category: "frontend" },
  { name: "Vite & Tailwind", percentage: 92, iconName: "Flame", category: "frontend" },
  { name: "Python", percentage: 92, iconName: "FileCode2", category: "language" },
  { name: "C / C++", percentage: 86, iconName: "Terminal", category: "language" },
  { name: "Java", percentage: 84, iconName: "Coffee", category: "language" },
  { name: "SQL Database", percentage: 90, iconName: "Database", category: "language" },
  { name: "Matlab", percentage: 82, iconName: "Binary", category: "language" },
  { name: "Flutter", percentage: 88, iconName: "Layers", category: "mobile" }
];

export const initialTools: Tool[] = [
  { name: "Figma", category: "Design", iconName: "PenTool" },
  { name: "Photoshop", category: "Design", iconName: "Image" },
  { name: "Canva", category: "Design", iconName: "Palette" },
  { name: "VS Code", category: "Code", iconName: "SquareTerminal" },
  { name: "GitHub", category: "Code", iconName: "GitBranch" },
  { name: "Kaggle", category: "AI", iconName: "Database" },
  { name: "ChatGPT", category: "AI", iconName: "Sparkles" },
  { name: "Google AI Studio", category: "AI", iconName: "Brain" },
  { name: "MS Word", category: "Office", iconName: "FileText" },
  { name: "MS Excel", category: "Office", iconName: "Table" },
  { name: "Trello", category: "Agile", iconName: "Trello" },
  { name: "ClickUp", category: "Agile", iconName: "CheckSquare" },
  { name: "Jira", category: "Agile", iconName: "Kanban" }
];

export const experiences: WorkExperience[] = [
  {
    role: "Graphic Designer",
    company: "Hult Prize at Varendra University",
    duration: "2025 - 2026",
    bullets: [
      "Design promotional branding graphics, banners, and digital marketing materials for global entrepreneurship chapter events.",
      "Collaborate with the event planning team to structure modern web visuals, enhancing brand appeal and student registration."
    ]
  },
  {
    role: "Graphic Designer",
    company: "BASIS Students Forum - Varendra University Chapter",
    duration: "2025 - 2026",
    bullets: [
      "Crafted event posters, chapter announcements, and innovative digital campaign banners for technical workshops and events.",
      "Spearheaded visual design strategies matching the national BASIS IT forum guidelines."
    ]
  },
  {
    role: "Graphic Designer",
    company: "BD Apps - Varendra University Chapter",
    duration: "2024 - 2025",
    bullets: [
      "Designed digital campaign assets, social media announcements, and banners promoting mobile app monetization on the BDApps platform.",
      "Created visual guides helping other students understand and engage with chapter dev workshops."
    ]
  },
  {
    role: "Social Media Manager & Graphic Designer",
    company: "Alpha Tech Work Solutions",
    duration: "2023 - 2024",
    bullets: [
      "Managed client social media profiles, delivering high-impact graphics and customized marketing/explainer videos.",
      "Contributed to frontend user interface (UI) wireframes and layouts to enhance client branding and user engagement."
    ]
  },
  {
    role: "Graphic Designer",
    company: "XO Digital",
    duration: "2021 - 2022",
    bullets: [
      "Created visual content, social media campaign graphics, and complete corporate branding packages for small and medium businesses.",
      "Collaborated with marketing leads to deliver digital layouts aligning perfectly with business visions."
    ]
  }
  
];

export const educationList: Education[] = [
  {
    degree: "B.Sc. in Computer Science and Engineering",
    institution: "Varendra University (VU), Rajshahi",
    duration: "2023 - Present",
    bullets: [
      "Currently pursuing B.Sc degree, focused on algorithms, software architecture, machine learning (CNN/ViT), and advanced frontend app architectures.",
      "Active organizer of debate tournaments, tech carnivals, and university IT community activities."
    ]
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Nawabganj City College",
    duration: "2018 - 2020",
    gpa: "5.00 / 5.00"
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "Harimohan Govt High School",
    duration: "2013 - 2018",
    gpa: "4.94 / 5.00"
  }
];

export const certifications: string[] = [
  "Certified Graphic Designer (Professional Course)",
  "Organizing Committee of Tech Debate, Dept. of CSE, VU",
  "Active Volunteer of AI Bangladesh National Community",
  "Official Volunteer & Graphic Lead of UCICS-2025, Dept. of CSE, VU",
  "Event Volunteer of RoboSoccer 2024 & Tech Carnival, Dept. of CSE, VU"
];

export const initialPublications: Publication[] = [
  {
    id: "pub-1",
    title: "A Deep Learning Approach for ECG Heartbeat Classification Using Lightweight Hybrid CNNs",
    authors: "Abir Mahmud Pritam, et al.",
    journalOrConference: "International Conference on Computer, Information and Customer Sciences (UCICS-2025)",
    year: "2025",
    type: "Conference",
    abstract: "This paper presents a highly optimized, lightweight convolutional neural network (CNN) model for classifying electrocardiogram (ECG) heartbeats into five distinct rhythmic categories. By employing customized kernel sizing and depthwise separable convolutions, our model achieves exceptional classification accuracy while drastically lowering computational demands, making it highly suitable for real-time edge devices in cardiac healthcare monitoring.",
    doi: "10.1109/UCICS2025.1034567",
    link: "https://ieeexplore.ieee.org/document/123456",
    tags: ["Deep Learning", "ECG Classification", "Convolutional Neural Networks", "Edge Computing"]
  },
  {
    id: "pub-2",
    title: "Advancements and Challenges in Brain Tumor Detection via Hybrid Vision Transformer Architectures",
    authors: "Abir Mahmud Pritam",
    journalOrConference: "Journal of Medical Imaging and AI Research",
    year: "2025",
    type: "Journal",
    abstract: "Hybrid architectures incorporating both CNNs for localized feature extraction and Vision Transformers (ViT) for long-range global context modeling have recently redefined medical image classification. This paper reviews state-of-the-art hybrid CNN-ViT models developed for Brain Tumor MRI diagnostics. We evaluate their generalizability, computational efficiency, and explainability frameworks such as Grad-CAM, while outlining ongoing challenges in clinical deployment.",
    doi: "10.1016/j.jmia.2025.04.012",
    link: "https://sciencedirect.com/journal/jmia",
    tags: ["Vision Transformers", "Brain Tumor Detection", "Explainable AI", "Medical Imaging"]
  },
  {
    id: "pub-3",
    title: "State of Art Review: Deep Learning Applications in Digital Signal Processing for Portable Diagnostics",
    authors: "Abir Mahmud Pritam, Dr. Tasnim Rahman",
    journalOrConference: "Computers and Electrical Engineering Review",
    year: "2024",
    type: "Review Paper",
    abstract: "A comprehensive review of digital signal processing (DSP) pipelines optimized by modern deep learning architectures. This study reviews current methodologies in cardiac, neural, and muscular bio-signal denoising, representation learning, and real-time inference on resource-constrained micro-architectures. We discuss standard datasets, benchmark accuracies, and critical hardware limits.",
    link: "https://example.com/publications/dsp-review-2024",
    tags: ["Review Paper", "Signal Denoising", "Deep Learning", "Bio-medical Engineering"]
  }
];


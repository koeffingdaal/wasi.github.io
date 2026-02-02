
import { Experience, Education, Certification, Project, SkillCategory } from './types';

export const PERSONAL_INFO = {
  name: "Wasi Ul Islam Tasin",
  role: "Implementation Engineer",
  email: "wasi.wui@gmail.com",
  phone: "+8801644328054",
  linkedin: "https://linkedin.com/in/wasi-ul-islam-tasin",
  summary: "Customer-focused Implementation Engineer with 3.5+ years of experience in software deployment, AI integration, and enterprise system implementation. Skilled in consulting with customers to translate business goals into technical architectures and deployment plans, integrating data workflows, and developing custom tools and API-driven solutions that enhance automation and scalability. Proficient in Python, C#, and SQL, with hands-on experience in system integration, RESTful API development, and data transformation (ETL) for AI and analytics solutions."
};

export const SKILLS: SkillCategory[] = [
  {
    category: "Languages & Frameworks",
    items: ["C#", "ASP.NET Core/MVC", "Python", "Entity Framework Core"]
  },
  {
    category: "Databases & Analytics",
    items: ["MS SQL", "MySQL", "Power BI", "Data Processing", "Statistical Analysis"]
  },
  {
    category: "Operations & Tools",
    items: ["JIRA", "SLA Monitoring", "VS Code", "PyCharm", "Crystal Reports", "Anaconda 3"]
  },
  {
    category: "System Integration",
    items: ["HRIS & ERP Systems", "Hospital ERP", "Payroll Systems", "RESTful APIs"]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    role: "Implementation Engineer",
    company: "Global MediKlaud (BD) Ltd",
    location: "Dhaka, Bangladesh",
    period: "Nov 2024 – Present",
    description: [
      "Collected and analyzed operational data from hospital ERP systems to identify workflow gaps and recommend improvements.",
      "Provided end-user support and reporting to ensure smooth operations, resolving issues through data-driven troubleshooting.",
      "Collaborated with leadership and cross-functional teams to align system outputs with organizational needs.",
      "Prepared and shared monthly KPI reports with stakeholders, ensuring visibility into performance trends."
    ]
  },
  {
    role: "Project Associate",
    company: "Quantanite Bangladesh Ltd",
    location: "Dhaka, Bangladesh",
    period: "Jan 2023 – March 2025",
    description: [
      "Achieved a 99.9% data accuracy rate while processing over 1,200 records per shift.",
      "Ensured 100% adherence to client specifications by implementing a proactive QC process, reducing clarification follow-ups by 30%.",
      "Exceeded productivity targets by completing tasks ahead of schedule on 95% of workdays.",
      "Optimized communication with project coordinators to rapidly resolve data ambiguities, cutting average issue-resolution time by 25%."
    ]
  },
  {
    role: "Implementation Engineer",
    company: "hSenid Business Solutions PLC",
    location: "Dhaka, Bangladesh",
    period: "May 2022 – Oct 2024",
    description: [
      "Configured and maintained client CRM/HRIS reporting environments for employee, payroll, and engagement data.",
      "Designed and delivered 80+ Crystal Reports and Power BI dashboards, driving a 15% reduction in manual data errors.",
      "Built automated SQL jobs and real-time alerts to monitor funnel health and compliance metrics.",
      "Partnered with cross-functional stakeholders to translate raw data into actionable insights for resource planning."
    ]
  },
  {
    role: "Associate Technical Operations (Data)",
    company: "ShopUp",
    location: "Dhaka, Bangladesh",
    period: "Feb 2021 – Apr 2022",
    description: [
      "Collected, cleaned, and integrated data across multiple systems to ensure accuracy for business operations.",
      "Monitored key supply chain metrics, identifying anomalies and escalating risks to senior management.",
      "Conducted data analysis and reporting on inventory and pricing data supporting demand planning.",
      "Produced regular performance dashboards and operational reports for data-driven decisions."
    ]
  }
];

export const EDUCATION: Education = {
  institution: "American International University-Bangladesh",
  degree: "BSc, Computer Science & Engineering",
  period: "2017 - 2021"
};

export const CERTIFICATIONS: Certification[] = [
  {
    name: "Project Management Foundations: Small Projects",
    provider: "LinkedIn Learning",
    description: "Practical knowledge in managing tasks, deadlines, and stakeholder expectations.",
    year: 2024
  },
  {
    name: "Data Management and Analysis in Data Science",
    provider: "Coursera",
    description: "Skills in analyzing large datasets and preparing insights for decision-making.",
    year: 2024
  },
  {
    name: "Data Operations and Management",
    provider: "Coursera",
    description: "Strong foundation in maintaining operational data integrity and reporting.",
    year: 2022
  },
  {
    name: "ANGULAR and ASP.NET Core REST API - Real World Application",
    provider: "Udemy",
    description: "Learn and Create Full-Stack Web Applications with Angular and EF Core with the ASP.NET Core Web API.",
    year: 2021
  }
];

export const PROJECTS: Project[] = [
  {
    title: "Fraud Detection (Python, Scikit-learn)",
    type: "Project",
    description: [
      "Analyzed large transaction datasets to detect anomalies using statistical models.",
      "Produced reports and visualizations to support decision-making and highlight suspicious activity patterns."
    ],
    technologies: ["Python", "Scikit-learn", "Statistical Modeling"],
    outcome: "Increased detection speed and identified previously unknown risk patterns in historical transaction logs."
  },
  {
    title: "Data Mining for Fraud Detection in Financial Transactions",
    type: "Thesis",
    description: [
      "Developed ML models using classification and clustering to identify fraudulent transactions in large-scale financial data.",
      "Applied feature engineering and data preprocessing to ensure data quality, accuracy, and reliability.",
      "Generated clear documentation and performance metrics (accuracy, precision, recall) for stakeholders."
    ],
    technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Keras", "Tensorflow"],
    outcome: "Reduced false-positive rates by 12% through advanced feature engineering, providing a more reliable foundation for automated monitoring."
  }
];

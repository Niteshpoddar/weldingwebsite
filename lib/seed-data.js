import connectDB from './mongodb.js';
import Product from './models/Product.js';
import Industry from './models/Industry.js';
import Training from './models/Training.js';
import Career from './models/Career.js';

const sampleProducts = [
  {
    name: "Professional MIG Welder",
    description: "High-quality MIG welder perfect for professional welding applications. Features advanced controls and safety features.",
    category: "Welding Equipment",
    price: 1299.99,
    sku: "MIG-PRO-2024",
    brand: "WeldMaster",
    images: ["/images/products/mig-welder-1.jpg", "/images/products/mig-welder-2.jpg"],
    inStock: true,
    features: [
      "Digital display",
      "Auto-set technology",
      "Thermal overload protection",
      "Spool gun ready"
    ],
    applications: ["Automotive", "Construction", "Manufacturing"],
    certifications: ["CE Certified", "UL Listed"],
    specifications: {
      "Power Output": "200A",
      "Duty Cycle": "60% at 200A",
      "Input Voltage": "240V",
      "Weight": "45 lbs"
    }
  },
  {
    name: "Welding Helmet with Auto-Darkening",
    description: "Professional auto-darkening welding helmet with advanced optical clarity and comfort features.",
    category: "Safety Gear",
    price: 299.99,
    sku: "HELMET-AUTO-2024",
    brand: "SafetyPro",
    images: ["/images/products/helmet-1.jpg", "/images/products/helmet-2.jpg"],
    inStock: true,
    features: [
      "Auto-darkening lens",
      "4 arc sensors",
      "Adjustable sensitivity",
      "Lightweight design"
    ],
    applications: ["All welding processes"],
    certifications: ["ANSI Z87.1", "CSA Z94.3"],
    specifications: {
      "Shade Range": "3-13",
      "Reaction Time": "1/25,000 second",
      "Weight": "1.2 lbs",
      "Battery Life": "2000+ hours"
    }
  },
  {
    name: "Premium Welding Electrodes",
    description: "High-quality welding electrodes for various applications and materials.",
    category: "Consumables",
    price: 89.99,
    sku: "ELECTRODE-PREMIUM-2024",
    brand: "WeldTech",
    images: ["/images/products/electrodes-1.jpg"],
    inStock: true,
    features: [
      "Low hydrogen coating",
      "Excellent arc stability",
      "Easy slag removal",
      "X-ray quality welds"
    ],
    applications: ["Structural steel", "Pressure vessels", "Bridges"],
    certifications: ["AWS E7018", "ASME SFA-5.1"],
    specifications: {
      "Diameter": "3/32\" - 5/32\"",
      "Length": "14\"",
      "Coating": "Low hydrogen",
      "Position": "All positions"
    }
  }
];

const sampleIndustries = [
  {
    name: "Automotive Manufacturing",
    description: "Specialized welding solutions for automotive manufacturing, including body assembly, frame welding, and component fabrication.",
    icon: "🚗",
    featured: true,
    services: [
      {
        name: "Body Assembly Welding",
        description: "Precision welding for vehicle body panels and structural components"
      },
      {
        name: "Frame Fabrication",
        description: "Custom frame welding and repair services"
      },
      {
        name: "Component Manufacturing",
        description: "Production of automotive parts and components"
      }
    ],
    caseStudies: [
      {
        title: "Major Auto Manufacturer Partnership",
        description: "Provided welding solutions for a major automotive manufacturer, improving production efficiency by 25%",
        image: "/images/case-studies/automotive-1.jpg",
        results: "25% increase in production efficiency, 40% reduction in defects"
      }
    ],
    testimonials: [
      {
        client: "John Smith",
        company: "AutoTech Manufacturing",
        testimonial: "The welding solutions provided have transformed our production line. Quality and efficiency have never been better.",
        rating: 5
      }
    ]
  },
  {
    name: "Construction & Infrastructure",
    description: "Comprehensive welding services for construction projects, bridges, buildings, and infrastructure development.",
    icon: "🏗️",
    featured: true,
    services: [
      {
        name: "Structural Steel Welding",
        description: "Welding services for structural steel components and frameworks"
      },
      {
        name: "Bridge Construction",
        description: "Specialized welding for bridge construction and repair"
      },
      {
        name: "Building Fabrication",
        description: "Custom fabrication for commercial and residential buildings"
      }
    ],
    caseStudies: [
      {
        title: "City Bridge Renovation",
        description: "Completed major bridge renovation project using advanced welding techniques",
        image: "/images/case-studies/construction-1.jpg",
        results: "Project completed 2 weeks ahead of schedule, 100% safety record"
      }
    ],
    testimonials: [
      {
        client: "Sarah Johnson",
        company: "City Construction Co.",
        testimonial: "Professional service and exceptional quality. Our bridge project was completed flawlessly.",
        rating: 5
      }
    ]
  },
  {
    name: "Oil & Gas",
    description: "Specialized welding services for the oil and gas industry, including pipeline welding and equipment fabrication.",
    icon: "⛽",
    services: [
      {
        name: "Pipeline Welding",
        description: "High-pressure pipeline welding and repair services"
      },
      {
        name: "Equipment Fabrication",
        description: "Custom fabrication for oil and gas equipment"
      },
      {
        name: "Maintenance & Repair",
        description: "Preventive maintenance and emergency repair services"
      }
    ],
    caseStudies: [
      {
        title: "Offshore Platform Project",
        description: "Provided welding services for offshore platform construction",
        image: "/images/case-studies/oil-gas-1.jpg",
        results: "Zero safety incidents, 30% cost savings"
      }
    ],
    testimonials: [
      {
        client: "Mike Davis",
        company: "Offshore Energy Solutions",
        testimonial: "Reliable service in challenging offshore conditions. Highly recommended.",
        rating: 5
      }
    ]
  }
];

const sampleTraining = [
  {
    title: "Basic Welding Fundamentals",
    description: "Learn the fundamentals of welding including safety, equipment operation, and basic techniques.",
    category: "Basic Welding",
    duration: "40 hours",
    price: 899.99,
    image: "/images/training/basic-welding.jpg",
    featured: true,
    instructor: {
      name: "Robert Wilson",
      qualifications: "AWS Certified Welding Inspector",
      experience: "15+ years in welding education"
    },
    schedule: [
      {
        date: new Date("2024-03-15"),
        time: "9:00 AM - 5:00 PM",
        location: "Main Training Center",
        availableSeats: 8
      },
      {
        date: new Date("2024-04-10"),
        time: "9:00 AM - 5:00 PM",
        location: "Main Training Center",
        availableSeats: 10
      }
    ],
    curriculum: [
      {
        module: "Safety Fundamentals",
        description: "Welding safety, PPE, and workplace safety",
        duration: "8 hours"
      },
      {
        module: "Equipment Operation",
        description: "Understanding and operating welding equipment",
        duration: "12 hours"
      },
      {
        module: "Basic Techniques",
        description: "Fundamental welding techniques and practices",
        duration: "20 hours"
      }
    ],
    prerequisites: ["No prior experience required"],
    certifications: [
      {
        name: "Basic Welding Certificate",
        description: "Certificate of completion for basic welding course",
        issuingBody: "WeldMaster Training Institute"
      }
    ],
    materials: [
      { name: "Welding Helmet", included: true },
      { name: "Safety Gloves", included: true },
      { name: "Welding Textbook", included: true }
    ]
  },
  {
    title: "Advanced TIG Welding",
    description: "Master advanced TIG welding techniques for precision work and specialized applications.",
    category: "Advanced Welding",
    duration: "60 hours",
    price: 1299.99,
    image: "/images/training/tig-welding.jpg",
    featured: true,
    instructor: {
      name: "Lisa Chen",
      qualifications: "Master Welder, AWS Senior Certified Welding Inspector",
      experience: "20+ years in precision welding"
    },
    schedule: [
      {
        date: new Date("2024-03-20"),
        time: "9:00 AM - 5:00 PM",
        location: "Advanced Training Center",
        availableSeats: 6
      }
    ],
    curriculum: [
      {
        module: "TIG Equipment Setup",
        description: "Advanced TIG equipment configuration and optimization",
        duration: "10 hours"
      },
      {
        module: "Precision Techniques",
        description: "Advanced TIG welding techniques and applications",
        duration: "30 hours"
      },
      {
        module: "Specialized Applications",
        description: "TIG welding for specialized materials and applications",
        duration: "20 hours"
      }
    ],
    prerequisites: ["Basic welding experience", "TIG welding fundamentals"],
    certifications: [
      {
        name: "Advanced TIG Welding Certificate",
        description: "Advanced TIG welding certification",
        issuingBody: "WeldMaster Training Institute"
      }
    ],
    materials: [
      { name: "TIG Welding Equipment", included: true },
      { name: "Specialized Materials", included: true },
      { name: "Advanced Techniques Manual", included: true }
    ]
  }
];

const sampleCareers = [
  {
    title: "Senior Welding Engineer",
    department: "Engineering",
    location: "Houston, TX",
    type: "Full-time",
    description: "We are seeking an experienced Senior Welding Engineer to lead our technical welding operations and develop innovative welding solutions.",
    responsibilities: [
      "Lead welding process development and optimization",
      "Design and implement welding procedures and specifications",
      "Provide technical support to production teams",
      "Conduct welding audits and quality assessments",
      "Mentor junior welding engineers and technicians"
    ],
    requirements: [
      "Bachelor's degree in Welding Engineering or related field",
      "Minimum 8 years of experience in welding engineering",
      "AWS Certified Welding Engineer (CWEng) preferred",
      "Experience with multiple welding processes (GMAW, GTAW, SMAW)",
      "Strong knowledge of welding codes and standards"
    ],
    qualifications: {
      education: "Bachelor's degree in Welding Engineering or Mechanical Engineering",
      experience: "8+ years in welding engineering",
      certifications: ["AWS Certified Welding Engineer", "Professional Engineer License"],
      skills: ["Process Development", "Quality Control", "Project Management", "Technical Leadership"]
    },
    benefits: [
      "Competitive salary with performance bonuses",
      "Comprehensive health insurance",
      "401(k) with company match",
      "Professional development opportunities",
      "Relocation assistance available"
    ],
    salary: {
      min: 85000,
      max: 120000,
      currency: "USD"
    },
    isRemote: false,
    isActive: true,
    contactEmail: "careers@weldmaster.com"
  },
  {
    title: "Welding Technician",
    department: "Production",
    location: "Dallas, TX",
    type: "Full-time",
    description: "Join our production team as a Welding Technician to perform high-quality welding operations in our manufacturing facility.",
    responsibilities: [
      "Perform welding operations according to specifications",
      "Set up and operate welding equipment",
      "Inspect welds for quality and compliance",
      "Maintain welding equipment and work area",
      "Follow safety procedures and protocols"
    ],
    requirements: [
      "High school diploma or equivalent",
      "Minimum 3 years of welding experience",
      "AWS certification preferred",
      "Ability to read and interpret blueprints",
      "Strong attention to detail and quality"
    ],
    qualifications: {
      education: "High school diploma or equivalent",
      experience: "3+ years of welding experience",
      certifications: ["AWS Certified Welder"],
      skills: ["GMAW", "GTAW", "SMAW", "Blueprint Reading", "Quality Control"]
    },
    benefits: [
      "Competitive hourly wage",
      "Health and dental insurance",
      "Paid time off",
      "Overtime opportunities",
      "Training and certification support"
    ],
    salary: {
      min: 22,
      max: 28,
      currency: "USD"
    },
    isRemote: false,
    isActive: true,
    contactEmail: "careers@weldmaster.com"
  }
];

async function seedDatabase() {
  try {
    await connectDB();
    
    console.log('🌱 Starting database seeding...');
    
    // Clear existing data
    await Product.deleteMany({});
    await Industry.deleteMany({});
    await Training.deleteMany({});
    await Career.deleteMany({});
    
    console.log('🗑️ Cleared existing data');
    
    // Insert sample data
    const products = await Product.insertMany(sampleProducts);
    const industries = await Industry.insertMany(sampleIndustries);
    const training = await Training.insertMany(sampleTraining);
    const careers = await Career.insertMany(sampleCareers);
    
    console.log(`✅ Seeded database successfully:`);
    console.log(`   - ${products.length} products`);
    console.log(`   - ${industries.length} industries`);
    console.log(`   - ${training.length} training courses`);
    console.log(`   - ${careers.length} career postings`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedDatabase();
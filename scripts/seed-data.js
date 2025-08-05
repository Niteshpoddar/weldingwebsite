require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')

// Import models
const Product = require('../lib/models/Product.js').default
const Industry = require('../lib/models/Industry.js').default
const TrainingCourse = require('../lib/models/TrainingCourse.js').default
const JobPosting = require('../lib/models/JobPosting.js').default

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    // Clear existing data
    await Product.deleteMany({})
    await Industry.deleteMany({})
    await TrainingCourse.deleteMany({})
    await JobPosting.deleteMany({})
    console.log('Cleared existing data')

    // Seed Products
    const products = [
      {
        name: "MIG-250 Professional Welder",
        category: "welding-equipment",
        description: "High-performance MIG welder suitable for industrial applications. Features digital display, precise arc control, and robust construction.",
        specifications: {
          amperage: "30-250A",
          voltage: "220V/440V",
          duty_cycle: "60% at 250A",
          weight: "85 lbs"
        },
        price: 2499.99,
        images: ["/images/mig-250.jpg"],
        featured: true,
        tags: ["MIG", "professional", "industrial"]
      },
      {
        name: "TIG-200 Precision Welder",
        category: "welding-equipment",
        description: "Precision TIG welder perfect for detailed work on stainless steel and aluminum. AC/DC capability with pulse control.",
        specifications: {
          amperage: "5-200A",
          voltage: "220V",
          duty_cycle: "35% at 200A",
          weight: "45 lbs"
        },
        price: 1899.99,
        images: ["/images/tig-200.jpg"],
        featured: true,
        tags: ["TIG", "precision", "aluminum"]
      },
      {
        name: "Premium Safety Helmet",
        category: "safety-gear",
        description: "Auto-darkening welding helmet with panoramic view and multiple arc sensors for optimal protection.",
        specifications: {
          shade_range: "9-13",
          switching_time: "1/25000s",
          sensor_count: 4,
          weight: "1.8 lbs"
        },
        price: 299.99,
        images: ["/images/safety-helmet.jpg"],
        featured: false,
        tags: ["safety", "auto-darkening", "protection"]
      },
      {
        name: "ER70S-6 Welding Wire",
        category: "consumables",
        description: "High-quality carbon steel welding wire for MIG welding. Excellent arc stability and minimal spatter.",
        specifications: {
          diameter: "0.035 inch",
          weight: "44 lbs",
          material: "Carbon Steel",
          aws_class: "ER70S-6"
        },
        price: 89.99,
        images: ["/images/welding-wire.jpg"],
        featured: false,
        tags: ["consumables", "MIG", "carbon-steel"]
      }
    ]

    const createdProducts = await Product.insertMany(products)
    console.log(`Seeded ${createdProducts.length} products`)

    // Seed Industries
    const industries = [
      {
        name: "Automotive Manufacturing",
        slug: "automotive-manufacturing",
        description: "Comprehensive welding solutions for automotive assembly lines, chassis fabrication, and component manufacturing.",
        services: [
          "Assembly line welding automation",
          "Chassis and frame welding",
          "Exhaust system fabrication",
          "Body panel joining",
          "Quality control and inspection"
        ],
        applications: [
          "Robotic welding systems",
          "Spot welding for body assembly",
          "MIG welding for structural components",
          "Laser welding for precision parts"
        ],
        image: "/images/automotive-industry.jpg",
        featured: true,
        caseStudies: [
          {
            title: "Major Auto Plant Automation",
            description: "Implemented robotic welding system for SUV production line",
            results: "40% increase in production efficiency"
          }
        ]
      },
      {
        name: "Construction & Infrastructure",
        slug: "construction-infrastructure",
        description: "Heavy-duty welding services for bridges, buildings, and infrastructure projects requiring certified structural welding.",
        services: [
          "Structural steel welding",
          "Bridge construction",
          "High-rise building framework",
          "Pipeline installation",
          "Certified welding procedures"
        ],
        applications: [
          "Arc welding for structural steel",
          "Flux-cored welding for outdoor projects",
          "Stick welding for heavy sections",
          "Submerged arc welding for thick materials"
        ],
        image: "/images/construction-industry.jpg",
        featured: true,
        caseStudies: [
          {
            title: "Downtown Bridge Project",
            description: "Complete welding services for 500ft steel bridge construction",
            results: "Project completed 2 weeks ahead of schedule"
          }
        ]
      },
      {
        name: "Oil & Gas",
        slug: "oil-gas",
        description: "Specialized welding services for oil refineries, pipelines, and offshore platforms with strict safety and quality standards.",
        services: [
          "Pipeline welding and repair",
          "Pressure vessel fabrication",
          "Offshore platform construction",
          "Refinery maintenance",
          "API certified procedures"
        ],
        applications: [
          "Pipeline welding with X-ray testing",
          "Stainless steel for chemical processing",
          "Underwater welding capabilities",
          "High-pressure system fabrication"
        ],
        image: "/images/oil-gas-industry.jpg",
        featured: true
      }
    ]

    const createdIndustries = await Industry.insertMany(industries)
    console.log(`Seeded ${createdIndustries.length} industries`)

    // Seed Training Courses
    const trainingCourses = [
      {
        title: "Basic MIG Welding Fundamentals",
        slug: "basic-mig-welding",
        description: "Learn the fundamentals of MIG welding including safety, equipment setup, and basic techniques. Perfect for beginners entering the welding field.",
        level: "beginner",
        duration: "40 hours (1 week)",
        price: 899.99,
        curriculum: [
          {
            module: "Safety and PPE",
            topics: ["Welding safety fundamentals", "Personal protective equipment", "Workshop safety procedures"]
          },
          {
            module: "Equipment Basics",
            topics: ["MIG welder components", "Gas selection", "Wire selection", "Equipment maintenance"]
          },
          {
            module: "Welding Techniques",
            topics: ["Basic joint types", "Travel speed", "Gun angle", "Arc length control"]
          }
        ],
        prerequisites: ["High school diploma or equivalent", "Basic math skills"],
        certification: "AWS D1.1 Basic MIG Certification",
        instructor: {
          name: "Mike Rodriguez",
          bio: "Certified Welding Inspector with 15 years of industrial experience",
          image: "/images/instructor-mike.jpg"
        },
        schedule: [
          {
            startDate: new Date('2024-02-05'),
            endDate: new Date('2024-02-09'),
            location: "Main Training Center",
            maxStudents: 12,
            enrolledStudents: 8
          }
        ],
        image: "/images/mig-training.jpg",
        featured: true
      },
      {
        title: "Advanced TIG Welding Mastery",
        slug: "advanced-tig-welding",
        description: "Master advanced TIG welding techniques for stainless steel and aluminum. Learn precision control and exotic material welding.",
        level: "advanced",
        duration: "80 hours (2 weeks)",
        price: 1899.99,
        curriculum: [
          {
            module: "Advanced Materials",
            topics: ["Stainless steel welding", "Aluminum techniques", "Exotic alloys", "Dissimilar metal joining"]
          },
          {
            module: "Precision Techniques",
            topics: ["Pulse welding", "Walking the cup", "Freehand techniques", "Orbital welding"]
          },
          {
            module: "Quality Control",
            topics: ["Visual inspection", "Penetrant testing", "X-ray interpretation", "Weld defect analysis"]
          }
        ],
        prerequisites: ["Basic TIG welding experience", "AWS D17.1 certification recommended"],
        certification: "AWS D17.1 Advanced TIG Certification",
        instructor: {
          name: "Sarah Chen",
          bio: "Master welder specializing in aerospace and nuclear applications",
          image: "/images/instructor-sarah.jpg"
        },
        schedule: [
          {
            startDate: new Date('2024-02-12'),
            endDate: new Date('2024-02-23'),
            location: "Advanced Training Lab",
            maxStudents: 8,
            enrolledStudents: 5
          }
        ],
        image: "/images/tig-training.jpg",
        featured: true
      },
      {
        title: "Welding Inspector Certification",
        slug: "welding-inspector-certification",
        description: "Comprehensive training for AWS Certified Welding Inspector (CWI) certification. Learn inspection techniques, codes, and standards.",
        level: "advanced",
        duration: "120 hours (3 weeks)",
        price: 2499.99,
        curriculum: [
          {
            module: "Welding Codes and Standards",
            topics: ["AWS D1.1 Structural", "API 1104 Pipeline", "ASME Section IX", "International standards"]
          },
          {
            module: "Inspection Techniques",
            topics: ["Visual inspection", "NDT methods", "Documentation", "Quality assurance"]
          },
          {
            module: "Metallurgy and Materials",
            topics: ["Steel metallurgy", "Heat treatment", "Material properties", "Failure analysis"]
          }
        ],
        prerequisites: ["5+ years welding experience", "High school diploma", "Vision test"],
        certification: "AWS Certified Welding Inspector (CWI)",
        instructor: {
          name: "Robert Thompson",
          bio: "Senior CWI with 20+ years in aerospace and nuclear industries",
          image: "/images/instructor-robert.jpg"
        },
        schedule: [
          {
            startDate: new Date('2024-03-01'),
            endDate: new Date('2024-03-22'),
            location: "Certification Center",
            maxStudents: 20,
            enrolledStudents: 15
          }
        ],
        image: "/images/inspector-training.jpg",
        featured: false
      }
    ]

    const createdCourses = await TrainingCourse.insertMany(trainingCourses)
    console.log(`Seeded ${createdCourses.length} training courses`)

    // Seed Job Postings
    const jobPostings = [
      {
        title: "Senior Welding Engineer",
        department: "Engineering",
        location: "Houston, TX",
        type: "full-time",
        experience: "5+ years",
        salary: {
          min: 85000,
          max: 120000,
          currency: "USD"
        },
        description: "Lead welding engineering projects for oil & gas industry clients. Develop welding procedures, oversee quality control, and manage welding operations.",
        responsibilities: [
          "Develop and qualify welding procedures (WPS/PQR)",
          "Oversee welding operations and quality control",
          "Train and mentor junior welding staff",
          "Interface with clients on technical requirements",
          "Conduct failure analysis and troubleshooting"
        ],
        requirements: [
          "Bachelor's degree in Welding Engineering or related field",
          "AWS Certified Welding Inspector (CWI) required",
          "5+ years of industrial welding experience",
          "Experience with ASME and API codes",
          "Strong leadership and communication skills"
        ],
        benefits: [
          "Competitive salary with performance bonuses",
          "Comprehensive health, dental, and vision insurance",
          "401(k) with company matching",
          "Professional development opportunities",
          "Flexible work arrangements"
        ],
        skills: ["Welding Engineering", "AWS Codes", "ASME", "API", "Quality Control", "Leadership"],
        featured: true,
        applicationDeadline: new Date('2024-03-15')
      },
      {
        title: "Certified Welder - Structural Steel",
        department: "Production",
        location: "Denver, CO",
        type: "full-time",
        experience: "3-5 years",
        salary: {
          min: 55000,
          max: 75000,
          currency: "USD"
        },
        description: "Perform structural steel welding for construction projects. Must be certified in SMAW, GMAW, and FCAW processes.",
        responsibilities: [
          "Perform structural steel welding per AWS D1.1",
          "Read and interpret welding symbols and blueprints",
          "Maintain welding equipment and tools",
          "Follow safety procedures and quality standards",
          "Complete daily production reports"
        ],
        requirements: [
          "AWS D1.1 Structural Welding Certification",
          "3+ years of structural welding experience",
          "Ability to pass welding tests in all positions",
          "Basic blueprint reading skills",
          "Physical ability to work in various positions"
        ],
        benefits: [
          "Competitive hourly wages",
          "Health insurance",
          "Paid time off",
          "Safety bonus program",
          "Tool allowance"
        ],
        skills: ["SMAW", "GMAW", "FCAW", "Structural Welding", "Blueprint Reading", "AWS D1.1"],
        featured: false,
        applicationDeadline: new Date('2024-02-28')
      },
      {
        title: "Welding Instructor",
        department: "Training",
        location: "Phoenix, AZ",
        type: "full-time",
        experience: "5+ years",
        salary: {
          min: 65000,
          max: 85000,
          currency: "USD"
        },
        description: "Teach welding courses to students of all skill levels. Develop curriculum and maintain training equipment.",
        responsibilities: [
          "Conduct welding classes for various skill levels",
          "Develop and update training curriculum",
          "Maintain training equipment and workshop",
          "Assess student progress and provide feedback",
          "Prepare students for certification exams"
        ],
        requirements: [
          "AWS Certified Welding Educator (CWE) preferred",
          "5+ years of welding experience",
          "Teaching or training experience",
          "Excellent communication skills",
          "Patience and ability to work with diverse learners"
        ],
        benefits: [
          "Competitive salary",
          "Summer break schedule",
          "Professional development funding",
          "Health and retirement benefits",
          "Job security in growing field"
        ],
        skills: ["Teaching", "Curriculum Development", "AWS Certification", "Multiple Welding Processes", "Student Assessment"],
        featured: true,
        applicationDeadline: new Date('2024-04-01')
      }
    ]

    const createdJobs = await JobPosting.insertMany(jobPostings)
    console.log(`Seeded ${createdJobs.length} job postings`)

    console.log('Database seeding completed successfully!')
    console.log('\nSeeded data summary:')
    console.log(`- ${createdProducts.length} products`)
    console.log(`- ${createdIndustries.length} industries`)
    console.log(`- ${createdCourses.length} training courses`)
    console.log(`- ${createdJobs.length} job postings`)

  } catch (error) {
    console.error('Error seeding database:', error)
  } finally {
    await mongoose.connection.close()
    console.log('Database connection closed')
  }
}

seedData()
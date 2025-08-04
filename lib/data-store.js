import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const JOBS_FILE = path.join(DATA_DIR, 'jobs.json');
const TRAININGS_FILE = path.join(DATA_DIR, 'trainings.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize files if they don't exist
if (!fs.existsSync(JOBS_FILE)) {
  fs.writeFileSync(JOBS_FILE, JSON.stringify([
    {
      id: 1,
      title: 'Sales Engineer',
      department: 'Sales',
      location: 'Ahmedabad / Field',
      type: 'Full-time',
      experience: '2+ years',
      description: 'Drive sales growth in industrial roller markets with technical expertise and client relationship management.',
      requirements: ['Diploma/Degree in Engineering', '2+ years sales experience', 'Knowledge of industrial markets', 'Client relationship skills'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 2,
      title: 'Quality Inspector',
      department: 'Quality Control',
      location: 'Ahmedabad Factory',
      type: 'Full-time', 
      experience: '1-3 years',
      description: 'Ensure product quality through inspection, testing, and quality control procedures.',
      requirements: ['Mechanical/Industrial background', 'QC experience preferred', 'Basic metrology knowledge', 'Attention to detail'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ], null, 2));
}

if (!fs.existsSync(TRAININGS_FILE)) {
  fs.writeFileSync(TRAININGS_FILE, JSON.stringify([
    {
      id: 1,
      name: 'Installation & Commissioning',
      duration: 'On-site',
      level: 'Technical',
      description: 'Professional installation supervision and alignment of supplied roller systems.',
      topics: ['Roller Installation', 'Alignment Procedures', 'System Integration', 'Performance Testing'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 2,
      name: 'Maintenance Training',
      duration: '1-2 days',
      level: 'Operator',
      description: 'Basic preventive maintenance training for plant operators and maintenance teams.',
      topics: ['Routine Maintenance', 'Troubleshooting', 'Safety Procedures', 'Performance Monitoring'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ], null, 2));
}

// Helper functions to read and write data
function readJobs() {
  try {
    const data = fs.readFileSync(JOBS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading jobs file:', error);
    return [];
  }
}

function writeJobs(jobs) {
  try {
    fs.writeFileSync(JOBS_FILE, JSON.stringify(jobs, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing jobs file:', error);
    return false;
  }
}

function readTrainings() {
  try {
    const data = fs.readFileSync(TRAININGS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading trainings file:', error);
    return [];
  }
}

function writeTrainings(trainings) {
  try {
    fs.writeFileSync(TRAININGS_FILE, JSON.stringify(trainings, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing trainings file:', error);
    return false;
  }
}

// Jobs CRUD operations
export const jobsStore = {
  getAll: () => readJobs(),
  
  getById: (id) => {
    const jobs = readJobs();
    return jobs.find(job => job.id === parseInt(id));
  },
  
  create: (jobData) => {
    const jobs = readJobs();
    const newJob = {
      ...jobData,
      id: Math.max(...jobs.map(j => j.id), 0) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    jobs.push(newJob);
    if (writeJobs(jobs)) {
      return newJob;
    }
    return null;
  },
  
  update: (id, jobData) => {
    const jobs = readJobs();
    const index = jobs.findIndex(job => job.id === parseInt(id));
    if (index === -1) return null;
    
    jobs[index] = {
      ...jobs[index],
      ...jobData,
      id: parseInt(id),
      updatedAt: new Date().toISOString()
    };
    
    if (writeJobs(jobs)) {
      return jobs[index];
    }
    return null;
  },
  
  delete: (id) => {
    const jobs = readJobs();
    const filteredJobs = jobs.filter(job => job.id !== parseInt(id));
    if (filteredJobs.length === jobs.length) return false;
    
    return writeJobs(filteredJobs);
  }
};

// Trainings CRUD operations
export const trainingsStore = {
  getAll: () => readTrainings(),
  
  getById: (id) => {
    const trainings = readTrainings();
    return trainings.find(training => training.id === parseInt(id));
  },
  
  create: (trainingData) => {
    const trainings = readTrainings();
    const newTraining = {
      ...trainingData,
      id: Math.max(...trainings.map(t => t.id), 0) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    trainings.push(newTraining);
    if (writeTrainings(trainings)) {
      return newTraining;
    }
    return null;
  },
  
  update: (id, trainingData) => {
    const trainings = readTrainings();
    const index = trainings.findIndex(training => training.id === parseInt(id));
    if (index === -1) return null;
    
    trainings[index] = {
      ...trainings[index],
      ...trainingData,
      id: parseInt(id),
      updatedAt: new Date().toISOString()
    };
    
    if (writeTrainings(trainings)) {
      return trainings[index];
    }
    return null;
  },
  
  delete: (id) => {
    const trainings = readTrainings();
    const filteredTrainings = trainings.filter(training => training.id !== parseInt(id));
    if (filteredTrainings.length === trainings.length) return false;
    
    return writeTrainings(filteredTrainings);
  }
};
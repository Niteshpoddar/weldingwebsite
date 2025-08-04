import clientPromise from './mongodb';

const DATABASE_NAME = 'welding_company';
const JOBS_COLLECTION = 'jobs';
const TRAININGS_COLLECTION = 'trainings';

// Helper function to get database connection
async function getDb() {
  const client = await clientPromise;
  return client.db(DATABASE_NAME);
}

// Initialize sample data if collections are empty
async function initializeSampleData() {
  const db = await getDb();
  
  // Check if jobs collection is empty
  const jobsCount = await db.collection(JOBS_COLLECTION).countDocuments();
  if (jobsCount === 0) {
    const sampleJobs = [
      {
        title: 'Sales Engineer',
        department: 'Sales',
        location: 'Ahmedabad / Field',
        type: 'Full-time',
        experience: '2+ years',
        description: 'Drive sales growth in industrial roller markets with technical expertise and client relationship management.',
        requirements: ['Diploma/Degree in Engineering', '2+ years sales experience', 'Knowledge of industrial markets', 'Client relationship skills'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Quality Inspector',
        department: 'Quality Control',
        location: 'Ahmedabad Factory',
        type: 'Full-time', 
        experience: '1-3 years',
        description: 'Ensure product quality through inspection, testing, and quality control procedures.',
        requirements: ['Mechanical/Industrial background', 'QC experience preferred', 'Basic metrology knowledge', 'Attention to detail'],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    await db.collection(JOBS_COLLECTION).insertMany(sampleJobs);
  }
  
  // Check if trainings collection is empty
  const trainingsCount = await db.collection(TRAININGS_COLLECTION).countDocuments();
  if (trainingsCount === 0) {
    const sampleTrainings = [
      {
        name: 'Installation & Commissioning',
        duration: 'On-site',
        level: 'Technical',
        description: 'Professional installation supervision and alignment of supplied roller systems.',
        topics: ['Roller Installation', 'Alignment Procedures', 'System Integration', 'Performance Testing'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Maintenance Training',
        duration: '1-2 days',
        level: 'Operator',
        description: 'Basic preventive maintenance training for plant operators and maintenance teams.',
        topics: ['Routine Maintenance', 'Troubleshooting', 'Safety Procedures', 'Performance Monitoring'],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    await db.collection(TRAININGS_COLLECTION).insertMany(sampleTrainings);
  }
}

// Jobs CRUD operations
export const jobsStore = {
  getAll: async () => {
    try {
      const db = await getDb();
      await initializeSampleData();
      const jobs = await db.collection(JOBS_COLLECTION).find({}).toArray();
      return jobs;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      return [];
    }
  },
  
  getById: async (id) => {
    try {
      const db = await getDb();
      const job = await db.collection(JOBS_COLLECTION).findOne({ _id: id });
      return job;
    } catch (error) {
      console.error('Error fetching job:', error);
      return null;
    }
  },
  
  create: async (jobData) => {
    try {
      const db = await getDb();
      const newJob = {
        ...jobData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const result = await db.collection(JOBS_COLLECTION).insertOne(newJob);
      return { ...newJob, _id: result.insertedId };
    } catch (error) {
      console.error('Error creating job:', error);
      return null;
    }
  },
  
  update: async (id, jobData) => {
    try {
      const db = await getDb();
      const updatedJob = {
        ...jobData,
        updatedAt: new Date()
      };
      
      const result = await db.collection(JOBS_COLLECTION).findOneAndUpdate(
        { _id: id },
        { $set: updatedJob },
        { returnDocument: 'after' }
      );
      
      return result.value;
    } catch (error) {
      console.error('Error updating job:', error);
      return null;
    }
  },
  
  delete: async (id) => {
    try {
      const db = await getDb();
      const result = await db.collection(JOBS_COLLECTION).deleteOne({ _id: id });
      return result.deletedCount > 0;
    } catch (error) {
      console.error('Error deleting job:', error);
      return false;
    }
  }
};

// Trainings CRUD operations
export const trainingsStore = {
  getAll: async () => {
    try {
      const db = await getDb();
      await initializeSampleData();
      const trainings = await db.collection(TRAININGS_COLLECTION).find({}).toArray();
      return trainings;
    } catch (error) {
      console.error('Error fetching trainings:', error);
      return [];
    }
  },
  
  getById: async (id) => {
    try {
      const db = await getDb();
      const training = await db.collection(TRAININGS_COLLECTION).findOne({ _id: id });
      return training;
    } catch (error) {
      console.error('Error fetching training:', error);
      return null;
    }
  },
  
  create: async (trainingData) => {
    try {
      const db = await getDb();
      const newTraining = {
        ...trainingData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const result = await db.collection(TRAININGS_COLLECTION).insertOne(newTraining);
      return { ...newTraining, _id: result.insertedId };
    } catch (error) {
      console.error('Error creating training:', error);
      return null;
    }
  },
  
  update: async (id, trainingData) => {
    try {
      const db = await getDb();
      const updatedTraining = {
        ...trainingData,
        updatedAt: new Date()
      };
      
      const result = await db.collection(TRAININGS_COLLECTION).findOneAndUpdate(
        { _id: id },
        { $set: updatedTraining },
        { returnDocument: 'after' }
      );
      
      return result.value;
    } catch (error) {
      console.error('Error updating training:', error);
      return null;
    }
  },
  
  delete: async (id) => {
    try {
      const db = await getDb();
      const result = await db.collection(TRAININGS_COLLECTION).deleteOne({ _id: id });
      return result.deletedCount > 0;
    } catch (error) {
      console.error('Error deleting training:', error);
      return false;
    }
  }
};
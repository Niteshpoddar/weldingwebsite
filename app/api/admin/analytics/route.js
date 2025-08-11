import { NextResponse } from 'next/server';
import { connectDB } from '../../../dbconfig/dbconfig';
import JobApplication from '../../../models/jobApplication';
import TrainingApplication from '../../../models/trainingApplication';
import ContactQuery from '../../../models/contactQuery';

export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');
    
    // Calculate date range
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    // Fetch data within date range
    const [jobApplications, trainingApplications, contactQueries] = await Promise.all([
      JobApplication.find({ appliedAt: { $gte: startDate } }).lean(),
      TrainingApplication.find({ appliedAt: { $gte: startDate } }).lean(),
      ContactQuery.find({ submittedAt: { $gte: startDate } }).lean()
    ]);

    // Calculate application status distribution
    const applicationsByStatus = {};
    [...jobApplications, ...trainingApplications].forEach(app => {
      const status = app.status || 'pending';
      applicationsByStatus[status] = (applicationsByStatus[status] || 0) + 1;
    });

    // Calculate training course statistics
    const trainingCourseStats = {};
    trainingApplications.forEach(app => {
      const course = app.trainingCourse;
      trainingCourseStats[course] = (trainingCourseStats[course] || 0) + 1;
    });

    // Generate recent activity
    const recentActivity = [];
    
    // Add job applications
    jobApplications.slice(0, 5).forEach(app => {
      recentActivity.push({
        type: 'Job Application',
        description: `${app.fullName} applied for ${app.position}`,
        timestamp: new Date(app.appliedAt).toLocaleDateString('en-IN'),
        status: app.status
      });
    });

    // Add training applications
    trainingApplications.slice(0, 5).forEach(app => {
      recentActivity.push({
        type: 'Training Application',
        description: `${app.fullName} registered for ${app.trainingCourse}`,
        timestamp: new Date(app.appliedAt).toLocaleDateString('en-IN'),
        status: app.status
      });
    });

    // Add contact queries
    contactQueries.slice(0, 5).forEach(query => {
      recentActivity.push({
        type: 'Contact Query',
        description: `${query.name} sent a message`,
        timestamp: new Date(query.submittedAt).toLocaleDateString('en-IN'),
        status: 'new'
      });
    });

    // Sort by timestamp (most recent first)
    recentActivity.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    // Calculate monthly trends (last 6 months)
    const monthlyTrends = {};
    for (let i = 5; i >= 0; i--) {
      const month = new Date();
      month.setMonth(month.getMonth() - i);
      const monthKey = month.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
      
      const monthStart = new Date(month.getFullYear(), month.getMonth(), 1);
      const monthEnd = new Date(month.getFullYear(), month.getMonth() + 1, 0);
      
      const monthJobApps = jobApplications.filter(app => 
        new Date(app.appliedAt) >= monthStart && new Date(app.appliedAt) <= monthEnd
      ).length;
      
      const monthTrainingApps = trainingApplications.filter(app => 
        new Date(app.appliedAt) >= monthStart && new Date(app.appliedAt) <= monthEnd
      ).length;
      
      monthlyTrends[monthKey] = {
        jobs: monthJobApps,
        trainings: monthTrainingApps,
        total: monthJobApps + monthTrainingApps
      };
    }

    return NextResponse.json({
      totalApplications: jobApplications.length + trainingApplications.length,
      totalJobs: jobApplications.length,
      totalTrainings: trainingApplications.length,
      totalContacts: contactQueries.length,
      applicationsByStatus,
      trainingCourseStats,
      monthlyTrends,
      recentActivity: recentActivity.slice(0, 10),
      timeRange: days
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}

import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Bell,
  FileText,
  UserPlus,
  CircleDollarSign,
  MessageSquareWarning,
  type LucideIcon,
  Presentation,
  PersonStanding,
} from 'lucide-react';

export type Task = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  isUserAdded?: boolean;
};

export const todoTasks: Task[] = [
  {
    id: 'task1',
    title: 'Review 12 new admission enquiries',
    icon: UserPlus,
    description: 'Respond to new parent queries.',
    href: '#',
  },
  {
    id: 'task2',
    title: 'Approve 25 pending fee payments',
    icon: CircleDollarSign,
    description: 'Awaiting confirmation for monthly fees.',
    href: '#',
  },
  {
    id: 'task3',
    title: 'Finalize Annual Sports Day schedule',
    icon: Bell,
    description: 'Event is next week, requires final sign-off.',
    href: '#',
  },
  {
    id: 'task4',
    title: 'Review Class 9 Mid-term results',
    icon: FileText,
    description: 'Results to be published by Friday.',
    href: '#',
  },
  {
    id: 'task5',
    title: 'Address 2 new parent complaints',
    icon: MessageSquareWarning,
    description: 'Regarding bus routes and cafeteria food.',
    href: '#',
  },
  {
    id: 'task6',
    title: 'Plan professional development session for teachers',
    icon: Presentation,
    description: 'Topic: "Integrating AI in the Classroom".',
    href: '#',
  },
];

export const growthData = [
  { month: 'Jan', admissions: 30, fees: 5.2, strength: 805, enquiries: 45 },
  { month: 'Feb', admissions: 28, fees: 4.9, strength: 825, enquiries: 40 },
  { month: 'Mar', admissions: 48, fees: 6.5, strength: 860, enquiries: 65 },
  { month: 'Apr', admissions: 55, fees: 7.8, strength: 915, enquiries: 75 },
  { month: 'May', admissions: 62, fees: 8.5, strength: 960, enquiries: 80 },
  { month: 'Jun', admissions: 70, fees: 9.1, strength: 1010, enquiries: 95 },
];

export const admissionFunnelData = {
  thisMonth: [
    { stage: 'Enquiries', value: 150 },
    { stage: 'Campus Visits', value: 110 },
    { stage: 'Forms Filled', value: 95 },
    { stage: 'Offers Extended', value: 70 },
    { stage: 'Enrolled', value: 62 },
  ],
  lastMonth: [
    { stage: 'Enquiries', value: 135 },
    { stage: 'Campus Visits', value: 90 },
    { stage: 'Forms Filled', value: 80 },
    { stage: 'Offers Extended', value: 65 },
    { stage: 'Enrolled', value: 58 },
  ],
};

export const geotagData = {
  school: [
    { location: 'Kanpur', students: 250 },
    { location: 'Rampur', students: 180 },
    { location: 'Barahpur', students: 95 },
    { location: 'Lucknow', students: 70 },
    { location: 'Unnao', students: 40 },
    { location: 'Sitapur', students: 25 },
    { location: 'Others', students: 50 },
  ],
  class9: [
    { location: 'Kanpur', students: 60 },
    { location: 'Rampur', students: 45 },
    { location: 'Barahpur', students: 20 },
    { location: 'Lucknow', students: 15 },
    { location: 'Unnao', students: 10 },
  ],
};

export const examHeatmapData = [
  {
    class: 'Class 12',
    passed: 48,
    failed: 2,
    change: 5,
    subjects: [
      { name: 'Physics', passRate: 96, topScorer: 'Alok Nath', weakStudents: 2 },
      { name: 'Chemistry', passRate: 98, topScorer: 'Riya Jain', weakStudents: 1 },
      { name: 'Mathematics', passRate: 92, topScorer: 'Riya Jain', weakStudents: 4 },
      { name: 'English', passRate: 100, topScorer: 'Alok Nath', weakStudents: 0 },
    ],
    toppers: ['Riya Jain', 'Alok Nath', 'Simran'],
    weakest: ['Vikas', 'Pooja'],
    mostFailedSubject: 'Mathematics',
  },
    {
    class: 'Class 11',
    passed: 45,
    failed: 5,
    change: 2,
    subjects: [
      { name: 'Physics', passRate: 90, topScorer: 'Rohan Mehra', weakStudents: 5 },
      { name: 'Chemistry', passRate: 92, topScorer: 'Sneha Verma', weakStudents: 4 },
      { name: 'Mathematics', passRate: 88, topScorer: 'Rohan Mehra', weakStudents: 6 },
      { name: 'English', passRate: 94, topScorer: 'Aditi Singh', weakStudents: 3 },
    ],
    toppers: ['Rohan Mehra', 'Sneha Verma', 'Aditi Singh'],
    weakest: ['Rajesh Kumar', 'Anita Desai', 'Mohit'],
    mostFailedSubject: 'Mathematics',
  },
  {
    class: 'Class 10',
    passed: 46,
    failed: 4,
    change: 8,
    subjects: [
      { name: 'Mathematics', passRate: 94, topScorer: 'Anika Sharma', weakStudents: 3 },
      { name: 'Science', passRate: 90, topScorer: 'Rohan Gupta', weakStudents: 5 },
      { name: 'English', passRate: 98, topScorer: 'Priya Singh', weakStudents: 1 },
      { name: 'Social Studies', passRate: 96, topScorer: 'Vikram Patel', weakStudents: 2 },
    ],
    toppers: ['Anika Sharma', 'Priya Singh', 'Rohan Gupta'],
    weakest: ['Amit Kumar', 'Sunita Devi', 'Rajesh'],
    mostFailedSubject: 'Science',
  },
  {
    class: 'Class 9',
    passed: 37,
    failed: 13,
    change: -12,
    subjects: [
      { name: 'Mathematics', passRate: 72, topScorer: 'Suresh Verma', weakStudents: 14 },
      { name: 'Science', passRate: 78, topScorer: 'Meena Kumari', weakStudents: 11 },
      { name: 'English', passRate: 84, topScorer: 'Arjun Reddy', weakStudents: 8 },
      { name: 'Social Studies', passRate: 75, topScorer: 'Suresh Verma', weakStudents: 12 },
    ],
    toppers: ['Suresh Verma', 'Meena Kumari', 'Arjun Reddy'],
    weakest: ['Deepak Joshi', 'Lalita Singh', 'Kavita'],
    mostFailedSubject: 'Mathematics',
  },
  {
    class: 'Class 8',
    passed: 48,
    failed: 2,
    change: 15,
    subjects: [
      { name: 'Mathematics', passRate: 95, topScorer: 'Riya Jain', weakStudents: 2 },
      { name: 'Science', passRate: 98, topScorer: 'Alok Nath', weakStudents: 1 },
      { name: 'English', passRate: 92, topScorer: 'Riya Jain', weakStudents: 4 },
      { name: 'Social Studies', passRate: 96, topScorer: 'Alok Nath', weakStudents: 2 },
    ],
    toppers: ['Riya Jain', 'Alok Nath', 'Simran'],
    weakest: ['Vikas', 'Pooja'],
    mostFailedSubject: 'English',
  },
];

const studentImages = PlaceHolderImages;

export const dropoutData = [
  { id: 'stud1', name: 'Rahul Kumar', class: '9A', roll: 23, performanceChange: -25, image: studentImages.find(i => i.id === 'student-1')?.imageUrl, attendance: 75, feeStatus: 'Pending', grades: [{subject: 'Math', score: 45}, {subject: 'Science', score: 55}, {subject: 'English', score: 60}, {subject: 'History', score: 50}] },
  { id: 'stud2', name: 'Sneha Patel', class: '8B', roll: 12, performanceChange: -18, image: studentImages.find(i => i.id === 'student-2')?.imageUrl, attendance: 85, feeStatus: 'Paid', grades: [{subject: 'Math', score: 60}, {subject: 'Science', score: 65}, {subject: 'English', score: 70}, {subject: 'History', score: 62}] },
  { id: 'stud3', name: 'Amit Singh', class: '9C', roll: 31, performanceChange: -32, image: studentImages.find(i => i.id === 'student-3')?.imageUrl, attendance: 60, feeStatus: 'Pending', grades: [{subject: 'Math', score: 35}, {subject: 'Science', score: 40}, {subject: 'English', score: 52}, {subject: 'History', score: 45}] },
  { id: 'stud4', name: 'Priya Sharma', class: '7A', roll: 5, performanceChange: -22, image: studentImages.find(i => i.id === 'student-4')?.imageUrl, attendance: 90, feeStatus: 'Paid', grades: [{subject: 'Math', score: 55}, {subject: 'Science', score: 62}, {subject: 'English', score: 75}, {subject: 'History', score: 68}] },
  { id: 'stud5', name: 'Karan Verma', class: '9B', roll: 18, performanceChange: -28, image: "https://picsum.photos/seed/stud5/100/100", attendance: 70, feeStatus: 'Paid', grades: [{subject: 'Math', score: 40}, {subject: 'Science', score: 50}, {subject: 'English', score: 65}, {subject: 'History', score: 55}] },
  { id: 'stud6', name: 'Anjali Gupta', class: '10A', roll: 3, performanceChange: -15, image: "https://picsum.photos/seed/stud6/100/100", attendance: 88, feeStatus: 'Paid', grades: [{subject: 'Math', score: 70}, {subject: 'Science', score: 65}, {subject: 'English', score: 80}, {subject: 'History', score: 72}] },
  { id: 'stud7', name: 'Sanjay Dutt', class: '11B', roll: 15, performanceChange: -20, image: "https://picsum.photos/seed/stud7/100/100", attendance: 78, feeStatus: 'Pending', grades: [{subject: 'Physics', score: 50}, {subject: 'Chemistry', score: 58}, {subject: 'Math', score: 62}, {subject: 'English', score: 65}] },
  { id: 'stud8', name: 'Alia Bhatt', class: '12A', roll: 1, performanceChange: -10, image: "https://picsum.photos/seed/stud8/100/100", attendance: 92, feeStatus: 'Paid', grades: [{subject: 'Physics', score: 80}, {subject: 'Chemistry', score: 85}, {subject: 'Math', score: 75}, {subject: 'English', score: 88}] },
];

export const teachers = [
    { id: 't1', name: 'Mr. Sharma (Math)', metrics: { attendanceRate: 0.98, onTimeClassesRate: 1.0, examPerformance: 0.9, complaintsReceived: 0 } },
    { id: 't2', name: 'Ms. Gupta (Science)', metrics: { attendanceRate: 0.95, onTimeClassesRate: 0.9, examPerformance: 0.8, complaintsReceived: 2 } },
    { id: 't3', name: 'Mr. Singh (History)', metrics: { attendanceRate: 0.85, onTimeClassesRate: 0.7, examPerformance: 0.6, complaintsReceived: 5 } },
    { id: 't4', name: 'Mrs. Devi (English)', metrics: { attendanceRate: 0.99, onTimeClassesRate: 0.98, examPerformance: 0.92, complaintsReceived: 1 } },
    { id: 't5', name: 'Mr. Khan (Physics)', metrics: { attendanceRate: 0.91, onTimeClassesRate: 0.95, examPerformance: 0.85, complaintsReceived: 3 } },
    { id: 't6', name: 'Ms. Reddy (Chemistry)', metrics: { attendanceRate: 0.96, onTimeClassesRate: 0.99, examPerformance: 0.88, complaintsReceived: 1 } },
    { id: 't7', name: 'Mr. Verma (Biology)', metrics: { attendanceRate: 0.93, onTimeClassesRate: 0.92, examPerformance: 0.82, complaintsReceived: 4 } },

];

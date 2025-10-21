import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Bell,
  FileText,
  UserPlus,
  CircleDollarSign,
  MessageSquareWarning,
  type LucideIcon,
} from 'lucide-react';

export type Task = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
};

export const todoTasks: Task[] = [
  {
    id: 'task1',
    title: 'Review 5 new admission enquiries',
    icon: UserPlus,
    description: 'Respond to new parent queries.',
    href: '#',
  },
  {
    id: 'task2',
    title: 'Approve 12 pending fee payments',
    icon: CircleDollarSign,
    description: 'Awaiting confirmation.',
    href: '#',
  },
  {
    id: 'task3',
    title: 'Check upcoming school event plan',
    icon: Bell,
    description: 'Annual Sports Day planning.',
    href: '#',
  },
  {
    id: 'task4',
    title: 'Review Class 10 exam results',
    icon: FileText,
    description: 'Results to be published tomorrow.',
    href: '#',
  },
  {
    id: 'task5',
    title: 'Address 2 parent complaints',
    icon: MessageSquareWarning,
    description: 'Urgent attention required.',
    href: '#',
  },
];

export const growthData = [
  { month: 'Jan', admissions: 30, fees: 5.2, strength: 800, enquiries: 40 },
  { month: 'Feb', admissions: 25, fees: 4.8, strength: 820, enquiries: 35 },
  { month: 'Mar', admissions: 45, fees: 6.1, strength: 850, enquiries: 60 },
  { month: 'Apr', admissions: 50, fees: 7.5, strength: 910, enquiries: 70 },
  { month: 'May', admissions: 55, fees: 8.0, strength: 950, enquiries: 75 },
  { month: 'Jun', admissions: 60, fees: 8.2, strength: 1010, enquiries: 80 },
];

export const admissionFunnelData = {
  thisMonth: [
    { name: 'Enquiries', value: 100 },
    { name: 'Forms Filled', value: 50 },
    { name: 'Joined', value: 25 },
  ],
  lastMonth: [
    { name: 'Enquiries', value: 85 },
    { name: 'Forms Filled', value: 40 },
    { name: 'Joined', value: 18 },
  ],
};

export const geotagData = {
  school: [
    { location: 'Kanpur', students: 120 },
    { location: 'Rampur', students: 80 },
    { location: 'Barahpur', students: 25 },
    { location: 'Lucknow', students: 15 },
    { location: 'Unnao', students: 10 },
  ],
  class9: [
    { location: 'Kanpur', students: 40 },
    { location: 'Rampur', students: 25 },
    { location: 'Barahpur', students: 10 },
    { location: 'Lucknow', students: 5 },
  ],
};

export const examHeatmapData = [
  {
    class: 'Class 10',
    passed: 45,
    failed: 5,
    change: 5,
    subjects: [
      { name: 'Mathematics', passRate: 92, topScorer: 'Anika Sharma', weakStudents: 4 },
      { name: 'Science', passRate: 88, topScorer: 'Rohan Gupta', weakStudents: 6 },
      { name: 'English', passRate: 98, topScorer: 'Priya Singh', weakStudents: 1 },
      { name: 'Social Studies', passRate: 95, topScorer: 'Vikram Patel', weakStudents: 2 },
    ],
    toppers: ['Anika Sharma', 'Priya Singh', 'Rohan Gupta'],
    weakest: ['Amit Kumar', 'Sunita Devi'],
    mostFailedSubject: 'Science',
  },
  {
    class: 'Class 9',
    passed: 38,
    failed: 12,
    change: -10,
    subjects: [
      { name: 'Mathematics', passRate: 75, topScorer: 'Suresh Verma', weakStudents: 13 },
      { name: 'Science', passRate: 80, topScorer: 'Meena Kumari', weakStudents: 10 },
      { name: 'English', passRate: 85, topScorer: 'Arjun Reddy', weakStudents: 7 },
      { name: 'Social Studies', passRate: 78, topScorer: 'Suresh Verma', weakStudents: 11 },
    ],
    toppers: ['Suresh Verma', 'Meena Kumari', 'Arjun Reddy'],
    weakest: ['Deepak Joshi', 'Lalita Singh'],
    mostFailedSubject: 'Mathematics',
  },
];

const studentImages = PlaceHolderImages;

export const dropoutData = [
  { id: 'stud1', name: 'Rahul Kumar', class: '9A', roll: 23, performanceChange: -25, image: studentImages.find(i => i.id === 'student-1')?.imageUrl },
  { id: 'stud2', name: 'Sneha Patel', class: '8B', roll: 12, performanceChange: -18, image: studentImages.find(i => i.id === 'student-2')?.imageUrl },
  { id: 'stud3', name: 'Amit Singh', class: '9C', roll: 31, performanceChange: -32, image: studentImages.find(i => i.id === 'student-3')?.imageUrl },
  { id: 'stud4', name: 'Priya Sharma', class: '7A', roll: 5, performanceChange: -22, image: studentImages.find(i => i.id === 'student-4')?.imageUrl },
];

export const teachers = [
    { id: 't1', name: 'Mr. Sharma (Math)', metrics: { attendanceRate: 0.98, onTimeClassesRate: 1.0, examPerformance: 0.9, complaintsReceived: 0 } },
    { id: 't2', name: 'Ms. Gupta (Science)', metrics: { attendanceRate: 0.95, onTimeClassesRate: 0.9, examPerformance: 0.8, complaintsReceived: 2 } },
    { id: 't3', name: 'Mr. Singh (History)', metrics: { attendanceRate: 0.85, onTimeClassesRate: 0.7, examPerformance: 0.6, complaintsReceived: 5 } },
];

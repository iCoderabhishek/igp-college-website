// Course data types
export interface Coordinator {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface Course {
  id: string;
  title: string;
  department: string;
  description: string;
  intake: number;
  coordinators: Coordinator[];
  slug: string;
  imageUrl?: string;
  createdAt: string;
    updatedAt: string;
    
}

// Semester data types
export interface Syllabus {
  id: string;
  title: string;
  fileUrl: string;
  updatedAt: string;
}

export interface CETest {
  id: string;
  testNumber: number;
  subject: string;
  status: 'Completed' | 'Ongoing';
  startDate: string;
  endDate: string;
  questionPdfUrl: string;
}

export interface Assignment {
  id: string;
  subject: string;
  name: string;
  submissionDate: string;
  pdfUrl: string;
}

export interface PreviousYearQuestion {
  id: string;
  subject: string;
  year: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  pdfUrl: string;
}

export interface StudyMaterial {
  id: string;
  subjectCode: string;
  subjectName: string;
  pdfUrl: string;
  videoUrl?: string;
}

export interface SemesterData {
  semesterNumber: number;
  syllabus: Syllabus;
  ceTests: CETest[];
  assignments: Assignment[];
  previousYearQuestions: PreviousYearQuestion[];
  studyMaterials: StudyMaterial[];
}

// Mock coordinators
export const coordinators: Coordinator[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    phone: '123-456-7890',
  },
  {
    id: '2',
    name: 'Prof. Michael Chen',
    email: 'michael.chen@university.edu',
    phone: '123-456-7891',
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    email: 'emily.rodriguez@university.edu',
    phone: '123-456-7892',
  },
  {
    id: '4',
    name: 'Prof. David Kim',
    email: 'david.kim@university.edu',
    phone: '123-456-7893',
  },
  {
    id: '5',
    name: 'Dr. Jennifer Lee',
    email: 'jennifer.lee@university.edu',
    phone: '123-456-7894',
  },
];

// Mock courses
export const courses: Course[] = [
  {
    id: '1',
    title: 'Computer Science',
    department: 'Engineering',
    description:
      'A comprehensive program covering algorithms, data structures, programming languages, and software development principles.',
    intake: 120,
    coordinators: [coordinators[0], coordinators[1]],
    slug: 'computer-science',
    imageUrl: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg',
    createdAt: '2023-01-15T10:30:00Z',
    updatedAt: '2023-12-10T14:45:00Z',
  },
  {
    id: '2',
    title: 'Electrical Engineering',
    department: 'Engineering',
    description:
      'Focuses on electricity, electronics, and electromagnetism for developing technologies and systems.',
    intake: 90,
    coordinators: [coordinators[1], coordinators[2]],
    slug: 'electrical-engineering',
    imageUrl: 'https://images.pexels.com/photos/159108/light-lamp-electricity-power-159108.jpeg',
    createdAt: '2023-02-10T11:15:00Z',
    updatedAt: '2023-11-05T09:20:00Z',
  },
  {
    id: '3',
    title: 'Mechanical Engineering',
    department: 'Engineering',
    description:
      'Studies the design, production, and operation of machinery through application of physics and materials science.',
    intake: 80,
    coordinators: [coordinators[2], coordinators[3]],
    slug: 'mechanical-engineering',
    imageUrl: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg',
    createdAt: '2023-03-05T09:45:00Z',
    updatedAt: '2023-10-18T16:30:00Z',
  },
  {
    id: '4',
    title: 'Business Administration',
    department: 'Business',
    description:
      'Covers management principles, marketing, finance, human resources, and strategic planning for business operations.',
    intake: 150,
    coordinators: [coordinators[3], coordinators[4]],
    slug: 'business-administration',
    imageUrl: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
    createdAt: '2023-01-20T13:00:00Z',
    updatedAt: '2023-12-01T10:50:00Z',
  },
  {
    id: '5',
    title: 'Psychology',
    department: 'Humanities & Social Sciences',
    description:
      'Studies human behavior and mental processes, including perception, cognition, emotion, and interpersonal relationships.',
    intake: 100,
    coordinators: [coordinators[4], coordinators[0]],
    slug: 'psychology',
    imageUrl: 'https://images.pexels.com/photos/207756/pexels-photo-207756.jpeg',
    createdAt: '2023-02-25T14:20:00Z',
    updatedAt: '2023-11-15T11:10:00Z',
  },
  {
    id: '6',
    title: 'Chemistry',
    department: 'Science',
    description:
      'Examines the composition, structure, properties, and changes of matter, and the energy phenomena involved in these changes.',
    intake: 70,
    coordinators: [coordinators[0], coordinators[3]],
    slug: 'chemistry',
    imageUrl: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg',
    createdAt: '2023-03-15T10:10:00Z',
    updatedAt: '2023-10-25T15:40:00Z',
  },
];

// Academic sessions
export const academicSessions = ['2025–26', '2024–25', '2023–24', '2022–23'];

// Mock semester data
export const generateSemesterData = (
  semesterNumber: number
): SemesterData => {
  return {
    semesterNumber,
    syllabus: {
      id: `syllabus-${semesterNumber}`,
      title: `Semester ${semesterNumber} Syllabus`,
      fileUrl: `/syllabus/semester-${semesterNumber}.pdf`,
      updatedAt: '2024-01-15T10:30:00Z',
    },
    ceTests: [
      {
        id: `cet-${semesterNumber}-1`,
        testNumber: 1,
        subject: 'Core Subject 1',
        status: 'Completed',
        startDate: '2024-02-10T09:00:00Z',
        endDate: '2024-02-10T11:00:00Z',
        questionPdfUrl: `/tests/sem${semesterNumber}-test1.pdf`,
      },
      {
        id: `cet-${semesterNumber}-2`,
        testNumber: 2,
        subject: 'Core Subject 2',
        status: 'Ongoing',
        startDate: '2024-03-15T09:00:00Z',
        endDate: '2024-03-15T11:00:00Z',
        questionPdfUrl: `/tests/sem${semesterNumber}-test2.pdf`,
      },
      {
        id: `cet-${semesterNumber}-3`,
        testNumber: 3,
        subject: 'Elective Subject',
        status: 'Completed',
        startDate: '2024-04-05T09:00:00Z',
        endDate: '2024-04-05T11:00:00Z',
        questionPdfUrl: `/tests/sem${semesterNumber}-test3.pdf`,
      },
    ],
    assignments: [
      {
        id: `assign-${semesterNumber}-1`,
        subject: 'Core Subject 1',
        name: 'Assignment-1',
        submissionDate: '2024-02-25T23:59:59Z',
        pdfUrl: `/assignments/sem${semesterNumber}-assign1.pdf`,
      },
      {
        id: `assign-${semesterNumber}-2`,
        subject: 'Core Subject 2',
        name: 'Assignment-1',
        submissionDate: '2024-03-10T23:59:59Z',
        pdfUrl: `/assignments/sem${semesterNumber}-assign2.pdf`,
      },
      {
        id: `assign-${semesterNumber}-3`,
        subject: 'Elective Subject',
        name: 'Assignment-1',
        submissionDate: '2024-04-15T23:59:59Z',
        pdfUrl: `/assignments/sem${semesterNumber}-assign3.pdf`,
      },
    ],
    previousYearQuestions: [
      {
        id: `pyq-${semesterNumber}-1`,
        subject: 'Core Subject 1',
        year: 2024,
        difficulty: 'Medium',
        pdfUrl: `/pyq/sem${semesterNumber}-2024-sub1.pdf`,
      },
      {
        id: `pyq-${semesterNumber}-2`,
        subject: 'Core Subject 2',
        year: 2024,
        difficulty: 'Hard',
        pdfUrl: `/pyq/sem${semesterNumber}-2024-sub2.pdf`,
      },
      {
        id: `pyq-${semesterNumber}-3`,
        subject: 'Core Subject 1',
        year: 2023,
        difficulty: 'Easy',
        pdfUrl: `/pyq/sem${semesterNumber}-2023-sub1.pdf`,
      },
      {
        id: `pyq-${semesterNumber}-4`,
        subject: 'Elective Subject',
        year: 2023,
        difficulty: 'Medium',
        pdfUrl: `/pyq/sem${semesterNumber}-2023-elective.pdf`,
      },
    ],
    studyMaterials: [
      {
        id: `study-${semesterNumber}-1`,
        subjectCode: 'CS101',
        subjectName: 'Core Subject 1',
        pdfUrl: `/study/sem${semesterNumber}-cs101.pdf`,
        videoUrl: 'https://youtu.be/example1',
      },
      {
        id: `study-${semesterNumber}-2`,
        subjectCode: 'CS102',
        subjectName: 'Core Subject 2',
        pdfUrl: `/study/sem${semesterNumber}-cs102.pdf`,
        videoUrl: 'https://youtu.be/example2',
      },
      {
        id: `study-${semesterNumber}-3`,
        subjectCode: 'CS103',
        subjectName: 'Elective Subject',
        pdfUrl: `/study/sem${semesterNumber}-cs103.pdf`,
      },
    ],
  };
};

// Generate semester data for each semester
export const semesterData = {
  3: generateSemesterData(3),
  4: generateSemesterData(4),
  5: generateSemesterData(5),
  6: generateSemesterData(6),
};

// Mock function to get a course by slug
export const getCourseBySlug = (slug: string): Course | undefined => {
  return courses.find((course) => course.slug === slug);
};

// Mock function to get semester data
export const getSemesterData = (
  semesterNumber: number
): SemesterData | undefined => {
  return semesterData[semesterNumber as keyof typeof semesterData];
};
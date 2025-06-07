// Define the types for academic data

export interface SyllabusItem {
    id: string;
    title: string;
    pdfLink: string;
  }
  
  export interface PYQItem {
    id: string;
    title: string;
    year: string;
    pdfLink: string;
  }
  
  export interface AdditionalPdf {
    id: string;
    title: string;
    pdfLink: string;
  }
  
  export interface Test {
    id: string;
    subject: string;
    testType: string;
    examDate: string;
    questions?: string;
  }
  
  export interface SemesterData {
    syllabusItems: SyllabusItem[];
    pyqItems: PYQItem[];
    additionalPdfs: AdditionalPdf[];
    tests: Test[];
    isLoading: boolean;
  }




  export interface SemesterData {
    syllabusItems: any[];
    pyqItems: any[];
    additionalPdfs: any[];
    tests: any[];
    continuousEvaluation: any[];
    isLoading: boolean;
  }
  
  export interface ResourceItem {
    id: string;
    title: string;
    pdfLink: string;
    year?: string;
    semester?: string;
    itemType?: string;
    testType?: string;
    createdAt?: any;
  }
  
  export interface ContinuousEvaluationItem {
    id: string;
    title: string;
    type: "quiz" | "assignment" | "project" | "presentation";
    subject: string;
    dueDate: string;
    maxMarks: number;
    status: "upcoming" | "ongoing" | "completed";
    pdfLink?: string;
    description: string;
    createdAt?: any;
  }
  
  export interface DepartmentInfo {
    name: string;
    description: string;
    highlights: string[];
    stats: {
      students: number;
      faculty: number;
      courses: number;
      placement: string;
    };
    established: string;
    accreditation: string[];
  }
  
  export interface Lab {
    id: string;
    name: string;
    description: string;
    image: string;
    equipment: string[];
    capacity: number;
    features: string[];
    icon: string;
  }
export interface Project {
    id: string;
    title: string;
    content: string;
    category: string[];
    link?: string;
    department: string;
    teamMembers: string[];
    projectImage?: string;
    date: string;
    important?: boolean;
    createdAt: any;
    updatedAt: any;
  }
  
  export interface ProjectsResponse {
    projects: Project[];
  }
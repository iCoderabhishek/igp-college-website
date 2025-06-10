export type Notice = {
    id: string;
    title: string;
    content: string;
    category: string;
    createdAt: {
      seconds: number;
      nanoseconds: number;
    } | string;
    createdBy: string;
    isImportant: boolean;
    noticeLink?: string;
    date?: string;
  };
  
  export type NoticeResponse = {
    notices: Notice[];
  };
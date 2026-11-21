export interface Chapter {
  number: number;
  title: string;
  content: string;
}

export interface Book {
  id: string;
  title: string;
  author?: string;
  subtitle: string;
  category: string;
  readTime: string;
  themeColor: string;
  accentColor?: string;
  shortDescription: string;
  coverBadge: string;
  coverIllustration: string;
  overview: string;
  chapters: Chapter[];
}

export interface HinglishBookData {
  subtitle?: string;
  overview?: string;
  chapters?: {
    number: number;
    title: string;
    content: string;
  }[];
}

export interface ChatMessage {
  id: string;
  sender: 'A' | 'D';
  text: string;
  image: string | null;
  time: string;
  status: 'sent' | 'delivered' | 'read';
  deletedFor: ('A' | 'D')[];
  isEdited: boolean;
  timestamp: number;
}

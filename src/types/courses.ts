export interface Course {
  id: string;
  title: string;
  description: string;
  level: number;
  duration: string;
  lessonsCount: number;
  icon: string;
  price?: number;
  isAvailable: boolean;
}

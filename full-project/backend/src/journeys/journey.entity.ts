export interface Destination {
  name: string;
  lat: number;
  lng: number;
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface StepComment {
  id: string;
  author: string;
  authorId: string | null;
  text: string;
  createdAt: string;
}

export interface Step {
  id: string;
  name: string;
  placeName: string;
  lat: number;
  lng: number;
  startDate: string | null;
  endDate: string | null;
  photos: string[];
  comments: StepComment[];
}

export interface Journey {
  id: string;
  ownerId: string;
  title: string;
  startDate: string;
  endDate: string;
  destination: Destination;
  rating: number | null;
  comments: Comment[];
  steps: Step[];
}

export type JourneySummary = Pick<
  Journey,
  'id' | 'title' | 'startDate' | 'endDate' | 'destination' | 'rating' | 'ownerId'
>;

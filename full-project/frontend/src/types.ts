export type User = {
  id: string;
  email: string;
  name: string;
};

export type Destination = {
  name: string;
  lat: number;
  lng: number;
};

export type JourneyComment = {
  id: string;
  author: string;
  text: string;
  createdAt: string;
};

export type StepComment = {
  id: string;
  author: string;
  authorId: string;
  text: string;
  createdAt: string;
};

export type Step = {
  id: string;
  name: string;
  placeName: string;
  lat: number;
  lng: number;
  startDate: string | null;
  endDate: string | null;
  photos: string[];
  comments: StepComment[];
};

export type Journey = {
  id: string;
  ownerId: string;
  title: string;
  startDate: string;
  endDate: string;
  destination: Destination;
  rating: number | null;
  comments: JourneyComment[];
  steps: Step[];
};

export type JourneySummary = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  destination: Destination;
  rating: number | null;
};

export type PlaceResult = {
  name: string;
  displayName: string;
  lat: number;
  lng: number;
};

export type RouteResult = {
  coordinates: Array<[number, number]>;
};

export interface CircleEvent {
  id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  location?: string;
  url?: string;
}

export interface EventsResponse {
  events: CircleEvent[];
  error?: string;
}
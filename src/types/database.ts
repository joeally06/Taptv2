export interface Conference {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  location: string;
  price: number;
  max_attendees?: number;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface BoardMember {
  id: string;
  name: string;
  title: string;
  role?: string;
  organization?: string;
  location?: string;
  contact_info?: {
    office?: string;
    cell?: string;
    email?: string;
  };
  image_url?: string;
  website?: string;
  notes?: string;
  term?: string;
  created_at?: string;
  updated_at?: string;
}

export interface User {
  id: string;
  role: 'user' | 'admin';
  created_at?: string;
  updated_at?: string;
}

export interface HallOfFameNomination {
  id: string;
  nominee_name: string;
  nominator_name: string;
  nominator_email: string;
  nomination_reason: string;
  district: string;
  created_at?: string;
  updated_at?: string;
}
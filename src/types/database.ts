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
  email: string;
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

export interface LuncheonRegistration {
  id: string;
  first_name: string;
  last_name: string;
  job_title: string;
  district: string;
  department_location: string;
  email: string;
  phone: string;
  group_size: number;
  location: string;
  created_at?: string;
}

export interface ScholarshipApplication {
  id: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  email: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  high_school: string;
  school_district: string;
  graduation_year: number;
  gpa?: number;
  act_year?: number;
  act_score?: number;
  essay: string;
  created_at?: string;
}

export interface Registration {
  id: string;
  organization: string;
  total_amount: number;
  conference_id: string;
  created_at?: string;
  attendees: Array<{
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  }>;
}
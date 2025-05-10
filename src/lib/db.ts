import { createClient } from '@supabase/supabase-js';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables. Please connect to Supabase first.');
}

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const getLatestConference = async () => {
  const { data, error } = await supabase
    .from('conferences')
    .select('*')
    .order('start_date', { ascending: true })
    .limit(1);

  if (error) throw error;
  
  // If no conference is found, throw a more descriptive error
  if (!data || data.length === 0) {
    throw new Error('No upcoming conferences found');
  }
  
  return data[0];
};

export const createRegistration = async (data: {
  organization: string;
  attendees: Array<{
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    email: string;
    phone: string;
  }>;
  totalAmount: number;
  conferenceId: string;
}) => {
  const { data: registration, error: regError } = await supabase
    .from('registrations')
    .insert({
      organization: data.organization,
      total_attendees: data.attendees.length,
      total_amount: data.totalAmount,
      conference_id: data.conferenceId
    })
    .select()
    .single();

  if (regError) throw regError;

  for (const attendee of data.attendees) {
    const { error: attError } = await supabase
      .from('attendees')
      .insert({
        registration_id: registration.id,
        first_name: attendee.firstName,
        last_name: attendee.lastName,
        address: attendee.address,
        city: attendee.city,
        state: attendee.state,
        zip: attendee.zip,
        email: attendee.email,
        phone: attendee.phone
      });

    if (attError) throw attError;
  }

  return { id: registration.id };
};

export const createLuncheonRegistration = async (data: {
  firstName: string;
  lastName: string;
  jobTitle: string;
  district: string;
  departmentLocation: string;
  email: string;
  phone: string;
  groupSize: number;
  location: string;
}) => {
  const [city, location] = data.location.split('-');
  
  const { data: event, error: eventError } = await supabase
    .from('luncheon_events')
    .select('id')
    .eq('location', location)
    .eq('city', city)
    .single();

  if (eventError) throw eventError;

  const { data: registration, error: regError } = await supabase
    .from('luncheon_registrations')
    .insert({
      first_name: data.firstName,
      last_name: data.lastName,
      job_title: data.jobTitle,
      district: data.district,
      department_location: data.departmentLocation,
      email: data.email,
      phone: data.phone,
      group_size: data.groupSize,
      event_id: event.id
    })
    .select()
    .single();

  if (regError) throw regError;
  return { id: registration.id };
};
import { s as supabase } from "./supabase_DJ8peMun.mjs";
async function createHallOfFameNomination(data) {
  const { data: nomination, error } = await supabase.from("hall_of_fame_nominations").insert([data]).select().single();
  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }
  return nomination;
}
async function getLatestConference() {
  const { data, error } = await supabase.from("conferences").select("*").order("start_date", { ascending: true }).limit(1).single();
  if (error) {
    console.error("Error fetching conference:", error);
    throw error;
  }
  return data;
}
async function getBoardMembers() {
  const { data, error } = await supabase.from("board_members").select("*").order("name");
  if (error) {
    console.error("Error fetching board members:", error);
    throw error;
  }
  return data;
}
async function getHallOfFameNominations() {
  const { data, error } = await supabase.from("hall_of_fame_nominations").select("*").order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching nominations:", error);
    throw error;
  }
  return data;
}
async function createLuncheonRegistration(data) {
  const { data: registration, error } = await supabase.from("luncheon_registrations").insert([data]).select().single();
  if (error) {
    console.error("Error creating luncheon registration:", error);
    throw error;
  }
  return registration;
}
async function createScholarshipApplication(data) {
  const { data: application, error } = await supabase.from("scholarship_applications").insert([data]).select().single();
  if (error) {
    console.error("Error creating scholarship application:", error);
    throw error;
  }
  return application;
}
async function createRegistration(data) {
  const { data: registration, error } = await supabase.from("registrations").insert([data]).select().single();
  if (error) {
    console.error("Error creating registration:", error);
    throw error;
  }
  return registration;
}
export {
  getBoardMembers as a,
  getHallOfFameNominations as b,
  createHallOfFameNomination as c,
  createLuncheonRegistration as d,
  createRegistration as e,
  createScholarshipApplication as f,
  getLatestConference as g
};

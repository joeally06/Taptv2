import { e as createRegistration } from "../../chunks/db_C_wF1neg.mjs";
import { renderers } from "../../renderers.mjs";
const GET = async () => {
  return new Response(
    JSON.stringify({ error: "Method not allowed" }),
    { status: 405 }
  );
};
const POST = async ({ request }) => {
  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
  if (request.method === "OPTIONS") {
    return new Response(null, { headers });
  }
  try {
    const body = await request.text();
    console.log("Received body:", body);
    if (!body) {
      return new Response(
        JSON.stringify({ error: "Empty request body" }),
        { status: 400, headers }
      );
    }
    const data = JSON.parse(body);
    if (!data?.organization || !Array.isArray(data?.attendees) || !data?.totalAmount) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: organization, attendees, or totalAmount" }),
        { status: 400, headers }
      );
    }
    const invalidAttendees = data.attendees.some((att) => {
      return !att.firstName || !att.lastName || !att.address || !att.city || !att.state || !att.zip || !att.email || !att.phone;
    });
    if (invalidAttendees) {
      return new Response(
        JSON.stringify({ error: "All attendees must have firstName, lastName, address, city, state, zip, email, and phone" }),
        { status: 400, headers }
      );
    }
    const registrationData = {
      organization: data.organization,
      attendees: data.attendees.map((att) => ({
        firstName: att.firstName,
        lastName: att.lastName,
        address: att.address,
        city: att.city,
        state: att.state,
        zip: att.zip,
        email: att.email,
        phone: att.phone
      })),
      totalAmount: Number(data.totalAmount),
      conferenceId: "conf-2025"
    };
    const result = await createRegistration(registrationData);
    return new Response(
      JSON.stringify({ success: true, data: result }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Registration failed",
        success: false
      }),
      { status: 500, headers }
    );
  }
};
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};

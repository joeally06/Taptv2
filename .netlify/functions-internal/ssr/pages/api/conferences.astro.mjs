import { g as getLatestConference } from "../../chunks/db_D4vCMefA.mjs";
import { renderers } from "../../renderers.mjs";
const GET = async () => {
  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
  try {
    const conference = await getLatestConference();
    return new Response(
      JSON.stringify({ data: conference }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error("Error fetching conference:", error);
    const message = error instanceof Error ? error.message : "Failed to fetch conference data";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 404, headers }
    );
  }
};
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};

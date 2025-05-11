import { f as createScholarshipApplication } from "../../../chunks/db_D4vCMefA.mjs";
import { renderers } from "../../../renderers.mjs";
const POST = async ({ request }) => {
  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "no-store"
  };
  try {
    const data = await request.json();
    const result = await createScholarshipApplication(data);
    return new Response(
      JSON.stringify({ success: true, data: result }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error("Application error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers }
    );
  }
};
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};

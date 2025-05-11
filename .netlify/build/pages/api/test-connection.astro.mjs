import { s as supabase } from "../../chunks/supabase_B1Ds0ale.mjs";
import { renderers } from "../../renderers.mjs";
const GET = async () => {
  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "no-store"
  };
  try {
    const { data, error } = await supabase.from("conferences").select("*").limit(1);
    if (error) {
      throw error;
    }
    return new Response(
      JSON.stringify({
        success: true,
        message: "Successfully connected to Supabase",
        data
      }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error("Connection test error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Failed to connect to Supabase"
      }),
      { status: 500, headers }
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

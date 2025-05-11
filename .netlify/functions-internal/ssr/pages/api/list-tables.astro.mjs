import { s as supabase } from "../../chunks/supabase_DZjIZms0.mjs";
import { renderers } from "../../renderers.mjs";
const GET = async () => {
  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "no-store"
  };
  try {
    const tables = ["board_members", "conferences", "hall_of_fame_nominations", "users"];
    const results = {};
    for (const table of tables) {
      const { data, error } = await supabase.from(table).select("*").limit(10);
      if (error) {
        console.error(`Error fetching ${table}:`, error);
        results[table] = { error: error.message };
      } else {
        results[table] = data;
      }
    }
    return new Response(
      JSON.stringify({
        success: true,
        data: results
      }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error("Error reading tables:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Failed to read tables"
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

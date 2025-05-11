import { s as supabase } from "../../chunks/supabase_B1Ds0ale.mjs";
import { renderers } from "../../renderers.mjs";
const GET = async ({ request }) => {
  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "no-store"
  };
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      throw error;
    }
    if (!session) {
      return new Response(
        JSON.stringify({
          authenticated: false,
          message: "No active session found"
        }),
        { status: 401, headers }
      );
    }
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw userError || new Error("No user found");
    }
    return new Response(
      JSON.stringify({
        authenticated: true,
        user: {
          id: user.id,
          email: user.email,
          role: user.user_metadata?.role
        }
      }),
      { status: 200, headers }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        authenticated: false,
        error: error instanceof Error ? error.message : "Authentication check failed"
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

/* empty css                                */
import { c as createComponent, a as createAstro, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from "../chunks/astro/server_CwJdA-vj.mjs";
import "kleur/colors";
import "html-escaper";
import { $ as $$Layout } from "../chunks/Layout_BDfg-G6c.mjs";
import { $ as $$AdminNav } from "../chunks/AdminNav_D6wIy8q1.mjs";
import { g as getLatestConference, a as getBoardMembers, b as getHallOfFameNominations } from "../chunks/db_C_wF1neg.mjs";
import { s as supabase } from "../chunks/supabase_DJ8peMun.mjs";
import { renderers } from "../renderers.mjs";
const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const authCookie = Astro2.cookies.get("sb-access-token");
  let user = null;
  if (authCookie?.value) {
    try {
      const { data: { user: authUser }, error: error2 } = await supabase.auth.getUser(authCookie.value);
      if (!error2 && authUser?.user_metadata?.role === "admin") {
        user = authUser;
      } else {
        console.error("Auth error or not admin:", error2 || "Not admin");
      }
    } catch (error2) {
      console.error("Error checking authentication:", error2);
    }
  }
  if (!user) {
    return Astro2.redirect("/login");
  }
  let conference = null;
  let boardMembers = [];
  let nominations = [];
  let error = null;
  try {
    [conference, boardMembers, nominations] = await Promise.all([
      getLatestConference(),
      getBoardMembers(),
      getHallOfFameNominations()
    ]);
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load dashboard data";
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Admin Dashboard" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "AdminNav", $$AdminNav, { "currentPath": "/admin" })} ${maybeRenderHead()}<div class="container mx-auto px-4 py-8"> <div class="mb-8"> <h1 class="text-2xl font-bold text-gray-900">Admin Dashboard</h1> <p class="text-gray-600 mt-2">Welcome back, ${user.email}</p> </div> ${error && renderTemplate`<div class="bg-red-50 border-l-4 border-red-400 p-4 mb-8"> <p class="text-red-700">${error}</p> </div>`} <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> <!-- Conference Management Card --> <div class="bg-white p-6 rounded-lg shadow-md"> <div class="flex items-center justify-between mb-4"> <h2 class="text-xl font-semibold text-primary-700">Conference</h2> <a href="/admin/conferences" class="text-primary-600 hover:text-primary-800">
Manage
</a> </div> ${conference ? renderTemplate`<div> <p class="text-gray-600 mb-2">${conference.name}</p> <p class="text-sm text-gray-500"> ${new Date(conference.start_date).toLocaleDateString()} - ${new Date(conference.end_date).toLocaleDateString()} </p> <p class="text-sm text-gray-500 mt-1">${conference.location}</p> </div>` : renderTemplate`<p class="text-gray-600">No upcoming conference scheduled</p>`} </div> <!-- Board Members Card --> <div class="bg-white p-6 rounded-lg shadow-md"> <div class="flex items-center justify-between mb-4"> <h2 class="text-xl font-semibold text-primary-700">Board Members</h2> <a href="/admin/board" class="text-primary-600 hover:text-primary-800">
Manage
</a> </div> <div> <p class="text-3xl font-bold text-gray-700 mb-2">${boardMembers.length}</p> <p class="text-gray-600">Active board members</p> </div> </div> <!-- Hall of Fame Card --> <div class="bg-white p-6 rounded-lg shadow-md"> <div class="flex items-center justify-between mb-4"> <h2 class="text-xl font-semibold text-primary-700">Hall of Fame</h2> <a href="/admin/hall-of-fame" class="text-primary-600 hover:text-primary-800">
View All
</a> </div> <div> <p class="text-3xl font-bold text-gray-700 mb-2">${nominations.length}</p> <p class="text-gray-600">New nominations</p> </div> </div> <!-- Quick Actions --> <div class="bg-white p-6 rounded-lg shadow-md lg:col-span-3"> <h2 class="text-xl font-semibold text-primary-700 mb-4">Quick Actions</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"> <a href="/admin/conferences/new" class="flex items-center justify-center p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"> <span class="text-primary-700">Create New Conference</span> </a> <a href="/admin/board/new" class="flex items-center justify-center p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"> <span class="text-primary-700">Add Board Member</span> </a> <a href="/admin/users" class="flex items-center justify-center p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"> <span class="text-primary-700">Manage Users</span> </a> </div> </div> </div> <!-- Debug Info (hidden in production) --> <div class="mt-8 p-4 bg-gray-100 rounded-lg"> <h3 class="font-bold mb-2">Debug Info</h3> <pre class="text-xs overflow-auto">${JSON.stringify({ user, authCookie: !!authCookie }, null, 2)}</pre> </div> </div> ` })}`;
}, "/home/project/src/pages/admin/index.astro", void 0);
const $$file = "/home/project/src/pages/admin/index.astro";
const $$url = "/admin";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};

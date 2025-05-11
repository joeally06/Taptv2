/* empty css                                   */
import { c as createComponent, a as createAstro, d as renderComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute } from "../../chunks/astro/server_CwJdA-vj.mjs";
import "kleur/colors";
import "html-escaper";
import { $ as $$Layout } from "../../chunks/Layout_BDfg-G6c.mjs";
import { $ as $$AdminNav } from "../../chunks/AdminNav_D6wIy8q1.mjs";
import { g as getLatestConference } from "../../chunks/db_C_wF1neg.mjs";
import { renderers } from "../../renderers.mjs";
const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const userCookie = Astro2.cookies.get("user");
  let user = null;
  try {
    user = userCookie ? JSON.parse(userCookie.value) : null;
  } catch (error2) {
    console.error("Error parsing user cookie:", error2);
  }
  if (!user || user.role !== "admin") {
    return Astro2.redirect("/login");
  }
  let conference = null;
  let error = null;
  try {
    conference = await getLatestConference();
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load conference data";
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Conference Management" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "AdminNav", $$AdminNav, { "currentPath": "/admin/conferences" })} ${maybeRenderHead()}<div class="container mx-auto px-4 py-8"> <div class="flex justify-between items-center mb-8"> <h1 class="text-2xl font-bold text-gray-900">Conference Management</h1> <a href="/admin/conferences/new" class="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors">
Create New Conference
</a> </div> ${error && renderTemplate`<div class="bg-red-50 border-l-4 border-red-400 p-4 mb-8"> <p class="text-red-700">${error}</p> </div>`} ${conference && renderTemplate`<div class="bg-white rounded-lg shadow-md overflow-hidden"> <div class="p-6"> <div class="flex justify-between items-start"> <div> <h2 class="text-xl font-semibold text-gray-900 mb-2">${conference.name}</h2> <p class="text-gray-600"> ${new Date(conference.start_date).toLocaleDateString()} - ${new Date(conference.end_date).toLocaleDateString()} </p> </div> <a${addAttribute(`/admin/conferences/${conference.id}/edit`, "href")} class="text-primary-600 hover:text-primary-800">
Edit
</a> </div> <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"> <div> <h3 class="text-sm font-medium text-gray-500">Location</h3> <p class="mt-1">${conference.location}</p> </div> <div> <h3 class="text-sm font-medium text-gray-500">Price</h3> <p class="mt-1">$${conference.price}</p> </div> <div> <h3 class="text-sm font-medium text-gray-500">Maximum Attendees</h3> <p class="mt-1">${conference.max_attendees || "Unlimited"}</p> </div> </div> ${conference.description && renderTemplate`<div class="mt-6"> <h3 class="text-sm font-medium text-gray-500">Description</h3> <p class="mt-1 text-gray-600">${conference.description}</p> </div>`} </div> </div>`} ${!conference && !error && renderTemplate`<div class="text-center py-12"> <p class="text-gray-600">No conference is currently scheduled.</p> <a href="/admin/conferences/new" class="inline-block mt-4 text-primary-600 hover:text-primary-800">
Create your first conference
</a> </div>`} </div> ` })}`;
}, "/home/project/src/pages/admin/conferences/index.astro", void 0);
const $$file = "/home/project/src/pages/admin/conferences/index.astro";
const $$url = "/admin/conferences";
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

/* empty css                                         */
import { c as createComponent, a as createAstro, d as renderComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute } from "../../../../chunks/astro/server_CwJdA-vj.mjs";
import "kleur/colors";
import "html-escaper";
import { $ as $$Layout } from "../../../../chunks/Layout_BDfg-G6c.mjs";
import { $ as $$AdminNav } from "../../../../chunks/AdminNav_D6wIy8q1.mjs";
import { g as getLatestConference } from "../../../../chunks/db_CbWXS8aP.mjs";
import { renderers } from "../../../../renderers.mjs";
const $$Astro = createAstro();
const $$Edit = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Edit;
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
  const { id } = Astro2.params;
  let conference = null;
  let error = null;
  try {
    conference = await getLatestConference();
    if (!conference || conference.id !== id) {
      return Astro2.redirect("/admin/conferences");
    }
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load conference data";
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Edit Conference" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "AdminNav", $$AdminNav, { "currentPath": "/admin/conferences" })} ${maybeRenderHead()}<div class="container mx-auto px-4 py-8"> <div class="max-w-3xl mx-auto"> <h1 class="text-2xl font-bold text-gray-900 mb-8">Edit Conference</h1> ${error && renderTemplate`<div class="bg-red-50 border-l-4 border-red-400 p-4 mb-8"> <p class="text-red-700">${error}</p> </div>`} ${conference && renderTemplate`<form id="conference-form" class="space-y-6"${addAttribute(conference.id, "data-conference-id")}> <div> <label class="block text-sm font-medium text-gray-700 mb-2">Conference Name *</label> <input type="text" name="name" required${addAttribute(conference.name, "value")} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> <div> <label class="block text-sm font-medium text-gray-700 mb-2">Start Date *</label> <input type="date" name="start_date" required${addAttribute(new Date(conference.start_date).toISOString().split("T")[0], "value")} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-2">End Date *</label> <input type="date" name="end_date" required${addAttribute(new Date(conference.end_date).toISOString().split("T")[0], "value")} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"> </div> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-2">Location *</label> <input type="text" name="location" required${addAttribute(conference.location, "value")} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> <div> <label class="block text-sm font-medium text-gray-700 mb-2">Price *</label> <input type="number" name="price" required min="0" step="0.01"${addAttribute(conference.price, "value")} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-2">Maximum Attendees</label> <input type="number" name="max_attendees" min="1"${addAttribute(conference.max_attendees, "value")} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"> </div> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-2">Description</label> <textarea name="description" rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">${conference.description}</textarea> </div> <div class="flex justify-end space-x-4"> <a href="/admin/conferences" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
Cancel
</a> <button type="submit" class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
Save Changes
</button> </div> </form>`} </div> </div> ` })} `;
}, "/home/project/src/pages/admin/conferences/[id]/edit.astro", void 0);
const $$file = "/home/project/src/pages/admin/conferences/[id]/edit.astro";
const $$url = "/admin/conferences/[id]/edit";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Edit,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};

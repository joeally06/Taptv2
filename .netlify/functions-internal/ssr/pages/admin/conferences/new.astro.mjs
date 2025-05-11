/* empty css                                      */
import { c as createComponent, a as createAstro, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from "../../../chunks/astro/server_CwJdA-vj.mjs";
import "kleur/colors";
import "html-escaper";
import { $ as $$Layout } from "../../../chunks/Layout_BDfg-G6c.mjs";
import { $ as $$AdminNav } from "../../../chunks/AdminNav_D6wIy8q1.mjs";
import { renderers } from "../../../renderers.mjs";
const $$Astro = createAstro();
const $$New = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$New;
  const userCookie = Astro2.cookies.get("user");
  let user = null;
  try {
    user = userCookie ? JSON.parse(userCookie.value) : null;
  } catch (error) {
    console.error("Error parsing user cookie:", error);
  }
  if (!user || user.role !== "admin") {
    return Astro2.redirect("/login");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Create Conference" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "AdminNav", $$AdminNav, { "currentPath": "/admin/conferences" })} ${maybeRenderHead()}<div class="container mx-auto px-4 py-8"> <div class="max-w-3xl mx-auto"> <h1 class="text-2xl font-bold text-gray-900 mb-8">Create New Conference</h1> <form id="conference-form" class="space-y-6"> <div> <label class="block text-sm font-medium text-gray-700 mb-2">Conference Name *</label> <input type="text" name="name" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> <div> <label class="block text-sm font-medium text-gray-700 mb-2">Start Date *</label> <input type="date" name="start_date" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-2">End Date *</label> <input type="date" name="end_date" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"> </div> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-2">Location *</label> <input type="text" name="location" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> <div> <label class="block text-sm font-medium text-gray-700 mb-2">Price *</label> <input type="number" name="price" required min="0" step="0.01" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-2">Maximum Attendees</label> <input type="number" name="max_attendees" min="1" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"> </div> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-2">Description</label> <textarea name="description" rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"></textarea> </div> <div class="flex justify-end space-x-4"> <a href="/admin/conferences" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
Cancel
</a> <button type="submit" class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
Create Conference
</button> </div> </form> </div> </div> ` })} `;
}, "/home/project/src/pages/admin/conferences/new.astro", void 0);
const $$file = "/home/project/src/pages/admin/conferences/new.astro";
const $$url = "/admin/conferences/new";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$New,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};

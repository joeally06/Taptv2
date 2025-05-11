/* empty css                                   */
import { c as createComponent, a as createAstro, d as renderComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute } from "../../chunks/astro/server_CwJdA-vj.mjs";
import "kleur/colors";
import "html-escaper";
import { $ as $$Layout } from "../../chunks/Layout_BDfg-G6c.mjs";
import { $ as $$AdminNav } from "../../chunks/AdminNav_D6wIy8q1.mjs";
import { createClient } from "@supabase/supabase-js";
import { renderers } from "../../renderers.mjs";
const $$Astro = createAstro();
const $$Users = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Users;
  const supabaseUrl = void 0;
  const supabaseKey = void 0;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const user = Astro2.cookies.get("user")?.json();
  if (!user || user.role !== "admin") {
    return Astro2.redirect("/login");
  }
  const { data: users, error } = await supabase.from("users").select("id, role, created_at").order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching users:", error);
    return Astro2.redirect("/500");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "User Management" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "AdminNav", $$AdminNav, { "currentPath": "/admin/users" })} ${maybeRenderHead()}<div class="container mx-auto px-4 py-8"> <div class="flex justify-between items-center mb-8"> <h1 class="text-2xl font-bold text-gray-900">User Management</h1> <button id="add-user" class="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors">
Add User
</button> </div> <div class="bg-white rounded-lg shadow overflow-hidden"> <table class="min-w-full divide-y divide-gray-200"> <thead class="bg-gray-50"> <tr> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th> </tr> </thead> <tbody class="bg-white divide-y divide-gray-200"> ${users.map((user2) => renderTemplate`<tr> <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${user2.id}</td> <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${user2.role}</td> <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"> ${new Date(user2.created_at).toLocaleDateString()} </td> <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"> <button class="text-primary-600 hover:text-primary-900 mr-3" data-action="edit"${addAttribute(JSON.stringify(user2), "data-user")}>
Edit
</button> <button class="text-red-600 hover:text-red-900" data-action="delete"${addAttribute(user2.id, "data-user-id")}>
Delete
</button> </td> </tr>`)} </tbody> </table> </div> </div>  <div id="user-modal" class="hidden fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"> <div class="bg-white rounded-lg p-8 max-w-md w-full"> <h2 id="modal-title" class="text-xl font-bold mb-4">Add User</h2> <form id="user-form" class="space-y-4"> <input type="hidden" name="userId"> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Role</label> <select name="role" required class="w-full px-3 py-2 border border-gray-300 rounded-md"> <option value="user">User</option> <option value="admin">Admin</option> </select> </div> <div class="flex justify-end space-x-3 mt-6"> <button type="button" id="cancel-modal" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
Cancel
</button> <button type="submit" class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
Save
</button> </div> </form> </div> </div> ` })} `;
}, "/home/project/src/pages/admin/users.astro", void 0);
const $$file = "/home/project/src/pages/admin/users.astro";
const $$url = "/admin/users";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Users,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};

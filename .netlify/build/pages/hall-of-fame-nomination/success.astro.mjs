/* empty css                                   */
import { c as createComponent, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from "../../chunks/astro/server_CwJdA-vj.mjs";
import "kleur/colors";
import "html-escaper";
import { $ as $$Layout } from "../../chunks/Layout_BDfg-G6c.mjs";
import { renderers } from "../../renderers.mjs";
const $$Success = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Nomination Submitted" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4"> <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md"> <div class="text-center"> <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4"> <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> </div> <h2 class="text-2xl font-bold text-gray-900 mb-4">Nomination Submitted Successfully!</h2> <p class="text-gray-600 mb-6">
Thank you for your nomination. The TAPT Executive Director will contact you with further instructions regarding required documentation.
</p> <a href="/" class="inline-block bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors">
Return to Homepage
</a> </div> </div> </div> ` })}`;
}, "/home/project/src/pages/hall-of-fame-nomination/success.astro", void 0);
const $$file = "/home/project/src/pages/hall-of-fame-nomination/success.astro";
const $$url = "/hall-of-fame-nomination/success";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Success,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};

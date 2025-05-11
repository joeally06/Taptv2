/* empty css                                */
import { c as createComponent, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from "../chunks/astro/server_CwJdA-vj.mjs";
import "kleur/colors";
import "html-escaper";
import { $ as $$Layout } from "../chunks/Layout_BDfg-G6c.mjs";
import { renderers } from "../renderers.mjs";
const $$RegistrationSuccess = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Registration Success" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"> <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md"> <div class="text-center"> <h2 class="mt-6 text-3xl font-extrabold text-primary-800">Registration Successful!</h2> <p class="mt-2 text-sm text-gray-600">
Thank you for registering for the TAPT Conference. You will receive a confirmation email shortly.
</p> </div> <div class="mt-8"> <div class="rounded-md bg-green-50 p-4"> <div class="flex"> <div class="flex-shrink-0"> <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path> </svg> </div> <div class="ml-3"> <h3 class="text-sm font-medium text-green-800">Registration completed</h3> <div class="mt-2 text-sm text-green-700"> <p>Your registration has been processed successfully.</p> </div> </div> </div> </div> <div class="mt-6"> <a href="/" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
Return to Homepage
</a> </div> </div> </div> </div> ` })}`;
}, "/home/project/src/pages/registration-success.astro", void 0);
const $$file = "/home/project/src/pages/registration-success.astro";
const $$url = "/registration-success";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$RegistrationSuccess,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};

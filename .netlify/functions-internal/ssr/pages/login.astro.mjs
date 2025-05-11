/* empty css                                */
import { c as createComponent, a as createAstro, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from "../chunks/astro/server_CwJdA-vj.mjs";
import "kleur/colors";
import "html-escaper";
import { $ as $$Layout } from "../chunks/Layout_BDfg-G6c.mjs";
import { renderers } from "../renderers.mjs";
const $$Astro = createAstro();
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  const userCookie = Astro2.cookies.get("sb-access-token");
  if (userCookie?.value) {
    return Astro2.redirect("/admin");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Login" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"> <div class="max-w-md w-full space-y-8"> <div> <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
Sign in to your account
</h2> </div> <div id="debug-panel" class="bg-gray-100 p-4 rounded-md text-sm font-mono overflow-auto max-h-96"> <div class="flex justify-between items-center mb-2"> <h3 class="font-bold">Authentication Debug Log</h3> <button id="clear-debug" class="text-xs text-gray-600 hover:text-gray-800">Clear</button> </div> <div id="debug-log" class="space-y-1"></div> </div> <div id="error-message" class="hidden bg-red-50 border-l-4 border-red-400 p-4 text-red-700"></div> <form id="login-form" class="mt-8 space-y-6"> <div class="rounded-md shadow-sm -space-y-px"> <div> <label for="email" class="sr-only">Email address</label> <input id="email" name="email" type="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" placeholder="Email address"> </div> <div> <label for="password" class="sr-only">Password</label> <input id="password" name="password" type="password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" placeholder="Password"> </div> </div> <div> <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
Sign in
</button> </div> </form> <div id="session-info" class="mt-4 p-4 bg-gray-100 rounded-md hidden"> <h3 class="font-bold mb-2">Current Session Info</h3> <pre id="session-data" class="text-xs overflow-auto"></pre> </div> </div> </div> ` })} `;
}, "/home/project/src/pages/login.astro", void 0);
const $$file = "/home/project/src/pages/login.astro";
const $$url = "/login";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};

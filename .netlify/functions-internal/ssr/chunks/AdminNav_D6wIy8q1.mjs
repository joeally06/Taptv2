import { c as createComponent, a as createAstro, m as maybeRenderHead, b as addAttribute, r as renderTemplate } from "./astro/server_CwJdA-vj.mjs";
import "kleur/colors";
import "html-escaper";
import "clsx";
const $$Astro = createAstro();
const $$AdminNav = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AdminNav;
  const { currentPath } = Astro2.props;
  const navItems = [
    { path: "/admin", label: "Dashboard" },
    { path: "/admin/board", label: "Board Members" },
    { path: "/admin/conferences", label: "Conferences" }
  ];
  return renderTemplate`${maybeRenderHead()}<nav class="bg-primary-800 text-white"> <div class="container mx-auto px-4"> <div class="flex items-center justify-between h-16"> <div class="flex items-center space-x-4"> ${navItems.map((item) => renderTemplate`<a${addAttribute(item.path, "href")}${addAttribute(`px-3 py-2 rounded-md text-sm font-medium ${currentPath === item.path ? "bg-primary-900 text-white" : "text-primary-100 hover:bg-primary-700"}`, "class")}> ${item.label} </a>`)} </div> <button id="logout-button" class="px-3 py-2 rounded-md text-sm font-medium text-primary-100 hover:bg-primary-700">
Logout
</button> </div> </div> </nav> `;
}, "/home/project/src/components/AdminNav.astro", void 0);
export {
  $$AdminNav as $
};

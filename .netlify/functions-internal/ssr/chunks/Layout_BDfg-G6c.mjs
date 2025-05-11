import { c as createComponent, a as createAstro, m as maybeRenderHead, b as addAttribute, r as renderTemplate, d as renderComponent, f as renderHead, g as renderSlot } from "./astro/server_CwJdA-vj.mjs";
import "kleur/colors";
import "html-escaper";
import "clsx";
/* empty css                        */
const $$Astro$1 = createAstro();
const $$Dropdown = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Dropdown;
  const { title, items } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="relative group"> <button class="flex items-center px-3 py-2 text-gray-800 hover:text-primary-600 transition-colors font-medium"> ${title} <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path> </svg> </button> <div class="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all opacity-0 invisible group-hover:opacity-100 group-hover:visible"> <div class="py-1" role="menu" aria-orientation="vertical"> ${items.map((item) => renderTemplate`<a${addAttribute(item.href, "href")} class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-600" role="menuitem"> ${item.title} </a>`)} </div> </div> </div>`;
}, "/home/project/src/components/Dropdown.astro", void 0);
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const navItems = [
    {
      title: "Events",
      items: [
        { title: "Conference & Trade Show", href: "#conference" },
        { title: "Regional Luncheons", href: "#luncheons" },
        { title: "TSBTA Workshop", href: "https://www.taptworkshop.com/" }
      ]
    },
    {
      title: "Hall of Fame",
      items: [
        { title: "Members", href: "/hall-of-fame" },
        { title: "Nominate", href: "/hall-of-fame-nomination" }
      ]
    },
    {
      title: "Resources",
      items: [
        { title: "School Districts", href: "/school-districts" },
        { title: "CDL Information", href: "https://digitaltennessee.tnsos.gov/comm_driver_license_manual/1/" },
        { title: "Conference Agenda", href: "https://www.tapt.org/%5Ffiles/ugd/307eed%5F36591c88a0d2410ca280e16fb2737f68.pdf" },
        { title: "House Recognition", href: "https://www.capitol.tn.gov/Bills/114/Bill/HJR0055.pdf" },
        { title: "Featured District", href: "https://www.cmcss.net/operations/" },
        { title: "Vehicle Grant Program", href: "https://www.tn.gov/environment/program-areas/energy/state-energy-office--seo-/programs-projects/programs-and-projects/sustainable-transportation-and-alternative-fuels/sustainable-transportation-and-alternative-fuels/tennessee-and-the-volkswagen-diesel-settlement1/project-solicitations/medium--and-heavy-duty-vehicles-grant-program.html" },
        { title: "Certificate of Eligibility", href: "https://www.tapt.org/new-form-post" },
        { title: "Scholarship Application", href: "/scholarship" }
      ]
    },
    {
      title: "Sponsors",
      items: [
        { title: "Our Sponsors", href: "#sponsors" },
        { title: "Become a Sponsor", href: "/become-sponsor" }
      ]
    },
    {
      title: "About",
      items: [
        { title: "Mission", href: "#mission" },
        { title: "Board of Directors", href: "/board" },
        { title: "Advisory Board", href: "/advisory-board" }
      ]
    }
  ];
  return renderTemplate`${maybeRenderHead()}<header class="sticky top-0 z-50 w-full bg-white/95 backdrop-blur shadow-sm transition-all duration-200"> <div class="container mx-auto px-4 py-2 flex flex-col md:flex-row justify-between items-center"> <div class="flex items-center gap-4"> <a href="/" class="flex items-center py-2"> <img src="/images/taptlogo.png" alt="TAPT Logo" class="h-10 md:h-14" width="100" height="42"> </a> <div class="hidden md:block"> <p class="text-sm font-semibold text-primary-700">Tennessee Association of Pupil Transportation</p> <p class="text-xs text-gray-600">Student Safety is Our Priority</p> </div> </div> <!-- Mobile menu button --> <div class="md:hidden"> <button id="mobile-menu-button" class="p-2 text-primary-700 hover:text-primary-500 focus:outline-none"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg> </button> </div> <!-- Desktop navigation --> <nav class="hidden md:flex items-center gap-6"> ${navItems.map((item) => renderTemplate`${renderComponent($$result, "Dropdown", $$Dropdown, { "title": item.title, "items": item.items })}`)} <a href="#contact" class="px-4 py-2 text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors">
Contact
</a> </nav> </div> <!-- Mobile navigation --> <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-gray-200"> <div class="container mx-auto px-4 py-2 space-y-2"> ${navItems.map((category) => renderTemplate`<div class="py-2"> <button class="mobile-dropdown-button flex justify-between items-center w-full text-left px-2 py-1 text-primary-700 font-medium"> ${category.title} <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path> </svg> </button> <div class="mobile-dropdown-content hidden pl-4 space-y-1 mt-1"> ${category.items.map((item) => renderTemplate`<a${addAttribute(item.href, "href")} class="block py-1 text-gray-700 hover:text-primary-600">${item.title}</a>`)} </div> </div>`)} <a href="#contact" class="block px-4 py-2 text-center text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors">
Contact
</a> </div> </div> </header> `;
}, "/home/project/src/components/Header.astro", void 0);
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const footerLinks = [
    {
      title: "About TAPT",
      links: [
        { text: "Mission", url: "#mission" },
        { text: "Board of Directors", url: "/board" },
        { text: "Advisory Board", url: "/advisory-board" },
        { text: "Hall of Fame", url: "/hall-of-fame" }
      ]
    },
    {
      title: "Events",
      links: [
        { text: "Conference", url: "#conference" },
        { text: "Regional Luncheons", url: "#luncheons" },
        { text: "TSBTA Workshop", url: "https://www.taptworkshop.com/" }
      ]
    },
    {
      title: "Resources",
      links: [
        { text: "School Districts", url: "/school-districts" },
        { text: "CDL Information", url: "https://digitaltennessee.tnsos.gov/comm_driver_license_manual/1/" },
        { text: "Scholarship Application", url: "https://form.jotform.com/240316328016952" }
      ]
    },
    {
      title: "Connect",
      links: [
        { text: "Contact Us", url: "#contact" },
        { text: "Email Webmaster", url: "mailto:tnbus@msn.com" },
        { text: "National Association", url: "https://yellowbuses.org/" }
      ]
    }
  ];
  return renderTemplate`${maybeRenderHead()}<footer class="bg-primary-800 text-white pt-12 pb-6"> <div class="container mx-auto px-4"> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8"> <div class="lg:col-span-2"> <div class="flex flex-col space-y-4"> <a href="/" class="inline-block"> <img src="/images/taptlogo.png" alt="TAPT Logo" class="h-16 md:h-20" width="180" height="75"> </a> <div> <h3 class="text-xl font-semibold mb-2">"Student Safety is Our Priority"</h3> <p class="text-gray-300 mb-4">Education is our destination!</p> </div> </div> </div> ${footerLinks.map((category) => renderTemplate`<div> <h3 class="font-semibold text-lg mb-4 border-b border-primary-700 pb-2">${category.title}</h3> <ul class="space-y-2"> ${category.links.map((link) => renderTemplate`<li> <a${addAttribute(link.url, "href")} class="text-gray-300 hover:text-white transition-colors text-sm"> ${link.text} </a> </li>`)} </ul> </div>`)} </div> <div class="mt-12 pt-4 border-t border-primary-700 text-center text-xs text-gray-400"> <p>&copy; ${currentYear} Tennessee Association of Pupil Transportation. All rights reserved.</p> <p class="mt-1">Website by Tennessee Pupil Transportation Management</p> </div> </div> </footer>`;
}, "/home/project/src/components/Footer.astro", void 0);
const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description = "Tennessee Association of Pupil Transportation - Student Safety is Our Priority" } = Astro2.props;
  return renderTemplate`<html lang="en" class="scroll-smooth"> <head><meta charset="UTF-8"><meta name="description"${addAttribute(description, "content")}><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title} | TAPT</title>${renderHead()}</head> <body class="min-h-screen flex flex-col bg-gray-50"> ${renderComponent($$result, "Header", $$Header, {})} <main class="flex-grow"> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "/home/project/src/layouts/Layout.astro", void 0);
export {
  $$Layout as $
};

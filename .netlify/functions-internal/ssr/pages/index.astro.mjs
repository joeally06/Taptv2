/* empty css                                */
import { c as createComponent, m as maybeRenderHead, r as renderTemplate, b as addAttribute, d as renderComponent } from "../chunks/astro/server_CwJdA-vj.mjs";
import "kleur/colors";
import "html-escaper";
import { $ as $$Layout } from "../chunks/Layout_BDfg-G6c.mjs";
import "clsx";
import { renderers } from "../renderers.mjs";
const $$Hero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden"> <!-- Background image with overlay --> <div class="absolute inset-0 z-0"> <img src="/images/Tennessee-Image Sign.jpg" alt="Tennessee School Bus" class="w-full h-full object-cover"> <div class="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-primary-800/60"></div> </div> <div class="container mx-auto px-4 relative z-10 text-white md:flex md:items-center"> <div class="md:w-2/3 animate-slide"> <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"> <span class="text-accent-400">"Student Safety is Our Priority"</span> <br> <span class="font-normal">Education is Our Destination!</span> </h1> <p class="text-lg md:text-xl mb-8 text-gray-100 max-w-2xl">
The Tennessee Association of Pupil Transportation promotes safe transportation for all Tennessee school children through education, training, and advocacy.
</p> <div class="flex flex-col sm:flex-row gap-4"> <a href="#conference" class="px-6 py-3 bg-secondary-600 hover:bg-secondary-700 text-white font-medium rounded-md transition-colors text-center">
Join Our Conference
</a> <a href="#mission" class="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur text-white font-medium rounded-md transition-colors text-center">
Learn More
</a> </div> </div> </div> <!-- Wave decoration at bottom --> <div class="absolute bottom-0 left-0 right-0"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" class="w-full h-auto"> <path fill="#fff" fill-opacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path> </svg> </div> </section>`;
}, "/home/project/src/components/Hero.astro", void 0);
const $$Mission = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="mission" class="py-16 bg-white"> <div class="container mx-auto px-4"> <div class="max-w-3xl mx-auto text-center mb-12"> <h2 class="text-3xl font-bold text-primary-800 mb-4">Our Mission</h2> <div class="w-20 h-1 bg-accent-500 mx-auto mb-6"></div> </div> <div class="flex flex-col md:flex-row gap-8 items-center"> <div class="md:w-1/2"> <img src="/images/taptlogo.png" alt="TAPT Logo" class="w-full max-w-md mx-auto"> </div> <div class="md:w-1/2"> <p class="text-lg text-gray-700 leading-relaxed mb-6">
The Tennessee Association of Pupil Transportation (TAPT) promotes safe transportation for all Tennessee school children. We focus on safety through education and training in pupil transportation.
</p> <p class="text-lg text-gray-700 leading-relaxed mb-6">
Our mission is to provide leadership and educational opportunities to ensure the safest, most cost-effective transportation.
</p> <p class="text-lg text-gray-700 leading-relaxed">
TAPT advocates for professional development, public awareness, and legislative support to enhance school bus safety.
</p> </div> </div> <div class="mt-12 text-center"> <a href="/board" class="inline-flex items-center text-primary-600 hover:text-primary-800 font-medium">
Meet Our Board
<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path> </svg> </a> </div> </div> </section>`;
}, "/home/project/src/components/Mission.astro", void 0);
const $$EventsSection = createComponent(($$result, $$props, $$slots) => {
  const events = [
    {
      id: "conference",
      title: "2025 TAPT Conference & Trade Show",
      date: "June 2-4, 2025",
      location: "Music Road Hotel, Pigeon Forge-Gatlinburg",
      description: "Join us for the annual Tennessee Association of Pupil Transportation Conference and Trade Show. Network with peers, attend educational sessions, and explore the latest in pupil transportation.",
      link: "/conference-registration",
      linkText: "Register for Conference",
      image: "/images/events/conference.jpg"
    },
    {
      id: "workshop",
      title: "TSBTA Workshop",
      date: "Coming Soon",
      location: "Tennessee",
      description: "The Tennessee School Bus Training Academy offers specialized training workshops for school transportation professionals.",
      link: "https://www.taptworkshop.com/",
      linkText: "Visit TSBTA Website",
      image: "/images/events/workshop.png"
    }
  ];
  const luncheons = [
    {
      date: "April 25, 2025",
      time: "10:30 AM",
      location: "Logan's Roadhouse",
      address: "1395 Interstate Dr, Cookeville, TN 38501",
      link: "https://logansroadhouse.com/locations/us/tn/cookeville/1395-interstate-drive/"
    },
    {
      date: "May 1, 2025",
      time: "10:00 AM",
      location: "Greene Technical Center",
      address: "1121 Hal Henard Rd, Greeneville, TN 37743",
      link: "https://gtc.gcschools.net/",
      notes: "Catered by Top Choice BBQ"
    },
    {
      date: "May 2, 2025",
      time: "10:00 AM",
      location: "Calhoun's at the Marina",
      address: "4550 City Park Dr, Lenoir City, TN 37772",
      link: "https://calhouns.com/locations/lenoir-city/"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section id="events" class="py-16 bg-gray-50"> <div class="container mx-auto px-4"> <div class="max-w-3xl mx-auto text-center mb-12"> <h2 class="text-3xl font-bold text-primary-800 mb-4">Upcoming Events</h2> <div class="w-20 h-1 bg-accent-500 mx-auto mb-6"></div> <p class="text-lg text-gray-600">Join us at our upcoming events to network, learn, and grow as transportation professionals.</p> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"> ${events.map((event) => renderTemplate`<div${addAttribute(event.id, "id")} class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"> <img${addAttribute(event.image, "src")}${addAttribute(event.title, "alt")} class="w-full h-48 object-cover"> <div class="p-6"> <h3 class="text-xl font-bold text-primary-700 mb-2">${event.title}</h3> <div class="flex items-center text-gray-500 mb-2"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path> </svg> <span>${event.date}</span> </div> <div class="flex items-center text-gray-500 mb-4"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path> </svg> <span>${event.location}</span> </div> <p class="text-gray-600 mb-6">${event.description}</p> <a${addAttribute(event.link, "href")} class="block w-full text-center py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition-colors"> ${event.linkText} </a> </div> </div>`)} </div> <div id="luncheons" class="bg-white rounded-lg shadow-md p-8"> <div class="text-center mb-8"> <h3 class="text-2xl font-bold text-primary-700 mb-4">Regional Luncheons</h3> <p class="text-gray-600">Join us for our Regional Luncheon Events across Tennessee</p> <div class="mt-4"> <a href="/luncheon-registration" class="inline-flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition-colors">
Register for a Luncheon
</a> </div> </div> <div class="overflow-x-auto"> <table class="w-full"> <thead> <tr class="bg-primary-700 text-white"> <th class="py-3 px-4 text-left">Date</th> <th class="py-3 px-4 text-left">Time</th> <th class="py-3 px-4 text-left">Location</th> <th class="py-3 px-4 text-left">Address</th> <th class="py-3 px-4 text-left">Notes</th> </tr> </thead> <tbody> ${luncheons.map((luncheon, index) => renderTemplate`<tr${addAttribute(index % 2 === 0 ? "bg-gray-50" : "bg-white", "class")}> <td class="py-3 px-4">${luncheon.date}</td> <td class="py-3 px-4">${luncheon.time}</td> <td class="py-3 px-4"> <a${addAttribute(luncheon.link, "href")} target="_blank" rel="noopener" class="text-primary-600 hover:text-primary-800 underline"> ${luncheon.location} </a> </td> <td class="py-3 px-4">${luncheon.address}</td> <td class="py-3 px-4">${luncheon.notes || "-"}</td> </tr>`)} </tbody> </table> </div> <div class="mt-6 text-center"> <p class="text-sm text-gray-500">
The Lunch & Learn Events are free to Tennessee Pupil Transportation employees and open to Tennessee Pupil Transportation Supervisors & Office Staff.
</p> </div> </div> </div> </section>`;
}, "/home/project/src/components/EventsSection.astro", void 0);
const $$SponsorsSection = createComponent(($$result, $$props, $$slots) => {
  const sponsors = [
    {
      name: "Central States Bus Sales",
      description: "Blue Bird Bus Company",
      logo: "/images/sponsors/blue-bird.jpg",
      website: "https://www.centralstatesbus.com/"
    },
    {
      name: "Cumberland IC Bus",
      description: "International IC Bus",
      logo: "/images/sponsors/ic-bus.jpg",
      website: "https://cumberland-companies.com/ic-bus/"
    },
    {
      name: "Mid-South Bus Center",
      description: "Thomas Bus Company",
      logo: "/images/sponsors/thomas-built.png",
      website: "https://www.thebuscenter.com/"
    }
  ];
  const associations = [
    {
      name: "National School Transportation Association",
      logo: "/images/sponsors/nsta-logo.png",
      website: "https://yellowbuses.org/"
    },
    {
      name: "National Association for Pupil Transportation",
      logo: "/images/sponsors/napt-logo.png",
      website: "https://www.napt.org/"
    },
    {
      name: "School Transportation News",
      logo: "/images/sponsors/stn-logo.png",
      website: "https://stnonline.com/"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section id="sponsors" class="py-16 bg-gray-50"> <div class="container mx-auto px-4"> <div class="max-w-3xl mx-auto text-center mb-12"> <h2 class="text-3xl font-bold text-primary-800 mb-4">Our Sponsors</h2> <div class="w-20 h-1 bg-accent-500 mx-auto mb-6"></div> <p class="text-lg text-gray-600">We're grateful to partner with these sponsors who help make our work possible.</p> </div> <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"> ${sponsors.map((sponsor) => renderTemplate`<a${addAttribute(sponsor.website, "href")} target="_blank" rel="noopener" class="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center group"> <div class="h-40 flex items-center justify-center mb-4"> <img${addAttribute(sponsor.logo, "src")}${addAttribute(sponsor.name, "alt")} class="max-h-full max-w-full object-contain"> </div> <h3 class="text-xl font-semibold text-primary-700 mb-2 group-hover:text-primary-800">${sponsor.name}</h3> <p class="text-gray-600 mb-4">${sponsor.description}</p> <div class="text-primary-600 group-hover:text-primary-700 flex items-center justify-center text-sm font-medium"> <span>Visit Website</span> <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path> </svg> </div> </a>`)} </div> <div class="max-w-3xl mx-auto text-center mb-12"> <h2 class="text-2xl font-bold text-primary-800 mb-4">National Associations</h2> <div class="w-16 h-1 bg-accent-500 mx-auto mb-6"></div> </div> <div class="grid grid-cols-1 md:grid-cols-3 gap-8"> ${associations.map((association) => renderTemplate`<a${addAttribute(association.website, "href")} target="_blank" rel="noopener" class="bg-white rounded-lg p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow"> <div class="h-24 flex items-center justify-center mb-4"> <img${addAttribute(association.logo, "src")}${addAttribute(association.name, "alt")} class="max-h-full max-w-full object-contain"> </div> <p class="text-gray-600 text-sm text-center">Click to Visit</p> </a>`)} </div> <div class="mt-16 text-center"> <a href="/become-sponsor" class="inline-flex items-center justify-center py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition-colors">
Become a Sponsor
<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path> </svg> </a> </div> </div> </section>`;
}, "/home/project/src/components/SponsorsSection.astro", void 0);
const $$ContactSection = createComponent(($$result, $$props, $$slots) => {
  const contacts = [
    {
      name: "Dawn Cox",
      title: "TAPT REGION 6 DIRECTOR",
      email: "coxd@loudoncounty.org",
      image: "/images/Cox.jpg"
    },
    {
      name: "Dewayne Ferrell",
      title: "TAPT REGION 3 DIRECTOR",
      email: "dewayne.ferrell@mnps.org",
      image: "/images/Ferrell.jpg"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section id="contact" class="py-16 bg-white"> <div class="container mx-auto px-4"> <div class="max-w-3xl mx-auto text-center mb-12"> <h2 class="text-3xl font-bold text-primary-800 mb-4">Contact Us</h2> <div class="w-20 h-1 bg-accent-500 mx-auto mb-6"></div> <p class="text-lg text-gray-600">Get in touch with our team for more information or assistance.</p> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"> ${contacts.map((contact) => renderTemplate`<div class="bg-gray-50 rounded-lg p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow"> <div class="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-primary-100"> <img${addAttribute(contact.image, "src")}${addAttribute(contact.name, "alt")} class="w-full h-full object-cover"> </div> <h3 class="text-xl font-semibold text-primary-700 mb-1">${contact.name}</h3> <p class="text-gray-600 mb-3">${contact.title}</p> <a${addAttribute(`mailto:${contact.email}`, "href")} class="text-primary-600 hover:text-primary-800 font-medium flex items-center"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path> </svg> ${contact.email} </a> </div>`)} </div> <div class="mt-16 max-w-4xl mx-auto"> <div class="bg-primary-800 text-white rounded-lg p-8 text-center"> <h3 class="text-2xl font-bold mb-4">TAPT Webmaster Contact</h3> <p class="mb-6">For website inquiries or technical support, please contact our webmaster:</p> <a href="mailto:tnbus@msn.com" class="inline-flex items-center text-accent-400 hover:text-accent-300"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path> </svg>
tnbus@msn.com
</a> </div> </div> </div> </section>`;
}, "/home/project/src/components/ContactSection.astro", void 0);
const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Home" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, {})} ${renderComponent($$result2, "Mission", $$Mission, {})} ${renderComponent($$result2, "EventsSection", $$EventsSection, {})} ${renderComponent($$result2, "SponsorsSection", $$SponsorsSection, {})} ${renderComponent($$result2, "ContactSection", $$ContactSection, {})} ${maybeRenderHead()}<div class="bg-primary-700 py-4 text-center"> <div class="container mx-auto px-4"> <p class="text-white text-sm">© ${(/* @__PURE__ */ new Date()).getFullYear()} Tennessee Association of Pupil Transportation. All rights reserved.</p> </div> </div> ` })}`;
}, "/home/project/src/pages/index.astro", void 0);
const $$file = "/home/project/src/pages/index.astro";
const $$url = "";
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

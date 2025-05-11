/* empty css                                */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead, b as addAttribute } from "../chunks/astro/server_CwJdA-vj.mjs";
import "kleur/colors";
import "html-escaper";
import { $ as $$Layout } from "../chunks/Layout_BDfg-G6c.mjs";
import { renderers } from "../renderers.mjs";
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$LuncheonRegistration = createComponent(async ($$result, $$props, $$slots) => {
  const locations = [
    {
      date: "April 25, 2025",
      time: "10:30 AM",
      location: "Logan's Roadhouse",
      city: "Cookeville",
      address: "1395 Interstate Dr, Cookeville, TN 38501"
    },
    {
      date: "May 1, 2025",
      time: "10:00 AM",
      location: "Greene Technical Center",
      city: "Greeneville",
      address: "1121 Hal Henard Rd, Greeneville, TN 37743",
      notes: "Catered by Top Choice BBQ"
    },
    {
      date: "May 2, 2025",
      time: "10:00 AM",
      location: "Calhoun's at the Marina",
      city: "Lenoir City",
      address: "4550 City Park Dr, Lenoir City, TN 37772"
    }
  ];
  const roles = [
    "Director",
    "Supervisor",
    "Trainer",
    "Mechanic",
    "Office Staff"
  ];
  return renderTemplate(_a || (_a = __template(["", " <script>\n  function formatPhoneNumber(input) {\n    let value = input.value.replace(/\\D/g, '');\n    if (value.length > 0) {\n      if (value.length <= 3) {\n        input.value = value;\n      } else if (value.length <= 6) {\n        input.value = value.slice(0, 3) + '-' + value.slice(3);\n      } else {\n        input.value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);\n      }\n    }\n  }\n<\/script> "], ["", " <script>\n  function formatPhoneNumber(input) {\n    let value = input.value.replace(/\\\\D/g, '');\n    if (value.length > 0) {\n      if (value.length <= 3) {\n        input.value = value;\n      } else if (value.length <= 6) {\n        input.value = value.slice(0, 3) + '-' + value.slice(3);\n      } else {\n        input.value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);\n      }\n    }\n  }\n<\/script> "])), renderComponent($$result, "Layout", $$Layout, { "title": "Luncheon Registration" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen py-12 bg-gray-50"> <div class="container mx-auto px-4"> <div class="max-w-2xl mx-auto"> <div class="bg-white rounded-lg shadow-md p-8"> <div class="text-center mb-8"> <img src="https://www.jotform.com/uploads/leriggsbee/form_files/Lunch-Learn-20202020.639e4097819fa6.34285591.png" alt="2025 TAPT Regional Sponsored Luncheon" class="mx-auto max-w-sm mb-6"> <h1 class="text-3xl font-bold text-primary-800 mb-4">2025 TAPT Regional Sponsored Luncheon</h1> <div class="w-20 h-1 bg-accent-500 mx-auto mb-6"></div> <p class="text-gray-600">
The Luncheon is free to transportation department personnel, but you must register so that we will have a correct food count! The approximate luncheon time is 10:00 AM - 1:00 PM Local Time.
</p> </div> <div class="mb-8"> <h2 class="text-xl font-semibold text-primary-700 mb-4">Available Locations</h2> <div class="space-y-4"> ${locations.map((loc) => renderTemplate`<div class="bg-gray-50 p-4 rounded-lg"> <div class="flex justify-between items-start"> <div> <h3 class="font-medium text-gray-900">${loc.location}</h3> <p class="text-gray-600">${loc.address}</p> </div> <div class="text-right"> <p class="font-medium text-gray-900">${loc.date}</p> <p class="text-gray-600">${loc.time}</p> </div> </div> ${loc.notes && renderTemplate`<p class="text-sm text-primary-600 mt-2">${loc.notes}</p>`} </div>`)} </div> </div> <form id="registration-form" class="space-y-6"> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> <div> <label class="block text-sm font-medium text-gray-700 mb-2">First Name *</label> <input type="text" name="firstName" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-2">Last Name *</label> <input type="text" name="lastName" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"> </div> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-2">Job Title *</label> <select name="jobTitle" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"> <option value="">Select your role</option> ${roles.map((role) => renderTemplate`<option${addAttribute(role, "value")}>${role}</option>`)} </select> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-2">School District *</label> <input type="text" name="district" required placeholder="Your School System" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-2">Transportation Department Location *</label> <input type="text" name="departmentLocation" required placeholder="Name of your Transportation Department Location" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label> <input type="email" name="email" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label> <input type="tel" name="phone" required pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" maxlength="12" oninput="formatPhoneNumber(this)" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-2">Number of People in Your Group *</label> <input type="number" name="groupSize" required min="1" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-2">Select a Location *</label> <select name="location" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"> <option value="">Select a location</option> ${locations.map((loc) => renderTemplate`<option${addAttribute(`${loc.city}-${loc.location}`, "value")}> ${loc.date} - ${loc.location}, ${loc.city} </option>`)} </select> </div> <div class="bg-blue-50 border-l-4 border-blue-400 p-4"> <p class="text-sm text-blue-800">
The Lunch & Learn Events are free to Tennessee Pupil Transportation employees and open to Tennessee Pupil Transportation Supervisors & Office Staff.
</p> </div> <button type="submit" class="w-full bg-primary-600 text-white py-3 px-6 rounded-md hover:bg-primary-700 transition-colors font-medium">
Submit Registration
</button> </form> </div> </div> </div> </div> ` }));
}, "/home/project/src/pages/luncheon-registration.astro", void 0);
const $$file = "/home/project/src/pages/luncheon-registration.astro";
const $$url = "/luncheon-registration";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$LuncheonRegistration,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};

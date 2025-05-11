/* empty css                                */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead, F as Fragment, b as addAttribute } from "../chunks/astro/server_CwJdA-vj.mjs";
import "kleur/colors";
import "html-escaper";
import { $ as $$Layout } from "../chunks/Layout_BDfg-G6c.mjs";
import { g as getLatestConference } from "../chunks/db_CbWXS8aP.mjs";
import { renderers } from "../renderers.mjs";
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$ConferenceRegistration = createComponent(async ($$result, $$props, $$slots) => {
  let conference = null;
  let error = null;
  try {
    conference = await getLatestConference();
    if (!conference) {
      error = "No upcoming conference is currently available";
    }
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load conference data";
  }
  const states = [
    { value: "AL", label: "Alabama" },
    { value: "AK", label: "Alaska" },
    { value: "AZ", label: "Arizona" },
    { value: "AR", label: "Arkansas" },
    { value: "CA", label: "California" },
    { value: "CO", label: "Colorado" },
    { value: "CT", label: "Connecticut" },
    { value: "DE", label: "Delaware" },
    { value: "FL", label: "Florida" },
    { value: "GA", label: "Georgia" },
    { value: "HI", label: "Hawaii" },
    { value: "ID", label: "Idaho" },
    { value: "IL", label: "Illinois" },
    { value: "IN", label: "Indiana" },
    { value: "IA", label: "Iowa" },
    { value: "KS", label: "Kansas" },
    { value: "KY", label: "Kentucky" },
    { value: "LA", label: "Louisiana" },
    { value: "ME", label: "Maine" },
    { value: "MD", label: "Maryland" },
    { value: "MA", label: "Massachusetts" },
    { value: "MI", label: "Michigan" },
    { value: "MN", label: "Minnesota" },
    { value: "MS", label: "Mississippi" },
    { value: "MO", label: "Missouri" },
    { value: "MT", label: "Montana" },
    { value: "NE", label: "Nebraska" },
    { value: "NV", label: "Nevada" },
    { value: "NH", label: "New Hampshire" },
    { value: "NJ", label: "New Jersey" },
    { value: "NM", label: "New Mexico" },
    { value: "NY", label: "New York" },
    { value: "NC", label: "North Carolina" },
    { value: "ND", label: "North Dakota" },
    { value: "OH", label: "Ohio" },
    { value: "OK", label: "Oklahoma" },
    { value: "OR", label: "Oregon" },
    { value: "PA", label: "Pennsylvania" },
    { value: "RI", label: "Rhode Island" },
    { value: "SC", label: "South Carolina" },
    { value: "SD", label: "South Dakota" },
    { value: "TN", label: "Tennessee" },
    { value: "TX", label: "Texas" },
    { value: "UT", label: "Utah" },
    { value: "VT", label: "Vermont" },
    { value: "VA", label: "Virginia" },
    { value: "WA", label: "Washington" },
    { value: "WV", label: "West Virginia" },
    { value: "WI", label: "Wisconsin" },
    { value: "WY", label: "Wyoming" }
  ];
  return renderTemplate(_a || (_a = __template(["", " <script>\n  function formatPhoneNumber(input) {\n    let value = input.value.replace(/\\D/g, '');\n    if (value.length > 0) {\n      if (value.length <= 3) {\n        input.value = value;\n      } else if (value.length <= 6) {\n        input.value = value.slice(0, 3) + '-' + value.slice(3);\n      } else {\n        input.value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);\n      }\n    }\n  }\n<\/script> "], ["", " <script>\n  function formatPhoneNumber(input) {\n    let value = input.value.replace(/\\\\D/g, '');\n    if (value.length > 0) {\n      if (value.length <= 3) {\n        input.value = value;\n      } else if (value.length <= 6) {\n        input.value = value.slice(0, 3) + '-' + value.slice(3);\n      } else {\n        input.value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);\n      }\n    }\n  }\n<\/script> "])), renderComponent($$result, "Layout", $$Layout, { "title": "Conference Registration" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen py-12 bg-gray-50"> <div class="container mx-auto px-4"> <div class="max-w-3xl mx-auto"> <div class="bg-white rounded-lg shadow-md p-8"> ${error ? renderTemplate`<div class="text-center py-8"> <h1 class="text-2xl font-bold text-red-600 mb-4">Conference Not Available</h1> <p class="text-gray-600">${error}</p> <p class="mt-4">Please check back later for upcoming conferences.</p> </div>` : conference ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <h1 class="text-3xl font-bold text-primary-800 mb-6 text-center">TAPT Conference Registration</h1> <div class="mb-8"> <h2 class="text-2xl font-semibold mb-4">${conference.name}</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"> <div> <p class="text-gray-600">Date</p> <p class="font-medium">${new Date(conference.start_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} - ${new Date(conference.end_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p> </div> <div> <p class="text-gray-600">Location</p> <p class="font-medium">${conference.location}</p> </div> <div> <p class="text-gray-600">Registration Fee</p> <p class="font-medium">$175.00 per attendee</p> </div> </div> </div> <div id="error-message" class="hidden mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded"></div> <form id="registration-form" class="space-y-6"${addAttribute(JSON.stringify(conference), "data-conference")}> <div> <label class="block text-sm font-medium text-gray-700 mb-2">School District or Company *</label> <input type="text" name="organization" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"> </div> <div id="attendees-container"> ${[1, 2, 3, 4].map((num) => renderTemplate`<div class="attendee-section border-t pt-6 first:border-t-0 first:pt-0 hidden"${addAttribute(num, "data-attendee")}> <div class="flex justify-between items-center mb-4"> <h3 class="text-lg font-medium">Attendee ${num} ${num === 1 ? "*" : ""}</h3> ${num > 1 && renderTemplate`<button type="button" class="remove-attendee text-red-600 hover:text-red-800 text-sm">
Remove
</button>`} </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> <div> <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label> <input type="text"${addAttribute(`attendee${num}FirstName`, "name")}${addAttribute(num === 1, "required")} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label> <input type="text"${addAttribute(`attendee${num}LastName`, "name")}${addAttribute(num === 1, "required")} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"> </div> </div> ${num > 1 && renderTemplate`<div class="mt-4"> <label class="inline-flex items-center"> <input type="checkbox" class="form-checkbox text-primary-600 h-4 w-4"${addAttribute(num, "data-same-address")}> <span class="ml-2 text-sm text-gray-700">Same address as Attendee 1</span> </label> </div>`} <div class="address-fields"> <div class="mt-4"> <label class="block text-sm font-medium text-gray-700 mb-2">Address</label> <input type="text"${addAttribute(`attendee${num}Address`, "name")}${addAttribute(num === 1, "required")} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Street Address"> </div> <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4"> <div> <label class="block text-sm font-medium text-gray-700 mb-2">City</label> <input type="text"${addAttribute(`attendee${num}City`, "name")}${addAttribute(num === 1, "required")} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-2">State</label> <select${addAttribute(`attendee${num}State`, "name")}${addAttribute(num === 1, "required")} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"> ${states.map((state) => renderTemplate`<option${addAttribute(state.value, "value")}${addAttribute(state.value === "TN", "selected")}>${state.label}</option>`)} </select> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label> <input type="text"${addAttribute(`attendee${num}Zip`, "name")}${addAttribute(num === 1, "required")} pattern="[0-9]{5}" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"> </div> </div> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"> <div> <label class="block text-sm font-medium text-gray-700 mb-2">Email</label> <input type="email"${addAttribute(`attendee${num}Email`, "name")}${addAttribute(num === 1, "required")} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-2">Phone</label> <input type="tel"${addAttribute(`attendee${num}Phone`, "name")}${addAttribute(num === 1, "required")} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" maxlength="12" oninput="formatPhoneNumber(this)"> </div> </div> </div>`)} </div> <div class="flex justify-between items-center"> <button type="button" id="add-attendee" class="text-primary-600 hover:text-primary-800 text-sm font-medium">
+ Add Attendee
</button> <div class="text-sm text-gray-600">
Total Attendees: <span id="attendee-count">0</span> </div> </div> <div id="total-amount-section" class="hidden"> <div class="bg-gray-50 p-4 rounded-md"> <div class="flex justify-between items-center"> <span class="text-gray-700">Registration Fee (per attendee):</span> <span class="font-medium">$175.00</span> </div> <div class="flex justify-between items-center mt-2 text-lg font-bold text-primary-700"> <span>Total Amount:</span> <span>$<span id="total-amount">0.00</span></span> </div> </div> </div> <div class="bg-gray-50 p-4 rounded-md"> <p class="text-sm text-gray-600">
Please mail the completed form and payment check to:<br>
TAPT P.O. BOX 68<br>
MCMINNVILLE, TN 37111
</p> <p class="text-sm text-gray-600 mt-2">
For credit card payments, visit:<br> <a href="https://www.paypal.com/ncp/payment/2TB7GLXUJXRXW" class="text-primary-600 hover:text-primary-800" target="_blank" rel="noopener">
PayPal Payment Link
</a> </p> </div> <div class="flex gap-4"> <button type="submit" class="flex-1 bg-primary-600 text-white py-3 px-6 rounded-md hover:bg-primary-700 transition-colors font-medium">
Submit Registration
</button> <button type="button" id="print-form" class="bg-gray-600 text-white py-3 px-6 rounded-md hover:bg-gray-700 transition-colors font-medium">
Print Form
</button> </div> </form>  <div id="print-template" class="hidden"> <div class="print-content"> <style>
                    @media print {
                      .print-content {
                        padding: 20px;
                      }
                      .print-header {
                        text-align: center;
                        margin-bottom: 30px;
                      }
                      .print-attendee {
                        margin-bottom: 30px;
                        page-break-inside: avoid;
                      }
                      .print-field {
                        margin-bottom: 10px;
                      }
                      .print-total {
                        margin-top: 30px;
                        border-top: 2px solid #000;
                        padding-top: 10px;
                      }
                    }
                  </style> <div class="print-header"> <h1 style="font-size: 24px; font-weight: bold;">TAPT Conference Registration</h1> <p>${conference.name}</p> <p>${new Date(conference.start_date).toLocaleDateString()} - ${new Date(conference.end_date).toLocaleDateString()}</p> <p>${conference.location}</p> </div> <div id="print-attendees"></div> <div class="print-total"> <p>Total Attendees: <span id="print-attendee-count"></span></p> <p>Total Amount: $<span id="print-total-amount"></span></p> </div> </div> </div> ` })}` : renderTemplate`<div class="text-center py-8"> <h1 class="text-2xl font-bold text-gray-600 mb-4">No Conference Available</h1> <p class="text-gray-600">There are no upcoming conferences at this time.</p> <p class="mt-4">Please check back later for upcoming conferences.</p> </div>`} </div> </div> </div> </div> ` }));
}, "/home/project/src/pages/conference-registration.astro", void 0);
const $$file = "/home/project/src/pages/conference-registration.astro";
const $$url = "/conference-registration";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$ConferenceRegistration,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};

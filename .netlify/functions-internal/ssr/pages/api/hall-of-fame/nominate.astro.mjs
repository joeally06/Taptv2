import { c as createHallOfFameNomination } from "../../../chunks/db_D4vCMefA.mjs";
import { renderers } from "../../../renderers.mjs";
const POST = async ({ request }) => {
  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "no-store"
  };
  try {
    const formData = await request.json();
    const nominationData = {
      nominee_name: `${formData.nomineeFirstName} ${formData.nomineeLastName}`.trim(),
      nominator_name: `${formData.supervisorFirstName} ${formData.supervisorLastName}`.trim(),
      nominator_email: formData.supervisorEmail.trim(),
      nomination_reason: formData.nominationReason || "",
      // Make sure this field exists in your form
      district: formData.district.trim()
    };
    const requiredFields = ["nominee_name", "nominator_name", "nominator_email", "nomination_reason", "district"];
    const missingFields = requiredFields.filter((field) => !nominationData[field]);
    if (missingFields.length > 0) {
      return new Response(
        JSON.stringify({
          error: `Missing required fields: ${missingFields.join(", ")}`
        }),
        { status: 400, headers }
      );
    }
    const result = await createHallOfFameNomination(nominationData);
    return new Response(
      JSON.stringify({ success: true, data: result }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error("Nomination error:", error, error.stack);
    return new Response(
      JSON.stringify({
        error: error.message || "An error occurred while processing the nomination"
      }),
      { status: 500, headers }
    );
  }
};
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};

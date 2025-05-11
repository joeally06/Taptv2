import { renderers } from "./renderers.mjs";
import { s as serverEntrypointModule } from "./chunks/_@astrojs-ssr-adapter_DYQ_v7bF.mjs";
import { manifest } from "./manifest_Byjm2JX8.mjs";
import { createExports } from "@astrojs/netlify/ssr-function.js";
const _page0 = () => import("./pages/_image.astro.mjs");
const _page1 = () => import("./pages/admin/conferences/new.astro.mjs");
const _page2 = () => import("./pages/admin/conferences/_id_/edit.astro.mjs");
const _page3 = () => import("./pages/admin/conferences.astro.mjs");
const _page4 = () => import("./pages/admin/users.astro.mjs");
const _page5 = () => import("./pages/admin.astro.mjs");
const _page6 = () => import("./pages/advisory-board.astro.mjs");
const _page7 = () => import("./pages/api/auth-status.astro.mjs");
const _page8 = () => import("./pages/api/conferences.astro.mjs");
const _page9 = () => import("./pages/api/hall-of-fame/nominate.astro.mjs");
const _page10 = () => import("./pages/api/list-tables.astro.mjs");
const _page11 = () => import("./pages/api/luncheon/register.astro.mjs");
const _page12 = () => import("./pages/api/register.astro.mjs");
const _page13 = () => import("./pages/api/scholarship/apply.astro.mjs");
const _page14 = () => import("./pages/api/test-auth.astro.mjs");
const _page15 = () => import("./pages/api/test-connection.astro.mjs");
const _page16 = () => import("./pages/api/test-db.astro.mjs");
const _page17 = () => import("./pages/api/verify-submissions.astro.mjs");
const _page18 = () => import("./pages/board.astro.mjs");
const _page19 = () => import("./pages/conference-registration.astro.mjs");
const _page20 = () => import("./pages/hall-of-fame.astro.mjs");
const _page21 = () => import("./pages/hall-of-fame-nomination/success.astro.mjs");
const _page22 = () => import("./pages/hall-of-fame-nomination.astro.mjs");
const _page23 = () => import("./pages/joe-baxter-hof.astro.mjs");
const _page24 = () => import("./pages/login.astro.mjs");
const _page25 = () => import("./pages/luncheon-registration/success.astro.mjs");
const _page26 = () => import("./pages/luncheon-registration.astro.mjs");
const _page27 = () => import("./pages/registration-success.astro.mjs");
const _page28 = () => import("./pages/scholarship/success.astro.mjs");
const _page29 = () => import("./pages/scholarship.astro.mjs");
const _page30 = () => import("./pages/index.astro.mjs");
const pageMap = /* @__PURE__ */ new Map([
  ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
  ["src/pages/admin/conferences/new.astro", _page1],
  ["src/pages/admin/conferences/[id]/edit.astro", _page2],
  ["src/pages/admin/conferences/index.astro", _page3],
  ["src/pages/admin/users.astro", _page4],
  ["src/pages/admin/index.astro", _page5],
  ["src/pages/advisory-board.astro", _page6],
  ["src/pages/api/auth-status.ts", _page7],
  ["src/pages/api/conferences.ts", _page8],
  ["src/pages/api/hall-of-fame/nominate.ts", _page9],
  ["src/pages/api/list-tables.ts", _page10],
  ["src/pages/api/luncheon/register.ts", _page11],
  ["src/pages/api/register.ts", _page12],
  ["src/pages/api/scholarship/apply.ts", _page13],
  ["src/pages/api/test-auth.ts", _page14],
  ["src/pages/api/test-connection.ts", _page15],
  ["src/pages/api/test-db.ts", _page16],
  ["src/pages/api/verify-submissions.ts", _page17],
  ["src/pages/board.astro", _page18],
  ["src/pages/conference-registration.astro", _page19],
  ["src/pages/hall-of-fame.astro", _page20],
  ["src/pages/hall-of-fame-nomination/success.astro", _page21],
  ["src/pages/hall-of-fame-nomination.astro", _page22],
  ["src/pages/joe-baxter-hof.astro", _page23],
  ["src/pages/login.astro", _page24],
  ["src/pages/luncheon-registration/success.astro", _page25],
  ["src/pages/luncheon-registration.astro", _page26],
  ["src/pages/registration-success.astro", _page27],
  ["src/pages/scholarship/success.astro", _page28],
  ["src/pages/scholarship.astro", _page29],
  ["src/pages/index.astro", _page30]
]);
const serverIslandMap = /* @__PURE__ */ new Map();
const _manifest = Object.assign(manifest, {
  pageMap,
  serverIslandMap,
  renderers,
  middleware: void 0
});
const _args = void 0;
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = "start";
if (_start in serverEntrypointModule) {
  serverEntrypointModule[_start](_manifest, _args);
}
export {
  __astrojsSsrVirtualEntry as default,
  pageMap
};

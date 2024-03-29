import { ao as f, aJ as v, ap as D, X as C, y as e, a9 as g, bw as E, ab as M, ag as y, ae as R, ad as A, bx as _, Y as h, bu as b } from "./index-XkptO5g9.mjs";
import { useState as o, useRef as Y, useEffect as N } from "react";
import { M as F, a as K } from "./index.esm-dKdnsyf6.mjs";
import { f as T } from "./Dashboard-wU64Oe5M.mjs";
import "react-dom";
import "./swiper-bundle-HqgJZv8V.mjs";
const V = () => {
  let s = f((a) => a.admin);
  const x = v(), i = b.en, n = f((a) => a.AdminMasjid[0]), [m, W] = o(!1), [d, c] = o(!1);
  let j = Y();
  const [l, I] = o(""), t = D();
  N(() => {
    let a = s.masjids[0];
    console.log(a), I(a);
  }, [l]), N(() => {
    l && t(T(l)).then((r) => {
      !r.timings === null ? C(
        !0,
        "error",
        `Failed To Fetch :${r.message}`,
        t
      ) : console.log(r);
    });
  }, [l]);
  const p = () => {
    x("/feed");
  }, P = () => {
    c(!d);
  }, u = () => {
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "AdminProfileCard", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "AdminProfileCardInformation", children: [
      /* @__PURE__ */ e.jsxs(
        g,
        {
          open: d,
          "aria-labelledby": "alert-dialog-title",
          "aria-describedby": "alert-dialog-description",
          children: [
            /* @__PURE__ */ e.jsx(E, { id: "alert-dialog-title", children: "Enter the Name " }),
            /* @__PURE__ */ e.jsx(M, { children: /* @__PURE__ */ e.jsx(
              y,
              {
                autoFocus: !0,
                margin: "dense",
                inputRef: j,
                sx: { width: "20rem" },
                label: "Edit Name",
                type: "text",
                variant: "outlined"
              }
            ) }),
            /* @__PURE__ */ e.jsxs(R, { children: [
              /* @__PURE__ */ e.jsxs(A, { onClick: u, variant: "outlined", children: [
                " ",
                m ? /* @__PURE__ */ e.jsx(_, { size: "15px" }) : /* @__PURE__ */ e.jsx("span", { children: " Yes " }),
                " "
              ] }),
              /* @__PURE__ */ e.jsx(
                A,
                {
                  onClick: (a) => c(!d),
                  variant: "outlined",
                  disabled: m,
                  children: "No"
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ e.jsxs("div", { className: "AdminNameProfileCardName", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "AdminProfileItemAdminName", children: [
          /* @__PURE__ */ e.jsx("span", { className: "AdminName", children: s && s.name }),
          /* @__PURE__ */ e.jsx(F, { className: "CancelIconAdminName", onClick: P })
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "CancelIconButtonAdmin", children: /* @__PURE__ */ e.jsx(K, { className: "CancelIconAdmin", onClick: p }) })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "AdminProfileItem", children: [
        /* @__PURE__ */ e.jsx("div", { className: "AdminProfileInfoKey", children: /* @__PURE__ */ e.jsxs("span", { className: "AdminProfileInforKeyWord", children: [
          i.ADMIN_PROFILE_CARD.ADMIN_EMAIL,
          " :",
          " "
        ] }) }),
        /* @__PURE__ */ e.jsx("div", { className: "AdminProfileInfoValue", children: /* @__PURE__ */ e.jsx("span", { className: "AdminProfileInforValueWord", children: s && s.email }) })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "AdminProfileItem", children: [
        /* @__PURE__ */ e.jsx("div", { className: "AdminProfileInfoKey", children: /* @__PURE__ */ e.jsxs("span", { className: "AdminProfileInforKeyWord", children: [
          i.ADMIN_PROFILE_CARD.ADMIN_MASJID,
          " :",
          " "
        ] }) }),
        /* @__PURE__ */ e.jsx("div", { className: "AdminProfileInfoValue", children: /* @__PURE__ */ e.jsx("span", { className: "AdminProfileInforValueWord", children: n && (n == null ? void 0 : n.masjidName) }) })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "AdminProfileItem", children: [
        /* @__PURE__ */ e.jsx("div", { className: "AdminProfileInfoKey", children: /* @__PURE__ */ e.jsxs("span", { className: "AdminProfileInforKeyWord", children: [
          i.ADMIN_PROFILE_CARD.UPDATED_AT,
          " :",
          " "
        ] }) }),
        /* @__PURE__ */ e.jsx("div", { className: "AdminProfileInfoValue", children: /* @__PURE__ */ e.jsx("span", { className: "AdminProfileInforValueWord", children: s && h(s == null ? void 0 : s.updatedAt).format("DD/MM/YYYY hh:mm a") }) })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "AdminProfileItem", children: [
        /* @__PURE__ */ e.jsx("div", { className: "AdminProfileInfoKey", children: /* @__PURE__ */ e.jsxs("span", { className: "AdminProfileInforKeyWord", children: [
          i.ADMIN_PROFILE_CARD.CREATED_AT,
          " :",
          " "
        ] }) }),
        /* @__PURE__ */ e.jsx("div", { className: "AdminProfileInfoValue", children: /* @__PURE__ */ e.jsx("span", { className: "AdminProfileInforValueWord", children: s && h(s == null ? void 0 : s.createdAt).format("DD/MM/YYYY hh:mm a") }) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "AdminProfileCardImage" })
  ] });
}, B = () => /* @__PURE__ */ e.jsx("div", { className: "AdminProfileContainer", children: /* @__PURE__ */ e.jsx(V, {}) });
export {
  B as default
};

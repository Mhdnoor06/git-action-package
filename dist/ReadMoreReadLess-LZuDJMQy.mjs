import { ao as Y, ap as q, y as e, a9 as G, bw as H, ae as J, ad as v, bx as D } from "./index-XkptO5g9.mjs";
import K, { useState as r, useEffect as Q } from "react";
import { B as b, g as U } from "./FetchingMasjidByAdminAction-0AI5KNsP.mjs";
import { b as V } from "./index.esm-dKdnsyf6.mjs";
import { p as W, d as X, a as Z } from "./Dashboard-wU64Oe5M.mjs";
const te = ({
  ParentComponentType: n,
  EventPhotos: d,
  Event: m,
  Photos: g
}) => {
  const [o, u] = r(), A = Y((l) => l.admin), [s, M] = r([]), [i, h] = r([]), [R, $] = r(!1), [a, c] = r(1), [B, f] = r(!1);
  let I = s ? s == null ? void 0 : s.length : 3;
  const [k, x] = K.useState(!1), [N, j] = r(!1), p = q(), L = () => {
    a !== (s == null ? void 0 : s.length) ? c(a + 1) : a === (s == null ? void 0 : s.length) && c(1);
  }, _ = () => {
    a !== 1 ? c(a - 1) : a === 1 && c(s == null ? void 0 : s.length);
  }, O = (l) => {
    c(l);
  };
  Q(() => {
    n === "Masjid" && g ? (M(g), h(g), window.location.pathname === "/masjidprofile" ? f(!0) : f(!1)) : n === "Event" && (d == null ? void 0 : d.length) > 0 && (h(d), M(d), f(!0));
  }, [n, d]);
  const w = () => {
    if (j(!0), n === "Masjid") {
      let l = i[a - 1], t = l.indexOf("Masjid"), z = l.substr(t).indexOf(".jpg");
      const T = {
        imageId: l.substr(t, z),
        url: l
      };
      p(X(o == null ? void 0 : o._id, T)).then(function(ee) {
        p(U(A._id)), c(a - 1), j(!1), x(!1);
      });
    } else
      y();
    j(!1);
  }, y = () => {
    j(!0);
    let l = i[a - 1];
    p(
      Z(l._id, (m == null ? void 0 : m._id) ?? "")
    ).then(function(S) {
      i.splice(a - 1, 1), c(a - 1), j(!1), x(!1);
    });
  }, C = () => {
    x(!1);
  }, F = () => {
    x(!0);
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "PictureCarouselContainer", children: [
    /* @__PURE__ */ e.jsxs(
      G,
      {
        open: k,
        "aria-labelledby": "alert-dialog-title",
        "aria-describedby": "alert-dialog-description",
        children: [
          /* @__PURE__ */ e.jsx(H, { id: "alert-dialog-title", children: "Are you sure you want to delete the  Image ?" }),
          /* @__PURE__ */ e.jsxs(J, { children: [
            /* @__PURE__ */ e.jsxs(v, { onClick: w, variant: "outlined", children: [
              " ",
              N ? /* @__PURE__ */ e.jsx(D, { size: "15px" }) : /* @__PURE__ */ e.jsx("span", { children: " Yes " }),
              " "
            ] }),
            /* @__PURE__ */ e.jsx(
              v,
              {
                onClick: C,
                variant: "outlined",
                disabled: N,
                children: "No"
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "container-slider-masjid", children: [
      (i == null ? void 0 : i.length) > 0 ? i.map((l, t) => /* @__PURE__ */ e.jsxs(
        "div",
        {
          className: a === t + 1 ? "slide active-anim" : "slide",
          children: [
            /* @__PURE__ */ e.jsx("img", { src: l.url, alt: "The Event ", className: "eventImage" }),
            (s == null ? void 0 : s.length) > 0 && B && (R ? /* @__PURE__ */ e.jsx("div", { className: "delete-icon", children: /* @__PURE__ */ e.jsx(D, { size: "15px", className: "loadingIcon" }) }) : /* @__PURE__ */ e.jsx(
              V,
              {
                className: "delete-icon",
                onClick: F
              }
            ))
          ]
        },
        t
      )) : /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx("img", { src: W, alt: "The Event ", className: "eventImage2" }) }),
      (i == null ? void 0 : i.length) > 1 && /* @__PURE__ */ e.jsx(b, { moveSlide: L, direction: "next" }),
      (i == null ? void 0 : i.length) > 1 && /* @__PURE__ */ e.jsx(b, { moveSlide: _, direction: "prev" }),
      /* @__PURE__ */ e.jsx("div", { className: "container-dots", children: (i == null ? void 0 : i.length) > 1 && Array.from({ length: I || 3 }).map(
        (l, t) => /* @__PURE__ */ e.jsx(
          "div",
          {
            onClick: () => O(t + 1),
            className: a === t + 1 ? "dot active" : "dot"
          }
        )
      ) })
    ] })
  ] });
}, de = ({ children: n, Limit: d }) => {
  const [m, g] = r(!1), o = () => {
    g((u) => !u);
  };
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    m ? /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx("div", { className: "DescriptionBody", children: /* @__PURE__ */ e.jsxs("div", { className: "DescriptionBtn", children: [
      /* @__PURE__ */ e.jsx("button", { className: "CloseBtn", onClick: o, children: "Close" }),
      /* @__PURE__ */ e.jsx("div", { className: "ChildrenProp", children: n })
    ] }) }) }) : n == null ? void 0 : n.substring(0, d),
    /* @__PURE__ */ e.jsx("button", { className: "ReadMoreBtn", onClick: o, children: "...ReadMore" })
  ] });
};
export {
  te as P,
  de as R
};

import { w as ta, d as na, a as ra, i as J, bz as _, P as x, c as Q, bA as sa, bB as ia, aJ as H, bd as oa, ao as S, y as a, bt as la, Y as k, ap as ca } from "./index-XkptO5g9.mjs";
import * as U from "react";
import { useState as m, useEffect as z } from "react";
import { m as w, D as da } from "./DatePicker-8NDaDOhh.mjs";
import { f as ma, c as X } from "./Dashboard-wU64Oe5M.mjs";
import { B as ga } from "./BackButton-AhD4OsYY.mjs";
import { N as ha } from "./NoEventAvaliable-vBaWXttD.mjs";
import { E as fa } from "./EventPageFormComponent-9XBvpM1Z.mjs";
import { N as pa } from "./NoImgFound-8bVP7rb5.mjs";
import { C as ua } from "./CANCEL-NjkmKVms.mjs";
import "react-dom";
import "./swiper-bundle-HqgJZv8V.mjs";
import "./index.esm-dKdnsyf6.mjs";
var Z = 10, q = 4, va = function(e) {
  return {
    /* Styles applied to the root element. */
    root: {
      position: "relative",
      display: "inline-flex",
      // For correct alignment with the text.
      verticalAlign: "middle",
      flexShrink: 0
    },
    /* Styles applied to the badge `span` element. */
    badge: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      position: "absolute",
      boxSizing: "border-box",
      fontFamily: e.typography.fontFamily,
      fontWeight: e.typography.fontWeightMedium,
      fontSize: e.typography.pxToRem(12),
      minWidth: Z * 2,
      lineHeight: 1,
      padding: "0 6px",
      height: Z * 2,
      borderRadius: Z,
      zIndex: 1,
      // Render the badge on top of potential ripples.
      transition: e.transitions.create("transform", {
        easing: e.transitions.easing.easeInOut,
        duration: e.transitions.duration.enteringScreen
      })
    },
    /* Styles applied to the root element if `color="primary"`. */
    colorPrimary: {
      backgroundColor: e.palette.primary.main,
      color: e.palette.primary.contrastText
    },
    /* Styles applied to the root element if `color="secondary"`. */
    colorSecondary: {
      backgroundColor: e.palette.secondary.main,
      color: e.palette.secondary.contrastText
    },
    /* Styles applied to the root element if `color="error"`. */
    colorError: {
      backgroundColor: e.palette.error.main,
      color: e.palette.error.contrastText
    },
    /* Styles applied to the root element if `variant="dot"`. */
    dot: {
      borderRadius: q,
      height: q * 2,
      minWidth: q * 2,
      padding: 0
    },
    /* Styles applied to the root element if `anchorOrigin={{ 'top', 'right' }} overlap="rectangle"`. */
    anchorOriginTopRightRectangle: {
      top: 0,
      right: 0,
      transform: "scale(1) translate(50%, -50%)",
      transformOrigin: "100% 0%",
      "&$invisible": {
        transform: "scale(0) translate(50%, -50%)"
      }
    },
    /* Styles applied to the root element if `anchorOrigin={{ 'top', 'right' }} overlap="rectangular"`. */
    anchorOriginTopRightRectangular: {
      top: 0,
      right: 0,
      transform: "scale(1) translate(50%, -50%)",
      transformOrigin: "100% 0%",
      "&$invisible": {
        transform: "scale(0) translate(50%, -50%)"
      }
    },
    /* Styles applied to the root element if `anchorOrigin={{ 'bottom', 'right' }} overlap="rectangle"`. */
    anchorOriginBottomRightRectangle: {
      bottom: 0,
      right: 0,
      transform: "scale(1) translate(50%, 50%)",
      transformOrigin: "100% 100%",
      "&$invisible": {
        transform: "scale(0) translate(50%, 50%)"
      }
    },
    /* Styles applied to the root element if `anchorOrigin={{ 'bottom', 'right' }} overlap="rectangular"`. */
    anchorOriginBottomRightRectangular: {
      bottom: 0,
      right: 0,
      transform: "scale(1) translate(50%, 50%)",
      transformOrigin: "100% 100%",
      "&$invisible": {
        transform: "scale(0) translate(50%, 50%)"
      }
    },
    /* Styles applied to the root element if `anchorOrigin={{ 'top', 'left' }} overlap="rectangle"`. */
    anchorOriginTopLeftRectangle: {
      top: 0,
      left: 0,
      transform: "scale(1) translate(-50%, -50%)",
      transformOrigin: "0% 0%",
      "&$invisible": {
        transform: "scale(0) translate(-50%, -50%)"
      }
    },
    /* Styles applied to the root element if `anchorOrigin={{ 'top', 'left' }} overlap="rectangular"`. */
    anchorOriginTopLeftRectangular: {
      top: 0,
      left: 0,
      transform: "scale(1) translate(-50%, -50%)",
      transformOrigin: "0% 0%",
      "&$invisible": {
        transform: "scale(0) translate(-50%, -50%)"
      }
    },
    /* Styles applied to the root element if `anchorOrigin={{ 'bottom', 'left' }} overlap="rectangle"`. */
    anchorOriginBottomLeftRectangle: {
      bottom: 0,
      left: 0,
      transform: "scale(1) translate(-50%, 50%)",
      transformOrigin: "0% 100%",
      "&$invisible": {
        transform: "scale(0) translate(-50%, 50%)"
      }
    },
    /* Styles applied to the root element if `anchorOrigin={{ 'bottom', 'left' }} overlap="rectangular"`. */
    anchorOriginBottomLeftRectangular: {
      bottom: 0,
      left: 0,
      transform: "scale(1) translate(-50%, 50%)",
      transformOrigin: "0% 100%",
      "&$invisible": {
        transform: "scale(0) translate(-50%, 50%)"
      }
    },
    /* Styles applied to the root element if `anchorOrigin={{ 'top', 'right' }} overlap="circle"`. */
    anchorOriginTopRightCircle: {
      top: "14%",
      right: "14%",
      transform: "scale(1) translate(50%, -50%)",
      transformOrigin: "100% 0%",
      "&$invisible": {
        transform: "scale(0) translate(50%, -50%)"
      }
    },
    /* Styles applied to the root element if `anchorOrigin={{ 'top', 'right' }} overlap="circular"`. */
    anchorOriginTopRightCircular: {
      top: "14%",
      right: "14%",
      transform: "scale(1) translate(50%, -50%)",
      transformOrigin: "100% 0%",
      "&$invisible": {
        transform: "scale(0) translate(50%, -50%)"
      }
    },
    /* Styles applied to the root element if `anchorOrigin={{ 'bottom', 'right' }} overlap="circle"`. */
    anchorOriginBottomRightCircle: {
      bottom: "14%",
      right: "14%",
      transform: "scale(1) translate(50%, 50%)",
      transformOrigin: "100% 100%",
      "&$invisible": {
        transform: "scale(0) translate(50%, 50%)"
      }
    },
    /* Styles applied to the root element if `anchorOrigin={{ 'bottom', 'right' }} overlap="circular"`. */
    anchorOriginBottomRightCircular: {
      bottom: "14%",
      right: "14%",
      transform: "scale(1) translate(50%, 50%)",
      transformOrigin: "100% 100%",
      "&$invisible": {
        transform: "scale(0) translate(50%, 50%)"
      }
    },
    /* Styles applied to the root element if `anchorOrigin={{ 'top', 'left' }} overlap="circle"`. */
    anchorOriginTopLeftCircle: {
      top: "14%",
      left: "14%",
      transform: "scale(1) translate(-50%, -50%)",
      transformOrigin: "0% 0%",
      "&$invisible": {
        transform: "scale(0) translate(-50%, -50%)"
      }
    },
    /* Styles applied to the root element if `anchorOrigin={{ 'top', 'left' }} overlap="circular"`. */
    anchorOriginTopLeftCircular: {
      top: "14%",
      left: "14%",
      transform: "scale(1) translate(-50%, -50%)",
      transformOrigin: "0% 0%",
      "&$invisible": {
        transform: "scale(0) translate(-50%, -50%)"
      }
    },
    /* Styles applied to the root element if `anchorOrigin={{ 'bottom', 'left' }} overlap="circle"`. */
    anchorOriginBottomLeftCircle: {
      bottom: "14%",
      left: "14%",
      transform: "scale(1) translate(-50%, 50%)",
      transformOrigin: "0% 100%",
      "&$invisible": {
        transform: "scale(0) translate(-50%, 50%)"
      }
    },
    /* Styles applied to the root element if `anchorOrigin={{ 'bottom', 'left' }} overlap="circular"`. */
    anchorOriginBottomLeftCircular: {
      bottom: "14%",
      left: "14%",
      transform: "scale(1) translate(-50%, 50%)",
      transformOrigin: "0% 100%",
      "&$invisible": {
        transform: "scale(0) translate(-50%, 50%)"
      }
    },
    /* Pseudo-class to the badge `span` element if `invisible={true}`. */
    invisible: {
      transition: e.transitions.create("transform", {
        easing: e.transitions.easing.easeInOut,
        duration: e.transitions.duration.leavingScreen
      })
    }
  };
}, aa = /* @__PURE__ */ U.forwardRef(function(e, i) {
  var r = e.anchorOrigin, l = r === void 0 ? {
    vertical: "top",
    horizontal: "right"
  } : r, g = e.badgeContent, N = e.children, s = e.classes, C = e.className, d = e.color, p = d === void 0 ? "default" : d, u = e.component, o = u === void 0 ? "span" : u, Y = e.invisible, O = e.max, B = O === void 0 ? 99 : O, y = e.overlap, P = y === void 0 ? "rectangle" : y, h = e.showZero, E = h === void 0 ? !1 : h, $ = e.variant, j = $ === void 0 ? "standard" : $, M = na(e, ["anchorOrigin", "badgeContent", "children", "classes", "className", "color", "component", "invisible", "max", "overlap", "showZero", "variant"]), T = Y;
  Y == null && (g === 0 && !E || g == null && j !== "dot") && (T = !0);
  var R = "";
  return j !== "dot" && (R = g > B ? "".concat(B, "+") : g), /* @__PURE__ */ U.createElement(o, ra({
    className: J(s.root, C),
    ref: i
  }, M), N, /* @__PURE__ */ U.createElement("span", {
    className: J(s.badge, s["".concat(l.horizontal).concat(_(l.vertical), "}")], s["anchorOrigin".concat(_(l.vertical)).concat(_(l.horizontal)).concat(_(P))], p !== "default" && s["color".concat(_(p))], T && s.invisible, j === "dot" && s.dot)
  }, R));
});
process.env.NODE_ENV !== "production" && (aa.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The anchor of the badge.
   */
  anchorOrigin: x.shape({
    horizontal: x.oneOf(["left", "right"]).isRequired,
    vertical: x.oneOf(["bottom", "top"]).isRequired
  }),
  /**
   * The content rendered within the badge.
   */
  badgeContent: x.node,
  /**
   * The badge will be added relative to this node.
   */
  children: x.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: Q(x.object, function(n) {
    var e = n.classes;
    return e == null || [["anchorOriginTopRightRectangle", "anchorOriginTopRightRectangular"], ["anchorOriginBottomRightRectangle", "anchorOriginBottomRightRectangular"], ["anchorOriginTopLeftRectangle", "anchorOriginTopLeftRectangular"], ["anchorOriginBottomLeftRectangle", "anchorOriginBottomLeftRectangular"], ["anchorOriginTopRightCircle", "anchorOriginTopRightCircular"], ["anchorOriginBottomRightCircle", "anchorOriginBottomRightCircular"], ["anchorOriginTopLeftCircle", "anchorOriginTopLeftCircular"]].forEach(function(i) {
      var r = sa(i, 2), l = r[0], g = r[1];
      if (e[l] != null && // 2 classnames? one from withStyles the other must be custom
      e[l].split(" ").length > 1)
        throw new Error("Material-UI: The `".concat(l, "` class was deprecated. Use `").concat(g, "` instead."));
    }), null;
  }),
  /**
   * @ignore
   */
  className: x.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: x.oneOf(["default", "error", "primary", "secondary"]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: x.elementType,
  /**
   * If `true`, the badge will be invisible.
   */
  invisible: x.bool,
  /**
   * Max count to show.
   */
  max: x.number,
  /**
   * Wrapped shape the badge should overlap.
   */
  overlap: Q(x.oneOf(["circle", "rectangle", "circular", "rectangular"]), function(n) {
    var e = n.overlap, i = e === void 0 ? "rectangle" : e;
    if (i === "rectangle")
      throw new Error('Material-UI: `overlap="rectangle"` was deprecated. Use `overlap="rectangular"` instead.');
    if (i === "circle")
      throw new Error('Material-UI: `overlap="circle"` was deprecated. Use `overlap="circular"` instead.');
    return null;
  }),
  /**
   * Controls whether the badge is hidden when `badgeContent` is zero.
   */
  showZero: x.bool,
  /**
   * The variant to use.
   */
  variant: x.oneOf(["dot", "standard"])
});
const xa = ta(va, {
  name: "MuiBadge"
})(aa), ja = (n, e, i) => async () => {
  try {
    let { data: r } = await ia(n, e, i);
    return r.success, r;
  } catch (r) {
    return {
      success: !1,
      message: r.response.data.message ? r.response.data.message : "Failed To Fetch :SomeThing Went Wrong"
    };
  }
}, Da = ({
  MasjidEventsData: n,
  EventDays: e,
  CurrentMonthEventDays: i,
  setCancelledEvents: r,
  setViewWingCancelledEvents: l,
  ViewWingCancelledEvents: g,
  SetCurrentDayEvents: N,
  setCurrentMonthEventDays: s,
  setMasjidEventsData: C,
  setEventDays: d
}) => {
  const [p, u] = m(), [o, Y] = m(), [O, B] = m(/* @__PURE__ */ new Date()), y = H(), P = oa();
  S((t) => t.latestAdminEvents);
  const [h, E] = m([]), [$, j] = m(!1);
  S((t) => t.AdminMasjid);
  let M = S((t) => t.admin);
  z(() => {
    let t = M.masjids[0];
    u(t);
  }, [p]), z(() => {
    M.masjids[0] && P(ma(M.masjids[0])).then((f) => {
      f.message === "Success" && Y(f.data);
    });
  }, [p]);
  const T = (t) => {
    const f = w(t).startOf("month").format("YYYY-MM-DD"), c = w(t).endOf("month").format("YYYY-MM-DD");
    P(
      X(f, c, (o == null ? void 0 : o._id) ?? "")
    ).then((b) => {
      if (b.data.length > 0) {
        let A = [], I = [];
        const K = w(t).format("YYYY-MM-DD") + "T00:00:00.000Z";
        let G = [];
        b.data.map((L) => {
          L.timings.map((F) => {
            let V = new Date(F.startTime), W = new Date(F.endTime);
            if ((V.toISOString() === K || W.toISOString() === K) && G.push(L), !I.includes(F.startTime, F.endTime)) {
              let ea = {
                date: F.startTime,
                end: F.endTime,
                id: L._id
              };
              I.push(ea);
            }
            (!A.includes(V.getDate()) || !A.includes(W.getDate())) && (A.push(V.getDate()), A.push(W.getDate()));
          }), N(G), s(A);
        }), d(I), C(b.data);
      } else
        C([]), s([]), s([]);
    }), P(
      ja("updatedAt", "desc", (o == null ? void 0 : o._id) ?? "")
    ).then((b) => {
      b.success ? r(b.data) : r([]);
    });
  }, R = (t) => {
    y("/eventprofile/" + t._id);
  };
  return z(() => {
    if ((n == null ? void 0 : n.status) === 200) {
      let t = w(O).format("YYYY-MM-DD") + "T00:00:00.000Z", f = [];
      f = e.filter((v, D) => v.date === t || v.end === t);
      let c = [];
      if (f.length > 0)
        for (let v of f)
          c.push(
            n.data.data.filter(
              (D) => D._id === v.id
            )
          );
      E(c), (h == null ? void 0 : h.length) > 0 ? j(!0) : j(!1);
    }
  }, [e, n, O]), /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    /* @__PURE__ */ a.jsxs("div", { className: "TopContainerForBackAndView", children: [
      /* @__PURE__ */ a.jsx("div", { className: "MazjidBackToMainPage", children: /* @__PURE__ */ a.jsx(la, { to: "/feed", style: { textDecoration: "none", color: "white" }, children: /* @__PURE__ */ a.jsx(
        "img",
        {
          src: ga,
          alt: "Profile Icon",
          className: "BackBtnToHome"
        }
      ) }) }),
      /* @__PURE__ */ a.jsx(
        "div",
        {
          className: "ViewFullEventsForMain",
          onClick: (t) => {
            l(!g);
          },
          children: /* @__PURE__ */ a.jsx("span", { className: "FeedTimingsTitleViewAll", children: "View Full Events" })
        }
      )
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "MasjidEventsContainerBottom", children: [
      /* @__PURE__ */ a.jsxs("div", { className: "MasjidEventsCarouselContainer", children: [
        /* @__PURE__ */ a.jsx("span", { className: "EventsPageTitle", children: "Upcoming Events" }),
        /* @__PURE__ */ a.jsx("span", { className: "CurrentTimings", children: w(O).format("Do MMM,YYYY") }),
        /* @__PURE__ */ a.jsx("div", { className: "EventCard", children: (h == null ? void 0 : h.length) > 0 ? h == null ? void 0 : h.map((t) => {
          var f, c, v, D, b;
          return /* @__PURE__ */ a.jsx(a.Fragment, { children: /* @__PURE__ */ a.jsxs(
            "div",
            {
              className: "EventCarouselCard",
              onClick: (A) => {
                R(t);
              },
              children: [
                /* @__PURE__ */ a.jsx("div", { className: "PhotosofMazjid", children: ((f = o == null ? void 0 : o.masjidPhotos) == null ? void 0 : f.length) > 0 && ((c = o == null ? void 0 : o.masjidPhotos[0]) != null && c.url) ? /* @__PURE__ */ a.jsx(a.Fragment, { children: /* @__PURE__ */ a.jsx("span", { className: "MazjidPhoto" }) }) : /* @__PURE__ */ a.jsx(a.Fragment, { children: /* @__PURE__ */ a.jsx("span", { className: "MazjidPhoto" }) }) }),
                /* @__PURE__ */ a.jsxs("div", { className: "NameofMazjidandEvent", children: [
                  /* @__PURE__ */ a.jsx("span", { className: "EventCarouselCardTitle", children: t.eventName }),
                  /* @__PURE__ */ a.jsx("span", { className: "MazjidStartDate", children: w((v = t == null ? void 0 : t.metaData) == null ? void 0 : v.startDate).format(
                    "DD-MM-YYYY"
                  ) })
                ] }),
                /* @__PURE__ */ a.jsxs("div", { className: "MazjidnameAndTime", children: [
                  /* @__PURE__ */ a.jsxs("span", { className: "EventCarouselCardTime", children: [
                    w((D = t == null ? void 0 : t.timings[0]) == null ? void 0 : D.startTime).format(
                      "hh:mm A"
                    ),
                    " ",
                    "-",
                    " ",
                    w((b = t == null ? void 0 : t.timings[0]) == null ? void 0 : b.endTime).format("hh:mm A")
                  ] }),
                  /* @__PURE__ */ a.jsx("span", { className: "mazjidName", children: o == null ? void 0 : o.masjidName })
                ] })
              ]
            }
          ) });
        }) : /* @__PURE__ */ a.jsx(a.Fragment, { children: /* @__PURE__ */ a.jsx("div", { className: "NoEventsAvailable", children: /* @__PURE__ */ a.jsx("img", { src: ha, className: "NoEventAvaliable" }) }) }) })
      ] }),
      /* @__PURE__ */ a.jsx("div", { className: "EventPageLeftContainer", children: /* @__PURE__ */ a.jsx(
        da,
        {
          autoOk: !0,
          orientation: "landscape",
          variant: "static",
          openTo: "date",
          format: "dd/MM/yyyy",
          minDate: /* @__PURE__ */ new Date(),
          label: "Event Start Date ",
          value: O,
          onChange: B,
          onMonthChange: T,
          renderDay: (t, f, c, v) => {
            const D = c && t && (i == null ? void 0 : i.includes(t == null ? void 0 : t.getDate()));
            return /* @__PURE__ */ a.jsx(
              xa,
              {
                overlap: "circle",
                badgeContent: D && /* @__PURE__ */ a.jsx(
                  "div",
                  {
                    style: {
                      height: "5px",
                      width: "5px",
                      borderRadius: "100%",
                      background: "green"
                    }
                  }
                ),
                children: v
              },
              t == null ? void 0 : t.toString()
            );
          }
        }
      ) })
    ] })
  ] });
};
function Ca(n, e) {
  const [i, r] = m(1), l = Math.ceil(n.length / e);
  function g() {
    const d = (i - 1) * e, p = d + e;
    return n.slice(d, p);
  }
  function N() {
    r((d) => Math.min(d + 1, l));
  }
  function s() {
    r((d) => Math.max(d - 1, 1));
  }
  function C(d) {
    const p = Math.max(1, d);
    r((u) => Math.min(p, l));
  }
  return { next: N, prev: s, jump: C, currentData: g, currentPage: i, maxPage: l };
}
const ba = ({
  CancelledEvents: n,
  setViewWingCancelledEvents: e,
  MasjidEventsData: i
}) => {
  var g, N;
  const r = H();
  m(1);
  const l = 8;
  return Math.ceil((n == null ? void 0 : n.length) / l), Ca(n, l), /* @__PURE__ */ a.jsx(a.Fragment, { children: /* @__PURE__ */ a.jsxs("div", { className: "MasjidEventsContainerBottomForViewall", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "MasjidEventsPageBottomTopContainer", children: [
      /* @__PURE__ */ a.jsx("div", { className: "EventsBottomTitleLeft", children: /* @__PURE__ */ a.jsx("span", { className: "EventsPageTitle", children: "Events" }) }),
      /* @__PURE__ */ a.jsx("div", { className: "BackButtonForMain", children: /* @__PURE__ */ a.jsx(
        "button",
        {
          onClick: (s) => {
            e(!n);
          },
          children: /* @__PURE__ */ a.jsx("img", { src: ua, className: "EventCancelBtn" })
        }
      ) })
    ] }),
    /* @__PURE__ */ a.jsx("div", { className: "MainContainerfoeViewall", children: (N = (g = i == null ? void 0 : i.data) == null ? void 0 : g.data) == null ? void 0 : N.map((s, C) => {
      var p;
      console.log(s._id), k((p = s == null ? void 0 : s.metaData) == null ? void 0 : p.startDate).format("DD MMM[,] YYYY");
      let d = s.timings.map((u) => u == null ? void 0 : u.endTime);
      return k(d).format("h:mm:ss"), /* @__PURE__ */ a.jsxs("div", { className: "MasjidEventsCarouselContainerForViewAll", children: [
        /* @__PURE__ */ a.jsx("div", { className: "PhotoForViewall", children: /* @__PURE__ */ a.jsx("img", { src: pa, className: "EventImage" }) }),
        /* @__PURE__ */ a.jsx("div", { className: "Eventname", children: s.eventName }),
        /* @__PURE__ */ a.jsx("div", { className: "date", children: "02 Feb, 2023 | 02:07 PM to 03:00 PM" }),
        /* @__PURE__ */ a.jsxs("div", { className: "DescriptionViewall", children: [
          s.description.substr(0, 160),
          "..."
        ] }),
        /* @__PURE__ */ a.jsx("div", { className: "buttonContainerViewall", children: /* @__PURE__ */ a.jsx("button", { className: "buttonViewall", onClick: (u) => {
          r("/eventprofile/" + s._id);
        }, children: "ReadMore" }) })
      ] });
    }) }),
    /* @__PURE__ */ a.jsx("div", { className: "CancelledEventsPaginationComponnet" })
  ] }) });
}, Fa = () => {
  let n = S((j) => j.admin);
  const [e, i] = m(!1), [r, l] = m(!1), [g, N] = m([]);
  m([]), H();
  const s = ca(), C = /* @__PURE__ */ new Date(), d = k(C).startOf("month").format("YYYY-MM-DD"), p = k(C).endOf("month").format("YYYY-MM-DD"), [u, o] = m(), [Y, O] = m(
    []
  ), [B, y] = m([]), [P, h] = m([]), [E, $] = m();
  return z(() => {
    let j = n.masjids[0];
    $(j);
  }, [E, n]), z(() => {
    E && (console.log(E), s(
      X(d, p, E)
    ).then((M) => {
      if (M.status === 200) {
        let T = [], R = [];
        const t = k(C).format("YYYY-MM-DD") + "T00:00:00.000Z";
        let f = [];
        M.data.data.map((c) => {
          let v, D;
          if ((c.metaData.startDate === t || c.metaData.endDate === t) && f.push(c), v = new Date(c.metaData.startDate), D = new Date(c.metaData.endDate), !R.includes(
            c.metaData.startDate,
            c.metaData.endDate
          )) {
            let b = {
              date: c.metaData.startDate,
              end: c.metaData.endDate,
              id: c._id
            };
            R.push(b);
          }
          (!T.includes(v.getDate()) || !T.includes(D.getDate())) && (T.push(v.getDate()), T.push(D.getDate())), h(f), O(T);
        }), y(R), o(M);
      } else
        o(void 0);
    }));
  }, [E]), /* @__PURE__ */ a.jsx(a.Fragment, { children: /* @__PURE__ */ a.jsx("div", { className: "MasjidEventsContainer", children: /* @__PURE__ */ a.jsx("div", { className: "MasjidEventParentContainer", children: /* @__PURE__ */ a.jsxs("div", { className: "MasjidEventsPageBottomContainer", children: [
    r ? /* @__PURE__ */ a.jsx(
      ba,
      {
        CancelledEvents: g,
        setViewWingCancelledEvents: l,
        MasjidEventsData: u
      }
    ) : /* @__PURE__ */ a.jsx(
      Da,
      {
        MasjidEventsData: u,
        EventDays: B,
        CurrentMonthEventDays: Y,
        setViewWingCancelledEvents: l,
        ViewWingCancelledEvents: r,
        setCancelledEvents: N,
        SetCurrentDayEvents: h,
        setCurrentMonthEventDays: O,
        setEventDays: y,
        setMasjidEventsData: o
      }
    ),
    e ? /* @__PURE__ */ a.jsx("div", { className: "AddingEventPopup", children: /* @__PURE__ */ a.jsx(
      fa,
      {
        ComponentPurpose: "Add",
        setAddingEvent: i,
        AddingEvent: e,
        EventDetails: u
      }
    ) }) : null,
    r ? "" : /* @__PURE__ */ a.jsx("div", { className: "MasjidEventsContainerAddSection", children: /* @__PURE__ */ a.jsx(
      "button",
      {
        className: "MasjidAddEventContainer",
        onClick: (j) => {
          i(!0);
        },
        children: /* @__PURE__ */ a.jsx("span", { className: "MasjidAddEventSentence", children: "Add Events" })
      }
    ) })
  ] }) }) }) });
};
export {
  Fa as default
};

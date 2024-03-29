import { ap as w, y as e, ag as N, bx as X, X as m, bd as L, Y as b } from "./index-XkptO5g9.mjs";
import { useRef as y, useState as i, useEffect as O } from "react";
import { a as z } from "./index.esm-dKdnsyf6.mjs";
import { T, F as P } from "./Dashboard-wU64Oe5M.mjs";
import "react-dom";
import "./swiper-bundle-HqgJZv8V.mjs";
const v = "data:image/png;base64,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", k = "data:image/png;base64,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", U = () => {
  let o = y(null), s = y(null);
  const [l, r] = i(!1), [x, t] = i(!1), [g, n] = i(!1), [d, u] = i(!1), p = w(), [I, F] = i(!1), B = () => {
    n(!0), setTimeout(() => {
      var A, a, c, h, D, f, C;
      if ((A = o.current) != null && A.value ? (a = o.current) != null && a.value && (r(!1), u(!1)) : (r(!0), u(!1)), (c = s.current) != null && c.value ? (h = s.current) != null && h.value && t(!1) : t(!0), (D = o.current) != null && D.value && ((f = s.current) != null && f.value)) {
        let S = {
          title: (C = o.current) == null ? void 0 : C.value,
          body: s.current.value
        };
        p(T(S)).then(function(j) {
          j.message === "Notification sent successfully" ? (F(!0), n(!1), u(!1), m(
            !0,
            "success",
            "Announcement Sent SuccessFully",
            p
          ), n(!1)) : (m(
            !0,
            "error",
            `Failed to Send the Announcement : ${j.message}`,
            p
          ), n(!1));
        });
      }
    }, 2e3);
  }, H = () => {
    u(!0), n(!1);
  };
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsxs("div", { className: "MazjidAnnoucementMainContainer", children: [
      /* @__PURE__ */ e.jsx("div", { className: "MasjidAnnounceImageContainer", children: /* @__PURE__ */ e.jsx("img", { src: v, alt: "", className: "ANnounceLogoTop" }) }),
      /* @__PURE__ */ e.jsx("span", { className: "TopDescription", children: "Fill in the Title and Body of the annoucement and press send. People will recieve a notification on their phones" }),
      /* @__PURE__ */ e.jsx(
        N,
        {
          autoFocus: !0,
          margin: "dense",
          className: "TextFieldsAnnoucement",
          autoComplete: "Off",
          error: l,
          helperText: l ? "Please Fill The title" : " ",
          label: "Title",
          onChange: (A) => {
            var a, c;
            l && ((a = o.current) != null && a.value ? (c = o.current) != null && c.value && r(!1) : r(!0));
          },
          size: "small",
          sx: {
            "& .MuiTextField-root": {
              width: 100
            },
            "& .MuiInputLabel-root": {
              fontSize: 14,
              fontFamily: "lato",
              fontWeight: 500
            },
            "& .MuiInputBase-colorPrimary": {
              color: "green"
            }
          },
          inputRef: o,
          type: "text",
          fullWidth: !0,
          variant: "outlined",
          inputProps: { style: { color: "green" } }
        }
      ),
      /* @__PURE__ */ e.jsx(
        N,
        {
          id: "outlined-required",
          error: x,
          helperText: x ? "Please Fill what you want to Announce" : " ",
          variant: "outlined",
          className: "TextFieldsAnnoucement",
          autoComplete: "Off",
          onChange: (A) => {
            var a, c;
            x && ((a = s.current) != null && a.value ? (c = s.current) != null && c.value && t(!1) : t(!0));
          },
          label: "Announcement Body",
          fullWidth: !0,
          inputRef: s,
          type: "email",
          sx: {
            "& .MuiTextField-root": {
              width: 100
            },
            "& .MuiInputLabel-root": {
              fontSize: 14,
              fontFamily: "lato",
              fontWeight: 500
            },
            "& .MuiInputBase-colorPrimary": {
              color: "green"
            }
          },
          multiline: !0,
          rows: 13
        }
      ),
      /* @__PURE__ */ e.jsx("button", { className: "ButtonToggle", onClick: H, children: "Triggering Announcement" })
    ] }),
    d ? /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx("div", { className: "CenterTheBody", children: /* @__PURE__ */ e.jsx("div", { className: "BackgroundOfContainer", children: /* @__PURE__ */ e.jsxs("div", { className: "PopupBoddy", children: [
      /* @__PURE__ */ e.jsx("div", { className: "PopupImgForAnnounce", children: /* @__PURE__ */ e.jsx(
        "img",
        {
          src: k,
          className: "InsidePopupImgForAnnounce"
        }
      ) }),
      /* @__PURE__ */ e.jsx("span", { className: "DescrpitionForTrigger", children: `"By posting, you take full responsibility for the content of your post and agree to comply with ConnectMazjid's terms and conditions and privacy policy. ConnectMazjid reserves the right to remove any inappropriate content."` }),
      /* @__PURE__ */ e.jsxs("div", { className: "ButtonAdjusment", children: [
        /* @__PURE__ */ e.jsx("button", { className: "Cancel", onClick: (A) => u(!1), children: "No" }),
        /* @__PURE__ */ e.jsx(
          "button",
          {
            className: "YesButton",
            onClick: B,
            children: /* @__PURE__ */ e.jsx("span", { className: "text", children: g ? /* @__PURE__ */ e.jsx(X, { size: "20px", color: "inherit" }) : "Yes" })
          }
        )
      ] })
    ] }) }) }) }) : "",
    I ? /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx("div", { className: "CenterTheBody", children: /* @__PURE__ */ e.jsx("div", { className: "BackgroundOfContainerClose", children: /* @__PURE__ */ e.jsxs("div", { className: "PopupBoddyForClose", children: [
      /* @__PURE__ */ e.jsx("div", { className: "PopupImgForAnnounceClose", children: /* @__PURE__ */ e.jsx(
        "img",
        {
          src: v,
          className: "InsidePopupImgForAnnounceClose"
        }
      ) }),
      /* @__PURE__ */ e.jsx("span", { className: "DescrpitionForTriggerClose", children: "Annoucement Saved Successfully" }),
      /* @__PURE__ */ e.jsx("span", { className: "closeForTrigger", children: /* @__PURE__ */ e.jsx(
        "button",
        {
          onClick: (A) => {
            F(!1);
          },
          children: "Close"
        }
      ) })
    ] }) }) }) }) : ""
  ] });
}, R = () => {
  const o = L(), [s, l] = i([]), [r, x] = i(/* @__PURE__ */ new Date()), [t, g] = i(!1);
  return O(() => {
    r && o(P()).then((d) => {
      d.success ? l(d.data.data) : m(
        !0,
        "error",
        "Failed To Fetch:Something Went Wrong",
        o
      );
    });
  }, [r]), /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsxs("div", { className: "AnnounceHistoryContianer", children: [
    /* @__PURE__ */ e.jsx("div", { className: "AnnounceHistoryTopContainer", children: /* @__PURE__ */ e.jsx("div", { className: "AnnounceHistoryTitle", children: /* @__PURE__ */ e.jsx("span", { className: "AnnounceHistory", children: "History" }) }) }),
    /* @__PURE__ */ e.jsx("div", { className: "AnnounceHistoryBottomContainer", children: (s == null ? void 0 : s.length) > 0 ? /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx("div", { className: "Annoucementbody", children: s == null ? void 0 : s.map((n) => {
      var d;
      return /* @__PURE__ */ e.jsxs(
        "div",
        {
          className: "AnnoucementInnerBody",
          onClick: (u) => {
            g(!t);
          },
          children: [
            /* @__PURE__ */ e.jsx("div", { className: "AnnoucementTItle", children: n == null ? void 0 : n.title }),
            /* @__PURE__ */ e.jsx("div", { className: "AnnoucementBody", children: (n == null ? void 0 : n.body.length) > 20 ? /* @__PURE__ */ e.jsx(e.Fragment, { children: n == null ? void 0 : n.body }) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              (d = n == null ? void 0 : n.body) == null ? void 0 : d.substr(0, 20),
              "..."
            ] }) }),
            /* @__PURE__ */ e.jsxs("div", { className: "AnnoucementTItle", children: [
              "Sent Date :",
              b(n == null ? void 0 : n.createdAt).startOf("month").format("Do-MMM-YYYY")
            ] }),
            t ? /* @__PURE__ */ e.jsx("div", { className: "PopUpannoucement", children: /* @__PURE__ */ e.jsx("div", { className: "PopupBodyAnnounce", children: /* @__PURE__ */ e.jsxs("div", { className: "insidePopup", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "topAnnounceComponent", children: [
                /* @__PURE__ */ e.jsx("div", { className: "MessageType", children: "NormalMessage" }),
                /* @__PURE__ */ e.jsx("div", { className: "AnnounceCanel", children: /* @__PURE__ */ e.jsx(
                  "button",
                  {
                    onClick: (u) => {
                      g(!t);
                    },
                    className: "AnnounceBtn",
                    children: "X"
                  }
                ) })
              ] }),
              /* @__PURE__ */ e.jsx("div", { className: "TitleAnnouce", children: n == null ? void 0 : n.title }),
              /* @__PURE__ */ e.jsx("div", { className: "DescriptionAnnouce", children: n == null ? void 0 : n.body })
            ] }) }) }) : ""
          ]
        }
      );
    }) }) }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx("div", { className: "AnnouncementHistoryPlaceholder", children: /* @__PURE__ */ e.jsx("span", { className: "AnnouncementPlaceholder", children: "No Announcement Yet!" }) }) }) })
  ] }) });
}, E = () => {
  const [o, s] = i(!1);
  return /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx("div", { className: "MasjidAnnouceContainer", children: /* @__PURE__ */ e.jsxs("div", { className: "MasjidAnnounceContainer", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "MasjidAnnounceTopContainer", children: [
      /* @__PURE__ */ e.jsx("div", { className: "MasjidAnnounceTopMainContainer" }),
      /* @__PURE__ */ e.jsx("div", { className: "MasjidAnnounceTopRightContainer" })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "MasjidAnnouceBottomContainer", children: o ? /* @__PURE__ */ e.jsx(R, {}) : /* @__PURE__ */ e.jsx(U, {}) }),
    /* @__PURE__ */ e.jsx("div", { className: "MasjidAnnouncementHistoryContainer", children: o ? /* @__PURE__ */ e.jsx(
      z,
      {
        className: "EditAnnounceCancelIcon",
        onClick: (l) => {
          s(!1);
        }
      }
    ) : /* @__PURE__ */ e.jsx(
      "button",
      {
        className: "MasjdAnnouncementHistoryBtn",
        onClick: (l) => s(!0),
        children: "History"
      }
    ) })
  ] }) }) });
};
export {
  E as default
};

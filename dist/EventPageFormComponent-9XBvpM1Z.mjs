import { bD as ca, bE as ua, i as ne, _ as da, a2 as ma, a3 as pa, y as e, a1 as Ve, bF as ha, ad as le, by as fa, ao as Le, bd as ga, aJ as va, X as _, ag as ie, aT as xa, bG as ba, aU as ja, aV as oe, bx as ya, ba as Ye } from "./index-XkptO5g9.mjs";
import { createElement as C, useCallback as Ta, useState as o, useEffect as $e, useRef as J } from "react";
import { f as Ca, D as Re, _ as Ee, U as Ma, h as Na } from "./Dashboard-wU64Oe5M.mjs";
import { u as ue, P as Sa, a as V, T as q, C as $, b as Ie, g as ka, c as Da, d as Ae, t as Pa, e as Oa, f as Fa, K as wa, h as La, p as Ya, D as Be, m as w } from "./DatePicker-8NDaDOhh.mjs";
import { a as Ra } from "./index.esm-dKdnsyf6.mjs";
var Ea = ca({
  toolbarLandscape: {
    flexWrap: "wrap"
  },
  toolbarAmpmLeftPadding: {
    paddingLeft: 50
  },
  separator: {
    margin: "0 4px 0 2px",
    cursor: "default"
  },
  hourMinuteLabel: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  hourMinuteLabelAmpmLandscape: {
    marginTop: "auto"
  },
  hourMinuteLabelReverse: {
    flexDirection: "row-reverse"
  },
  ampmSelection: {
    marginLeft: 20,
    marginRight: -20,
    display: "flex",
    flexDirection: "column"
  },
  ampmLandscape: {
    margin: "4px 0 auto",
    flexDirection: "row",
    justifyContent: "space-around",
    flexBasis: "100%"
  },
  ampmSelectionWithSeconds: {
    marginLeft: 15,
    marginRight: 10
  },
  ampmLabel: {
    fontSize: 18
  }
}, {
  name: "MuiPickersTimePickerToolbar"
});
function Ia(s, a, t) {
  var i = ue(), m = ka(s, i), c = Ta(function(b) {
    var g = Da(s, b, !!a, i);
    t(g, !1);
  }, [a, s, t, i]);
  return {
    meridiemMode: m,
    handleMeridiemChange: c
  };
}
var Ue = function(a) {
  var t = a.date, i = a.views, m = a.ampm, c = a.openView, b = a.onChange, g = a.isLandscape, u = a.setOpenView, j = ue(), L = ua(), h = Ea(), M = Ia(t, m, b), v = M.meridiemMode, I = M.handleMeridiemChange, Y = g ? "h3" : "h2";
  return C(Sa, {
    isLandscape: g,
    className: ne(g ? h.toolbarLandscape : m && h.toolbarAmpmLeftPadding)
  }, C("div", {
    className: ne(h.hourMinuteLabel, m && g && h.hourMinuteLabelAmpmLandscape, {
      rtl: h.hourMinuteLabelReverse
    }[L.direction])
  }, V(i, "hours") && C(q, {
    variant: Y,
    onClick: function() {
      return u($.HOURS);
    },
    selected: c === $.HOURS,
    label: j.getHourText(t, !!m)
  }), V(i, ["hours", "minutes"]) && C(Ie, {
    label: ":",
    variant: Y,
    selected: !1,
    className: h.separator
  }), V(i, "minutes") && C(q, {
    variant: Y,
    onClick: function() {
      return u($.MINUTES);
    },
    selected: c === $.MINUTES,
    label: j.getMinuteText(t)
  }), V(i, ["minutes", "seconds"]) && C(Ie, {
    variant: "h2",
    label: ":",
    selected: !1,
    className: h.separator
  }), V(i, "seconds") && C(q, {
    variant: "h2",
    onClick: function() {
      return u($.SECONDS);
    },
    selected: c === $.SECONDS,
    label: j.getSecondText(t)
  })), m && C("div", {
    className: ne(h.ampmSelection, g && h.ampmLandscape, V(i, "seconds") && h.ampmSelectionWithSeconds)
  }, C(q, {
    disableRipple: !0,
    variant: "subtitle1",
    selected: v === "am",
    typographyClassName: h.ampmLabel,
    label: j.getMeridiemText("am"),
    onClick: function() {
      return I("am");
    }
  }), C(q, {
    disableRipple: !0,
    variant: "subtitle1",
    selected: v === "pm",
    typographyClassName: h.ampmLabel,
    label: j.getMeridiemText("pm"),
    onClick: function() {
      return I("pm");
    }
  })));
};
function ze(s, a) {
  var t = Object.keys(s);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(s);
    a && (i = i.filter(function(m) {
      return Object.getOwnPropertyDescriptor(s, m).enumerable;
    })), t.push.apply(t, i);
  }
  return t;
}
function Ba(s) {
  for (var a = 1; a < arguments.length; a++) {
    var t = arguments[a] != null ? arguments[a] : {};
    a % 2 ? ze(t, !0).forEach(function(i) {
      da(s, i, t[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(s, Object.getOwnPropertyDescriptors(t)) : ze(t).forEach(function(i) {
      Object.defineProperty(s, i, Object.getOwnPropertyDescriptor(t, i));
    });
  }
  return s;
}
var We = Ba({}, Pa, {
  openTo: "hours",
  views: ["hours", "minutes"]
});
function He(s) {
  var a = ue();
  return {
    getDefaultFormat: function() {
      return Ya(s.format, s.ampm, {
        "12h": a.time12hFormat,
        "24h": a.time24hFormat
      });
    }
  };
}
var ce = Ae({
  useOptions: He,
  Input: Oa,
  useState: Fa,
  DefaultToolbarComponent: Ue
}), za = Ae({
  useOptions: He,
  Input: wa,
  useState: La,
  DefaultToolbarComponent: Ue,
  getCustomProps: function(a) {
    return {
      refuse: a.ampm ? /[^\dap]+/gi : /[^\d]+/gi
    };
  }
});
ce.defaultProps = We;
za.defaultProps = We;
var de = {}, _a = pa;
Object.defineProperty(de, "__esModule", {
  value: !0
});
var Je = de.default = void 0, Va = _a(ma()), _e = e, $a = (0, Va.default)([/* @__PURE__ */ (0, _e.jsx)("circle", {
  cx: "12",
  cy: "12",
  r: "3.2"
}, "0"), /* @__PURE__ */ (0, _e.jsx)("path", {
  d: "M9 2 7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"
}, "1")], "PhotoCamera");
Je = de.default = $a;
const Aa = Ve.create({
  baseURL: "https://squid-app-7wo7y.ondigitalocean.app/api/"
});
Aa.interceptors.request.use(
  async (s) => {
    if (localStorage.getItem("authTokens")) {
      const a = localStorage.getItem("authTokens"), t = a ? JSON.parse(a) : null;
      t != null && t.accessToken ? s.headers.Authorization = `Bearer ${t == null ? void 0 : t.accessToken}` : s.headers.Authorization = `Bearer ${t == null ? void 0 : t.token}`;
    }
    return s;
  },
  (s) => Promise.reject(s)
);
const Ua = ({
  EventId: s,
  MasjidId: a,
  eventPhotos: t,
  setEventsPhotos: i,
  DraggedImage: m,
  UploadAllow: c,
  setEventUploadPhoto: b,
  setMasjidUploadPhoto: g
}) => {
  const [u, j] = o(!0), [L, h] = o(!1), [M, v] = o();
  ha();
  const [I, Y] = o({ uploadPercentage: 0 }), [R, A] = o(!1);
  $e(() => {
    v(m), g(m), b(m);
  }, [m]);
  const U = (p) => {
    const d = p.target;
    d.files && d.files.length > 0 && (v(d.files[0]), g(d.files[0]), b(d.files[0]), j(!u));
  }, B = () => {
    v(void 0), g(void 0), b(void 0), j(!u);
  }, W = async (p) => {
    const d = p, y = "myFile.jpeg";
    fetch(d).then(async (T) => {
      const K = T.headers.get("content-type") ?? "", X = await T.blob(), D = new File(
        [X],
        y,
        {
          type: K
        }
        // type: blob.type,
        // { contentType }
      );
      v(D), g(D), b(D), j(!u);
    });
  };
  function H(p) {
    return fetch(p).then((d) => d.blob()).then((d) => d.type.split("/")[0] === "image").catch(() => !1);
  }
  const G = (p) => {
    H(p).then((d) => {
      setTimeout(() => {
        d && W(p);
      }, 1e3);
    }).catch((d) => {
      console.log(d);
    });
  };
  return /* @__PURE__ */ e.jsx(e.Fragment, { children: u ? /* @__PURE__ */ e.jsx("div", { className: "file-card", children: /* @__PURE__ */ e.jsxs("div", { className: "file-inputs", children: [
    R ? /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsxs("div", { className: "PasteBoxForLink", children: [
      /* @__PURE__ */ e.jsx(
        "input",
        {
          type: "url",
          id: "url-field",
          disabled: c,
          pattern: "^https?://.*$",
          autoFocus: !0,
          className: "InputPasteLinkEvents",
          onChange: (p) => {
            G(p.target.value);
          }
        }
      ),
      " ",
      /* @__PURE__ */ e.jsx(
        fa,
        {
          className: "TextBoxRightIcon",
          onClick: (p) => A(!1)
        }
      )
    ] }) }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsxs("div", { className: "ImageUploadButtonsEvents", children: [
      /* @__PURE__ */ e.jsxs(
        le,
        {
          variant: "outlined",
          disabled: c,
          style: {
            marginBottom: "5px",
            marginTop: "5px",
            width: "70%",
            height: "40px",
            fontSize: "13px"
          },
          component: "label",
          startIcon: /* @__PURE__ */ e.jsx(Je, {}),
          onChange: (p) => U(p),
          children: [
            "Choose New Image",
            /* @__PURE__ */ e.jsx(
              "input",
              {
                hidden: !0,
                accept: "image/jpeg,image/png,image/jpg",
                type: "file"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ e.jsx("span", { className: "Separator", children: "OR" }),
      /* @__PURE__ */ e.jsx(
        le,
        {
          variant: "contained",
          disabled: c,
          style: {
            marginBottom: "5px",
            marginTop: "5px",
            width: "70%",
            height: "30px",
            fontSize: "10px"
          },
          component: "label",
          onClick: (p) => A(!0),
          children: "Paste Link"
        }
      )
    ] }) }),
    /* @__PURE__ */ e.jsx("div", { className: "ImageUploadBottomDetails", children: c ? /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsxs("p", { className: "info", children: [
      " ",
      "The Masjid has reached Maximum File Upload Limit"
    ] }) }) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      /* @__PURE__ */ e.jsx("p", { className: "main", children: "Supported files" }),
      /* @__PURE__ */ e.jsx("p", { className: "info", children: " JPG, PNG,JPEG less than 5MB" })
    ] }) })
  ] }) }) : M && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    " ",
    L && /* @__PURE__ */ e.jsxs("div", { className: "progressbar-container", children: [
      /* @__PURE__ */ e.jsx(
        "div",
        {
          className: "progressbar-complete",
          style: { width: `${I.uploadPercentage}%` },
          children: /* @__PURE__ */ e.jsx("div", { className: "progressbar-liquid" })
        }
      ),
      /* @__PURE__ */ e.jsxs("span", { className: "progress", children: [
        I.uploadPercentage,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "ImageContainer", children: /* @__PURE__ */ e.jsx("div", { className: "EventImagePreview", children: /* @__PURE__ */ e.jsx(
      "img",
      {
        src: URL.createObjectURL(M),
        className: "EventImage",
        alt: "Thumb"
      }
    ) }) }),
    /* @__PURE__ */ e.jsx("div", { className: "ImageButtons", children: /* @__PURE__ */ e.jsx(
      le,
      {
        variant: "outlined",
        onClick: B,
        className: "EventImageDelete",
        children: "Remove Image"
      }
    ) })
  ] }) });
}, Wa = (s) => async (a) => {
  try {
    a({ type: "COMPLETE_EVENT_EDITING", payload: s });
  } catch (t) {
    return {
      success: !1,
      message: t.response.data.message ? t.response.data.message : "Failed To Fetch Events : SomeThing Went Wrong"
    };
  }
}, Za = ({
  ComponentPurpose: s,
  EventDetails: a,
  setAddingEvent: t,
  AddingEvent: i,
  setEventDetails: m,
  setIsUpdating: c,
  setEventPhotos: b,
  EventPhotos: g
}) => {
  const [u, j] = o("None"), [L, h] = o(!1), [M, v] = o(!1), [I, Y] = o(!1), [R, A] = o(!1), [U, B] = o(!1), [W, H] = o(!1), [G, p] = o(!1);
  let d = J(null), y = J(null), T = J(null), K = J(null), X = J(null);
  const [D, qe] = o(/* @__PURE__ */ new Date()), [me, pe] = o(D), [Q, Ge] = o(/* @__PURE__ */ new Date()), [Z, he] = o(
    /* @__PURE__ */ new Date()
  ), [N, Ke] = o([]), [E, Xe] = o(), [Qe, Ha] = o(), [Ja, Ze] = o(), [ea, ee] = o(), [ae, aa] = o();
  let S = Le((r) => r.AdminMasjid);
  const x = ga(), [ta, P] = o(!1), fe = va(), te = Le((r) => r.admin);
  let k = te == null ? void 0 : te.masjids[0];
  console.log(k);
  const ra = (r) => {
    qe(r), pe(r);
  }, sa = (r) => {
    j(r), W && H(!1);
  }, ge = () => {
    x(Wa(!0));
  };
  $e(() => {
    k && x(Ca(k)).then((l) => {
      !l.timings === null ? _(
        !0,
        "error",
        `Failed To Fetch :${l.message}`,
        x
      ) : Ze(l.data);
    });
  }, [k]);
  const re = Ve.create({
    baseURL: "https://squid-app-7wo7y.ondigitalocean.app/api/"
  });
  re.interceptors.request.use(
    async (r) => {
      if (localStorage.getItem("authTokens")) {
        const l = localStorage.getItem("authTokens"), n = l ? JSON.parse(l) : null;
        n != null && n.accessToken ? r.headers.Authorization = `Bearer ${n == null ? void 0 : n.accessToken}` : r.headers.Authorization = `Bearer ${n == null ? void 0 : n.token}`;
      }
      return r;
    },
    (r) => Promise.reject(r)
  );
  const na = (r) => {
    if (r) {
      const l = new FormData();
      l.append("image", ea), re.post(`v1/media/${k}/upload/${r}`, l).then((n) => {
        setTimeout(() => {
          n.data.data._id, n.data.data.url, ge(), _(
            !0,
            "success",
            "Created Event SuccessFully",
            x
          ), t == null || t(!1), P(!1), fe("/eventprofile/" + r), ee(void 0);
        }, 3e3);
      }).catch((n) => {
        const O = {
          snackbarOpen: !0,
          snackbarType: "error",
          snackbarMessage: n.response.data ? n.response.data.message : "Adding Masjid Media Failed"
        };
        x(Ye(O));
      });
    }
  }, la = (r) => {
    if (r) {
      const l = new FormData();
      l.append("image", ae), re.post(`v1/media/${k}/upload/${r}`, l).then((n) => {
        let O = {
          _id: n.data.data._id,
          url: n.data.data.url
        };
        _(
          !0,
          "success",
          "Updated Event SuccessFully",
          x
        ), b([...g, O]), c == null || c(!1), P(!1), ee(void 0);
      }).catch((n) => {
        const O = {
          snackbarOpen: !0,
          snackbarType: "error",
          snackbarMessage: n.response.data ? n.response.data.message : "Adding Masjid Media Failed"
        };
        P(!1), c == null || c(!1), x(Ye(O));
      });
    }
  }, ia = () => {
    var n, O, ve, xe, be, je, ye, Te, Ce, Me, Ne, Se, ke, De, Pe, Oe, Fe;
    (n = d.current) != null && n.value ? (O = d.current) != null && O.value && h(!1) : h(!0), (ve = y.current) != null && ve.value ? (xe = y.current) != null && xe.value && B(!1) : B(!0), (be = T.current) != null && be.value ? (je = T.current) != null && je.value && v(!1) : v(!0), (ye = K.current) != null && ye.value ? (Te = K.current) != null && Te.value && Y(!1) : Y(!0), (Ce = X.current) != null && Ce.value ? (Me = X.current) != null && Me.value && A(!1) : A(!0), H(u === null || u === "");
    let r, l;
    if (u === "None")
      l = {
        startDate: w(D).format("YYYY-MM-DD"),
        endDate: w(me).format("YYYY-MM-DD"),
        recurrenceType: u
      };
    else if (u === "Daily")
      E.length > 0 ? l = [
        {
          startDate: E[0].format("YYYY-MM-DD"),
          endDate: E[1].format("YYYY-MM-DD"),
          recurrenceType: u
        }
      ] : p(!0);
    else if (N.length > 0) {
      let F = [];
      N.map((se, f) => {
        let z = {
          startDate: N[f].format("YYYY-MM-DD"),
          endDate: N[f].format("YYYY-MM-DD"),
          recurrenceType: u
        };
        F.push(z);
      }), l = [...F];
    } else
      p(!0);
    if (u === "None")
      r = [
        {
          startTime: w(Q).unix(),
          endTime: w(Z).unix()
        }
      ];
    else if (u === "Daily")
      (E == null ? void 0 : E.length) > 0 ? r = [
        {
          startTime: w(Q).unix(),
          endTime: w(Z).unix()
        }
      ] : p(!0);
    else if (N.length > 0) {
      let F = [];
      N.map((se, f) => {
        let z = {
          startDate: N[f].format("MM/DD/YYYY"),
          startTime: w(Q).unix(),
          endTime: w(Z).unix(),
          endDate: N[f].format("MM/DD/YYYY")
        };
        F.push(z);
      }), r = [...F];
    } else
      p(!0);
    if (((Ne = d.current) == null ? void 0 : Ne.value) !== (a == null ? void 0 : a.eventName) || ((Se = T.current) == null ? void 0 : Se.value) !== (a == null ? void 0 : a.address) || ((ke = y.current) == null ? void 0 : ke.value) !== (a == null ? void 0 : a.description) || (r == null ? void 0 : r.length) > 0) {
      let F = {
        eventName: ((De = d.current) == null ? void 0 : De.value) ?? "",
        address: ((Pe = T.current) == null ? void 0 : Pe.value) ?? "",
        mazjidName: S == null ? void 0 : S.masjidName,
        description: ((Oe = y.current) == null ? void 0 : Oe.value) ?? "",
        location: {
          coordinates: (Fe = S == null ? void 0 : S.location) == null ? void 0 : Fe.coordinates,
          type: "Point"
        },
        timings: r,
        metaData: l
      };
      G && p(!1), P(!0), s === "Update" ? x(
        Ma(F, k, (a == null ? void 0 : a._id) ?? "")
      ).then(function(f) {
        f.message === "Event updated successfully" ? ae instanceof File ? (la(f.data._id), m == null || m(f.data)) : (P(!1), c == null || c(!1), m == null || m(f.data)) : (P(!1), c == null || c(!1));
      }) : x(Na(F, k)).then(function(f) {
        var z, we;
        f.status === 201 ? ae instanceof File ? na(f.data.data._id) : (ge(), _(
          !0,
          "success",
          "Created Event SuccessFully",
          x
        ), t == null || t(!1), P(!1), fe("/eventprofile/" + ((we = (z = f == null ? void 0 : f.data) == null ? void 0 : z.data) == null ? void 0 : we._id))) : P(!1);
      });
    } else
      G ? _(!0, "error", "Please Choose Dates", x) : _(
        !0,
        "error",
        "Please Enter All The  Details",
        x
      );
  }, oa = (r) => {
    Ge(r), he(r);
  };
  return /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsxs("div", { className: "AddEventsFormContainer", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "CreateEvents", children: [
      /* @__PURE__ */ e.jsx("span", { className: "EventsData", children: s === "Update" ? "Update Events" : "Create Event" }),
      /* @__PURE__ */ e.jsx(
        Ra,
        {
          className: "MasjidEventsCancelIconForEvents",
          onClick: (r) => {
            t == null || t(!i);
          }
        }
      )
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "DetailsOfEventsContainer", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "AddEventForm", children: [
        /* @__PURE__ */ e.jsx(
          ie,
          {
            size: "small",
            autoFocus: !0,
            margin: "dense",
            autoComplete: "Off",
            id: "outlined-size-small",
            placeholder: "Event Name",
            onChange: (r) => {
              var l, n;
              L && ((l = d.current) != null && l.value ? (n = d.current) != null && n.value && h(!1) : h(!0));
            },
            error: L,
            helperText: L ? "Manditory field" : "",
            sx: {
              "& .MuiOutlinedInput-notchedOutline ": {
                borderColor: "black"
              }
            },
            type: "text",
            fullWidth: !0,
            defaultValue: s === "Update" ? a == null ? void 0 : a.eventName : "",
            inputRef: d,
            variant: "outlined"
          }
        ),
        /* @__PURE__ */ e.jsx("div", { className: "DescEvents", children: /* @__PURE__ */ e.jsx(
          ie,
          {
            id: "outlined-required",
            variant: "outlined",
            onChange: (r) => {
              var l, n;
              U && ((l = y.current) != null && l.value ? (n = y.current) != null && n.value && B(!1) : B(!0));
            },
            placeholder: "Description",
            multiline: !0,
            rows: 4,
            error: U,
            helperText: U ? "Manditory field" : "",
            defaultValue: s === "Update" ? a == null ? void 0 : a.description : "",
            inputRef: y,
            type: "text",
            autoComplete: "Off",
            sx: {
              "& .MuiFormControl-root": {
                width: 100
              },
              "& .MuiOutlinedInput-notchedOutline ": {
                borderColor: "black"
              }
            }
          }
        ) }),
        /* @__PURE__ */ e.jsx(
          ie,
          {
            id: "outlined-size-small",
            size: "small",
            variant: "outlined",
            autoComplete: "Off",
            placeholder: "Event Address",
            onChange: (r) => {
              var l, n;
              M && ((l = T.current) != null && l.value ? (n = T.current) != null && n.value && v(!1) : v(!0));
            },
            error: M,
            helperText: M ? "Manditory field" : "",
            inputRef: T,
            defaultValue: s === "Update" ? a == null ? void 0 : a.address : S == null ? void 0 : S.address,
            fullWidth: !0,
            type: "text"
          }
        ),
        /* @__PURE__ */ e.jsx("div", { className: "EventReccurence", children: /* @__PURE__ */ e.jsxs(xa, { size: "small", children: [
          /* @__PURE__ */ e.jsx(ba, { children: "Recurrence" }),
          /* @__PURE__ */ e.jsxs(
            ja,
            {
              size: "small",
              labelId: "demo-simple-select-label",
              id: "demo-simple-select",
              error: W,
              value: u,
              defaultValue: u,
              placeholder: "Choose The Recurrence type",
              onChange: (r) => sa(r.target.value),
              children: [
                /* @__PURE__ */ e.jsx(oe, { value: "RandomDates", children: "Choose Random Dates" }),
                /* @__PURE__ */ e.jsx(oe, { value: "Daily", children: "Daily" }),
                /* @__PURE__ */ e.jsx(oe, { value: "None", children: "None" })
              ]
            }
          ),
          W && /* @__PURE__ */ e.jsx("p", { style: { color: "red" }, children: "Error Please Choose Recurrence" })
        ] }) }),
        u === "RandomDates" && /* @__PURE__ */ e.jsx(
          Re,
          {
            value: N,
            onChange: Ke,
            placeholder: "Pick the dates of  recurrence",
            style: { width: "98%", height: "4vh", cursor: "pointer" },
            minDate: /* @__PURE__ */ new Date(),
            format: "MM/DD/YYYY",
            multiple: !0,
            plugins: [/* @__PURE__ */ e.jsx(Ee, { markFocused: !0 })]
          }
        ),
        u === "Daily" && /* @__PURE__ */ e.jsx(
          Re,
          {
            value: E,
            onChange: Xe,
            range: !0,
            minDate: /* @__PURE__ */ new Date(),
            placeholder: "Select the range for recurrence",
            style: {
              width: "98%",
              height: "4vh",
              marginTop: 1,
              marginBottom: 1,
              cursor: "pointer"
            },
            format: "MM/DD/YYYY",
            multiple: !0,
            plugins: [/* @__PURE__ */ e.jsx(Ee, { markFocused: !0 })]
          }
        ),
        u === "None" && s !== "Update" && /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsxs("div", { className: "DateContainer", children: [
          /* @__PURE__ */ e.jsx(
            Be,
            {
              size: "small",
              disableToolbar: !0,
              format: "dd/MM/yyyy",
              minDate: /* @__PURE__ */ new Date(),
              label: "Event Start Date ",
              value: D,
              onChange: ra
            }
          ),
          /* @__PURE__ */ e.jsx(
            Be,
            {
              size: "small",
              disableToolbar: !0,
              format: "dd/MM/yyyy",
              minDate: D,
              label: "Event End Date ",
              value: me,
              onChange: pe
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "RightPhotoContainer", children: [
        /* @__PURE__ */ e.jsx("div", { className: "AddingPhoto", children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(
          Ua,
          {
            EventId: (a == null ? void 0 : a._id) ?? "",
            MasjidId: k,
            DraggedImage: Qe,
            eventPhotos: g,
            setEventsPhotos: b,
            setEventUploadPhoto: aa,
            setMasjidUploadPhoto: ee
          }
        ) }) }),
        /* @__PURE__ */ e.jsxs("div", { className: "DateTimeContainer", children: [
          /* @__PURE__ */ e.jsx(
            ce,
            {
              size: "small",
              autoOk: !0,
              inputVariant: "outlined",
              label: "Start time",
              value: Q,
              onChange: oa
            }
          ),
          /* @__PURE__ */ e.jsx(
            ce,
            {
              size: "small",
              autoOk: !0,
              label: "End Time",
              inputVariant: "outlined",
              value: Z,
              onChange: (r) => {
                he(r);
              }
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "ButtonContainerFormContainer", children: /* @__PURE__ */ e.jsx("button", { className: "MasjidAddEventFormContainer", children: /* @__PURE__ */ e.jsx(
      "span",
      {
        className: "MasjidAddEventButtontitle",
        onClick: (r) => {
          ia();
        },
        children: ta ? /* @__PURE__ */ e.jsx(ya, { color: "inherit", size: "20px" }) : s === "Update" ? "Update Event" : "Preview Event"
      }
    ) }) })
  ] }) });
};
export {
  Za as E,
  Wa as a
};

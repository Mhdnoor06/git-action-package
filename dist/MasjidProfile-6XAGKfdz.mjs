import { ao as useAppSelector, ap as useAppThunkDispatch, y as jsxRuntimeExports, a9 as Dialog, bw as DialogTitle, ae as DialogActions, ad as Button, bx as CircularProgress, bu as resources, X as handleSnackbar, aJ as useNavigate, by as AiOutlineCloseCircle, a6 as getDefaultExportFromCjs, ag as TextField } from "./index-XkptO5g9.mjs";
import React__default, { useState, useEffect, useRef } from "react";
import { B as BtnSlider, g as getAdminMasjid } from "./FetchingMasjidByAdminAction-0AI5KNsP.mjs";
import { p as placeholder, d as deleteMasjidMedia, a as deleteEventMedia, b as FetchEventById, f as fetchMasjidById, A as API, u as updateAdminMasjid } from "./Dashboard-wU64Oe5M.mjs";
import { N as NoImgFound } from "./NoImgFound-8bVP7rb5.mjs";
import { a as MdCancel } from "./index.esm-dKdnsyf6.mjs";
import { C as CANCEL } from "./CANCEL-NjkmKVms.mjs";
import "react-dom";
import "./swiper-bundle-HqgJZv8V.mjs";
const EditButton = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAABFCAYAAAAcjSspAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPQSURBVHgB7dy/btNAHMDx39lxhGiGsCDEP1WqmAmiRWwkAyFM0CcgjEzAEzQ8AbxBmyegI0oRdReE2g5mY6AolaBzJgR24uP3C3VpqRu75/Od7eYrtY2a67+P7Pp8rsugoJVa83XDN5773K8zxqqc8wED5gBjK15vszvpYxkUMKu58BrfvDhxAAfb87xFsJ1B2NOFQ7EeLCzjD92OMdTxXK8RBlMolFOABIXCFAZFACToGIwBBajUnF8SBKFqVtlah3qtGryjGChGiY4mfRDvCEwhUH69+9Q3DbMBSWEsi45ax3+nnGvdnR2NRo844xdAQwYYjtvbXAWBxt+7P1rHh7MgGPd54x9KqzZrjaxlZKqDvpwZd6YxsO0BCJYYBucwf3cfAvFxn8oBiNm8/XjS84l3JQa1McoYJMEmJ6FYIHTYxd3rbbl5Z2nSuIQwVdO6v9BGnTboKzbIocNuvTR3FUY7PzZOGj/8+n3gX7vYRZwW/nyXIH4D3FL4E9CXCMg4DrwTtcXQhAzPcRo42IG44VgDzxrroCdhkKBUYPAsWtc8JTFIkFQYBuNlBeUouK5hywI5+JxyYJyZ3zMv6YFqlO5wbVsqSFBCmCNbrkqUrtfbakcNSnC2Gx9mbesWfT/77zm2K5vm3JUOpF/qIIeKPFxT/s7eqjF3mVXcyrP/t1yGS3cc0k0lyEG4HtvBc6hXIFDau48WEIp2JZyYLoNAaaJoAzkIZ+oiMGmh6AcJEoBJAyUaBFe4lIAEIQwelTpxh5dAbvFAaOmPQw3U5Zx3z79xYw6WuaXEBwG1IKdduJKFUhgQSgZKoUCopCiFA6GSoBQShBI6+uBscXXY225PHJRTEEp0S/k88dkMg0RdDaBkz1MyDTKeMGIjgIkX26TPaMvlEn3hbILEnEFLR+EcqqAu6SBUni+wpwJC5RUlNRAqjyipglB5Q0kdhMoTihIQKi8oykCoPKAoBaGyjqIchMoyihYQKqso2kCoLKJoBaGyhqIdhJK/dMDYLgj8AR7nvF/xKou6QSjpKHGuDJ5U1HKZqgtouZnRqryimAsUpZdYIQcoqkGoTKPoAKEyi6ILhBI6+jDO7pWa8x1Ir5sIEnkpIq3EDskM6gy0/aV26hXizjDZTVFCmqKENEUJaYoS0hQlJELpwxkKlyh2o8YQygacpXywo4YY3OcrcHZyhu+37ahBpv9tr0+3eBR5hrof3Zb7kO5CjRpo0it/Z88uOEwfz6UW3d7mlziDzeABwZRvXO/iLyL6HwfV/ZdcR/cr4nlat+JWnv788LEf9+P+ACJ2e9dCOposAAAAAElFTkSuQmCC", CarouselForMainMazjidComponent = ({
  ParentComponentType: a,
  Photos: r,
  Event: c,
  setEventDetails: t,
  mazjidId: e
}) => {
  const n = useAppSelector((S) => S.admin), [s, i] = useState([]), [u, l] = useState([]), [m, p] = useState(!1), [d, f] = useState(1), [b, y] = useState(!1);
  let h = s ? s == null ? void 0 : s.length : 3;
  const [D, _] = useState(!1), [x, j] = useState(!1), w = useAppThunkDispatch(), A = () => {
    d !== (s == null ? void 0 : s.length) ? f(d + 1) : d === (s == null ? void 0 : s.length) && f(1);
  }, R = () => {
    d !== 1 ? f(d - 1) : d === 1 && f(s == null ? void 0 : s.length);
  }, I = (S) => {
    f(S);
  };
  useEffect(() => {
    a === "Masjid" ? (i(r), l(r), window.location.pathname === "/masjidprofile" ? y(!0) : y(!1)) : a === "Event" && (r == null ? void 0 : r.length) > 0 && (l(r), i(r), y(!0));
  }, [a, r]);
  const k = () => {
    if (j(!0), a === "Masjid") {
      let S = u[d - 1], Q = S.indexOf("Masjid"), O = S.substr(Q).indexOf(".jpg"), F = S.substr(Q, O);
      console.log(S.substr(Q, O)), w(deleteMasjidMedia(e, {
        imageId: F
      })).then(function(ce) {
        w(getAdminMasjid(n._id)), f(d - 1), j(!1), _(!1), window.location.reload();
      });
    } else {
      j(!0);
      let S = u[d - 1], Q = S.indexOf("Event"), O = S.substr(Q).indexOf(".jpg");
      const V = {
        imageId: S.substr(Q, O),
        url: S
      };
      if (c != null && c._id) {
        const q = w(deleteEventMedia(c._id, V)), ce = w(FetchEventById(c._id));
        q.then(function(Z) {
          Z.success ? (ce.then((G) => {
            t(G.data);
          }), f(d - 1), j(!1), _(!1)) : (j(!1), _(!1));
        });
      }
    }
  }, E = () => {
    _(!1);
  }, z = () => {
    _(!0);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "PictureCarouselContainerMain", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "DeleteButton", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Dialog,
      {
        open: D,
        "aria-labelledby": "alert-dialog-title",
        "aria-describedby": "alert-dialog-description",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { id: "alert-dialog-title", children: "Are you sure you want to delete the  Image ?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogActions, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: k, variant: "outlined", children: [
              " ",
              x ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircularProgress, { size: "15px" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: " Yes " }),
              " "
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: E,
                variant: "outlined",
                disabled: x,
                children: "No"
              }
            )
          ] })
        ]
      }
    ) }),
    (u == null ? void 0 : u.length) > 0 ? u.map((S, Q) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: d === Q + 1 ? "slideMain active-anim" : "slide",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: S.url, alt: "The Event ", className: "eventImageMain" }),
          (s == null ? void 0 : s.length) > 0 && b && (m ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "delete-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircularProgress, { size: "15px", className: "loadingIcon" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "DeteleButton", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: EditButton,
              onClick: z,
              className: "DeletePhotodButton"
            }
          ) }) }))
        ]
      },
      Q
    )) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: placeholder, alt: "The Event ", className: "eventImage2Main" }) }),
    (s == null ? void 0 : s.length) > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(BtnSlider, { moveSlide: A, direction: "next" }),
    (s == null ? void 0 : s.length) > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(BtnSlider, { moveSlide: R, direction: "prev" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-dots", children: (s == null ? void 0 : s.length) > 1 && Array.from({ length: h || 3 }).map(
      (S, Q) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          onClick: () => I(Q + 1),
          className: d === Q + 1 ? "dot active" : "dot"
        }
      )
    ) })
  ] });
}, fb = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAACLCAYAAACzxXGGAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAp+SURBVHgB7Z3NdtvWEcdnLkjaJ805YZ8gdN11LT2BqVNL8c7yvomoJ5DyBJJ23cV+AkHuprvQqyZSeiyv2l2l7p0wuyzpXUQSuJkBCAaUCAKgABC4mN85MknIlGnqz/m6984g1ISHvecdF9wN7erP6eEjRPhMA3QQsMPf16DbdL99+3l0fUjXh3R3GNzXWv9Mj3/SyrpGcIZj++IKagKCgbA4HIAuuM4GIj6lX3RnkRiyhP6NS/rjmt7S/4HS16aKyAzB9LrtJjzcRe2QOGA3b3EkZEBfV1pDf6zUe7C/G4ABVFcwLBK3uUf/AxZIF0rO1AKReKy3VRZPtQRDIrGg1VVaH1RBJFH44kF7rEYknsshVIhqCIaE0nJbBxr1YUncTSZwEE03/TFaJ1WxOqUWTKP3nKyJe0B3d8FwSDy2RutsYn93CSWmlIJhoVAAe1Rlt7Mq7K5IOCdlFU65BEPpcNOdHCOqPag5bHHK6KrKIRhDY5QsKJtwLFgz7H4aWv1rmh4/BGEOek82LNC76snjoXv94RrWzPosDFmVhm6dqhoEtFnB8Q1Zm/11Wpu1WBi2KpbG/yj69ICQGF73ImvTI2vzy7qsTbEWhquzukXZDxyCcC/WFdsUJxjKgFra/ZbuiVXJjsEI1VaRoinEJfkuyHkXbCUQMqPNLqrxlz/fOP//8F8ogNwF8+CrbVr3gX9KBpQbD8lPPLeePAbn+sN7yJlcBdP6aucIEP8OQv4gdNXG4zYFw99DjuQWwzT3vjhFMpcgFM3VCEdbea2C5yIYEcvayU00mQtGxFIachFNpoIRsZSOzEWjICNELKVko6mb30KGZJIlcTaEKNXbMsK1L7Xxp457/eNbyIB7C8ZPneEYhNLirXhnVKe5l2C8nXG0pgFC+aE6DVWEP963Irx60OuvDb2jex0QqsJQo966zyG7lQXT2tv5CWoqltDx2ax+XrvAnYa0YDnaXDVzasAKNPd2voGaiGV6FOSKPlp9un/9KUyuhhnXNigOtOnnF7WPmTxD63QE8BJWILVgml9u9+qwn8U7bIZw9gcY98MCqdSps2h2H3z5xeHNP75/BSlJJxiKW1C7R2Aw/jEPfTKxf7jkx4YI5A5a6SP6ffbT7qVJJRg+AgKoOmAmAxfd/UAoNaDd1M7pGGArzZMSV3o9V2ToeSGyKK8/oUCwRmLx4IOC7JrSPCeZYHrdNio00hUh4teUZh4OK3YoPit819RNnKElEgwfMgPDsiLOfhTq/Rs7feBnGOSamt8k/cvxgqFA18TSP1mW/V/tCxsEdk29Ru9ZN8nfjRWMF+gaBruhkX3eB2EG6mQhx3LBcBptWqCLcCJu6C4cACexMksFY6B1GZBlOQZhIUmsTLRgDLQuig99CZEksTKRgjHPuqD9qyGdLPMkzsosFoyR1gVPQIglzsosFIxYl3qjtDqI/N6ii2RdnoJBuOicgZCGblT1945geM0IzKrqDuq2RpQB3EJu4RqTWnDFsAVGvAQhNbQgu9DLzAuGg13DWp06CqSiuwJRwe+cYJqO0wXDcPRN7i0wTEW5qnv72vwGKuPcEQwL6eXvTVNpdjRYK23k1tr5HMvYY9vfZ3wcvvS7YPztl10wCA0635lF00bU5PBf8K5/BBdWo7Qd/DvN3vZG+FjKTDCeO1JGztvKB3ojm9yGDZXRjaiVo7rApyaCx7PvoO6CYSCoAeQBWxYN7+rQtdxV7ovw45lgTCvW5Qlvnq5Li3s+lx0u4vmC4V11cuQ1GQaWHmJoN6Axa5XrCcaajKV3bkJMLD3EYTnWvGCUUl0QEoGIHagZOhTf+i4J4QkIQhQhfQRBr7gkYRmdIPBVXJiRoVZCHFzJ5lu1ajlbqBmO74WU5UzEHQnx4FQw2vDStpANVNj9jG8VoCsZkhCLBrfDtxTDSMArxBPMuuK0WgQjJMFPqyWlFhLiC4ZbfoIgJEQsjJCYh7RSn9k0E6EerNTYeQ0MKK9Lf3pRZb+n11XupXKz/ZzRavALrMjQd2zt7WgoOdw7d3x2YWyrjoI7ga+MQvVIXJKQCjXtpS8IsXAHDJXlVA7BfMQlCUnxDAu7pAEIQjy+YFDjzyAIMQSGRYJeIRFkWD7yrVJaXJIQz8zCTEQwQgKU9s+pq2ajmW9LDMEIHMvxdKK4GCNxjBDHBCa+YKaPByAI0cw6efmC0SB94IRIwp28AsFIHCNEQin1zKD47T4s6xIEIQLeAxTc9wQjga+wjCDgZX5vWabxLQjCLXjzWrh1bUgwrsQxwh3C8QszE8yNNbFBEG4Rjl+Yuca8zb3tdyVt+EcmUfchJVrj5fjNeaajb1p/29kFS7+ATPHe8w6Uj8Ho7PxR+MLcqQHP/CB0oXy06dX1ICWI3uch21lJittepH8t1eTuJJi5HXcjNXoFgjBl0WCy+S2aFA17UbEgRAwmu7OnV7la0msBog4O3hEMZ0tSxBOUUvbC63eucJFGZxwoCtVCw9uoKbyLj5kosEGoLVR7iUx+FgqGBypJ8Ftblk7hjTzIplHLJPkaotX8yL7bRAqGVSZWpnYMxqfLK+NLj8qKlakXcdaFWSoYsTK1Ita6MPGH8RG+BsF4klgXJlYwXsak9WsQDAbtJNaFSdTuY6zGx1L9NReFmDhWTdYfhqq/SgJgM0E4iarqLiJxQ6Eb+4dXEgAbx2Bknx+neUKqDlQWWvvimsxBoUrdmTSVYPymeOKajCClKwpI3ePOc02yml11UruigJWaIo7V6BDkAH9VGaziigJW66LJWzlRv5R4poJQIXYVVxSwcttVLuhJFbhiUNxCrij1cZ0w9+rTS6LhHvkSBFcA8givV41bwty7sTO/CAmCS88VfbgPIQMy6QQ+fnPek6JeaRl8gqPMJsFk1jp+jOOX4U5FQinwMqJhqPvCfclu1gC9KBLNloimNHhiuU9GtIhsh1OIaMpCLmJhsp9mIqJZN7mJhcln/A2L5uxiUzZeFc4VBbibeYmFyXVe0vgNpXJSpykEjXA2OjvfzDLAXUTuA7a4ToPoSkU4T+hDObbPe1AAhUxk4xVunkgKsmCZKbyW56K7lUUFNymFjfDz99LQKqlUhTOBC6UWWpvLjrXmQaGDzqfBWO9B79mVq/EIAdsgpMdzQRfHYyiewixMGHZR/OmQ1Ds1g6Jd0G3WIhiGrY2XeqPeB4ltluLtOyKrwilz0S7oNmsTTABvkZDYJpogVmGrknfKnIS1C4ZhazOiFW/OpGTV24ffB3Y/ZIW38izEpaXQoDeO6Ruz1ext95CCYihns+O8GfA55/HpRSktbqkEE+Dt5KMFBqv3112l1UFJu5NnimdZVfIzzuuilIIJcOx/9x2APlmcDXSRlxn2wDBYKNyHZ93BbFJKEcPEwRvOZzGOAVlVKOv5I8coVRELU2oLc5tpjGPzF1sd5UJPI/KgiA6UHBaJokzQUbofCGQE1aNSggnjHXMB4I3Nhyweun1Kv5XdMsU77G4Q8b0L7mWVrMgyKiuYMFPx8Je3/6bRe9Yl4Twhs19Y3YItCPL0D4RrFsinMLkqQ90kaxCEVPgpPzylr4+uAu5nPDBVHIv4DRWMaZmHKn7wAAAAAElFTkSuQmCC", web = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABCCAYAAADjVADoAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAekSURBVHgB7VvNblNHFD5n7rWTAovwBHU2XVBVTfYgzBNgVBJoNyRPQCKVELGpsykhVEryBDE7mlAwT0BQW6m7hEVRd7i77uouaG3fe+f0zE0Cju+Z+2cbkcifhITn587MmfM75wRghBFGGGGEEdIC4QNjfKFS8orOFJCaQMRSdx8RNdD8Q2x6D3f24QNi6IQwB+8UxyoK9VUCnOIFJ9LMI4AmAu1rUs+1atdhtd6AIWI4hFioTKji2Jw5PC9RhkGAaJ8INgPPq8NGvQkDxmAJwQRwi+5tQrWQ9uazgjmFxUfXfOU/GiSXDIwQzp2ZOVC4PiwC9MIQBDStBA93ajAA9E+I5Zsll4KtgYlARhBQLUBvpV/u6I8Q92amnACf8UdKkBOsEGsUzs9PSMMdStO1fixNbkIUlr66RejUEgcSvORFGoRwS+htutiZZtsCPuk9EMQqJBThJP/nMiQAVTDn3f/pEeSAghxIRQQmAO/sir+2XdaWQ7DSW2kxS7dWHzd4/Kb8GSiZb7ioJpEg9pCknZq7dP07yIHMHJFEhIPbV/P+6uNd89tZmq0gwjNpnPdge/LYt+/OviFJzFBf8VefvPueQlinGHHMwxnZOIJ1Qjwn0ObZdmf6iAjhppBui0ORVnqbNMGi/Fl8d8vB2nbd+6QzHccdhjMKd2amIAPScwRbB4f0C6tiRFjxV7ervXNc0m+iQ6PccAT37qzRFZFD+O3O+V5Hyl2erbLsiKJgFGiAnStprUlqjnC0rmYiwuEceXyUG953oXjTbrG40NsWrslri9/hvbpU2IKUSEUI4yyhrPWtRDjsuxxtYm5YtTtB3pm26Yu40BarE0sMY5JDRy8FkgnBbjN7jBZNTJs2IrjfXi/LHES7EIeqYX+KcEV4w8vXy9IUswey6Ay+wPXwDAlIJISJHaQDmZs91/aqtnmk1JzYjk6yNkeqi+1alW1TgjMdE980ot/CCUmsehFPiGplgk3hnNRlNHwzLgq0iEW3RbHh0FRGv41kd6qYkwj1vNzJliuBK2KtRqgbFKZWOB8z2Hlb9NaebNj6YzmCiXAbTgkI8Wpcv50jLD7ASQbHNZMti19h5YiCpgqcMgTatZ7JSggKn9lOF+LEw7VPw4ibGwZUCRHg4UDB72D/gfAlZEFoJYR3CoKV5LlgDj3VM2/KPlyACVhI4Z60AQ6JqxCDcdYtvhRfJGhtcR9LNxYIab23PU7W884VRYPzC7LNVWoXEuD7fklq16AakBGaUPRTgqCQ6ClqoIbU7umiyBUyIdAtSe0YBLmf0VGpzHOR/IbUTo6TSIiCUvKzneWSRUIg6pLU7nleAxJgI6ILrQZkhOu6DXGNIChBAlrjLZHwvdm1I2R7mBlCYmVoqGbba643y9OIbIRIEc4OEkEQ5F+vmm2vFqsha/jx8eQslk3B+TBegoywWS90nAYkoPC2ULJ8syG1yxyBWpQvm+k5NhVlk0daZ75dftPIzRFZiSgSwmZ6FMjWpBuO4zTzzo3OwZLUnsoCKVWWmm0ugDX65Nfkv6E388SpeZ7yHJLwEbjY5o0z8rJG1PTXds5L42NijfDQ5WNNGMYfmfIFXZPLTKAyZALamhOzWfJMfGUbb7UaSCr55k8YEHTd1mclhKPQOumkwlF+dkKEidmkp/eTBIL9uIg1/s3yFIkHKtqM63fjOk3Wyf2vaBRT1CZ3ZaglOEs3GpwA/vRYY4zWjsznzHhU68NLUyJgnROXeW95saKekNfgwMVWt0BqK87l5gi2LjRO2LJV3bBnyWDXOsnsxWS1BLApfZQUMCbGGv6ZjnlVinzEbNQZK6xbJ9qyVQFWIAG2LBkSWW/VKRY3bBk5Fzo1SEBy0MVcwSwu1i0g4JytQsWereJkblLwZkseW2qkzB7sSWpaaaUoDUgVfR5kry0WBFXVWq4jiRWLR6HozoEFYXZNuFnSJCrucG3eg9Rn6q/iMu/dSB2Gu+jMi0nWcEWZGDZW1qjsGTRL5t11vI1IWywRoOGYssOUyFRDVTClQ4Hwun2IsOax7S12Kyb37swLKV7gG57vLRa15lqZG/yHO+91C4uW0U9GNMECdGja+z59uWGmhxnzYdYX89bFeWPOWHHPmLH3jZbqGHPzvbrCVofhOO+4wVgUs0YsEXiPWYgQLgEZoX95va8ufW44qSz1mxJkVlw38eKFEl367JVefbqvLl7gsVjqHaccp61//X3X/D5QeFGLEpYSPPhx0RCA193i8LoaW+YcVvDsbEBGZBKNbhSWZ+aI0pQM0C6P+1PU6sbBUl5YcOqQ3pMOaDJrB45ZcmVuyAkplWNkLvQBozPYL3gWV/OYjCNrlL8EOVTiDl3LKg7dyCwa3dA/v/6reOmL5/wsdp53k/edotQrNpnAbrerOtc695/+AX2gL47ohhEVUxjaH3dkQujo5RWFXvTFEd0wStRwh0b659AhGtbTf5Ov78G5dufrf394+hsMCAPjiG5MsFl8O16osJJc4J9fwiAQVvlj/WynXWt+9H/KJMCUCQSaKuxsVXg1Q5S0nGIi31fm8Oa17OChaHgYOiF6Ubj3zZTJcRhdgvr4Ez9HnQ3QumnSCcM++AgjjDBCFvwPsW87yTJ/Dk8AAAAASUVORK5CYII=", MasjidProfileCard = ({ setEditMasjid: a }) => {
  var d, f, b, y;
  let r = useAppSelector((h) => h.AdminMasjid);
  const [c, t] = useState(!1), e = resources.en, [n, s] = useState(!1), [i, u] = useState(), l = useAppThunkDispatch();
  let m = useAppSelector((h) => h.admin);
  useEffect(() => {
    let h = m.masjids[0];
    u(h);
  }, [i]), useEffect(() => {
    m.masjids[0] && l(fetchMasjidById(m.masjids[0])).then((D) => {
      console.log(D), D.message === "Success" && t(D.data);
    });
  }, [i]), console.log(c), useEffect(() => {
    window.location.pathname === "/masjidprofile" ? s(!0) : s(!1);
  }, []);
  const p = () => {
    a(!0);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "MasjidProfileCardContainerMain", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "MazjidPhotosConatinerMain", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      CarouselForMainMazjidComponent,
      {
        ParentComponentType: "Masjid",
        Photos: r == null ? void 0 : r.masjidPhotos,
        mazjidId: i
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "MasjdiProfileCardTopMain", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "MazjisPictureContainerTopMain", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "MazjidPorfilePhotoCOntainerMain", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "MasjidProfilePictureMain", children: r && (r != null && r.masjidProfilePhoto) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: r && (r == null ? void 0 : r.masjidProfilePhoto),
            alt: "AdminMasjidProfile",
            className: "MasjidProfilePictureContianerMain"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: NoImgFound,
            alt: "AdminMasjidProfile",
            className: "MasjidProfilePictureContianerMain"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "MasjidProfilePictureTitleMain", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "MasjidProfilePictureTitleNameMain", children: [
          r && r.masjidName,
          " "
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "SocialMediaLinks", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "FaceBookLink", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: fb, className: "fbImageMasjid" }),
          ((d = r == null ? void 0 : r.externalLinks[0]) == null ? void 0 : d.url.length) > 0 ? (f = r == null ? void 0 : r.externalLinks[0]) == null ? void 0 : f.url : "www.facebook.com"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "WebsiteLink", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: web, className: "webImageMasjid" }),
          ((b = r == null ? void 0 : r.externalLinks[1]) == null ? void 0 : b.url.length) > 0 ? (y = r == null ? void 0 : r.externalLinks[1]) == null ? void 0 : y.url : "www.mymasjid.com"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "MasjidProfileCardBottomMain", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "MasjidDecriptionItemCardMain", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "EditDescButtonBlock", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "MasjdiDescriptionKeyDescMain", children: e.MASJID_PROFILE_CARD.MASJID_DESCRIPTION }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "EditButtonForMazjid", children: n && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "EditMasjidButtonMain", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: p,
              className: "EditMazjidButton",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: EditButton, className: "EditMazjidButtonImage" })
            }
          ) }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "MasjidDescriptionValueDescMain", children: r && r.description })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "MazjidBottomNewContainerMain", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "MasjidDecriptionItemMain", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "MasjdiDescriptionKeyMain", children: e.MASJID_PROFILE_CARD.MASJID_CONTACT }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "MasjidContactValue valueForAllMain", children: r && r.contact })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "MasjidDecriptionItemMain", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "MasjdiDescriptionKeyMain", children: e.MASJID_PROFILE_CARD.MASJID_ADDRESS }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "MasjidAddressValueMain valueForAllMain", children: r && r.address })
        ] })
      ] })
    ] })
  ] });
}, getJpegFromUrl = async (a, r) => {
  const c = a, t = "myFile.jpeg";
  fetch(c).then(async (e) => {
    const n = e.headers.get("content-type") ?? "", s = await e.blob(), i = new File(
      [s],
      t,
      {
        type: n
      }
      // { contentType }
    );
    r(i);
  });
}, isValidHttpUrl = (a) => {
  let r;
  try {
    r = new URL(a);
  } catch {
    return !1;
  }
  return r.protocol === "http:" || r.protocol === "https:";
};
function _mergeNamespaces(a, r) {
  return r.forEach(function(c) {
    Object.keys(c).forEach(function(t) {
      if (t !== "default" && !(t in a)) {
        var e = Object.getOwnPropertyDescriptor(c, t);
        Object.defineProperty(a, t, e.get ? e : { enumerable: !0, get: function() {
          return c[t];
        } });
      }
    });
  }), Object.freeze(a);
}
function ownKeys(a, r) {
  var c = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var t = Object.getOwnPropertySymbols(a);
    r && (t = t.filter(function(e) {
      return Object.getOwnPropertyDescriptor(a, e).enumerable;
    })), c.push.apply(c, t);
  }
  return c;
}
function _objectSpread2(a) {
  for (var r = 1; r < arguments.length; r++) {
    var c = arguments[r] != null ? arguments[r] : {};
    r % 2 ? ownKeys(Object(c), !0).forEach(function(t) {
      _defineProperty(a, t, c[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(c)) : ownKeys(Object(c)).forEach(function(t) {
      Object.defineProperty(a, t, Object.getOwnPropertyDescriptor(c, t));
    });
  }
  return a;
}
function _defineProperty(a, r, c) {
  return r in a ? Object.defineProperty(a, r, { value: c, enumerable: !0, configurable: !0, writable: !0 }) : a[r] = c, a;
}
function _slicedToArray(a, r) {
  return _arrayWithHoles(a) || _iterableToArrayLimit(a, r) || _unsupportedIterableToArray(a, r) || _nonIterableRest();
}
function _arrayWithHoles(a) {
  if (Array.isArray(a))
    return a;
}
function _iterableToArrayLimit(a, r) {
  var c = a == null ? null : typeof Symbol < "u" && a[Symbol.iterator] || a["@@iterator"];
  if (c != null) {
    var t, e, n = [], s = !0, i = !1;
    try {
      for (c = c.call(a); !(s = (t = c.next()).done) && (n.push(t.value), !r || n.length !== r); s = !0)
        ;
    } catch (u) {
      i = !0, e = u;
    } finally {
      try {
        s || c.return == null || c.return();
      } finally {
        if (i)
          throw e;
      }
    }
    return n;
  }
}
function _unsupportedIterableToArray(a, r) {
  if (a) {
    if (typeof a == "string")
      return _arrayLikeToArray(a, r);
    var c = Object.prototype.toString.call(a).slice(8, -1);
    return c === "Object" && a.constructor && (c = a.constructor.name), c === "Map" || c === "Set" ? Array.from(a) : c === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c) ? _arrayLikeToArray(a, r) : void 0;
  }
}
function _arrayLikeToArray(a, r) {
  (r == null || r > a.length) && (r = a.length);
  for (var c = 0, t = new Array(r); c < r; c++)
    t[c] = a[c];
  return t;
}
function _nonIterableRest() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function createCommonjsModule(a) {
  var r = { exports: {} };
  return a(r, r.exports), r.exports;
}
var UZIP_1 = createCommonjsModule(function(a) {
  var r, c, t = {};
  a.exports = t, t.parse = function(e, n) {
    for (var s = t.bin.readUshort, i = t.bin.readUint, u = 0, l = {}, m = new Uint8Array(e), p = m.length - 4; i(m, p) != 101010256; )
      p--;
    u = p, u += 4;
    var d = s(m, u += 4);
    s(m, u += 2);
    var f = i(m, u += 2), b = i(m, u += 4);
    u += 4, u = b;
    for (var y = 0; y < d; y++) {
      i(m, u), u += 4, u += 4, u += 4, i(m, u += 4), f = i(m, u += 4);
      var h = i(m, u += 4), D = s(m, u += 4), _ = s(m, u + 2), x = s(m, u + 4);
      u += 6;
      var j = i(m, u += 8);
      u += 4, u += D + _ + x, t._readLocal(m, j, l, f, h, n);
    }
    return l;
  }, t._readLocal = function(e, n, s, i, u, l) {
    var m = t.bin.readUshort, p = t.bin.readUint;
    p(e, n), m(e, n += 4), m(e, n += 2);
    var d = m(e, n += 2);
    p(e, n += 2), p(e, n += 4), n += 4;
    var f = m(e, n += 8), b = m(e, n += 2);
    n += 2;
    var y = t.bin.readUTF8(e, n, f);
    if (n += f, n += b, l)
      s[y] = { size: u, csize: i };
    else {
      var h = new Uint8Array(e.buffer, n);
      if (d == 0)
        s[y] = new Uint8Array(h.buffer.slice(n, n + i));
      else {
        if (d != 8)
          throw "unknown compression method: " + d;
        var D = new Uint8Array(u);
        t.inflateRaw(h, D), s[y] = D;
      }
    }
  }, t.inflateRaw = function(e, n) {
    return t.F.inflate(e, n);
  }, t.inflate = function(e, n) {
    return e[0], e[1], t.inflateRaw(new Uint8Array(e.buffer, e.byteOffset + 2, e.length - 6), n);
  }, t.deflate = function(e, n) {
    n == null && (n = { level: 6 });
    var s = 0, i = new Uint8Array(50 + Math.floor(1.1 * e.length));
    i[s] = 120, i[s + 1] = 156, s += 2, s = t.F.deflateRaw(e, i, s, n.level);
    var u = t.adler(e, 0, e.length);
    return i[s + 0] = u >>> 24 & 255, i[s + 1] = u >>> 16 & 255, i[s + 2] = u >>> 8 & 255, i[s + 3] = u >>> 0 & 255, new Uint8Array(i.buffer, 0, s + 4);
  }, t.deflateRaw = function(e, n) {
    n == null && (n = { level: 6 });
    var s = new Uint8Array(50 + Math.floor(1.1 * e.length)), i = t.F.deflateRaw(e, s, i, n.level);
    return new Uint8Array(s.buffer, 0, i);
  }, t.encode = function(e, n) {
    n == null && (n = !1);
    var s = 0, i = t.bin.writeUint, u = t.bin.writeUshort, l = {};
    for (var m in e) {
      var p = !t._noNeed(m) && !n, d = e[m], f = t.crc.crc(d, 0, d.length);
      l[m] = { cpr: p, usize: d.length, crc: f, file: p ? t.deflateRaw(d) : d };
    }
    for (var m in l)
      s += l[m].file.length + 30 + 46 + 2 * t.bin.sizeUTF8(m);
    s += 22;
    var b = new Uint8Array(s), y = 0, h = [];
    for (var m in l) {
      var D = l[m];
      h.push(y), y = t._writeHeader(b, y, m, D, 0);
    }
    var _ = 0, x = y;
    for (var m in l)
      D = l[m], h.push(y), y = t._writeHeader(b, y, m, D, 1, h[_++]);
    var j = y - x;
    return i(b, y, 101010256), y += 4, u(b, y += 4, _), u(b, y += 2, _), i(b, y += 2, j), i(b, y += 4, x), y += 4, y += 2, b.buffer;
  }, t._noNeed = function(e) {
    var n = e.split(".").pop().toLowerCase();
    return "png,jpg,jpeg,zip".indexOf(n) != -1;
  }, t._writeHeader = function(e, n, s, i, u, l) {
    var m = t.bin.writeUint, p = t.bin.writeUshort, d = i.file;
    return m(e, n, u == 0 ? 67324752 : 33639248), n += 4, u == 1 && (n += 2), p(e, n, 20), p(e, n += 2, 0), p(e, n += 2, i.cpr ? 8 : 0), m(e, n += 2, 0), m(e, n += 4, i.crc), m(e, n += 4, d.length), m(e, n += 4, i.usize), p(e, n += 4, t.bin.sizeUTF8(s)), p(e, n += 2, 0), n += 2, u == 1 && (n += 2, n += 2, m(e, n += 6, l), n += 4), n += t.bin.writeUTF8(e, n, s), u == 0 && (e.set(d, n), n += d.length), n;
  }, t.crc = { table: function() {
    for (var e = new Uint32Array(256), n = 0; n < 256; n++) {
      for (var s = n, i = 0; i < 8; i++)
        1 & s ? s = 3988292384 ^ s >>> 1 : s >>>= 1;
      e[n] = s;
    }
    return e;
  }(), update: function(e, n, s, i) {
    for (var u = 0; u < i; u++)
      e = t.crc.table[255 & (e ^ n[s + u])] ^ e >>> 8;
    return e;
  }, crc: function(e, n, s) {
    return 4294967295 ^ t.crc.update(4294967295, e, n, s);
  } }, t.adler = function(e, n, s) {
    for (var i = 1, u = 0, l = n, m = n + s; l < m; ) {
      for (var p = Math.min(l + 5552, m); l < p; )
        u += i += e[l++];
      i %= 65521, u %= 65521;
    }
    return u << 16 | i;
  }, t.bin = { readUshort: function(e, n) {
    return e[n] | e[n + 1] << 8;
  }, writeUshort: function(e, n, s) {
    e[n] = 255 & s, e[n + 1] = s >> 8 & 255;
  }, readUint: function(e, n) {
    return 16777216 * e[n + 3] + (e[n + 2] << 16 | e[n + 1] << 8 | e[n]);
  }, writeUint: function(e, n, s) {
    e[n] = 255 & s, e[n + 1] = s >> 8 & 255, e[n + 2] = s >> 16 & 255, e[n + 3] = s >> 24 & 255;
  }, readASCII: function(e, n, s) {
    for (var i = "", u = 0; u < s; u++)
      i += String.fromCharCode(e[n + u]);
    return i;
  }, writeASCII: function(e, n, s) {
    for (var i = 0; i < s.length; i++)
      e[n + i] = s.charCodeAt(i);
  }, pad: function(e) {
    return e.length < 2 ? "0" + e : e;
  }, readUTF8: function(e, n, s) {
    for (var i, u = "", l = 0; l < s; l++)
      u += "%" + t.bin.pad(e[n + l].toString(16));
    try {
      i = decodeURIComponent(u);
    } catch {
      return t.bin.readASCII(e, n, s);
    }
    return i;
  }, writeUTF8: function(e, n, s) {
    for (var i = s.length, u = 0, l = 0; l < i; l++) {
      var m = s.charCodeAt(l);
      if (!(4294967168 & m))
        e[n + u] = m, u++;
      else if (!(4294965248 & m))
        e[n + u] = 192 | m >> 6, e[n + u + 1] = 128 | m >> 0 & 63, u += 2;
      else if (!(4294901760 & m))
        e[n + u] = 224 | m >> 12, e[n + u + 1] = 128 | m >> 6 & 63, e[n + u + 2] = 128 | m >> 0 & 63, u += 3;
      else {
        if (4292870144 & m)
          throw "e";
        e[n + u] = 240 | m >> 18, e[n + u + 1] = 128 | m >> 12 & 63, e[n + u + 2] = 128 | m >> 6 & 63, e[n + u + 3] = 128 | m >> 0 & 63, u += 4;
      }
    }
    return u;
  }, sizeUTF8: function(e) {
    for (var n = e.length, s = 0, i = 0; i < n; i++) {
      var u = e.charCodeAt(i);
      if (!(4294967168 & u))
        s++;
      else if (!(4294965248 & u))
        s += 2;
      else if (!(4294901760 & u))
        s += 3;
      else {
        if (4292870144 & u)
          throw "e";
        s += 4;
      }
    }
    return s;
  } }, t.F = {}, t.F.deflateRaw = function(e, n, s, i) {
    var u = [[0, 0, 0, 0, 0], [4, 4, 8, 4, 0], [4, 5, 16, 8, 0], [4, 6, 16, 16, 0], [4, 10, 16, 32, 0], [8, 16, 32, 32, 0], [8, 16, 128, 128, 0], [8, 32, 128, 256, 0], [32, 128, 258, 1024, 1], [32, 258, 258, 4096, 1]][i], l = t.F.U, m = t.F._goodIndex;
    t.F._hash;
    var p = t.F._putsE, d = 0, f = s << 3, b = 0, y = e.length;
    if (i == 0) {
      for (; d < y; )
        p(n, f, d + (z = Math.min(65535, y - d)) == y ? 1 : 0), f = t.F._copyExact(e, d, z, n, f + 8), d += z;
      return f >>> 3;
    }
    var h = l.lits, D = l.strt, _ = l.prev, x = 0, j = 0, w = 0, A = 0, R = 0, I = 0;
    for (y > 2 && (D[I = t.F._hash(e, 0)] = 0), d = 0; d < y; d++) {
      if (R = I, d + 1 < y - 2) {
        I = t.F._hash(e, d + 1);
        var k = d + 1 & 32767;
        _[k] = D[I], D[I] = k;
      }
      if (b <= d) {
        (x > 14e3 || j > 26697) && y - d > 100 && (b < d && (h[x] = d - b, x += 2, b = d), f = t.F._writeBlock(d == y - 1 || b == y ? 1 : 0, h, x, A, e, w, d - w, n, f), x = j = A = 0, w = d);
        var E = 0;
        d < y - 2 && (E = t.F._bestMatch(e, d, _, R, Math.min(u[2], y - d), u[3]));
        var z = E >>> 16, S = 65535 & E;
        if (E != 0) {
          S = 65535 & E;
          var Q = m(z = E >>> 16, l.of0);
          l.lhst[257 + Q]++;
          var P = m(S, l.df0);
          l.dhst[P]++, A += l.exb[Q] + l.dxb[P], h[x] = z << 23 | d - b, h[x + 1] = S << 16 | Q << 8 | P, x += 2, b = d + z;
        } else
          l.lhst[e[d]]++;
        j++;
      }
    }
    for (w == d && e.length != 0 || (b < d && (h[x] = d - b, x += 2, b = d), f = t.F._writeBlock(1, h, x, A, e, w, d - w, n, f), x = 0, j = 0, x = j = A = 0, w = d); 7 & f; )
      f++;
    return f >>> 3;
  }, t.F._bestMatch = function(e, n, s, i, u, l) {
    var m = 32767 & n, p = s[m], d = m - p + 32768 & 32767;
    if (p == m || i != t.F._hash(e, n - d))
      return 0;
    for (var f = 0, b = 0, y = Math.min(32767, n); d <= y && --l != 0 && p != m; ) {
      if (f == 0 || e[n + f] == e[n + f - d]) {
        var h = t.F._howLong(e, n, d);
        if (h > f) {
          if (b = d, (f = h) >= u)
            break;
          d + 2 < h && (h = d + 2);
          for (var D = 0, _ = 0; _ < h - 2; _++) {
            var x = n - d + _ + 32768 & 32767, j = x - s[x] + 32768 & 32767;
            j > D && (D = j, p = x);
          }
        }
      }
      d += (m = p) - (p = s[m]) + 32768 & 32767;
    }
    return f << 16 | b;
  }, t.F._howLong = function(e, n, s) {
    if (e[n] != e[n - s] || e[n + 1] != e[n + 1 - s] || e[n + 2] != e[n + 2 - s])
      return 0;
    var i = n, u = Math.min(e.length, n + 258);
    for (n += 3; n < u && e[n] == e[n - s]; )
      n++;
    return n - i;
  }, t.F._hash = function(e, n) {
    return (e[n] << 8 | e[n + 1]) + (e[n + 2] << 4) & 65535;
  }, t.saved = 0, t.F._writeBlock = function(e, n, s, i, u, l, m, p, d) {
    var f, b, y, h, D, _, x, j, w, A = t.F.U, R = t.F._putsF, I = t.F._putsE;
    A.lhst[256]++, b = (f = t.F.getTrees())[0], y = f[1], h = f[2], D = f[3], _ = f[4], x = f[5], j = f[6], w = f[7];
    var k = 32 + (d + 3 & 7 ? 8 - (d + 3 & 7) : 0) + (m << 3), E = i + t.F.contSize(A.fltree, A.lhst) + t.F.contSize(A.fdtree, A.dhst), z = i + t.F.contSize(A.ltree, A.lhst) + t.F.contSize(A.dtree, A.dhst);
    z += 14 + 3 * x + t.F.contSize(A.itree, A.ihst) + (2 * A.ihst[16] + 3 * A.ihst[17] + 7 * A.ihst[18]);
    for (var S = 0; S < 286; S++)
      A.lhst[S] = 0;
    for (S = 0; S < 30; S++)
      A.dhst[S] = 0;
    for (S = 0; S < 19; S++)
      A.ihst[S] = 0;
    var Q = k < E && k < z ? 0 : E < z ? 1 : 2;
    if (R(p, d, e), R(p, d + 1, Q), d += 3, Q == 0) {
      for (; 7 & d; )
        d++;
      d = t.F._copyExact(u, l, m, p, d);
    } else {
      var P, O;
      if (Q == 1 && (P = A.fltree, O = A.fdtree), Q == 2) {
        t.F.makeCodes(A.ltree, b), t.F.revCodes(A.ltree, b), t.F.makeCodes(A.dtree, y), t.F.revCodes(A.dtree, y), t.F.makeCodes(A.itree, h), t.F.revCodes(A.itree, h), P = A.ltree, O = A.dtree, I(p, d, D - 257), I(p, d += 5, _ - 1), I(p, d += 5, x - 4), d += 4;
        for (var F = 0; F < x; F++)
          I(p, d + 3 * F, A.itree[1 + (A.ordr[F] << 1)]);
        d += 3 * x, d = t.F._codeTiny(j, A.itree, p, d), d = t.F._codeTiny(w, A.itree, p, d);
      }
      for (var V = l, q = 0; q < s; q += 2) {
        for (var ce = n[q], Z = ce >>> 23, G = V + (8388607 & ce); V < G; )
          d = t.F._writeLit(u[V++], P, p, d);
        if (Z != 0) {
          var J = n[q + 1], ee = J >> 16, M = J >> 8 & 255, g = 255 & J;
          I(p, d = t.F._writeLit(257 + M, P, p, d), Z - A.of0[M]), d += A.exb[M], R(p, d = t.F._writeLit(g, O, p, d), ee - A.df0[g]), d += A.dxb[g], V += Z;
        }
      }
      d = t.F._writeLit(256, P, p, d);
    }
    return d;
  }, t.F._copyExact = function(e, n, s, i, u) {
    var l = u >>> 3;
    return i[l] = s, i[l + 1] = s >>> 8, i[l + 2] = 255 - i[l], i[l + 3] = 255 - i[l + 1], l += 4, i.set(new Uint8Array(e.buffer, n, s), l), u + (s + 4 << 3);
  }, t.F.getTrees = function() {
    for (var e = t.F.U, n = t.F._hufTree(e.lhst, e.ltree, 15), s = t.F._hufTree(e.dhst, e.dtree, 15), i = [], u = t.F._lenCodes(e.ltree, i), l = [], m = t.F._lenCodes(e.dtree, l), p = 0; p < i.length; p += 2)
      e.ihst[i[p]]++;
    for (p = 0; p < l.length; p += 2)
      e.ihst[l[p]]++;
    for (var d = t.F._hufTree(e.ihst, e.itree, 7), f = 19; f > 4 && e.itree[1 + (e.ordr[f - 1] << 1)] == 0; )
      f--;
    return [n, s, d, u, m, f, i, l];
  }, t.F.getSecond = function(e) {
    for (var n = [], s = 0; s < e.length; s += 2)
      n.push(e[s + 1]);
    return n;
  }, t.F.nonZero = function(e) {
    for (var n = "", s = 0; s < e.length; s += 2)
      e[s + 1] != 0 && (n += (s >> 1) + ",");
    return n;
  }, t.F.contSize = function(e, n) {
    for (var s = 0, i = 0; i < n.length; i++)
      s += n[i] * e[1 + (i << 1)];
    return s;
  }, t.F._codeTiny = function(e, n, s, i) {
    for (var u = 0; u < e.length; u += 2) {
      var l = e[u], m = e[u + 1];
      i = t.F._writeLit(l, n, s, i);
      var p = l == 16 ? 2 : l == 17 ? 3 : 7;
      l > 15 && (t.F._putsE(s, i, m, p), i += p);
    }
    return i;
  }, t.F._lenCodes = function(e, n) {
    for (var s = e.length; s != 2 && e[s - 1] == 0; )
      s -= 2;
    for (var i = 0; i < s; i += 2) {
      var u = e[i + 1], l = i + 3 < s ? e[i + 3] : -1, m = i + 5 < s ? e[i + 5] : -1, p = i == 0 ? -1 : e[i - 1];
      if (u == 0 && l == u && m == u) {
        for (var d = i + 5; d + 2 < s && e[d + 2] == u; )
          d += 2;
        (f = Math.min(d + 1 - i >>> 1, 138)) < 11 ? n.push(17, f - 3) : n.push(18, f - 11), i += 2 * f - 2;
      } else if (u == p && l == u && m == u) {
        for (d = i + 5; d + 2 < s && e[d + 2] == u; )
          d += 2;
        var f = Math.min(d + 1 - i >>> 1, 6);
        n.push(16, f - 3), i += 2 * f - 2;
      } else
        n.push(u, 0);
    }
    return s >>> 1;
  }, t.F._hufTree = function(e, n, s) {
    var i = [], u = e.length, l = n.length, m = 0;
    for (m = 0; m < l; m += 2)
      n[m] = 0, n[m + 1] = 0;
    for (m = 0; m < u; m++)
      e[m] != 0 && i.push({ lit: m, f: e[m] });
    var p = i.length, d = i.slice(0);
    if (p == 0)
      return 0;
    if (p == 1) {
      var f = i[0].lit;
      return d = f == 0 ? 1 : 0, n[1 + (f << 1)] = 1, n[1 + (d << 1)] = 1, 1;
    }
    i.sort(function(j, w) {
      return j.f - w.f;
    });
    var b = i[0], y = i[1], h = 0, D = 1, _ = 2;
    for (i[0] = { lit: -1, f: b.f + y.f, l: b, r: y, d: 0 }; D != p - 1; )
      b = h != D && (_ == p || i[h].f < i[_].f) ? i[h++] : i[_++], y = h != D && (_ == p || i[h].f < i[_].f) ? i[h++] : i[_++], i[D++] = { lit: -1, f: b.f + y.f, l: b, r: y };
    var x = t.F.setDepth(i[D - 1], 0);
    for (x > s && (t.F.restrictDepth(d, s, x), x = s), m = 0; m < p; m++)
      n[1 + (d[m].lit << 1)] = d[m].d;
    return x;
  }, t.F.setDepth = function(e, n) {
    return e.lit != -1 ? (e.d = n, n) : Math.max(t.F.setDepth(e.l, n + 1), t.F.setDepth(e.r, n + 1));
  }, t.F.restrictDepth = function(e, n, s) {
    var i = 0, u = 1 << s - n, l = 0;
    for (e.sort(function(p, d) {
      return d.d == p.d ? p.f - d.f : d.d - p.d;
    }), i = 0; i < e.length && e[i].d > n; i++) {
      var m = e[i].d;
      e[i].d = n, l += u - (1 << s - m);
    }
    for (l >>>= s - n; l > 0; )
      (m = e[i].d) < n ? (e[i].d++, l -= 1 << n - m - 1) : i++;
    for (; i >= 0; i--)
      e[i].d == n && l < 0 && (e[i].d--, l++);
    l != 0 && console.log("debt left");
  }, t.F._goodIndex = function(e, n) {
    var s = 0;
    return n[16 | s] <= e && (s |= 16), n[8 | s] <= e && (s |= 8), n[4 | s] <= e && (s |= 4), n[2 | s] <= e && (s |= 2), n[1 | s] <= e && (s |= 1), s;
  }, t.F._writeLit = function(e, n, s, i) {
    return t.F._putsF(s, i, n[e << 1]), i + n[1 + (e << 1)];
  }, t.F.inflate = function(e, n) {
    var s = Uint8Array;
    if (e[0] == 3 && e[1] == 0)
      return n || new s(0);
    var i = t.F, u = i._bitsF, l = i._bitsE, m = i._decodeTiny, p = i.makeCodes, d = i.codes2map, f = i._get17, b = i.U, y = n == null;
    y && (n = new s(e.length >>> 2 << 3));
    for (var h, D, _ = 0, x = 0, j = 0, w = 0, A = 0, R = 0, I = 0, k = 0, E = 0; _ == 0; )
      if (_ = u(e, E, 1), x = u(e, E + 1, 2), E += 3, x != 0) {
        if (y && (n = t.F._check(n, k + (1 << 17))), x == 1 && (h = b.flmap, D = b.fdmap, R = 511, I = 31), x == 2) {
          j = l(e, E, 5) + 257, w = l(e, E + 5, 5) + 1, A = l(e, E + 10, 4) + 4, E += 14;
          for (var z = 0; z < 38; z += 2)
            b.itree[z] = 0, b.itree[z + 1] = 0;
          var S = 1;
          for (z = 0; z < A; z++) {
            var Q = l(e, E + 3 * z, 3);
            b.itree[1 + (b.ordr[z] << 1)] = Q, Q > S && (S = Q);
          }
          E += 3 * A, p(b.itree, S), d(b.itree, S, b.imap), h = b.lmap, D = b.dmap, E = m(b.imap, (1 << S) - 1, j + w, e, E, b.ttree);
          var P = i._copyOut(b.ttree, 0, j, b.ltree);
          R = (1 << P) - 1;
          var O = i._copyOut(b.ttree, j, w, b.dtree);
          I = (1 << O) - 1, p(b.ltree, P), d(b.ltree, P, h), p(b.dtree, O), d(b.dtree, O, D);
        }
        for (; ; ) {
          var F = h[f(e, E) & R];
          E += 15 & F;
          var V = F >>> 4;
          if (!(V >>> 8))
            n[k++] = V;
          else {
            if (V == 256)
              break;
            var q = k + V - 254;
            if (V > 264) {
              var ce = b.ldef[V - 257];
              q = k + (ce >>> 3) + l(e, E, 7 & ce), E += 7 & ce;
            }
            var Z = D[f(e, E) & I];
            E += 15 & Z;
            var G = Z >>> 4, J = b.ddef[G], ee = (J >>> 4) + u(e, E, 15 & J);
            for (E += 15 & J, y && (n = t.F._check(n, k + (1 << 17))); k < q; )
              n[k] = n[k++ - ee], n[k] = n[k++ - ee], n[k] = n[k++ - ee], n[k] = n[k++ - ee];
            k = q;
          }
        }
      } else {
        7 & E && (E += 8 - (7 & E));
        var M = 4 + (E >>> 3), g = e[M - 4] | e[M - 3] << 8;
        y && (n = t.F._check(n, k + g)), n.set(new s(e.buffer, e.byteOffset + M, g), k), E = M + g << 3, k += g;
      }
    return n.length == k ? n : n.slice(0, k);
  }, t.F._check = function(e, n) {
    var s = e.length;
    if (n <= s)
      return e;
    var i = new Uint8Array(Math.max(s << 1, n));
    return i.set(e, 0), i;
  }, t.F._decodeTiny = function(e, n, s, i, u, l) {
    for (var m = t.F._bitsE, p = t.F._get17, d = 0; d < s; ) {
      var f = e[p(i, u) & n];
      u += 15 & f;
      var b = f >>> 4;
      if (b <= 15)
        l[d] = b, d++;
      else {
        var y = 0, h = 0;
        b == 16 ? (h = 3 + m(i, u, 2), u += 2, y = l[d - 1]) : b == 17 ? (h = 3 + m(i, u, 3), u += 3) : b == 18 && (h = 11 + m(i, u, 7), u += 7);
        for (var D = d + h; d < D; )
          l[d] = y, d++;
      }
    }
    return u;
  }, t.F._copyOut = function(e, n, s, i) {
    for (var u = 0, l = 0, m = i.length >>> 1; l < s; ) {
      var p = e[l + n];
      i[l << 1] = 0, i[1 + (l << 1)] = p, p > u && (u = p), l++;
    }
    for (; l < m; )
      i[l << 1] = 0, i[1 + (l << 1)] = 0, l++;
    return u;
  }, t.F.makeCodes = function(e, n) {
    for (var s, i, u, l, m = t.F.U, p = e.length, d = m.bl_count, f = 0; f <= n; f++)
      d[f] = 0;
    for (f = 1; f < p; f += 2)
      d[e[f]]++;
    var b = m.next_code;
    for (s = 0, d[0] = 0, i = 1; i <= n; i++)
      s = s + d[i - 1] << 1, b[i] = s;
    for (u = 0; u < p; u += 2)
      (l = e[u + 1]) != 0 && (e[u] = b[l], b[l]++);
  }, t.F.codes2map = function(e, n, s) {
    for (var i = e.length, u = t.F.U.rev15, l = 0; l < i; l += 2)
      if (e[l + 1] != 0)
        for (var m = l >> 1, p = e[l + 1], d = m << 4 | p, f = n - p, b = e[l] << f, y = b + (1 << f); b != y; )
          s[u[b] >>> 15 - n] = d, b++;
  }, t.F.revCodes = function(e, n) {
    for (var s = t.F.U.rev15, i = 15 - n, u = 0; u < e.length; u += 2) {
      var l = e[u] << n - e[u + 1];
      e[u] = s[l] >>> i;
    }
  }, t.F._putsE = function(e, n, s) {
    s <<= 7 & n;
    var i = n >>> 3;
    e[i] |= s, e[i + 1] |= s >>> 8;
  }, t.F._putsF = function(e, n, s) {
    s <<= 7 & n;
    var i = n >>> 3;
    e[i] |= s, e[i + 1] |= s >>> 8, e[i + 2] |= s >>> 16;
  }, t.F._bitsE = function(e, n, s) {
    return (e[n >>> 3] | e[1 + (n >>> 3)] << 8) >>> (7 & n) & (1 << s) - 1;
  }, t.F._bitsF = function(e, n, s) {
    return (e[n >>> 3] | e[1 + (n >>> 3)] << 8 | e[2 + (n >>> 3)] << 16) >>> (7 & n) & (1 << s) - 1;
  }, t.F._get17 = function(e, n) {
    return (e[n >>> 3] | e[1 + (n >>> 3)] << 8 | e[2 + (n >>> 3)] << 16) >>> (7 & n);
  }, t.F._get25 = function(e, n) {
    return (e[n >>> 3] | e[1 + (n >>> 3)] << 8 | e[2 + (n >>> 3)] << 16 | e[3 + (n >>> 3)] << 24) >>> (7 & n);
  }, t.F.U = (r = Uint16Array, c = Uint32Array, { next_code: new r(16), bl_count: new r(16), ordr: [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], of0: [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 999, 999, 999], exb: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0], ldef: new r(32), df0: [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 65535, 65535], dxb: [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0], ddef: new c(32), flmap: new r(512), fltree: [], fdmap: new r(32), fdtree: [], lmap: new r(32768), ltree: [], ttree: [], dmap: new r(32768), dtree: [], imap: new r(512), itree: [], rev15: new r(32768), lhst: new c(286), dhst: new c(30), ihst: new c(19), lits: new c(15e3), strt: new r(65536), prev: new r(32768) }), function() {
    for (var e = t.F.U, n = 0; n < 32768; n++) {
      var s = n;
      s = (4278255360 & (s = (4042322160 & (s = (3435973836 & (s = (2863311530 & s) >>> 1 | (1431655765 & s) << 1)) >>> 2 | (858993459 & s) << 2)) >>> 4 | (252645135 & s) << 4)) >>> 8 | (16711935 & s) << 8, e.rev15[n] = (s >>> 16 | s << 16) >>> 17;
    }
    function i(u, l, m) {
      for (; l-- != 0; )
        u.push(0, m);
    }
    for (n = 0; n < 32; n++)
      e.ldef[n] = e.of0[n] << 3 | e.exb[n], e.ddef[n] = e.df0[n] << 4 | e.dxb[n];
    i(e.fltree, 144, 8), i(e.fltree, 112, 9), i(e.fltree, 24, 7), i(e.fltree, 8, 8), t.F.makeCodes(e.fltree, 9), t.F.codes2map(e.fltree, 9, e.flmap), t.F.revCodes(e.fltree, 9), i(e.fdtree, 32, 5), t.F.makeCodes(e.fdtree, 5), t.F.codes2map(e.fdtree, 5, e.fdmap), t.F.revCodes(e.fdtree, 5), i(e.itree, 19, 0), i(e.ltree, 286, 0), i(e.dtree, 30, 0), i(e.ttree, 320, 0);
  }();
}), UZIP = Object.freeze(_mergeNamespaces({ __proto__: null, default: UZIP_1 }, [UZIP_1])), UPNG = {}, N, W, H;
UPNG.toRGBA8 = function(a) {
  var r = a.width, c = a.height;
  if (a.tabs.acTL == null)
    return [UPNG.toRGBA8.decodeImage(a.data, r, c, a).buffer];
  var t = [];
  a.frames[0].data == null && (a.frames[0].data = a.data);
  for (var e = r * c * 4, n = new Uint8Array(e), s = new Uint8Array(e), i = new Uint8Array(e), u = 0; u < a.frames.length; u++) {
    var l = a.frames[u], m = l.rect.x, p = l.rect.y, d = l.rect.width, f = l.rect.height, b = UPNG.toRGBA8.decodeImage(l.data, d, f, a);
    if (u != 0)
      for (var y = 0; y < e; y++)
        i[y] = n[y];
    if (l.blend == 0 ? UPNG._copyTile(b, d, f, n, r, c, m, p, 0) : l.blend == 1 && UPNG._copyTile(b, d, f, n, r, c, m, p, 1), t.push(n.buffer.slice(0)), l.dispose != 0) {
      if (l.dispose == 1)
        UPNG._copyTile(s, d, f, n, r, c, m, p, 0);
      else if (l.dispose == 2)
        for (y = 0; y < e; y++)
          n[y] = i[y];
    }
  }
  return t;
}, UPNG.toRGBA8.decodeImage = function(a, r, c, t) {
  var e = r * c, n = UPNG.decode._getBPP(t), s = Math.ceil(r * n / 8), i = new Uint8Array(4 * e), u = new Uint32Array(i.buffer), l = t.ctype, m = t.depth, p = UPNG._bin.readUshort;
  if (l == 6) {
    var d = e << 2;
    if (m == 8)
      for (var f = 0; f < d; f += 4)
        i[f] = a[f], i[f + 1] = a[f + 1], i[f + 2] = a[f + 2], i[f + 3] = a[f + 3];
    if (m == 16)
      for (f = 0; f < d; f++)
        i[f] = a[f << 1];
  } else if (l == 2) {
    var b = t.tabs.tRNS;
    if (b == null) {
      if (m == 8)
        for (f = 0; f < e; f++) {
          var y = 3 * f;
          u[f] = 255 << 24 | a[y + 2] << 16 | a[y + 1] << 8 | a[y];
        }
      if (m == 16)
        for (f = 0; f < e; f++)
          y = 6 * f, u[f] = 255 << 24 | a[y + 4] << 16 | a[y + 2] << 8 | a[y];
    } else {
      var h = b[0], D = b[1], _ = b[2];
      if (m == 8)
        for (f = 0; f < e; f++) {
          var x = f << 2;
          y = 3 * f, u[f] = 255 << 24 | a[y + 2] << 16 | a[y + 1] << 8 | a[y], a[y] == h && a[y + 1] == D && a[y + 2] == _ && (i[x + 3] = 0);
        }
      if (m == 16)
        for (f = 0; f < e; f++)
          x = f << 2, y = 6 * f, u[f] = 255 << 24 | a[y + 4] << 16 | a[y + 2] << 8 | a[y], p(a, y) == h && p(a, y + 2) == D && p(a, y + 4) == _ && (i[x + 3] = 0);
    }
  } else if (l == 3) {
    var j = t.tabs.PLTE, w = t.tabs.tRNS, A = w ? w.length : 0;
    if (m == 1)
      for (var R = 0; R < c; R++) {
        var I = R * s, k = R * r;
        for (f = 0; f < r; f++) {
          x = k + f << 2;
          var E = 3 * (z = a[I + (f >> 3)] >> 7 - ((7 & f) << 0) & 1);
          i[x] = j[E], i[x + 1] = j[E + 1], i[x + 2] = j[E + 2], i[x + 3] = z < A ? w[z] : 255;
        }
      }
    if (m == 2)
      for (R = 0; R < c; R++)
        for (I = R * s, k = R * r, f = 0; f < r; f++)
          x = k + f << 2, E = 3 * (z = a[I + (f >> 2)] >> 6 - ((3 & f) << 1) & 3), i[x] = j[E], i[x + 1] = j[E + 1], i[x + 2] = j[E + 2], i[x + 3] = z < A ? w[z] : 255;
    if (m == 4)
      for (R = 0; R < c; R++)
        for (I = R * s, k = R * r, f = 0; f < r; f++)
          x = k + f << 2, E = 3 * (z = a[I + (f >> 1)] >> 4 - ((1 & f) << 2) & 15), i[x] = j[E], i[x + 1] = j[E + 1], i[x + 2] = j[E + 2], i[x + 3] = z < A ? w[z] : 255;
    if (m == 8)
      for (f = 0; f < e; f++) {
        var z;
        x = f << 2, E = 3 * (z = a[f]), i[x] = j[E], i[x + 1] = j[E + 1], i[x + 2] = j[E + 2], i[x + 3] = z < A ? w[z] : 255;
      }
  } else if (l == 4) {
    if (m == 8)
      for (f = 0; f < e; f++) {
        x = f << 2;
        var S = a[Q = f << 1];
        i[x] = S, i[x + 1] = S, i[x + 2] = S, i[x + 3] = a[Q + 1];
      }
    if (m == 16)
      for (f = 0; f < e; f++) {
        var Q;
        x = f << 2, S = a[Q = f << 2], i[x] = S, i[x + 1] = S, i[x + 2] = S, i[x + 3] = a[Q + 2];
      }
  } else if (l == 0)
    for (h = t.tabs.tRNS ? t.tabs.tRNS : -1, R = 0; R < c; R++) {
      var P = R * s, O = R * r;
      if (m == 1)
        for (var F = 0; F < r; F++) {
          var V = (S = 255 * (a[P + (F >>> 3)] >>> 7 - (7 & F) & 1)) == 255 * h ? 0 : 255;
          u[O + F] = V << 24 | S << 16 | S << 8 | S;
        }
      else if (m == 2)
        for (F = 0; F < r; F++)
          V = (S = 85 * (a[P + (F >>> 2)] >>> 6 - ((3 & F) << 1) & 3)) == 85 * h ? 0 : 255, u[O + F] = V << 24 | S << 16 | S << 8 | S;
      else if (m == 4)
        for (F = 0; F < r; F++)
          V = (S = 17 * (a[P + (F >>> 1)] >>> 4 - ((1 & F) << 2) & 15)) == 17 * h ? 0 : 255, u[O + F] = V << 24 | S << 16 | S << 8 | S;
      else if (m == 8)
        for (F = 0; F < r; F++)
          V = (S = a[P + F]) == h ? 0 : 255, u[O + F] = V << 24 | S << 16 | S << 8 | S;
      else if (m == 16)
        for (F = 0; F < r; F++)
          S = a[P + (F << 1)], V = p(a, P + (F << f)) == h ? 0 : 255, u[O + F] = V << 24 | S << 16 | S << 8 | S;
    }
  return i;
}, UPNG.decode = function(a) {
  for (var r, c = new Uint8Array(a), t = 8, e = UPNG._bin, n = e.readUshort, s = e.readUint, i = { tabs: {}, frames: [] }, u = new Uint8Array(c.length), l = 0, m = 0, p = [137, 80, 78, 71, 13, 10, 26, 10], d = 0; d < 8; d++)
    if (c[d] != p[d])
      throw "The input is not a PNG file!";
  for (; t < c.length; ) {
    var f = e.readUint(c, t);
    t += 4;
    var b = e.readASCII(c, t, 4);
    if (t += 4, b == "IHDR")
      UPNG.decode._IHDR(c, t, i);
    else if (b == "CgBI")
      i.tabs[b] = c.slice(t, t + 4);
    else if (b == "IDAT") {
      for (d = 0; d < f; d++)
        u[l + d] = c[t + d];
      l += f;
    } else if (b == "acTL")
      i.tabs[b] = { num_frames: s(c, t), num_plays: s(c, t + 4) }, r = new Uint8Array(c.length);
    else if (b == "fcTL") {
      var y;
      m != 0 && ((y = i.frames[i.frames.length - 1]).data = UPNG.decode._decompress(i, r.slice(0, m), y.rect.width, y.rect.height), m = 0);
      var h = { x: s(c, t + 12), y: s(c, t + 16), width: s(c, t + 4), height: s(c, t + 8) }, D = n(c, t + 22);
      D = n(c, t + 20) / (D == 0 ? 100 : D);
      var _ = { rect: h, delay: Math.round(1e3 * D), dispose: c[t + 24], blend: c[t + 25] };
      i.frames.push(_);
    } else if (b == "fdAT") {
      for (d = 0; d < f - 4; d++)
        r[m + d] = c[t + d + 4];
      m += f - 4;
    } else if (b == "pHYs")
      i.tabs[b] = [e.readUint(c, t), e.readUint(c, t + 4), c[t + 8]];
    else if (b == "cHRM")
      for (i.tabs[b] = [], d = 0; d < 8; d++)
        i.tabs[b].push(e.readUint(c, t + 4 * d));
    else if (b == "tEXt" || b == "zTXt") {
      i.tabs[b] == null && (i.tabs[b] = {});
      var x = e.nextZero(c, t), j = e.readASCII(c, t, x - t), w = t + f - x - 1;
      if (b == "tEXt")
        I = e.readASCII(c, x + 1, w);
      else {
        var A = UPNG.decode._inflate(c.slice(x + 2, x + 2 + w));
        I = e.readUTF8(A, 0, A.length);
      }
      i.tabs[b][j] = I;
    } else if (b == "iTXt") {
      i.tabs[b] == null && (i.tabs[b] = {}), x = 0;
      var R = t;
      x = e.nextZero(c, R), j = e.readASCII(c, R, x - R);
      var I, k = c[R = x + 1];
      c[R + 1], R += 2, x = e.nextZero(c, R), e.readASCII(c, R, x - R), R = x + 1, x = e.nextZero(c, R), e.readUTF8(c, R, x - R), w = f - ((R = x + 1) - t), k == 0 ? I = e.readUTF8(c, R, w) : (A = UPNG.decode._inflate(c.slice(R, R + w)), I = e.readUTF8(A, 0, A.length)), i.tabs[b][j] = I;
    } else if (b == "PLTE")
      i.tabs[b] = e.readBytes(c, t, f);
    else if (b == "hIST") {
      var E = i.tabs.PLTE.length / 3;
      for (i.tabs[b] = [], d = 0; d < E; d++)
        i.tabs[b].push(n(c, t + 2 * d));
    } else if (b == "tRNS")
      i.ctype == 3 ? i.tabs[b] = e.readBytes(c, t, f) : i.ctype == 0 ? i.tabs[b] = n(c, t) : i.ctype == 2 && (i.tabs[b] = [n(c, t), n(c, t + 2), n(c, t + 4)]);
    else if (b == "gAMA")
      i.tabs[b] = e.readUint(c, t) / 1e5;
    else if (b == "sRGB")
      i.tabs[b] = c[t];
    else if (b == "bKGD")
      i.ctype == 0 || i.ctype == 4 ? i.tabs[b] = [n(c, t)] : i.ctype == 2 || i.ctype == 6 ? i.tabs[b] = [n(c, t), n(c, t + 2), n(c, t + 4)] : i.ctype == 3 && (i.tabs[b] = c[t]);
    else if (b == "IEND")
      break;
    t += f, e.readUint(c, t), t += 4;
  }
  return m != 0 && ((y = i.frames[i.frames.length - 1]).data = UPNG.decode._decompress(i, r.slice(0, m), y.rect.width, y.rect.height), m = 0), i.data = UPNG.decode._decompress(i, u, i.width, i.height), delete i.compress, delete i.interlace, delete i.filter, i;
}, UPNG.decode._decompress = function(a, r, c, t) {
  var e = UPNG.decode._getBPP(a), n = Math.ceil(c * e / 8), s = new Uint8Array((n + 1 + a.interlace) * t);
  return r = a.tabs.CgBI ? UPNG.inflateRaw(r, s) : UPNG.decode._inflate(r, s), a.interlace == 0 ? r = UPNG.decode._filterZero(r, a, 0, c, t) : a.interlace == 1 && (r = UPNG.decode._readInterlace(r, a)), r;
}, UPNG.decode._inflate = function(a, r) {
  return UPNG.inflateRaw(new Uint8Array(a.buffer, 2, a.length - 6), r);
}, UPNG.inflateRaw = (H = {}, H.H = {}, H.H.N = function(a, r) {
  var c, t, e = Uint8Array, n = 0, s = 0, i = 0, u = 0, l = 0, m = 0, p = 0, d = 0, f = 0;
  if (a[0] == 3 && a[1] == 0)
    return r || new e(0);
  var b = H.H, y = b.b, h = b.e, D = b.R, _ = b.n, x = b.A, j = b.Z, w = b.m, A = r == null;
  for (A && (r = new e(a.length >>> 2 << 5)); n == 0; )
    if (n = y(a, f, 1), s = y(a, f + 1, 2), f += 3, s != 0) {
      if (A && (r = H.H.W(r, d + (1 << 17))), s == 1 && (c = w.J, t = w.h, m = 511, p = 31), s == 2) {
        i = h(a, f, 5) + 257, u = h(a, f + 5, 5) + 1, l = h(a, f + 10, 4) + 4, f += 14;
        for (var R = 1, I = 0; I < 38; I += 2)
          w.Q[I] = 0, w.Q[I + 1] = 0;
        for (I = 0; I < l; I++) {
          var k = h(a, f + 3 * I, 3);
          w.Q[1 + (w.X[I] << 1)] = k, k > R && (R = k);
        }
        f += 3 * l, _(w.Q, R), x(w.Q, R, w.u), c = w.w, t = w.d, f = D(w.u, (1 << R) - 1, i + u, a, f, w.v);
        var E = b.V(w.v, 0, i, w.C);
        m = (1 << E) - 1;
        var z = b.V(w.v, i, u, w.D);
        p = (1 << z) - 1, _(w.C, E), x(w.C, E, c), _(w.D, z), x(w.D, z, t);
      }
      for (; ; ) {
        var S = c[j(a, f) & m];
        f += 15 & S;
        var Q = S >>> 4;
        if (!(Q >>> 8))
          r[d++] = Q;
        else {
          if (Q == 256)
            break;
          var P = d + Q - 254;
          if (Q > 264) {
            var O = w.q[Q - 257];
            P = d + (O >>> 3) + h(a, f, 7 & O), f += 7 & O;
          }
          var F = t[j(a, f) & p];
          f += 15 & F;
          var V = F >>> 4, q = w.c[V], ce = (q >>> 4) + y(a, f, 15 & q);
          for (f += 15 & q; d < P; )
            r[d] = r[d++ - ce], r[d] = r[d++ - ce], r[d] = r[d++ - ce], r[d] = r[d++ - ce];
          d = P;
        }
      }
    } else {
      7 & f && (f += 8 - (7 & f));
      var Z = 4 + (f >>> 3), G = a[Z - 4] | a[Z - 3] << 8;
      A && (r = H.H.W(r, d + G)), r.set(new e(a.buffer, a.byteOffset + Z, G), d), f = Z + G << 3, d += G;
    }
  return r.length == d ? r : r.slice(0, d);
}, H.H.W = function(a, r) {
  var c = a.length;
  if (r <= c)
    return a;
  var t = new Uint8Array(c << 1);
  return t.set(a, 0), t;
}, H.H.R = function(a, r, c, t, e, n) {
  for (var s = H.H.e, i = H.H.Z, u = 0; u < c; ) {
    var l = a[i(t, e) & r];
    e += 15 & l;
    var m = l >>> 4;
    if (m <= 15)
      n[u] = m, u++;
    else {
      var p = 0, d = 0;
      m == 16 ? (d = 3 + s(t, e, 2), e += 2, p = n[u - 1]) : m == 17 ? (d = 3 + s(t, e, 3), e += 3) : m == 18 && (d = 11 + s(t, e, 7), e += 7);
      for (var f = u + d; u < f; )
        n[u] = p, u++;
    }
  }
  return e;
}, H.H.V = function(a, r, c, t) {
  for (var e = 0, n = 0, s = t.length >>> 1; n < c; ) {
    var i = a[n + r];
    t[n << 1] = 0, t[1 + (n << 1)] = i, i > e && (e = i), n++;
  }
  for (; n < s; )
    t[n << 1] = 0, t[1 + (n << 1)] = 0, n++;
  return e;
}, H.H.n = function(a, r) {
  for (var c, t, e, n, s = H.H.m, i = a.length, u = s.j, l = 0; l <= r; l++)
    u[l] = 0;
  for (l = 1; l < i; l += 2)
    u[a[l]]++;
  var m = s.K;
  for (c = 0, u[0] = 0, t = 1; t <= r; t++)
    c = c + u[t - 1] << 1, m[t] = c;
  for (e = 0; e < i; e += 2)
    (n = a[e + 1]) != 0 && (a[e] = m[n], m[n]++);
}, H.H.A = function(a, r, c) {
  for (var t = a.length, e = H.H.m.r, n = 0; n < t; n += 2)
    if (a[n + 1] != 0)
      for (var s = n >> 1, i = a[n + 1], u = s << 4 | i, l = r - i, m = a[n] << l, p = m + (1 << l); m != p; )
        c[e[m] >>> 15 - r] = u, m++;
}, H.H.l = function(a, r) {
  for (var c = H.H.m.r, t = 15 - r, e = 0; e < a.length; e += 2) {
    var n = a[e] << r - a[e + 1];
    a[e] = c[n] >>> t;
  }
}, H.H.M = function(a, r, c) {
  c <<= 7 & r;
  var t = r >>> 3;
  a[t] |= c, a[t + 1] |= c >>> 8;
}, H.H.I = function(a, r, c) {
  c <<= 7 & r;
  var t = r >>> 3;
  a[t] |= c, a[t + 1] |= c >>> 8, a[t + 2] |= c >>> 16;
}, H.H.e = function(a, r, c) {
  return (a[r >>> 3] | a[1 + (r >>> 3)] << 8) >>> (7 & r) & (1 << c) - 1;
}, H.H.b = function(a, r, c) {
  return (a[r >>> 3] | a[1 + (r >>> 3)] << 8 | a[2 + (r >>> 3)] << 16) >>> (7 & r) & (1 << c) - 1;
}, H.H.Z = function(a, r) {
  return (a[r >>> 3] | a[1 + (r >>> 3)] << 8 | a[2 + (r >>> 3)] << 16) >>> (7 & r);
}, H.H.i = function(a, r) {
  return (a[r >>> 3] | a[1 + (r >>> 3)] << 8 | a[2 + (r >>> 3)] << 16 | a[3 + (r >>> 3)] << 24) >>> (7 & r);
}, H.H.m = (N = Uint16Array, W = Uint32Array, { K: new N(16), j: new N(16), X: [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], S: [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 999, 999, 999], T: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0], q: new N(32), p: [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 65535, 65535], z: [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0], c: new W(32), J: new N(512), _: [], h: new N(32), $: [], w: new N(32768), C: [], v: [], d: new N(32768), D: [], u: new N(512), Q: [], r: new N(32768), s: new W(286), Y: new W(30), a: new W(19), t: new W(15e3), k: new N(65536), g: new N(32768) }), function() {
  for (var a = H.H.m, r = 0; r < 32768; r++) {
    var c = r;
    c = (4278255360 & (c = (4042322160 & (c = (3435973836 & (c = (2863311530 & c) >>> 1 | (1431655765 & c) << 1)) >>> 2 | (858993459 & c) << 2)) >>> 4 | (252645135 & c) << 4)) >>> 8 | (16711935 & c) << 8, a.r[r] = (c >>> 16 | c << 16) >>> 17;
  }
  function t(e, n, s) {
    for (; n-- != 0; )
      e.push(0, s);
  }
  for (r = 0; r < 32; r++)
    a.q[r] = a.S[r] << 3 | a.T[r], a.c[r] = a.p[r] << 4 | a.z[r];
  t(a._, 144, 8), t(a._, 112, 9), t(a._, 24, 7), t(a._, 8, 8), H.H.n(a._, 9), H.H.A(a._, 9, a.J), H.H.l(a._, 9), t(a.$, 32, 5), H.H.n(a.$, 5), H.H.A(a.$, 5, a.h), H.H.l(a.$, 5), t(a.Q, 19, 0), t(a.C, 286, 0), t(a.D, 30, 0), t(a.v, 320, 0);
}(), H.H.N), UPNG.decode._readInterlace = function(a, r) {
  for (var c = r.width, t = r.height, e = UPNG.decode._getBPP(r), n = e >> 3, s = Math.ceil(c * e / 8), i = new Uint8Array(t * s), u = 0, l = [0, 0, 4, 0, 2, 0, 1], m = [0, 4, 0, 2, 0, 1, 0], p = [8, 8, 8, 4, 4, 2, 2], d = [8, 8, 4, 4, 2, 2, 1], f = 0; f < 7; ) {
    for (var b = p[f], y = d[f], h = 0, D = 0, _ = l[f]; _ < t; )
      _ += b, D++;
    for (var x = m[f]; x < c; )
      x += y, h++;
    var j = Math.ceil(h * e / 8);
    UPNG.decode._filterZero(a, r, u, h, D);
    for (var w = 0, A = l[f]; A < t; ) {
      for (var R = m[f], I = u + w * j << 3; R < c; ) {
        var k;
        if (e == 1 && (k = (k = a[I >> 3]) >> 7 - (7 & I) & 1, i[A * s + (R >> 3)] |= k << 7 - ((7 & R) << 0)), e == 2 && (k = (k = a[I >> 3]) >> 6 - (7 & I) & 3, i[A * s + (R >> 2)] |= k << 6 - ((3 & R) << 1)), e == 4 && (k = (k = a[I >> 3]) >> 4 - (7 & I) & 15, i[A * s + (R >> 1)] |= k << 4 - ((1 & R) << 2)), e >= 8)
          for (var E = A * s + R * n, z = 0; z < n; z++)
            i[E + z] = a[(I >> 3) + z];
        I += e, R += y;
      }
      w++, A += b;
    }
    h * D != 0 && (u += D * (1 + j)), f += 1;
  }
  return i;
}, UPNG.decode._getBPP = function(a) {
  return [1, null, 3, 1, 2, null, 4][a.ctype] * a.depth;
}, UPNG.decode._filterZero = function(a, r, c, t, e) {
  var n = UPNG.decode._getBPP(r), s = Math.ceil(t * n / 8), i = UPNG.decode._paeth;
  n = Math.ceil(n / 8);
  var u = 0, l = 1, m = a[c], p = 0;
  if (m > 1 && (a[c] = [0, 0, 1][m - 2]), m == 3)
    for (p = n; p < s; p++)
      a[p + 1] = a[p + 1] + (a[p + 1 - n] >>> 1) & 255;
  for (var d = 0; d < e; d++)
    if (p = 0, (m = a[(l = (u = c + d * s) + d + 1) - 1]) == 0)
      for (; p < s; p++)
        a[u + p] = a[l + p];
    else if (m == 1) {
      for (; p < n; p++)
        a[u + p] = a[l + p];
      for (; p < s; p++)
        a[u + p] = a[l + p] + a[u + p - n];
    } else if (m == 2)
      for (; p < s; p++)
        a[u + p] = a[l + p] + a[u + p - s];
    else if (m == 3) {
      for (; p < n; p++)
        a[u + p] = a[l + p] + (a[u + p - s] >>> 1);
      for (; p < s; p++)
        a[u + p] = a[l + p] + (a[u + p - s] + a[u + p - n] >>> 1);
    } else {
      for (; p < n; p++)
        a[u + p] = a[l + p] + i(0, a[u + p - s], 0);
      for (; p < s; p++)
        a[u + p] = a[l + p] + i(a[u + p - n], a[u + p - s], a[u + p - n - s]);
    }
  return a;
}, UPNG.decode._paeth = function(a, r, c) {
  var t = a + r - c, e = t - a, n = t - r, s = t - c;
  return e * e <= n * n && e * e <= s * s ? a : n * n <= s * s ? r : c;
}, UPNG.decode._IHDR = function(a, r, c) {
  var t = UPNG._bin;
  c.width = t.readUint(a, r), r += 4, c.height = t.readUint(a, r), r += 4, c.depth = a[r], r++, c.ctype = a[r], r++, c.compress = a[r], r++, c.filter = a[r], r++, c.interlace = a[r], r++;
}, UPNG._bin = { nextZero: function(r, c) {
  for (; r[c] != 0; )
    c++;
  return c;
}, readUshort: function(r, c) {
  return r[c] << 8 | r[c + 1];
}, writeUshort: function(r, c, t) {
  r[c] = t >> 8 & 255, r[c + 1] = 255 & t;
}, readUint: function(r, c) {
  return 16777216 * r[c] + (r[c + 1] << 16 | r[c + 2] << 8 | r[c + 3]);
}, writeUint: function(r, c, t) {
  r[c] = t >> 24 & 255, r[c + 1] = t >> 16 & 255, r[c + 2] = t >> 8 & 255, r[c + 3] = 255 & t;
}, readASCII: function(r, c, t) {
  for (var e = "", n = 0; n < t; n++)
    e += String.fromCharCode(r[c + n]);
  return e;
}, writeASCII: function(r, c, t) {
  for (var e = 0; e < t.length; e++)
    r[c + e] = t.charCodeAt(e);
}, readBytes: function(r, c, t) {
  for (var e = [], n = 0; n < t; n++)
    e.push(r[c + n]);
  return e;
}, pad: function(r) {
  return r.length < 2 ? "0".concat(r) : r;
}, readUTF8: function(r, c, t) {
  for (var e, n = "", s = 0; s < t; s++)
    n += "%".concat(UPNG._bin.pad(r[c + s].toString(16)));
  try {
    e = decodeURIComponent(n);
  } catch {
    return UPNG._bin.readASCII(r, c, t);
  }
  return e;
} }, UPNG._copyTile = function(a, r, c, t, e, n, s, i, u) {
  for (var l = Math.min(r, e), m = Math.min(c, n), p = 0, d = 0, f = 0; f < m; f++)
    for (var b = 0; b < l; b++)
      if (s >= 0 && i >= 0 ? (p = f * r + b << 2, d = (i + f) * e + s + b << 2) : (p = (-i + f) * r - s + b << 2, d = f * e + b << 2), u == 0)
        t[d] = a[p], t[d + 1] = a[p + 1], t[d + 2] = a[p + 2], t[d + 3] = a[p + 3];
      else if (u == 1) {
        var y = a[p + 3] * 0.00392156862745098, h = a[p] * y, D = a[p + 1] * y, _ = a[p + 2] * y, x = t[d + 3] * (1 / 255), j = t[d] * x, w = t[d + 1] * x, A = t[d + 2] * x, R = 1 - y, I = y + x * R, k = I == 0 ? 0 : 1 / I;
        t[d + 3] = 255 * I, t[d + 0] = (h + j * R) * k, t[d + 1] = (D + w * R) * k, t[d + 2] = (_ + A * R) * k;
      } else if (u == 2)
        y = a[p + 3], h = a[p], D = a[p + 1], _ = a[p + 2], x = t[d + 3], j = t[d], w = t[d + 1], A = t[d + 2], y == x && h == j && D == w && _ == A ? (t[d] = 0, t[d + 1] = 0, t[d + 2] = 0, t[d + 3] = 0) : (t[d] = h, t[d + 1] = D, t[d + 2] = _, t[d + 3] = y);
      else if (u == 3) {
        if (y = a[p + 3], h = a[p], D = a[p + 1], _ = a[p + 2], x = t[d + 3], j = t[d], w = t[d + 1], A = t[d + 2], y == x && h == j && D == w && _ == A)
          continue;
        if (y < 220 && x > 20)
          return !1;
      }
  return !0;
}, UPNG.encode = function(a, r, c, t, e, n, s) {
  t == null && (t = 0), s == null && (s = !1);
  var i = UPNG.encode.compress(a, r, c, t, [!1, !1, !1, 0, s]);
  return UPNG.encode.compressPNG(i, -1), UPNG.encode._main(i, r, c, e, n);
}, UPNG.encodeLL = function(a, r, c, t, e, n, s, i) {
  for (var u = { ctype: 0 + (t == 1 ? 0 : 2) + (e == 0 ? 0 : 4), depth: n, frames: [] }, l = (t + e) * n, m = l * r, p = 0; p < a.length; p++)
    u.frames.push({ rect: { x: 0, y: 0, width: r, height: c }, img: new Uint8Array(a[p]), blend: 0, dispose: 1, bpp: Math.ceil(l / 8), bpl: Math.ceil(m / 8) });
  return UPNG.encode.compressPNG(u, 0, !0), UPNG.encode._main(u, r, c, s, i);
}, UPNG.encode._main = function(a, r, c, t, e) {
  e == null && (e = {});
  var n = UPNG.crc.crc, s = UPNG._bin.writeUint, i = UPNG._bin.writeUshort, u = UPNG._bin.writeASCII, l = 8, m = a.frames.length > 1, p = !1, d = 33 + (m ? 20 : 0);
  if (e.sRGB != null && (d += 13), e.pHYs != null && (d += 21), a.ctype == 3) {
    for (var f = a.plte.length, b = 0; b < f; b++)
      a.plte[b] >>> 24 != 255 && (p = !0);
    d += 8 + 3 * f + 4 + (p ? 8 + 1 * f + 4 : 0);
  }
  for (var y = 0; y < a.frames.length; y++)
    m && (d += 38), d += (I = a.frames[y]).cimg.length + 12, y != 0 && (d += 4);
  d += 12;
  var h = new Uint8Array(d), D = [137, 80, 78, 71, 13, 10, 26, 10];
  for (b = 0; b < 8; b++)
    h[b] = D[b];
  if (s(h, l, 13), u(h, l += 4, "IHDR"), s(h, l += 4, r), s(h, l += 4, c), h[l += 4] = a.depth, h[++l] = a.ctype, h[++l] = 0, h[++l] = 0, h[++l] = 0, s(h, ++l, n(h, l - 17, 17)), l += 4, e.sRGB != null && (s(h, l, 1), u(h, l += 4, "sRGB"), h[l += 4] = e.sRGB, s(h, ++l, n(h, l - 5, 5)), l += 4), e.pHYs != null && (s(h, l, 9), u(h, l += 4, "pHYs"), s(h, l += 4, e.pHYs[0]), s(h, l += 4, e.pHYs[1]), h[l += 4] = e.pHYs[2], s(h, ++l, n(h, l - 13, 13)), l += 4), m && (s(h, l, 8), u(h, l += 4, "acTL"), s(h, l += 4, a.frames.length), s(h, l += 4, e.loop != null ? e.loop : 0), s(h, l += 4, n(h, l - 12, 12)), l += 4), a.ctype == 3) {
    for (s(h, l, 3 * (f = a.plte.length)), u(h, l += 4, "PLTE"), l += 4, b = 0; b < f; b++) {
      var _ = 3 * b, x = a.plte[b], j = 255 & x, w = x >>> 8 & 255, A = x >>> 16 & 255;
      h[l + _ + 0] = j, h[l + _ + 1] = w, h[l + _ + 2] = A;
    }
    if (s(h, l += 3 * f, n(h, l - 3 * f - 4, 3 * f + 4)), l += 4, p) {
      for (s(h, l, f), u(h, l += 4, "tRNS"), l += 4, b = 0; b < f; b++)
        h[l + b] = a.plte[b] >>> 24 & 255;
      s(h, l += f, n(h, l - f - 4, f + 4)), l += 4;
    }
  }
  var R = 0;
  for (y = 0; y < a.frames.length; y++) {
    var I = a.frames[y];
    m && (s(h, l, 26), u(h, l += 4, "fcTL"), s(h, l += 4, R++), s(h, l += 4, I.rect.width), s(h, l += 4, I.rect.height), s(h, l += 4, I.rect.x), s(h, l += 4, I.rect.y), i(h, l += 4, t[y]), i(h, l += 2, 1e3), h[l += 2] = I.dispose, h[++l] = I.blend, s(h, ++l, n(h, l - 30, 30)), l += 4);
    var k = I.cimg;
    s(h, l, (f = k.length) + (y == 0 ? 0 : 4));
    var E = l += 4;
    u(h, l, y == 0 ? "IDAT" : "fdAT"), l += 4, y != 0 && (s(h, l, R++), l += 4), h.set(k, l), s(h, l += f, n(h, E, l - E)), l += 4;
  }
  return s(h, l, 0), u(h, l += 4, "IEND"), s(h, l += 4, n(h, l - 4, 4)), l += 4, h.buffer;
}, UPNG.encode.compressPNG = function(a, r, c) {
  for (var t = 0; t < a.frames.length; t++) {
    var e = a.frames[t];
    e.rect.width;
    var n = e.rect.height, s = new Uint8Array(n * e.bpl + n);
    e.cimg = UPNG.encode._filterZero(e.img, n, e.bpp, e.bpl, s, r, c);
  }
}, UPNG.encode.compress = function(a, r, c, t, e) {
  for (var n = e[0], s = e[1], i = e[2], u = e[3], l = e[4], m = 6, p = 8, d = 255, f = 0; f < a.length; f++)
    for (var b = new Uint8Array(a[f]), y = b.length, h = 0; h < y; h += 4)
      d &= b[h + 3];
  var D = d != 255, _ = UPNG.encode.framize(a, r, c, n, s, i), x = {}, j = [], w = [];
  if (t != 0) {
    var A = [];
    for (h = 0; h < _.length; h++)
      A.push(_[h].img.buffer);
    var R = UPNG.encode.concatRGBA(A), I = UPNG.quantize(R, t), k = 0, E = new Uint8Array(I.abuf);
    for (h = 0; h < _.length; h++) {
      var z = (he = _[h].img).length;
      for (w.push(new Uint8Array(I.inds.buffer, k >> 2, z >> 2)), f = 0; f < z; f += 4)
        he[f] = E[k + f], he[f + 1] = E[k + f + 1], he[f + 2] = E[k + f + 2], he[f + 3] = E[k + f + 3];
      k += z;
    }
    for (h = 0; h < I.plte.length; h++)
      j.push(I.plte[h].est.rgba);
  } else
    for (f = 0; f < _.length; f++) {
      var S = _[f], Q = new Uint32Array(S.img.buffer), P = S.rect.width, O = (y = Q.length, new Uint8Array(y));
      for (w.push(O), h = 0; h < y; h++) {
        var F = Q[h];
        if (h != 0 && F == Q[h - 1])
          O[h] = O[h - 1];
        else if (h > P && F == Q[h - P])
          O[h] = O[h - P];
        else {
          var V = x[F];
          if (V == null && (x[F] = V = j.length, j.push(F), j.length >= 300))
            break;
          O[h] = V;
        }
      }
    }
  var q = j.length;
  for (q <= 256 && l == 0 && (p = q <= 2 ? 1 : q <= 4 ? 2 : q <= 16 ? 4 : 8, p = Math.max(p, u)), f = 0; f < _.length; f++) {
    (S = _[f]).rect.x, S.rect.y, P = S.rect.width;
    var ce = S.rect.height, Z = S.img;
    new Uint32Array(Z.buffer);
    var G = 4 * P, J = 4;
    if (q <= 256 && l == 0) {
      G = Math.ceil(p * P / 8);
      for (var ee = new Uint8Array(G * ce), M = w[f], g = 0; g < ce; g++) {
        h = g * G;
        var ie = g * P;
        if (p == 8)
          for (var X = 0; X < P; X++)
            ee[h + X] = M[ie + X];
        else if (p == 4)
          for (X = 0; X < P; X++)
            ee[h + (X >> 1)] |= M[ie + X] << 4 - 4 * (1 & X);
        else if (p == 2)
          for (X = 0; X < P; X++)
            ee[h + (X >> 2)] |= M[ie + X] << 6 - 2 * (3 & X);
        else if (p == 1)
          for (X = 0; X < P; X++)
            ee[h + (X >> 3)] |= M[ie + X] << 7 - 1 * (7 & X);
      }
      Z = ee, m = 3, J = 1;
    } else if (D == 0 && _.length == 1) {
      ee = new Uint8Array(P * ce * 3);
      var de = P * ce;
      for (h = 0; h < de; h++) {
        var he, me = 4 * h;
        ee[he = 3 * h] = Z[me], ee[he + 1] = Z[me + 1], ee[he + 2] = Z[me + 2];
      }
      Z = ee, m = 2, J = 3, G = 3 * P;
    }
    S.img = Z, S.bpl = G, S.bpp = J;
  }
  return { ctype: m, depth: p, plte: j, frames: _ };
}, UPNG.encode.framize = function(a, r, c, t, e, n) {
  for (var s = [], i = 0; i < a.length; i++) {
    var u, l = new Uint8Array(a[i]), m = new Uint32Array(l.buffer), p = 0, d = 0, f = r, b = c, y = t ? 1 : 0;
    if (i != 0) {
      for (var h = n || t || i == 1 || s[i - 2].dispose != 0 ? 1 : 2, D = 0, _ = 1e9, x = 0; x < h; x++) {
        for (var j = new Uint8Array(a[i - 1 - x]), w = new Uint32Array(a[i - 1 - x]), A = r, R = c, I = -1, k = -1, E = 0; E < c; E++)
          for (var z = 0; z < r; z++)
            m[q = E * r + z] != w[q] && (z < A && (A = z), z > I && (I = z), E < R && (R = E), E > k && (k = E));
        I == -1 && (A = R = I = k = 0), e && ((1 & A) == 1 && A--, (1 & R) == 1 && R--);
        var S = (I - A + 1) * (k - R + 1);
        S < _ && (_ = S, D = x, p = A, d = R, f = I - A + 1, b = k - R + 1);
      }
      j = new Uint8Array(a[i - 1 - D]), D == 1 && (s[i - 1].dispose = 2), u = new Uint8Array(f * b * 4), UPNG._copyTile(j, r, c, u, f, b, -p, -d, 0), (y = UPNG._copyTile(l, r, c, u, f, b, -p, -d, 3) ? 1 : 0) == 1 ? UPNG.encode._prepareDiff(l, r, c, u, { x: p, y: d, width: f, height: b }) : UPNG._copyTile(l, r, c, u, f, b, -p, -d, 0);
    } else
      u = l.slice(0);
    s.push({ rect: { x: p, y: d, width: f, height: b }, img: u, blend: y, dispose: 0 });
  }
  if (t) {
    for (i = 0; i < s.length; i++)
      if ((ce = s[i]).blend != 1) {
        var Q = ce.rect, P = s[i - 1].rect, O = Math.min(Q.x, P.x), F = Math.min(Q.y, P.y), V = { x: O, y: F, width: Math.max(Q.x + Q.width, P.x + P.width) - O, height: Math.max(Q.y + Q.height, P.y + P.height) - F };
        s[i - 1].dispose = 1, i - 1 != 0 && UPNG.encode._updateFrame(a, r, c, s, i - 1, V, e), UPNG.encode._updateFrame(a, r, c, s, i, V, e);
      }
  }
  if (a.length != 1)
    for (var q = 0; q < s.length; q++) {
      var ce;
      (ce = s[q]).rect.width * ce.rect.height;
    }
  return s;
}, UPNG.encode._updateFrame = function(a, r, c, t, e, n, s) {
  for (var i = Uint8Array, u = Uint32Array, l = new i(a[e - 1]), m = new u(a[e - 1]), p = e + 1 < a.length ? new i(a[e + 1]) : null, d = new i(a[e]), f = new u(d.buffer), b = r, y = c, h = -1, D = -1, _ = 0; _ < n.height; _++)
    for (var x = 0; x < n.width; x++) {
      var j = n.x + x, w = n.y + _, A = w * r + j, R = f[A];
      R == 0 || t[e - 1].dispose == 0 && m[A] == R && (p == null || p[4 * A + 3] != 0) || (j < b && (b = j), j > h && (h = j), w < y && (y = w), w > D && (D = w));
    }
  h == -1 && (b = y = h = D = 0), s && ((1 & b) == 1 && b--, (1 & y) == 1 && y--), n = { x: b, y, width: h - b + 1, height: D - y + 1 };
  var I = t[e];
  I.rect = n, I.blend = 1, I.img = new Uint8Array(n.width * n.height * 4), t[e - 1].dispose == 0 ? (UPNG._copyTile(l, r, c, I.img, n.width, n.height, -n.x, -n.y, 0), UPNG.encode._prepareDiff(d, r, c, I.img, n)) : UPNG._copyTile(d, r, c, I.img, n.width, n.height, -n.x, -n.y, 0);
}, UPNG.encode._prepareDiff = function(a, r, c, t, e) {
  UPNG._copyTile(a, r, c, t, e.width, e.height, -e.x, -e.y, 2);
}, UPNG.encode._filterZero = function(a, r, c, t, e, n, s) {
  var i, u = [], l = [0, 1, 2, 3, 4];
  n != -1 ? l = [n] : (r * t > 5e5 || c == 1) && (l = [0]), s && (i = { level: 0 });
  for (var m, p = UZIP, d = 0; d < l.length; d++) {
    for (var f = 0; f < r; f++)
      UPNG.encode._filterLine(e, a, f, t, c, l[d]);
    u.push(p.deflate(e, i));
  }
  var b = 1e9;
  for (d = 0; d < u.length; d++)
    u[d].length < b && (m = d, b = u[d].length);
  return u[m];
}, UPNG.encode._filterLine = function(a, r, c, t, e, n) {
  var s = c * t, i = s + c, u = UPNG.decode._paeth;
  if (a[i] = n, i++, n == 0)
    if (t < 500)
      for (var l = 0; l < t; l++)
        a[i + l] = r[s + l];
    else
      a.set(new Uint8Array(r.buffer, s, t), i);
  else if (n == 1) {
    for (l = 0; l < e; l++)
      a[i + l] = r[s + l];
    for (l = e; l < t; l++)
      a[i + l] = r[s + l] - r[s + l - e] + 256 & 255;
  } else if (c == 0) {
    for (l = 0; l < e; l++)
      a[i + l] = r[s + l];
    if (n == 2)
      for (l = e; l < t; l++)
        a[i + l] = r[s + l];
    if (n == 3)
      for (l = e; l < t; l++)
        a[i + l] = r[s + l] - (r[s + l - e] >> 1) + 256 & 255;
    if (n == 4)
      for (l = e; l < t; l++)
        a[i + l] = r[s + l] - u(r[s + l - e], 0, 0) + 256 & 255;
  } else {
    if (n == 2)
      for (l = 0; l < t; l++)
        a[i + l] = r[s + l] + 256 - r[s + l - t] & 255;
    if (n == 3) {
      for (l = 0; l < e; l++)
        a[i + l] = r[s + l] + 256 - (r[s + l - t] >> 1) & 255;
      for (l = e; l < t; l++)
        a[i + l] = r[s + l] + 256 - (r[s + l - t] + r[s + l - e] >> 1) & 255;
    }
    if (n == 4) {
      for (l = 0; l < e; l++)
        a[i + l] = r[s + l] + 256 - u(0, r[s + l - t], 0) & 255;
      for (l = e; l < t; l++)
        a[i + l] = r[s + l] + 256 - u(r[s + l - e], r[s + l - t], r[s + l - e - t]) & 255;
    }
  }
}, UPNG.crc = { table: function() {
  for (var a = new Uint32Array(256), r = 0; r < 256; r++) {
    for (var c = r, t = 0; t < 8; t++)
      1 & c ? c = 3988292384 ^ c >>> 1 : c >>>= 1;
    a[r] = c;
  }
  return a;
}(), update: function(r, c, t, e) {
  for (var n = 0; n < e; n++)
    r = UPNG.crc.table[255 & (r ^ c[t + n])] ^ r >>> 8;
  return r;
}, crc: function(r, c, t) {
  return 4294967295 ^ UPNG.crc.update(4294967295, r, c, t);
} }, UPNG.quantize = function(a, r) {
  var c, t = new Uint8Array(a), e = t.slice(0), n = new Uint32Array(e.buffer), s = UPNG.quantize.getKDtree(e, r), i = s[0], u = s[1], l = UPNG.quantize.planeDst, m = t, p = n, d = m.length, f = new Uint8Array(t.length >> 2);
  if (t.length < 2e7)
    for (var b = 0; b < d; b += 4) {
      var y = m[b] * 0.00392156862745098, h = m[b + 1] * (1 / 255), D = m[b + 2] * (1 / 255), _ = m[b + 3] * (1 / 255);
      c = UPNG.quantize.getNearest(i, y, h, D, _), f[b >> 2] = c.ind, p[b >> 2] = c.est.rgba;
    }
  else
    for (b = 0; b < d; b += 4) {
      for (y = m[b] * (1 / 255), h = m[b + 1] * (1 / 255), D = m[b + 2] * (1 / 255), _ = m[b + 3] * (1 / 255), c = i; c.left; )
        c = l(c.est, y, h, D, _) <= 0 ? c.left : c.right;
      f[b >> 2] = c.ind, p[b >> 2] = c.est.rgba;
    }
  return { abuf: e.buffer, inds: f, plte: u };
}, UPNG.quantize.getKDtree = function(a, r, c) {
  c == null && (c = 1e-4);
  var t = new Uint32Array(a.buffer), e = { i0: 0, i1: a.length, bst: null, est: null, tdst: 0, left: null, right: null };
  e.bst = UPNG.quantize.stats(a, e.i0, e.i1), e.est = UPNG.quantize.estats(e.bst);
  for (var n = [e]; n.length < r; ) {
    for (var s = 0, i = 0, u = 0; u < n.length; u++)
      n[u].est.L > s && (s = n[u].est.L, i = u);
    if (s < c)
      break;
    var l = n[i], m = UPNG.quantize.splitPixels(a, t, l.i0, l.i1, l.est.e, l.est.eMq255);
    if (l.i0 >= m || l.i1 <= m)
      l.est.L = 0;
    else {
      var p = { i0: l.i0, i1: m, bst: null, est: null, tdst: 0, left: null, right: null };
      p.bst = UPNG.quantize.stats(a, p.i0, p.i1), p.est = UPNG.quantize.estats(p.bst);
      var d = { i0: m, i1: l.i1, bst: null, est: null, tdst: 0, left: null, right: null };
      for (d.bst = { R: [], m: [], N: l.bst.N - p.bst.N }, u = 0; u < 16; u++)
        d.bst.R[u] = l.bst.R[u] - p.bst.R[u];
      for (u = 0; u < 4; u++)
        d.bst.m[u] = l.bst.m[u] - p.bst.m[u];
      d.est = UPNG.quantize.estats(d.bst), l.left = p, l.right = d, n[i] = p, n.push(d);
    }
  }
  for (n.sort(function(f, b) {
    return b.bst.N - f.bst.N;
  }), u = 0; u < n.length; u++)
    n[u].ind = u;
  return [e, n];
}, UPNG.quantize.getNearest = function(a, r, c, t, e) {
  if (a.left == null)
    return a.tdst = UPNG.quantize.dist(a.est.q, r, c, t, e), a;
  var n = UPNG.quantize.planeDst(a.est, r, c, t, e), s = a.left, i = a.right;
  n > 0 && (s = a.right, i = a.left);
  var u = UPNG.quantize.getNearest(s, r, c, t, e);
  if (u.tdst <= n * n)
    return u;
  var l = UPNG.quantize.getNearest(i, r, c, t, e);
  return l.tdst < u.tdst ? l : u;
}, UPNG.quantize.planeDst = function(a, r, c, t, e) {
  var n = a.e;
  return n[0] * r + n[1] * c + n[2] * t + n[3] * e - a.eMq;
}, UPNG.quantize.dist = function(a, r, c, t, e) {
  var n = r - a[0], s = c - a[1], i = t - a[2], u = e - a[3];
  return n * n + s * s + i * i + u * u;
}, UPNG.quantize.splitPixels = function(a, r, c, t, e, n) {
  var s = UPNG.quantize.vecDot;
  for (t -= 4; c < t; ) {
    for (; s(a, c, e) <= n; )
      c += 4;
    for (; s(a, t, e) > n; )
      t -= 4;
    if (c >= t)
      break;
    var i = r[c >> 2];
    r[c >> 2] = r[t >> 2], r[t >> 2] = i, c += 4, t -= 4;
  }
  for (; s(a, c, e) > n; )
    c -= 4;
  return c + 4;
}, UPNG.quantize.vecDot = function(a, r, c) {
  return a[r] * c[0] + a[r + 1] * c[1] + a[r + 2] * c[2] + a[r + 3] * c[3];
}, UPNG.quantize.stats = function(a, r, c) {
  for (var t = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], e = [0, 0, 0, 0], n = c - r >> 2, s = r; s < c; s += 4) {
    var i = a[s] * 0.00392156862745098, u = a[s + 1] * (1 / 255), l = a[s + 2] * (1 / 255), m = a[s + 3] * (1 / 255);
    e[0] += i, e[1] += u, e[2] += l, e[3] += m, t[0] += i * i, t[1] += i * u, t[2] += i * l, t[3] += i * m, t[5] += u * u, t[6] += u * l, t[7] += u * m, t[10] += l * l, t[11] += l * m, t[15] += m * m;
  }
  return t[4] = t[1], t[8] = t[2], t[9] = t[6], t[12] = t[3], t[13] = t[7], t[14] = t[11], { R: t, m: e, N: n };
}, UPNG.quantize.estats = function(a) {
  var r = a.R, c = a.m, t = a.N, e = c[0], n = c[1], s = c[2], i = c[3], u = t == 0 ? 0 : 1 / t, l = [r[0] - e * e * u, r[1] - e * n * u, r[2] - e * s * u, r[3] - e * i * u, r[4] - n * e * u, r[5] - n * n * u, r[6] - n * s * u, r[7] - n * i * u, r[8] - s * e * u, r[9] - s * n * u, r[10] - s * s * u, r[11] - s * i * u, r[12] - i * e * u, r[13] - i * n * u, r[14] - i * s * u, r[15] - i * i * u], m = l, p = UPNG.M4, d = [Math.random(), Math.random(), Math.random(), Math.random()], f = 0, b = 0;
  if (t != 0)
    for (var y = 0; y < 16 && (d = p.multVec(m, d), b = Math.sqrt(p.dot(d, d)), d = p.sml(1 / b, d), !(y != 0 && Math.abs(b - f) < 1e-9)); y++)
      f = b;
  var h = [e * u, n * u, s * u, i * u];
  return { Cov: l, q: h, e: d, L: f, eMq255: p.dot(p.sml(255, h), d), eMq: p.dot(d, h), rgba: (Math.round(255 * h[3]) << 24 | Math.round(255 * h[2]) << 16 | Math.round(255 * h[1]) << 8 | Math.round(255 * h[0]) << 0) >>> 0 };
}, UPNG.M4 = { multVec: function(r, c) {
  return [r[0] * c[0] + r[1] * c[1] + r[2] * c[2] + r[3] * c[3], r[4] * c[0] + r[5] * c[1] + r[6] * c[2] + r[7] * c[3], r[8] * c[0] + r[9] * c[1] + r[10] * c[2] + r[11] * c[3], r[12] * c[0] + r[13] * c[1] + r[14] * c[2] + r[15] * c[3]];
}, dot: function(r, c) {
  return r[0] * c[0] + r[1] * c[1] + r[2] * c[2] + r[3] * c[3];
}, sml: function(r, c) {
  return [r * c[0], r * c[1], r * c[2], r * c[3]];
} }, UPNG.encode.concatRGBA = function(a) {
  for (var r = 0, c = 0; c < a.length; c++)
    r += a[c].byteLength;
  var t = new Uint8Array(r), e = 0;
  for (c = 0; c < a.length; c++) {
    for (var n = new Uint8Array(a[c]), s = n.length, i = 0; i < s; i += 4) {
      var u = n[i], l = n[i + 1], m = n[i + 2], p = n[i + 3];
      p == 0 && (u = l = m = 0), t[e + i] = u, t[e + i + 1] = l, t[e + i + 2] = m, t[e + i + 3] = p;
    }
    e += s;
  }
  return t.buffer;
};
var BROWSER_NAME = { CHROME: "CHROME", FIREFOX: "FIREFOX", DESKTOP_SAFARI: "DESKTOP_SAFARI", IE: "IE", MOBILE_SAFARI: "MOBILE_SAFARI", ETC: "ETC" }, _BROWSER_NAME$CHROME$, MAX_CANVAS_SIZE = (_BROWSER_NAME$CHROME$ = {}, _defineProperty(_BROWSER_NAME$CHROME$, BROWSER_NAME.CHROME, 16384), _defineProperty(_BROWSER_NAME$CHROME$, BROWSER_NAME.FIREFOX, 11180), _defineProperty(_BROWSER_NAME$CHROME$, BROWSER_NAME.DESKTOP_SAFARI, 16384), _defineProperty(_BROWSER_NAME$CHROME$, BROWSER_NAME.IE, 8192), _defineProperty(_BROWSER_NAME$CHROME$, BROWSER_NAME.MOBILE_SAFARI, 4096), _defineProperty(_BROWSER_NAME$CHROME$, BROWSER_NAME.ETC, 8192), _BROWSER_NAME$CHROME$), isBrowser = typeof window < "u", moduleMapper = isBrowser && window.cordova && window.cordova.require && window.cordova.require("cordova/modulemapper"), CustomFile = isBrowser && (moduleMapper && moduleMapper.getOriginalSymbol(window, "File") || window.File !== void 0 && File), CustomFileReader = isBrowser && (moduleMapper && moduleMapper.getOriginalSymbol(window, "FileReader") || window.FileReader !== void 0 && FileReader);
function getFilefromDataUrl(a, r) {
  var c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Date.now();
  return new Promise(function(t) {
    for (var e = a.split(","), n = e[0].match(/:(.*?);/)[1], s = globalThis.atob(e[1]), i = s.length, u = new Uint8Array(i); i--; )
      u[i] = s.charCodeAt(i);
    var l = new Blob([u], { type: n });
    l.name = r, l.lastModified = c, t(l);
  });
}
function getDataUrlFromFile(a) {
  return new Promise(function(r, c) {
    var t = new CustomFileReader();
    t.onload = function() {
      return r(t.result);
    }, t.onerror = function(e) {
      return c(e);
    }, t.readAsDataURL(a);
  });
}
function loadImage(a) {
  return new Promise(function(r, c) {
    var t = new Image();
    t.onload = function() {
      return r(t);
    }, t.onerror = function(e) {
      return c(e);
    }, t.src = a;
  });
}
function getBrowserName() {
  if (getBrowserName.cachedResult !== void 0)
    return getBrowserName.cachedResult;
  var a = BROWSER_NAME.ETC, r = navigator.userAgent;
  return /Chrom(e|ium)/i.test(r) ? a = BROWSER_NAME.CHROME : /iP(ad|od|hone)/i.test(r) && /WebKit/i.test(r) && !/(CriOS|FxiOS|OPiOS|mercury)/i.test(r) ? a = BROWSER_NAME.MOBILE_SAFARI : /Safari/i.test(r) ? a = BROWSER_NAME.DESKTOP_SAFARI : /Firefox/i.test(r) ? a = BROWSER_NAME.FIREFOX : (/MSIE/i.test(r) || document.documentMode) && (a = BROWSER_NAME.IE), getBrowserName.cachedResult = a, getBrowserName.cachedResult;
}
function approximateBelowMaximumCanvasSizeOfBrowser(a, r) {
  for (var c = getBrowserName(), t = MAX_CANVAS_SIZE[c], e = a, n = r, s = e * n, i = e > n ? n / e : e / n; s > t * t; ) {
    var u = (t + e) / 2, l = (t + n) / 2;
    u < l ? (n = l, e = l * i) : (n = u * i, e = u), s = e * n;
  }
  return { width: e, height: n };
}
function getNewCanvasAndCtx(a, r) {
  var c, t;
  try {
    if ((t = (c = new OffscreenCanvas(a, r)).getContext("2d")) === null)
      throw new Error("getContext of OffscreenCanvas returns null");
  } catch {
    t = (c = document.createElement("canvas")).getContext("2d");
  }
  return c.width = a, c.height = r, [c, t];
}
function drawImageInCanvas(a) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : void 0, c = approximateBelowMaximumCanvasSizeOfBrowser(a.width, a.height), t = c.width, e = c.height, n = getNewCanvasAndCtx(t, e), s = _slicedToArray(n, 2), i = s[0], u = s[1];
  return r && /jpe?g/.test(r) && (u.fillStyle = "white", u.fillRect(0, 0, i.width, i.height)), u.drawImage(a, 0, 0, i.width, i.height), i;
}
function isIOS() {
  return isIOS.cachedResult !== void 0 || (isIOS.cachedResult = ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(navigator.platform) || navigator.userAgent.includes("Mac") && typeof document < "u" && "ontouchend" in document), isIOS.cachedResult;
}
function drawFileInCanvas(a) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return new Promise(function(c, t) {
    var e, n, s = function() {
      try {
        return n = drawImageInCanvas(e, r.fileType || a.type), c([e, n]);
      } catch (l) {
        return t(l);
      }
    }, i = function(l) {
      try {
        var m = function(d) {
          try {
            throw d;
          } catch (f) {
            return t(f);
          }
        };
        try {
          return getDataUrlFromFile(a).then(function(p) {
            try {
              return loadImage(p).then(function(d) {
                try {
                  return e = d, function() {
                    try {
                      return s();
                    } catch (b) {
                      return t(b);
                    }
                  }();
                } catch (f) {
                  return m(f);
                }
              }, m);
            } catch (d) {
              return m(d);
            }
          }, m);
        } catch (p) {
          m(p);
        }
      } catch (p) {
        return t(p);
      }
    };
    try {
      if (isIOS() || [BROWSER_NAME.DESKTOP_SAFARI, BROWSER_NAME.MOBILE_SAFARI].includes(getBrowserName()))
        throw new Error("Skip createImageBitmap on IOS and Safari");
      return createImageBitmap(a).then(function(u) {
        try {
          return e = u, s();
        } catch {
          return i();
        }
      }, i);
    } catch {
      i();
    }
  });
}
function canvasToFile(a, r, c, t) {
  var e = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1;
  return new Promise(function(n, s) {
    var i, u, l;
    if (r === "image/png")
      return u = a.getContext("2d").getImageData(0, 0, a.width, a.height).data, l = UPNG.encode([u], a.width, a.height, 256 * e), (i = new Blob([l], { type: r })).name = c, i.lastModified = t, m.call(this);
    {
      let p = function() {
        return m.call(this);
      };
      return typeof OffscreenCanvas == "function" && a instanceof OffscreenCanvas ? a.convertToBlob({ type: r, quality: e }).then((function(d) {
        try {
          return (i = d).name = c, i.lastModified = t, p.call(this);
        } catch (f) {
          return s(f);
        }
      }).bind(this), s) : getFilefromDataUrl(a.toDataURL(r, e), c, t).then((function(d) {
        try {
          return i = d, p.call(this);
        } catch (f) {
          return s(f);
        }
      }).bind(this), s);
    }
    function m() {
      return n(i);
    }
  });
}
function cleanupCanvasMemory(a) {
  a.width = 0, a.height = 0;
}
function isAutoOrientationInBrowser() {
  return new Promise(function(a, r) {
    var c, t, e, n;
    return isAutoOrientationInBrowser.cachedResult !== void 0 ? a(isAutoOrientationInBrowser.cachedResult) : getFilefromDataUrl("data:image/jpeg;base64,/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAAAAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAEAAgMBEQACEQEDEQH/xABKAAEAAAAAAAAAAAAAAAAAAAALEAEAAAAAAAAAAAAAAAAAAAAAAQEAAAAAAAAAAAAAAAAAAAAAEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8H//2Q==", "test.jpg", Date.now()).then(function(s) {
      try {
        return drawFileInCanvas(c = s).then(function(i) {
          try {
            return canvasToFile(t = i[1], c.type, c.name, c.lastModified).then(function(u) {
              try {
                return e = u, cleanupCanvasMemory(t), drawFileInCanvas(e).then(function(l) {
                  try {
                    return n = l[0], isAutoOrientationInBrowser.cachedResult = n.width === 1 && n.height === 2, a(isAutoOrientationInBrowser.cachedResult);
                  } catch (m) {
                    return r(m);
                  }
                }, r);
              } catch (l) {
                return r(l);
              }
            }, r);
          } catch (u) {
            return r(u);
          }
        }, r);
      } catch (i) {
        return r(i);
      }
    }, r);
  });
}
function getExifOrientation(a) {
  return new Promise(function(r, c) {
    var t = new CustomFileReader();
    t.onload = function(e) {
      var n = new DataView(e.target.result);
      if (n.getUint16(0, !1) != 65496)
        return r(-2);
      for (var s = n.byteLength, i = 2; i < s; ) {
        if (n.getUint16(i + 2, !1) <= 8)
          return r(-1);
        var u = n.getUint16(i, !1);
        if (i += 2, u == 65505) {
          if (n.getUint32(i += 2, !1) != 1165519206)
            return r(-1);
          var l = n.getUint16(i += 6, !1) == 18761;
          i += n.getUint32(i + 4, l);
          var m = n.getUint16(i, l);
          i += 2;
          for (var p = 0; p < m; p++)
            if (n.getUint16(i + 12 * p, l) == 274)
              return r(n.getUint16(i + 12 * p + 8, l));
        } else {
          if ((65280 & u) != 65280)
            break;
          i += n.getUint16(i, !1);
        }
      }
      return r(-1);
    }, t.onerror = function(e) {
      return c(e);
    }, t.readAsArrayBuffer(a);
  });
}
function handleMaxWidthOrHeight(a, r) {
  var c, t = a.width, e = a.height, n = r.maxWidthOrHeight, s = a;
  if (isFinite(n) && (t > n || e > n)) {
    var i = _slicedToArray(getNewCanvasAndCtx(t, e), 2);
    s = i[0], c = i[1], t > e ? (s.width = n, s.height = e / t * n) : (s.width = t / e * n, s.height = n), c.drawImage(a, 0, 0, s.width, s.height), cleanupCanvasMemory(a);
  }
  return s;
}
function followExifOrientation(a, r) {
  var c = a.width, t = a.height, e = _slicedToArray(getNewCanvasAndCtx(c, t), 2), n = e[0], s = e[1];
  switch (r > 4 && r < 9 ? (n.width = t, n.height = c) : (n.width = c, n.height = t), r) {
    case 2:
      s.transform(-1, 0, 0, 1, c, 0);
      break;
    case 3:
      s.transform(-1, 0, 0, -1, c, t);
      break;
    case 4:
      s.transform(1, 0, 0, -1, 0, t);
      break;
    case 5:
      s.transform(0, 1, 1, 0, 0, 0);
      break;
    case 6:
      s.transform(0, 1, -1, 0, t, 0);
      break;
    case 7:
      s.transform(0, -1, -1, 0, t, c);
      break;
    case 8:
      s.transform(0, -1, 1, 0, 0, c);
  }
  return s.drawImage(a, 0, 0, c, t), cleanupCanvasMemory(a), n;
}
function compress(a, r) {
  var c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
  return new Promise(function(t, e) {
    var n, s, i, u, l, m, p, d, f, b, y, h, D, _, x, j, w, A, R;
    function I() {
      var E = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 5;
      if (r.signal && r.signal.aborted)
        throw r.signal.reason;
      n += E, r.onProgress(Math.min(n, 100));
    }
    function k(E) {
      if (r.signal && r.signal.aborted)
        throw r.signal.reason;
      n = Math.min(Math.max(E, n), 100), r.onProgress(n);
    }
    return n = c, s = r.maxIteration || 10, i = 1024 * r.maxSizeMB * 1024, I(), drawFileInCanvas(a, r).then((function(E) {
      try {
        var z = _slicedToArray(E, 2);
        return u = z[1], I(), l = handleMaxWidthOrHeight(u, r), I(), new Promise(function(S, Q) {
          var P;
          if (!(P = r.exifOrientation))
            return getExifOrientation(a).then((function(F) {
              try {
                return P = F, O.call(this);
              } catch (V) {
                return Q(V);
              }
            }).bind(this), Q);
          function O() {
            return S(P);
          }
          return O.call(this);
        }).then((function(S) {
          try {
            return m = S, I(), isAutoOrientationInBrowser().then((function(Q) {
              try {
                return p = Q ? l : followExifOrientation(l, m), I(), d = r.initialQuality || 1, f = r.fileType || a.type, canvasToFile(p, f, a.name, a.lastModified, d).then((function(P) {
                  try {
                    {
                      let F = function() {
                        if (s-- && (x > i || x > D)) {
                          var q, ce, Z = _slicedToArray(getNewCanvasAndCtx(q = R ? 0.95 * A.width : A.width, ce = R ? 0.95 * A.height : A.height), 2);
                          return w = Z[0], Z[1].drawImage(A, 0, 0, q, ce), d *= 0.95, canvasToFile(w, f, a.name, a.lastModified, d).then(function(G) {
                            try {
                              return j = G, cleanupCanvasMemory(A), A = w, x = j.size, k(Math.min(99, Math.floor((_ - x) / (_ - i) * 100))), F;
                            } catch (J) {
                              return e(J);
                            }
                          }, e);
                        }
                        return [1];
                      }, V = function() {
                        return cleanupCanvasMemory(A), cleanupCanvasMemory(w), cleanupCanvasMemory(l), cleanupCanvasMemory(p), cleanupCanvasMemory(u), k(100), t(j);
                      };
                      if (b = P, I(), y = b.size > i, h = b.size > a.size, !y && !h)
                        return k(100), t(b);
                      var O;
                      return D = a.size, _ = b.size, x = _, A = p, R = !r.alwaysKeepResolution && y, (O = (function(q) {
                        for (; q; ) {
                          if (q.then)
                            return void q.then(O, e);
                          try {
                            if (q.pop) {
                              if (q.length)
                                return q.pop() ? V.call(this) : q;
                              q = F;
                            } else
                              q = q.call(this);
                          } catch (ce) {
                            return e(ce);
                          }
                        }
                      }).bind(this))(F);
                    }
                  } catch (F) {
                    return e(F);
                  }
                }).bind(this), e);
              } catch (P) {
                return e(P);
              }
            }).bind(this), e);
          } catch (Q) {
            return e(Q);
          }
        }).bind(this), e);
      } catch (S) {
        return e(S);
      }
    }).bind(this), e);
  });
}
var cnt = 0, imageCompressionLibUrl, worker;
function createWorker(a) {
  var r = [];
  return typeof a == "function" ? r.push("(".concat(a, ")()")) : r.push(a), new Worker(URL.createObjectURL(new Blob(r)));
}
function createSourceObject(a) {
  return URL.createObjectURL(new Blob([a], { type: "application/javascript" }));
}
function stringify(a) {
  return JSON.stringify(a, function(r, c) {
    return typeof c == "function" ? "BIC_FN:::(function () { return ".concat(c.toString(), " })()") : c;
  });
}
function parse(o) {
  if (typeof o == "string")
    return o;
  var result = {};
  return Object.entries(o).forEach(function(_ref) {
    var _ref2 = _slicedToArray(_ref, 2), key = _ref2[0], value = _ref2[1];
    if (typeof value == "string" && value.startsWith("BIC_FN:::"))
      try {
        result[key] = eval(value.replace(/^BIC_FN:::/, ""));
      } catch (a) {
        throw a;
      }
    else
      result[key] = parse(value);
  }), result;
}
function generateLib() {
  return createSourceObject(`
    // reconstruct library
    function imageCompression (){return (`.concat(imageCompression, `).apply(null, arguments)}

    imageCompression.getDataUrlFromFile = `).concat(imageCompression.getDataUrlFromFile, `
    imageCompression.getFilefromDataUrl = `).concat(imageCompression.getFilefromDataUrl, `
    imageCompression.loadImage = `).concat(imageCompression.loadImage, `
    imageCompression.drawImageInCanvas = `).concat(imageCompression.drawImageInCanvas, `
    imageCompression.drawFileInCanvas = `).concat(imageCompression.drawFileInCanvas, `
    imageCompression.canvasToFile = `).concat(imageCompression.canvasToFile, `
    imageCompression.getExifOrientation = `).concat(imageCompression.getExifOrientation, `
    imageCompression.handleMaxWidthOrHeight = `).concat(imageCompression.handleMaxWidthOrHeight, `
    imageCompression.followExifOrientation = `).concat(imageCompression.followExifOrientation, `
    imageCompression.cleanupCanvasMemory = `).concat(imageCompression.cleanupCanvasMemory, `
    imageCompression.isAutoOrientationInBrowser = `).concat(imageCompression.isAutoOrientationInBrowser, `
    imageCompression.approximateBelowMaximumCanvasSizeOfBrowser = `).concat(imageCompression.approximateBelowMaximumCanvasSizeOfBrowser, `
    imageCompression.getBrowserName = `).concat(imageCompression.getBrowserName, `

    // functions / objects
    getDataUrlFromFile = imageCompression.getDataUrlFromFile
    getFilefromDataUrl = imageCompression.getFilefromDataUrl
    loadImage = imageCompression.loadImage
    drawImageInCanvas = imageCompression.drawImageInCanvas
    drawFileInCanvas = imageCompression.drawFileInCanvas
    canvasToFile = imageCompression.canvasToFile
    getExifOrientation = imageCompression.getExifOrientation
    handleMaxWidthOrHeight = imageCompression.handleMaxWidthOrHeight
    followExifOrientation = imageCompression.followExifOrientation
    cleanupCanvasMemory = imageCompression.cleanupCanvasMemory
    isAutoOrientationInBrowser = imageCompression.isAutoOrientationInBrowser
    approximateBelowMaximumCanvasSizeOfBrowser = imageCompression.approximateBelowMaximumCanvasSizeOfBrowser
    getBrowserName = imageCompression.getBrowserName
    isIOS = `).concat(isIOS, `
    
    getNewCanvasAndCtx = `).concat(getNewCanvasAndCtx, `
    CustomFileReader = FileReader
    CustomFile = File
    MAX_CANVAS_SIZE = `).concat(JSON.stringify(MAX_CANVAS_SIZE), `
    BROWSER_NAME = `).concat(JSON.stringify(BROWSER_NAME), `
    function compress (){return (`).concat(compress, `).apply(null, arguments)}

    // core-js
    function _slicedToArray(arr, n) { return arr }
    function _typeof(a) { return typeof a }
    function _objectSpread2(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
  
        Object.assign(target, source)
      }
  
      return target;
    }

    // Libraries
    const parse = `).concat(parse, `
    const UPNG = {}
    UPNG.toRGBA8 = `).concat(UPNG.toRGBA8, `
    UPNG.toRGBA8.decodeImage = `).concat(UPNG.toRGBA8.decodeImage, `
    UPNG.decode = `).concat(UPNG.decode, `
    UPNG.decode._decompress = `).concat(UPNG.decode._decompress, `
    UPNG.decode._inflate = `).concat(UPNG.decode._inflate, `
    UPNG.decode._readInterlace = `).concat(UPNG.decode._readInterlace, `
    UPNG.decode._getBPP = `).concat(UPNG.decode._getBPP, ` 
    UPNG.decode._filterZero = `).concat(UPNG.decode._filterZero, `
    UPNG.decode._paeth = `).concat(UPNG.decode._paeth, `
    UPNG.decode._IHDR = `).concat(UPNG.decode._IHDR, `
    UPNG._bin = parse(`).concat(stringify(UPNG._bin), `)
    UPNG._copyTile = `).concat(UPNG._copyTile, `
    UPNG.encode = `).concat(UPNG.encode, `
    UPNG.encodeLL = `).concat(UPNG.encodeLL, ` 
    UPNG.encode._main = `).concat(UPNG.encode._main, `
    UPNG.encode.compressPNG = `).concat(UPNG.encode.compressPNG, ` 
    UPNG.encode.compress = `).concat(UPNG.encode.compress, `
    UPNG.encode.framize = `).concat(UPNG.encode.framize, ` 
    UPNG.encode._updateFrame = `).concat(UPNG.encode._updateFrame, ` 
    UPNG.encode._prepareDiff = `).concat(UPNG.encode._prepareDiff, ` 
    UPNG.encode._filterZero = `).concat(UPNG.encode._filterZero, ` 
    UPNG.encode._filterLine = `).concat(UPNG.encode._filterLine, `
    UPNG.encode.concatRGBA = `).concat(UPNG.encode.concatRGBA, `
    UPNG.crc = parse(`).concat(stringify(UPNG.crc), `)
    UPNG.crc.table = ( function() {
    var tab = new Uint32Array(256);
    for (var n=0; n<256; n++) {
      var c = n;
      for (var k=0; k<8; k++) {
        if (c & 1)  c = 0xedb88320 ^ (c >>> 1);
        else        c = c >>> 1;
      }
      tab[n] = c;  }
    return tab;  })()
    UPNG.quantize = `).concat(UPNG.quantize, ` 
    UPNG.quantize.getKDtree = `).concat(UPNG.quantize.getKDtree, ` 
    UPNG.quantize.getNearest = `).concat(UPNG.quantize.getNearest, ` 
    UPNG.quantize.planeDst = `).concat(UPNG.quantize.planeDst, ` 
    UPNG.quantize.dist = `).concat(UPNG.quantize.dist, `     
    UPNG.quantize.splitPixels = `).concat(UPNG.quantize.splitPixels, ` 
    UPNG.quantize.vecDot = `).concat(UPNG.quantize.vecDot, ` 
    UPNG.quantize.stats = `).concat(UPNG.quantize.stats, ` 
    UPNG.quantize.estats = `).concat(UPNG.quantize.estats, `
    UPNG.M4 = parse(`).concat(stringify(UPNG.M4), `)
    UPNG.encode.concatRGBA = `).concat(UPNG.encode.concatRGBA, `
    UPNG.inflateRaw=function(){
    var H={};H.H={};H.H.N=function(N,W){var R=Uint8Array,i=0,m=0,J=0,h=0,Q=0,X=0,u=0,w=0,d=0,v,C;
      if(N[0]==3&&N[1]==0)return W?W:new R(0);var V=H.H,n=V.b,A=V.e,l=V.R,M=V.n,I=V.A,e=V.Z,b=V.m,Z=W==null;
      if(Z)W=new R(N.length>>>2<<5);while(i==0){i=n(N,d,1);m=n(N,d+1,2);d+=3;if(m==0){if((d&7)!=0)d+=8-(d&7);
        var D=(d>>>3)+4,q=N[D-4]|N[D-3]<<8;if(Z)W=H.H.W(W,w+q);W.set(new R(N.buffer,N.byteOffset+D,q),w);d=D+q<<3;
        w+=q;continue}if(Z)W=H.H.W(W,w+(1<<17));if(m==1){v=b.J;C=b.h;X=(1<<9)-1;u=(1<<5)-1}if(m==2){J=A(N,d,5)+257;
        h=A(N,d+5,5)+1;Q=A(N,d+10,4)+4;d+=14;var E=d,j=1;for(var c=0;c<38;c+=2){b.Q[c]=0;b.Q[c+1]=0}for(var c=0;
                                                                                                        c<Q;c++){var K=A(N,d+c*3,3);b.Q[(b.X[c]<<1)+1]=K;if(K>j)j=K}d+=3*Q;M(b.Q,j);I(b.Q,j,b.u);v=b.w;C=b.d;
        d=l(b.u,(1<<j)-1,J+h,N,d,b.v);var r=V.V(b.v,0,J,b.C);X=(1<<r)-1;var S=V.V(b.v,J,h,b.D);u=(1<<S)-1;M(b.C,r);
        I(b.C,r,v);M(b.D,S);I(b.D,S,C)}while(!0){var T=v[e(N,d)&X];d+=T&15;var p=T>>>4;if(p>>>8==0){W[w++]=p}else if(p==256){break}else{var z=w+p-254;
        if(p>264){var _=b.q[p-257];z=w+(_>>>3)+A(N,d,_&7);d+=_&7}var $=C[e(N,d)&u];d+=$&15;var s=$>>>4,Y=b.c[s],a=(Y>>>4)+n(N,d,Y&15);
        d+=Y&15;while(w<z){W[w]=W[w++-a];W[w]=W[w++-a];W[w]=W[w++-a];W[w]=W[w++-a]}w=z}}}return W.length==w?W:W.slice(0,w)};
      H.H.W=function(N,W){var R=N.length;if(W<=R)return N;var V=new Uint8Array(R<<1);V.set(N,0);return V};
      H.H.R=function(N,W,R,V,n,A){var l=H.H.e,M=H.H.Z,I=0;while(I<R){var e=N[M(V,n)&W];n+=e&15;var b=e>>>4;
        if(b<=15){A[I]=b;I++}else{var Z=0,m=0;if(b==16){m=3+l(V,n,2);n+=2;Z=A[I-1]}else if(b==17){m=3+l(V,n,3);
          n+=3}else if(b==18){m=11+l(V,n,7);n+=7}var J=I+m;while(I<J){A[I]=Z;I++}}}return n};H.H.V=function(N,W,R,V){var n=0,A=0,l=V.length>>>1;
        while(A<R){var M=N[A+W];V[A<<1]=0;V[(A<<1)+1]=M;if(M>n)n=M;A++}while(A<l){V[A<<1]=0;V[(A<<1)+1]=0;A++}return n};
      H.H.n=function(N,W){var R=H.H.m,V=N.length,n,A,l,M,I,e=R.j;for(var M=0;M<=W;M++)e[M]=0;for(M=1;M<V;M+=2)e[N[M]]++;
        var b=R.K;n=0;e[0]=0;for(A=1;A<=W;A++){n=n+e[A-1]<<1;b[A]=n}for(l=0;l<V;l+=2){I=N[l+1];if(I!=0){N[l]=b[I];
          b[I]++}}};H.H.A=function(N,W,R){var V=N.length,n=H.H.m,A=n.r;for(var l=0;l<V;l+=2)if(N[l+1]!=0){var M=l>>1,I=N[l+1],e=M<<4|I,b=W-I,Z=N[l]<<b,m=Z+(1<<b);
        while(Z!=m){var J=A[Z]>>>15-W;R[J]=e;Z++}}};H.H.l=function(N,W){var R=H.H.m.r,V=15-W;for(var n=0;n<N.length;
                                                                                                 n+=2){var A=N[n]<<W-N[n+1];N[n]=R[A]>>>V}};H.H.M=function(N,W,R){R=R<<(W&7);var V=W>>>3;N[V]|=R;N[V+1]|=R>>>8};
      H.H.I=function(N,W,R){R=R<<(W&7);var V=W>>>3;N[V]|=R;N[V+1]|=R>>>8;N[V+2]|=R>>>16};H.H.e=function(N,W,R){return(N[W>>>3]|N[(W>>>3)+1]<<8)>>>(W&7)&(1<<R)-1};
      H.H.b=function(N,W,R){return(N[W>>>3]|N[(W>>>3)+1]<<8|N[(W>>>3)+2]<<16)>>>(W&7)&(1<<R)-1};H.H.Z=function(N,W){return(N[W>>>3]|N[(W>>>3)+1]<<8|N[(W>>>3)+2]<<16)>>>(W&7)};
      H.H.i=function(N,W){return(N[W>>>3]|N[(W>>>3)+1]<<8|N[(W>>>3)+2]<<16|N[(W>>>3)+3]<<24)>>>(W&7)};H.H.m=function(){var N=Uint16Array,W=Uint32Array;
        return{K:new N(16),j:new N(16),X:[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],S:[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,999,999,999],T:[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0],q:new N(32),p:[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,65535,65535],z:[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0],c:new W(32),J:new N(512),_:[],h:new N(32),$:[],w:new N(32768),C:[],v:[],d:new N(32768),D:[],u:new N(512),Q:[],r:new N(1<<15),s:new W(286),Y:new W(30),a:new W(19),t:new W(15e3),k:new N(1<<16),g:new N(1<<15)}}();
      (function(){var N=H.H.m,W=1<<15;for(var R=0;R<W;R++){var V=R;V=(V&2863311530)>>>1|(V&1431655765)<<1;
        V=(V&3435973836)>>>2|(V&858993459)<<2;V=(V&4042322160)>>>4|(V&252645135)<<4;V=(V&4278255360)>>>8|(V&16711935)<<8;
        N.r[R]=(V>>>16|V<<16)>>>17}function n(A,l,M){while(l--!=0)A.push(0,M)}for(var R=0;R<32;R++){N.q[R]=N.S[R]<<3|N.T[R];
        N.c[R]=N.p[R]<<4|N.z[R]}n(N._,144,8);n(N._,255-143,9);n(N._,279-255,7);n(N._,287-279,8);H.H.n(N._,9);
        H.H.A(N._,9,N.J);H.H.l(N._,9);n(N.$,32,5);H.H.n(N.$,5);H.H.A(N.$,5,N.h);H.H.l(N.$,5);n(N.Q,19,0);n(N.C,286,0);
        n(N.D,30,0);n(N.v,320,0)}());return H.H.N}()
    
    const UZIP = {}
    UZIP["parse"] = `).concat(UZIP_1.parse, `
    UZIP._readLocal = `).concat(UZIP_1._readLocal, `
    UZIP.inflateRaw = `).concat(UZIP_1.inflateRaw, `
    UZIP.inflate = `).concat(UZIP_1.inflate, `
    UZIP.deflate = `).concat(UZIP_1.deflate, `
    UZIP.deflateRaw = `).concat(UZIP_1.deflateRaw, `
    UZIP.encode = `).concat(UZIP_1.encode, `
    UZIP._noNeed = `).concat(UZIP_1._noNeed, `
    UZIP._writeHeader = `).concat(UZIP_1._writeHeader, `
    UZIP.crc = parse(`).concat(stringify(UZIP_1.crc), `)
    UZIP.crc.table = ( function() {
      var tab = new Uint32Array(256);
      for (var n=0; n<256; n++) {
        var c = n;
        for (var k=0; k<8; k++) {
          if (c & 1)  c = 0xedb88320 ^ (c >>> 1);
          else        c = c >>> 1;
        }
        tab[n] = c;  }
      return tab;  })()
    
    UZIP.adler = `).concat(UZIP_1.adler, `
    UZIP.bin = parse(`).concat(stringify(UZIP_1.bin), `)
    UZIP.F = {}
    UZIP.F.deflateRaw = `).concat(UZIP_1.F.deflateRaw, `
    UZIP.F._bestMatch = `).concat(UZIP_1.F._bestMatch, `
    UZIP.F._howLong = `).concat(UZIP_1.F._howLong, `
    UZIP.F._hash = `).concat(UZIP_1.F._hash, `
    UZIP.saved = `).concat(UZIP_1.saved, `
    UZIP.F._writeBlock = `).concat(UZIP_1.F._writeBlock, `
    UZIP.F._copyExact = `).concat(UZIP_1.F._copyExact, `
    UZIP.F.getTrees = `).concat(UZIP_1.F.getTrees, `
    UZIP.F.getSecond = `).concat(UZIP_1.F.getSecond, `
    UZIP.F.nonZero = `).concat(UZIP_1.F.nonZero, `
    UZIP.F.contSize = `).concat(UZIP_1.F.contSize, `
    UZIP.F._codeTiny = `).concat(UZIP_1.F._codeTiny, ` 
    UZIP.F._lenCodes = `).concat(UZIP_1.F._lenCodes, ` 
    UZIP.F._hufTree = `).concat(UZIP_1.F._hufTree, ` 
    UZIP.F.setDepth = `).concat(UZIP_1.F.setDepth, ` 
    UZIP.F.restrictDepth = `).concat(UZIP_1.F.restrictDepth, `
    UZIP.F._goodIndex = `).concat(UZIP_1.F._goodIndex, ` 
    UZIP.F._writeLit = `).concat(UZIP_1.F._writeLit, ` 
    UZIP.F.inflate = `).concat(UZIP_1.F.inflate, ` 
    UZIP.F._check = `).concat(UZIP_1.F._check, ` 
    UZIP.F._decodeTiny = `).concat(UZIP_1.F._decodeTiny, ` 
    UZIP.F._copyOut = `).concat(UZIP_1.F._copyOut, ` 
    UZIP.F.makeCodes = `).concat(UZIP_1.F.makeCodes, ` 
    UZIP.F.codes2map = `).concat(UZIP_1.F.codes2map, ` 
    UZIP.F.revCodes = `).concat(UZIP_1.F.revCodes, ` 

    // used only in deflate
    UZIP.F._putsE = `).concat(UZIP_1.F._putsE, `
    UZIP.F._putsF = `).concat(UZIP_1.F._putsF, `
  
    UZIP.F._bitsE = `).concat(UZIP_1.F._bitsE, `
    UZIP.F._bitsF = `).concat(UZIP_1.F._bitsF, `

    UZIP.F._get17 = `).concat(UZIP_1.F._get17, `
    UZIP.F._get25 = `).concat(UZIP_1.F._get25, `
    UZIP.F.U = function(){
      var u16=Uint16Array, u32=Uint32Array;
      return {
        next_code : new u16(16),
        bl_count  : new u16(16),
        ordr : [ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ],
        of0  : [3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,999,999,999],
        exb  : [0,0,0,0,0,0,0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4,  4,  5,  5,  5,  5,  0,  0,  0,  0],
        ldef : new u16(32),
        df0  : [1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577, 65535, 65535],
        dxb  : [0,0,0,0,1,1,2, 2, 3, 3, 4, 4, 5, 5,  6,  6,  7,  7,  8,  8,   9,   9,  10,  10,  11,  11,  12,   12,   13,   13,     0,     0],
        ddef : new u32(32),
        flmap: new u16(  512),  fltree: [],
        fdmap: new u16(   32),  fdtree: [],
        lmap : new u16(32768),  ltree : [],  ttree:[],
        dmap : new u16(32768),  dtree : [],
        imap : new u16(  512),  itree : [],
        //rev9 : new u16(  512)
        rev15: new u16(1<<15),
        lhst : new u32(286), dhst : new u32( 30), ihst : new u32(19),
        lits : new u32(15000),
        strt : new u16(1<<16),
        prev : new u16(1<<15)
      };
    } ();

    (function(){
      var U = UZIP.F.U;
      var len = 1<<15;
      for(var i=0; i<len; i++) {
        var x = i;
        x = (((x & 0xaaaaaaaa) >>> 1) | ((x & 0x55555555) << 1));
        x = (((x & 0xcccccccc) >>> 2) | ((x & 0x33333333) << 2));
        x = (((x & 0xf0f0f0f0) >>> 4) | ((x & 0x0f0f0f0f) << 4));
        x = (((x & 0xff00ff00) >>> 8) | ((x & 0x00ff00ff) << 8));
        U.rev15[i] = (((x >>> 16) | (x << 16)))>>>17;
      }
  
      function pushV(tgt, n, sv) {  while(n--!=0) tgt.push(0,sv);  }
  
      for(var i=0; i<32; i++) {  U.ldef[i]=(U.of0[i]<<3)|U.exb[i];  U.ddef[i]=(U.df0[i]<<4)|U.dxb[i];  }
  
      pushV(U.fltree, 144, 8);  pushV(U.fltree, 255-143, 9);  pushV(U.fltree, 279-255, 7);  pushV(U.fltree,287-279,8);
      /*
        var i = 0;
        for(; i<=143; i++) U.fltree.push(0,8);
        for(; i<=255; i++) U.fltree.push(0,9);
        for(; i<=279; i++) U.fltree.push(0,7);
        for(; i<=287; i++) U.fltree.push(0,8);
        */
      UZIP.F.makeCodes(U.fltree, 9);
      UZIP.F.codes2map(U.fltree, 9, U.flmap);
      UZIP.F.revCodes (U.fltree, 9)
  
      pushV(U.fdtree,32,5);
      //for(i=0;i<32; i++) U.fdtree.push(0,5);
      UZIP.F.makeCodes(U.fdtree, 5);
      UZIP.F.codes2map(U.fdtree, 5, U.fdmap);
      UZIP.F.revCodes (U.fdtree, 5)
  
      pushV(U.itree,19,0);  pushV(U.ltree,286,0);  pushV(U.dtree,30,0);  pushV(U.ttree,320,0);
      /*
        for(var i=0; i< 19; i++) U.itree.push(0,0);
        for(var i=0; i<286; i++) U.ltree.push(0,0);
        for(var i=0; i< 30; i++) U.dtree.push(0,0);
        for(var i=0; i<320; i++) U.ttree.push(0,0);
        */
    })()
    `));
}
function generateWorkerScript() {
  return createWorker(`
    let scriptImported = false
    self.addEventListener('message', async (e) => {
      const { file, id, imageCompressionLibUrl, options } = e.data
      options.onProgress = (progress) => self.postMessage({ progress, id })
      try {
        if (!scriptImported) {
          // console.log('[worker] importScripts', imageCompressionLibUrl)
          self.importScripts(imageCompressionLibUrl)
          scriptImported = true
        }
        // console.log('[worker] self', self)
        const compressedFile = await imageCompression(file, options)
        self.postMessage({ file: compressedFile, id })
      } catch (e) {
        // console.error('[worker] error', e)
        self.postMessage({ error: e.message + '\\n' + e.stack, id })
      }
    })
  `);
}
function compressOnWebWorker(a, r) {
  return new Promise(function(c, t) {
    var e = cnt += 1;
    imageCompressionLibUrl || (imageCompressionLibUrl = generateLib()), worker || (worker = generateWorkerScript()), worker.addEventListener("message", function n(s) {
      if (s.data.id === e) {
        if (r.signal && r.signal.aborted)
          return;
        if (s.data.progress !== void 0)
          return void r.onProgress(s.data.progress);
        worker.removeEventListener("message", n), s.data.error && t(new Error(s.data.error)), c(s.data.file);
      }
    }), worker.addEventListener("error", t), r.signal && r.signal.addEventListener("abort", function() {
      worker.terminate(), t(r.signal.reason);
    }), worker.postMessage({ file: a, id: e, imageCompressionLibUrl, options: _objectSpread2(_objectSpread2({}, r), {}, { onProgress: void 0, signal: void 0 }) });
  });
}
function imageCompression(a, r) {
  return new Promise(function(c, t) {
    var e, n, s, i, u, l;
    if (e = _objectSpread2({}, r), s = 0, i = e.onProgress, e.maxSizeMB = e.maxSizeMB || Number.POSITIVE_INFINITY, u = typeof e.useWebWorker != "boolean" || e.useWebWorker, delete e.useWebWorker, e.onProgress = function(f) {
      s = f, typeof i == "function" && i(s);
    }, !(a instanceof Blob || a instanceof CustomFile))
      return t(new Error("The file given is not an instance of Blob or File"));
    if (!/^image/.test(a.type))
      return t(new Error("The file given is not an image"));
    if (l = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope, !u || typeof Worker != "function" || l)
      return compress(a, e).then((function(f) {
        try {
          return n = f, d.call(this);
        } catch (b) {
          return t(b);
        }
      }).bind(this), t);
    var m = (function() {
      try {
        return d.call(this);
      } catch (f) {
        return t(f);
      }
    }).bind(this), p = function(b) {
      try {
        return compress(a, e).then(function(y) {
          try {
            return n = y, m();
          } catch (h) {
            return t(h);
          }
        }, t);
      } catch (y) {
        return t(y);
      }
    };
    try {
      return compressOnWebWorker(a, e).then(function(f) {
        try {
          return n = f, m();
        } catch {
          return p();
        }
      }, p);
    } catch {
      p();
    }
    function d() {
      try {
        n.name = a.name, n.lastModified = a.lastModified;
      } catch {
      }
      return c(n);
    }
  });
}
imageCompression.getDataUrlFromFile = getDataUrlFromFile, imageCompression.getFilefromDataUrl = getFilefromDataUrl, imageCompression.loadImage = loadImage, imageCompression.drawImageInCanvas = drawImageInCanvas, imageCompression.drawFileInCanvas = drawFileInCanvas, imageCompression.canvasToFile = canvasToFile, imageCompression.getExifOrientation = getExifOrientation, imageCompression.handleMaxWidthOrHeight = handleMaxWidthOrHeight, imageCompression.followExifOrientation = followExifOrientation, imageCompression.cleanupCanvasMemory = cleanupCanvasMemory, imageCompression.isAutoOrientationInBrowser = isAutoOrientationInBrowser, imageCompression.approximateBelowMaximumCanvasSizeOfBrowser = approximateBelowMaximumCanvasSizeOfBrowser, imageCompression.getBrowserName = getBrowserName, imageCompression.version = "2.0.0";
const ImageCompression = async (a) => {
  const r = useAppThunkDispatch(), c = a, t = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: !0
  };
  try {
    if (c)
      return await imageCompression(c, t);
  } catch {
    handleSnackbar(
      !0,
      "warning",
      "Failed to Compress the Uploaded Image:Try again",
      r
    );
  }
}, UpdateProfileImageComponent = ({
  ParentComponentType: a,
  OperationType: r,
  EventDetails: c,
  setEventDetails: t,
  setIsUpdating: e,
  MazjidId: n
}) => {
  const [s, i] = useState(!0), [u, l] = useState(!1), [m, p] = useState(!1), [d, f] = useState(
    void 0
  );
  let b = useRef(null), y = useRef(null);
  const [h, D] = useState({ uploadPercentage: 0 }), [_, x] = useState(void 0);
  useAppSelector((E) => E.admin);
  const j = useNavigate(), w = useAppThunkDispatch(), A = (E) => {
    E.target.files && E.target.files.length > 0 && (f(E.target.files[0]), x(E.target.files[0]), i(!s));
  }, R = (E) => {
    isValidHttpUrl(E.target.value) ? getJpegFromUrl(E.target.value, f) : handleSnackbar(!0, "error", "The Entered Url Is Not Valid", w);
  }, I = (E) => {
    const z = new FormData();
    z.append("image", E), l(!0);
    const S = {
      onUploadProgress: (Q) => {
        const { loaded: P, total: O } = Q;
        let F = Math.floor(P * 100 / O);
        F < 100 && D({ uploadPercentage: F });
      }
    };
    a === "Event" ? API.post(
      "v1/admin/events/addEventMedia/" + c._id,
      z,
      S
    ).then((Q) => {
      setTimeout(() => {
        D({ uploadPercentage: 0 });
      }, 700), t(Q.data.data), setTimeout(() => {
        e(!1), l(!1), i(!s), y != null && y.current && (y.current.value = ""), f(void 0);
      }, 3e3);
    }).catch((Q) => {
      console.log(Q), handleSnackbar(!0, "error", "Adding Event Media Failed", w);
    }) : API.post("media/" + n + "/upload", z, S).then((Q) => {
      setTimeout(() => {
        D({ uploadPercentage: 0 });
      }, 700), w(getAdminMasjid(n)), setTimeout(() => {
        l(!1), i(!s), f(void 0), j("/masjidprofile");
      }, 3e3);
    }).catch((Q) => {
      console.log(Q), handleSnackbar(!0, "error", "Adding Masjid Media Failed", w);
    });
  }, k = () => {
    a === "Event" ? r === "Update" ? ImageCompression(d).then((z) => {
      z && I(z);
    }) : ImageCompression(d).then((z) => {
      z && I(z);
    }) : r === "ADD" ? ImageCompression(d).then((z) => {
      z && I(z);
    }) : ImageCompression(d).then((z) => {
      z && I(z);
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "UpdateProfileImageContainerMazjid", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "TopoFImage", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ImageDisplayComponentMazjid", children: d ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ImagePreviewMazjid", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "deleteImage", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          MdCancel,
          {
            className: "deleteiconImageUpload",
            onClick: (E) => {
              f(void 0), y.current && (y.current.value = "");
            }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: URL.createObjectURL(d),
            className: "selectedImageMasjid",
            alt: "Thumb"
          }
        )
      ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: _ ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: URL.createObjectURL(_),
          className: "selectedImageMasjidDisplay",
          alt: "Thumb"
        }
      ) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: placeholder,
            alt: "imageplaceholder",
            className: "placeholderImageMazjid",
            onClick: (E) => {
              b.current && b.current.click();
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            hidden: !0,
            accept: "image/*",
            multiple: !0,
            type: "file",
            ref: b,
            onChange: A
          }
        )
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: u && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "progressbar-container-masjid", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "progressbar-complete-masjid",
            style: { width: `${h.uploadPercentage}%` },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "progressbar-liquid-mazjid" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "progress-masjid", children: [
          h.uploadPercentage,
          "%"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "BottomOfImage", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ImageUploadOptionsMazjid", children: d ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "FinalUploadButtonMazjid", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "contained",
          color: "success",
          disabled: u,
          component: "label",
          onClick: k,
          children: "Upload Images"
        }
      ) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "contained",
            color: "success",
            disabled: u,
            component: "label",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  hidden: !0,
                  accept: "image/*",
                  multiple: !0,
                  type: "file",
                  ref: b,
                  onChange: A
                }
              ),
              "Choose Images"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "contained",
            color: "success",
            component: "label",
            onClick: (E) => p(!0),
            children: "Add Links"
          }
        )
      ] }) }),
      m && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "PasteBoxForLinkMasjid", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "url",
            id: "url-field",
            pattern: "^https?://.*$",
            autoFocus: !0,
            ref: y,
            className: "InputPasteLinkMazjid",
            onChange: (E) => {
              R(E);
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AiOutlineCloseCircle,
          {
            className: "TextBoxRightIconMazjid",
            onClick: (E) => p(!1)
          }
        )
      ] }) })
    ] })
  ] }) });
};
var lib = function(a) {
  var r = {};
  function c(t) {
    if (r[t])
      return r[t].exports;
    var e = r[t] = { i: t, l: !1, exports: {} };
    return a[t].call(e.exports, e, e.exports, c), e.l = !0, e.exports;
  }
  return c.m = a, c.c = r, c.d = function(t, e, n) {
    c.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n });
  }, c.r = function(t) {
    typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 });
  }, c.t = function(t, e) {
    if (1 & e && (t = c(t)), 8 & e || 4 & e && typeof t == "object" && t && t.__esModule)
      return t;
    var n = /* @__PURE__ */ Object.create(null);
    if (c.r(n), Object.defineProperty(n, "default", { enumerable: !0, value: t }), 2 & e && typeof t != "string")
      for (var s in t)
        c.d(n, s, (function(i) {
          return t[i];
        }).bind(null, s));
    return n;
  }, c.n = function(t) {
    var e = t && t.__esModule ? function() {
      return t.default;
    } : function() {
      return t;
    };
    return c.d(e, "a", e), e;
  }, c.o = function(t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
  }, c.p = "", c(c.s = 9);
}([function(a, r) {
  a.exports = React__default;
}, function(a, r, c) {
  var t;
  /*!
    Copyright (c) 2017 Jed Watson.
    Licensed under the MIT License (MIT), see
    http://jedwatson.github.io/classnames
  */
  (function() {
    var e = {}.hasOwnProperty;
    function n() {
      for (var s = [], i = 0; i < arguments.length; i++) {
        var u = arguments[i];
        if (u) {
          var l = typeof u;
          if (l === "string" || l === "number")
            s.push(u);
          else if (Array.isArray(u) && u.length) {
            var m = n.apply(null, u);
            m && s.push(m);
          } else if (l === "object")
            for (var p in u)
              e.call(u, p) && u[p] && s.push(p);
        }
      }
      return s.join(" ");
    }
    a.exports ? (n.default = n, a.exports = n) : (t = (function() {
      return n;
    }).apply(r, [])) === void 0 || (a.exports = t);
  })();
}, function(a, r, c) {
  (function(t) {
    var e = /^\s+|\s+$/g, n = /^[-+]0x[0-9a-f]+$/i, s = /^0b[01]+$/i, i = /^0o[0-7]+$/i, u = parseInt, l = typeof t == "object" && t && t.Object === Object && t, m = typeof self == "object" && self && self.Object === Object && self, p = l || m || Function("return this")(), d = Object.prototype.toString, f = p.Symbol, b = f ? f.prototype : void 0, y = b ? b.toString : void 0;
    function h(j) {
      if (typeof j == "string")
        return j;
      if (_(j))
        return y ? y.call(j) : "";
      var w = j + "";
      return w == "0" && 1 / j == -1 / 0 ? "-0" : w;
    }
    function D(j) {
      var w = typeof j;
      return !!j && (w == "object" || w == "function");
    }
    function _(j) {
      return typeof j == "symbol" || /* @__PURE__ */ function(w) {
        return !!w && typeof w == "object";
      }(j) && d.call(j) == "[object Symbol]";
    }
    function x(j) {
      return j ? (j = function(w) {
        if (typeof w == "number")
          return w;
        if (_(w))
          return NaN;
        if (D(w)) {
          var A = typeof w.valueOf == "function" ? w.valueOf() : w;
          w = D(A) ? A + "" : A;
        }
        if (typeof w != "string")
          return w === 0 ? w : +w;
        w = w.replace(e, "");
        var R = s.test(w);
        return R || i.test(w) ? u(w.slice(2), R ? 2 : 8) : n.test(w) ? NaN : +w;
      }(j)) === 1 / 0 || j === -1 / 0 ? 17976931348623157e292 * (j < 0 ? -1 : 1) : j == j ? j : 0 : j === 0 ? j : 0;
    }
    a.exports = function(j, w, A) {
      var R, I, k, E;
      return j = (R = j) == null ? "" : h(R), I = function(z) {
        var S = x(z), Q = S % 1;
        return S == S ? Q ? S - Q : S : 0;
      }(A), k = 0, E = j.length, I == I && (E !== void 0 && (I = I <= E ? I : E), k !== void 0 && (I = I >= k ? I : k)), A = I, w = h(w), j.slice(A, A + w.length) == w;
    };
  }).call(this, c(3));
}, function(a, r) {
  var c;
  c = /* @__PURE__ */ function() {
    return this;
  }();
  try {
    c = c || new Function("return this")();
  } catch {
    typeof window == "object" && (c = window);
  }
  a.exports = c;
}, function(a, r, c) {
  (function(t) {
    var e = /^\[object .+?Constructor\]$/, n = typeof t == "object" && t && t.Object === Object && t, s = typeof self == "object" && self && self.Object === Object && self, i = n || s || Function("return this")(), u, l = Array.prototype, m = Function.prototype, p = Object.prototype, d = i["__core-js_shared__"], f = (u = /[^.]+$/.exec(d && d.keys && d.keys.IE_PROTO || "")) ? "Symbol(src)_1." + u : "", b = m.toString, y = p.hasOwnProperty, h = p.toString, D = RegExp("^" + b.call(y).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), _ = l.splice, x = z(i, "Map"), j = z(Object, "create");
    function w(P) {
      var O = -1, F = P ? P.length : 0;
      for (this.clear(); ++O < F; ) {
        var V = P[O];
        this.set(V[0], V[1]);
      }
    }
    function A(P) {
      var O = -1, F = P ? P.length : 0;
      for (this.clear(); ++O < F; ) {
        var V = P[O];
        this.set(V[0], V[1]);
      }
    }
    function R(P) {
      var O = -1, F = P ? P.length : 0;
      for (this.clear(); ++O < F; ) {
        var V = P[O];
        this.set(V[0], V[1]);
      }
    }
    function I(P, O) {
      for (var F, V, q = P.length; q--; )
        if ((F = P[q][0]) === (V = O) || F != F && V != V)
          return q;
      return -1;
    }
    function k(P) {
      return !(!Q(P) || (O = P, f && f in O)) && (function(F) {
        var V = Q(F) ? h.call(F) : "";
        return V == "[object Function]" || V == "[object GeneratorFunction]";
      }(P) || function(F) {
        var V = !1;
        if (F != null && typeof F.toString != "function")
          try {
            V = !!(F + "");
          } catch {
          }
        return V;
      }(P) ? D : e).test(function(F) {
        if (F != null) {
          try {
            return b.call(F);
          } catch {
          }
          try {
            return F + "";
          } catch {
          }
        }
        return "";
      }(P));
      var O;
    }
    function E(P, O) {
      var F, V, q = P.__data__;
      return ((V = typeof (F = O)) == "string" || V == "number" || V == "symbol" || V == "boolean" ? F !== "__proto__" : F === null) ? q[typeof O == "string" ? "string" : "hash"] : q.map;
    }
    function z(P, O) {
      var F = function(V, q) {
        return V == null ? void 0 : V[q];
      }(P, O);
      return k(F) ? F : void 0;
    }
    function S(P, O) {
      if (typeof P != "function" || O && typeof O != "function")
        throw new TypeError("Expected a function");
      var F = function() {
        var V = arguments, q = O ? O.apply(this, V) : V[0], ce = F.cache;
        if (ce.has(q))
          return ce.get(q);
        var Z = P.apply(this, V);
        return F.cache = ce.set(q, Z), Z;
      };
      return F.cache = new (S.Cache || R)(), F;
    }
    function Q(P) {
      var O = typeof P;
      return !!P && (O == "object" || O == "function");
    }
    w.prototype.clear = function() {
      this.__data__ = j ? j(null) : {};
    }, w.prototype.delete = function(P) {
      return this.has(P) && delete this.__data__[P];
    }, w.prototype.get = function(P) {
      var O = this.__data__;
      if (j) {
        var F = O[P];
        return F === "__lodash_hash_undefined__" ? void 0 : F;
      }
      return y.call(O, P) ? O[P] : void 0;
    }, w.prototype.has = function(P) {
      var O = this.__data__;
      return j ? O[P] !== void 0 : y.call(O, P);
    }, w.prototype.set = function(P, O) {
      return this.__data__[P] = j && O === void 0 ? "__lodash_hash_undefined__" : O, this;
    }, A.prototype.clear = function() {
      this.__data__ = [];
    }, A.prototype.delete = function(P) {
      var O = this.__data__, F = I(O, P);
      return !(F < 0) && (F == O.length - 1 ? O.pop() : _.call(O, F, 1), !0);
    }, A.prototype.get = function(P) {
      var O = this.__data__, F = I(O, P);
      return F < 0 ? void 0 : O[F][1];
    }, A.prototype.has = function(P) {
      return I(this.__data__, P) > -1;
    }, A.prototype.set = function(P, O) {
      var F = this.__data__, V = I(F, P);
      return V < 0 ? F.push([P, O]) : F[V][1] = O, this;
    }, R.prototype.clear = function() {
      this.__data__ = { hash: new w(), map: new (x || A)(), string: new w() };
    }, R.prototype.delete = function(P) {
      return E(this, P).delete(P);
    }, R.prototype.get = function(P) {
      return E(this, P).get(P);
    }, R.prototype.has = function(P) {
      return E(this, P).has(P);
    }, R.prototype.set = function(P, O) {
      return E(this, P).set(P, O), this;
    }, S.Cache = R, a.exports = S;
  }).call(this, c(3));
}, function(a, r, c) {
  (function(t) {
    var e = /^\s+|\s+$/g, n = /^[-+]0x[0-9a-f]+$/i, s = /^0b[01]+$/i, i = /^0o[0-7]+$/i, u = parseInt, l = typeof t == "object" && t && t.Object === Object && t, m = typeof self == "object" && self && self.Object === Object && self, p = l || m || Function("return this")(), d = Object.prototype.toString, f = Math.max, b = Math.min, y = function() {
      return p.Date.now();
    };
    function h(_) {
      var x = typeof _;
      return !!_ && (x == "object" || x == "function");
    }
    function D(_) {
      if (typeof _ == "number")
        return _;
      if (function(w) {
        return typeof w == "symbol" || /* @__PURE__ */ function(A) {
          return !!A && typeof A == "object";
        }(w) && d.call(w) == "[object Symbol]";
      }(_))
        return NaN;
      if (h(_)) {
        var x = typeof _.valueOf == "function" ? _.valueOf() : _;
        _ = h(x) ? x + "" : x;
      }
      if (typeof _ != "string")
        return _ === 0 ? _ : +_;
      _ = _.replace(e, "");
      var j = s.test(_);
      return j || i.test(_) ? u(_.slice(2), j ? 2 : 8) : n.test(_) ? NaN : +_;
    }
    a.exports = function(_, x, j) {
      var w, A, R, I, k, E, z = 0, S = !1, Q = !1, P = !0;
      if (typeof _ != "function")
        throw new TypeError("Expected a function");
      function O(G) {
        var J = w, ee = A;
        return w = A = void 0, z = G, I = _.apply(ee, J);
      }
      function F(G) {
        return z = G, k = setTimeout(q, x), S ? O(G) : I;
      }
      function V(G) {
        var J = G - E;
        return E === void 0 || J >= x || J < 0 || Q && G - z >= R;
      }
      function q() {
        var G = y();
        if (V(G))
          return ce(G);
        k = setTimeout(q, function(J) {
          var ee = x - (J - E);
          return Q ? b(ee, R - (J - z)) : ee;
        }(G));
      }
      function ce(G) {
        return k = void 0, P && w ? O(G) : (w = A = void 0, I);
      }
      function Z() {
        var G = y(), J = V(G);
        if (w = arguments, A = this, E = G, J) {
          if (k === void 0)
            return F(E);
          if (Q)
            return k = setTimeout(q, x), O(E);
        }
        return k === void 0 && (k = setTimeout(q, x)), I;
      }
      return x = D(x) || 0, h(j) && (S = !!j.leading, R = (Q = "maxWait" in j) ? f(D(j.maxWait) || 0, x) : R, P = "trailing" in j ? !!j.trailing : P), Z.cancel = function() {
        k !== void 0 && clearTimeout(k), z = 0, w = E = A = k = void 0;
      }, Z.flush = function() {
        return k === void 0 ? I : ce(y());
      }, Z;
    };
  }).call(this, c(3));
}, function(a, r, c) {
  (function(t, e) {
    var n = "[object Arguments]", s = "[object Map]", i = "[object Object]", u = "[object Set]", l = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, m = /^\w*$/, p = /^\./, d = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, f = /\\(\\)?/g, b = /^\[object .+?Constructor\]$/, y = /^(?:0|[1-9]\d*)$/, h = {};
    h["[object Float32Array]"] = h["[object Float64Array]"] = h["[object Int8Array]"] = h["[object Int16Array]"] = h["[object Int32Array]"] = h["[object Uint8Array]"] = h["[object Uint8ClampedArray]"] = h["[object Uint16Array]"] = h["[object Uint32Array]"] = !0, h[n] = h["[object Array]"] = h["[object ArrayBuffer]"] = h["[object Boolean]"] = h["[object DataView]"] = h["[object Date]"] = h["[object Error]"] = h["[object Function]"] = h[s] = h["[object Number]"] = h[i] = h["[object RegExp]"] = h[u] = h["[object String]"] = h["[object WeakMap]"] = !1;
    var D = typeof t == "object" && t && t.Object === Object && t, _ = typeof self == "object" && self && self.Object === Object && self, x = D || _ || Function("return this")(), j = r && !r.nodeType && r, w = j && typeof e == "object" && e && !e.nodeType && e, A = w && w.exports === j && D.process, R = function() {
      try {
        return A && A.binding("util");
      } catch {
      }
    }(), I = R && R.isTypedArray;
    function k(v, C, B, L) {
      var ne = -1, re = v ? v.length : 0;
      for (L && re && (B = v[++ne]); ++ne < re; )
        B = C(B, v[ne], ne, v);
      return B;
    }
    function E(v, C) {
      for (var B = -1, L = v ? v.length : 0; ++B < L; )
        if (C(v[B], B, v))
          return !0;
      return !1;
    }
    function z(v, C, B, L, ne) {
      return ne(v, function(re, ue, we) {
        B = L ? (L = !1, re) : C(B, re, ue, we);
      }), B;
    }
    function S(v) {
      var C = !1;
      if (v != null && typeof v.toString != "function")
        try {
          C = !!(v + "");
        } catch {
        }
      return C;
    }
    function Q(v) {
      var C = -1, B = Array(v.size);
      return v.forEach(function(L, ne) {
        B[++C] = [ne, L];
      }), B;
    }
    function P(v) {
      var C = -1, B = Array(v.size);
      return v.forEach(function(L) {
        B[++C] = L;
      }), B;
    }
    var O, F, V, q = Array.prototype, ce = Function.prototype, Z = Object.prototype, G = x["__core-js_shared__"], J = (O = /[^.]+$/.exec(G && G.keys && G.keys.IE_PROTO || "")) ? "Symbol(src)_1." + O : "", ee = ce.toString, M = Z.hasOwnProperty, g = Z.toString, ie = RegExp("^" + ee.call(M).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), X = x.Symbol, de = x.Uint8Array, he = Z.propertyIsEnumerable, me = q.splice, xe = (F = Object.keys, V = Object, function(v) {
      return F(V(v));
    }), je = Ke(x, "DataView"), Pe = Ke(x, "Map"), Ne = Ke(x, "Promise"), U = Ke(x, "Set"), T = Ke(x, "WeakMap"), K = Ke(Object, "create"), se = Ve(je), oe = Ve(Pe), le = Ve(Ne), fe = Ve(U), be = Ve(T), Y = X ? X.prototype : void 0, ae = Y ? Y.valueOf : void 0, pe = Y ? Y.toString : void 0;
    function $(v) {
      var C = -1, B = v ? v.length : 0;
      for (this.clear(); ++C < B; ) {
        var L = v[C];
        this.set(L[0], L[1]);
      }
    }
    function te(v) {
      var C = -1, B = v ? v.length : 0;
      for (this.clear(); ++C < B; ) {
        var L = v[C];
        this.set(L[0], L[1]);
      }
    }
    function Ae(v) {
      var C = -1, B = v ? v.length : 0;
      for (this.clear(); ++C < B; ) {
        var L = v[C];
        this.set(L[0], L[1]);
      }
    }
    function Fe(v) {
      var C = -1, B = v ? v.length : 0;
      for (this.__data__ = new Ae(); ++C < B; )
        this.add(v[C]);
    }
    function Re(v) {
      this.__data__ = new te(v);
    }
    function Be(v, C) {
      var B = We(v) || It(v) ? function(ue, we) {
        for (var Ue = -1, ve = Array(ue); ++Ue < ue; )
          ve[Ue] = we(Ue);
        return ve;
      }(v.length, String) : [], L = B.length, ne = !!L;
      for (var re in v)
        !C && !M.call(v, re) || ne && (re == "length" || At(re, L)) || B.push(re);
      return B;
    }
    function Ge(v, C) {
      for (var B = v.length; B--; )
        if (Pt(v[B][0], C))
          return B;
      return -1;
    }
    $.prototype.clear = function() {
      this.__data__ = K ? K(null) : {};
    }, $.prototype.delete = function(v) {
      return this.has(v) && delete this.__data__[v];
    }, $.prototype.get = function(v) {
      var C = this.__data__;
      if (K) {
        var B = C[v];
        return B === "__lodash_hash_undefined__" ? void 0 : B;
      }
      return M.call(C, v) ? C[v] : void 0;
    }, $.prototype.has = function(v) {
      var C = this.__data__;
      return K ? C[v] !== void 0 : M.call(C, v);
    }, $.prototype.set = function(v, C) {
      return this.__data__[v] = K && C === void 0 ? "__lodash_hash_undefined__" : C, this;
    }, te.prototype.clear = function() {
      this.__data__ = [];
    }, te.prototype.delete = function(v) {
      var C = this.__data__, B = Ge(C, v);
      return !(B < 0) && (B == C.length - 1 ? C.pop() : me.call(C, B, 1), !0);
    }, te.prototype.get = function(v) {
      var C = this.__data__, B = Ge(C, v);
      return B < 0 ? void 0 : C[B][1];
    }, te.prototype.has = function(v) {
      return Ge(this.__data__, v) > -1;
    }, te.prototype.set = function(v, C) {
      var B = this.__data__, L = Ge(B, v);
      return L < 0 ? B.push([v, C]) : B[L][1] = C, this;
    }, Ae.prototype.clear = function() {
      this.__data__ = { hash: new $(), map: new (Pe || te)(), string: new $() };
    }, Ae.prototype.delete = function(v) {
      return rt(this, v).delete(v);
    }, Ae.prototype.get = function(v) {
      return rt(this, v).get(v);
    }, Ae.prototype.has = function(v) {
      return rt(this, v).has(v);
    }, Ae.prototype.set = function(v, C) {
      return rt(this, v).set(v, C), this;
    }, Fe.prototype.add = Fe.prototype.push = function(v) {
      return this.__data__.set(v, "__lodash_hash_undefined__"), this;
    }, Fe.prototype.has = function(v) {
      return this.__data__.has(v);
    }, Re.prototype.clear = function() {
      this.__data__ = new te();
    }, Re.prototype.delete = function(v) {
      return this.__data__.delete(v);
    }, Re.prototype.get = function(v) {
      return this.__data__.get(v);
    }, Re.prototype.has = function(v) {
      return this.__data__.has(v);
    }, Re.prototype.set = function(v, C) {
      var B = this.__data__;
      if (B instanceof te) {
        var L = B.__data__;
        if (!Pe || L.length < 199)
          return L.push([v, C]), this;
        B = this.__data__ = new Ae(L);
      }
      return B.set(v, C), this;
    };
    var Ze, Ie = (Ze = function(v, C) {
      return v && Je(v, C, ct);
    }, function(v, C) {
      if (v == null)
        return v;
      if (!bt(v))
        return Ze(v, C);
      for (var B = v.length, L = -1, ne = Object(v); ++L < B && C(ne[L], L, ne) !== !1; )
        ;
      return v;
    }), Je = /* @__PURE__ */ function(v) {
      return function(C, B, L) {
        for (var ne = -1, re = Object(C), ue = L(C), we = ue.length; we--; ) {
          var Ue = ue[v ? we : ++ne];
          if (B(re[Ue], Ue, re) === !1)
            break;
        }
        return C;
      };
    }();
    function Xe(v, C) {
      for (var B = 0, L = (C = at(C, v) ? [C] : jt(C)).length; v != null && B < L; )
        v = v[it(C[B++])];
      return B && B == L ? v : void 0;
    }
    function gt(v, C) {
      return v != null && C in Object(v);
    }
    function $e(v, C, B, L, ne) {
      return v === C || (v == null || C == null || !ot(v) && !st(C) ? v != v && C != C : function(re, ue, we, Ue, ve, ge) {
        var Oe = We(re), ke = We(ue), Ee = "[object Array]", _e = "[object Array]";
        Oe || (Ee = (Ee = Te(re)) == n ? i : Ee), ke || (_e = (_e = Te(ue)) == n ? i : _e);
        var Se = Ee == i && !S(re), Qe = _e == i && !S(ue), He = Ee == _e;
        if (He && !Se)
          return ge || (ge = new Re()), Oe || kt(re) ? Nt(re, ue, we, Ue, ve, ge) : function(Ce, ye, wt, qe, lt, Me, De) {
            switch (wt) {
              case "[object DataView]":
                if (Ce.byteLength != ye.byteLength || Ce.byteOffset != ye.byteOffset)
                  return !1;
                Ce = Ce.buffer, ye = ye.buffer;
              case "[object ArrayBuffer]":
                return !(Ce.byteLength != ye.byteLength || !qe(new de(Ce), new de(ye)));
              case "[object Boolean]":
              case "[object Date]":
              case "[object Number]":
                return Pt(+Ce, +ye);
              case "[object Error]":
                return Ce.name == ye.name && Ce.message == ye.message;
              case "[object RegExp]":
              case "[object String]":
                return Ce == ye + "";
              case s:
                var ze = Q;
              case u:
                var nt = 2 & Me;
                if (ze || (ze = P), Ce.size != ye.size && !nt)
                  return !1;
                var ut = De.get(Ce);
                if (ut)
                  return ut == ye;
                Me |= 1, De.set(Ce, ye);
                var Ye = Nt(ze(Ce), ze(ye), qe, lt, Me, De);
                return De.delete(Ce), Ye;
              case "[object Symbol]":
                if (ae)
                  return ae.call(Ce) == ae.call(ye);
            }
            return !1;
          }(re, ue, Ee, we, Ue, ve, ge);
        if (!(2 & ve)) {
          var tt = Se && M.call(re, "__wrapped__"), Rt = Qe && M.call(ue, "__wrapped__");
          if (tt || Rt) {
            var Dt = tt ? re.value() : re, Tt = Rt ? ue.value() : ue;
            return ge || (ge = new Re()), we(Dt, Tt, Ue, ve, ge);
          }
        }
        return He ? (ge || (ge = new Re()), function(Ce, ye, wt, qe, lt, Me) {
          var De = 2 & lt, ze = ct(Ce), nt = ze.length, ut = ct(ye).length;
          if (nt != ut && !De)
            return !1;
          for (var Ye = nt; Ye--; ) {
            var Le = ze[Ye];
            if (!(De ? Le in ye : M.call(ye, Le)))
              return !1;
          }
          var Ft = Me.get(Ce);
          if (Ft && Me.get(ye))
            return Ft == ye;
          var dt = !0;
          Me.set(Ce, ye), Me.set(ye, Ce);
          for (var Ct = De; ++Ye < nt; ) {
            Le = ze[Ye];
            var ft = Ce[Le], pt = ye[Le];
            if (qe)
              var St = De ? qe(pt, ft, Le, ye, Ce, Me) : qe(ft, pt, Le, Ce, ye, Me);
            if (!(St === void 0 ? ft === pt || wt(ft, pt, qe, lt, Me) : St)) {
              dt = !1;
              break;
            }
            Ct || (Ct = Le == "constructor");
          }
          if (dt && !Ct) {
            var ht = Ce.constructor, mt = ye.constructor;
            ht == mt || !("constructor" in Ce) || !("constructor" in ye) || typeof ht == "function" && ht instanceof ht && typeof mt == "function" && mt instanceof mt || (dt = !1);
          }
          return Me.delete(Ce), Me.delete(ye), dt;
        }(re, ue, we, Ue, ve, ge)) : !1;
      }(v, C, $e, B, L, ne));
    }
    function et(v) {
      return !(!ot(v) || function(C) {
        return !!J && J in C;
      }(v)) && (_t(v) || S(v) ? ie : b).test(Ve(v));
    }
    function Mt(v) {
      return typeof v == "function" ? v : v == null ? Gt : typeof v == "object" ? We(v) ? function(L, ne) {
        return at(L) && Ut(ne) ? Et(it(L), ne) : function(re) {
          var ue = function(we, Ue, ve) {
            var ge = we == null ? void 0 : Xe(we, Ue);
            return ge === void 0 ? ve : ge;
          }(re, L);
          return ue === void 0 && ue === ne ? function(we, Ue) {
            return we != null && function(ve, ge, Oe) {
              ge = at(ge, ve) ? [ge] : jt(ge);
              for (var ke, Ee = -1, _e = ge.length; ++Ee < _e; ) {
                var Se = it(ge[Ee]);
                if (!(ke = ve != null && Oe(ve, Se)))
                  break;
                ve = ve[Se];
              }
              return ke || !!(_e = ve ? ve.length : 0) && yt(_e) && At(Se, _e) && (We(ve) || It(ve));
            }(we, Ue, gt);
          }(re, L) : $e(ne, ue, void 0, 3);
        };
      }(v[0], v[1]) : function(L) {
        var ne = function(re) {
          for (var ue = ct(re), we = ue.length; we--; ) {
            var Ue = ue[we], ve = re[Ue];
            ue[we] = [Ue, ve, Ut(ve)];
          }
          return ue;
        }(L);
        return ne.length == 1 && ne[0][2] ? Et(ne[0][0], ne[0][1]) : function(re) {
          return re === L || function(ue, we, Ue, ve) {
            var ge = Ue.length, Oe = ge, ke = !ve;
            if (ue == null)
              return !Oe;
            for (ue = Object(ue); ge--; ) {
              var Ee = Ue[ge];
              if (ke && Ee[2] ? Ee[1] !== ue[Ee[0]] : !(Ee[0] in ue))
                return !1;
            }
            for (; ++ge < Oe; ) {
              var _e = (Ee = Ue[ge])[0], Se = ue[_e], Qe = Ee[1];
              if (ke && Ee[2]) {
                if (Se === void 0 && !(_e in ue))
                  return !1;
              } else {
                var He = new Re();
                if (ve)
                  var tt = ve(Se, Qe, _e, ue, we, He);
                if (!(tt === void 0 ? $e(Qe, Se, ve, 3, He) : tt))
                  return !1;
              }
            }
            return !0;
          }(re, L, ne);
        };
      }(v) : at(C = v) ? (B = it(C), function(L) {
        return L == null ? void 0 : L[B];
      }) : /* @__PURE__ */ function(L) {
        return function(ne) {
          return Xe(ne, L);
        };
      }(C);
      var C, B;
    }
    function Bt(v) {
      if (B = (C = v) && C.constructor, L = typeof B == "function" && B.prototype || Z, C !== L)
        return xe(v);
      var C, B, L, ne = [];
      for (var re in Object(v))
        M.call(v, re) && re != "constructor" && ne.push(re);
      return ne;
    }
    function jt(v) {
      return We(v) ? v : Ot(v);
    }
    function Nt(v, C, B, L, ne, re) {
      var ue = 2 & ne, we = v.length, Ue = C.length;
      if (we != Ue && !(ue && Ue > we))
        return !1;
      var ve = re.get(v);
      if (ve && re.get(C))
        return ve == C;
      var ge = -1, Oe = !0, ke = 1 & ne ? new Fe() : void 0;
      for (re.set(v, C), re.set(C, v); ++ge < we; ) {
        var Ee = v[ge], _e = C[ge];
        if (L)
          var Se = ue ? L(_e, Ee, ge, C, v, re) : L(Ee, _e, ge, v, C, re);
        if (Se !== void 0) {
          if (Se)
            continue;
          Oe = !1;
          break;
        }
        if (ke) {
          if (!E(C, function(Qe, He) {
            if (!ke.has(He) && (Ee === Qe || B(Ee, Qe, L, ne, re)))
              return ke.add(He);
          })) {
            Oe = !1;
            break;
          }
        } else if (Ee !== _e && !B(Ee, _e, L, ne, re)) {
          Oe = !1;
          break;
        }
      }
      return re.delete(v), re.delete(C), Oe;
    }
    function rt(v, C) {
      var B, L, ne = v.__data__;
      return ((L = typeof (B = C)) == "string" || L == "number" || L == "symbol" || L == "boolean" ? B !== "__proto__" : B === null) ? ne[typeof C == "string" ? "string" : "hash"] : ne.map;
    }
    function Ke(v, C) {
      var B = function(L, ne) {
        return L == null ? void 0 : L[ne];
      }(v, C);
      return et(B) ? B : void 0;
    }
    var Te = function(v) {
      return g.call(v);
    };
    function At(v, C) {
      return !!(C = C ?? 9007199254740991) && (typeof v == "number" || y.test(v)) && v > -1 && v % 1 == 0 && v < C;
    }
    function at(v, C) {
      if (We(v))
        return !1;
      var B = typeof v;
      return !(B != "number" && B != "symbol" && B != "boolean" && v != null && !xt(v)) || m.test(v) || !l.test(v) || C != null && v in Object(C);
    }
    function Ut(v) {
      return v == v && !ot(v);
    }
    function Et(v, C) {
      return function(B) {
        return B != null && B[v] === C && (C !== void 0 || v in Object(B));
      };
    }
    (je && Te(new je(new ArrayBuffer(1))) != "[object DataView]" || Pe && Te(new Pe()) != s || Ne && Te(Ne.resolve()) != "[object Promise]" || U && Te(new U()) != u || T && Te(new T()) != "[object WeakMap]") && (Te = function(v) {
      var C = g.call(v), B = C == i ? v.constructor : void 0, L = B ? Ve(B) : void 0;
      if (L)
        switch (L) {
          case se:
            return "[object DataView]";
          case oe:
            return s;
          case le:
            return "[object Promise]";
          case fe:
            return u;
          case be:
            return "[object WeakMap]";
        }
      return C;
    });
    var Ot = vt(function(v) {
      var C;
      v = (C = v) == null ? "" : function(L) {
        if (typeof L == "string")
          return L;
        if (xt(L))
          return pe ? pe.call(L) : "";
        var ne = L + "";
        return ne == "0" && 1 / L == -1 / 0 ? "-0" : ne;
      }(C);
      var B = [];
      return p.test(v) && B.push(""), v.replace(d, function(L, ne, re, ue) {
        B.push(re ? ue.replace(f, "$1") : ne || L);
      }), B;
    });
    function it(v) {
      if (typeof v == "string" || xt(v))
        return v;
      var C = v + "";
      return C == "0" && 1 / v == -1 / 0 ? "-0" : C;
    }
    function Ve(v) {
      if (v != null) {
        try {
          return ee.call(v);
        } catch {
        }
        try {
          return v + "";
        } catch {
        }
      }
      return "";
    }
    function vt(v, C) {
      if (typeof v != "function" || C && typeof C != "function")
        throw new TypeError("Expected a function");
      var B = function() {
        var L = arguments, ne = C ? C.apply(this, L) : L[0], re = B.cache;
        if (re.has(ne))
          return re.get(ne);
        var ue = v.apply(this, L);
        return B.cache = re.set(ne, ue), ue;
      };
      return B.cache = new (vt.Cache || Ae)(), B;
    }
    function Pt(v, C) {
      return v === C || v != v && C != C;
    }
    function It(v) {
      return function(C) {
        return st(C) && bt(C);
      }(v) && M.call(v, "callee") && (!he.call(v, "callee") || g.call(v) == n);
    }
    vt.Cache = Ae;
    var We = Array.isArray;
    function bt(v) {
      return v != null && yt(v.length) && !_t(v);
    }
    function _t(v) {
      var C = ot(v) ? g.call(v) : "";
      return C == "[object Function]" || C == "[object GeneratorFunction]";
    }
    function yt(v) {
      return typeof v == "number" && v > -1 && v % 1 == 0 && v <= 9007199254740991;
    }
    function ot(v) {
      var C = typeof v;
      return !!v && (C == "object" || C == "function");
    }
    function st(v) {
      return !!v && typeof v == "object";
    }
    function xt(v) {
      return typeof v == "symbol" || st(v) && g.call(v) == "[object Symbol]";
    }
    var kt = I ? /* @__PURE__ */ function(v) {
      return function(C) {
        return v(C);
      };
    }(I) : function(v) {
      return st(v) && yt(v.length) && !!h[g.call(v)];
    };
    function ct(v) {
      return bt(v) ? Be(v) : Bt(v);
    }
    function Gt(v) {
      return v;
    }
    e.exports = function(v, C, B) {
      var L = We(v) ? k : z, ne = arguments.length < 3;
      return L(v, Mt(C), B, ne, Ie);
    };
  }).call(this, c(3), c(7)(a));
}, function(a, r) {
  a.exports = function(c) {
    return c.webpackPolyfill || (c.deprecate = function() {
    }, c.paths = [], c.children || (c.children = []), Object.defineProperty(c, "loaded", { enumerable: !0, get: function() {
      return c.l;
    } }), Object.defineProperty(c, "id", { enumerable: !0, get: function() {
      return c.i;
    } }), c.webpackPolyfill = 1), c;
  };
}, function(a, r) {
  String.prototype.padEnd || (String.prototype.padEnd = function(c, t) {
    return c >>= 0, t = String(t !== void 0 ? t : " "), this.length > c ? String(this) : ((c -= this.length) > t.length && (t += t.repeat(c / t.length)), String(this) + t.slice(0, c));
  });
}, function(a, r, c) {
  function t(Z, G, J) {
    return G in Z ? Object.defineProperty(Z, G, { value: J, enumerable: !0, configurable: !0, writable: !0 }) : Z[G] = J, Z;
  }
  function e(Z) {
    if (Symbol.iterator in Object(Z) || Object.prototype.toString.call(Z) === "[object Arguments]")
      return Array.from(Z);
  }
  function n(Z) {
    return function(G) {
      if (Array.isArray(G)) {
        for (var J = 0, ee = new Array(G.length); J < G.length; J++)
          ee[J] = G[J];
        return ee;
      }
    }(Z) || e(Z) || function() {
      throw new TypeError("Invalid attempt to spread non-iterable instance");
    }();
  }
  function s(Z) {
    if (Array.isArray(Z))
      return Z;
  }
  function i() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }
  function u(Z, G) {
    if (!(Z instanceof G))
      throw new TypeError("Cannot call a class as a function");
  }
  function l(Z, G) {
    for (var J = 0; J < G.length; J++) {
      var ee = G[J];
      ee.enumerable = ee.enumerable || !1, ee.configurable = !0, "value" in ee && (ee.writable = !0), Object.defineProperty(Z, ee.key, ee);
    }
  }
  function m(Z) {
    return (m = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(G) {
      return typeof G;
    } : function(G) {
      return G && typeof Symbol == "function" && G.constructor === Symbol && G !== Symbol.prototype ? "symbol" : typeof G;
    })(Z);
  }
  function p(Z) {
    return (p = typeof Symbol == "function" && m(Symbol.iterator) === "symbol" ? function(G) {
      return m(G);
    } : function(G) {
      return G && typeof Symbol == "function" && G.constructor === Symbol && G !== Symbol.prototype ? "symbol" : m(G);
    })(Z);
  }
  function d(Z) {
    if (Z === void 0)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return Z;
  }
  function f(Z) {
    return (f = Object.setPrototypeOf ? Object.getPrototypeOf : function(G) {
      return G.__proto__ || Object.getPrototypeOf(G);
    })(Z);
  }
  function b(Z, G) {
    return (b = Object.setPrototypeOf || function(J, ee) {
      return J.__proto__ = ee, J;
    })(Z, G);
  }
  c.r(r);
  var y = c(0), h = c.n(y), D = c(5), _ = c.n(D), x = c(4), j = c.n(x), w = c(6), A = c.n(w), R = c(2), I = c.n(R), k = c(1), E = c.n(k);
  c(8);
  function z(Z, G) {
    return s(Z) || function(J, ee) {
      var M = [], g = !0, ie = !1, X = void 0;
      try {
        for (var de, he = J[Symbol.iterator](); !(g = (de = he.next()).done) && (M.push(de.value), !ee || M.length !== ee); g = !0)
          ;
      } catch (me) {
        ie = !0, X = me;
      } finally {
        try {
          g || he.return == null || he.return();
        } finally {
          if (ie)
            throw X;
        }
      }
      return M;
    }(Z, G) || i();
  }
  var S = [["Afghanistan", ["asia"], "af", "93"], ["Albania", ["europe"], "al", "355"], ["Algeria", ["africa", "north-africa"], "dz", "213"], ["Andorra", ["europe"], "ad", "376"], ["Angola", ["africa"], "ao", "244"], ["Antigua and Barbuda", ["america", "carribean"], "ag", "1268"], ["Argentina", ["america", "south-america"], "ar", "54", "(..) ........", 0, ["11", "221", "223", "261", "264", "2652", "280", "2905", "291", "2920", "2966", "299", "341", "342", "343", "351", "376", "379", "381", "3833", "385", "387", "388"]], ["Armenia", ["asia", "ex-ussr"], "am", "374", ".. ......"], ["Aruba", ["america", "carribean"], "aw", "297"], ["Australia", ["oceania"], "au", "61", "(..) .... ....", 0, ["2", "3", "4", "7", "8", "02", "03", "04", "07", "08"]], ["Austria", ["europe", "eu-union"], "at", "43"], ["Azerbaijan", ["asia", "ex-ussr"], "az", "994", "(..) ... .. .."], ["Bahamas", ["america", "carribean"], "bs", "1242"], ["Bahrain", ["middle-east"], "bh", "973"], ["Bangladesh", ["asia"], "bd", "880"], ["Barbados", ["america", "carribean"], "bb", "1246"], ["Belarus", ["europe", "ex-ussr"], "by", "375", "(..) ... .. .."], ["Belgium", ["europe", "eu-union"], "be", "32", "... .. .. .."], ["Belize", ["america", "central-america"], "bz", "501"], ["Benin", ["africa"], "bj", "229"], ["Bhutan", ["asia"], "bt", "975"], ["Bolivia", ["america", "south-america"], "bo", "591"], ["Bosnia and Herzegovina", ["europe", "ex-yugos"], "ba", "387"], ["Botswana", ["africa"], "bw", "267"], ["Brazil", ["america", "south-america"], "br", "55", "(..) ........."], ["British Indian Ocean Territory", ["asia"], "io", "246"], ["Brunei", ["asia"], "bn", "673"], ["Bulgaria", ["europe", "eu-union"], "bg", "359"], ["Burkina Faso", ["africa"], "bf", "226"], ["Burundi", ["africa"], "bi", "257"], ["Cambodia", ["asia"], "kh", "855"], ["Cameroon", ["africa"], "cm", "237"], ["Canada", ["america", "north-america"], "ca", "1", "(...) ...-....", 1, ["204", "226", "236", "249", "250", "289", "306", "343", "365", "387", "403", "416", "418", "431", "437", "438", "450", "506", "514", "519", "548", "579", "581", "587", "604", "613", "639", "647", "672", "705", "709", "742", "778", "780", "782", "807", "819", "825", "867", "873", "902", "905"]], ["Cape Verde", ["africa"], "cv", "238"], ["Caribbean Netherlands", ["america", "carribean"], "bq", "599", "", 1], ["Central African Republic", ["africa"], "cf", "236"], ["Chad", ["africa"], "td", "235"], ["Chile", ["america", "south-america"], "cl", "56"], ["China", ["asia"], "cn", "86", "..-........."], ["Colombia", ["america", "south-america"], "co", "57", "... ... ...."], ["Comoros", ["africa"], "km", "269"], ["Congo", ["africa"], "cd", "243"], ["Congo", ["africa"], "cg", "242"], ["Costa Rica", ["america", "central-america"], "cr", "506", "....-...."], ["Côte d’Ivoire", ["africa"], "ci", "225", ".. .. .. .."], ["Croatia", ["europe", "eu-union", "ex-yugos"], "hr", "385"], ["Cuba", ["america", "carribean"], "cu", "53"], ["Curaçao", ["america", "carribean"], "cw", "599", "", 0], ["Cyprus", ["europe", "eu-union"], "cy", "357", ".. ......"], ["Czech Republic", ["europe", "eu-union"], "cz", "420", "... ... ..."], ["Denmark", ["europe", "eu-union", "baltic"], "dk", "45", ".. .. .. .."], ["Djibouti", ["africa"], "dj", "253"], ["Dominica", ["america", "carribean"], "dm", "1767"], ["Dominican Republic", ["america", "carribean"], "do", "1", "", 2, ["809", "829", "849"]], ["Ecuador", ["america", "south-america"], "ec", "593"], ["Egypt", ["africa", "north-africa"], "eg", "20"], ["El Salvador", ["america", "central-america"], "sv", "503", "....-...."], ["Equatorial Guinea", ["africa"], "gq", "240"], ["Eritrea", ["africa"], "er", "291"], ["Estonia", ["europe", "eu-union", "ex-ussr", "baltic"], "ee", "372", ".... ......"], ["Ethiopia", ["africa"], "et", "251"], ["Fiji", ["oceania"], "fj", "679"], ["Finland", ["europe", "eu-union", "baltic"], "fi", "358", ".. ... .. .."], ["France", ["europe", "eu-union"], "fr", "33", ". .. .. .. .."], ["French Guiana", ["america", "south-america"], "gf", "594"], ["French Polynesia", ["oceania"], "pf", "689"], ["Gabon", ["africa"], "ga", "241"], ["Gambia", ["africa"], "gm", "220"], ["Georgia", ["asia", "ex-ussr"], "ge", "995"], ["Germany", ["europe", "eu-union", "baltic"], "de", "49", ".... ........"], ["Ghana", ["africa"], "gh", "233"], ["Greece", ["europe", "eu-union"], "gr", "30"], ["Grenada", ["america", "carribean"], "gd", "1473"], ["Guadeloupe", ["america", "carribean"], "gp", "590", "", 0], ["Guam", ["oceania"], "gu", "1671"], ["Guatemala", ["america", "central-america"], "gt", "502", "....-...."], ["Guinea", ["africa"], "gn", "224"], ["Guinea-Bissau", ["africa"], "gw", "245"], ["Guyana", ["america", "south-america"], "gy", "592"], ["Haiti", ["america", "carribean"], "ht", "509", "....-...."], ["Honduras", ["america", "central-america"], "hn", "504"], ["Hong Kong", ["asia"], "hk", "852", ".... ...."], ["Hungary", ["europe", "eu-union"], "hu", "36"], ["Iceland", ["europe"], "is", "354", "... ...."], ["India", ["asia"], "in", "91", ".....-....."], ["Indonesia", ["asia"], "id", "62"], ["Iran", ["middle-east"], "ir", "98", "... ... ...."], ["Iraq", ["middle-east"], "iq", "964"], ["Ireland", ["europe", "eu-union"], "ie", "353", ".. ......."], ["Israel", ["middle-east"], "il", "972", "... ... ...."], ["Italy", ["europe", "eu-union"], "it", "39", "... .......", 0], ["Jamaica", ["america", "carribean"], "jm", "1876"], ["Japan", ["asia"], "jp", "81", ".. .... ...."], ["Jordan", ["middle-east"], "jo", "962"], ["Kazakhstan", ["asia", "ex-ussr"], "kz", "7", "... ...-..-..", 1, ["310", "311", "312", "313", "315", "318", "321", "324", "325", "326", "327", "336", "7172", "73622"]], ["Kenya", ["africa"], "ke", "254"], ["Kiribati", ["oceania"], "ki", "686"], ["Kosovo", ["europe", "ex-yugos"], "xk", "383"], ["Kuwait", ["middle-east"], "kw", "965"], ["Kyrgyzstan", ["asia", "ex-ussr"], "kg", "996", "... ... ..."], ["Laos", ["asia"], "la", "856"], ["Latvia", ["europe", "eu-union", "ex-ussr", "baltic"], "lv", "371", ".. ... ..."], ["Lebanon", ["middle-east"], "lb", "961"], ["Lesotho", ["africa"], "ls", "266"], ["Liberia", ["africa"], "lr", "231"], ["Libya", ["africa", "north-africa"], "ly", "218"], ["Liechtenstein", ["europe"], "li", "423"], ["Lithuania", ["europe", "eu-union", "ex-ussr", "baltic"], "lt", "370"], ["Luxembourg", ["europe", "eu-union"], "lu", "352"], ["Macau", ["asia"], "mo", "853"], ["Macedonia", ["europe", "ex-yugos"], "mk", "389"], ["Madagascar", ["africa"], "mg", "261"], ["Malawi", ["africa"], "mw", "265"], ["Malaysia", ["asia"], "my", "60", "..-....-...."], ["Maldives", ["asia"], "mv", "960"], ["Mali", ["africa"], "ml", "223"], ["Malta", ["europe", "eu-union"], "mt", "356"], ["Marshall Islands", ["oceania"], "mh", "692"], ["Martinique", ["america", "carribean"], "mq", "596"], ["Mauritania", ["africa"], "mr", "222"], ["Mauritius", ["africa"], "mu", "230"], ["Mexico", ["america", "central-america"], "mx", "52", "... ... ....", 0, ["55", "81", "33", "656", "664", "998", "774", "229"]], ["Micronesia", ["oceania"], "fm", "691"], ["Moldova", ["europe"], "md", "373", "(..) ..-..-.."], ["Monaco", ["europe"], "mc", "377"], ["Mongolia", ["asia"], "mn", "976"], ["Montenegro", ["europe", "ex-yugos"], "me", "382"], ["Morocco", ["africa", "north-africa"], "ma", "212"], ["Mozambique", ["africa"], "mz", "258"], ["Myanmar", ["asia"], "mm", "95"], ["Namibia", ["africa"], "na", "264"], ["Nauru", ["africa"], "nr", "674"], ["Nepal", ["asia"], "np", "977"], ["Netherlands", ["europe", "eu-union"], "nl", "31", ".. ........"], ["New Caledonia", ["oceania"], "nc", "687"], ["New Zealand", ["oceania"], "nz", "64", "...-...-...."], ["Nicaragua", ["america", "central-america"], "ni", "505"], ["Niger", ["africa"], "ne", "227"], ["Nigeria", ["africa"], "ng", "234"], ["North Korea", ["asia"], "kp", "850"], ["Norway", ["europe", "baltic"], "no", "47", "... .. ..."], ["Oman", ["middle-east"], "om", "968"], ["Pakistan", ["asia"], "pk", "92", "...-......."], ["Palau", ["oceania"], "pw", "680"], ["Palestine", ["middle-east"], "ps", "970"], ["Panama", ["america", "central-america"], "pa", "507"], ["Papua New Guinea", ["oceania"], "pg", "675"], ["Paraguay", ["america", "south-america"], "py", "595"], ["Peru", ["america", "south-america"], "pe", "51"], ["Philippines", ["asia"], "ph", "63", ".... ......."], ["Poland", ["europe", "eu-union", "baltic"], "pl", "48", "...-...-..."], ["Portugal", ["europe", "eu-union"], "pt", "351"], ["Puerto Rico", ["america", "carribean"], "pr", "1", "", 3, ["787", "939"]], ["Qatar", ["middle-east"], "qa", "974"], ["Réunion", ["africa"], "re", "262"], ["Romania", ["europe", "eu-union"], "ro", "40"], ["Russia", ["europe", "asia", "ex-ussr", "baltic"], "ru", "7", "(...) ...-..-..", 0], ["Rwanda", ["africa"], "rw", "250"], ["Saint Kitts and Nevis", ["america", "carribean"], "kn", "1869"], ["Saint Lucia", ["america", "carribean"], "lc", "1758"], ["Saint Vincent and the Grenadines", ["america", "carribean"], "vc", "1784"], ["Samoa", ["oceania"], "ws", "685"], ["San Marino", ["europe"], "sm", "378"], ["São Tomé and Príncipe", ["africa"], "st", "239"], ["Saudi Arabia", ["middle-east"], "sa", "966"], ["Senegal", ["africa"], "sn", "221"], ["Serbia", ["europe", "ex-yugos"], "rs", "381"], ["Seychelles", ["africa"], "sc", "248"], ["Sierra Leone", ["africa"], "sl", "232"], ["Singapore", ["asia"], "sg", "65", "....-...."], ["Slovakia", ["europe", "eu-union"], "sk", "421"], ["Slovenia", ["europe", "eu-union", "ex-yugos"], "si", "386"], ["Solomon Islands", ["oceania"], "sb", "677"], ["Somalia", ["africa"], "so", "252"], ["South Africa", ["africa"], "za", "27"], ["South Korea", ["asia"], "kr", "82", "... .... ...."], ["South Sudan", ["africa", "north-africa"], "ss", "211"], ["Spain", ["europe", "eu-union"], "es", "34", "... ... ..."], ["Sri Lanka", ["asia"], "lk", "94"], ["Sudan", ["africa"], "sd", "249"], ["Suriname", ["america", "south-america"], "sr", "597"], ["Swaziland", ["africa"], "sz", "268"], ["Sweden", ["europe", "eu-union", "baltic"], "se", "46", "(...) ...-..."], ["Switzerland", ["europe"], "ch", "41", ".. ... .. .."], ["Syria", ["middle-east"], "sy", "963"], ["Taiwan", ["asia"], "tw", "886"], ["Tajikistan", ["asia", "ex-ussr"], "tj", "992"], ["Tanzania", ["africa"], "tz", "255"], ["Thailand", ["asia"], "th", "66"], ["Timor-Leste", ["asia"], "tl", "670"], ["Togo", ["africa"], "tg", "228"], ["Tonga", ["oceania"], "to", "676"], ["Trinidad and Tobago", ["america", "carribean"], "tt", "1868"], ["Tunisia", ["africa", "north-africa"], "tn", "216"], ["Turkey", ["europe"], "tr", "90", "... ... .. .."], ["Turkmenistan", ["asia", "ex-ussr"], "tm", "993"], ["Tuvalu", ["asia"], "tv", "688"], ["Uganda", ["africa"], "ug", "256"], ["Ukraine", ["europe", "ex-ussr"], "ua", "380", "(..) ... .. .."], ["United Arab Emirates", ["middle-east"], "ae", "971"], ["United Kingdom", ["europe", "eu-union"], "gb", "44", ".... ......"], ["United States", ["america", "north-america"], "us", "1", "(...) ...-....", 0, ["907", "205", "251", "256", "334", "479", "501", "870", "480", "520", "602", "623", "928", "209", "213", "310", "323", "408", "415", "510", "530", "559", "562", "619", "626", "650", "661", "707", "714", "760", "805", "818", "831", "858", "909", "916", "925", "949", "951", "303", "719", "970", "203", "860", "202", "302", "239", "305", "321", "352", "386", "407", "561", "727", "772", "813", "850", "863", "904", "941", "954", "229", "404", "478", "706", "770", "912", "808", "319", "515", "563", "641", "712", "208", "217", "309", "312", "618", "630", "708", "773", "815", "847", "219", "260", "317", "574", "765", "812", "316", "620", "785", "913", "270", "502", "606", "859", "225", "318", "337", "504", "985", "413", "508", "617", "781", "978", "301", "410", "207", "231", "248", "269", "313", "517", "586", "616", "734", "810", "906", "989", "218", "320", "507", "612", "651", "763", "952", "314", "417", "573", "636", "660", "816", "228", "601", "662", "406", "252", "336", "704", "828", "910", "919", "701", "308", "402", "603", "201", "609", "732", "856", "908", "973", "505", "575", "702", "775", "212", "315", "516", "518", "585", "607", "631", "716", "718", "845", "914", "216", "330", "419", "440", "513", "614", "740", "937", "405", "580", "918", "503", "541", "215", "412", "570", "610", "717", "724", "814", "401", "803", "843", "864", "605", "423", "615", "731", "865", "901", "931", "210", "214", "254", "281", "325", "361", "409", "432", "512", "713", "806", "817", "830", "903", "915", "936", "940", "956", "972", "979", "435", "801", "276", "434", "540", "703", "757", "804", "802", "206", "253", "360", "425", "509", "262", "414", "608", "715", "920", "304", "307"]], ["Uruguay", ["america", "south-america"], "uy", "598"], ["Uzbekistan", ["asia", "ex-ussr"], "uz", "998", ".. ... .. .."], ["Vanuatu", ["oceania"], "vu", "678"], ["Vatican City", ["europe"], "va", "39", ".. .... ....", 1], ["Venezuela", ["america", "south-america"], "ve", "58"], ["Vietnam", ["asia"], "vn", "84"], ["Yemen", ["middle-east"], "ye", "967"], ["Zambia", ["africa"], "zm", "260"], ["Zimbabwe", ["africa"], "zw", "263"]], Q = [["American Samoa", ["oceania"], "as", "1684"], ["Anguilla", ["america", "carribean"], "ai", "1264"], ["Bermuda", ["america", "north-america"], "bm", "1441"], ["British Virgin Islands", ["america", "carribean"], "vg", "1284"], ["Cayman Islands", ["america", "carribean"], "ky", "1345"], ["Cook Islands", ["oceania"], "ck", "682"], ["Falkland Islands", ["america", "south-america"], "fk", "500"], ["Faroe Islands", ["europe"], "fo", "298"], ["Gibraltar", ["europe"], "gi", "350"], ["Greenland", ["america"], "gl", "299"], ["Jersey", ["europe", "eu-union"], "je", "44", ".... ......"], ["Montserrat", ["america", "carribean"], "ms", "1664"], ["Niue", ["asia"], "nu", "683"], ["Norfolk Island", ["oceania"], "nf", "672"], ["Northern Mariana Islands", ["oceania"], "mp", "1670"], ["Saint Barthélemy", ["america", "carribean"], "bl", "590", "", 1], ["Saint Helena", ["africa"], "sh", "290"], ["Saint Martin", ["america", "carribean"], "mf", "590", "", 2], ["Saint Pierre and Miquelon", ["america", "north-america"], "pm", "508"], ["Sint Maarten", ["america", "carribean"], "sx", "1721"], ["Tokelau", ["oceania"], "tk", "690"], ["Turks and Caicos Islands", ["america", "carribean"], "tc", "1649"], ["U.S. Virgin Islands", ["america", "carribean"], "vi", "1340"], ["Wallis and Futuna", ["oceania"], "wf", "681"]];
  function P(Z, G, J, ee, M) {
    return !J || M ? Z + "".padEnd(G.length, ".") + " " + ee : Z + "".padEnd(G.length, ".") + " " + J;
  }
  function O(Z, G, J, ee, M) {
    var g, ie, X = [];
    return ie = G === !0, [(g = []).concat.apply(g, n(Z.map(function(de) {
      var he = { name: de[0], regions: de[1], iso2: de[2], countryCode: de[3], dialCode: de[3], format: P(J, de[3], de[4], ee, M), priority: de[5] || 0 }, me = [];
      return de[6] && de[6].map(function(xe) {
        var je = function(Pe) {
          for (var Ne = 1; Ne < arguments.length; Ne++) {
            var U = arguments[Ne] != null ? arguments[Ne] : {}, T = Object.keys(U);
            typeof Object.getOwnPropertySymbols == "function" && (T = T.concat(Object.getOwnPropertySymbols(U).filter(function(K) {
              return Object.getOwnPropertyDescriptor(U, K).enumerable;
            }))), T.forEach(function(K) {
              t(Pe, K, U[K]);
            });
          }
          return Pe;
        }({}, he);
        je.dialCode = de[3] + xe, je.isAreaCode = !0, je.areaCodeLength = xe.length, me.push(je);
      }), me.length > 0 ? (he.mainCode = !0, ie || G.constructor.name === "Array" && G.includes(de[2]) ? (he.hasAreaCodes = !0, [he].concat(me)) : (X = X.concat(me), [he])) : [he];
    }))), X];
  }
  function F(Z, G, J, ee) {
    if (J !== null) {
      var M = Object.keys(J), g = Object.values(J);
      M.forEach(function(ie, X) {
        if (ee)
          return Z.push([ie, g[X]]);
        var de = Z.findIndex(function(me) {
          return me[0] === ie;
        });
        if (de === -1) {
          var he = [ie];
          he[G] = g[X], Z.push(he);
        } else
          Z[de][G] = g[X];
      });
    }
  }
  function V(Z, G) {
    return G.length === 0 ? Z : Z.map(function(J) {
      var ee = G.findIndex(function(g) {
        return g[0] === J[2];
      });
      if (ee === -1)
        return J;
      var M = G[ee];
      return M[1] && (J[4] = M[1]), M[3] && (J[5] = M[3]), M[2] && (J[6] = M[2]), J;
    });
  }
  var q = function Z(G, J, ee, M, g, ie, X, de, he, me, xe, je, Pe, Ne) {
    u(this, Z), this.filterRegions = function(Y, ae) {
      if (typeof Y == "string") {
        var pe = Y;
        return ae.filter(function($) {
          return $.regions.some(function(te) {
            return te === pe;
          });
        });
      }
      return ae.filter(function($) {
        return Y.map(function(te) {
          return $.regions.some(function(Ae) {
            return Ae === te;
          });
        }).some(function(te) {
          return te;
        });
      });
    }, this.sortTerritories = function(Y, ae) {
      var pe = [].concat(n(Y), n(ae));
      return pe.sort(function($, te) {
        return $.name < te.name ? -1 : $.name > te.name ? 1 : 0;
      }), pe;
    }, this.getFilteredCountryList = function(Y, ae, pe) {
      return Y.length === 0 ? ae : pe ? Y.map(function($) {
        var te = ae.find(function(Ae) {
          return Ae.iso2 === $;
        });
        if (te)
          return te;
      }).filter(function($) {
        return $;
      }) : ae.filter(function($) {
        return Y.some(function(te) {
          return te === $.iso2;
        });
      });
    }, this.localizeCountries = function(Y, ae, pe) {
      for (var $ = 0; $ < Y.length; $++)
        ae[Y[$].iso2] !== void 0 ? Y[$].localName = ae[Y[$].iso2] : ae[Y[$].name] !== void 0 && (Y[$].localName = ae[Y[$].name]);
      return pe || Y.sort(function(te, Ae) {
        return te.localName < Ae.localName ? -1 : te.localName > Ae.localName ? 1 : 0;
      }), Y;
    }, this.getCustomAreas = function(Y, ae) {
      for (var pe = [], $ = 0; $ < ae.length; $++) {
        var te = JSON.parse(JSON.stringify(Y));
        te.dialCode += ae[$], pe.push(te);
      }
      return pe;
    }, this.excludeCountries = function(Y, ae) {
      return ae.length === 0 ? Y : Y.filter(function(pe) {
        return !ae.includes(pe.iso2);
      });
    };
    var U = function(Y, ae, pe) {
      var $ = [];
      return F($, 1, Y, !0), F($, 3, ae), F($, 2, pe), $;
    }(de, he, me), T = V(JSON.parse(JSON.stringify(S)), U), K = V(JSON.parse(JSON.stringify(Q)), U), se = z(O(T, G, je, Pe, Ne), 2), oe = se[0], le = se[1];
    if (J) {
      var fe = z(O(K, G, je, Pe, Ne), 2), be = fe[0];
      fe[1], oe = this.sortTerritories(be, oe);
    }
    ee && (oe = this.filterRegions(ee, oe)), this.onlyCountries = this.localizeCountries(this.excludeCountries(this.getFilteredCountryList(M, oe, X.includes("onlyCountries")), ie), xe, X.includes("onlyCountries")), this.preferredCountries = g.length === 0 ? [] : this.localizeCountries(this.getFilteredCountryList(g, oe, X.includes("preferredCountries")), xe, X.includes("preferredCountries")), this.hiddenAreaCodes = this.excludeCountries(this.getFilteredCountryList(M, le), ie);
  }, ce = function(Z) {
    function G(M) {
      var g;
      u(this, G), (g = function(U, T) {
        return !T || p(T) !== "object" && typeof T != "function" ? d(U) : T;
      }(this, f(G).call(this, M))).getProbableCandidate = j()(function(U) {
        return U && U.length !== 0 ? g.state.onlyCountries.filter(function(T) {
          return I()(T.name.toLowerCase(), U.toLowerCase());
        }, d(d(g)))[0] : null;
      }), g.guessSelectedCountry = j()(function(U, T, K, se) {
        var oe;
        if (g.props.enableAreaCodes === !1 && (se.some(function(be) {
          if (I()(U, be.dialCode))
            return K.some(function(Y) {
              if (be.iso2 === Y.iso2 && Y.mainCode)
                return oe = Y, !0;
            }), !0;
        }), oe))
          return oe;
        var le = K.find(function(be) {
          return be.iso2 == T;
        });
        if (U.trim() === "")
          return le;
        var fe = K.reduce(function(be, Y) {
          return I()(U, Y.dialCode) && (Y.dialCode.length > be.dialCode.length || Y.dialCode.length === be.dialCode.length && Y.priority < be.priority) ? Y : be;
        }, { dialCode: "", priority: 10001 }, d(d(g)));
        return fe.name ? fe : le;
      }), g.updateCountry = function(U) {
        var T, K = g.state.onlyCountries;
        (T = U.indexOf(0) >= "0" && U.indexOf(0) <= "9" ? K.find(function(se) {
          return se.dialCode == +U;
        }) : K.find(function(se) {
          return se.iso2 == U;
        })) && T.dialCode && g.setState({ selectedCountry: T, formattedNumber: g.props.disableCountryCode ? "" : g.formatNumber(T.dialCode, T) });
      }, g.scrollTo = function(U, T) {
        if (U) {
          var K = g.dropdownRef;
          if (K && document.body) {
            var se = K.offsetHeight, oe = K.getBoundingClientRect().top + document.body.scrollTop, le = oe + se, fe = U, be = fe.getBoundingClientRect(), Y = fe.offsetHeight, ae = be.top + document.body.scrollTop, pe = ae + Y, $ = ae - oe + K.scrollTop, te = se / 2 - Y / 2;
            if (g.props.enableSearch ? ae < oe + 32 : ae < oe)
              T && ($ -= te), K.scrollTop = $;
            else if (pe > le) {
              T && ($ += te);
              var Ae = se - Y;
              K.scrollTop = $ - Ae;
            }
          }
        }
      }, g.scrollToTop = function() {
        var U = g.dropdownRef;
        U && document.body && (U.scrollTop = 0);
      }, g.formatNumber = function(U, T) {
        if (!T)
          return U;
        var K, se = T.format, oe = g.props, le = oe.disableCountryCode, fe = oe.enableAreaCodeStretch, be = oe.enableLongNumbers, Y = oe.autoFormat;
        if (le ? ((K = se.split(" ")).shift(), K = K.join(" ")) : fe && T.isAreaCode ? ((K = se.split(" "))[1] = K[1].replace(/\.+/, "".padEnd(T.areaCodeLength, ".")), K = K.join(" ")) : K = se, !U || U.length === 0)
          return le ? "" : g.props.prefix;
        if (U && U.length < 2 || !K || !Y)
          return le ? U : g.props.prefix + U;
        var ae, pe = A()(K, function($, te) {
          if ($.remainingText.length === 0)
            return $;
          if (te !== ".")
            return { formattedText: $.formattedText + te, remainingText: $.remainingText };
          var Ae, Fe = s(Ae = $.remainingText) || e(Ae) || i(), Re = Fe[0], Be = Fe.slice(1);
          return { formattedText: $.formattedText + Re, remainingText: Be };
        }, { formattedText: "", remainingText: U.split("") });
        return (ae = be ? pe.formattedText + pe.remainingText.join("") : pe.formattedText).includes("(") && !ae.includes(")") && (ae += ")"), ae;
      }, g.cursorToEnd = function() {
        var U = g.numberInputRef;
        if (document.activeElement === U) {
          U.focus();
          var T = U.value.length;
          U.value.charAt(T - 1) === ")" && (T -= 1), U.setSelectionRange(T, T);
        }
      }, g.getElement = function(U) {
        return g["flag_no_".concat(U)];
      }, g.getCountryData = function() {
        return g.state.selectedCountry ? { name: g.state.selectedCountry.name || "", dialCode: g.state.selectedCountry.dialCode || "", countryCode: g.state.selectedCountry.iso2 || "", format: g.state.selectedCountry.format || "" } : {};
      }, g.handleFlagDropdownClick = function(U) {
        if (U.preventDefault(), g.state.showDropdown || !g.props.disabled) {
          var T = g.state, K = T.preferredCountries, se = T.onlyCountries, oe = T.selectedCountry, le = g.concatPreferredCountries(K, se).findIndex(function(fe) {
            return fe.dialCode === oe.dialCode && fe.iso2 === oe.iso2;
          });
          g.setState({ showDropdown: !g.state.showDropdown, highlightCountryIndex: le }, function() {
            g.state.showDropdown && g.scrollTo(g.getElement(g.state.highlightCountryIndex));
          });
        }
      }, g.handleInput = function(U) {
        var T = U.target.value, K = g.props, se = K.prefix, oe = K.onChange, le = g.props.disableCountryCode ? "" : se, fe = g.state.selectedCountry, be = g.state.freezeSelection;
        if (!g.props.countryCodeEditable) {
          var Y = se + (fe.hasAreaCodes ? g.state.onlyCountries.find(function(Ie) {
            return Ie.iso2 === fe.iso2 && Ie.mainCode;
          }).dialCode : fe.dialCode);
          if (T.slice(0, Y.length) !== Y)
            return;
        }
        if (T === se)
          return oe && oe("", g.getCountryData(), U, ""), g.setState({ formattedNumber: "" });
        if (!(T.replace(/\D/g, "").length > 15 && (g.props.enableLongNumbers === !1 || typeof g.props.enableLongNumbers == "number" && T.replace(/\D/g, "").length > g.props.enableLongNumbers)) && T !== g.state.formattedNumber) {
          U.preventDefault ? U.preventDefault() : U.returnValue = !1;
          var ae = g.props.country, pe = g.state, $ = pe.onlyCountries, te = pe.selectedCountry, Ae = pe.hiddenAreaCodes;
          if (oe && U.persist(), T.length > 0) {
            var Fe = T.replace(/\D/g, "");
            (!g.state.freezeSelection || te && te.dialCode.length > Fe.length) && (fe = g.props.disableCountryGuess ? te : g.guessSelectedCountry(Fe.substring(0, 6), ae, $, Ae) || te, be = !1), le = g.formatNumber(Fe, fe), fe = fe.dialCode ? fe : te;
          }
          var Re = U.target.selectionStart, Be = U.target.selectionStart, Ge = g.state.formattedNumber, Ze = le.length - Ge.length;
          g.setState({ formattedNumber: le, freezeSelection: be, selectedCountry: fe }, function() {
            Ze > 0 && (Be -= Ze), le.charAt(le.length - 1) == ")" ? g.numberInputRef.setSelectionRange(le.length - 1, le.length - 1) : Be > 0 && Ge.length >= le.length ? g.numberInputRef.setSelectionRange(Be, Be) : Re < Ge.length && g.numberInputRef.setSelectionRange(Re, Re), oe && oe(le.replace(/[^0-9]+/g, ""), g.getCountryData(), U, le);
          });
        }
      }, g.handleInputClick = function(U) {
        g.setState({ showDropdown: !1 }), g.props.onClick && g.props.onClick(U, g.getCountryData());
      }, g.handleDoubleClick = function(U) {
        var T = U.target.value.length;
        U.target.setSelectionRange(0, T);
      }, g.handleFlagItemClick = function(U, T) {
        var K = g.state.selectedCountry, se = g.state.onlyCountries.find(function(be) {
          return be == U;
        });
        if (se) {
          var oe = g.state.formattedNumber.replace(" ", "").replace("(", "").replace(")", "").replace("-", ""), le = oe.length > 1 ? oe.replace(K.dialCode, se.dialCode) : se.dialCode, fe = g.formatNumber(le.replace(/\D/g, ""), se);
          g.setState({ showDropdown: !1, selectedCountry: se, freezeSelection: !0, formattedNumber: fe, searchValue: "" }, function() {
            g.cursorToEnd(), g.props.onChange && g.props.onChange(fe.replace(/[^0-9]+/g, ""), g.getCountryData(), T, fe);
          });
        }
      }, g.handleInputFocus = function(U) {
        g.numberInputRef && g.numberInputRef.value === g.props.prefix && g.state.selectedCountry && !g.props.disableCountryCode && g.setState({ formattedNumber: g.props.prefix + g.state.selectedCountry.dialCode }, function() {
          g.props.jumpCursorToEnd && setTimeout(g.cursorToEnd, 0);
        }), g.setState({ placeholder: "" }), g.props.onFocus && g.props.onFocus(U, g.getCountryData()), g.props.jumpCursorToEnd && setTimeout(g.cursorToEnd, 0);
      }, g.handleInputBlur = function(U) {
        U.target.value || g.setState({ placeholder: g.props.placeholder }), g.props.onBlur && g.props.onBlur(U, g.getCountryData());
      }, g.handleInputCopy = function(U) {
        if (g.props.copyNumbersOnly) {
          var T = window.getSelection().toString().replace(/[^0-9]+/g, "");
          U.clipboardData.setData("text/plain", T), U.preventDefault();
        }
      }, g.getHighlightCountryIndex = function(U) {
        var T = g.state.highlightCountryIndex + U;
        return T < 0 || T >= g.state.onlyCountries.length + g.state.preferredCountries.length ? T - U : g.props.enableSearch && T > g.getSearchFilteredCountries().length ? 0 : T;
      }, g.searchCountry = function() {
        var U = g.getProbableCandidate(g.state.queryString) || g.state.onlyCountries[0], T = g.state.onlyCountries.findIndex(function(K) {
          return K == U;
        }) + g.state.preferredCountries.length;
        g.scrollTo(g.getElement(T), !0), g.setState({ queryString: "", highlightCountryIndex: T });
      }, g.handleKeydown = function(U) {
        var T = g.props.keys, K = U.target.className;
        if (K.includes("selected-flag") && U.which === T.ENTER && !g.state.showDropdown)
          return g.handleFlagDropdownClick(U);
        if (K.includes("form-control") && (U.which === T.ENTER || U.which === T.ESC))
          return U.target.blur();
        if (g.state.showDropdown && !g.props.disabled && (!K.includes("search-box") || U.which === T.UP || U.which === T.DOWN || U.which === T.ENTER || U.which === T.ESC && U.target.value === "")) {
          U.preventDefault ? U.preventDefault() : U.returnValue = !1;
          var se = function(oe) {
            g.setState({ highlightCountryIndex: g.getHighlightCountryIndex(oe) }, function() {
              g.scrollTo(g.getElement(g.state.highlightCountryIndex), !0);
            });
          };
          switch (U.which) {
            case T.DOWN:
              se(1);
              break;
            case T.UP:
              se(-1);
              break;
            case T.ENTER:
              g.props.enableSearch ? g.handleFlagItemClick(g.getSearchFilteredCountries()[g.state.highlightCountryIndex] || g.getSearchFilteredCountries()[0], U) : g.handleFlagItemClick([].concat(n(g.state.preferredCountries), n(g.state.onlyCountries))[g.state.highlightCountryIndex], U);
              break;
            case T.ESC:
            case T.TAB:
              g.setState({ showDropdown: !1 }, g.cursorToEnd);
              break;
            default:
              (U.which >= T.A && U.which <= T.Z || U.which === T.SPACE) && g.setState({ queryString: g.state.queryString + String.fromCharCode(U.which) }, g.state.debouncedQueryStingSearcher);
          }
        }
      }, g.handleInputKeyDown = function(U) {
        var T = g.props, K = T.keys, se = T.onEnterKeyPress, oe = T.onKeyDown;
        U.which === K.ENTER && se && se(U), oe && oe(U);
      }, g.handleClickOutside = function(U) {
        g.dropdownRef && !g.dropdownContainerRef.contains(U.target) && g.state.showDropdown && g.setState({ showDropdown: !1 });
      }, g.handleSearchChange = function(U) {
        var T = U.currentTarget.value, K = g.state, se = K.preferredCountries, oe = K.selectedCountry, le = 0;
        if (T === "" && oe) {
          var fe = g.state.onlyCountries;
          le = g.concatPreferredCountries(se, fe).findIndex(function(be) {
            return be == oe;
          }), setTimeout(function() {
            return g.scrollTo(g.getElement(le));
          }, 100);
        }
        g.setState({ searchValue: T, highlightCountryIndex: le });
      }, g.concatPreferredCountries = function(U, T) {
        return U.length > 0 ? n(new Set(U.concat(T))) : T;
      }, g.getDropdownCountryName = function(U) {
        return U.localName || U.name;
      }, g.getSearchFilteredCountries = function() {
        var U = g.state, T = U.preferredCountries, K = U.onlyCountries, se = U.searchValue, oe = g.props.enableSearch, le = g.concatPreferredCountries(T, K), fe = se.trim().toLowerCase().replace("+", "");
        if (oe && fe) {
          if (/^\d+$/.test(fe))
            return le.filter(function(ae) {
              var pe = ae.dialCode;
              return ["".concat(pe)].some(function($) {
                return $.toLowerCase().includes(fe);
              });
            });
          var be = le.filter(function(ae) {
            var pe = ae.iso2;
            return ["".concat(pe)].some(function($) {
              return $.toLowerCase().includes(fe);
            });
          }), Y = le.filter(function(ae) {
            var pe = ae.name, $ = ae.localName;
            return ae.iso2, ["".concat(pe), "".concat($ || "")].some(function(te) {
              return te.toLowerCase().includes(fe);
            });
          });
          return g.scrollToTop(), n(new Set([].concat(be, Y)));
        }
        return le;
      }, g.getCountryDropdownList = function() {
        var U = g.state, T = U.preferredCountries, K = U.highlightCountryIndex, se = U.showDropdown, oe = U.searchValue, le = g.props, fe = le.disableDropdown, be = le.prefix, Y = g.props, ae = Y.enableSearch, pe = Y.searchNotFound, $ = Y.disableSearchIcon, te = Y.searchClass, Ae = Y.searchStyle, Fe = Y.searchPlaceholder, Re = Y.autocompleteSearch, Be = g.getSearchFilteredCountries().map(function(Ie, Je) {
          var Xe = K === Je, gt = E()({ country: !0, preferred: Ie.iso2 === "us" || Ie.iso2 === "gb", active: Ie.iso2 === "us", highlight: Xe }), $e = "flag ".concat(Ie.iso2);
          return h.a.createElement("li", Object.assign({ ref: function(et) {
            return g["flag_no_".concat(Je)] = et;
          }, key: "flag_no_".concat(Je), "data-flag-key": "flag_no_".concat(Je), className: gt, "data-dial-code": "1", tabIndex: fe ? "-1" : "0", "data-country-code": Ie.iso2, onClick: function(et) {
            return g.handleFlagItemClick(Ie, et);
          }, role: "option" }, Xe ? { "aria-selected": !0 } : {}), h.a.createElement("div", { className: $e }), h.a.createElement("span", { className: "country-name" }, g.getDropdownCountryName(Ie)), h.a.createElement("span", { className: "dial-code" }, Ie.format ? g.formatNumber(Ie.dialCode, Ie) : be + Ie.dialCode));
        }), Ge = h.a.createElement("li", { key: "dashes", className: "divider" });
        T.length > 0 && (!ae || ae && !oe.trim()) && Be.splice(T.length, 0, Ge);
        var Ze = E()(t({ "country-list": !0, hide: !se }, g.props.dropdownClass, !0));
        return h.a.createElement("ul", { ref: function(Ie) {
          return !ae && Ie && Ie.focus(), g.dropdownRef = Ie;
        }, className: Ze, style: g.props.dropdownStyle, role: "listbox", tabIndex: "0" }, ae && h.a.createElement("li", { className: E()(t({ search: !0 }, te, te)) }, !$ && h.a.createElement("span", { className: E()(t({ "search-emoji": !0 }, "".concat(te, "-emoji"), te)), role: "img", "aria-label": "Magnifying glass" }, "🔎"), h.a.createElement("input", { className: E()(t({ "search-box": !0 }, "".concat(te, "-box"), te)), style: Ae, type: "search", placeholder: Fe, autoFocus: !0, autoComplete: Re ? "on" : "off", value: oe, onChange: g.handleSearchChange })), Be.length > 0 ? Be : h.a.createElement("li", { className: "no-entries-message" }, h.a.createElement("span", null, pe)));
      };
      var ie, X = new q(M.enableAreaCodes, M.enableTerritories, M.regions, M.onlyCountries, M.preferredCountries, M.excludeCountries, M.preserveOrder, M.masks, M.priority, M.areaCodes, M.localization, M.prefix, M.defaultMask, M.alwaysDefaultMask), de = X.onlyCountries, he = X.preferredCountries, me = X.hiddenAreaCodes, xe = M.value ? M.value.replace(/\D/g, "") : "";
      ie = M.disableInitialCountryGuess ? 0 : xe.length > 1 ? g.guessSelectedCountry(xe.substring(0, 6), M.country, de, me) || 0 : M.country && de.find(function(U) {
        return U.iso2 == M.country;
      }) || 0;
      var je, Pe = xe.length < 2 && ie && !I()(xe, ie.dialCode) ? ie.dialCode : "";
      je = xe === "" && ie === 0 ? "" : g.formatNumber((M.disableCountryCode ? "" : Pe) + xe, ie.name ? ie : void 0);
      var Ne = de.findIndex(function(U) {
        return U == ie;
      });
      return g.state = { showDropdown: M.showDropdown, formattedNumber: je, onlyCountries: de, preferredCountries: he, hiddenAreaCodes: me, selectedCountry: ie, highlightCountryIndex: Ne, queryString: "", freezeSelection: !1, debouncedQueryStingSearcher: _()(g.searchCountry, 250), searchValue: "" }, g;
    }
    var J, ee;
    return function(M, g) {
      if (typeof g != "function" && g !== null)
        throw new TypeError("Super expression must either be null or a function");
      M.prototype = Object.create(g && g.prototype, { constructor: { value: M, writable: !0, configurable: !0 } }), g && b(M, g);
    }(G, Z), J = G, (ee = [{ key: "componentDidMount", value: function() {
      document.addEventListener && this.props.enableClickOutside && document.addEventListener("mousedown", this.handleClickOutside), this.props.onMount && this.props.onMount(this.state.formattedNumber.replace(/[^0-9]+/g, ""), this.getCountryData(), this.state.formattedNumber);
    } }, { key: "componentWillUnmount", value: function() {
      document.removeEventListener && this.props.enableClickOutside && document.removeEventListener("mousedown", this.handleClickOutside);
    } }, { key: "componentDidUpdate", value: function(M, g, ie) {
      M.country !== this.props.country ? this.updateCountry(this.props.country) : M.value !== this.props.value && this.updateFormattedNumber(this.props.value);
    } }, { key: "updateFormattedNumber", value: function(M) {
      if (M === null)
        return this.setState({ selectedCountry: 0, formattedNumber: "" });
      var g = this.state, ie = g.onlyCountries, X = g.selectedCountry, de = g.hiddenAreaCodes, he = this.props, me = he.country, xe = he.prefix;
      if (M === "")
        return this.setState({ selectedCountry: X, formattedNumber: "" });
      var je, Pe, Ne = M.replace(/\D/g, "");
      if (X && I()(M, xe + X.dialCode))
        Pe = this.formatNumber(Ne, X), this.setState({ formattedNumber: Pe });
      else {
        var U = (je = this.props.disableCountryGuess ? X : this.guessSelectedCountry(Ne.substring(0, 6), me, ie, de) || X) && I()(Ne, xe + je.dialCode) ? je.dialCode : "";
        Pe = this.formatNumber((this.props.disableCountryCode ? "" : U) + Ne, je || void 0), this.setState({ selectedCountry: je, formattedNumber: Pe });
      }
    } }, { key: "render", value: function() {
      var M, g, ie, X = this, de = this.state, he = de.onlyCountries, me = de.selectedCountry, xe = de.showDropdown, je = de.formattedNumber, Pe = de.hiddenAreaCodes, Ne = this.props, U = Ne.disableDropdown, T = Ne.renderStringAsFlag, K = Ne.isValid, se = Ne.defaultErrorMessage, oe = Ne.specialLabel;
      if (typeof K == "boolean")
        g = K;
      else {
        var le = K(je.replace(/\D/g, ""), me, he, Pe);
        typeof le == "boolean" ? (g = le) === !1 && (ie = se) : (g = !1, ie = le);
      }
      var fe = E()((t(M = {}, this.props.containerClass, !0), t(M, "react-tel-input", !0), M)), be = E()({ arrow: !0, up: xe }), Y = E()(t({ "form-control": !0, "invalid-number": !g, open: xe }, this.props.inputClass, !0)), ae = E()({ "selected-flag": !0, open: xe }), pe = E()(t({ "flag-dropdown": !0, "invalid-number": !g, open: xe }, this.props.buttonClass, !0)), $ = "flag ".concat(me && me.iso2);
      return h.a.createElement("div", { className: "".concat(fe, " ").concat(this.props.className), style: this.props.style || this.props.containerStyle, onKeyDown: this.handleKeydown }, oe && h.a.createElement("div", { className: "special-label" }, oe), ie && h.a.createElement("div", { className: "invalid-number-message" }, ie), h.a.createElement("input", Object.assign({ className: Y, style: this.props.inputStyle, onChange: this.handleInput, onClick: this.handleInputClick, onDoubleClick: this.handleDoubleClick, onFocus: this.handleInputFocus, onBlur: this.handleInputBlur, onCopy: this.handleInputCopy, value: je, onKeyDown: this.handleInputKeyDown, placeholder: this.props.placeholder, disabled: this.props.disabled, type: "tel" }, this.props.inputProps, { ref: function(te) {
        X.numberInputRef = te, typeof X.props.inputProps.ref == "function" ? X.props.inputProps.ref(te) : typeof X.props.inputProps.ref == "object" && (X.props.inputProps.ref.current = te);
      } })), h.a.createElement("div", { className: pe, style: this.props.buttonStyle, ref: function(te) {
        return X.dropdownContainerRef = te;
      } }, T ? h.a.createElement("div", { className: ae }, T) : h.a.createElement("div", { onClick: U ? void 0 : this.handleFlagDropdownClick, className: ae, title: me ? "".concat(me.localName || me.name, ": + ").concat(me.dialCode) : "", tabIndex: U ? "-1" : "0", role: "button", "aria-haspopup": "listbox", "aria-expanded": !!xe || void 0 }, h.a.createElement("div", { className: $ }, !U && h.a.createElement("div", { className: be }))), xe && this.getCountryDropdownList()));
    } }]) && l(J.prototype, ee), G;
  }(h.a.Component);
  ce.defaultProps = { country: "", value: "", onlyCountries: [], preferredCountries: [], excludeCountries: [], placeholder: "1 (702) 123-4567", searchPlaceholder: "search", searchNotFound: "No entries to show", flagsImagePath: "./flags.png", disabled: !1, containerStyle: {}, inputStyle: {}, buttonStyle: {}, dropdownStyle: {}, searchStyle: {}, containerClass: "", inputClass: "", buttonClass: "", dropdownClass: "", searchClass: "", className: "", autoFormat: !0, enableAreaCodes: !1, enableTerritories: !1, disableCountryCode: !1, disableDropdown: !1, enableLongNumbers: !1, countryCodeEditable: !0, enableSearch: !1, disableSearchIcon: !1, disableInitialCountryGuess: !1, disableCountryGuess: !1, regions: "", inputProps: {}, localization: {}, masks: null, priority: null, areaCodes: null, preserveOrder: [], defaultMask: "... ... ... ... ..", alwaysDefaultMask: !1, prefix: "+", copyNumbersOnly: !0, renderStringAsFlag: "", autocompleteSearch: !1, jumpCursorToEnd: !0, enableAreaCodeStretch: !1, enableClickOutside: !0, showDropdown: !1, isValid: !0, defaultErrorMessage: "", specialLabel: "Phone", onEnterKeyPress: null, keys: { UP: 38, DOWN: 40, RIGHT: 39, LEFT: 37, ENTER: 13, ESC: 27, PLUS: 43, A: 65, Z: 90, SPACE: 32, TAB: 9 } }, r.default = ce;
}]);
const PhoneInput = /* @__PURE__ */ getDefaultExportFromCjs(lib), EditProfileComponent = ({ setEditMasjid: a }) => {
  var G, J, ee;
  let r = useAppSelector((M) => M.AdminMasjid);
  const [c, t] = useState(), [e, n] = useState(), [s, i] = useState(), [u, l] = useState(), [m, p] = useState(
    c && (c == null ? void 0 : c.country)
  ), [d, f] = useState(), b = useAppThunkDispatch();
  let y = useRef(null), h = useRef(null), D = useRef(null), _ = useRef(r && r.contact), x = useRef(r && r);
  const [j, w] = useState();
  let A = useRef(null), R = useRef(null);
  const [I, k] = useState(!1), [E, z] = useState(!1), S = useAppSelector((M) => M.admin), Q = () => {
    a(!1);
  };
  useEffect(() => {
    let M = S.masjids[0];
    w(M);
  }, [j]), useEffect(() => {
    j && b(fetchMasjidById(j)).then((g) => {
      g.message === "Success" && t(g.data);
    });
  }, [j]);
  const P = (M, g) => {
    g.preventDefault(), p(M == null ? void 0 : M.name), x.current = M == null ? void 0 : M.name;
  };
  c === void 0 && window.location.reload();
  const O = () => {
    var X, de, he, me, xe, je;
    z(!0);
    const M = (X = D.current) == null ? void 0 : X.value, g = (de = y.current) == null ? void 0 : de.value, ie = (he = h.current) == null ? void 0 : he.value;
    if (M ? M && i(!1) : n(!0), g ? g && i(!1) : i(!0), ie ? ie && l(!1) : l(!0), _.current.numberInputRef.value ? f(!1) : _.current.numberInputRef.value || f(!0), m == "" && p(c == null ? void 0 : c.country), ie && g && M && ((me = _.current.numberInputRef.value) == null ? void 0 : me.length) > 9) {
      let Pe = {
        address: M,
        masjidName: g,
        description: ie,
        contact: _.current.numberInputRef.value,
        externalLinks: [
          {
            name: "Facebook",
            url: (xe = A == null ? void 0 : A.current) == null ? void 0 : xe.value
          },
          {
            name: "Website",
            url: (je = R == null ? void 0 : R.current) == null ? void 0 : je.value
          }
        ]
      };
      b(updateAdminMasjid(j ?? "", Pe)).then((U) => {
        U.message === "Success" ? (z(!1), k(!0), handleSnackbar(
          !0,
          "success",
          "Updated the Masjid Successfully",
          b
        )) : handleSnackbar(
          !0,
          "error",
          `Failed To Fetch :${U.message}`,
          b
        );
      });
    } else
      handleSnackbar(
        !0,
        "warning",
        "Please enter correct details before trying again",
        b
      );
  }, [F, V] = useState(), q = useRef(null), ce = (M) => {
    const g = M.target.files && M.target.files[0], ie = new FileReader();
    ie.addEventListener("load", () => {
      V(ie == null ? void 0 : ie.result);
    }), g && ie.readAsDataURL(g);
  }, Z = () => {
    V(""), q.current.value = "";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "EditProfileContainer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "EditProfileCard", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "EditProfileContainerTop", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "EditProfileContainerRevertIcon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      MdCancel,
      {
        className: "EditMasjidCancelIcon",
        onClick: Q
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "EditProfileContainerBottom", children: [
      I ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "MasjidUpdatedPopup", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "MasjidUpdatedPopupInside", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "BorderForMasjidUpdatedPopup", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "TextForUpdate", children: "Masjid Information Updated Successfully" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "CloseBtnForMasjidUpdatedPopup",
            onClick: (M) => {
              a(!1);
            },
            children: "close"
          }
        )
      ] }) }) }) : "",
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "EditProfileForm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "RightTextContainer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "EdirProfilePhotoBlock", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "PhotoPreview", children: [
            F && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: F,
                className: "previewImageBox",
                alt: "Preview Image"
              }
            ),
            ((G = q == null ? void 0 : q.current.value) == null ? void 0 : G.length) > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: "CancelBtnMazjid",
                onClick: Z,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: CANCEL, className: "CancelBtnMazjidImg" })
              }
            ) }) : ""
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inputFieldButton", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: "InputFildTimingsContainer",
                type: "file",
                id: "imageInput",
                onChange: ce,
                accept: "image/*",
                ref: q
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                className: "labelForUploadFileMazjid",
                htmlFor: "imageInput",
                children: "Upload Profile Photo"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "MasjidName", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          TextField,
          {
            autoFocus: !0,
            margin: "dense",
            id: "name",
            variant: "outlined",
            error: s,
            helperText: s ? "Manditory field" : "",
            label: "Masjid Name",
            sx: { marginBottom: 3 },
            type: "text",
            fullWidth: !0,
            disabled: !0,
            style: { backgroundColor: "white" },
            inputRef: y,
            defaultValue: r == null ? void 0 : r.masjidName
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "MasjidAddress", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          TextField,
          {
            id: "outlined-required",
            variant: "outlined",
            error: e,
            helperText: e ? "Manditory field" : "",
            label: "Address",
            inputRef: D,
            defaultValue: r == null ? void 0 : r.address,
            fullWidth: !0,
            sx: {
              marginBottom: 3,
              "& .react-tel-input .special-label": {
                background: "transparent"
              }
            },
            style: { backgroundColor: "white" },
            type: "text"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "MasjidNumber", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            PhoneInput,
            {
              placeholder: "Enter phone number",
              onChange: (M, g, ie) => P(g, ie),
              value: r && (r == null ? void 0 : r.contact),
              inputClass: "PhoneInputStyle"
            }
          ),
          d && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "red" }, children: "Please Enter the Contact Number" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "MasjidDescReq", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          TextField,
          {
            id: "outlined-required",
            variant: "outlined",
            error: u,
            helperText: u ? "Manditory field" : "",
            label: "Description",
            fullWidth: !0,
            multiline: !0,
            rows: 4,
            inputRef: h,
            style: { backgroundColor: "white" },
            type: "text",
            sx: { marginTop: 3 },
            defaultValue: r && (r == null ? void 0 : r.description)
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "EditProfileImage", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "UpdatePhotoComponentContainer", children: j ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          UpdateProfileImageComponent,
          {
            ParentComponentType: "Masjid",
            OperationType: "ADD",
            MazjidId: j
          }
        ) : null }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "SocialMediaLink", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "EnterLinks", children: "Add Social links" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "WebsiteInput", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "url",
                className: "FaceBookMasjidLink",
                placeholder: "Enter FaceBook Link Here",
                ref: A,
                defaultValue: (J = r == null ? void 0 : r.externalLinks[1]) == null ? void 0 : J.url
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "url",
                className: "WebsiteMasjidLink",
                placeholder: "Enter Website Link Here",
                ref: R,
                defaultValue: (ee = r == null ? void 0 : r.externalLinks[0]) == null ? void 0 : ee.url
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "UpdateBottomMasjid", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "UpdateBottomButton", onClick: O, children: E ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircularProgress, { size: "20px", color: "inherit" }) : "Update Masjid" }) })
      ] })
    ] })
  ] }) }) });
}, MasjidProfile = () => {
  const [a, r] = useState(!1);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "MasjidProfileContainer", children: a ? /* @__PURE__ */ jsxRuntimeExports.jsx(EditProfileComponent, { setEditMasjid: r }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(MasjidProfileCard, { setEditMasjid: r }) }) });
};
export {
  MasjidProfile as default
};

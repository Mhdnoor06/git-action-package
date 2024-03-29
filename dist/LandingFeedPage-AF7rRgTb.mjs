import { bs as L, ap as x, Y as C, X as p, y as A, bt as v, bu as N, bv as S, ao as w, ad as P } from "./index-XkptO5g9.mjs";
import { useState as f, useEffect as j } from "react";
import { N as Q } from "./NoImgFound-8bVP7rb5.mjs";
import { f as V, F as T } from "./Dashboard-wU64Oe5M.mjs";
import { N as I } from "./NoEventAvaliable-vBaWXttD.mjs";
import { P as X, R as K } from "./ReadMoreReadLess-LZuDJMQy.mjs";
import "react-dom";
import "./swiper-bundle-HqgJZv8V.mjs";
import "./FetchingMasjidByAdminAction-0AI5KNsP.mjs";
import "./index.esm-dKdnsyf6.mjs";
const q = (o, t) => async () => {
  try {
    return (await L(o, t)).data.data;
  } catch (c) {
    return {
      success: !1,
      message: c.response.data.message ? c.response.data.message : "Failed To Login:SomeThing Went Wrong"
    };
  }
}, R = "data:image/png;base64,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", z = "data:image/png;base64,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", J = () => {
  const o = N.en, t = x();
  let c = C(/* @__PURE__ */ new Date()).format("YYYY-MM-DD");
  const [n, l] = f([]), [u, s] = f();
  return j(() => {
    const a = localStorage.getItem("admin"), d = a ? JSON.parse(a) : null;
    let i = d == null ? void 0 : d.masjids[0];
    s(i);
  }, []), j(() => {
    u && t(q(u, c)).then((d) => {
      var i;
      !d.timings === null ? p(
        !0,
        "error",
        `Failed To Fetch :${d.message}`,
        t
      ) : l((i = d[0]) == null ? void 0 : i.timings);
    });
  }, [u]), /* @__PURE__ */ A.jsxs("div", { className: "FeedTimingsCardContainer", children: [
    /* @__PURE__ */ A.jsxs("div", { className: "FeedTimingsTitle", children: [
      /* @__PURE__ */ A.jsxs("span", { className: "FeedTimingsTitleSentence", children: [
        /* @__PURE__ */ A.jsx("img", { src: R }),
        o.TIMING_CARD.TABLE_TITLE
      ] }),
      /* @__PURE__ */ A.jsx(
        v,
        {
          to: "/masjidtimings",
          style: { textDecoration: "none", color: "white" },
          children: /* @__PURE__ */ A.jsx("span", { className: "FeedTimingsTitleViewAll", children: "view all" })
        }
      )
    ] }),
    (n == null ? void 0 : n.length) > 0 ? /* @__PURE__ */ A.jsx("div", { className: "FeedTimingsTable", children: /* @__PURE__ */ A.jsx("table", { className: "TimingsTableContainer", children: /* @__PURE__ */ A.jsx("thead", { children: /* @__PURE__ */ A.jsx("tr", {
      // console.log(TodaysTimings)
      children: (n == null ? void 0 : n.length) > 0 && n.map((a, d) => {
        let i = new Date(a.azaanTime * 1e3), h = new Date(a.jamaatTime * 1e3);
        return /* @__PURE__ */ A.jsx("div", { className: "TableValueFlex", children: /* @__PURE__ */ A.jsxs("tr", { className: "TimingsTableRow", children: [
          /* @__PURE__ */ A.jsx("td", { className: "TimingsTableBodyItem", children: a.namazName }),
          /* @__PURE__ */ A.jsxs("td", { className: "TimingsTableHeadItem", children: [
            " ",
            o.TIMING_CARD.AZAAN_TIME
          ] }),
          /* @__PURE__ */ A.jsx("td", { className: "TimingsTableBodyItemTime", children: a.azaanTime && i.toLocaleString([], { timeStyle: "short" }) }),
          /* @__PURE__ */ A.jsxs("td", { className: "TimingsTableHeadItem", children: [
            o.TIMING_CARD.JAMAAT_TIME,
            " "
          ] }),
          /* @__PURE__ */ A.jsx("td", { className: "TimingsTableBodyItemTime", children: a.jamaatTime && h.toLocaleString([], { timeStyle: "short" }) })
        ] }, a._id) });
      })
    }) }) }) }) : /* @__PURE__ */ A.jsx("div", { className: "ImgContainerTimings", children: /* @__PURE__ */ A.jsx("img", { src: z, className: "NoTimingsFound" }) })
  ] });
}, H = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOjSURBVHgB3Zq/b9NAFMff3dVJJYTkkY2Uwkqbja2uRKtstBsMNP4PUsZOtBtMlL8Ah4mNditFqO7WrYaZQvoX4AohESe+452dpGl+NHZzCbY/Uusfcaz75r179+7eEVCFaeg5yBmCC4MQchfvLAoQOgGitx/Baxeva8FRkGOg4Hjg2WDZLiiAwDigAI1rZXzLGjbSgBuC4mwQxGq8P6zCGNxMjLQCz1UEEZvdv7wCaqjM8iitgnVQg5gwiEl+Y6VCge2hK5VQyCyoRcef12Ag1mYe3if+t7OTOF+ObhmzVMgJ/hHPFmF61DxCl6NaKZJlQmuID2iJAkwXHa1kopXqUaw0UkxuY/UlEPJqAi4VlVn0nxJbmAf/69nxdQ9eKyYUAtuQBGRfGiFoqJhECWkzQtBAMbKPSNeCJIKCsA9dDOpD/dEMo5Ym/FPF44dqXIxyxd4oR3ufwvB7lHAhEr01TFzhipu13OspKCJIU+So3vWnMLzf6XW3SzcLB8UjPCuAIrzqYZ8b58qrAtSB7ubNtRPVjpvlOC+DQiFTQuaIm+2Lyz5DwIQ0QqAiE195GojRnq+YkD6rtNHzft6UJ6FlKJQhxXDKn8gjlSYaZ2KVBIL2ow7KmsyADMBIfokyyqY5P5kY1OfLFKe+S5AB5GAsA0DSU5doEFggWnnlV5xcTKYojernZZgw2K6jmIHJpSlIKqOiU8gQ2RIjl0ohG7gEU/KfMKG8bApTgA74UgfdjDuQCYRLhSDnkAFkVYFyzm3IAD4jp9Sf8W3IAL6oH1M5f24tPKSWoP2oIxhnKBf7kGYosYKD/FdnTSvF402t8S6suIUZAJoIo8FbSCMEOqXDTjrjUW83hdapUaBW++LKCJ03H28KQd+AIgYFFpXrDViKfFG3Pu1evrsHnEfIRfM0TKVrmC7Ndd/oy5oZYetJdzfZPiprnT301WeazndXK96ro9FKkFBQyBa610Hv/YHFJt/5ccKK89IFDUgaBHY863BgIWxoGdB3zuzECQqFbA/7+NoCbaIEjRAiGVk6l4JminMXOPl59D/K563OvjXMtbqJvENjFotRXHExKgIOCln/G3GHRuyNQK2BtQITFNWyxk73gBiF2BuBZKTTig/2cVn3AkJBytbdgn1ohLy+RRrP/lhfbIjJePvNEM3EQpWA8tj7zQjs3YJG1R1jI93YYtroWB/5DcxgnC22FuOlxQoDdgLKxjpEiPMm5fZt8G1X0U7AfzhBZEtdiLWmAAAAAElFTkSuQmCC", y = (o) => async () => {
  try {
    return await S(o);
  } catch (t) {
    return {
      success: !1,
      message: t.response.data.message ? t.response.data.message : "Failed To Login:SomeThing Went Wrong"
    };
  }
}, k = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYIAAAEMCAYAAADJQLEhAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAB+NSURBVHgB7d1ddtPWFsDxnQBdfWs6gooR1IwAG+59bhgBZgRNR4AZAekIMCOAPnWt9gabETSMAHUEN327DxDu3vaROT7Rl23Jlk7+v7W8YiuyrM+zdT4lAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADovSMBgAp//vnn8O7du8/17cBNequvF6PRKBX0HoEAQKmLi4uz4+Pjlzn/SvX1RIPBpaDXCAQACs1mM8sFTEpmudLXA3IG/UYgAJDLFQfNasyayjIYXAl66VgA3Hq///57onf/J/40DQKvan490ddzQW+RIwBuIUv0P336NNCy/1N9/fTly5e/Hz16NPT+X1UklEczBaO5oHfuCoBbwRL/6+vrsSX8+nGgd/yrHMDR0dEzb75ENg8CxnIQ9wW9QyAAImZFPt98882pS/yH+vfGPJobeK+5gbn3eaKBQbaQXFxcjB8/fjwV9AqBAIiMJf7ffvvtU307dK9SmuhPs/cuN/BUtqSBxoqUpoJeoY4AiMCmib8n1XL9VXHOu3fvphoYtg4EDnUFPUOOAOgp18rnZ9k88ffNveUlskNuwPPcXy66j0AA9EhQ4TuU3b3I3uhyc+sQtjCw9aRfQX8QCICOCxP/hhJrc+n3CNblNpEbMIv11b/ngl4gEAAd5Xr2Lop+NJE+kYZpYv06e++KhYbSEBe0CAQ9QSAAOsQSf9fJy+7OG0/8ffobb7P3DRYLZYYUD/UHgQA4MK/S91S+DvPctraKhVYoHuoPAgFwANkQD26M/6HsmSbS74NJQ2kYxUP9QSAA9igr+tG3T/0hHvbNLxaydZJ20HqoJwgEQMtaaPK5qyu/w5cLTG2wQGdFXXNBpxEIgJb4d/9ttPrZlo0t5H/WdXsoLdEAaNs/F3QagQBoUAfv/m/QQDDP3ruK6tYqqN1+OBN0GoEAaMAff/wxuHfv3iLR69Ldfx5dv9Uzhj9//jy8c+eOtCihnqD7CATADlynr4O0/NmWXz9wdHQ0lJa54qGpoLMIBMCGvHb/VuTR6bv/UE79wI/Svn31jcCWCARATX7lr/QsAGQ0EFwGk4bSsjYro9EMAgFQoY/FP0U0UZ5n71vsPxBKBJ1GIAByeK1/rAgokXik2Rvdtn0V2Zzo/hxo3cSloJMIBIDHL//veuufbfiJ8T4qijMaVC3oEAg6ikAAyHIYZk2srPK3t+X/NawlxBoIfpD9ocK4wwgEuNX88v+Gh2HuHK0o/juYtLfEWYNOIugsAgFupZgqgOvyWwztsaJ4QQPBPpqpYksEAtwqtzEAZPwexZow77v4KxF0Vtx5YcC5uLgYaz3ARw0CM7mFQcBZDfOggWDvZfbucZjoIHIEiJoFAL0TthxAIvBzBIeovLXfTAWdQyBAlFwR0EuhtUrmyh/4bc8thhaur68TQScRCBCV21wHUEYrij8Ekw4RIBNBJxEIEAUCQKVVbuBQZfU0Ie0uAgF6zSVqVgTU1uMWo+A3Hf306VOiQVP27RDFUaiHQIBWZGP1SLu9dG3ZMfcEbpJfP3Co/ZUIOolAgLa8avGh6NiQHos0e3/AIpoTnlbWTfQjQCu0KOKBoEv8xDeRwyH31kHkCLAPcy0mei8tc0NGk9DkS7M3B660TYS+BJ1DIEDrLAg8fvx4Ii179+7d+IDl352mxTFp9l730XdyIPQl6CaKhoD4hWXyBEusIRAA8VsLBFp/870cTiLoHAIBELnwOQQHbs9PbqSDCAQA9kYr9A9WP4FiBAIgcpoD+Ji9d89kPpgDF0uhAK2G0Bgb70fv+Gwws+SQLVNQThPj1yX/TlzRUSLtoGiogwgE2Ikb7M2GebBexFzkHXR9fb2qI3C9esdV33FjONkxtb4ZiTSE8Ya6iUCArTDaZ9xcv4Nze2lQGOtfHu4TMeoIsDFNGJ7f8kc+3ioaFKb2R+gRHC0CATaiQeCV/pkI+iSVHbkcgo0fdSm7SQSdQyBAbS4IjAW3kqtfIGcQIQIBarHiICEI3HouGDwRRIVAgEquBclEAFkEg8vr6+tfZUuH7suAmwgEqPTly5eJoLeOj48bfxCMLnMi2yMQdAyBAKUsN3B0dPRU0GeNBwJXRDQXRIFAgFJaBMDjJpFLz40PgigQCFBKiwB+EiDfrk1J0REEApTS+oH7AiBqBAKUYmwYIH4EAgDbSgRRIBCgVPh0KyCj9UcPBVEgEKCU/1AT9Fbj7fZdJ8OhIAoEApS6vr5+L+g1PYZtdOD6WRANAgFKafZ/LoDH5QbOBNEgEKDUaDSaCz1Ise6N7Kbxns7YDYEAdbwQQFZDkQ9kB254CnQIgQCVLFewy2iTOLhEdmQjhurLnko3FkSHQIBaHj9+bGXCc8GtY8+n1j9/Ca2EosXD67EJeyCJ3RXuVDSA7rMcgOYCx26sqaE0JxV0DoEAtbmy3QcXFxfnmkDQfLAn9FithglxCfxZxbwW6Af6XnA7EAiwMSsm0gTFRp60x1cmgl7RBP65HAg91buJkI+taO5gqi8bmfSZXtx0OuswPT7fZ+9psYM85AiwEwsI+mfqnkM71GKHwdHRkT3VzMqWeSRhN4TH4UoOdGwYsqSbCARohLvTfOte8u7du1QvegJBB+hx+M7/rDmEfw51bPRG4R9B51A0BMRvLdE/8F05RVMdRCAA4rcWCCxHIIeTCjqHoiG07vj4+MeLi4uxtCwsAsGK9Qo+8SqKD3ZXrudCKugcAgH24VQTgFPBIVmuYBEANEdg9TdyIBQNdRBFQ2gFrUM6xy8eSuVwUkHnkCNAW55ZD9YWW6ecuCaqqMGa9eof6wRoOYKD3ZXTj6GbCARohV7wqbT88BL3gBQb+ygRVFkF5Dt37lzKYRzqd1GBoiH0lgWbrHezUORQJfHeH+Su/MCtlVCCQIDe84a74AE6Bay3d/beFc/sPRhoICBH0FEEAvSWKxpa0QRuon/ua4LzWrBGA8GPwaRU9i8VdBKBAL1l4+XboxP9gGDFRY8ePRoLASEUdir7IHt2fHxMjqCjCATos1SWj078SECodOLvH+tLIPtHi6GOIhCgt4I7zLEsSotma2PtExDW+E+WS2XP9FiQI+goAgH6LA0+J/qaaDD4GA5p4QWE0W19foIWpSXZ+wMU0xAEOoxAgN6y1i8FT7xKNKF7VRAQ5hoQhnILA4KN+eR9TGWPeDJZtxEI0Hdld5p1A8JvcjusioZKgmgr9Lfmgs4iEKDXalZ6VgUEGxDvNtQhJMHnvRXX0GKo2wgE6LtNEpiygHAbKpWt5dAqV7DnDl4Egg4jEKDXthzf/tYGBDf43MIeA0HKYHPdRiBA3+2SmG0SEFKJgG7vw+z9vgafO0TnNWyGQIBea2jcnDoBYSRxDG7nVxinsodOXlQUdx+BADFIpRmrgKCvtSequZFOpxGMdjqwx1ZmH/bRhJaK4u4jEKD3Wih6SHSZ46J/egHhSU/7Ivj1BHNpmbXMEnQagQC910alZ85onTdoAvfW9UXoVcWyVhivcjtt363f1l7cfUMgQO+1NIBa4hehlPErlvX1i3S82MjvYezu1lurJ+AZBP1AIEDvtdj6JdlkZlePcJ7VI3T4bni4r3oCDTpzQecRCNB7bbV+8dvcb8rqEVyx0YOOFhvtq55gLug8AgGi0NLzcLcOBBkbetkrNupMa6OgnmAq7bikI1k/EAgQi7k0zH/O766C5qejQ+cSNPH/KXvvEuu5NEyDDRXFPUEgQBTaqDCu03JoG26gu7EcNpeQ+E8sayPR1mDzVtALBALEIpXm1W45tI1D5xJaLh5K6T/QHwQCRKHF9vCJ7MEhcglB8VAqzRYPzQW9QSBALFJpwS4th7ZRkEtIpR1rzUh1W5t8QM8LQW8QCBCFFp+4tddA4MtyCV6/hMafpKaJ/zh774qHdm7lY/0SXA4DPUEgQEzaGGoikQ5w/RIWT1KTZVBoZHylsPWQBoad6yl0n00FvUIgQDT61HJoW1nRkQYFy6k8aKDoyIqHhtmHBlr6LNZP0CsEAsSkjQrjVlsO7SLrrBbUJ2xTtPPcW+ZcdqvopW6ghwgEiEbfWw7twqtP+F42r09YyxXI9ok5uYGeIhAgJqm0YN8th3bl1SdkQaFOZ7G1XMGWfRp+EfQSgQDRaOixlXl6FQgytj+8we+qRkRdyxVo3ciZbLYvrckrPYl7ikCA2KTSsK60HNqFV8k8lK85hbD46JU3vwWBZ1JPKtQN9NqRABF59+7dVBPup9Ks1FXIRsmez6xB4VT320NrPvr48eOJ9z97/7xiEQ+s4lrQW+QIEJWWnojV2ZZDTXCP3Fy0PgofJKPTJlJ8t3+1nIUg0HcEAkSlpcdWmkRugbyB4lwwWBv/yNU1PGBguTjcFSAibT220rUcurV3vq5Z6DTLGWkOggfORIQ6AkRHE6v/6p9Gi3I0EPyqZednAkSIoiHEKJWGxdByCChCIEB0mhqQzde1MYeAJhEIEJ2WKoyjbjmE241AgBil0o5EgAgRCBCdtgaf69uYQ0BdBALEKJV2JAJEiECA6LT12ErNafwgQIQIBIhVG8VDQwEiRCBAlNpqOSRAhAgEiFUrFcaz2SwRIDIEAkSpxZZDQwEiQyBArFJpRyJAZAgEiFJbj62k5RBiRCBAzFJp3lCAyBAIEK02Bp8TioYQIQIBotXSYytpOYToEAgQrRYfW8mYQ4gKgQDRavGxlYkAESEQIFqj0SiVdloO8ZAaRIVAgNil0jyKhhAVAgGiRsshoBqBAFFrqcL4hJZDiMldASKm5flzDQaJNOzo6IjnFwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGDlyP9wcXExPj4+fuo+pqPR6JnsQJd3psv7KfusyxsJAKBT7gafE30Nsw+z2exK0+5fZEtHR0cDf3kAgO65W/H/s/fv318+fPjwtQDAnuhN6EyWN6YpJQnb0934XP+M7b3uxvtF8x1Lhevr63NdWCIAsAea3pzIsiQhcS9s70xq7MfKQKDsoMzcwQGAVn369Gkg2JlLs2ul23UCgUn09UoAoGVat8hNZwM2Cah1A4E5tVZAAgAtco1MsKNNAmppIPjy5cv7tZmPj19qdmMoANASAkEzNtmPdysWdK5/fpD1ioZXGgysIj+VlljZlmVrNPAM9WW/b5XW/+ifVP9e/vvf/55Li37//ffkm2++OdXf/tFNSvR3P+jfS502r9p2q1zX+Yf2Pm/+P//807bLlv+dfdZ5/9bXvM52WV8P+6tB+upf//rXW/9/f/zxx+DOnTvDbL1tn+l883C+uuw46DJO9e3AW1c7DrX2Q7AMKVrvPP/5z39O/Tuax48fT6WGonW2/aD75nKT8zbcn25ZtY+V3TTpvIltc/jb/jmQ7dOibXTbNPaPq2xwDAqWF+6jTbbLP79tuy79/+9yfhs97t/JDrLrV98m265DKDuW9j7veNb4/tp1kLff/HkL0r+NjvkmgSDsUDbRH3ruTbJmW6m+/pL1Sod5nSZd7969m+rKPF0tbDQ6KpvfVW78LMua7rJsjQWEF3UTh7rsBL57965t/1DKf/tX/e3zohlcx7ysTsX6Ynzvpp+5/Vu0bZZA/lJ2oHUffcnef/78+Yklqq5V16uS9U7dcmsFBF2enUAvpboPyFRfLyrWN9E/H/11KWvGltFzJ9Vz54fsc41zJ5HyfZCZSsU6b3AelJ6Dwfm/uGYq1jOVZb9L+5tdD7YeZUWyE53/hdRQcx9Vbld4fuvrvq7DlZtu65sUfNUSvifhvnfbaefbwH23TpHGNOzw2tT25XElITN/Ofp6YNtd8/uzYL3u552DrrlnVfo3lYJzWL9v2197P1qpz6NHj4aVdQTux8IexkP9wZfSIHcQLeBMpHoDLNJbzqSR1ky2DNsevfjDg1X02y/dAavDlj2wA2Tfk/JtO12uTr3muhbxdV5LaGy/DUtmTfT15v3790+lgqsHqlpeZqyvjxvsi1bU3AeZ8fIrs0HBsp5vcB682mDbB+64li07cet24s5rm7eqXm5SZx022EebXluLlil2/bjgkJTMO5D889uWMXb/3+p69tKPYcWsW6Udmg7OZZn4r5bj3+HXWLdh9tkS35xgmOirbvo3luJz2P638X6sVVlsd5J2FxxMPquTsNThXSCJN/nKdphFb33/zP6GdRay3Lkz2Z2dwGsXnPvtX+133TqkwXcmG9SXvBHXqUNd+cvN2aZElndHldxwIFNZHvTV/nLLvdEJ0PUJKTxBLEFxwcp35Y699TD/xb1Pg3kmh2pI4H53KusnfrbOdgOTnTsfvP8nkpNguAR1krOcJ7LMHdvL9kPqzVN32239/nK/bcfqtTtW4f60BOZM/38uywt6tR7ecU2DZZeei1bMJsE+cufds5LtGkrN81CW5/dZuK4l53fYAtH2xwd9/W2vcOHZdP+lk/8JZpvlbN8vJduX1r2bz4RpoDccTyldl4n/2RW5r3jpn5+wp/qydCc7954E13QiOUF10/2o67LYB1U9i1c0K3WmP2pllMNsmktY3jdQXxDeSVzq64lmWdJwRnfC+/MPrEhL128i27MdfOr99i/62/NgHrvYJrLMqmfs/VyqJbLMQlt27jz8py7XLiL/oju1BLvGiZq4v2/19UzX+SpY7kTWA6yVU9pvTXLWIcmZ/quuQ14idxbuCysS0Glv26w7Crl1Du+G7Vie6fkQ7js7fmM3/2/hcXB1LxNvUqqvkS4nDZYzt+2UZeK3uHDdtk9rHC9LqPKO1ZlfjKTL+1m+JmqW+Ez87fFyC37CkXsuesUlGVvOk5zz2z6f6344d79vxvr91+5uuMzALdfW9Tzc9znnt5UoDLPluv028Ob/4s2b6rqWFiW6Y5d4k37V74Tn7dzWzc4BTQCHuq9rFaf5dL9MZbmfT/K2o4j+1kPvYxoW0Vqg0HkSb9LiHM45n6wY2M7bLOjZy47tqphet3u1H8PiVf1fIkXbJpuxO4jU+7w4IXcpnnEHcehNSiWnHDHjdvpaUZWduLusgzswtkwrR39QdGB1+kSWJ3xmWPN30+XXbwYBt1ybPvenWeWg1GPB5UleIpRXrOcPAugL71qkOAhky54Ed0jZSbk3bp39/W+BaFyUIOt0S6zv521XUDfmZi88B2263allv5MF2Cpvi46VXrBn/vLcX0s0biQI7vOTYBGDvB/M2UcvyhIuu+GT9XOxTtHX1XK1RpOC8/A8zKHq/hpIQ3TfDYNJ50Xz2jmgCeJ4mxsW27ackpHSXEFOkFoLQBao/XpUWR7zsnP4MljGcNZAS86NAkFBfUEi9bOQN1fgZvbqRdVBshNZT6zfvEl1L8SyZU6LEmqf/k5Y5DKs851RQQuBouX6LVVKpC44FXIXvX9S3bgAc05Gm79yX+g6TmS7wLgz+51gnc1WAyRa5bCsX6zTGudg6h+zOsUEOv9vJcuz/ZgG8/9aMn8aZP9PwmKCnH2U1jzH/fWsPKa2njXO77f+55rn97aupCW63uH+Oy3bP17uyqSyzBGu5NyAPZNqU/G2MWvBtYtNcwRZwhJecONtyohnX8cU8b2t892wnE13+EPZj7WTTA9CIwmfLif1P+sJ8r00RJe1Vp4aJhjhiZRXmZXHJV6XwbLGsgefP38e+p/rrnMea+oYTPqt3jfXtj3ZNQgG9RiLJoZS//cX6+B/CPdRWSAKfje8BoeyI2tu6X/Wbb0vDbHmnMGkl23dkLhzfu5NKrwJdZW5/o3XPLzTD4qNrmoUwy3Wwa97aaLfRe06gmBFzrX8aeDfbbiWNPOqOwOftZW9e3dtFS5H9Stwwt9pLKvZEXu5szZ6HNcSQmtzLzVZ4mLtnbPPLd/prYQnv65z7fMuFK6ztRfP+mtUfO+HYFIiN8/LNpVeK+E+sjb1dbbLbm50Xv9zIh3mApd/5z2WZU5mqn9fj5qvt7KimaH3+/bbk3AmPSfP9BiE31txN2SJN+mqzvExfl8Lfb/zNbdVIHA/blHQolniTX4z26Czme7AxP+cV9NdxAKG/pZdCFmCucgaN3nQ7a7if//738m9e/cGrnPTyR5zHnsTduCpcSfqW0uMmszJlAkq18zWCbDdnfoXbE7Lqbr2FrzryNlH1s5/LJvr1HaF7C5ab0xfB8VgiSwTZ2skcKnB7L0V6zSRPtjv2U2vfA0GJ2GlsUvkV+tjRdlh4xe9EU6CG+HE65+xVxsXDWXcnbvVVvsJQSI7VBjqgfzvJvOHRR5NsPJia0boOoD899tvv/2o2do3doBcAjEUrIRFWtLxRKNFN8r4Y7HhjcFBWAWwBHfcnoG7a/9o/XlmzQyrH9YVrlWqh8WtYVF2kza5gS6ydY7AWHTVnWr1BX7iv0hI6/Z27IpZ/d60iFxVL+YeG9Upg+4razhhxUGuOWZYWpEZyzKNerJJMXbOb01dp9rcpqRBK7S05n6/0Vt6X7bOEWRsh+S0brADciob2rRYwW8j69StX1iT1+vSoqzXKemBLLuEH7nOZVEJc1ablAnnjHC41TFowNY5kTAn2tAd48GFlahdL+tvgt2cuuahVhk9KugAmciyH8hOwnQv62mc0wotN83QYqE0mHSwes6dA4FxbY/D6PoqJ6Fe//Egy7lJpUdO9+qr0YY9Bd1yElk2x8qk+hpZ5wvbLtesdKMBpvpGE4w0mFQ7Uc2ptE1lD8LK4V0qqcPWOhJPw4PYG1SUsrtwdw1bUAhbOia7tr93TUmvvM9PrV5Ri5LH3mypFLSEdGlKWLR+EI0EAsfvYGPymoaucVmztR1R924s7JCS05W9lpx2vFFnnwuEiepPdb8YVp7b6IjBLK3kEHLKrTfOgWbCVlJNtMvugvBYxNjQoS5r6Rjm5nfNIbkOZn5dwWKU2KDSel5xg+qfxyezAw3z31gg8HpbbiTsSFW3HXrYE1R3/lvZQpALSWO+8y/imt+FHcOGVd8LB9OSnO7z7iIIg/1JxXJPqoYizukod7JNcaQJt9/d2SXSc+5cnnuTBrNb/DwRG4ZaGhb2ucjpoV5alJzTt6NOT+7GNZkjyC7OjcrQw556btyW0iysGxws8SZZAjSVLQT1ElUJVFJ3oKk+Keg6/7JigDr73yyY/Lpg9rW797Je4N4AXJXFUwXrnJR9xzo+zoKRc3O23377TZ2A5VqYNToSb8PC6/FNnSBn+8nGHZrN9tNTvESt37dnR1Sta9hcvYnWUC7Nm3uT/HWo7KHuxi/y5xnO6o0mO3AtoGrf/JQd90YDgXFDHsw3mD/NuaBn7oJdO7DuwrOLbhLMv0sF7lrWrKiHtKsACkdIjYYLyKk3yYLxX2671xTsC/vuecHiw+Eznof72Y6t60zzl9Qsy85Z50SW585YctbZmgS7JsBn4cVWtP15y8oCgCyfszDJW15XFCRUi32Ud3256+4v20+uyeXe27XnDJ2x2rfuOK4FaVvne/fu2XnzV1GHLPewnLAlz86BwClKf15LBZdjDusvrLHNKwtu4fy2HTZAoSyvk7EsHxSWFCw+3L6f/eW4/bj47k7NR0tYEVE25G4lq9DRjfPHRTlxF6zd4WX1CEnB8l5smxswrn3vqkzc9ZB+aB1Q3KTElZkn7rMd3ChzBdYZUNYTeOvwMnMd9+w4nEj+Ay/S5SKKB3sLc3HeMx1Wy9VpJ97ybPppzXX2H5yUjTf/Ur5eCIncPHe+z1mWnbdvvHmzZb3ylnUi+edhl5uchtdj1nHJti2V5fWVHYPwu4nsmQaCt3pd+j2FJ24EU7M4zu6JgZPZ14dZmdUzIlyRy+J8dHUjw+BnGmum6TqY2fnhJ9x1m4wuBr3U71sw8QPVWIPb2Lv2Evk64mgoNydkdV+6H/36PgvyY/manmbfHTWeIzDe6IhXdb9T0iHEdu5Qbp6Qi0g6qhh0rYobwC6M3Kfujii7K0q83xs30YGji1w21hLWNPhXVvE/kOCkc5X0dXqT112unfQjLxBLjXV+ULJseyXe9Ow4nuUsa/Hbkt8xbCBfn/wkOcubSEdlnT/znlEhy+3J2y5jg8k9kD3LyZ2ZtUQwK6J122bbtVYPZdet5QBcLmDo/c/me9Z0g5CcwSg3KqVw54/lDMI0MzuPE8m/9h4U5Wxyip2y5SXe58UDk1oJBMatXN6GlX1non/uuxM293suEbadfL/OSIp1eEEozfl3Vn78IPu9NnsJHpolrK653bOylljZg03sMXejegPU2TxFidHquI6Ww4Cnm5Tf+ussBb17vfPmQdl5s+H2N3oetilrXy/LY1A4+FxwfZ3JAXjnyoecf1u6sDiO3vwT+1zw0J7V97zreCoNC5pRb1Vn6c6jyu1wx29Ude1V3ADY/6ay3B9pl7OzWV8BPwq23qrHtarwiyjS0Rb9E2Lhst6JfN0nti922idumWu5gKbHiBLv6V6y7GOSyhaCZWXLi+KcCK6vTm6XNzCbrWetcn1vu1bX8ai5+oC830tk/bnc0yZ6COece+kO53EiX4tILyU41p0OBADQdf7T5Zz7bd+wNq2tymIAiF44yqjUaDLaRa3VEQDALfBz8Pm19BCBAAC2d+q9r91ktGsIBACwhaoH0/cJdQQAsAXry+D1Kbp89OjRVAAA6KP/A8KRInPTMVXnAAAAAElFTkSuQmCC", F = ({ carouselName: o }) => {
  const [t, c] = f([]), n = N.en, [l, u] = f(""), s = x(), [a, d] = f(), [i, h] = f([]);
  return j(() => {
    const r = localStorage.getItem("admin"), e = r ? JSON.parse(r) : null;
    let g = e == null ? void 0 : e.masjids[0];
    u(g);
  }, [l]), j(() => {
    l && s(y(l)).then((e) => {
      var g;
      !(e != null && e.timings) === null ? p(
        !0,
        "error",
        `Failed To Fetch :${e == null ? void 0 : e.message}`,
        s
      ) : c((g = e == null ? void 0 : e.data) == null ? void 0 : g.data);
    });
  }, [l]), j(() => {
    l && s(V(l)).then((e) => {
      e.message === "Success" && d(e.data);
    });
  }, [l]), j(() => {
    s(T()).then((e) => {
      console.log(e), e.success ? h(e.data.data) : p(
        !0,
        "error",
        "Failed To Fetch:Something Went Wrong",
        s
      );
    });
  }, [l]), /* @__PURE__ */ A.jsx(A.Fragment, { children: /* @__PURE__ */ A.jsxs("div", { className: "FeedContainer", children: [
    /* @__PURE__ */ A.jsxs("div", { className: "FeedTitle", children: [
      /* @__PURE__ */ A.jsx("span", { className: "TitleString", children: o === "Event" ? n.EVENTS_CAROUSEL.EVENTS_TITLE : n.ANNOUNCEMENTS_CAROUSEL.ANNOUNCEMENT_TITLE }),
      /* @__PURE__ */ A.jsx("div", { className: "FeedIcon", children: /* @__PURE__ */ A.jsx("img", { src: H, alt: "Profile Icon", className: "feedTopImage" }) })
    ] }),
    /* @__PURE__ */ A.jsx("div", { className: "FeedBottom", children: /* @__PURE__ */ A.jsx("div", { className: "Feed", children: o === "Event" ? (t == null ? void 0 : t.length) > 0 ? t == null ? void 0 : t.map((r) => {
      let e = r.timings, g = r.metaData.startDate, B = C(g).format("DD-MM-YYYY");
      return /* @__PURE__ */ A.jsx(A.Fragment, { children: /* @__PURE__ */ A.jsxs("div", { className: "CarouselCard", children: [
        e.map((b) => {
          var m;
          return /* @__PURE__ */ A.jsx(A.Fragment, { children: /* @__PURE__ */ A.jsx("div", { className: "LeftSideCard", children: a != null && a.masjidPhotos ? /* @__PURE__ */ A.jsx(A.Fragment, { children: /* @__PURE__ */ A.jsx("span", { className: "MazjidPhoto", children: /* @__PURE__ */ A.jsx(
            "img",
            {
              src: (m = a == null ? void 0 : a.masjidPhotos[0]) == null ? void 0 : m.url,
              alt: "masjidPhotos"
            }
          ) }) }) : /* @__PURE__ */ A.jsx(A.Fragment, { children: /* @__PURE__ */ A.jsx("span", { className: "MazjidPhoto", children: /* @__PURE__ */ A.jsx("img", { src: Q, alt: "MazjidPhoto" }) }) }) }) });
        }),
        /* @__PURE__ */ A.jsxs("div", { className: "RightSideCard", children: [
          /* @__PURE__ */ A.jsxs("span", { className: "CardTitle", children: [
            r.eventName.substr(0, 10),
            ".."
          ] }),
          /* @__PURE__ */ A.jsxs("span", { className: "CardTitleMazjid", children: [
            "Date : ",
            B
          ] })
        ] }),
        e.map((b) => {
          let m = b.startTime, E = C(m * 1e3).format(
            "hh:mm A"
          ), W = b.endTime, D = C(W).format("h:mm a");
          return /* @__PURE__ */ A.jsx(A.Fragment, { children: /* @__PURE__ */ A.jsxs("div", { className: "LefyConTainer", children: [
            /* @__PURE__ */ A.jsxs("span", { className: "TimingsViewSpan", children: [
              "Timings : ",
              E,
              "-",
              D
            ] }),
            /* @__PURE__ */ A.jsx("span", { className: "MazjidName", children: a == null ? void 0 : a.masjidName })
          ] }) });
        })
      ] }) });
    }) : /* @__PURE__ */ A.jsx(
      "img",
      {
        src: I,
        className: "NoAnnouncementFound",
        alt: "NoAnnouncementFound"
      }
    ) : /* @__PURE__ */ A.jsx(A.Fragment, { children: (i == null ? void 0 : i.length) > 0 ? i == null ? void 0 : i.map((r) => /* @__PURE__ */ A.jsx(A.Fragment, { children: /* @__PURE__ */ A.jsx("div", { className: "CarouselCard", children: /* @__PURE__ */ A.jsxs("div", { className: "AnnocementMain", children: [
      /* @__PURE__ */ A.jsx("span", { className: "CardTitle", children: r.title }),
      /* @__PURE__ */ A.jsx("span", { className: "CardBody", children: r.body })
    ] }) }) })) : /* @__PURE__ */ A.jsx(
      "img",
      {
        src: k,
        className: "NoAnnouncementFound",
        alt: "NoAnnouncementFound"
      }
    ) }) }) }),
    /* @__PURE__ */ A.jsx("div", { className: "FeedViewAllEvents", children: o === "Event" ? /* @__PURE__ */ A.jsx(A.Fragment, { children: /* @__PURE__ */ A.jsx(
      v,
      {
        to: "/events",
        style: { textDecoration: "none", color: "white" },
        children: /* @__PURE__ */ A.jsx("span", { className: "ViewButton", children: "View all" })
      }
    ) }) : /* @__PURE__ */ A.jsx(A.Fragment, { children: /* @__PURE__ */ A.jsx(
      v,
      {
        to: "/announcements",
        style: { textDecoration: "none", color: "white" },
        children: /* @__PURE__ */ A.jsx("span", { className: "ViewButton", children: "View all" })
      }
    ) }) })
  ] }) });
}, U = () => {
  var d, i, h, r;
  const [o, t] = f(""), c = x(), n = N.en, [l, u] = f(!1);
  let s = w((e) => e.AdminMasjid);
  j(() => {
    const e = localStorage.getItem("admin"), g = e ? JSON.parse(e) : null;
    let B = g == null ? void 0 : g.masjids[0];
    B && (t(B), c(V(B)).then((m) => {
      !m.timings === null && p(
        !0,
        "error",
        `Failed To Fetch :${m == null ? void 0 : m.message}`,
        c
      );
    }));
  }, [o]), j(() => {
    window.location.pathname === "/masjidprofile" ? u(!0) : u(!1);
  }, []);
  const a = () => {
  };
  return /* @__PURE__ */ A.jsxs("div", { className: "MasjidProfileCardContainer", children: [
    /* @__PURE__ */ A.jsxs("div", { className: "MasjdiProfileCardTop", children: [
      /* @__PURE__ */ A.jsx("div", { className: "MazjisPictureContainerTop", children: /* @__PURE__ */ A.jsxs("div", { className: "MazjidPorfilePhotoCOntainer", children: [
        /* @__PURE__ */ A.jsx("div", { className: "MasjidProfilePicture", children: s && (s != null && s.masjidProfilePhoto) ? /* @__PURE__ */ A.jsx(
          "img",
          {
            src: s && (s == null ? void 0 : s.masjidProfilePhoto),
            alt: "AdminMasjidProfile",
            className: "MasjidProfilePictureContianer"
          }
        ) : /* @__PURE__ */ A.jsx(
          "img",
          {
            src: Q,
            alt: "AdminMasjidProfile",
            className: "MasjidProfilePictureContianer"
          }
        ) }),
        /* @__PURE__ */ A.jsxs("div", { className: "MasjidProfilePictureTitle", children: [
          /* @__PURE__ */ A.jsxs("span", { className: "MasjidProfilePictureTitleName", children: [
            s && s.masjidName,
            " "
          ] }),
          l && /* @__PURE__ */ A.jsx(A.Fragment, { children: /* @__PURE__ */ A.jsx("div", { className: "EditMasjidButton", children: /* @__PURE__ */ A.jsx(
            P,
            {
              variant: "outlined",
              color: "success",
              onClick: a,
              children: n.MASJID_PROFILE_CARD.EDIT_MASJID
            }
          ) }) })
        ] })
      ] }) }),
      /* @__PURE__ */ A.jsx("div", { className: "MasjidProfileCardPictures", children: /* @__PURE__ */ A.jsx(
        X,
        {
          ParentComponentType: "Masjid",
          Photos: s == null ? void 0 : s.masjidPhotos
        }
      ) })
    ] }),
    /* @__PURE__ */ A.jsxs("div", { className: "MasjidProfileCardBottom", children: [
      /* @__PURE__ */ A.jsxs("div", { className: "MasjidDecriptionItemCard", children: [
        /* @__PURE__ */ A.jsx("span", { className: "MasjdiDescriptionKeyDesc", children: n.MASJID_PROFILE_CARD.MASJID_DESCRIPTION }),
        /* @__PURE__ */ A.jsx("span", { className: "MasjidDescriptionValueDesc", children: ((d = s == null ? void 0 : s.description) == null ? void 0 : d.length) > 0 ? /* @__PURE__ */ A.jsx(A.Fragment, { children: ((i = s == null ? void 0 : s.description) == null ? void 0 : i.length) > 100 ? /* @__PURE__ */ A.jsx(K, { Limit: 100, children: s && s.description }) : /* @__PURE__ */ A.jsx(A.Fragment, { children: s && s.description }) }) : /* @__PURE__ */ A.jsx(A.Fragment, { children: "................................................................................." }) })
      ] }),
      /* @__PURE__ */ A.jsxs("div", { className: "MazjidBottomNewContainer", children: [
        /* @__PURE__ */ A.jsxs("div", { className: "MasjidDecriptionItem", children: [
          /* @__PURE__ */ A.jsx("span", { className: "MasjdiDescriptionKey", children: n.MASJID_PROFILE_CARD.MASJID_CONTACT }),
          ((h = s == null ? void 0 : s.contact) == null ? void 0 : h.length) > 0 ? /* @__PURE__ */ A.jsx(A.Fragment, { children: /* @__PURE__ */ A.jsx("span", { className: "MasjidContactValue valueForAll", children: s && s.contact }) }) : /* @__PURE__ */ A.jsx(A.Fragment, { children: "................................................" })
        ] }),
        /* @__PURE__ */ A.jsxs("div", { className: "MasjidDecriptionItem", children: [
          /* @__PURE__ */ A.jsx("span", { className: "MasjdiDescriptionKey", children: n.MASJID_PROFILE_CARD.MASJID_ADDRESS }),
          ((r = s == null ? void 0 : s.address) == null ? void 0 : r.length) > 0 ? /* @__PURE__ */ A.jsx(A.Fragment, { children: /* @__PURE__ */ A.jsx("span", { className: "MasjidAddressValue valueForAll", children: s && s.address }) }) : /* @__PURE__ */ A.jsx(A.Fragment, { children: "............................................................" })
        ] })
      ] })
    ] })
  ] });
}, aA = () => /* @__PURE__ */ A.jsx(A.Fragment, { children: /* @__PURE__ */ A.jsxs("div", { className: "DashboardCOmponentsFlexBox", children: [
  /* @__PURE__ */ A.jsxs("div", { className: "DasboardleftComponent", children: [
    /* @__PURE__ */ A.jsx("div", { className: "DashboardMasjidTimingsContainer", children: /* @__PURE__ */ A.jsx(J, {}) }),
    /* @__PURE__ */ A.jsx("div", { className: "DashboardMasjidProfileContainer", children: /* @__PURE__ */ A.jsx(U, {}) })
  ] }),
  /* @__PURE__ */ A.jsxs("div", { className: "DasboardRightComponent", children: [
    /* @__PURE__ */ A.jsx("div", { className: "DashboardEventsCarouselContainer", children: /* @__PURE__ */ A.jsx(F, { carouselName: "Event" }) }),
    /* @__PURE__ */ A.jsx("div", { className: "DashboardAnnoucementsCarouselContainer", children: /* @__PURE__ */ A.jsx(F, { carouselName: "Announcement" }) })
  ] })
] }) });
export {
  aA as default
};

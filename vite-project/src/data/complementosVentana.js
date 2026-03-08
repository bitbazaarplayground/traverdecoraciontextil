import domotica320 from "../assets/Automatizacion/heroB-320.webp";
import domotica640 from "../assets/Automatizacion/heroB-640.webp";
import domotica960 from "../assets/Automatizacion/heroB-960.webp";

import cortinas320 from "../assets/servicios/CortinasServicios-320.webp";
import cortinas640 from "../assets/servicios/CortinasServicios-640.webp";
import cortinas960 from "../assets/servicios/CortinasServicios-960.webp";

import panel320 from "../assets/panelJapones/bedroomDarkPanel-320.webp";
import panel640 from "../assets/panelJapones/bedroomDarkPanel-640.webp";
import panel960 from "../assets/panelJapones/bedroomDarkPanel-960.webp";

import venecianas320 from "../assets/venecianas/oficina2-320.webp";
import venecianas640 from "../assets/venecianas/oficina2-640.webp";
import venecianas960 from "../assets/venecianas/oficina2-960.webp";

import toldoCofre320 from "../assets/toldos/cofre-320.webp";
import toldoCofre640 from "../assets/toldos/cofre-640.webp";
import toldoCofre960 from "../assets/toldos/cofre-960.webp";

export const PRODUCTOS_VENTANA = [
  {
    key: "cortinas-estores",
    title: "Cortinas y estores",
    desc: "Textiles a medida para controlar luz y privacidad.",
    to: "/cortinas-estores",
    img: {
      src: cortinas640,
      srcSet: `${cortinas320} 320w, ${cortinas640} 640w, ${cortinas960} 960w`,
      width: 960,
      height: 640,
      alt: "Cortinas y estores a medida",
    },
  },
  {
    key: "panel-japones",
    title: "Panel japonés",
    desc: "Ideal para puertas correderas y grandes ventanales.",
    to: "/panel-japones",
    img: {
      src: panel640,
      srcSet: `${panel320} 320w, ${panel640} 640w, ${panel960} 960w`,
      width: 278,
      height: 185,
      alt: "Panel japonés en dormitorio",
    },
  },
  {
    key: "venecianas",
    title: "Venecianas",
    desc: "Control solar preciso con privacidad regulable.",
    to: "/venecianas",
    img: {
      src: venecianas640,
      srcSet: `${venecianas320} 320w, ${venecianas640} 640w, ${venecianas960} 960w`,
      width: 267,
      height: 178,
      alt: "Venecianas en oficina",
    },
  },
  {
    key: "automatizacion",
    title: "Automatización",
    desc: "Sistemas motorizados y control inteligente del hogar.",
    to: "/automatizacion",
    img: {
      src: domotica640,
      srcSet: `${domotica320} 320w, ${domotica640} 640w, ${domotica960} 960w`,
      width: 267,
      height: 178,
      alt: "Automatización del hogar",
    },
  },
  {
    key: "toldos-proteccion-solar",
    title: "Toldos",
    desc: "Protección solar exterior para ganar sombra y confort.",
    to: "/toldos-proteccion-solar",
    img: {
      src: toldoCofre640,
      srcSet: `${toldoCofre320} 320w, ${toldoCofre640} 640w, ${toldoCofre960} 960w`,
      width: 267,
      height: 178,
      alt: "Toldo cofre instalado en terraza o exterior",
    },
  },
];

export function getComplementosItems(currentKey) {
  return PRODUCTOS_VENTANA.filter((item) => item.key !== currentKey);
}

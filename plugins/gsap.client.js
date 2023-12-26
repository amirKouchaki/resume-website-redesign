import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Flip from "gsap/Flip";
import { Observer } from "gsap/Observer";

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    gsap.registerPlugin(ScrollTrigger, Flip, Observer);
  }

  return {
    provide: {
      gsap,
      ScrollTrigger,
      Flip,
      Observer,
    },
  };
});

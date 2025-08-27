import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";    
    
    
    export default function TextSections() {
  const text0 = useRef()
  const text1 = useRef()
  const text2 = useRef()
  const text3 = useRef()
  const text4 = useRef()
  const text5 = useRef()
  const text6 = useRef()
useEffect(() => {
  gsap.registerPlugin(ScrollTrigger)

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#scroll-container",
      start: "top top",
      end: "bottom bottom", // total scroll distance
      scrub: 1.5,
      pin: ".canvas-wrapper",
      markers:false,
    },
  });

    // Step 1: 
  tl.fromTo(text1.current, { opacity: 1 }, { opacity: 0, duration: 0.3, ease:"power2.inOut" }, 0.);
//step0
  tl.fromTo(text0.current, { opacity: 0 }, { opacity: 1, duration: 0.1, ease:"power2.inOut" }, 0.2)
    .to(text0.current, { opacity: 0, duration: 0.1, ease:"power2.inOut" }, 0.8);


  // Step 2: 
  tl.fromTo(text2.current, { opacity: 0 }, { opacity: 1, duration: 0.2, ease:"power2.inOut" }, 0.85)
    .to(text2.current, { opacity: 0, duration: 0.2, ease:"power2.inOut" }, 1.25);

// step 4 :
  tl.fromTo(text4.current, { opacity: 0 }, { opacity: 1, duration: 0.2, ease:"power2.inOut" }, 1.35)
    .to(text4.current, { opacity: 0, duration: 0.2, ease:"power2.inOut" }, 1.6);

    // step 5 :
  tl.fromTo(text5.current, { opacity: 0 }, { opacity: 1, duration: 0.2, ease:"power2.inOut" }, 1.8)
    .to(text5.current, { opacity: 0, duration: 0.2, ease:"power2.inOut" }, 2);

    // step 6 :
  tl.fromTo(text6.current, { opacity: 0 }, { opacity: 1, duration: 0.2, ease:"power2.inOut" }, 2.2)
    .to(text6.current, { opacity: 0, duration: 0.2, ease:"power2.inOut" }, 2.45);

  tl.fromTo(text6.current, { opacity: 0 }, { opacity: 0, duration: 0.2, ease:"power2.inOut" }, 2.5)
  return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    document.body.style.overflow = '';
  }
}, []);

  return (
    <div className="text-white font-bold pointer-events-none">
       <section
        ref={text0}
        className="fixed -top-70 left-0 h-screen w-screen flex justify-center items-center text-6xl z-20"
      >
        <h1>Improved Camera</h1>
      </section>
      <section
        ref={text1}
        className="fixed top-60 left-0 h-screen w-screen flex justify-center items-center text-6xl z-20"
      >
        <h1>Introducing the iPhone 16</h1>
      </section>

      <section
        ref={text2}
  className="fixed -top-30 -left-100 h-screen w-screen flex justify-center items-center text-6xl z-20"
>
  <h1>New Action Button</h1>
      </section>

      <section
        ref={text4}
        className="fixed -top-15 left-90 h-screen w-screen flex justify-center items-center text-4xl z-20"
      >
        <h1>Redesigned Power Button</h1>
      </section>

<section
  ref={text5}
  className="fixed bottom-52 left-40 h-screen w-screen flex items-center z-20"
>
  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Upgraded Camera</h1>

</section>
                  <section
        ref={text6}
        className="fixed -bottom-50 left-50 h-screen w-screen flex justify-center items-center text-4xl z-20"
      >
        <h1>Usb-C charging</h1>
      </section>
      
                  <section
        ref={text3}
        className="fixed -bottom-50 left-50 h-screen w-screen flex justify-center items-center text-4xl z-20"
      >
        <h1></h1>
      </section>

    </div>
  )
}
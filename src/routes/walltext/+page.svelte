<script>
  import { onMount } from 'svelte';

  let activeIndex = $state(0);

  onMount(() => {
    const interval = setInterval(() => {
      activeIndex = activeIndex === 0 ? 1 : 0;
    }, 7000);
    return () => clearInterval(interval);
  });
</script>

<div class="w-screen h-screen flex items-center justify-center bg-black">
  <div class="relative aspect-video max-h-screen max-w-screen h-screen">
    <img
      src="/ONXScreensWallTextVersion4BLANK.png"
      alt="Wall text"
      class="w-full h-full"
    />

    <div class="absolute right-0 bottom-0 w-[55%] text-white font-[Helvetica,Arial,sans-serif] text-left">
      <div class="absolute bottom-0 left-0 w-full py-8 px-10 whitespace-pre-line transition-opacity duration-1000 ease-in-out {activeIndex === 0 ? 'opacity-100' : 'opacity-0'}">
        "ONX Screens is a new program from Onassis ONX for screen-based projects built for the speed, circulation, and shared languages of digital culture. Moving image and video game works are now both shaped by rapid tool evolution (AI, game engines, virtual production, automatic editing systems, platform native aesthetics) as much as circulation itself.

        This exhibition addresses these quickly evolving mass mediums, treating the screen as both medium and infrastructure in a playful space for works in progress, prototypes, and other experiments.

        ONX Screens features 30 works with a total runtime of over 12 hours, drawn from the extended Onassis ONX community, including our Members, Fellows, ONX/AiR, Outland, and the NEW INC Y12 XR Track."
      </div>
      <div class="absolute bottom-0 left-0 w-full py-8 px-10 whitespace-pre-line transition-opacity duration-1000 ease-in-out {activeIndex === 1 ? 'opacity-100' : 'opacity-0'}">
        Featured Artists:


        Adam Cole, Adelle Yingxi Lin, Alejandro Moreno Jashés,
        Alfredo Salazar-Caro, Ambrose Trataris, Anito Soul (Michael Balangue),
        Auriea Harvey + Michael Samyn, Brad Davis, Cameron A. Granger,
        Eirini Linardaki + Adam Maor, elekhlekha อีเหละเขละขละ (Nitcha Tothong +
        Kengchakaj Kengkarnka), ​Flan Falacci, ​Winslow Porter + Elie Zananiri,
        FuturePerfect Studio, Gabe Barcia-Colombo, Jiabao Li,
        Jiabao Li + Lauren Schroeder, Kakia Konstantinaki, Ker Chen,
        Kordae Jatafa Henry, Matthew D Gantt + Ariadne Randall,
        Miles Peyton + Ida Pruitt, ​peter burr, Sean Capone, Sean Kennedy,
        Tomo Kihara + Playfool (Daniel Coppen & Saki Maruyama),
        Xin Ying + Alan Winslow + Mimi Yin with NUUM Collective,
        Wendi Yan + Yi Xie,  Yaloo
      </div>
    </div>
  </div>
</div>

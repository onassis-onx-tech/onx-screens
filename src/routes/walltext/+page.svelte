<script>
  import { onMount } from 'svelte';
  import { base } from '$app/paths';

  const texts = [
    `ONX Screens is a new program from Onassis ONX for screen-based projects built for the speed, circulation, and shared languages of digital culture. Moving image and video game works are now both shaped by rapid tool evolution (AI, game engines, virtual production, automatic editing systems, platform native aesthetics) as much as circulation itself.

        This exhibition addresses these quickly evolving mass mediums, treating the screen as both medium and infrastructure in a playful space for works in progress, prototypes, and other experiments.

        ONX Screens features 30 works with a total runtime of over 12 hours, drawn from the extended Onassis ONX community, including our Members, Fellows, ONX/AiR, Outland, and the NEW INC Y12 XR Track.`,
    `Featured Artists:


        Adam Cole, Adelle Yingxi Lin, Alejandro Moreno Jashés, Alfredo Salazar-Caro, Ambrose Trataris, Anito Soul (Michael Balangue), Auriea Harvey + Michael Samyn, Brad Davis, Cameron A. Granger, Eirini Linardaki + Adam Maor, elekhlekha อีเหละเขละขละ (Nitcha Tothong + Kengchakaj Kengkarnka), ​Flan Falacci, ​Winslow Porter + Elie Zananiri, FuturePerfect Studio, Gabe Barcia-Colombo, Jiabao Li, Jiabao Li + Lauren Schroeder, Kakia Konstantinaki, Ker Chen, Kordae Jatafa Henry, Matthew D Gantt + Ariadne Randall, Miles Peyton + Ida Pruitt, peter burr, Sean Capone, Sean Kennedy, Tomo Kihara + Playfool (Daniel Coppen & Saki Maruyama), Xin Ying + Alan Winslow + Mimi Yin with NUUM Collective, Wendi Yan + Yi Xie,  Yaloo`
  ];

  function tokenize(text) {
    return text.split(/(\s+)/).filter(t => t.length > 0);
  }

  const tokens = texts.map(tokenize);

  let activeIndex = $state(0);
  let visibleCount = $state(0);

  onMount(() => {
    let typingInterval;
    let holdTimeout;

    function startTyping(index) {
      visibleCount = 0;
      const total = tokens[index].length;
      const intervalMs = 2000 / total;

      typingInterval = setInterval(() => {
        visibleCount++;
        if (visibleCount >= total) {
          clearInterval(typingInterval);
          holdTimeout = setTimeout(() => {
            const next = index === 0 ? 1 : 0;
            activeIndex = next;
            startTyping(next);
          }, 10000);
        }
      }, intervalMs);
    }

    startTyping(0);

    return () => {
      clearInterval(typingInterval);
      clearTimeout(holdTimeout);
    };
  });
</script>

<div class="w-screen h-screen flex items-center justify-center bg-black">
  <div class="relative aspect-video max-h-screen max-w-screen h-screen">
    <img
      src="{base}/ONXScreensWallTextVersion4BLANK.png"
      alt="Wall text"
      class="w-full h-full"
    />

    <div class="absolute right-0 bottom-0 w-[55%] text-white text-left font-normal text-2xl leading-[1.1]">
      <div class="absolute bottom-0 left-0 w-full py-8 px-10 whitespace-pre-line">
        {#each tokens[activeIndex] as token, i}
          <span class="{i >= visibleCount ? 'text-transparent' : ''}">{token}</span>
        {/each}
      </div>
    </div>
  </div>
</div>

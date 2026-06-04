<script>
	import { fade } from 'svelte/transition';
	let { item = null, accentColor = null } = $props();
</script>

{#if item}
<div class="grid [grid-template-areas:'stack']">
	{#key item}
	<div class="[grid-area:stack] flex flex-col gap-4" in:fade={{ duration: 200 }} out:fade={{ duration: 100 }}>
		<div>
			<!-- {#if item.artist}
				<p class="text-xs text-neutral-400 mb-1">{item.artist}</p>
			{/if}
			<h2 class="font-cumbia leading-snug text-2xl font-bold text-white">{item.title}</h2> -->
			<p class="text-xl text-neutral-400 mt-1">
				{[item.year, item.category, item.duration]
					.filter(Boolean)
					.join(' · ')}
			</p>
		</div>

		{#if item.description}
			<p class="text-2xl whitespace-pre-line text-neutral-300  leading-[1.1]">
				{item.description}
			</p>
		{/if}
	</div>
	{/key}
</div>
{/if}

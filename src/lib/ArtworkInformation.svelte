<script>
	import { fade } from 'svelte/transition';
	let { item = null, accentColor = null } = $props();
</script>

{#if item}
<div class="grid [grid-template-areas:'stack']">
	{#key item}
	<div class="[grid-area:stack] flex flex-col gap-4" in:fade={{ duration: 200 }} out:fade={{ duration: 100 }}>
		<div>
			{#if item.artist}
				<p class="text-xs text-neutral-400 mb-1">{item.artist}</p>
			{/if}
			<h2 class="font-cumbia leading-snug text-2xl font-bold text-white">{item.title}</h2>
			<p class="text-xs text-neutral-400 mt-1">
				{[item['Date Created'], item.Medium, item.Duration ? item.Duration + ' min' : null]
					.filter(Boolean)
					.join(' · ')}
			</p>
		</div>

		{#if item['Long Description (200 Words)']}
			<p class="text-sm leading-relaxed whitespace-pre-line text-neutral-300">
				{item['Long Description (200 Words)']}
			</p>
		{/if}
	</div>
	{/key}
</div>
{/if}

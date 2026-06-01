<script>
	import Timeline from '$lib/Timeline.svelte';
	import ArtworkInformation from '$lib/ArtworkInformation.svelte';

	let { items = [], accentColor = null, title = null } = $props();

	let active = $state(items.length ? Math.floor(Math.random() * items.length) : null);
	const selectedItem = $derived(active !== null ? items[active] : null);
	const timelineItems = $derived(items.map((item, i) => ({
		primary: item.title,
		secondary: item.artist,
		description:
			i === active ? 'now playing - 4m13s left'
			: i === active - 1 ? 'just finished'
			: i === active + 1 ? 'next up'
			: null
	})));
</script>

<div class="bg-black h-screen overflow-hidden flex flex-col p-10 gap-6">
	{#if title}
		<h1 class="text-6xl font-bold leading-tight shrink-0" style="color: {accentColor}">{title}</h1>
	{/if}
	<div class="flex flex-row gap-16 flex-1 min-h-0">
		<div class="shrink-0 w-80 overflow-y-auto">
			<Timeline items={timelineItems} bind:active {accentColor} />
		</div>
		<div class="flex-1 max-w-lg overflow-y-auto">
			<ArtworkInformation item={selectedItem} {accentColor} />
		</div>
	</div>
</div>

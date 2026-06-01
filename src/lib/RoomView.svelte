<script>
	import Timeline from '$lib/Timeline.svelte';
	import ArtworkInformation from '$lib/ArtworkInformation.svelte';

	let { items = [], accentColor = null } = $props();

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

<div class="flex flex-col-reverse gap-10 p-8 md:flex-row md:gap-16 md:p-12">
	<div class="shrink-0 md:w-56">
		<Timeline items={timelineItems} bind:active {accentColor} />
	</div>
	<div class="flex-1 md:max-w-lg">
		<ArtworkInformation item={selectedItem} />
	</div>
</div>

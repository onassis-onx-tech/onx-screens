<script>
	import { onMount, onDestroy } from 'svelte';
	import Timeline from '$lib/Timeline.svelte';
	import ArtworkInformation from '$lib/ArtworkInformation.svelte';
	import { artTimeline } from '$lib/artTimeline.js';

	let {
		items = [],
		accentColor = null,
		title = null,
		titleCardDuration = 13,
		endCardDuration = 13
	} = $props();

	function todayAt(hour) {
		const d = new Date();
		d.setHours(hour, 0, 0, 0);
		return d.getTime();
	}

	const startTime = new Date().getHours() < 20 ? todayAt(13) : todayAt(20);
	const totalDuration = new Date().getHours() < 20 ? 21600 : 10800;

	let currentTime = $state((Date.now() - startTime) / 1000);

	let interval;
	onMount(() => {
		interval = setInterval(() => {
			currentTime = (Date.now() - startTime) / 1000;
		}, 1000);
	});
	onDestroy(() => clearInterval(interval));

	const timedItems = $derived(
		artTimeline(items, { titleCardDuration, endCardDuration, currentTime, totalDuration })
	);

	const autoActive = $derived(() => {
		const playing = timedItems.findIndex((item) => item.playing !== -1);
		if (playing !== -1) return playing;
		const loopDuration = timedItems.reduce(
			(sum, item) => sum + titleCardDuration + item.durationSeconds + endCardDuration, 0
		);
		if (loopDuration === 0 || currentTime < 0 || currentTime >= totalDuration) return -1;
		const pos = currentTime % loopDuration;
		for (let i = timedItems.length - 1; i >= 0; i--) {
			if (pos >= timedItems[i].startTime) return i;
		}
		return -1;
	});
	const autoSelectedItem = $derived(autoActive !== -1 ? items[autoActive] : null);

	let pinnedIndex = $state(null);
	let resetTimer;

	function handleSelect(index) {
		pinnedIndex = index;
		clearTimeout(resetTimer);
		resetTimer = setTimeout(() => { pinnedIndex = null; }, 30000);
	}

	onDestroy(() => clearTimeout(resetTimer));

	const active = $derived(pinnedIndex !== null ? pinnedIndex : autoActive);
	const selectedItem = $derived(pinnedIndex !== null ? items[pinnedIndex] : autoSelectedItem);

	function formatTimeLeft(seconds) {
		const s = Math.round(seconds);
		const m = Math.floor(s / 60);
		const rem = s % 60;
		return m > 0 ? `${m}m ${rem}s left` : `${rem}s left`;
	}

	const timelineItems = $derived(
		timedItems.map((item, i) => ({
			primary: item.title,
			secondary: item.artist,
			description:
				item.playing !== -1
					? `now playing · ${formatTimeLeft(item.durationSeconds - item.playing)}`
					: i === active - 1
						? 'just finished'
						: i === active + 1
							? 'next up'
							: null
		}))
	);
</script>

<div class="bg-black h-screen overflow-hidden flex flex-col p-10 gap-6">
	{#if title}
		<h1 class="text-6xl font-bold leading-tight shrink-0" style="color: {accentColor}">{title}</h1>
	{/if}
	<div class="flex flex-row gap-16 flex-1 min-h-0">
		<div class="shrink-0 w-80 overflow-y-auto">
			<Timeline items={timelineItems} {active} {accentColor} />
		</div>
		<div class="flex-1 max-w-lg overflow-y-auto">
			<ArtworkInformation item={selectedItem} {accentColor} />
		</div>
	</div>
</div>

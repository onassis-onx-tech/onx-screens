<script>
	import { onMount, onDestroy } from 'svelte';
	import Timeline from '$lib/Timeline.svelte';
	import { artTimeline } from '$lib/artTimeline.js';

	let { data } = $props();

	const titleCardDuration = 13;
	const endCardDuration = 13;

	function todayAt(hour) {
		const d = new Date();
		d.setHours(hour, 0, 0, 0);
		return d.getTime();
	}

	const sessionStartMs = new Date().getHours() < 20 ? todayAt(13) : todayAt(20);
	const totalDuration = new Date().getHours() < 20 ? 21600 : 10800;

	let currentTime = $state((Date.now() - sessionStartMs) / 1000);

	let interval;
	onMount(() => {
		interval = setInterval(() => {
			currentTime = (Date.now() - sessionStartMs) / 1000;
		}, 1000);
	});
	onDestroy(() => clearInterval(interval));

	const projectionRaw = $derived(data.items.filter((item) => item.room === 'projection'));
	const soundRaw = $derived(data.items.filter((item) => item.room === 'sound'));

	const timedProjection = $derived(
		artTimeline(projectionRaw, { titleCardDuration, endCardDuration, currentTime, totalDuration })
	);
	const timedSound = $derived(
		artTimeline(soundRaw, { titleCardDuration, endCardDuration, currentTime, totalDuration })
	);

	const projectionActive = $derived(timedProjection.findIndex((item) => item.playing !== -1));
	const soundActive = $derived(timedSound.findIndex((item) => item.playing !== -1));

	function formatTimeLeft(seconds) {
		const s = Math.round(seconds);
		const m = Math.floor(s / 60);
		return m > 0 ? `${m}m ${s % 60}s left` : `${s}s left`;
	}

	function computePlayTimes(timedItems) {
		const loopDuration = timedItems.reduce(
			(sum, item) => sum + titleCardDuration + item.durationSeconds + endCardDuration,
			0
		);
		const now = Date.now();
		return timedItems.map((item) => {
			const times = [];
			let offset = item.startTime + titleCardDuration;
			while (offset < totalDuration) {
				const ms = sessionStartMs + offset * 1000;
				if (ms > now) {
					const d = new Date(ms);
					const h = d.getHours() % 12 || 12;
					const m = d.getMinutes().toString().padStart(2, '0');
					times.push(`${h}:${m}`);
				}
				offset += loopDuration;
			}
			return times;
		});
	}

	const projectionItems = $derived(
		(() => {
			const playTimes = computePlayTimes(timedProjection);
			return timedProjection.map((item, i) => ({
				primary: item.title,
				secondary: item.artist,
				description:
					item.playing !== -1
						? `now playing · ${formatTimeLeft(item.durationSeconds - item.playing)}`
						: `Runtime: ${item.duration}. plays at ${playTimes[i].join(', ')}`
			}));
		})()
	);

	const soundItems = $derived(
		(() => {
			const playTimes = computePlayTimes(timedSound);
			return timedSound.map((item, i) => ({
				primary: item.title,
				secondary: item.artist,
				description:
					item.playing !== -1
						? `now playing · ${formatTimeLeft(item.durationSeconds - item.playing)}`
						: `Runtime: ${item.duration}. plays at ${playTimes[i].join(', ')}`
			}));
		})()
	);
</script>

<div class="flex h-screen bg-black overflow-hidden">
	<div class="flex flex-1 flex-col gap-6 p-10">
		<h1 class="text-6xl font-bold leading-tight -mb-6" style="color: #5f3eff">Projection Room</h1>
		<Timeline items={projectionItems} interactive={false} active={projectionActive} accentColor="#5f3eff" />
	</div>

	<div class="flex flex-col justify-between py-8 mx-2 self-stretch">
		{#each Array(12) as _}
			<div class="w-[10px] h-8 bg-white"></div>
		{/each}
	</div>

	<div class="flex flex-1 flex-col gap-6 p-10">
		<h1 class="text-6xl font-bold leading-tight -mb-6" style="color: #F8F80F">Sound Room</h1>
		<Timeline items={soundItems} interactive={false} active={soundActive} accentColor="#FAF80F" />
	</div>
</div>

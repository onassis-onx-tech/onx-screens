<script>
	import { items } from '$lib/data.js';
	import Timeline from '$lib/Timeline.svelte';

	const projectionItems = items
		.filter((item) => item.room === 'projection')
		.map((item, i) => ({
			primary: item.title,
			secondary: item.artist,
			description: i === 4
				? `Runtime: ${item.duration} min. Now playing: 3:29 remaining`
				: `Runtime: ${item.duration} min. plays at 3:24, 4:24, 5:24`
		}));

	const soundItems = items
		.filter((item) => item.room === 'sound')
		.map((item, i) => ({
			primary: item.title,
			secondary: item.artist,
			description: i === 2
				? `Runtime: ${item.duration} min. Now playing: 3:29 remaining`
				: `Runtime: ${item.duration} min. plays at 3:24, 4:24, 5:24`
		}));
</script>

<div class="flex h-screen bg-black overflow-hidden">
	<div class="flex flex-1 flex-col gap-6 p-10">
		<h1 class="text-6xl font-bold leading-tight -mb-6" style="color: #5f3eff">Projection Room</h1>
		<Timeline items={projectionItems} interactive={false} active={4} accentColor="#5f3eff" />
	</div>

	<div class="flex flex-col justify-between py-8 mx-2 self-stretch">
		{#each Array(12) as _}
			<div class="w-[10px] h-8 bg-white"></div>
		{/each}
	</div>

	<div class="flex flex-1 flex-col gap-6 p-10">
		<h1 class="text-6xl font-bold leading-tight -mb-6" style="color: #F8F80F">Sound Room</h1>
		<Timeline items={soundItems} interactive={false} active={2} accentColor="#FAF80F" />
	</div>
</div>

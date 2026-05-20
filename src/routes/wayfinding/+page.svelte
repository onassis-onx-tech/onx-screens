<script>
	import { items } from '$lib/data.js';
	import Timeline from '$lib/Timeline.svelte';

	const soundItems = items
		.filter((item) => item.room === 'sound')
		.map((item) => ({ primary: item.title, secondary: item.artist, description: `duration: ${item.duration} min. plays at 3:24, 4:24, 5:24` }));

	soundItems[2].description = 'duration: 3 min. plays at 3:24, 4:24, 5:24. Now playing: 3:29 remaining';
	soundItems[3].description = 'duration: 3 min. plays at 3:24, 4:24, 5:24. Up next.';

	const projectionItems = items
		.filter((item) => item.room === 'projection')
		.map((item) => ({ primary: item.title, secondary: item.artist, description: `duration: ${item.duration} min. plays at 3:24, 4:24, 5:24` }));

	projectionItems[4].description = 'duration: 3 min. plays at 3:24, 4:24, 5:24. Now playing: 3:29 remaining';
	projectionItems[5].description = 'duration: 3 min. plays at 3:24, 4:24, 5:24. Up next.';

</script>

<div class="flex h-screen divide-x divide-neutral-200">
	<div class="flex flex-1 flex-col gap-6 p-10">
		<h2 class="text-xs font-semibold tracking-widest text-neutral-400 uppercase">Sound Room</h2>
		<Timeline items={soundItems} interactive={false} active={2} />
	</div>
	<div class="flex flex-1 flex-col gap-6 p-10">
		<h2 class="text-xs font-semibold tracking-widest text-neutral-400 uppercase">Projection Room</h2>
		<Timeline items={projectionItems} interactive={false} active={4}/>
	</div>
</div>

<script>
	import { items } from '$lib/data.js';
	import Timeline from '$lib/Timeline.svelte';

	const soundItems = items
		.filter((item) => item.room === 'sound')
		.map((item) => ({ primary: item.title, secondary: item.artist }));
	const projectionItems = items
		.filter((item) => item.room === 'projection')
		.map((item) => ({ primary: item.title, secondary: item.artist }));
</script>

<div class="flex h-screen divide-x divide-neutral-200">
	<div class="flex flex-1 flex-col gap-6 p-10">
		<h2 class="text-xs font-semibold tracking-widest text-neutral-400 uppercase">Sound Room</h2>
		<Timeline items={soundItems} interactive={false} />
	</div>
	<div class="flex flex-1 flex-col gap-6 p-10">
		<h2 class="text-xs font-semibold tracking-widest text-neutral-400 uppercase">Projection Room</h2>
		<Timeline items={projectionItems} interactive={false} />
	</div>
</div>

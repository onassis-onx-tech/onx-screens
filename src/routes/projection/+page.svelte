<script>
	import { items } from '$lib/data.js';
	import RoomView from '$lib/RoomView.svelte';

	const projectionItems = items.filter((item) => item.room === 'projection');
</script>

<RoomView items={projectionItems} />

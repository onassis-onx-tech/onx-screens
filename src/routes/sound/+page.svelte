<script>
	import { items } from '$lib/data.js';
	import RoomView from '$lib/RoomView.svelte';

	const soundItems = items.filter((item) => item.room === 'sound');
</script>

<RoomView items={soundItems} />

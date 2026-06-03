<script>
	import RoomView from '$lib/RoomView.svelte';

	let { data } = $props();
	const projectionItems = $derived(data.items.filter((item) => item.room === 'projection'));
</script>

<RoomView items={projectionItems} accentColor="#5f3eff" title="Projection Room" />

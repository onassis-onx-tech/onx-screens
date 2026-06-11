<script>
	import RoomView from '$lib/RoomView.svelte';
	import RefreshAt from '$lib/RefreshAt.svelte';

	let { data } = $props();
	const projectionItems = $derived(data.items.filter((item) => item.room === 'projection'));
</script>

<RefreshAt />
<RoomView items={projectionItems} accentColor="#5f3eff" title="Projection Room" />

<script>
  import RoomView from "$lib/RoomView.svelte";
  import RefreshAt from "$lib/RefreshAt.svelte";

  let { data } = $props();
  const soundItems = $derived(
    data.items.filter((item) => item.room === "sound"),
  );
</script>

<RefreshAt />
<RoomView
  items={soundItems}
  titleCardDuration={13}
  endCardDuration={13}
  accentColor="#FAF80F"
  title="Sound Room"
/>

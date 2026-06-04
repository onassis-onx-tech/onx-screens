<script>
  import RoomView from "$lib/RoomView.svelte";

  let { data } = $props();
  const soundItems = $derived(
    data.items.filter((item) => item.room === "sound"),
  );
</script>

<RoomView
  items={soundItems}
  titleCardDuration={7}
  endCardDuration={7}
  accentColor="#FAF80F"
  title="Sound Room"
/>

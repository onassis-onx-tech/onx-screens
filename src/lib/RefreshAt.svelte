<script>
	import { onMount } from 'svelte';

	let { hour = 13, minute = 1 } = $props();

	onMount(() => {
		function msUntilTarget() {
			const now = new Date();
			const target = new Date(now);
			target.setHours(hour, minute, 0, 0);
			if (target <= now) target.setDate(target.getDate() + 1);
			return target - now;
		}

		const timer = setTimeout(() => location.reload(), msUntilTarget());
		return () => clearTimeout(timer);
	});
</script>

<script>
	let { item = null } = $props();
</script>

{#if item}
	<div class="flex flex-col gap-4">
		<div>
			{#if item.artist}
				<p class="text-xs text-neutral-400 mb-1">{item.artist}</p>
			{/if}
			<h2 class="text-lg font-semibold text-neutral-900 leading-snug">{item.title}</h2>
			<p class="text-xs text-neutral-400 mt-1">
				{[item['Date Created'], item.Medium, item.Duration ? item.Duration + ' min' : null]
					.filter(Boolean)
					.join(' · ')}
			</p>
		</div>

		{#if item['Long Description (200 Words)']}
			<p class="text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
				{item['Long Description (200 Words)']}
			</p>
		{/if}
	</div>
{/if}

<script>
	let { items = [], active = $bindable(null) } = $props();
</script>

<div class="relative flex flex-col pl-6">
	<div class="absolute left-[7px] top-2 bottom-2 w-px bg-neutral-300"></div>

	{#each items as item, i}
		{@const isActive = active === i}
		<button
			onclick={() => (active = i)}
			class="relative flex gap-4 pb-8 last:pb-0 text-left transition-all duration-150 cursor-pointer"
		>
			<div class="absolute -left-[17px] mt-1 rounded-full border-2 transition-all duration-150
				{isActive
					? 'size-4 border-neutral-700 bg-neutral-700'
					: 'size-3.5 border-neutral-400 bg-white'}">
			</div>
			<div class="flex flex-col transition-all duration-150 {isActive ? 'scale-[1.04] origin-left' : ''}">
				{#if item.artist}
					<span class="text-xs transition-colors duration-150 {isActive ? 'text-neutral-600' : 'text-neutral-400'}">{item.artist}</span>
				{/if}
				<span class="text-sm transition-all duration-150 {isActive ? 'font-semibold text-neutral-900' : 'text-neutral-800'}">{item.title}</span>
			</div>
		</button>
	{/each}
</div>

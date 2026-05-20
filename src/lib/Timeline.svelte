<script>
	let { items = [], active = $bindable(null), interactive = true } = $props();
</script>

<div class="relative flex flex-col pl-6">
	<div class="absolute left-[7px] top-2 bottom-2 w-px bg-neutral-300"></div>

	{#each items as item, i}
		{@const isActive = active === i}
		<button
			onclick={interactive ? () => (active = i) : undefined}
			class="relative flex gap-4 pb-8 last:pb-0 text-left transition-all duration-150 {interactive ? 'cursor-pointer' : 'cursor-default'}"
		>
			<div class="absolute -left-[17px] mt-1 rounded-full border-2 transition-all duration-150
				{isActive
					? 'size-4 border-neutral-700 bg-neutral-700'
					: 'size-3.5 border-neutral-400 bg-white'}">
			</div>
			<div class="flex flex-col transition-all duration-150 {isActive ? 'scale-[1.04] origin-left' : ''}">
				{#if item.secondary}
					<span class="text-xs transition-colors duration-150 {isActive ? 'text-neutral-600' : 'text-neutral-400'}">{item.secondary}</span>
				{/if}
				<span class="text-sm transition-all duration-150 {isActive ? 'font-semibold text-neutral-900' : 'text-neutral-800'}">{item.primary}</span>
				{#if item.description}
					<span class="text-xs mt-0.5 {isActive ? 'text-neutral-500' : 'text-neutral-400'}">{item.description}</span>
				{/if}
			</div>
		</button>
	{/each}
</div>

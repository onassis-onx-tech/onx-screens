<script>
	let { items = [], active = $bindable(null), interactive = true, accentColor = null } = $props();
</script>

<div class="relative flex flex-col">
	{#each items as item, i}
		{@const isActive = active === i}
		<button
			onclick={interactive ? () => (active = i) : undefined}
			class="relative flex gap-4 pb-4 last:pb-0 text-left transition-all duration-150 {interactive ? 'cursor-pointer' : 'cursor-default'}"
		>
			<div class="flex flex-col transition-all duration-150">
				{#if item.secondary}
					<span
						class="font-bold transition-all duration-150 {isActive ? 'text-2xl' : 'text-xl'}"
						style={isActive && accentColor ? `color: ${accentColor}` : 'color: white'}
					>{item.secondary}</span>
				{/if}
				<span
					class="font-cumbia transition-all duration-150 mb-[-0.5rem] {isActive ? 'text-3xl font-bold' : 'text-xl'}"
					style={isActive && accentColor ? `color: ${accentColor}` : 'color: white'}
				>{item.primary}</span>
				{#if item.description}
					<span
						class="mt-0.5 transition-all duration-150 {isActive ? 'text-lg' : 'text-xs'}"
						style={isActive && accentColor ? `color: ${accentColor}` : 'color: rgba(255,255,255,0.6)'}
					>{item.description}</span>
				{/if}
			</div>
		</button>
	{/each}
</div>

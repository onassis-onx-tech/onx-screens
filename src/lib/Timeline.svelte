<script>
	let { items = [], active = $bindable(null), interactive = true, dark = false, accentColor = null } = $props();
</script>

<div class="relative flex flex-col {dark ? '' : 'pl-6'}">
	{#if !dark}
		<div class="absolute left-[7px] top-2 bottom-2 w-px bg-neutral-300"></div>
	{/if}

	{#each items as item, i}
		{@const isActive = active === i}
		<button
			onclick={interactive ? () => (active = i) : undefined}
			class="relative flex gap-4 pb-8 last:pb-0 text-left transition-all duration-150 {interactive ? 'cursor-pointer' : 'cursor-default'}"
		>
			{#if !dark}
				<div class="absolute -left-[17px] mt-1 rounded-full border-2 transition-all duration-150
					{isActive
						? 'size-4 border-neutral-700 bg-neutral-700'
						: 'size-3.5 border-neutral-400 bg-white'}">
				</div>
			{/if}
			<div class="flex flex-col transition-all duration-150 {!dark && isActive ? 'scale-[1.04] origin-left' : ''}">
				{#if item.secondary}
					{#if dark}
						<span
							class="font-bold transition-all duration-150 {isActive ? 'text-2xl' : 'text-sm'}"
							style={isActive && accentColor ? `color: ${accentColor}` : 'color: white'}
						>{item.secondary}</span>
					{:else}
						<span
						class="text-xs transition-colors duration-150 {isActive ? 'text-neutral-600' : 'text-neutral-400'}"
						style={isActive && accentColor ? `color: ${accentColor}` : ''}
					>{item.secondary}</span>
					{/if}
				{/if}
				{#if dark}
					<span
						class="transition-all duration-150 {isActive ? 'text-3xl font-bold' : 'text-sm'}"
						style={isActive && accentColor ? `color: ${accentColor}` : 'color: white'}
					>{item.primary}</span>
				{:else}
					<span
						class="text-sm transition-all duration-150 {isActive ? 'font-semibold text-neutral-900' : 'text-neutral-800'}"
						style={isActive && accentColor ? `color: ${accentColor}` : ''}
					>{item.primary}</span>
				{/if}
				{#if item.description}
					{#if dark}
						<span
							class="mt-0.5 transition-all duration-150 {isActive ? 'text-lg' : 'text-xs'}"
							style={isActive && accentColor ? `color: ${accentColor}` : 'color: rgba(255,255,255,0.6)'}
						>{item.description}</span>
					{:else}
						<span
							class="text-xs mt-0.5 {isActive ? 'text-neutral-500' : 'text-neutral-400'}"
							style={isActive && accentColor ? `color: ${accentColor}` : ''}
						>{item.description}</span>
					{/if}
				{/if}
			</div>
		</button>
	{/each}
</div>

function parseDuration(str) {
	const parts = str.split(':').map(Number);
	if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
	if (parts.length === 2) return parts[0] * 60 + parts[1];
	return parts[0];
}

export function artTimeline(items, { titleCardDuration, endCardDuration, currentTime, totalDuration }) {
	const sessionOver = currentTime >= totalDuration;

	const segments = items.map((item) => {
		const videoDuration = parseDuration(item.duration);
		const skipCycles = item.skipCycles ?? 0;
		return { videoDuration, segmentDuration: titleCardDuration + videoDuration + endCardDuration, skipCycles };
	});

	// Walk loops k=1,2,3,... accumulating duration until we find the loop containing currentTime.
	let elapsed = 0;
	let currentLoop = 1;
	let loopStart = 0;

	if (!sessionOver) {
		for (let k = 1; ; k++) {
			const loopDuration = segments.reduce(
				(sum, seg) => (k % (seg.skipCycles + 1) === 0 ? sum + seg.segmentDuration : sum),
				0
			);
			if (elapsed + loopDuration > currentTime || loopDuration === 0) {
				currentLoop = k;
				loopStart = elapsed;
				break;
			}
			elapsed += loopDuration;
			if (elapsed >= totalDuration) {
				currentLoop = k;
				loopStart = elapsed;
				break;
			}
		}
	}

	const posInCurrentLoop = sessionOver ? -1 : currentTime - loopStart;

	let offset = 0;
	return items.map((item, i) => {
		const { videoDuration, skipCycles } = segments[i];
		const skipped = currentLoop % (skipCycles + 1) !== 0;

		if (skipped) {
			return { ...item, startTime: null, durationSeconds: videoDuration, playing: -1, skipped: true, posInCurrentLoop };
		}

		const startTime = offset;
		offset += segments[i].segmentDuration;

		let playing = -1;
		if (!sessionOver) {
			const localPos = posInCurrentLoop - startTime;
			if (localPos >= titleCardDuration && localPos < titleCardDuration + videoDuration) {
				playing = localPos - titleCardDuration;
			}
		}

		return { ...item, startTime, durationSeconds: videoDuration, playing, skipped: false, posInCurrentLoop };
	});
}

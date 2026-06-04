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
		return { videoDuration, segmentDuration: titleCardDuration + videoDuration + endCardDuration };
	});

	const startTimes = segments.reduce((acc, { segmentDuration }, i) => {
		acc.push(i === 0 ? 0 : acc[i - 1] + segments[i - 1].segmentDuration);
		return acc;
	}, []);

	const loopDuration = segments.reduce((sum, { segmentDuration }) => sum + segmentDuration, 0);
	const pos = sessionOver ? -1 : currentTime % loopDuration;

	return items.map((item, i) => {
		const startTime = startTimes[i];
		const { videoDuration, segmentDuration } = segments[i];
		let playing = -1;

		if (!sessionOver) {
			const localPos = pos - startTime;
			if (localPos >= titleCardDuration && localPos < titleCardDuration + videoDuration) {
				playing = localPos - titleCardDuration;
			}
		}

		return { ...item, startTime, durationSeconds: videoDuration, playing };
	});
}

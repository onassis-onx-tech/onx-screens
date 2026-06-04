function parseDuration(str) {
	const parts = str.split(':').map(Number);
	if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
	if (parts.length === 2) return parts[0] * 60 + parts[1];
	return parts[0];
}

function buildSegments(items, titleCardDuration, endCardDuration) {
	return items.map((item) => {
		const videoDuration = parseDuration(item.duration);
		const skipCycles = item.skipCycles ?? 0;
		return { videoDuration, segmentDuration: titleCardDuration + videoDuration + endCardDuration, skipCycles };
	});
}

// Walk loops k=1,2,3,... until we find the one containing currentTime.
// Returns { currentLoop, loopStart } where loopStart is seconds elapsed before this loop.
function findCurrentLoop(segments, { currentTime, totalDuration }) {
	let elapsed = 0;
	for (let k = 1; ; k++) {
		const loopDuration = segments.reduce(
			(sum, seg) => (k % (seg.skipCycles + 1) === 0 ? sum + seg.segmentDuration : sum),
			0
		);
		if (elapsed + loopDuration > currentTime || loopDuration === 0) {
			return { currentLoop: k, loopStart: elapsed };
		}
		elapsed += loopDuration;
		if (elapsed >= totalDuration) {
			return { currentLoop: k, loopStart: elapsed };
		}
	}
}

export function artTimeline(items, { titleCardDuration, endCardDuration, currentTime, totalDuration }) {
	const sessionOver = currentTime >= totalDuration;
	const segments = buildSegments(items, titleCardDuration, endCardDuration);

	let currentLoop = 1;
	let loopStart = 0;
	if (!sessionOver) {
		({ currentLoop, loopStart } = findCurrentLoop(segments, { currentTime, totalDuration }));
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

// Returns number[][] — one array of seconds-from-session-start per item,
// listing only future play times (video start, not title card start) within totalDuration.
export function scheduledPlayTimes(items, { titleCardDuration, endCardDuration, currentTime, totalDuration }) {
	const segments = buildSegments(items, titleCardDuration, endCardDuration);
	const { currentLoop, loopStart } = findCurrentLoop(segments, { currentTime, totalDuration });

	const result = items.map(() => []);

	let loopElapsed = loopStart;
	for (let k = currentLoop; loopElapsed < totalDuration; k++) {
		let offset = 0;
		for (let i = 0; i < items.length; i++) {
			if (k % (segments[i].skipCycles + 1) === 0) {
				const videoStart = loopElapsed + offset + titleCardDuration;
				if (videoStart > currentTime && videoStart < totalDuration) {
					result[i].push(videoStart);
				}
				offset += segments[i].segmentDuration;
			}
		}
		const loopDuration = segments.reduce(
			(sum, seg) => (k % (seg.skipCycles + 1) === 0 ? sum + seg.segmentDuration : sum),
			0
		);
		if (loopDuration === 0) break;
		loopElapsed += loopDuration;
	}

	return result;
}

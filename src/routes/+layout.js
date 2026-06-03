import Papa from 'papaparse';

export const prerender = true;
export const trailingSlash = 'always';

export async function load({ fetch }) {
	const res = await fetch('/artData.csv');
	const text = await res.text();
	const { data } = Papa.parse(text, { header: true, skipEmptyLines: true });

	const items = data.map((row) => ({
		artist: row['Name'].trim(),
		title: row['Artwork Title'],
		year: row['Year'],
		duration: row['Duration'],
		category: row['Category'],
		description: row['Description'],
		credits: row['Credits'],
		room: row['Category'] === 'Video' ? 'sound' : 'projection'
	}));

	return { items };
}

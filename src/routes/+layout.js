import Papa from 'papaparse';
import csvText from '../../static/artData.csv?raw';

export const prerender = true;
export const trailingSlash = 'always';

export async function load() {
	const { data } = Papa.parse(csvText, { header: true, skipEmptyLines: true });

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

export async function GET() {
	const apiKey = process.env.GOOGLE_FONTS_API_KEY;
	const response = await fetch(
		`https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}&sort=popularity`,
	);
	const data = await response.json();
	return Response.json(data);
}

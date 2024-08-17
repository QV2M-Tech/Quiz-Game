export function timeFormat(ms: number): string {
	const minutes: number = Math.floor(ms / 60000);
	const seconds: number = Math.floor((ms % 60000) / 1000);
	return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

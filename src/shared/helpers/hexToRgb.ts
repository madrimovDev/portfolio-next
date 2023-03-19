export function hexToRgb(hex: string, alpha = 1): string | null {
	const format = /^#?([a-f\d]{3}|[a-f\d]{6})$/i;
	if (!format.test(hex)) {
		return null;
	}

	hex = hex.replace("#", "");

	let r: number, g: number, b: number;
	if (hex.length === 3) {
		r = parseInt(hex.charAt(0), 16) * 17;
		g = parseInt(hex.charAt(1), 16) * 17;
		b = parseInt(hex.charAt(2), 16) * 17;
	} else {
		r = parseInt(hex.substring(0, 2), 16);
		g = parseInt(hex.substring(2, 4), 16);
		b = parseInt(hex.substring(4), 16);
	}

	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}


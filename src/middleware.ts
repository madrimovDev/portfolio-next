import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest } from "next/server";

let headers = { "accept-language": "en-US,en;q=0.5" };
let languages = new Negotiator({ headers }).languages();
let locales = ["en", "uz"];
let defaultLocale = "uz";

match(languages, locales, defaultLocale); // -> 'en-US'

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) {
	const acceptLanguageHeader = request.headers.get("Accept-Language");
	// If Accept-Language header is present
	if (acceptLanguageHeader) {
		// Split the header value into an array of language tags
		const acceptedLanguages = acceptLanguageHeader.split(",");

		// Loop through the accepted languages in order of preference
		for (const acceptedLanguage of acceptedLanguages) {
			// Extract the language code from the language tag
			const languageCode = acceptedLanguage.split(";")[0].trim();

			// Check if the language code is supported
			if (locales.includes(languageCode)) {
				return languageCode; // Return the supported language code
			}
		}
	}

	// If no supported language is found in the Accept-Language header, return the default locale
	return defaultLocale;
}

export function middleware(request: NextRequest) {
	// Check if there is any supported locale in the pathname
	const { pathname } = request.nextUrl;
	const pathnameHasLocale = locales.some(
		(locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
	);

	if (pathnameHasLocale) return;

	// Redirect if there is no locale
	const locale = getLocale(request);

	request.nextUrl.pathname = `/${locale}${pathname}`;
	// e.g. incoming request is /products
	// The new URL is now /en-US/products
	return Response.redirect(request.nextUrl);
}

export const config = {
	matcher: "/((?!api|static|.*\\..*|_next).*)",
};


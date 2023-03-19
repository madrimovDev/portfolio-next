import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/shared";
import { MainLayout } from "@/ui";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider
			resetCSS
			theme={theme}
		>
			<MainLayout>
				<Component {...pageProps} />
			</MainLayout>
		</ChakraProvider>
	);
}


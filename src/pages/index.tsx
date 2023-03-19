import { Experience, Hero } from "@/components";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<>
			<Hero />
			<Experience />
		</>
	);
}


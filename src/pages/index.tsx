import { BlogsCards, Experience, Hero, WorkCards } from "@/components";
import { WorkCard } from "@/ui/core";
import { Divider, Grid } from "@chakra-ui/react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<>
			<Hero />
			<Experience />
			<Divider my="10" />
			<WorkCards />
			<Divider my="10" />
			<BlogsCards />
		</>
	);
}



import { Section } from "@/ui/core";
import { BlogCard } from "@/ui/core/BlogCard";
import { Grid } from "@chakra-ui/react";
import React from "react";

export const BlogsCards = () => {
	return (
		<Section title="Blogs">
			<Grid
				gridTemplateColumns="repeat(2, 1fr)"
				gap={[4, 6, 10]}
				my="10"
			>
				<BlogCard />
				<BlogCard />
			</Grid>
		</Section>
	);
};



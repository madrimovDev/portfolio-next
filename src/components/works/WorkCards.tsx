import { Section, WorkCard } from "@/ui/core";
import { Grid } from "@chakra-ui/react";
import React from "react";

export const WorkCards = () => {
	return (
		<Section title='Works'>
			<Grid
				gridTemplateColumns="repeat(2, 1fr)"
        gap={[4, 6, 10]}
        my='10'
			>
				<WorkCard />
				<WorkCard />
			</Grid>
		</Section>
	);
};


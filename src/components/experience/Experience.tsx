import React, { Fragment } from "react";
import { Box, Grid, Text } from "@chakra-ui/react";
import { Section } from "@/ui/core";

export const Experience = () => {
	return (
		<Section title="Experience">
			<Grid
				gridTemplateColumns="1fr 10fr"
        gap="4"
        mt='5'
			>
				{[0, 1, 2, 3, 4].map((item) => {
					return (
						<Fragment key={item}>
							<Text fontWeight='bold'>2021</Text>
							<Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod natus voluptates nisi necessitatibus suscipit consectetur ex sint omnis corrupti iure!</Text>
						</Fragment>
					);
				})}
			</Grid>
		</Section>
	);
};



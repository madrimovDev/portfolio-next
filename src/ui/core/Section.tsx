import { Box, Heading } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";

interface SectionProps {
	title?: string;
	children: ReactNode;
}

export const Section: FC<SectionProps> = ({ children, title }) => {
	return (
		<Box
			as="section"
			mt="10"
		>
			{title && (
				<Heading
					as="h2"
          fontSize="lg"
				>
					{title}
				</Heading>
			)}
			{children}
		</Box>
	);
};


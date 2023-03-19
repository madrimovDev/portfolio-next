import { Container } from "@chakra-ui/react";
import React, { FC, PropsWithChildren } from "react";
import { Navbar } from "../navbar/Navbar";

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<main>
			<Navbar />
			<Container
				zIndex={0}
				px='10'
				maxW="container.sm"
			>
				{children}
			</Container>
		</main>
	);
};


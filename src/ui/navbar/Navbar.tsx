import React, { memo, useMemo } from "react";
import {
	Box,
	Container,
	Flex,
	IconButton,
	Text,
	Theme,
	useColorMode,
	useColorModeValue,
	useTheme,
} from "@chakra-ui/react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { hexToRgb } from "@/shared";
import { DesktopMenu } from "./DesktopMenu";
import { MobileMenu } from "./MobileMenu";

const ToggleTheme = memo(() => {
	const Icon = useColorModeValue(BsMoonFill, BsSunFill);
	const { toggleColorMode } = useColorMode();
	return (
		<IconButton
			colorScheme="blue"
			onClick={toggleColorMode}
			aria-label="toggle-theme"
		>
			<Icon />
		</IconButton>
	);
});

ToggleTheme.displayName = "ToggleMenu";

const Logo = () => {
	return (
		<Text
			fontWeight="semibold"
			letterSpacing="wide"
			fontSize="lg"
		>
			Madrimov
		</Text>
	);
};

export const Navbar = () => {
	const { colors } = useTheme<Theme>();
	const bgs = useMemo(() => {
		return {
			black: hexToRgb(colors.gray[800], 0.8),
			white: hexToRgb("#fff", 0.8),
		};
	}, [colors]);
	const bgCcolor = useColorModeValue(bgs.white, bgs.black);

	return (
		<Box
			as='header'
			bg={bgCcolor!}
			position="sticky"
			w="full"
			top="0"
			zIndex={9999}
			backdropFilter="blur(14px)"
		>
			<Container maxW="container.md">
				<Flex
					align="center"
					justify="space-between"
					gap="10"
					py="4"
				>
					<Logo />
					<Flex
						flexGrow="1"
						justify={["flex-end", "flex-end", "space-between"]}
						align="center"
						gap="2"
					>
						<DesktopMenu />
						<ToggleTheme />
						<MobileMenu />
					</Flex>
				</Flex>
			</Container>
		</Box>
	);
};


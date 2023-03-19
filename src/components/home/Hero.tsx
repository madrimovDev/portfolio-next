import {
	Box,
	Flex,
	Heading,
	Image,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

export const Hero = () => {
	const bg = useColorModeValue("blackAlpha.100", "whiteAlpha.100");
	return (
		<Box
			mt="10"
			pb="10"
			borderBottomWidth={1}
			borderColor="chakra-border-color"
		>
			<Text
				textAlign="center"
				bg={bg}
				p="2"
				rounded="base"
			>
				Hello, I&apos;m a Front-end Engineer from Uzbekistan
			</Text>
			<Flex
				mt="10"
				justify="space-between"
				align="center"
        direction={["column-reverse", "column-reverse", "row"]}
        gap='4'
			>
				<Box>
					<Heading
						as="h1"
						fontSize="3xl"
					>
						Xudoshukur Madrimov
					</Heading>
					<Text
						color="GrayText"
						textAlign={["center", "center", "left"]}
					>
						Front-end Engineer / Mentor
					</Text>
				</Box>
				<Image
					src="/avatar.jpg"
					alt="img"
					rounded="full"
					w='100px'
					h='100px'
					borderWidth={4}
					borderStyle='solid'
					borderColor='blue.400'
				/>
			</Flex>
		</Box>
	);
};


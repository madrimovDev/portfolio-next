import {
	Card,
	CardBody,
	Flex,
	Heading,
	Image,
	LinkOverlay,
	Stack,
	Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { BsHeart, BsFillChatLeftTextFill } from "react-icons/bs";

export const BlogCard = () => {
	return (
		<Card
			as={Link}
			href="/"
			overflow="hidden"
		>
			<Image
				src="https://api.lorem.space/image/car"
				alt="cars"
			/>
			<CardBody p={[2, 2, 6]}>
				<Stack>
					<Heading
						as="h4"
						fontSize="md"
					>
						Blog Title
					</Heading>
					<Text
						fontSize="sm"
						color="GrayText"
					>
						Lorem ipsum dolor sit...
					</Text>
					<Flex
						align="center"
						gap="2"
					>
						<Flex
							fontSize="xs"
							align="center"
							gap="1"
						>
							<BsHeart />
							56
						</Flex>
						<Flex
							fontSize="xs"
							align="center"
							gap="1"
						>
							<BsFillChatLeftTextFill />
							56
						</Flex>
					</Flex>
				</Stack>
			</CardBody>
		</Card>
	);
};





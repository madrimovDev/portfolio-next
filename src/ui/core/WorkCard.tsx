import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Heading,
	Image,
	Link,
	Stack,
	Text,
} from "@chakra-ui/react";
import React from "react";
import { BsGithub } from "react-icons/bs";

export const WorkCard = () => {
	return (
		<Card overflow="hidden">
			<Image
				src="https://api.lorem.space/image/house"
				alt="house"
			/>
			<CardBody p={[2, 2, 6]}>
				<Stack>
					<Heading
						as="h4"
						fontSize="md"
					>
						Lorem, ipsum dolor.
					</Heading>
					<Text fontSize='sm' color='GrayText'>Lorem ipsum dolor sit amet.</Text>
				</Stack>
				<Link as="a" fontSize='xs' display='inline-flex' mt='4' alignItems='center' gap='2'>
					Source <BsGithub />
				</Link>
			</CardBody>
		</Card>
	);
};


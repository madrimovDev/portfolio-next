import React, { FC, memo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { HStack, Link as ChLink } from "@chakra-ui/react";
import { MenuItem, menuItems } from "./menuItems";

interface CustomLinkProps {
	item: MenuItem;
}

const CustomLink: FC<CustomLinkProps> = ({ item }) => {
	const { pathname } = useRouter();

	const isActive = pathname.split("/")[1] === item.href.substring(1);

	return (
		<ChLink
			as={Link}
			color={isActive ? "blue.400" : ""}
			href={item.href}
		>
			{item.title}
		</ChLink>
	);
};

export const DesktopMenu = memo(() => {
	return (
		<HStack
			spacing="6"
			display={["none", "none", "flex"]}
		>
			{menuItems.map((item) => {
				return (
					<CustomLink
						key={item.href}
						item={item}
					/>
				);
			})}
		</HStack>
	);
});

DesktopMenu.displayName = "Desktop Menu";


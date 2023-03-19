import React from "react";
import {
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from "@chakra-ui/react";
import { BsList } from "react-icons/bs";
import { menuItems } from "./menuItems";
import Link from "next/link";

export const MobileMenu = () => {
	return (
		<Menu>
			<MenuButton
        display={["inline-flex", 'inline-flex', "none"]}
				as={IconButton}
				aria-label="Menu"
				icon={<BsList />}
			/>
			<MenuList>
				{menuItems.map((item) => {
					return (
						<MenuItem
							as={Link}
							key={item.href}
							href={item.href}
							icon={<item.Icon />}
						>
							{item.title}
						</MenuItem>
					);
				})}
			</MenuList>
		</Menu>
	);
};


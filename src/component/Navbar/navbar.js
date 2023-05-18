import React, { useState } from "react";
import {
  Navbar,
  Tooltip,
  Stack,
  Center,
  UnstyledButton,
} from "@mantine/core";
import logo from "../../logo.svg";
import { useStyles } from "./nvabar-style";
import {
  IconChartInfographic,
  IconDeviceGamepad2,
  IconLogout,
  IconBrandGoogleHome,
} from "@tabler/icons-react";


const data = [
  { icon: IconBrandGoogleHome, label: "Home" },
  { icon: IconDeviceGamepad2, label: "Game" },
  { icon: IconChartInfographic, label: "Leader Board" },

];

function NavbarLink({ icon: Icon, label, active, onClick }) {
  const { classes, cx } = useStyles();

  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

function Aside() {
  const [active, setActive] = useState(0);

  const links = data.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));
  return (
    <Navbar width={{ base: 80 }} p="md">
      <Center>
        <img src={logo} height={60} alt="logo" />
      </Center>
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink icon={IconLogout} label="Logout" />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}

export default Aside;

'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Image from 'next/image';
import { Link } from '@mui/material';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

interface NavigationItem {
  href: string;
  label: string;
  divider?: string;
}

const navItems: NavigationItem[] = [
  { href: '/', label: 'JR 2023' },
  /* { href: '/events', label: 'Ohjelma' }, */
  //{ href: '/rissenimi', label: 'Risteilynimi' },
  //{ href: '/notepad', label: 'Hyttimuistio', divider: colors.lightred },
  { href: '/tuplis', label: 'Tuplis' },
  /* { href: '/prices', label: 'Hinnasto' }, */
  { href: '/guide', label: 'Ohjeet' },
  /*   { href: "/ehdot", label: "Matkaehdot" }, */
  { href: '/loimu', label: 'Loimu' },
  { href: '/afterlecture', label: 'After Lecture' },
];

const drawerWidth = 240;

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Image src="icon.svg" alt="Jouluristeily 2023" width={100} height={100} />

      <Divider />
      <List>
        {navItems.map((item) => (
          <Link key={item.label} href={item.href}>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          color: '#000',
          bgcolor: '#fff',
          outline: '5px dashed yellow',
          boxShadow: '0 0 0 5px red',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
          <Box>
            <Image src="icon.svg" alt="Jouluristeily 2022" width={100} height={100} />
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' }, flexGrow: 1 }}>
            {navItems.map((item) => (
              <Link key={item.label} href={item.href}>
                <Button sx={{ color: '#000', fontWeight: 800 }}>{item.label}</Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ py: 6 }}></Box>
    </Box>
  );
}

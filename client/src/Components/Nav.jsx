import React, { useState, useEffect } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from '@nextui-org/react'
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from '@clerk/clerk-react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { update } from '../Contexts/store'

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuItems = [
    { label: 'Home', index: 0, src: '/' },
    { label: 'User Snippets', index: 1, src: '/user-snippets' },
    { label: 'Create Snippets', index: 2, src: '/create-snippet' },
    { label: 'Explore Snippets', index: 3, src: '/explore-snippets' },
    { label: 'Help & Feedback', index: 4, src: '/help-and-feedback' },
  ]

  return (
    <Navbar
      shouldHideOnScroll
      onMenuOpenChange={setIsMenuOpen}
      className="py-2 px-1"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link
            to="/"
            className="font-bold text-inherit text-2xl font-inter-tight"
          >
            Code Vault
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-7" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.label}>
            <Link to={item.src}>{item.label}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <NavbarItem className="hidden lg:flex">
            <SignInButton mode="modal" />
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              <SignUpButton mode="modal" />
            </Button>
          </NavbarItem>
        </SignedOut>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            <Link color="foreground" className="w-full" href="#" size="lg">
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}

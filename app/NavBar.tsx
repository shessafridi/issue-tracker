'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';

import { Skeleton } from '@/app/components';
import { cn } from '@/lib/utils';
import {
  Avatar,
  Box,
  Container,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  Flex,
  Text,
} from '@radix-ui/themes';

type Props = {};

const NavBar = (props: Props) => {
  return (
    <nav className='bg-white flex border-b mb-5 px-5 h-16 md:h-14 items-center'>
      <Container>
        <Flex justify='between' align='center'>
          <Flex gap='4'>
            <Link className='text-2xl text-zinc-800' href='/'>
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    {
      label: 'Dashboard',
      href: '/',
    },
    {
      label: 'Issues',
      href: '/issues',
    },
  ];

  return (
    <ul className='flex space-x-6'>
      {links.map(link => (
        <li key={link.href}>
          <Link
            className={cn(
              'nav-link',
              currentPath === link.href && 'text-zinc-900'
            )}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const session = useSession();

  const user = session.data?.user;

  if (session.status === 'loading')
    return <Skeleton height='1.5rem' width='3rem' />;

  if (session.status === 'unauthenticated')
    return (
      <Link className='nav-link' href='/api/auth/signin'>
        Login
      </Link>
    );

  if (session.status === 'authenticated') {
    return (
      <Box>
        <DropdownMenuRoot>
          <DropdownMenuTrigger>
            <Avatar
              className='cursor-pointer'
              size='2'
              radius='full'
              fallback='?'
              src={user?.image!}
              referrerPolicy='no-referrer'
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <Text size='2'>{user!.email}</Text>
            </DropdownMenuLabel>
            <Link href='/api/auth/signout'>
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenuRoot>
      </Box>
    );
  }

  return null;
};

export default NavBar;

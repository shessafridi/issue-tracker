'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

import {
  Avatar,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  Text,
} from '@radix-ui/themes';

type Props = {};

function NavBarAuthLinks({}: Props) {
  const session = useSession();

  const user = session.data?.user;
  return (
    <>
      {session.status === 'authenticated' && (
        <DropdownMenuRoot>
          <DropdownMenuTrigger>
            <Avatar
              className='cursor-pointer'
              size='2'
              radius='full'
              fallback='?'
              src={user?.image!}
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
      )}
      {session.status === 'unauthenticated' && (
        <Link href='/api/auth/signin'>Login</Link>
      )}
    </>
  );
}

export default NavBarAuthLinks;

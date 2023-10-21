'use client';

import { useSession } from 'next-auth/react';

import NavLink from './NavLink';

type Props = {};

function NavBarAuthLinks({}: Props) {
  const session = useSession();
  return (
    <>
      {session.status === 'authenticated' && (
        <NavLink href='/api/auth/signout' label='Log Out' />
      )}
      {session.status === 'unauthenticated' && (
        <NavLink href='/api/auth/signin' label='Login' />
      )}
    </>
  );
}

export default NavBarAuthLinks;

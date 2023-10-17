'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

type Props = {
  label: string;
  href: string;
};

function NavLink({ label, href }: Props) {
  const currentPath = usePathname();

  return (
    <Link
      className={cn(
        'text-zinc-500 hover:text-zinc-800 transition-colors',
        currentPath === href && 'text-zinc-900'
      )}
      href={href}
    >
      {label}
    </Link>
  );
}

export default NavLink;

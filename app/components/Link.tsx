import NextLink from 'next/link';
import { PropsWithChildren } from 'react';

import { Link as RadixLink } from '@radix-ui/themes';

type Props = { href: string } & PropsWithChildren;

function Link({ href, children }: Props) {
  return (
    <RadixLink asChild>
      <NextLink href={href}>{children}</NextLink>
    </RadixLink>
  );
}

export default Link;

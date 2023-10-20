import 'react-loading-skeleton/dist/skeleton.css';

import { ComponentProps } from 'react';
import ReactSkeleton from 'react-loading-skeleton';

type Props = {} & ComponentProps<typeof ReactSkeleton>;

function Skeleton({ ...props }: Props) {
  return <ReactSkeleton {...props} />;
}

export default Skeleton;

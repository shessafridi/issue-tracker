import { Skeleton } from '@/app/components';
import {
  TableBody,
  TableCell,
  TableColumnHeaderCell,
  TableHeader,
  TableRoot,
  TableRow,
  TableRowHeaderCell,
} from '@radix-ui/themes';

import IssueActions from './IssueActions';

type Props = {};

function LoadingIssuesPage({}: Props) {
  const issues = [1, 2, 3, 4, 5];
  return (
    <div>
      <IssueActions />

      <TableRoot variant='surface'>
        <TableHeader>
          <TableRow>
            <TableColumnHeaderCell>Issue</TableColumnHeaderCell>
            <TableColumnHeaderCell className='hidden md:table-cell'>
              Status
            </TableColumnHeaderCell>
            <TableColumnHeaderCell className='hidden md:table-cell'>
              Created
            </TableColumnHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {issues.map(issue => (
            <TableRow key={issue}>
              <TableRowHeaderCell>
                <Skeleton />
                <div className='block md:hidden'>
                  <Skeleton />
                </div>
              </TableRowHeaderCell>
              <TableCell className='hidden md:table-cell'>
                <Skeleton />
              </TableCell>
              <TableCell className='hidden md:table-cell'>
                <Skeleton />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
    </div>
  );
}

export default LoadingIssuesPage;

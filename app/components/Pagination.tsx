import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { Button, Flex, Text, Tooltip } from '@radix-ui/themes';

type Props = {
  itemCount: number;
  pageSize: number;
  currentPage: number;
};

function Pagination({ currentPage, itemCount, pageSize }: Props) {
  const pageCount = Math.ceil(itemCount / pageSize);

  if (pageCount < 2) return null;

  return (
    <Flex align='center' gap='2'>
      <Text size='2'>
        Page {currentPage} of {pageCount}
      </Text>
      <Tooltip content='First page'>
        <Button color='gray' variant='soft' disabled={currentPage === 1}>
          <DoubleArrowLeftIcon />
        </Button>
      </Tooltip>
      <Tooltip content='Back'>
        <Button color='gray' variant='soft' disabled={currentPage === 1}>
          <ChevronLeftIcon />
        </Button>
      </Tooltip>
      <Tooltip content='Next'>
        <Button
          color='gray'
          variant='soft'
          disabled={currentPage === pageCount}
        >
          <ChevronRightIcon />
        </Button>
      </Tooltip>
      <Tooltip content='Last page'>
        <Button
          color='gray'
          variant='soft'
          disabled={currentPage === pageCount}
        >
          <DoubleArrowRightIcon />
        </Button>
      </Tooltip>
    </Flex>
  );
}

export default Pagination;

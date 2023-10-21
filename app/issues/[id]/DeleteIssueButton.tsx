import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Flex,
} from '@radix-ui/themes';

function DeleteIssueButton({ issueId }: { issueId: string }) {
  return (
    <AlertDialogRoot>
      <AlertDialogTrigger>
        <Button color='red'>Delete Issue</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete this issue? This action cannot be
          undone.
        </AlertDialogDescription>

        <Flex mt='4' gap='3'>
          <AlertDialogCancel>
            <Button variant='soft' color='gray'>
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction>
            <Button color='red'>Delete</Button>
          </AlertDialogAction>
        </Flex>
      </AlertDialogContent>
    </AlertDialogRoot>
  );
}

export default DeleteIssueButton;

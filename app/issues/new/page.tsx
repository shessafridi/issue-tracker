import {
  Button,
  TextArea,
  TextFieldInput,
  TextFieldRoot,
} from '@radix-ui/themes';

type Props = {};

function NewIssuePage({}: Props) {
  return (
    <div className='max-w-xl space-y-3'>
      <TextFieldRoot>
        <TextFieldInput placeholder='Title' />
      </TextFieldRoot>
      <TextArea placeholder='Description' />
      <Button>Submit New Issue</Button>
    </div>
  );
}

export default NewIssuePage;

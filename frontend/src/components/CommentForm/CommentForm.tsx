import { Box, Button } from '@material-ui/core';
import React, { FC, useState } from 'react';
import { CustomInput } from '../../ui-kit';
import SendIcon from '@material-ui/icons/Send';
interface CommentFormProps {
  onSubmit?: (comment: string) => void;
}
export const CommentForm: FC<CommentFormProps> = ({ onSubmit }) => {
  const [values, setValues] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setValues(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<{}>) => {
    event.preventDefault();
    onSubmit && onSubmit(values);
    setValues('');
    console.log('-------Commentaires-----------', values);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Box py={1}>
        <CustomInput
          variant="outlined"
          label="Votre commentaires"
          name="comment"
          multiline
          rows={4}
          value={values}
          onChange={handleChange}
        />
      </Box>
      <Box>
        <Button
          endIcon={<SendIcon />}
          color="primary"
          variant="contained"
          type="submit"
          disabled={values.length === 0}
        >
          Envoyer
        </Button>
      </Box>
    </form>
  );
};

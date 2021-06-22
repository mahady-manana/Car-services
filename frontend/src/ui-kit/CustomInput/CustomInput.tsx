import React, { FC, ReactNode } from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';
import { InputAdornment } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
}));
interface CustomInputProps {
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
}
export const CustomInput: FC<TextFieldProps & CustomInputProps> = ({
  startAdornment,
  endAdornment,
  ...props
}) => {
  const classes = useStyles();

  return (
    <TextField
      {...props}
      classes={{ root: classes.root }}
      InputProps={
        startAdornment
          ? {
              startAdornment: (
                <InputAdornment position="start">
                  {startAdornment}
                </InputAdornment>
              ),
            }
          : endAdornment
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  {endAdornment}
                </InputAdornment>
              ),
            }
          : {}
      }
    />
  );
};

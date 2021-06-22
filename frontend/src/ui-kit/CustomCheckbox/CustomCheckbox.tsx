import React, { FC, ReactNode } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';

interface CustomCheckboxProps {
  label?: ReactNode;
}
export const CustomCheckbox: FC<CheckboxProps & CustomCheckboxProps> = ({
  label,
  ...props
}) => {
  return (
    <FormControlLabel
      control={<Checkbox {...props} color="primary" />}
      label={label}
    />
  );
};

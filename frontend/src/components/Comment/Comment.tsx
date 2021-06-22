import React, { FC } from 'react';
import { Avatar, Box, Button, Card, Typography } from '@material-ui/core';
import { useStyles } from './styles';

type DataProps = {
  user: string;
  date: Date;
  comment?: any;
};
interface CommentProps {
  data: DataProps;
}
export const Comment: FC<CommentProps> = ({ data }) => {
  const { user, date, comment } = data;
  const classes = useStyles();
  const formatedDate = new Date(date);
  return (
    <Card elevation={2} className={classes.root}>
      <Box display="flex" alignItems="center">
        <Box className={classes.boxLeft}>
          <Button startIcon={<Avatar />}>{user || ''}</Button>
          <div>
            <Typography variant="caption" className={classes.caption}>
              {formatedDate.toLocaleString('fr-FR', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
              })}
            </Typography>
          </div>
        </Box>
        <Typography style={{ paddingLeft: 15 }}>
          {comment || ''}
        </Typography>
      </Box>
    </Card>
  );
};

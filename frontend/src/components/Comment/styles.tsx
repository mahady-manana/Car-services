import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      '&:nth-child(even)': {
        background: '#f6f6f6',
      },
      padding: 16,
      margin: 10,
    },
    nom: {
      fontWeight: 700,
      textAlign: 'center',
    },
    caption: {
      textAlign: 'center',
    },
    avatar: {
      display: 'flex',
      justifyContent: 'center',
    },
    boxLeft: {
      paddingRight: 15,
      borderRight: '1px solid #ccc',
    },
  }),
);

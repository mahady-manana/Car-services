import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      background: theme.palette.primary.main,
      padding: 20,
    },
    logo: {
      color: '#fff',
      fontSize: '26px !important',
    },
  }),
);

import React, { FC, useState } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import { Button } from '@material-ui/core';
import StarsIcon from '@material-ui/icons/Stars';
import { Redirect } from 'react-router-dom';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
const useStyles = makeStyles((theme) => ({
  root: {
    width: 'calc(50% - 40px)',
    display: 'inline-block',
    marginLeft: 40,
    verticalAlign: 'top',
    marginBottom: 30,
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      marginLeft: 0,
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  typo: {
    marginRight: 15,
    display: 'inline-block',
  },
}));
export type CarProps = {
  modele: string;
  annee: string;
  description: string;
  firme?: string;
  moteur?: string;
  dimensions?: string;
  transmission?: string;
  image?: string;
  _id: string;
  comment?: any;
};
interface CarItemProps {
  car: CarProps;
}
export const CarItem: FC<CarItemProps> = ({ car }) => {
  const {
    modele,
    annee,
    description,
    _id,
    comment,
    dimensions,
    firme,
    image,
    moteur,
    transmission,
  } = car;
  const classes = useStyles();
  const [redirect, setRedirect] = useState<boolean>(false);
  const handleGoDetails = (event: React.MouseEvent<{}>) => {
    event.preventDefault();
    console.log('-----------Go to details----------', event);
    setRedirect(true);
  };
  console.log(car);
  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: `/details/${_id}`,
          state: { car },
        }}
      />
    );
  }
  return (
    <Card className={classes.root} elevation={4} onClick={handleGoDetails}>
      <CardHeader
        avatar={
          <Avatar aria-label="car" className={classes.avatar}>
            <LocalTaxiIcon />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <StarsIcon />
          </IconButton>
        }
        title={
          <Box>
            <Typography
              className={classes.typo}
              style={{
                textTransform: 'uppercase',
                fontWeight: 'bold',
                fontSize: 22,
              }}
            >
              {modele}
            </Typography>
            {moteur && (
              <Typography
                className={classes.typo}
                style={{
                  background: '#052375',
                  color: '#fff',
                  padding: '0px 9px',
                }}
              >
                {moteur}
              </Typography>
            )}
            {transmission && (
              <Typography className={classes.typo} color="primary">
                Transmission : {transmission}
              </Typography>
            )}
          </Box>
        }
        subheader={
          <Box>
            {firme && (
              <Typography className={classes.typo}>{firme} </Typography>
            )}
            {annee && (
              <Typography className={classes.typo}>
                {' '}
                Annee: {annee}
              </Typography>
            )}
            {dimensions && (
              <Typography className={classes.typo}>
                Lxlxh : {dimensions}
              </Typography>
            )}
          </Box>
        }
      />
      <CardMedia
        className={classes.media}
        image={image || ''}
        title="car"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description.substring(0, 150)}...
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          aria-label="share"
          startIcon={<VisibilityIcon />}
          onClick={handleGoDetails}
        >
          Voir details
        </Button>
        <Button startIcon={<QuestionAnswerIcon />}>
          ({comment.length}) commentaires
        </Button>
      </CardActions>
    </Card>
  );
};

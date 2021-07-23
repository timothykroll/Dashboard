import { CircularProgress, Typography } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@ramonak/paper';
import React from 'react';
import useSWR from 'swr';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

import { fetcher } from '../utils/fetcher';
import { calculateChange } from '../utils/stats-helpers';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    textAlign: 'center',
    color: theme.palette.primary.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  container: {
    justifyContent: 'space-between',
    width: '100%',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    paddingTop: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
  },
  green: {
    color: green[500],
    fontSize: '1.5rem',
  },
  red: {
    color: red.A200,
    fontSize: '1.5rem',
  },
}));

interface DetailedStatCardProps {
  value: number;
  title: string;
}

const DetailedStatCard = ({
  value,
  title,
}: DetailedStatCardProps): JSX.Element => {
  const classes = useStyles();
  const { data } = useSWR('/api/stats', fetcher);

  if (!data) return <CircularProgress color="inherit" />;
  if (!data.followersStats) return <div>Error</div>;

  const change = calculateChange(data.followersStats);
  const color = change > 0 ? `${classes.green}` : `${classes.red}`;

  return (
    <Paper customClass={classes.paper} elevation={3}>
      <div className={classes.container}>
        <Typography variant="h4">{value}</Typography>
        <Typography variant="button">{title}</Typography>
      </div>
      <div className={classes.column}>
        <OpenInNewIcon fontSize="small" color="secondary" />
        <Typography className={color}>{change}</Typography>
      </div>
    </Paper>
  );
};

export default DetailedStatCard;

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FriendList from '../../components/friends/FriendList';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} pt={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'max-content;',
    margin: '4vw auto 0 auto;',
  },
  label: {
    marginBottom: '3vw;',
    textAlign: 'center',
  },
  [theme.breakpoints.down('sm')]: {
    root: {
      width: '80%;',
    },
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      width: '100%;',
    },
  },
}));

export default function FriendsLayout() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.label}>
        Friends
      </Typography>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="user friend suggestions, followers, and followings"
        centered
      >
        <Tab label="Suggestions" {...a11yProps(0)} />
        <Tab label="Followers" {...a11yProps(1)} />
        <Tab label="Followings" {...a11yProps(2)} />
      </Tabs>
      <Box boxShadow={1} bgcolor="background.paper">
        <TabPanel component={'span'} value={value} index={0}>
          <FriendList type="suggestions" />
        </TabPanel>
        <TabPanel component={'span'} value={value} index={1}>
          <FriendList type="followers" />
        </TabPanel>
        <TabPanel component={'span'} value={value} index={2}>
          <FriendList type="followings" />
        </TabPanel>
      </Box>
    </div>
  );
}

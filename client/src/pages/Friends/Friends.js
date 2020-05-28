import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
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
        <Box p={3}>
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
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
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
      <AppBar position="relative">
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
      </AppBar>
      <TabPanel component={'span'} value={value} index={0}>
        <FriendList />
      </TabPanel>
      <TabPanel component={'span'} value={value} index={1}>
        <FriendList />
      </TabPanel>
      <TabPanel component={'span'} value={value} index={2}>
        <FriendList />
      </TabPanel>
    </div>
  );
}
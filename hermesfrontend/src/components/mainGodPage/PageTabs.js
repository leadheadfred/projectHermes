import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BuildPage from './BuildPage';
import Items from './Items';
import BuildPath from './BuildPath';
import Matchups from './Matchups';


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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.changeTab(event.target.textContent)
  };
  return (
    <Box sx={{ 
      width: '100%',
      bgcolor: "#070720",
      color: "white"
     }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab sx={{ color: "white" }} label="Build" {...a11yProps(0)} />
          <Tab sx={{ color: "white" }} label="Items" {...a11yProps(1)} />
          <Tab sx={{ color: "white" }} label="Build Paths" {...a11yProps(2)} />
          <Tab sx={{ color: "white" }} label="Matchups" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <BuildPage                 
          pagegod={props.pagegod} 
          role={props.role} 
          rank={props.rank} 
          patch={props.patch} 
          changeTab={props.setTab}
          winrate={props.winRate}
          pickrate={props.pickRate}
          banrate={props.banRate}
          matchup={props.matchup}
          mode={props.mode}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Items pagegod={props.pagegod} role={props.role} rank={props.rank} patch={props.patch} mode={props.mode}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <BuildPath pagegod={props.pagegod} role={props.role} rank={props.rank} patch={props.patch} mode={props.mode}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Matchups pagegod={props.pagegod} role={props.role} rank={props.rank} patch={props.patch} mode={props.mode}/>
      </TabPanel>
    </Box>
  );
}

export {BasicTabs};
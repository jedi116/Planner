import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { GoalsTab } from './goalsTab'
import { useNavigate } from 'react-router-dom'
import TabPanel, {a11yProps} from '@components/common/tabPanel'


export const DashboardTabs: React.FC = () => {
  const [value, setValue] = React.useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const navigate = useNavigate()
  return (
    <div>
      <Box sx={{ width: '90%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
            <Tab label='Goals' {...a11yProps(0)} />
            <Tab label='Plans' {...a11yProps(1)} />
            <Tab label='Events' {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <GoalsTab />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <button onClick={()=>{navigate('/plans')}} >Plans</button>
        </TabPanel>
        <TabPanel value={value} index={2}>
          Coming Soon
        </TabPanel>
      </Box>
    </div>
  )
}

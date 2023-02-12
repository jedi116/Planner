import React, { FC } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import TabPanel, { a11yProps } from '../../components/common/tabPanel'
import PlanCalendar from './planCalendar'

const Plan: FC<{}> = () => {
  const [value, setValue] = React.useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  return (
    <div>
      <Box sx={{ width: '90%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='basic tabs example'
            style={{
              display: 'flex',
              alignContent: 'center',
            }}
          >
            <Tab label='Normal View' {...a11yProps(0)} />
            <Tab label='Calendar View' {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          Coming Soon
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PlanCalendar />
        </TabPanel>
      </Box>
    </div>
  )
}

export default Plan

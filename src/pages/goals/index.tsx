import React from 'react'
import { Goals } from '../../intefaces/goals'
import './index.css'
import GoalsHeader from './header'
import {
  Button,
  Slider,
  Modal,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useLoginRedirect } from '../../customhooks/common'
import AddGoal from './addGoal'
import DeleteGoal from './deleteGoal'
import EditGoal from './editGoal'
import { useGoals } from '../../customhooks/goals'

type ActionType = 'add' | 'edit' | 'delete'
export const GoalsPage: React.FC<Record<string, never>> = () => {
  useLoginRedirect()
  const { goals, getGoals } = useGoals()

  const [goalModalOpen, setGoalModalOpen] = React.useState<boolean>(false)
  const [selectedGoalData, setSelectedGoalData] = React.useState<Goals>()
  const [modalType, setModalType] = React.useState<ActionType | undefined>()
  const handleButtonClicks = (
    e: React.ChangeEvent<any>,
    goalData: Goals | undefined,
    action: ActionType,
  ): void => {
    setModalType(action)
    setGoalModalOpen(true)
    ;(action === 'edit' || action === 'delete') && setSelectedGoalData(goalData)
  }

  return (
    <div className='goals-page-container'>
      <GoalsHeader handleButtonClicks={handleButtonClicks} />
      <div className='goals-page-list-container'>
        {goals?.map((data) => {
          return (
            <div key={data.id} className='goals-page-list-item'>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                >
                  <Typography>{data.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    description: {data.description}
                    <br />
                    type: {data.type}
                    <br />
                    <Slider
                      defaultValue={data.progress}
                      aria-label='Default'
                      valueLabelDisplay='auto'
                      id='progress-slider'
                      disabled
                      marks={[
                        {
                          value: data.progress,
                          label: `${data.progress}%`,
                        },
                      ]}
                    />
                    <div className='goals-page-list-item-buttons'>
                      <Button
                        variant='contained'
                        color='success'
                        onClick={(e) => handleButtonClicks(e, data, 'edit')}
                      >
                        Edit
                      </Button>
                      <Button
                        variant='contained'
                        color='error'
                        onClick={(e) => handleButtonClicks(e, data, 'delete')}
                      >
                        Delete
                      </Button>
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          )
        })}
        {goals?.length === 0 && <span>No data</span>}
      </div>
      <Modal
        open={goalModalOpen}
        onClose={() => setGoalModalOpen(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <div className='modal-contents-container'>
          {modalType === 'add' ? (
            <AddGoal
              closeModal={() => {
                setGoalModalOpen(false)
              }}
              getGoals={getGoals}
            />
          ) : (
            ''
          )}
          {modalType === 'delete' ? (
            <DeleteGoal
              goal={selectedGoalData}
              closeModal={() => {
                setGoalModalOpen(false)
              }}
              getGoals={getGoals}
            />
          ) : (
            ''
          )}
          {modalType === 'edit' ? (
            <EditGoal
              goal={selectedGoalData}
              closeModal={() => {
                setGoalModalOpen(false)
              }}
              getGoals={getGoals}
            />
          ) : (
            ''
          )}
        </div>
      </Modal>
    </div>
  )
}

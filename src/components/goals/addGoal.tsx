import React from 'react'
import { Goals as GoalsType, GoalType } from '../../intefaces/goals'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase/firebase'
import GoalService from '../../service/goals'
import { useLoginRedirect } from '../../customhooks/common'
import { GoalForm, onFormValueChanges, validateFormData } from './common'
import {
  Button,
  Slider,
  Box,
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from '@mui/material'

type AddGoalProps = {
  closeModal: () => void
  getGoals: () => void
}

const AddGoal: React.FC<AddGoalProps> = (props) => {
  const [user, loading, error] = useAuthState(auth)
  const [formData, setFormData] = React.useState<GoalForm>()
  useLoginRedirect()

  const onFormSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault()
    const validationResult = validateFormData(formData)
    if (!validationResult.formDataIsValid) {
      window.alert(validationResult.errorMessage)
      return
    }
    const formattedData: Partial<GoalsType> = {
      uid: user?.uid,
      title: formData?.title,
      description: formData?.description,
      type: formData?.type,
      progress: formData?.progress,
    }
    await GoalService.addGoal(formattedData)
    props.closeModal()
    props.getGoals()
  }

  return (
    <div className='add-goal-form-container'>
      <Box
        component='form'
        noValidate
        autoComplete='off'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
          alignItems: 'center',
        }}
        onSubmit={onFormSubmit}
      >
        <span>Add a Goal</span>
        <FormControl sx={{ marginTop: '1em' }} fullWidth>
          <TextField
            id='outlined-basic'
            label='Goal Title'
            variant='outlined'
            name='goalTitle'
            sx={{ marginTop: '1em' }}
            onChange={(e) => {
              onFormValueChanges(e, 'title', setFormData)
            }}
          />
        </FormControl>
        <FormControl sx={{ marginTop: '1em' }} fullWidth>
          <InputLabel id='demo-simple-select-label'>Goal Type</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={formData?.type}
            sx={{ marginTop: '1em' }}
            onChange={(e) => {
              onFormValueChanges(e, 'goal-type', setFormData)
            }}
          >
            <MenuItem value={'short term'}>short term</MenuItem>
            <MenuItem value={'long term'}>long term</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ marginTop: '1em' }} fullWidth>
          <TextField
            id='outlined-basic'
            label='Goal description'
            variant='outlined'
            name='goalDescription'
            multiline
            minRows={3}
            onChange={(e) => {
              onFormValueChanges(e, 'description', setFormData)
            }}
          />
        </FormControl>

        <Box width={300} sx={{ marginTop: '1em' }}>
          <InputLabel htmlFor='progress-slider'>progress</InputLabel>
          <Slider
            defaultValue={50}
            aria-label='Default'
            valueLabelDisplay='auto'
            id='progress-slider'
            onChange={(e) => {
              onFormValueChanges(e, 'progress', setFormData)
            }}
          />
        </Box>
        <Button variant='contained' onClick={onFormSubmit}>
          Add Goal
        </Button>
      </Box>
    </div>
  )
}

export default AddGoal

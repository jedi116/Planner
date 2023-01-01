import React from 'react'
import { Goals } from '../../intefaces/goals'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase/firebase'
import { useLoginRedirect } from '../../customhooks/common'
import GoalService from '../../service/goals'
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
import { GoalForm, onFormValueChanges, validateFormData } from './common'

type EditGoalProps = {
  closeModal: () => void
  getGoals: () => void
  goal: Goals | undefined
}
const EditGoal: React.FC<EditGoalProps> = (props) => {
  useLoginRedirect()
  const [user, loading, error] = useAuthState(auth)
  const [formData, setFormData] = React.useState<GoalForm | undefined>(props.goal)

  const onFormSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault()
    const validationResult = validateFormData(formData)
    if (!validationResult.formDataIsValid) {
      window.alert(validationResult.errorMessage)
      return
    }
    const formattedData: Partial<Goals> = {
      uid: user?.uid,
      title: formData?.title,
      description: formData?.description,
      type: formData?.type,
      progress: formData?.progress,
      id: props.goal?.id,
    }
    await GoalService.updateGoal(formattedData)
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
            value={formData?.title}
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
            value={formData?.description}
          />
        </FormControl>

        <Box width={300} sx={{ marginTop: '1em' }}>
          <InputLabel htmlFor='progress-slider'>progress</InputLabel>
          <Slider
            defaultValue={formData?.progress}
            aria-label='Default'
            valueLabelDisplay='auto'
            id='progress-slider'
            onChange={(e) => {
              onFormValueChanges(e, 'progress', setFormData)
            }}
          />
        </Box>
        <Button
          variant='contained'
          onClick={onFormSubmit}
          disabled={
            formData?.title === props.goal?.title &&
            formData?.progress === props.goal?.progress &&
            formData?.description === props.goal?.description &&
            formData?.type === props.goal?.type
          }
        >
          Edit Goal
        </Button>
      </Box>
    </div>
  )
}

export default EditGoal

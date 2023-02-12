import { Goals as GoalsType, GoalType } from '../../intefaces/goals'
import { SelectChangeEvent } from '@mui/material'
export type GoalForm = Partial<Omit<GoalsType, 'uid' | 'id'>>
export type FormFieldTypes = 'progress' | 'title' | 'goal-type' | 'description'

export const onFormValueChanges = (
  e: React.ChangeEvent<any> | SelectChangeEvent<GoalType> | Event,
  type: FormFieldTypes,
  setFormData: (
    value: React.SetStateAction<Partial<Omit<GoalsType, 'uid' | 'id'>> | undefined>,
  ) => void,
) => {
  switch (type) {
    case 'progress':
      setFormData((data) => ({ ...data, progress: e.target.value }))
      break
    case 'title':
      setFormData((data) => ({ ...data, title: e.target.value }))
      break
    case 'goal-type':
      setFormData((data) => ({ ...data, type: e.target.value }))
      break
    case 'description':
      setFormData((data) => ({ ...data, description: e.target.value }))
      break
    default:
      break
  }
}

export const validateFormData = (fData: GoalForm | undefined) => {
  let formDataIsValid = true
  let errorMessage = 'Please fill in the following fields before submitting'
  if (!fData?.type || !fData?.title || !fData?.progress || !fData?.description) {
    formDataIsValid = false
    if (!fData?.type) {
      errorMessage += '\n Goal Type'
    }
    if (!fData?.title) {
      errorMessage += '\n Goal Title'
    }
    if (!fData?.progress) {
      errorMessage += '\n Goal Progress'
    }
    if (!fData?.description) {
      errorMessage += '\n Goal Description'
    }
  }
  return { formDataIsValid, errorMessage }
}

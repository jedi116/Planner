export interface Goals {
  id: string
  title: string
  description: string
  type: GoalType
  uid: string
  progress: number
}

export type GoalType = 'short term' | 'long term'

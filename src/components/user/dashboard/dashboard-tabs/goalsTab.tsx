import React from 'react'
import { Goals } from '../../../../intefaces/goals'

const goalsSample: Array<Goals> = [
    {
        title: 'Master Scala',
        description: 'master scala with function programming and oop',
        type: 'long term',
        uid:'testuid',
        progress: 20
    },
    {
        title: 'Master typescript',
        description: 'master typescript with React  and Nodejs',
        type: 'long term',
        uid:'testuid',
        progress: 20
    },
    {
        title: 'Master Sql',
        description: 'master all aspects of sql specially t-sql',
        type: 'long term',
        uid:'testuid',
        progress: 20
    },
    {
        title: 'Learn and Master Rust',
        description: 'master all aspects of Rust specially web development',
        type: 'long term',
        uid:'testuid',
        progress: 1
    }
]


export const GoalsTab: React.FC<unknown> = () => {
    return (
        <div>
            <div className ='goals-tab-header'>
               <span className='goals-tab-header-title'>Goals</span>
               <button className ='goals-tab-header-button'> Add More Goals</button> 
            </div>
            <div>
                {
                    goalsSample.map((goal, index) => {
                        return (
                            <span className='goals-tab-list' key ={index}>{goal.title}</span>
                        )
                    })
                }
                <button className ='goals-tab-button'> ... View More Goals</button>
            </div>
        </div>
    )
}
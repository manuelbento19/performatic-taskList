import { memo } from "react"

const TaskCard = ({Task,Action,Delete}) => {
    return(
        <li className={Task.checked ?'checked':''}>
            <button type='button' id='check' onClick={()=>Action({type: 'UPDATE',id:Task.id})}>{Task.checked && '✔️'}</button>
            <p>{Task.content}</p>
            <button type='button' id='remove' onClick={()=>Delete(Task.id)}>🗑️</button>
        </li>
    )
} 
export default memo(TaskCard);
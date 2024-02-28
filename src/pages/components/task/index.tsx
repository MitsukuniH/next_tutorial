
/*アロー関数
名前をつけない一時関数
↓詳しくはここを参照
https://qiita.com/may88seiji/items/4a49c7c78b55d75d693b
*/
import styles from "@/pages/components/task/task.module.css"
import { Dispatch, SetStateAction } from "react";
interface Props {
    taskId: number;
    tasks: string[];
    setTasks: Dispatch<SetStateAction<string[]>>;
}

export const Task = (
    props:Props
)=>{
    //削除ボタンクリック時の操作
    const handleDelete = ()=>{
        const deleted = props.tasks.filter((_,i)=>i!==props.taskId);    //現在のタスクを除いた配列を作成
        props.setTasks(deleted);                                        //tasksにセット
    }
    return(
        <div className={styles.task}>
            <h3>{props.tasks[props.taskId]}</h3>
            <button onClick={handleDelete}>削除</button>
        </div>
    )
}
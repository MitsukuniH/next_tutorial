import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import { Task } from "./components/task";
import { Header } from "./components/header";

export default function Home() {
  const [tasks, setTasks] = useState<string[]>([]);       //タスクの名前を入れる配列
  const [newTask, setNewTask] =useState<string>("");      //入力中のタスクを入れる変数
  const [error, setError] = useState<string|null>(null);  //エラーを入れる変数
  const [isFirst, setIsFirst] = useState<boolean>(true);

  //inputのonchangeの動作をコントロールする関数
  const handleChangeTaskName = (taskName: string) =>{
    setNewTask(taskName);   //変更された値をnewTask変数に入れている
  }
  //追加buttonのonclickの動作をコントロールする関数
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.preventDefault();   //デフォルトの操作をブロック（この場合form中のbuttonのリロードする動作を阻止）
    if(newTask===""){     //タスクが未入力だった場合のハンドリング
      setError("タスクが入力されていません！")
      return;
    }
    setTasks(ts=>[...ts, newTask])  //tasks配列にnewTaskの内容を加える
    setNewTask("");                 //newTaskをクリア
    setError(null);                 //errorをクリア
  }
  //ページが読み込まれた時にローカルストレージからタスクを読み出す
  useEffect(()=>{
    const tasklist = localStorage.getItem("tasks")?.split(",");
    if(!tasklist) return;

    setTasks(tasklist)
  },[])
  //tasksが更新された時、それをローカルストレージに反映する
  useEffect(()=>{
    if(isFirst){
      setIsFirst(false);
      return;
    }
    if(tasks.length===0){
      localStorage.setItem(`tasks`, "")
      return;
    }
    const tasklist = tasks.reduce((list, t)=>{
      return list += `,${t}`
    })
    localStorage.setItem(`tasks`, tasklist); //localStorageに新しいタスクを保存
  }, [tasks])

  

  //ここからHTML要素
  return (
    <>
      <Head>
        <title>MyTodo!!</title>
      </Head>
      <main className={styles.main}>
        <Header/>                         {/* Headerコンポーネントの呼び出し */}
        <div className={styles.tasks}>    {/* tasks配列を展開してTaskコンポーネントにPropsとして渡して表示 */}
          {tasks.map((_,i)=>(
            <Task key={i} taskId={i} tasks={tasks} setTasks={setTasks}/>
          ))}
        </div>
        <form className={styles.form}>    {/* 新しいタスク入力用のフォーム */}
          <input type="text" value={newTask} onChange={(e)=>{handleChangeTaskName(e.target.value)}}/>
          <button type="submit" onClick={(e)=>handleSubmit(e)}>追加</button>
        </form>
        {error?                           /* エラーがある場合は表示する */
          <div className={styles.error}>
            <h3>{error}</h3>
          </div>:
          <></>
        }
      </main>
    </>
  );
}

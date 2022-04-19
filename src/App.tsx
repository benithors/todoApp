import './App.css';
import {ChangeEventHandler, createRef, MouseEventHandler, useState} from "react";


function TodoInstance(props: { value: string; onChanged; onClick2: MouseEventHandler<HTMLButtonElement>; index:number}) {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [isDone, setIsDone] = useState<boolean>(false);
    return <div className={" px-8 mt-4 mb-4 flex flex-row justify-between w-full shadow-2xl h-28 backdrop-blur-xl backdrop-opacity-40 " + (!isDone ? " " : "bg-green-400")}>

        <>
            <button onClick={() => editMode? null : setIsDone(prevState => !prevState)} className={"w-full"}>

                {!editMode ?
                    <div className={"flex-grow text-4xl text-white " + (isDone && "line-through")}>
                        {props.value}
                    </div>
                    :
                    <div className={"flex-grow"}>
                        <input className={"input input-bordered w-full max-w-xs flex-grow text-4xl text-white  " + (isDone && " line-through")} type="text" value={props.value} onChange={(e)=>props.onChanged(e,props.index)}/>
                    </div>

                }
            </button>

            <div className={"flex flex-row"}>

                {editMode ?

                    <button onClick={() => setEditMode(prevState => !prevState)} className={"btn btn-primary"}>
                        done editing
                    </button>
                    :
                    <>
                        { !isDone &&
                            <>
                                <button defaultValue={"add your tasks here"} onClick={props.onClick2} className={"btn btn-warning"}>
                                    delete
                                </button>
                                <button onClick={() => setEditMode(prevState => !prevState)} className={"btn btn-secondary"}>
                                    edit
                                </button>
                            </>
                        }
                    </>
                }
            </div>
        </>

    </div>;
}

function App() {

    const [tasks, setTasks] = useState(['example']);

    const [task, setTask] = useState('');

    function handleChange(event) {
        setTask(event.target.value);
    }

    const setFocus = () => {
        inputRef.current && inputRef.current.focus()
    }

    function addTask() {
        if (!task) {
            return
        }
        setTasks(prevState => [...prevState, task]);
        setTask('');
        setFocus()
    }

    function removeItem(item) {
        setTasks((prevState) =>
            prevState.filter((prevItem) => prevItem !== item)
        );
    }

    function handleChangeOfTask(e,index: number) {
        //change the task at index
        const newTasks = [...tasks];
        newTasks[index] = e.target.value;
        setTasks(newTasks);

    }

    const inputRef = createRef<HTMLInputElement>();

    return (
        <div data-theme="cyberpunk" className="flex flex-row justify-center  w-full h-screen bg-gradient-to-br from-primary to-secondary">
            <div className={'flex flex-col '}>

                <h1 className={'text-8xl pt-8 text-secondary pb-14'}>
                    What's the Plan for today?
                </h1>

                <div className={'flex flex-row '}>

                    <input autoFocus onChange={handleChange} placeholder={'add your task'} value={task} ref={inputRef} className="input w-full max-w-xs"/>
                    <button onClick={addTask} className={'btn btn-secondary ml-2'}>
                        add tasks
                    </button>

                </div>
                <div>
                    {tasks.map((value, index) => (
                        <TodoInstance key={index} value={value} onClick2={() => removeItem(value)} onChanged={handleChangeOfTask} index={index}/>
                    ))}
                </div>

            </div>


        </div>
    );
}

export default App;

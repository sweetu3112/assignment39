import React from "react";
import { useState, useEffect } from "react";
import Task from "../../component/Task/Task";
import showToast from 'crunchy-toast';
import { saveListToLocalStorage } from "./../../util/Localstorage";
import './Home.css';
const Home = () => {
    const [taskList, setTaskList] = useState([
        {
            id: 1,
            title: "Submit assighnbment",
            discription: "Nahi to gali padegi",
            priority: "high"
        },

    ])

    const [id, setId] = useState(0);
    const [title, setTitle] = useState('');
    const [discription, setDiscription] = useState('');
    const [priority, setPriority] = useState('');
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        const list = JSON.parse(localStorage.getItem('letsRock'));
        if (list && list.length >= 0) {
            setTaskList(list)
        }
    }, [])

    const findTaskIndexById = (taskId) => {
        let index;
        taskList.forEach((task, i) => {
            if (task.id === taskId) {
                index = i;
            }
        })

        return index;
    }


    const clearInputFields = () => {
        setTitle('');
        setDiscription('');
        setPriority('');
    }


    const addTaskToList = () => {

        if(!title ){
            showToast('Title is required ' , 'warning' , 3000);
            return ;
        }
        if( !discription ){
            showToast('Discription is required ' , 'warning' , 3000);
            return ;
        }
        if( !priority){
            showToast('Priority is required ' , 'warning' , 3000);
            return ;
        }
        const randomId = Math.floor(Math.random() * 1000);

        const obj = {
            id: randomId,
            title: title,
            discription: discription,
            priority: priority,
        }

        const newTaskList = [...taskList, obj]

        setTaskList(newTaskList)

        clearInputFields()

        saveListToLocalStorage(newTaskList);
        showToast('Task Added SuccessFuly 👍', 'success', 3000);
    }

    const removeTaskFromList = (id) => {

        const index = findTaskIndexById(id);

        const tempArray = taskList;
        tempArray.splice(index, 1);

        setTaskList([...tempArray])

        saveListToLocalStorage(tempArray);
        showToast('Task Deleted SuccessFuly 👍', 'warning', 4000);
    }


    const setTaskEditable = (id) => {
        setIsEdit(true);
        setId(id);
        let currentEditTask;

        taskList.forEach((task) => {
            if (task.id === id) {
                currentEditTask = task;
            }
        })

        setTitle(currentEditTask.title)
        setDiscription(currentEditTask.discription)
        setPriority(currentEditTask.priority)
    }

    const updateTask = () => {
        let indexToUpdate;

        taskList.forEach((task, i) => {
            if (task.id === id) {
                indexToUpdate = i;
            }
        })
        // const indexToUpdate = findTaskIndexById(id);

        const tempArray = taskList;
        tempArray[indexToUpdate] = {
            id: id,
            title: title,
            discription: discription,
            priority: priority,
        }
        setTaskList([...tempArray])

        saveListToLocalStorage(tempArray)

        setId(0);
        clearInputFields();
        setIsEdit(false);
        showToast('Task Updated', 'info', 4000);
    }

    return (
        <>
            <div className="container">
                <h1 className="app-title">Let'sRock 📃</h1>

                <div className="todo-flex-container">
                    <div >
                        <h2 className="text-center">show Task</h2>
                        <div className="tasks-container">
                            {
                                taskList.map((taskItem, index) => {
                                    const { id, title, discription, priority } = taskItem;

                                    return <Task id={id}
                                        title={title}
                                        discription={discription}
                                        priority={priority}
                                        key={index}
                                        removeTaskFromList={removeTaskFromList}
                                        setTaskEditable={setTaskEditable}
                                    />
                                })
                            }
                        </div>
                    </div>
                    <div>
                        <h2 className="text-center">
                            {isEdit ? `Update Task ${id}` : "Add Task"}
                        </h2>
                        <div className="add-task-form-container">
                            <form>

                                <input type="text"
                                    value={title}
                                    onChange={(e) => {
                                        setTitle(e.target.value)
                                    }}
                                    placeholder="Enter Titel"
                                    className="task-input"
                                />
                                <input type="text"
                                    value={discription}
                                    onChange={(e) => {
                                        setDiscription(e.target.value)
                                    }}
                                    placeholder="Enter discription"
                                    className="task-input"
                                />
                                <input type="text"
                                    value={priority}
                                    onChange={(e) => {
                                        setPriority(e.target.value)
                                    }}
                                    placeholder="Enter Priority"
                                    className="task-input"
                                />

                                <div className="but-container">
                                    <button className="btn-add-task"
                                        type="button"
                                        onClick={() => {
                                            isEdit ? updateTask() : addTaskToList();
                                        }}
                                    >
                                        {isEdit ? 'Update ' : ' Add'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
export default Home
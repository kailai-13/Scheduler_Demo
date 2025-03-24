import React , { useState , useEffect } from 'react';
import { get , getQuotes, post , put , remove} from '../utils/api';

const TaskList = () => {
    const [tasks , setTasks] =useState([]);
    const [loading , setLoading] = useState(true);
    useEffect(()=>{
        const Fetch = async () => {
            try{
                const data = await get();
                setTasks(data.tasks);
             
            }
            catch(error){
                console.error(error);
            }
            finally{
                setLoading(false);
            }
        };
        Fetch();
    },[]);

    const [quote , setQuote] = useState('');

    useEffect(()=>{
        const Fetch2 = async () => {
            try{
                const data = await getQuotes();
                setQuote(data);
            }
            catch(error){
                console.error(error);
        }
        };
        Fetch2();
    }
    ,[]);

    const [popUp, setPopUp] = useState(false);
    const [newTask , setNewTask] = useState({
        name: '',
        description: '',
        start_date: '',
        due_date: ''
    })

    const handleChange = (e) => {
        setNewTask({...newTask, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const addtask = await post(newTask);
            setTasks((tasks) => [...tasks, addtask]);
           
        }
        catch (error){
            console.error(error);
        }
        finally{
            setPopUp(false);
            setNewTask({ name: "", description: "", start_date: "", due_date: "" });
            window.location.reload();
        }
    };
    const [editPopUp, setEditPopUp] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const handleEdit = (task) => {
        setCurrentTask(task);
        setEditPopUp(true);
    }
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await put(currentTask.id, currentTask);
            setTasks(tasks.map(task => (task.id === currentTask.id ? currentTask : task)));
        } catch (error) {
            console.error(error);
        } finally {
            setEditPopUp(false);
        }
    };


    
    const handleDelete = async (id) => {
        try{
            await remove(id);
            setTasks(tasks.filter(task => task.id !== id));

        }
        catch(error){
            console.error(error);
        }
       
    }


    


    if (loading)
        return <h1 className="text-center">Loading...</h1>;

    return (
        <>
        <h1 className="text-2x1 font-bold mb-4 text-center">Quote of the day: {quote.quote} Author: {quote.author}</h1>
        <div className="container mx-auto p-4">
            <h1 className="text-2x1 font-bold mb-4 text-center">Task List</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tasks.map((task)=>(
                    <div key={task.id} className=' flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10'>
                        <div>
                            <h2 className='text-xl font-bold text-black dark:text-white'>{task.name}</h2>
                            <p className='text-white font-medium '>{task.description}</p>
                            <p className='text-sm font-serif text-gray-500'>Start:{task.start_date}</p>
                            <p className='text-sm font-serif text-red-500'>Due: {task.due_date}</p>
                            <div className="flex justify-between mt-2 gap-5">
                                <button 
                                    onClick={() => handleEdit(task)} 
                                    className="btn-primary bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-700">
                                
                                    Edit
                                </button>
                                <button
                                onClick={() => handleDelete(task.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700">
                                    Delete
                                </button>
                            
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center my-10">
                <button 
                    onClick={() => setPopUp(true)} 
                    className="bg-blue-500 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition"
                >
                    + Add Task
                </button>
            </div>

            {/*POPUP MODEL*/}
            {popUp && (
                <div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center'>
                    <div className='bg-white p-4 rounded-lg shadow-md w-1/2'>
                        <h1>Add Task</h1>
                        <form onSubmit={handleSubmit}>
                            <input
                            type='text'
                            name='name'
                            value={newTask.name}
                            placeholder='Enter Task Name'
                            onChange={handleChange}
                            className='border border-gray-400 p-2 rounded-md w-full my-2'
                            required
                            />
                            <input
                            type='text'
                            name='description'
                            value={newTask.description}
                            placeholder='Enter Task Description'
                            onChange={handleChange}
                            className='border border-gray-400 p-2 rounded-md w-full my-2'
                            required
                            />
                            <input
                            type='date'
                            name='start_date'
                         
                            onChange={handleChange}
                            value={newTask.start_date}
                            className='border border-gray-400 p-2 rounded-md w-full my-2'
                            required/> 
                            <input
                            type='date'
                            name='due_date'
                        
                            onChange={handleChange}
                            value={newTask.due_date}
                            className='border border-gray-400 p-2 rounded-md w-full my-2'
                            required/>
                            <div className='flex justify-center align-middle'>
                                <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md'>Add Task</button>
                                <button onClick={()=>setPopUp(false)} className='bg-red-500 text-white px-4 py-2 rounded-md'>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {editPopUp && (
                <div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center'>
                    <div className='bg-white p-4 rounded-lg shadow-md w-1/2'>
                        <h1>Edit Task</h1>
                        <form onSubmit={handleUpdate}>
                            <input
                                type='text'
                                name='name'
                                value={currentTask.name}
                                onChange={(e) => setCurrentTask({ ...currentTask, name: e.target.value })}
                                className='border border-gray-400 p-2 rounded-md w-full my-2'
                                required
                            />
                            <input
                                type='text'
                                name='description'
                                value={currentTask.description}
                                onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
                                className='border border-gray-400 p-2 rounded-md w-full my-2'
                                required
                            />
                            <input
                                type='date'
                                name='start_date'
                                value={currentTask.start_date}
                                onChange={(e) => setCurrentTask({ ...currentTask, start_date: e.target.value })}
                                className='border border-gray-400 p-2 rounded-md w-full my-2'
                                required
                            />
                            <input
                                type='date'
                                name='due_date'
                                value={currentTask.due_date}
                                onChange={(e) => setCurrentTask({ ...currentTask, due_date: e.target.value })}
                                className='border border-gray-400 p-2 rounded-md w-full my-2'
                                required
                            />
                            <div className='flex justify-between'>
                                <button type='submit' className='bg-green-500 text-white px-4 py-2 rounded-md'>Update Task</button>
                                <button onClick={() => setEditPopUp(false)} className='bg-red-500 text-white px-4 py-2 rounded-md'>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
        </>
    )



        
}

export default TaskList;

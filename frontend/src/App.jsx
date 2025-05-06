import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskCard from './components/TaskCard';

const API = import.meta.env.VITE_API_URL;

function App() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [adding, setAdding] = useState(false);
    const [updatingId, setUpdatingId] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetchTasks();
    }, []);

    const fetchTasks = () => {
        setLoading(true);
        fetch(`${API}/tasks`)
            .then(res => res.json())
            .then(setTasks)
            .catch(console.error)
            .finally(() => setLoading(false));
    };

    const handleAdd = async ({ title, content }) => {
        setAdding(true);
        const res = await fetch(`${API}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content }),
        });

        if (res.ok) {
            fetchTasks();
            setAdding(false);
            return true;
        }
    };

    const handleComplete = async (id) => {
        setUpdatingId(id);
        const res = await fetch(`${API}/tasks/${id}`, { method: 'PATCH' });
        if (res.ok) {
            fetchTasks();
        }
        setUpdatingId(null);
    };

    return (
        <div className="max-w-6xl mx-auto p-6 pt-12">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-24">
                {/* Left column - Task form */}
                <div className="w-full md:max-w-md">
                    <h2 className="text-xl font-semibold mb-4">Add a Task</h2>
                    <TaskForm onAdd={handleAdd} loading={adding} />
                </div>


                {/* Middle column - Separator */}
                <div className="hidden md:block h-full border-l-2 border-[#D9D9D9]"></div>

                {/* Right column - Task list */}
                <div className="space-y-6">
                    {loading ? (
                        <p className="text-gray-500 italic">Loading tasks...</p>
                    ) : tasks.length === 0 ? (
                        <p className="text-gray-500">No tasks to show</p>
                    ) : (
                        tasks.map(task => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onCompleted={handleComplete}
                                isUpdating={updatingId === task.id}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;

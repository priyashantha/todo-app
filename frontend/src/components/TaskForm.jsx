// src/components/TaskForm.jsx
import { useState } from 'react';

export default function TaskForm({ onAdd, loading }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await onAdd({ title, content });
        if (success) {
            setTitle('');
            setContent('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-4">
                <input
                    type="text"
                    placeholder="Task title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full p-3 border rounded-2xl shadow-md"
                    required
                />
                <textarea
                    placeholder="Task content"
                    value={content}
                    rows={4}
                    onChange={e => setContent(e.target.value)}
                    className="w-full p-3 border rounded-2xl shadow-md"
                />
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full md:w-32 px-4 py-2 rounded-md transition text-white ${
                        loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    {loading ? 'Adding...' : 'Add'}
                </button>
            </div>
        </form>
    );
}

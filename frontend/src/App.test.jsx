import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { vi } from 'vitest';

// Mock fetch for tasks and POST
let tasks;

beforeEach(() => {
    tasks = [
        { id: 1, title: 'Test Task', content: 'Some content' }
    ];

    global.fetch = vi.fn((url, options) => {
        if (options?.method === 'POST') {
            const body = JSON.parse(options.body);
            const newTask = {
                id: Date.now(),
                title: body.title,
                content: body.content,
                completed: false
            };
            tasks = [newTask, ...tasks];
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(newTask)
            });
        }

        // GET /api/tasks
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(tasks.slice(0, 5))
        });
    });
});


afterEach(() => {
    vi.restoreAllMocks();
});

describe('App integration tests', () => {
    it('renders form and tasks', async () => {
        render(<App />);
        expect(await screen.findByText('Test Task')).toBeInTheDocument();
        expect(screen.getByText('Add')).toBeInTheDocument();
    });

    it('can add a new task and it appears in the list', async () => {
        render(<App />);

        const titleInput = screen.getByPlaceholderText('Task title');
        const contentInput = screen.getByPlaceholderText('Task content');

        fireEvent.change(titleInput, { target: { value: 'New Task' } });
        fireEvent.change(contentInput, { target: { value: 'New content' } });

        fireEvent.click(screen.getByText('Add'));

        expect(await screen.findByText('New Task')).toBeInTheDocument();
    });

    it('marks a task as done and removes it from the list', async () => {
        let tasks = [
            { id: 1, title: 'Test Task', content: 'Some content', completed: false },
        ];

        global.fetch = vi.fn((url, options) => {
            if (options?.method === 'PATCH') {
                // Simulate task completion
                tasks = tasks.filter(t => t.id !== 1); // remove task 1
                return Promise.resolve({ ok: true });
            }

            // GET /tasks
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(tasks),
            });
        });

        render(<App />);

        // Ensure task is present
        expect(await screen.findByText('Test Task')).toBeInTheDocument();

        // Click Done
        fireEvent.click(screen.getByText('Done'));

        // Wait for removal
        await waitFor(() => {
            expect(screen.queryByText('Test Task')).not.toBeInTheDocument();
        });
    });

});

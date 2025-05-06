import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from './TaskForm';
import { vi } from 'vitest';

describe('TaskForm', () => {
    it('calls onAdd with title and content', async () => {
        const mockAdd = vi.fn().mockResolvedValue(true);

        render(<TaskForm onAdd={mockAdd} loading={false} />);

        fireEvent.change(screen.getByPlaceholderText('Task title'), {
            target: { value: 'New Task' },
        });
        fireEvent.change(screen.getByPlaceholderText('Task content'), {
            target: { value: 'Content here' },
        });

        fireEvent.click(screen.getByText('Add'));

        expect(await mockAdd).toHaveBeenCalledWith({
            title: 'New Task',
            content: 'Content here',
        });
    });

    it('disables button while loading', () => {
        render(<TaskForm onAdd={() => {}} loading={true} />);
        expect(screen.getByText('Adding...')).toBeDisabled();
    });
});

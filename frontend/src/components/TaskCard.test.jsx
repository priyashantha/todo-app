import { render, screen, fireEvent } from '@testing-library/react';
import TaskCard from './TaskCard';
import { describe, it, expect, vi } from 'vitest';

describe('TaskCard component', () => {
    const mockTask = {
        id: 1,
        title: 'Test Task',
        content: 'This is a test task',
    };

    it('renders task title and content', () => {
        render(<TaskCard task={mockTask} onCompleted={() => {}} />);
        expect(screen.getByText('Test Task')).toBeInTheDocument();
        expect(screen.getByText('This is a test task')).toBeInTheDocument();
        expect(screen.getByText('Done')).toBeInTheDocument();
    });

    it('calls onCompleted when button is clicked', () => {
        const onCompletedMock = vi.fn();
        render(<TaskCard task={mockTask} onCompleted={onCompletedMock} />);

        fireEvent.click(screen.getByText('Done'));
        expect(onCompletedMock).toHaveBeenCalledWith(1);
    });

    it('disables button and shows "Updating..." when isUpdating is true', () => {
        render(<TaskCard task={mockTask} onCompleted={() => {}} isUpdating={true} />);
        const button = screen.getByText('Updating...');
        expect(button).toBeDisabled();
    });
});

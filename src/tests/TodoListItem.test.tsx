import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoListItem from '../components/TodoListItem';

describe('TodoListItem', () => {
    const mockTodo = { id: 1, title: 'Test Todo' };
    const mockOnRemoveTodo = jest.fn();

    beforeEach(() => {
        render(<TodoListItem todo={mockTodo} onRemoveTodo={mockOnRemoveTodo} />);
    });

    test('renders todo title', () => {
        expect(screen.getByText(mockTodo.title)).toBeInTheDocument();
    });

    test('calls onRemoveTodo when remove button is clicked', () => {
        const removeButton = screen.getByRole('button', { name: /remove/i });
        fireEvent.click(removeButton);
        expect(mockOnRemoveTodo).toHaveBeenCalledWith(mockTodo.id);
    });
});
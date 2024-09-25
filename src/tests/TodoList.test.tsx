import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

const mockTodos = [
    { id: 1, title: 'Todo 1' },
    { id: 2, title: 'Todo 2' },
    { id: 3, title: 'Todo 3' },
];

describe('TodoList', () => {
    test('renders the list of todos', () => {
        render(<TodoList todoList={mockTodos} onRemoveTodo={jest.fn()}/>);

        mockTodos.forEach((todo) => {
            expect(screen.getByText(todo.title)).toBeInTheDocument();
        });
    });
    test('calls onRemoveTodo when remove button is clicked', () => {
        const onRemoveTodo = jest.fn();
        render(<TodoList todoList={mockTodos} onRemoveTodo={onRemoveTodo} />);

        const removeButtons = screen.getAllByRole('button', { name: /remove/i });
        fireEvent.click(removeButtons[0]);

        expect(onRemoveTodo).toHaveBeenCalledWith(mockTodos[0].id);
    });
});
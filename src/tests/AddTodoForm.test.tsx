import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddTodoForm from '../components/AddTodoForm';

describe('AddTodoForm', () => {
    test('renders input and add button', () => {
        render(<AddTodoForm onAddTodo={() => {}} />);
        expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
    });

    test('calls onAddTodo when form is submitted', () => {
        const onAddTodoMock = jest.fn();
        render(<AddTodoForm onAddTodo={onAddTodoMock} />);

        const input = screen.getByLabelText(/title/i);
        const button = screen.getByRole('button', { name: /add/i });

        fireEvent.change(input, { target: { value: 'New Todo' } });
        fireEvent.click(button);

        expect(onAddTodoMock).toHaveBeenCalledWith('New Todo');
        expect(input).toHaveValue('');
    });
});
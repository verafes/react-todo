import React from 'react';

import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import InputWithLabel from '../components/InputWithLabel';

describe('InputWithLabel', () => {
    test('renders the label and input correctly', () => {
        render(
            <InputWithLabel id="test" type="text" name="test" value="" onChange={jest.fn()}>
                <strong>Test Label</strong>
            </InputWithLabel>
        );

        expect(screen.getByText(/test label/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/test label/i)).toBeInTheDocument();
    });

    test('calls onChange when input value changes', () => {
        const onChange = jest.fn();
        render(
            <InputWithLabel id="test" type="text" name="test" value="" onChange={onChange}>
                <strong>Test Label</strong>
            </InputWithLabel>
        );

        const input = screen.getByLabelText(/test label/i);
        fireEvent.change(input, { target: { value: 'New Value' } });

        expect(onChange).toHaveBeenCalled();
    });
});
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from '../App';

describe('App component', () => {
	let input, dropdown, submit, user;
	test('input changes correctly', async () => {
		render(<App />);
		user = userEvent.setup();
		input = screen.getByPlaceholderText('Type username');
		await user.type(input, 'Test Subject');
		expect(input).toHaveValue('Test Subject');
	});
	test('dropdown changes correctly', async () => {
		render(<App />);
		user = userEvent.setup();
		dropdown = screen.getByTestId('favFood');
		await user.selectOptions(dropdown, 'pizza');
		expect(dropdown).toHaveValue('pizza');
		await user.selectOptions(dropdown, 'broccoli');
		expect(dropdown).toHaveValue('broccoli');
	});
	test('form submits and displays message correctly', async () => {
		render(<App />);
		user = userEvent.setup();
		input = screen.getByPlaceholderText('Type username');
		dropdown = screen.getByTestId('favFood');
		submit = screen.getByText('Submit');
		await user.type(input, 'Test Subject');
		await user.selectOptions(dropdown, 'pizza');
		await user.click(submit);
		screen.getByText('Success! Test Subject likes pizza');
		expect(dropdown).toHaveValue('-- select favorite food --');
		expect(input).toHaveValue('');
		screen.debug();
	});
});

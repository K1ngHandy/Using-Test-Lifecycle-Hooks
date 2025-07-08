import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from '../App';

beforeAll(() => {});
afterAll(() => {});

describe('App component', () => {
	let input, dropdown, submit, user;
	beforeEach(() => {
		render(<App />);
		user = userEvent.setup();
		input = screen.getByPlaceholderText('Type username');
		dropdown = screen.getByTestId('fav-food');
		submit = screen.getByText('Submit');
	});
	test('input changes correctly', async () => {
		await user.type(input, 'Test Subject');
		expect(input).toHaveValue('Test Subject');
	});
	test('dropdown changes correctly', async () => {
		await user.selectOptions(dropdown, 'Pizza');
		expect(dropdown).toHaveValue('Pizza');
		await user.selectOptions(dropdown, 'Broccoli');
		expect(dropdown).toHaveValue('Broccoli');
	});
	test('form submits and displays message correctly', async () => {
		await user.type(input, 'Test Subject');
		await user.selectOptions(dropdown, 'Pizza');
		await user.click(submit);
		screen.getByText('Success! Test Subject likes Pizza');
		expect(dropdown).toHaveValue('-- Select Favorite Food --');
		expect(input).toHaveValue('');
		// screen.debug();
	});
});

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import BaseButton from './Button'
import BaseFab from './FloatingActionBtn'
import BaseIconButton from './IconButton'

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

describe('testing button components', () => {
    describe('testing base button', () => {
        it('should render button with text', () => {

            const btnTxt = 'test'
            render(<BaseButton text={btnTxt} />)

            expect(screen.getByText(/test/i))
        })

        it('should call onClick when clicked', () => {

            const btnTxt = 'test'
            const testFn = jest.fn()

            render(<BaseButton text={btnTxt} onClick={testFn()} />)

            userEvent.click(screen.getByText(/test/i))
            expect(testFn).toHaveBeenCalledTimes(1)
        })
    })

    describe('testing base FAB', () => {

        it('should render FAB', () => {
            render(<BaseFab />)
            expect(screen.getByTestId('fab'))
        })

        it('should call onClick when clicked', () => {

            const testFn = jest.fn()

            render(<BaseFab onClick={testFn()} />)

            userEvent.click(screen.getByTestId('fab'))
            expect(testFn).toHaveBeenCalledTimes(1)
        })
    })

    describe('testing base IconButton', () => {
        it('should render IconBtn', () => {
            render(<BaseIconButton />)
            expect(screen.getByTestId('iconbtn'))
        })
        
        it('should call onClick when clicked', () => {

            const testFn = jest.fn()

            render(<BaseIconButton onClick={testFn()} />)

            userEvent.click(screen.getByTestId('iconbtn'))
            expect(testFn).toHaveBeenCalledTimes(1)
        })
    })
})
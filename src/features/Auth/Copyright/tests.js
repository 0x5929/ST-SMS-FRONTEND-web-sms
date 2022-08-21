import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'

import Copyright, { getCurrentYear } from './component'

describe('testing Auth feature Copyright component', () => {
    // not sure why this component is in this feature, but ok.
    // i think its bc this part is part of the login screen.
    
    it('should render the Copyright text with the most current year', () => {
        render(<Copyright />)

        expect(screen.getByTestId('copy-right')).toBeInTheDocument()        
        expect(screen.getByTestId('copy-right')).toHaveTextContent('Copyright © Elemental Software Solutions')
    
        cleanup()
    })

    test('the get year function work as expected', () => {
        expect(getCurrentYear()).toBe(new Date().getFullYear())
        
    })

})
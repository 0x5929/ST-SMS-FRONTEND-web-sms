import { render, screen } from '@testing-library/react'

import BaseCard from './component' 

describe('testing card component', () => {
    it('should render card component', () => {
        render(<BaseCard />)

        expect(screen.getByTestId('card'))
    })
    
})
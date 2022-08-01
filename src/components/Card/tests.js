import { render, screen, cleanup } from '@testing-library/react'

import BaseCard from './component' 

afterEach(cleanup)
describe('testing card component', () => {
    it('should render card component', () => {
        render(<BaseCard />)

        expect(screen.getByTestId('card'))
    })
    
})
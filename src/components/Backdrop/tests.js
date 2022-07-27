import { render, screen } from '@testing-library/react'

import SimpleBackDrop from './component'

describe('Testing SimpleBackDrop Component', () => {
    it('should render circular progress', () => {
        render(<SimpleBackDrop openBackdrop={true}/>)
        
        expect(screen.getByRole('progressbar', {hidden: true}))
        expect(screen.getByTestId('circularProgress', {hidden: true}))
    })
})
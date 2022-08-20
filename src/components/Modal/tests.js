import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'

import Modal from './component'

describe('testing modal component', () => {

    let testByMethods

    beforeAll(() => {
    
        testByMethods = (screen) => {
            return {
    
                getInput(labelText) {
                    return screen.getByLabelText(labelText)
                },
                getByTestId(testId) {
                    return screen.getByTestId(testId)
                },
                getByText(text){
                    return screen.getByText(text)
                },
                getAllByText(text) {
                    return screen.getAllByText(text)
                },
                queryByTestId(testId) {
                    return screen.queryByTestId(testId)
                },
                getAllByTestId(testId) {
                    return screen.getAllByTestId(testId)
                },
                getByRole(role, options) {
                    return screen.getByRole(role, options)
                }
            }
        }
    })
    
    
    afterAll(() => {
        testByMethods= undefined
    })

////////////////////////////////////////////////////

    const modalTitle = '__TEST_MODAL_TITLE__'
    const isModalOpen = false
    const handleCloseModal = jest.fn()
    const testChildText = '__TEST_CHILDREN__'
    const children = (
        <div>{ testChildText }</div>
    )
    

    let setup

    beforeEach(() => {
        
        setup = () => {

            const { rerender } = render(
                <Modal 
                    modalTitle={modalTitle}
                    isModalOpen={isModalOpen}
                    handleCloseModal={handleCloseModal}
                    children={children}
                />)

            return {
                ...(testByMethods(screen)),
                rerender,
                testChildText,
                handleCloseModal,
            }
        }
    })

    afterEach(() => {
        setup = undefined
        jest.clearAllMocks()
        cleanup()
    })

    it('should not render modal and all its child comps when open state is set to false', () => {
        const { queryByTestId, testChildText } = setup()

        expect(queryByTestId('mui-dialog')).not.toBeInTheDocument()
        expect(queryByTestId('mui-dialogtitle')).not.toBeInTheDocument()
        expect(queryByTestId('mui-dialogcontent')).not.toBeInTheDocument()

        expect(queryByTestId(testChildText)).not.toBeInTheDocument()
    })

    it('should render modal when open state is set to true', () => {
        const { rerender, getByTestId, getByText, testChildText } = setup()

        rerender(
            <Modal 
                modalTitle={modalTitle}
                isModalOpen={true}
                handleCloseModal={handleCloseModal}
                children={children}
            />
        )

        expect(getByTestId('mui-dialog')).toBeInTheDocument()
        expect(getByTestId('mui-dialogtitle')).toBeInTheDocument()
        expect(getByTestId('mui-dialogcontent')).toBeInTheDocument()
        expect(getByTestId('modal-close-btn')).toBeInTheDocument()

        expect(getByText(testChildText)).toBeInTheDocument()
    })

    it('should trigger handleClose when close button is pressed', () => {
        const { rerender, queryByTestId, handleCloseModal } = setup()

        rerender(
            <Modal 
                modalTitle={modalTitle}
                isModalOpen={true}
                handleCloseModal={handleCloseModal}
                children={children}
            />
        )


        const modalCloseBtn = queryByTestId('modal-close-btn')
        modalCloseBtn.click()
        expect(handleCloseModal.mock.calls).toHaveLength(1)
    })

})
import * as useRefreshToken from './src/hooks/useRefreshToken'

const useRefreshMk = jest.spyOn(useRefreshToken, 'default')
useRefreshMk.mockImplementation(() => {
    const refresh = Promise.resolve('__TEST_ACCESS_KEY__')

    return refresh
})
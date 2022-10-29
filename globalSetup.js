
const useRefreshToken = require('./src/hooks/useRefreshToken')

module.exports = async () => {
    const useRefreshMk = jest.spyOn(useRefreshToken, 'default')
    useRefreshMk.mockImplementation(() => {
        const refresh = jest.fn()
        refresh.mockResolvedValue('__TEST_ACCESS_KEY__')
        return refresh
    })
}

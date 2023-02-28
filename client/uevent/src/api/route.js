const apiUrl = "http://localhost:8080"

export const route = {
    serverURL: apiUrl,
    authPath: () => [apiUrl, 'auth', 'login'].join('/'),
    getAllUsers: () => [apiUrl, 'users'].join('/'),
}
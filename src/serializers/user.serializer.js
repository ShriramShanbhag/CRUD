export const toUserResponse = (user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
})
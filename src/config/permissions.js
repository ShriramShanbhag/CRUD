export const PERMISSIONS = {
    USER_CREATE: 'user:create',
    USER_UPDATE: 'user:update',
    USER_DELETE: 'user:delete',
    USER_READ: 'user:read',
    USER_READALL: 'user:read_all' 
}

// Permissions matrix
export const ROLE_PERMISSIONS = {
    admin: [
        PERMISSIONS.USER_CREATE,
        PERMISSIONS.USER_DELETE,
        PERMISSIONS.USER_READ,
        PERMISSIONS.USER_UPDATE,
        PERMISSIONS.USER_READALL,
    ],
    user: [
        PERMISSIONS.USER_DELETE,
        PERMISSIONS.USER_READ,
        PERMISSIONS.USER_UPDATE,
    ]
}
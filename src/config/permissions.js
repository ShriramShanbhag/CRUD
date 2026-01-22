export const PERMISSIONS = {
    USER_CREATE: 'user:create',
    USER_UPDATE: 'user:update',
    USER_DELETE: 'user:delete',
    USER_READ: 'user:read',
    USER_READALL: 'user:read_all' ,
    CHAT_CREATE: 'chat:create',
    CHAT_UPDATE: 'chat:update',
    CHAT_READ: 'chat:read',
    CHAT_DELETE: 'chat:delete',
    CHAT_READALL: 'chat:read_all',
    TAG_READ: 'tag:read',
    TAG_CREATE: 'tag:create',
    TAG_UPDATE: 'tag:update',
    TAG_DELETE: 'tag:delete'
}

// Permissions matrix
export const ROLE_PERMISSIONS = {
    admin: [
        PERMISSIONS.USER_CREATE,
        PERMISSIONS.USER_DELETE,
        PERMISSIONS.USER_READ,
        PERMISSIONS.USER_UPDATE,
        PERMISSIONS.USER_READALL,

        PERMISSIONS.CHAT_CREATE,
        PERMISSIONS.CHAT_READ,
        PERMISSIONS.CHAT_READALL,
        PERMISSIONS.CHAT_UPDATE,
        PERMISSIONS.CHAT_DELETE,

        PERMISSIONS.TAG_CREATE,
        PERMISSIONS.TAG_READ,
        PERMISSIONS.TAG_UPDATE,
        PERMISSIONS.TAG_DELETE
    ],
    user: [
        PERMISSIONS.USER_DELETE,
        PERMISSIONS.USER_READ,
        PERMISSIONS.USER_UPDATE,

        PERMISSIONS.CHAT_CREATE,
        PERMISSIONS.CHAT_READ,
        PERMISSIONS.CHAT_READALL,
        PERMISSIONS.CHAT_UPDATE,
        PERMISSIONS.CHAT_DELETE,

        PERMISSIONS.TAG_READ
    ]
}
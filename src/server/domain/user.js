const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getAllUser() {
    const allUsers = await prisma.user.findMany({
        select: {
            id: true,
            username: true
        }
    })
    return { users: allUsers }
}

async function getUserById(id) {
    const user = await prisma.user.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            username: true,
            createdAt: true,
            updatedAt: true,
            rooms: true
        }
    })
    return user;
}

async function deleteUser(id) {
    const deletedUser = await prisma.user.delete({
        where: {
            id: id
        }
    })
    return deletedUser;
}

async function getUserByUsername(username) {
    const user = await prisma.user.findUnique({
        where: {
            username: username
        },
        select: {
            id: true,
            username: true,
            createdAt: true,
            updatedAt: true,
            rooms: true
        }
    })
    return user;
}

module.exports = {
    getAllUser,
    getUserById,
    deleteUser,
    getUserByUsername
};
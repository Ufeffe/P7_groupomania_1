function isAdmin(role) {
    if (role === "Admin") {
        return true
    }
}

function isCreator(userId, reqAuth) {
    if (userId === reqAuth) {
        return true
    }
}
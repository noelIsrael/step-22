interface User {
    name: string;
    employeeId: number;
    salary: number;
}
export async function fetchusers() {
    try {
            const whatwegot = await fetch('http://localhost:3000/people');
            const whatwegotarray = await whatwegot.json();
            return whatwegotarray;
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }

}

export async function addUser(user: User) {
    try {
        const response = await fetch('http://localhost:3000/people', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Error adding user');
        }
        return true;
    } catch (error) {
        console.error('Error adding user:', error);
        return false;
    }
}

export async function deleteUser(userId: string) {
    try {
        const response = await fetch(`http://localhost:3000/people/${userId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`Error deleting user with ID ${userId}`);
        }
        return true;
    } catch (error) {
        console.error('Error deleting user:', error);
        return false;
    }
}

export async function updateUser(userId: string, updatedUser: Partial<User>) {
    try {
        const response = await fetch(`http://localhost:3000/people/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        });
        if (!response.ok) {
            throw new Error(`Error updating user with ID ${userId}`);
        }
        return true;
    } catch (error) {
        console.error('Error updating user:', error);
        return false;
    }
}

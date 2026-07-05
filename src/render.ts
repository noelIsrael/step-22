import { fetchusers } from './apiHandler';
import { deleteUser } from './apiHandler';
import { addUser } from './apiHandler';
import { updateUser } from './apiHandler';
export function reset () {
    const userListDiv = document.getElementById('userList');
    if (userListDiv) {
        userListDiv.innerHTML = '';
    }
}

export async function render() {
    const userListDiv = document.getElementById('userList');
    const formContainer = document.getElementById('formContainer');
    const showAllEmployeeBtn = document.getElementById('showAllEmployeeBtn');
    const addUserBtn = document.getElementById('addUserBtn');
    showAllEmployeeBtn?.addEventListener('click', async () => {
        reset();
        if (userListDiv) {
            const users = await fetchusers();
            if (users) {
                for (let i = 0; i < users.length; i++) {
                    const user = users[i];
                    userListDiv.innerHTML += `
                    <p>${user.name}</p>
                    <button class="deleteUserBtn" id="${user.id}">Delete</button>
                    <button class="updateUserBtn" id="${user.id}">Update</button>`;
                }
            }
        }
    });
    if (userListDiv) {
            userListDiv.addEventListener('click', async (e) => {
                const target = e.target as HTMLElement;
                if (target.classList.contains('deleteUserBtn')) {
                    const idofusertodelete = target.id;
                    const success = await deleteUser(idofusertodelete);
                    if (success) {
                        alert('User deleted successfully');
                        reset();
                    }
                }
                else if (target.classList.contains('updateUserBtn')) {
                    const idofusertoupdate = target.id;
                    if (formContainer) {
                        formContainer.innerHTML = `
                        <input type="text" id="newnameInput" placeholder="Enter new name" />
                        <input type="number" id="newsalaryInput" placeholder="Enter new salary" />
                        <button id="submitUpdateBtn">Update</button>`;
                    }
                    const submitUpdateBtn = document.getElementById('submitUpdateBtn');
                    submitUpdateBtn?.addEventListener('click', async () => {
                        const nameInput = document.getElementById('newnameInput') as HTMLInputElement;
                        const salaryInput = document.getElementById('newsalaryInput') as HTMLInputElement;
                        const namegiven = nameInput.value;
                        const salarygiven = parseFloat(salaryInput.value);
                        const updateddata = {name: namegiven, salary: salarygiven};
                        const success = await updateUser(idofusertoupdate, updateddata);
                        if (success) {
                            alert('User updated successfully');
                            reset();
                        }
            });
        }
    });
}
    addUserBtn?.addEventListener('click', () => {
        if (formContainer) {
            formContainer.innerHTML = `
            <input type="text" id="nameInput" placeholder="Enter name" required />
            <input type="number" id="salaryInput" placeholder="Enter salary" required />
            <input type="number" id="employeeIdInput" placeholder="Enter employee ID" required />
            <button id="submitUserBtn">Submit</button>`;
        }
        const submitUserBtn = document.getElementById('submitUserBtn');
        submitUserBtn?.addEventListener('click', async () => {
            const nameInput = document.getElementById('nameInput');
            const salaryInput = document.getElementById('salaryInput');
            const employeeIdInput = document.getElementById('employeeIdInput');
            const name = (nameInput as HTMLInputElement).value;
            const salary = parseFloat((salaryInput as HTMLInputElement).value);
            const employeeId = parseInt((employeeIdInput as HTMLInputElement).value, 10);
            const newUser = { name, salary, employeeId };
            const success = await addUser(newUser);
            if (success) {
                alert('User added successfully');
                reset();
            }
        });
    });
}

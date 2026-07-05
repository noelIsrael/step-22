import {render} from './render';
const homepage = document.getElementById('app')!;
homepage.innerHTML = `
  <h1>Welcome Boss</h1>
  <button id ="showAllEmployeeBtn">Show All Employee</button>
  <button id ="addUserBtn">Add User</button>
  <div id="formContainer"></div>
  <div id="userList"></div>
`;
render();
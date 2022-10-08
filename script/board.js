
async function init() {
  await downloadFromServer();
  users = JSON.parse(backend.getItem('users')) || [];
}

console.log(users);

init();

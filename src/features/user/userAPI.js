export async function fetchUsers() {
  const response = await fetch(
    "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data",
    {
      method: "GET",
    }
  );
  return await response.json();
}

// the following is not available through the actual API, therefore we simulate

let nextUserId = 11;
export async function addUser(user) {
  validateUser(user);
  return {
    id: nextUserId++,
    ...user,
  };
}

export async function editUser(user) {
  validateUser(user);
  return user;
}

export async function deleteUser(user) {
  return user;
}

function validateUser(user) {
  const errors = {};

  if (!user.name.trim()) {
    errors.name = "Name required.";
  }
  if (!user.username.trim()) {
    errors.username = "Username required.";
  }
  if (!user.address.city.trim()) {
    errors.city = "City required.";
  }
  if (!validateEmail(user.email)) {
    errors.email = "Incorrect email.";
  }

  if (Object.keys(errors).length > 0) {
    throw errors;
  }
}

// https://stackoverflow.com/a/46181/1466456
function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

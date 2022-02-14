export async function fetchUsers() {
  const response = await fetch('https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data', {
    method: 'GET', 
  });
  return await response.json(); 
}

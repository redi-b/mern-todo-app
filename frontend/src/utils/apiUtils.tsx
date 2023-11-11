const URL = "http://localhost:5000/api/todos";

// Get Todos from the api (which returns an object
// with indexed todos) then return an arrray of todoDatas
// Gets { 0: {todoData}, 1: {todoData}, ... }
// Returns [todoData, todoData, ...]
export const getTodos = async () => {
  try {
    const response = fetch(`${URL}`, { method: "GET" });
    const data = (await response).json();

    return Object.values(data);
  } catch (error) {
    console.log(error);
  }
};

export const createTodo = async (title: string, body: string) => {
  try {
    const response = await fetch(`${URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body, title }),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateCompleted = async (
  id: string | undefined,
  event: React.ChangeEvent<HTMLInputElement>
) => {
  try {
    const response = await fetch(`${URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: `${event.target.checked}` }),
    });
    const data = response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
export const updateTitle = async (id: string | undefined, title: string | undefined) => {
  try {
    const response = await fetch(`${URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const data = response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
export const updateBody = async (id: string | undefined, body: string) => {
  try {
    const response = await fetch(`${URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body }),
    });
    const data = response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = async (id: string | undefined) => {
  try {
    const response = await fetch(`${URL}/${id}`, { method: "DELETE" });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

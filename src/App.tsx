import { useState } from "react";
import { TodoType } from "./models";
import uuid from "react-uuid";

function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [text, setText] = useState<string>("");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [edit, setEdit] = useState<string>("");
  const [editId, setEditId] = useState<string>("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setTodos([...todos, { id: uuid(), text: text }]);
    setText("");
  }

  function deleteTodoById(id: string) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function updateTodoById(id: string) {
    setEditMode(!editMode);
    todos.map((todo) => {
      if (todo.id === id) {
        setEdit(todo.text);
        setEditId(todo.id);
      }
    });
  }

  function handleUpdate(event: React.FormEvent) {
    event.preventDefault();
    const updatedTodo = todos.map((todo) => {
      if (todo.id === editId) {
        todo.text = edit;
      }
      return todo;
    });
    setTodos(updatedTodo);
    setEditMode(!editMode);
  }

  return (
    <div className="App">
      <h1 className="text-center font-bold text-white text-4xl my-5">
        Todo App
      </h1>
      <div className="md:w-6/12 w-10/12 mx-auto bg-white py-5 px-5 rounded-md">
        {editMode ? (
          <form onSubmit={handleUpdate} className="flex gap-5 justify-between">
            <input
              className="border-b-2 w-9/12 focus:outline-none "
              type="text"
              value={edit}
              placeholder="Write Here!!!"
              onChange={(event) => setEdit(event.target.value)}
            />
            <button className="bg-primary w-3/12 py-2 px-5 rounded-md text-white">
              Edit
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-5 justify-between">
            <input
              className="border-b-2 w-9/12 focus:outline-none "
              type="text"
              value={text}
              placeholder="Write Here!!!"
              onChange={(event) => setText(event.target.value)}
            />
            <button className="bg-primary w-3/12 py-2 px-5 rounded-md text-white">
              Add
            </button>
          </form>
        )}
      </div>
      {todos?.length > 0 ? (
        <div className="md:w-6/12 w-10/12 mx-auto mt-5 bg-white py-5 px-5 rounded-md">
          {todos.map((todo, index) => {
            return (
              <>
                <li
                  key={todo.id}
                  className="list-none border-b-2 py-3 flex justify-between items-center mb-3"
                >
                  <p>{todo.text}</p>
                  <div className="space-x-2">
                    <button onClick={() => updateTodoById(todo.id)}>
                      <svg
                        className="inline-block"
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="28" height="28" rx="5" fill="#0A87FE" />
                        <path
                          d="M6.85366 23C6.3439 23 5.90737 22.8186 5.54405 22.4557C5.18135 22.0934 5 21.6577 5 21.1486V8.18879C5 7.67966 5.18135 7.24365 5.54405 6.88078C5.90737 6.51852 6.3439 6.33739 6.85366 6.33739H15.1256L13.272 8.18879H6.85366V21.1486H19.8293V14.715L21.6829 12.8636V21.1486C21.6829 21.6577 21.5016 22.0934 21.1389 22.4557C20.7756 22.8186 20.339 23 19.8293 23H6.85366ZM17.211 6.86967L18.5317 8.16565L12.4146 14.2753V15.5944H13.7122L19.8524 9.46163L21.1732 10.7576L15.0329 16.8904C14.863 17.0601 14.6662 17.1952 14.4425 17.2958C14.2182 17.3958 13.9825 17.4458 13.7354 17.4458H11.4878C11.2252 17.4458 11.0052 17.3572 10.8279 17.1801C10.65 17.0024 10.561 16.7824 10.561 16.5201V14.2753C10.561 14.0284 10.6073 13.793 10.7 13.569C10.7927 13.3456 10.924 13.149 11.0939 12.9793L17.211 6.86967ZM21.1732 10.7576L17.211 6.86967L19.528 4.55542C19.8988 4.18514 20.343 4 20.8608 4C21.378 4 21.8142 4.18514 22.1695 4.55542L23.4671 5.87454C23.8224 6.22939 24 6.66139 24 7.17052C24 7.67966 23.8224 8.11165 23.4671 8.4665L21.1732 10.7576Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                    <button onClick={() => deleteTodoById(todo.id)}>
                      <svg
                        className="inline-block cursor-pointer"
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="28" height="28" rx="5" fill="#FA3B3B" />
                        <path
                          d="M9 23C8.45 23 7.97933 22.8043 7.588 22.413C7.196 22.021 7 21.55 7 21V8H6V6H11V5H17V6H22V8H21V21C21 21.55 20.8043 22.021 20.413 22.413C20.021 22.8043 19.55 23 19 23H9ZM11 19H13V10H11V19ZM15 19H17V10H15V19Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              </>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;

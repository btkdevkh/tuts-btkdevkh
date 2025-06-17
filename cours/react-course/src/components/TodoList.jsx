import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import styles from "../assets/styles/TodoList.module.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const handleDeleteTodo = (id) =>
    setTodos((prevs) => prevs.filter((todo) => todo.id !== id));

  useEffect(() => {
    const API_URL = `https://jsonplaceholder.typicode.com/todos`;

    const fetchTodo = async () => {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (data && data.length > 0) {
        const slicedData = data.slice(0, 5);
        setTodos(slicedData);
      } else {
        setTodos([]);
      }
    };

    fetchTodo();
  }, []);

  return (
    <>
      <div>
        {todos && todos.length > 0 ? (
          todos.map((todo) => (
            <TodoItem key={todo.id}>
              <div className={styles.todoList}>
                <p>{todo.title}</p>

                <span
                  className={styles.deleteBtn}
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  X
                </span>
              </div>
            </TodoItem>
          ))
        ) : (
          <p>Aucun Todo à afficher</p>
        )}
      </div>
    </>
  );
};

export default TodoList;

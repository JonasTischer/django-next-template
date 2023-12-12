"use client";

import { useState } from 'react';
import {
  useRetrieveToDosQuery,
  useCreateToDoMutation,
} from '@/redux/todos/todosApiSlice';
import TodoList from './_components/todo-list';
import { Button } from '@/components/ui/button';

const TodosPage = () => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const { data: todos, refetch } = useRetrieveToDosQuery();
  const [createToDo] = useCreateToDoMutation();

  const handleAddTodo = async () => {
    if (!newTodoTitle.trim()) return;
    await createToDo({ title: newTodoTitle, completed: false });
    setNewTodoTitle('');
    refetch();
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value)}
        placeholder="Add a new todo..."
      />
      <Button
        onClick={handleAddTodo}
        className="flex items-center space-x-1"
      >
        <PlusIcon className="h-4 w-4" />
        <span>Add Todo</span>
      </Button>
      <ul>
        <TodoList data={todos} />
      </ul>
    </div>
  );
};

export default TodosPage;


function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
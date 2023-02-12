import React, {FunctionComponent, useMemo, useReducer} from "react";
import  prefilledTodos from "../../data/todos.json";
import {Todo} from "../../types/todo";
import TodoListItem from "./item";
import TodosReducer from "../../reducers/todos.reducer";
import TextInput from "./input";
import Button from "./button";
import clsx from "clsx";



const TodosList:FunctionComponent= () => {
    const [todos, dispatch] = useReducer(TodosReducer, prefilledTodos);
    const [newTodo, setNewTodo] = React.useState<string>("");


    const sortedTodos = useMemo(() => todos.sort((a, b) => {
        if (a.completed === b.completed) {
            return a.createdAt < b.createdAt ? 1 : -1;
        }
        return a.completed ? 1 : -1;
    }),[todos])

    const addTodo = () => {
        const newTodoItem:Todo = {
            id: todos.length + 1,
            text: newTodo,
            completed: false,
            createdAt: new Date().toISOString()
        }
        dispatch({type: "ADD", payload: newTodoItem});
        setNewTodo("");
    }
    
    return (
        <div className={'w-screen h-screen flex flex-row justify-center items-center bg-violet-100'}>
            <div className={'flex flex-col gap-4'} >
            <h1 className={'text-lg font-bold text-center uppercase bg-violet-300 w-full p-4 shadow-md text-white'}>TODO List</h1>
            <ul data-testid={'todo-list'} className={'bg-white p-8 shadow-md text-left flex flex-col gap-4'}>
                {sortedTodos.map((todo:Todo) => {
                    return <TodoListItem  className={clsx(todo.completed ? 'line-through' : 'no-underline') } key={todo.id} todo={todo} toggleStatus={() => dispatch({type: "CHANGE_STATUS", payload: todo})} />
                })}
            </ul>
                <div className={'flex flex-row w-full gap-4'}>
                    <TextInput value={newTodo} placeholder={'Text your next todo'} className={'w-full p-2'} onChange={(value) => setNewTodo(value)} testId={'newTodo'} />
                    <Button label={'+'}  onClick={addTodo} disabled={!newTodo} testId={'addTodo'} className={'disabled:bg-violet-300 bg-violet-500 text-white px-4 py-2 font-bold'} />
                </div>

        </div>
        </div>

    );
};


export default TodosList;

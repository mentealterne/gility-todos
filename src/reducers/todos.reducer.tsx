import {Todo} from "../types/todo";
import {useReducer} from "react";

type TodosAction = {type:'ADD' | 'CHANGE_STATUS', payload:Todo}


const TodosReducer = (state: Todo[], action: TodosAction) => {
    switch (action.type) {
        case "ADD":
        return [...state, action.payload];
        case "CHANGE_STATUS":
        return state.map(todo => {
if (todo.id === action.payload.id) {
                return {...todo, completed: !todo.completed}
            }
            return todo;

        })
        default:
        return state;
    }
}

export default TodosReducer;

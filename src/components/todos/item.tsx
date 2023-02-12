import {FunctionComponent} from "react";
import {Todo} from "../../types/todo";
import {format} from "date-fns";
import clsx from "clsx";
interface IProps {
    todo: Todo;
    toggleStatus: () => void;
    className?: string;
}
const TodoListItem:FunctionComponent<IProps> = ({ todo, toggleStatus, className }) => {
    const { id, text } = todo;
    return (
        <li onClick={toggleStatus} className={'text-sm p-2 flex flex-row gap-4 justify-between hover:bg-violet-200 cursor-pointer'} >
            <span className={clsx('flex flex-row gap-4', className)}>
                <input type={'radio'} id={`todo-${id}`} name={`todo-${id}`} checked={todo.completed}/>
                {text}</span>
            <span> {format(new Date(todo.createdAt), 'dd/MM/yyyy')}</span>

        </li>
    );
};

export default TodoListItem;

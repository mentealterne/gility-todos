import TodosList from "./index";
import {render, screen, fireEvent, act} from "@testing-library/react";
import  prefilledTodos from "../../data/todos.json";
import TodoListItem from "./item";
import {Todo} from "../../types/todo";



describe('TodosList actions', () => {
    it('should render the TODO list component with a set of prefilled TODOs', () => {
        render(<TodosList/>);
        const todoList = screen.getByTestId("todo-list");
        expect(todoList).toBeInTheDocument();
        expect(todoList.children.length).toBe(prefilledTodos.length);
    })



    it('Renders the TODO list component with an input with id="newTodo" and a button with id "addTodo"', () => {
        render(<TodosList/>);

        const todoListHeading = screen.getByText(/TODO List/i);
        const input = screen.getByTestId("newTodo");
        const button = screen.getByTestId("addTodo");


        expect(todoListHeading).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    })

    it('when the user types in the input and clicks the button, the input value is added to the list displaying a pending status and the input is cleared', () => {

        render(<TodosList/>);

        const input = screen.getByTestId("newTodo");
        const button = screen.getByTestId("addTodo");

        fireEvent.change(input, {target: {value: "Buy milk"}});
        expect(screen.getByDisplayValue("Buy milk")).toBeInTheDocument();

        fireEvent.click(button);

        expect(screen.getByDisplayValue("")).toBeInTheDocument();

        // get by text that only contains the text
        const todoItem = screen.getByText(/Buy milk/i);

        expect(todoItem).toHaveClass("no-underline");
    })

    it('if the newTodo input is empty, the button is disabled', () => {

        render(<TodosList/>);

        const input = screen.getByTestId("newTodo");
        const button = screen.getByTestId("addTodo");

        expect(button).toBeDisabled();
    });

    it('if the newTodo input is not empty, the button is enabled', () => {

        render(<TodosList/>);

        const input = screen.getByTestId("newTodo");
        const button = screen.getByTestId("addTodo");

        fireEvent.change(input, {target: {value: "Buy milk"}});
        expect(button).not.toBeDisabled();

    })

    it('when the user clicks on a pending list item, the status changes to completed and a callback function is invoked', () => {

        const todo: Todo = {
            id: 1,
            text: "Buy milk",
            completed: false,
            createdAt: new Date().toISOString()
        }

        const toggleStatus = () => {
            todo.completed = !todo.completed;
        }

        const { getByText, rerender } = render(<TodoListItem todo={todo} toggleStatus={toggleStatus} className={todo.completed ? 'line-through' : 'no-underline'} />);
        const todoItem = getByText(/Buy milk/i);


        expect(todoItem).toBeInTheDocument();
        expect(todoItem).toHaveClass("no-underline",{exact: false});

        fireEvent.click(todoItem);

        expect(todo.completed).toBe(true)

        rerender(<TodoListItem todo={todo} toggleStatus={toggleStatus} className={todo.completed ? 'line-through' : 'no-underline'} />)
        expect(todoItem).toHaveClass("line-through", {exact: false});
    });


    it('when the user clicks on a completed list item, the status changes to pending', () => {
        const todo: Todo = {
            id: 1,
            text: "Buy milk",
            completed: true,
            createdAt: new Date().toISOString()
        }

        const toggleStatus = () => {
            todo.completed = !todo.completed;
        }

        const { getByText, rerender } = render(<TodoListItem todo={todo} toggleStatus={toggleStatus} className={todo.completed ? 'line-through' : 'no-underline'} />);
        const todoItem = getByText(/Buy milk/i);


        expect(todoItem).toBeInTheDocument();
        expect(todoItem).toHaveClass("line-through");

        fireEvent.click(todoItem);

        expect(todo.completed).toBe(false)

        rerender(<TodoListItem todo={todo} toggleStatus={toggleStatus} className={todo.completed ? 'line-through' : 'no-underline'} />)
        expect(todo.completed).toBe(false);
        expect(todoItem).toHaveClass("no-underline");
    })


})





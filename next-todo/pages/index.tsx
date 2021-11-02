import { NextPage } from "next";
import TodoList from "../components/TodoList";
import { TodoType } from "../types/todo";

const todos: TodoType[] = [
	{ id: 1, text: "리액트 공부하기", color: "red", checked: false },
	{ id: 2, text: "JavaScript study", color: "orange", checked: false },
	{ id: 3, text: "42 seoul 과제", color: "yellow", checked: false },
	{ id: 4, text: "헬스", color: "blue", checked: false },
	{ id: 5, text: "밥 챙겨먹기", color: "green", checked: false },
	{ id: 6, text: "데이투", color: "navy", checked: false },
];

const app: NextPage = () => {
	return <TodoList todos={todos} />;
};

export default app;

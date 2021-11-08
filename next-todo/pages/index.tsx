import { NextPage } from "next";
import TodoList from "../components/TodoList";
import { getTodosAPI } from "../lib/api/todo";
import { wrapper } from "../store";
import { todoActions } from "../store/todo";

const app: NextPage = () => {
	return <TodoList />;
};

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async () => {
		try {
			const { data } = await getTodosAPI();
			store.dispatch(todoActions.setTodo(data));
			return { props: {} };
		} catch (e) {
			console.log(e);
			return { props: {} };
		}
	}
);

export default app;

import Head from "next/head";
import Navbar from "../components/Navbar";
import Todo from "../components/Todo";
import TodoForm from "../components/TodoForm";
import { table, minifyRecords } from "./api/utils/Airtable";
import { TodosContext } from "../contexts/TodosContext";
import { useEffect, useState, useContext } from "react";
import auth0 from "./api/utils/auth0";
import Microphone from "../components/Microphone/Microphone";

export default function Home({ initialTodos, user }) {
  const [isMounted, setIsMounted] = useState(false);
  const { todos, setTodos } = useContext(TodosContext);

  useEffect(() => {
    setIsMounted(true);
    setTodos(initialTodos);
  }, []);

  return (
    <>
      <Head>
        <title>Ponpon - Todo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar user={user} />
      <main className="container mx-auto px-4">
        {user ? (
          <>
            <h1 className="text-2xl text-center mb-4">My Todos</h1>
            <TodoForm />
            <Microphone />
            <ul>
              {todos && todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
            </ul>
          </>
        ) : (
          <p>You should log in</p>
        )}
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  let todos = [];
  const session = await auth0.getSession(context.req);
  try {
    if (session?.user) {
      todos = await table
        .select({
          filterByFormula: `userId = '${session.user.sub}'`,
        })
        .firstPage();
    }
    return {
      props: {
        initialTodos: minifyRecords(todos),
        user: session?.user || null,
      },
    };
  } catch (error) {
    return {
      props: {
        err: "Something went wrong",
      },
    };
  }
}

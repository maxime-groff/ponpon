import Head from 'next/head'
import Navbar from '../components/Navbar'
import Todo from '../components/Todo'
import TodoForm from '../components/TodoForm'
import { table, minifyRecords } from './api/utils/Airtable'
import { TodosContext } from '../contexts/TodosContext'
import { useEffect, useContext } from 'react'
import auth0 from './api/utils/auth0'

export default function Home({ initialTodos, user }) {
  const { todos, setTodos } = useContext(TodosContext)
  useEffect(() => {
    setTodos(initialTodos)
  }, [])

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar user={user} />
      <main>
        {user ? (
          <>
            <h1 className="text-2xl text-center mb-4">My Todos</h1>
            <TodoForm />
            <ul>
              {todos && todos.map((todo) => (
                <Todo key={todo.id} todo={todo} />
              ))}
            </ul>
          </>
        )
        : (
          <p>You should log in</p>
        )
      }
      </main>
    </>
  )
}

export async function getServerSideProps(context) {
  let todos = []
  const session = await auth0.getSession(context.req)
  try {
    if (session?.user) {
      todos = await table.select({
        filterByFormula: `userId = '${session.user.sub}'`
      }).firstPage();
    }
    return {
      props: {
        initialTodos: minifyRecords(todos),
        user: session?.user || null,
      }
    }
  } catch (error) {
    return {
      props: {
        err: "Something went wrong"
      }
    }
  }
}
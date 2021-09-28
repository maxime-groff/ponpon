import '../styles/index.css'
import '../styles/main.scss'
import 'regenerator-runtime/runtime'
import { TodosProvider } from '../contexts/TodosContext'
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  return (
    <TodosProvider>
      <ThemeProvider attribute="class">
        <div className="container mx-auto my-6 max-w-xl">
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </TodosProvider>
  )
}

export default MyApp

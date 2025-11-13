import { RouterProvider } from 'react-router-dom'
import MyRoutes from './Routes/Routes'
import MediaQueries from './Context/MediaQueries'
import DarkModeContext from './Context/DarkModeContext'
import AuthContext from './Context/AuthContext'

const App = () => {
  return (
    <>
      <AuthContext>
        <MediaQueries>
            <DarkModeContext>
                <RouterProvider router={MyRoutes}>
                </RouterProvider>
            </DarkModeContext>
        </MediaQueries>
      </AuthContext>
    </>
  )
}

export default App
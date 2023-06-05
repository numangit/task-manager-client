import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './routes/Index';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </>
  )
}

export default App

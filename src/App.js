import React from 'react'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from './components/Form'
const App = () => {
  return (
    <div>
      <ToastContainer autoClose={2000}/>
      <Form/>
    </div>
  )
}

export default App


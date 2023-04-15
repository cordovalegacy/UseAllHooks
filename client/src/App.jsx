import { useState, createContext, useRef, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Form from './components/Form'
import Nav from './components/Nav'
import DisplayAll from './components/DisplayAll'
import DisplayOne from './components/DisplayOne'
import './App.css'
export const MyContext = createContext()

function App() {

  const [formData, setFormData] = useState([])

  // *****************************FEED TO USEREDUCER FUNCTION PARAMETERS**********************************
  const initialFormState = { //HOLDS EACH INPUT FIELD AS A NESTED OBJECT
    firstName: { //HOLDS BOTH VALUE AND ERROR KEYS AND VALUES
      value: "",
      error: ""
    },
    lastName: { //HOLDS BOTH VALUE AND ERROR KEYS AND VALUES
      value: "",
      error: ""
    },
    email: { //HOLDS BOTH VALUE AND ERROR KEYS AND VALUES
      value: "",
      error: ""
    }
  }

  // *****************************FEED TO USEREDUCER FUNCTION PARAMETERS**********************************
  // An action is JUST A JAVASCRIPT OBJECT {}, or set of key value pairs, with 2 distinct keys
  // let action = {type: "SET_EMAIL", payload: "someone@gmail.com"}

  const reducer = (state, action) => { //HOLDS CURRENT STATE, AND ACTION OBJECT
    switch (action.type) { //ACTION OBJECT HOLDS TWO PROPERTIES: TYPE & PAYLOAD
      case "SET_FIRST_NAME": //TYPE
        return { //PAYLOAD
          ...state,
          firstName: {
            ...state.firstName,
            value: action.payload
          }
        }
      case "SET_LAST_NAME": //TYPE
        return { //PAYLOAD
          ...state,
          lastName: {
            ...state.lastName,
            value: action.payload
          }
        }
      case "SET_EMAIL": //TYPE
        return { //PAYLOAD
          ...state,
          email: {
            ...state.email,
            value: action.payload
          }
        }
      case "SET_FIRST_NAME_ERROR": //TYPE
        return { //PAYLOAD
          ...state,
          firstName: {
            ...state.firstName,
            error: action.payload
          }
        }
      case "SET_LAST_NAME_ERROR": //TYPE
        return { //PAYLOAD
          ...state,
          lastName: {
            ...state.lastName,
            error: action.payload
          }
        }
      case "SET_EMAIL_ERROR": //TYPE
        return { //PAYLOAD
          ...state,
          email: {
            ...state.email,
            error: action.payload
          }
        }
      default: //TYPE
        return state //PAYLOAD
    }
  }

  
  const [counter, setCounter] = useState(0)
  const counterRef = useRef(0)
  const timer = useRef()

  useEffect(() => {
    timer.current = setInterval(() => {
      counterRef.current += 1
      setCounter(counterRef.current)
    }, 1000)
    return () => clearInterval(timer.current) //this is a clean up function
  }, [])

  // **********************************************JSX*******************************************

  return (
    <BrowserRouter>
      <MyContext.Provider value={{
        formData,
        setFormData,
        initialFormState,
        reducer
      }}>
        <div className="App">
          <Nav>
            <p ref={timer}>{counter}</p>
          </Nav>
          <Routes>
            <Route path='/' element={<Form />} />
            <Route path='/displayAll' element={<DisplayAll />} />
            <Route path='/displayOne/:user' element={<DisplayOne />} />
          </Routes>
        </div>
      </MyContext.Provider>
    </BrowserRouter>
  )
}

export default App

import { useContext, useReducer } from "react"
import { MyContext } from '../App'
import { useNavigate } from "react-router-dom"

const Form = () => {

    const { formData, setFormData, initialFormState, reducer } = useContext(MyContext)
    const navigate = useNavigate()


    // *****************************************USEREDUCER HOOK*********************************************

    const [state, dispatch] = useReducer(reducer, initialFormState) //USEREDUCER HOOK (MUST BE BELOW REDUCER AND INITAL STATE)

    // *****************************CHANGE HANDLER FUNCTION (FIELD: VALUES & ERRORS)************************
    const changeHandler = (e) => { //UPDATES STATE DEPENDENT ON E.TARGET.NAME AND E.TARGET.VALUE
        console.log(e)
        //IF CONDITION IS TRUE, IT WILL RUN *TUNNEL ONE* (ERROR HANDLER)
        //IF CONDITION IS NOT TRUE IT WILL RUN *TUNNEL TWO* (VALUE HANDLER)
        if (e.target.value.length < 3) { //NAME AITTRIBUTE ON INPUT FIELDS
            // TUNNEL ONE (ERROR HANDLER)
            if (e.target.name === "firstName") { //SETTING FIRSTNAME ERRORS
                dispatch({ //SETTER (USES ACTION OBJECT FROM REDUCER FUNCTION: TYPE, PAYLOAD)
                    type: "SET_FIRST_NAME_ERROR",
                    payload: "First Name Must Be At Least 3 Characters"
                })
            }
            else if (e.target.name === "lastName") { //SETTING LASTNAME ERRORS
                dispatch({ //SETTER (USES ACTION OBJECT FROM REDUCER FUNCTION: TYPE, PAYLOAD)
                    type: "SET_LAST_NAME_ERROR",
                    payload: "Last Name Must Be At Least 3 Characters"
                })
            }
            else if (e.target.name === "email") { //SETTING EMAIL ERRORS
                dispatch({ //SETTER (USES ACTION OBJECT FROM REDUCER FUNCTION: TYPE, PAYLOAD)
                    type: "SET_EMAIL_ERROR",
                    payload: "Email Address Must Be Valid"
                })
            }
        }
        // TUNNEL TWO (VALUE HANDLER)
        else {
            if (e.target.name === "firstName") { //SETTING FIRSTNAME VALUES AND CLEARING ERRORS
                dispatch({ //SETTER (USES ACTION OBJECT FROM REDUCER FUNCTION: TYPE, PAYLOAD)
                    type: "SET_FIRST_NAME",
                    payload: e.target.value
                })
                dispatch({ //SETTER (USES ACTION OBJECT FROM REDUCER FUNCTION: TYPE, PAYLOAD)
                    type: "SET_FIRST_NAME_ERROR",
                    payload: ""
                })
            }
            if (e.target.name === "lastName") { //SETTING FIRSTNAME VALUES AND CLEARING ERRORS
                dispatch({ //SETTER (USES ACTION OBJECT FROM REDUCER FUNCTION: TYPE, PAYLOAD)
                    type: "SET_LAST_NAME",
                    payload: e.target.value
                })
                dispatch({ //SETTER (USES ACTION OBJECT FROM REDUCER FUNCTION: TYPE, PAYLOAD)
                    type: "SET_LAST_NAME_ERROR",
                    payload: ""
                })
            }
            if (e.target.name === "email") { //SETTING FIRSTNAME VALUES AND CLEARING ERRORS
                dispatch({ //SETTER (USES ACTION OBJECT FROM REDUCER FUNCTION: TYPE, PAYLOAD)
                    type: "SET_EMAIL",
                    payload: e.target.value
                })
                dispatch({ //SETTER (USES ACTION OBJECT FROM REDUCER FUNCTION: TYPE, PAYLOAD)
                    type: "SET_EMAIL_ERROR",
                    payload: ""
                })
            }
        }
    }

    // *****************************SUBMIT HANDLER FUNCTION**************************************

    const submitHandler = (e) => {
        e.preventDefault()
            try{
                setFormData([...formData, state])
                dispatch({
                    type: "SET_FIRST_NAME",
                    payload: ""
                })
                dispatch({
                    type: "SET_LAST_NAME",
                    payload: ""
                })
                dispatch({
                    type: "SET_EMAIL",
                    payload: ""
                })
                navigate('/displayAll')
            }
            catch{
                console.log("You have something wrong with your data")
            }
    }

    return (
        <>
            <h2>All Hooks | Form</h2>
            <form onSubmit={submitHandler}>
                {/* DISPLAY CURRENT FORM STATE VALUE */}
                <h3>{JSON.stringify(state.firstName)}</h3>
                <h3>{JSON.stringify(state.lastName)}</h3>
                <h3>{JSON.stringify(state.email)}</h3>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        onChange={(e) => changeHandler(e)}
                    />
                    {state.firstName.error !== "" ? <p>{state.firstName.error}</p> : null}
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        onChange={(e) => changeHandler(e)}
                    />
                    {state.lastName.error !== "" ? <p>{state.lastName.error}</p> : null}
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        onChange={(e) => changeHandler(e)}
                    />
                    {state.email.error !== "" ? <p>{state.email.error}</p> : null}
                </div>
                <input type="submit" value="Submit" />
            </form>
        </>
    )

}

export default Form
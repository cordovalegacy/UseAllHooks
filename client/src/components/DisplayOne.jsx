import { Link, useParams, useNavigate } from "react-router-dom"
import { MyContext } from "../App"
import { useContext } from "react"

const DisplayOne = () => {

    const { user } = useParams()
    console.log(user)
    const { formData, setFormData } = useContext(MyContext)
    const navigate = useNavigate()

    const deleteHandler = (thisSingleUser) => {
        const newFormData = formData.filter((allOtherUsers) => allOtherUsers.firstName.value !== thisSingleUser)
        setFormData(newFormData)
        navigate('/displayAll')
    }

    return(
        <div className="user-card">
            <h2>{user}</h2>
            <div>
                <button className="button-like"><Link to={'/displayAll'}>Back</Link></button>
                <button className="button-delete" onClick={() => deleteHandler(user)}>Delete</button>
            </div>
        </div>
    )

}

export default DisplayOne
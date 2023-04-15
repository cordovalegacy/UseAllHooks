import { MyContext } from "../App"
import { useContext, useRef } from "react"
import { useNavigate } from "react-router-dom"

const DisplayAll = () => {

    const { formData, setFormData } = useContext(MyContext)
    const likeCount = useRef(0)
    const likeDisplay = useRef()

    const navigate = useNavigate()

    const likeHandler = () => {
        likeCount.current += 1
        likeDisplay.current.textContent = `Likes: ${likeCount.current}`
    }

    const deleteHandler = (userDataFromMap) => {
        setFormData(formData.filter((allOtherUsers) => allOtherUsers !== userDataFromMap))
    }

    return (
        <div>
            <h2>All Hooks | Display</h2>
            <p ref={likeDisplay}>Likes: {likeCount.current}</p>
            <div>
                {formData.map((userData, idx) => (
                    <div className="user-card" key={idx}>
                        <h2>{userData?.firstName?.value} {userData?.lastName?.value}</h2>
                        <h4>{userData?.email?.value}</h4>
                        <div>
                            <button className="button-like" onClick={likeHandler}>Like</button>
                            <button className="button-edit" onClick={() => navigate(`/displayOne/${userData.firstName.value}`)}>Edit</button>
                            <button className="button-delete" onClick={() => deleteHandler(userData)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default DisplayAll
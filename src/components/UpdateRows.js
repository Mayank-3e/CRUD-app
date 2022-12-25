import React, { useContext, useRef, useState } from 'react'
import Context from '../context/context'

const UpdateRows = () => {
    const {data,btnref,setData,setLoading,showAlert}=useContext(Context)
    const [form, setForm] = useState({name: "", phn: "", hobby:""})
    const onChange = e => { setForm({ ...form, [e.target.name]: e.target.value }) }
    const closeref=useRef()
    const handleClick=async(e)=>
    {
        e.preventDefault()
        const editID=localStorage.getItem('editID')
        const url = process.env.REACT_APP_API || "http://localhost:5000"
        setLoading()
        let response = await fetch(url + `/api/info/update/${data[editID]._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        })
        response = await response.json()
        setLoading('none')
        if (response.error) showAlert(response.error,'danger')
        else
        {
            data[editID].name=form.name
            data[editID].phn=form.phn
            data[editID].hobby=form.hobby
            setData(JSON.parse(JSON.stringify(data)))
        }
        closeref.current.click()
    }

    return (
        <div>
            <button ref={btnref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#updateModal" style={{display: 'none'}} onClick={()=>
            {
                const editID=localStorage.getItem('editID')
                setForm({name: data[editID].name, phn: data[editID].phn, email: data[editID].email, hobby:data[editID].hobby})
            }}></button>

            <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update details</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form className='my-3' onSubmit={handleClick}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" name='name' aria-describedby="emailHelp" required onChange={onChange} value={form.name} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phn" className="form-label">Phone no.</label>
                                    <input type="text" className="form-control" name='phn' aria-describedby="emailHelp" required onChange={onChange} value={form.phn} pattern="[+][0-9]{2}[6-9]{1}[0-9]{9}" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="hobby" className="form-label">Hobbies</label>
                                    <input type="text" className="form-control" name='hobby' aria-describedby="emailHelp" required onChange={onChange} value={form.hobby} />
                                </div>
                                <button type="submit" className="btn btn-primary">Save changes</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeref}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateRows
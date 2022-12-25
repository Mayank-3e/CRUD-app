import React, { useContext, useRef, useState } from 'react'
import Context from '../context/context'

const AddRows = () => {
    const { data, setData,showAlert,setLoading } = useContext(Context)
    const [form, setForm] = useState({ name: "", phn: "", email: "", hobby: "" })
    const onChange = e => { setForm({ ...form, [e.target.name]: e.target.value }) }
    const closeref=useRef()
    const addForm = async (e) =>
    {
        e.preventDefault()
        e.target.disabled=true
        const url = process.env.REACT_APP_API || "http://localhost:5000"
        setLoading()
        let response = await fetch(url + "/api/info/adduser", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        })
        response = await response.json()
        setLoading('none')
        if (response.errors) showAlert(response.errors[0].msg,'danger')
        else if (response.error) showAlert(response.error,'danger')
        else setData(data.concat(response))
        closeref.current.click()
        e.target.disabled=false
    }

    return (
        <div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">+ Add rows</button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Fill the form</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3' onSubmit={addForm}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" name='name' aria-describedby="emailHelp" required onChange={onChange} value={form.name} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phnno" className="form-label">Phone no.</label>
                                    <input type="text" className="form-control" name='phn' aria-describedby="emailHelp" required onChange={onChange} value={form.phn} pattern="[+][0-9]{2}[6-9]{1}[0-9]{9}" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" name='email' aria-describedby="emailHelp" required onChange={onChange} value={form.email} />
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

export default AddRows

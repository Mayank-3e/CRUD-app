import React, { useContext, useEffect, useState } from 'react'
import Context from '../context/context'

const Table = () => {
    const {data, setData,btnref,setLoading,showAlert,cntSelected,setCntSelected,checksArr,setChecksArr} = useContext(Context)

    useEffect(()=>
    {
        setChecksArr(Array(data.length).fill(0))
    },[data])

    const delData = async (id) =>
    {
        const url = process.env.REACT_APP_API || "http://localhost:5000"
        setLoading()
        let response = await fetch(url + `/api/info/deleteuser/${data[id]._id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
        response = await response.json()
        setLoading('none')
        if (response.error) showAlert(response.error,'danger')
        else
        {
            data.splice(id, 1)
            setData(JSON.parse(JSON.stringify(data)))
        }
    }
    const updateData=(id)=>
    {
        localStorage.setItem('editID',id)
        btnref.current.click()
    }
    const handleSelect=(id)=>
    {
        if(checksArr[id]) setCntSelected(cntSelected-1)
        else setCntSelected(cntSelected+1)
        checksArr[id]=1-checksArr[id]
    }

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Select</th>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Email</th>
                        <th scope="col">Hobbies</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((e, id) => {
                        // setChecksArr(checksArr.concat([0]))
                        return <tr key={id}>
                            <th scope="row">
                                <input type='checkbox' onClick={()=>{handleSelect(id)}} />
                            </th>
                            <td>{1 + id}</td>
                            <td>{e.name}</td>
                            <td>{e.phn}</td>
                            <td>{e.email}</td>
                            <td>{e.hobby}</td>
                            <td>
                                <button className='btn btn-primary' onClick={()=>{updateData(id)}}>Update</button>
                            </td>
                            <td>
                                <button className='btn btn-primary' onClick={()=>{delData(id)}}>Delete</button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Table
import React, { useContext, useEffect } from "react";
import AddRows from "./components/AddRows";
import Alert from "./components/Alert";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import Table from "./components/Table";
import UpdateRows from "./components/UpdateRows";
import Context from "./context/context";

function App() {
  const { data,setData,cntSelected,setLoading,checksArr,showAlert } = useContext(Context)

  useEffect(()=>
  {
    const getdata=async()=>
    {
      setLoading()
      const url=process.env.REACT_APP_API||"http://localhost:5000"
      let response=await fetch(url+"/api/info/fetchall",{
        method: 'GET',
        headers: {'Content-Type':'application/json'}
      })
      response=await response.json()
      setLoading("none")
      setData(response)
    }
    getdata()
  },[])

  const sendEmail=async(e)=>
  {
    e.target.disabled=true
    let sendData=[];
    checksArr.forEach((e,i) => {
      if(e) sendData.push(data[i])
    });
    const url = process.env.REACT_APP_API || "http://localhost:5000"
    setLoading()
    let response = await fetch(url + '/api/info/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sendData)
    })
    response = await response.json()
    setLoading('none')
    if (response.error)
    {
      if(response.error.response) showAlert(response.error.response,'danger')
      else if(response.error.code) showAlert(response.error.code,'danger')
      else showAlert(response.error,'danger')
    }
    else showAlert("Email sent!",'success')
    e.target.disabled=false
  }
  
  return (
    <div>
      <Navbar/>
      <Alert/>
      <Loading/>
      <UpdateRows/>
      <Table/>
      <AddRows/>
      <button className="my-3 btn btn-primary" disabled={!cntSelected} onClick={sendEmail}>Send Email</button>
    </div>
  );
}

export default App;

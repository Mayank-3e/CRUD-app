import React, { createRef, useState } from 'react'
import Context from './context'

const FormState = (props) => {
  const [data,setData]=useState([])
  const btnref=createRef()
  const [alert, setAlert] = useState();
  const [loading, setLoading] = useState('none');
  const showAlert = (message, type) =>
  {
    setAlert({
        msg: message,
        type: type
    });
    setTimeout(() => {setAlert(null)}, 2000);
  }
  const [cntSelected,setCntSelected]=useState(0)
  const [checksArr,setChecksArr]=useState([])

  return (
    <Context.Provider value={{data,setData,btnref,alert,showAlert,loading,setLoading,cntSelected,setCntSelected,checksArr,setChecksArr}}>
      {props.children}
    </Context.Provider>
  )
}

export default FormState

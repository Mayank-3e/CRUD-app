import React, { useContext } from 'react'
import Context from '../context/context'

const Loading = () => {
    const {loading}=useContext(Context)

  return (
      <div id="loading" className="alert alert-warning" style={{display: loading}}>Loading...</div>
  )
}

export default Loading

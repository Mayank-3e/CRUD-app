import React, { useContext } from 'react'
import Context from '../context/context';

function Alert() {
    const {alert}=useContext(Context)

    const capitalize=(word)=>{
        const lower=word.toLowerCase();
        return lower[0].toUpperCase()+lower.slice(1);
    }
    return (
        alert &&
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
            <strong>{alert.type==="success"?"Success":"Failed"}</strong>: {alert.msg}
        </div>
    )
}

export default Alert
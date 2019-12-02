import React from 'react';
import './Error.css';

const Error = (props) => {
    return (
        <div className='Error'>
            <div>{ props.message }</div>
        </div>
    );
}

export default Error;

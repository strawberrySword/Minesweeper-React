import React from 'react'
import { useState, useEffect } from 'react';

const Timer = () => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        setTimeout(() => setSeconds(seconds+1), 1000);
    });
    return (
        <div>
            {seconds}
        </div>
    )
}

export default Timer

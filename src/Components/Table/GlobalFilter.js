import React from 'react'

function GlobalFilter({filter, setFilter}) {
    return (
        <>
        <span>
            Search Global : {""}
            <input value={filter || ""} onChange={(e) => setFilter(e.target.value)} />
        </span>
            
        </>
    )
}

export default GlobalFilter

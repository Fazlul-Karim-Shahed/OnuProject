import React from 'react'
import { useParams } from 'react-router-dom'

export default function ProductDetails() {

    let { id } = useParams()
    console.log(id);
    return (
        <div>{id}</div>
    )
}

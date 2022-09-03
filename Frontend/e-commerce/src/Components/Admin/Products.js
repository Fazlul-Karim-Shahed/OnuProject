import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllProductsApi } from '../API/ProductApi'
import { Buffer } from 'buffer'

export default function Products(props) {

  const [products, setProducts] = useState([])

  useEffect(() => {

    getAllProductsApi().then(data => {
      setProducts(data.value);
      console.log(data.value);
    })
      .catch(err => console.log(err))

  }, [])

  let product
  if (products.length === 0) product = '';
  else {
    product = products.map(item => {

      let image = item.photo[0]
      let type = image.contentType
      let buff = image.data.data
      const base64String = btoa(String.fromCharCode(...new Uint8Array(buff)));
      let src = `data:${type};base64,${base64String}`

      return (
        <div key={Math.random()} className='col-3 px-2'>
          <img src={src} width='250px' />
        </div>
      )
    })
  }


  return (
    <div>

      <Link to='/admin-panel/products/create-product'>Create new product</Link>

      <div className="row mt-4 m-0">
        {product}
      </div>

    </div>

  )
}

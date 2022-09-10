import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllProductsApi } from '../API/ProductApi'
import { Card, CardImg, CardImgOverlay, CardFooter } from 'reactstrap'
import { spinner } from '../Body/Spinner'

export default function Products(props) {

  const [products, setProducts] = useState([])
  const [spin, setSpin] = useState(false)

  useEffect(() => {

    setSpin(true)
    getAllProductsApi().then(data => {
      setProducts(data.value);
      console.log(data.value);
      setSpin(false)
    })
      .catch(err => {
        setSpin(false)
        console.log(err)
      })

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

          <Link to={`/admin-panel/products/detail/${item._id}`}>
            <Card >
              <CardImg src={src} width='100%' />
              <CardImgOverlay className='p-1'>
                <p className='bg-dark text-white d-inline-block px-1 small'>{item.name}</p>
              </CardImgOverlay>
              <CardFooter>
                <span className=' text-dark text-decoration-none'> category: {item.catalogId.name}</span>
              </CardFooter>
            </Card>
          </Link>

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
      {spin ? spinner(true) : ''}
    </div>

  )
}

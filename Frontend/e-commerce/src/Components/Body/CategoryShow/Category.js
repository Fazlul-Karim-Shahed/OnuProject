import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { Card, CardBody, CardFooter, CardImg } from 'reactstrap'
import './Category.css'


const mapStateToProps = (state) => {
  // console.log(state);
  return {
    category: state.category,
    allProducts: state.allProducts
  }
}

const Category = (props) => {

  let [category, setCategory] = useState([])
  let { id } = useParams()


  useEffect(() => {

    let arr = props.category.filter(i => i.catalogId._id === id)
    setCategory(arr)

  }, [props.category, id])

  console.log('Category: ', category);

  let categoryShow = category.map(item => {

    let id = item._id
    let photo = props.allProducts.length === 0 ? '' : props.allProducts.filter(i => id === i.categoryId._id)

    let src
    if (photo[0] != undefined) {

      let image = photo[0].photo[0]
      let type = image.contentType
      let buff = image.data.data
      const base64String = btoa(String.fromCharCode(...new Uint8Array(buff)));
      src = `data:${type};base64,${base64String}`

    }

    return (
      <div key={item._id} className='col-6 col-md-2 my-5 m-0 position-relative'>
        <Card className='categoryCard'>
          <CardImg className='categoryCardImg' src={src} />
          <div className='text-center '>
            {item.name}
            <div className="categoryCardFooter position-absolute top-0 d-flex align-items-center h-100 justify-content-center w-100">
              <div className='bg-warning p-2'>

                <Link to={`/category-products/${item._id}`} className='text-dark text-decoration-none'>View more</Link>
              </div>
            </div>
          </div>

        </Card>
      </div>
    )

  })





  return (
    <div className='container '>
      <div className="row ">
        {categoryShow}
      </div>
    </div>
  )
}



export default connect(mapStateToProps)(Category)
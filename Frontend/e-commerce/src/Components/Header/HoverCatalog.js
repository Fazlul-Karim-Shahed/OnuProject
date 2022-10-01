import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './HeaderStyles/HoverCatalog.css'


const mapStateToProps = (state) => {

    return {
        category: state.category,
        subCategory: state.subCategory
    }
}

const HoverCatalog = (props) => {


    if (props.item === null) return <div className='hoverCatalogItem bg-danger'></div>

    let category = props.category.filter(item => item.catalogId._id === props.item._id)

    let categoryShow = category.map(item => {

        let subCategory = props.subCategory.filter(i => i.categoryId._id === item._id)
        let subCategoryShow = subCategory.map(item => {

            console.log('Sub', item);
            return (
                <Link key={Math.random()} to={`/subcategory/${item._id}`} className='subCategoryLink text-dark d-block'>
                    {item.name}
                </Link>
            )
        })

        return (
            <div key={item._id} className='col-3 hoverCatalogItem'>
                <div className='fw-bold py-2 border-bottom' style={{ color: '#CC8D20' }}>{item.name}</div>
                <div to='#' className='my-2'>{subCategoryShow}</div>
            </div>
        )
    })



    return (
        <div className='row mx-0 my-0 hoverCatalogItem' >
            {categoryShow}
        </div>
    )
}




export default connect(mapStateToProps)(HoverCatalog)
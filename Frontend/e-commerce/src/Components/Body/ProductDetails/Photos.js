import React, { useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import '.././BodyStyles/Photos.css'

export default function Photos(props) {

    const [open, setOpen] = useState(false)
    const [imageSrc, setImageSrc] = useState('')


    // console.log('From photos: ', props.product);

    if (props.product === null || props.product === undefined) return <div></div>

    const toggle = (e) => {
        setOpen(!open)
        setImageSrc(e)
    }


    let photoShow = props.photos.map((item, index) => {


        return (
            <div key={Math.random()} className='col-md-4'>
                <img onClick={() => toggle(`${process.env.REACT_APP_BACKEND_URL}/product/${props.product._id}/${index}`)} className='img-fluid py-1 photoImg' src={`${process.env.REACT_APP_BACKEND_URL}/product/${props.product._id}/${index}`} alt="" />
            </div>
        )
    })


    let productPropertiesArrShow = props.productPropertiesArr.map((item) => {

        console.log('from photo', item);
        let arr = ''

        if (item.photo === undefined || item === '') return arr

        arr = item.photo.map((i, index) => {

            return (<div key={Math.random()} className='col-md-4'>
                <img onClick={() => toggle(`${process.env.REACT_APP_BACKEND_URL}/product-properties/${item._id}/${index}`)} className='img-fluid py-1 photoImg' src={`${process.env.REACT_APP_BACKEND_URL}/product-properties/${item._id}/${index}`} alt="" />
            </div>)
        })

        return arr


    })

    return (
        <div className=''>
            <div className='row m-0 photoDiv'>
                {photoShow} <br />
                {productPropertiesArrShow}
            </div>


            <Modal isOpen={open} toggle={toggle} centered>
                <ModalHeader toggle={toggle}>{props.product.name}</ModalHeader>
                <div>
                    <img src={imageSrc} className='img-fluid' width='100%' alt="" />
                </div>
            </Modal>
        </div>
    )
}

import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Fade } from 'reactstrap'

const mapStateToProps = (state) => ({})


const ProductInfo = (props) => {

    const [str, setStr] = useState('description')

    const show = str => setStr(str)

    let description = <Fade>{props.product.description}</Fade>
    let careInfo = <Fade>Care info Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat voluptate officiis obcaecati. Libero aperiam earum quae iusto, voluptatum porro maxime voluptas ea? Vitae, nobis atque! Dolorum pariatur magnam corrupti aspernatur! Debitis, voluptates vitae placeat pariatur atque consequuntur quaerat totam repudiandae aperiam quia deserunt, numquam quasi ipsam. Reprehenderit eius soluta blanditiis dolore quae iste. Earum reiciendis quos aut quam, <br /><br /> sunt neque vero aperiam quibusdam. Quod ab, tempora rerum corporis inventore necessitatibus blanditiis dolore id illum cumque officia, amet ipsam explicabo suscipit animi evenanditiis dicta, porro officiis architecto ipsum quos. Ipsum saepe e<br /><br />arum ipsa eveniet accusamus culpa quod? Doloribus culpa optio itaque quaerat unde expedita blanditiis illum consectetur quis, minus inventore vitae consequuntur totam eligendi omnis quam quos illo dolore corrupti excepturi, consequatur amet porro!</Fade>
    let warranty = <Fade>Warranty Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat voluptate officiis obcaecati. Libero aperiam earum quae iusto, voluptatum porro maxime voluptas ea? Vitae, nobis atque! Dolorum pariatur magnam corrupti aspernatur! Debitis, voluptates vitae placeat pariatur atque consequuntur quaes aperiam necessitatibus neque? Ipsum fugiat exercitationem illo, quidem sapiente nemo. Voluptatibus, labore earum fugiat velit deserunt incidunt sequi impedit dolorem itaque quaerat, nulla, excepturi rem fuga eligendi non! Veniam quia nostrum reprehenderit dolore cupiditate numquam beatae necessitatibus repellat adipisci dolor doloribus, blanditiis dicta, porro officiis architecto ipsum quos. Ipsum saepe<br /><br /> earum ipsa eveniet accusamus culpa quod? Doloribus culpa optio itaque quaerat unde expedita blanditiis illum consectetur quis, minus inventore vitae consequuntur totam eligendi omnis quam quos illo dolore corrupti excepturi, consequatur amet porro!</Fade>
    let exchange = <Fade>Exchange Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat voluptate officiis obcaecati. Libero aperiam earum quae iusto, voluptatum porro maxime voluptas ea? Vitae, nobis atque! Dolorum pariaturaceat tempora<br /><br />, exercitationem maxime suscipit beatae error enim nam doloribus praesentium excepturi, temporibus aperiam necessitatibus neque? Ipsum fugiat exercitationem illo, quidem sapiente <br /><br />nemo. Voluptatibus, labore earum fugiat velit deserunt incidunt sequi impedit dolorem itaque quaerat, nulla, excepturi rem fuga eligendi non! Veniam quia nostrum reprehenderit dolore cupiditate numquam beatae necessitatibus repellat adipisci dolor doloribus, blanditiis dicta, porro officiis architecto ipsum quos. Ipsum saepe earum ipsa eveniet accusamus culpa quod? Doloribus culpa optio itaque quaerat unde expedita blanditiis illum consectetur quis, minus inventore vitae consequuntur totam eligendi omnis quam quos illo dolore corrupti excepturi, consequatur amet porro!</Fade>

    return (
        <div>
            <div className="row py-4">
                <div className="col-md-4 small">
                    <div onClick={e => show('description')} style={{ cursor: 'pointer' }} className='py-3 border-bottom'>Description</div>
                    <div onClick={e => show('careInfo')} style={{ cursor: 'pointer' }} className='py-3 border-bottom'>Furniture Care Information</div>
                    <div onClick={e => show('warranty')} style={{ cursor: 'pointer' }} className='py-3 border-bottom'>Warranty</div>
                    <div onClick={e => show('exchange')} style={{ cursor: 'pointer' }} className='py-3 border-bottom'>Exchange & Refund</div>
                </div>
                <div className="col-md-8 p-4 py-md-2 px-md-5 small">
                    {str === 'description' ? description : ''}
                    {str === 'careInfo' ? careInfo : ''}
                    {str === 'warranty' ? warranty : ''}
                    {str === 'exchange' ? exchange : ''}
                </div>
            </div>

            
        </div>
    )
}



export default connect(mapStateToProps)(ProductInfo)
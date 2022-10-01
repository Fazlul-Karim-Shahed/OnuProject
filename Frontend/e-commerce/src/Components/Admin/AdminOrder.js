import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Badge, Toast, ToastBody, ToastHeader } from 'reactstrap'
import { getOrdersApi } from '../API/OrderApi'
import AdminOrdersModal from './AdminComponents/AdminOrder/AdminOrderModal'
// import { spinner } from '../../Body/Spinner'


const AdminOrder = (props) => {

  const [order, setOrder] = useState([])
  const [open, setOpen] = useState(false)
  const [orderDetails, setOrderDetails] = useState(null)
  const [spin, setSpin] = useState(false)

  useEffect(() => {

    getOrdersApi().then(data => setOrder(data.value))

  }, [])

  if (order.length === 0 || order === null || order === undefined) return <div className='my-5 text-center'>No order</div>

  const toggle = (e, item) => {
    setOrderDetails(item)
    setOpen(!open)
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

  }

  console.log(order);

  let orderShow = order.map(item => {

    return (
      <div className='col-md-6 my-4' key={Math.random()}>
        <Toast className='w-100'>
          <ToastHeader className='d-flex'>

            <div>
              Status: <h5 className='d-inline'>
                <Badge color={item.productStatus === 'pending' ? 'danger' : 'success'}>
                  {item.productStatus}
                </Badge>
              </h5>
            </div>

          </ToastHeader>
          <ToastBody>
            <div className="my-2"><strong className='me-2'>Order id:</strong> {item._id}</div>
            <div className="my-2"><strong className='me-2'>Billing name: </strong>{item.profile.customerName}</div>

            <div className="my-2"><strong className='me-2'>Total amount: </strong>{item.totalAmount} BDT</div>
            <div className="my-2"><strong className='me-2'>Address: </strong>{item.profile.address}</div>
            <div className="my-2"><strong className='me-2'>City: </strong>{item.profile.city}</div>
            <div className="my-2"><strong className='me-2'>Email: </strong>{item.profile.email}</div>
            <div className="my-2"><strong className='me-2'>Order date:</strong>
              {new Date().toUTCString(item.createdAt)}
            </div>
            <div className="my-2"><strong className='me-2'>Payment status: </strong>
              {item.paymentMethod === 'ssl' ? 'SSLCommerz' : 'Cash on Delivery'}
              <Badge className='ms-2' color={item.paymentStatus === 'paid' ? 'success' : 'warning'}>
                {item.paymentStatus}
              </Badge>
            </div>

            <div onClick={e => toggle(e, item)} className="btn btn-sm btn-outline-success my-3">View details</div>
          </ToastBody>
        </Toast>
      </div>
    )
  })

  return (
    <div className='container my-5'>
      <h3 className=''>Order History</h3>
      <div className="row">
        {orderShow}
      </div>

      <AdminOrdersModal orderDetails={orderDetails} open={open} toggle={toggle} />
      {/* {spin === true ? spinner(true) : spinner(false)} */}
    </div>
  )
}




export default AdminOrder
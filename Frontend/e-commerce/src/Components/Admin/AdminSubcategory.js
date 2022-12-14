import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { getCatalogApi } from '../API/CatalogApi'
import { getCategoryApi, getCategoryByCatalogApi } from '../API/CategoryApi'
import { deleteSubCategoryApi, getSubCategoryApi } from '../API/SubCategoryApi'
import { spinner } from '../Body/Spinner'
import SubCategoryCreateModal from './AdminComponents/AdminSubCategory/SubCategoryCreateModal'
import SubCategoryEditModal from './AdminComponents/AdminSubCategory/SubCategoryEditModal'

export default function AdminSubcategory(props) {

  const [spin, setSpin] = useState(false)
  const [category, setCategory] = useState([])
  const [catalog, setCatalog] = useState([])
  const [subCategory, setSubcategory] = useState([])
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState('')
  const [filter, setFilter] = useState({ catalogId: '', categoryId: '' })
  const [selectedItem, setSelectedItem] = useState(null)


  useEffect(() => {

    setSpin(true)
    getSubCategoryApi()
      .then(data => {
        setSubcategory(data.value)

        getCatalogApi()
          .then(data => {
            console.log(data.value[0]._id);
            setCatalog(data.value)
            setSpin(false)

            getCategoryByCatalogApi(data.value[0]._id)
              .then(data => setCategory([...data.value]))

          })
          .catch(err => {
            setSpin(false)
            console.log(err);
          })


      })
      .catch(err => {
        console.log(err);
        setSpin(false)

      })

  }, [1])



  const toggle = (mode, item) => {
    setOpen(!open)
    setMode(mode)
  }


  const remove = (item) => {
    setSpin(true)
    deleteSubCategoryApi(item._id)
      .then(data => {
        console.log(data);
        setSpin(false)
      })
      .catch(err => {
        console.log(err);
        setSpin(false)
      })

  }


  const edit = (item) => {
    setOpen(true)
    setMode('edit')
    setSelectedItem(item)
  }


  let showSubCategory = subCategory.map((item, index) => {
    // console.log(item);
    return (
      <tr key={Math.random()}>
        <td>{item.name}</td>
        <td>{item.categoryId.name} </td>
        <td>{item.catalogId.name}</td>
        <td><button onClick={() => edit(item)} className='btn btn-success'>Edit</button></td>
        <td><button onClick={() => remove(item)} className='btn btn-danger'>Remove</button></td>
      </tr>
    )
  })

  let catalogOptions = catalog.map(item => {
    return <option key={Math.random()} value={item._id}>{item.name}</option>
  })

  let categoryOption = category.map(item => {
    return <option key={Math.random()} value={item._id}>{item.name}</option>
  })

  const change = (e) => {

    console.log(e.target.value);
    // setSpin(true)
    if (e.target.name === 'catalogId') {
      setFilter({
        ...filter,
        catalogId: e.target.value
      })

      getCategoryByCatalogApi(e.target.value)
        .then(data => {
          console.log(data);
          if (data.error) throw data.message
          setCategory(data.value)
          setSpin(false)

        })
        .catch(err => {
          console.log(err)
          setCategory([])
        })

      axios.get(process.env.REACT_APP_BACKEND_URL + `/subcategory/filter/${e.target.value}`)
        .then(data => {
          setSubcategory(data.data.value)
          // console.log(data.data);
          setSpin(false)
        })

    }

    if (e.target.name === 'categoryId') {
      console.log(e.target.value);
      setFilter({
        ...filter,
        categoryId: e.target.value
      })
      setSpin(true)
      axios.get(process.env.REACT_APP_BACKEND_URL + `/subcategory/filter/${filter.catalogId}/${e.target.value}`, {
        catalogId: filter.catalogId,
        categoryId: e.target.value
      })
        .then(data => {
          setSubcategory(data.data.value)
          console.log(data.data);
          setSpin(false)
        })
    }

    // console.log(filter);
  }

  return (
    <div>
      <div className='d-flex justify-content-between  my-2'>
        <div className='mt-1'>
          <span className='me-3 fw-bold'>Filter by:</span>
          <label htmlFor="">Catalog: </label>
          <select className='mx-1' value={filter.catalogId} onChange={e => change(e)} name="catalogId" id="">
            {/* <option>select catalog</option> */}
            {catalogOptions}
          </select>
          <label htmlFor="">Category</label>
          <select className='mx-1' value={filter.categoryId} onChange={e => change(e)} name="categoryId" id="">
            {/* <option>select category</option> */}
            {categoryOption}
          </select>
        </div>
        <button onClick={() => toggle('create')} className='btn btn-success'>Create new subcategory</button>
      </div>


      <div>
        <table className="table table-striped table-hover my-4">
          <thead className=' bg-dark text-white'>
            <tr>
              <th scope='col'>Subcategory</th>
              <th scope='col'>Category </th>
              <th scope='col'>Catalog</th>
              <th scope='col' colSpan={2}></th>
            </tr>
          </thead>
          <tbody>
            {showSubCategory}
          </tbody>
        </table>
      </div>
      {
        mode === 'create' ? <SubCategoryCreateModal catalog={catalog} category={category} open={open} toggle={toggle} /> : ''
      }

      {
        mode === 'edit' ? <SubCategoryEditModal item={selectedItem} change={change} categoryOption={categoryOption} catalogOptions={catalogOptions} catalog={catalog} category={category} open={open} toggle={toggle} /> : ''
      }

      {spin ? spinner(true) : spinner(false)}
    </div>
  )
}

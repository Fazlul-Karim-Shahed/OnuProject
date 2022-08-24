import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { spinner } from '../Body/Spinner'
import SubCategoryCreateModal from './AdminComponents/SubCategory/SubCategoryCreateModal'
import SubCategoryEditModal from './AdminComponents/SubCategory/SubCategoryEditModal'

export default function Subcategory(props) {

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
    axios.get(process.env.REACT_APP_BACKEND_URL + '/subcategory/')
      .then(data => {
        // console.log(data.data);
        setSubcategory([...data.data.value])
        // setSpin(false)

      })
      .catch(err => {
        console.log(err);
        setSpin(false)

      })
    // setSpin(true)
    axios.get(process.env.REACT_APP_BACKEND_URL + '/catalog/')
      .then(data => {
        setCatalog([...data.data.value])
        setSpin(false)
      })
      .catch(err => {
        setSpin(false)
        console.log(err);
      })


    axios.get(process.env.REACT_APP_BACKEND_URL + '/category/')
      .then(data => {
        // console.log(data);
        setCategory([...data.data.value])
        setSpin(false)
      })
      .catch(err => {
        console.log(err);
        setSpin(false)
      })






  }, [])


  const toggle = (mode, item) => {
    setOpen(!open)
    setMode(mode)
  }


  const remove = (item) => {
    setSpin(true)
    axios.delete(process.env.REACT_APP_BACKEND_URL + '/subcategory/' + item._id)
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

  let categoryOption
  if (!category || filter.catalogId === '') categoryOption = '';
  else {
    categoryOption = category.map(item => {
      return <option key={Math.random()} value={item._id}>{item.name}</option>
    })
  }

  const change = (e) => {

    console.log(e.target.value);
    setSpin(true)
    if (e.target.name === 'catalogId') {
      setFilter({
        ...filter,
        catalogId: e.target.value
      })
      axios.get(process.env.REACT_APP_BACKEND_URL + '/category/id/' + e.target.value)
        .then(data => {
          setCategory(data.data.value)
          console.log(data.data);
          setSpin(false)

        })
      axios.get(process.env.REACT_APP_BACKEND_URL + `/subcategory/filter/${e.target.value}`)
        .then(data => {
          setSubcategory(data.data.value)
          console.log(data.data);
          setSpin(false)
        })

    }

    if (e.target.name === 'categoryId') {
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

    console.log(filter);
  }

  return (
    <div>
      <div className='d-flex justify-content-between'>
        <div className='mt-1'>
          <span className='me-3 fw-bold'>Filter by:</span>
          <select className='mx-1' value={filter.catalogId} onChange={e => change(e)} name="catalogId" id="">
            <option>select catalog</option>
            {catalogOptions}
          </select>
          <select className='mx-1' value={filter.categoryId} onChange={e => change(e)} name="categoryId" id="">
            <option>select category</option>
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

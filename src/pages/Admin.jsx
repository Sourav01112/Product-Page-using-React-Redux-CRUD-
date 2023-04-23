import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { addProduct } from '../redux/productReducer/action'

const inState = {
    name: '',
    image: '',
    brand: '',
    price: '',
    category: '',
    gender: ''
}
export const Admin = () => {
    const [product, setProduct] = useState(inState)
    const dispatch = useDispatch()

    const handleFormChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target

        setProduct((prev) => {
            return ({ ...prev, [name]: name === 'price' ? +value : value })
            /* converting to Number above */
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(product)
        setProduct(inState)
        dispatch(addProduct(product))
    }

    return (
        <DIV>
            <form onSubmit={handleSubmit}>
                <h1>Add Product</h1>
                <input name='name' value={product.name} type='text' placeholder='Name'
                    onChange={handleFormChange} />

                <input name='image' value={product.image} type='text' placeholder='Image'
                    onChange={handleFormChange} />

                <input name='brand' value={product.brand} type='text' placeholder='Brand'
                    onChange={handleFormChange} />

                <input name='price' value={product.price} type='number' placeholder='Price'
                    onChange={handleFormChange} />

                <select name="category" value={product.category}
                    className='category-select'
                    onChange={handleFormChange}
                >
                    <option value="">Select Category</option>
                    <option value="men's-clothing">Men's Clothing</option>
                    <option value="women's-clothing">Women's clothing</option>
                    <option value="electronics">Electronics</option>
                    <option value="jewellery">Jewellery</option>
                </select>

                <select name="gender" value={product.gender}
                    className='gender-select'
                    onChange={handleFormChange}
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="kids">Kids</option>
                </select>

                <button type='submit'>ADD</button>
            </form>
        </DIV>
    )
}

const DIV = styled.div`
    width: 250px;
    margin: auto;
    border: 1px solid gray;
    padding: 10px;
    background-color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

   form{
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
}

select{
    height: 30px;
    width: 80%;

}
input{
height: 30px;
font-size: larger;
width: 80%
}

button{
    width: 50%;
    height: 35px;
    cursor: pointer;
    border: none;
    padding: 5px 10px;
    color: white;
    border-radius: 5px;
    background-color: #3470e4;

}

`
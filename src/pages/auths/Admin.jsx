
import React, { useEffect, useState } from 'react'
import api from '@api'
export default function ProductForm() {
    const [pictures, setPictures] = useState([]);
    const [products, setProducts] = useState([]);
    console.log("🚀 ~ file: Admin.jsx:7 ~ ProductForm ~ products:", products)
    useEffect(() => {
        api.products.findMany()
        .then(res => {
            if(res.status == 200) {
                setProducts(res.data.data)
            }else {
                alert(res.data.message)
            }
        })
        .catch(err => {
            alert("Lỗi server")
        })
    }, [])
    function deleteSelectPicture(index) {
        let tempPictures = [...pictures];
        tempPictures = tempPictures.filter((picture, indexMap) => indexMap != index);
        setPictures(tempPictures);
    }
    async function createProduct(eventForm) {
        eventForm.preventDefault(); // khử hành vi form

        let formData = new FormData();

        for (let i in pictures) {
            formData.append("pictures", pictures[i].file)
        }

        formData.append("category_id", "1")
        formData.append("name", eventForm.target.name.value)
        formData.append("price", eventForm.target.price.value)
        formData.append("des", eventForm.target.des.value)

        api.products.create(formData)
        .then(res => {
            console.log("res", res)
        })
        .catch(err => {
            console.log("err", err)
            alert("Sập server!")
        })
    }   
  return (
    <div>
    <form  style={{ width: "500px" }} onSubmit={(e) => {
        createProduct(e)
    }} className='product_form m-auto mt-5' action="">
        ADD NEW PRODUCT
        <div className="form-outline mb-4">
          <div>Name product</div>
          <input type="text" name='name' className="form-control border" />
        </div>
        <div className="form-outline mb-4">
          <div>Price</div>
          <input type="text" name='price' className="form-control border" />
        </div>
        <div>
            Des: <textarea name="des"cols="30" rows="10"  className="form-control border"></textarea>
        </div>
        
          
        <div>
            Pictures: <input onChange={(e) => {
                if (e.target.files.length != 0) {
                    //console.log("đã chọn hình", e.target.files)
                    let tempPictures = [...pictures];

                    for (let i in  e.target.files) {
                        if(i == "length") {
                            break;
                        }
                        let item = {
                            file: e.target.files[i],
                            url: URL.createObjectURL(e.target.files[i])
                        }
                        tempPictures.push(item);
                    }
                    
                    setPictures(tempPictures);

                    e.target.value = null; // Reset the input value
                }
            }} type="file" multiple />
        </div>
        <div  >
            {
                pictures.map((picture, index) => (
                    <div>
                        <img style={{width:'100px',height:'100px'}} onClick={() => {
                        deleteSelectPicture(index)
                    }} key={Date.now() * Math.random()} className='product_preview_img' src={`${picture.url}`} />
                    </div>
                ))
            }
        </div>
        <button type='submit'>Add</button>
    </form>
    <ul>
            {
                products?.map((product, index) => (
                    <li key={Date.now() * Math.random()}>
                        <div>
                         Product Name: {product.name} ___   Product Price: {product.price}   ___  Product des: {product.des}
                        </div>
                        <img src={product.avatar} alt="" />
                        
                        {/* {
                            product.product_pictures.map((picture) => (
                                <img key={Date.now() * Math.random()} style={{width: '50px', height: '50px'}} src={`${picture.url}`}/>                           
                            ))
                        } */}
                        <button type="button" className="btn btn-primary">Buy</button>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

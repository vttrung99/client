import "./home.scss";
// import { Outlet } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Navbar from '@components/Navbar'
import Footer from '@components/Footer'
import Carosel from '@components/Carosel'
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux'

import api from '@api';

// import ProductCart from "../../components/ProductCart";
import { RootContext } from "@/App";
function Home() {
  const { userStore, dispatch, userActions } = useContext(RootContext);
  const [data, setData] = useState([]);
  const [login, setLogin] = useState("Login");
  const { t } = useTranslation();
  const [product, setProduct] = useState([]);
  console.log("🚀 ~ file: Home.jsx:21 ~ Home ~ product:", product)
  const [feature, setFeature] = useState([
    "Find a Store", "Help", "Join Us", "Sign In"
  ])
  const dispath = useDispatch()
  let userStores = useSelector(store => store.userStore)
  let cartStore = useSelector(store => store.cartStore)

  useEffect(() => {
    //fetch - axios
    if (userStore.data == null) {
      return
    }
    axios.get(`http://localhost:4000/apis/v1/purchase/${userStores?.data.id}`)
      .then(res => {
        // console.log("res",userStore.data);
        dispath(cartActions.setCartData(res.data.data))
      }).catch(err => {
        // console.log("lỗi axios",err);
      })
  }, [userStores.data])


  useEffect(() => {
    //fetch - axios
    if (userStore.data == null) {
      return
    }
    axios.post(`http://localhost:4000/apis/v1/purchase/${userStores?.data.id}`,product)
      .then(res => {
        console.log("🚀 ~ file: Home.jsx:51 ~ useEffect ~ userStores?.data.id:", userStores?.data.id)
        console.log("🚀 ~ file: Home.jsx:50 ~ useEffect ~ product11111111:", res.data)
        // setProduct([])
        console.log("logra",res.data);
        // dispath(cartActions.setCartData(res.data.data))
      }).catch(err => {
        // console.log("lỗi axios",err);
      })
  }, [product])
  
  useEffect(() => {
    console.log("cartStore.data222222", userStores.data

    );
  }, [cartStore.data])
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLogin("Logout")
      return
    } else {
      setLogin("Login")
    }
  }, [])
  const handleChange = () => {
    if (login == "Login") {

      setLogin("Logout")
    } else {
      if (confirm("Do you want to logout")) {
        setLogin("Login")
      } else {
        return
      }

    }
    if (localStorage.getItem('token')) {
      localStorage.removeItem("token");

      return
    } else if (localStorage.getItem('token') == null) {

      window.location.href = '/login'
      return
    }


  }
 
  useEffect(() => {
    dispatch(userActions.authenToken())
  }, [])
  useEffect(() => {
    axios.get('http://localhost:4000/product/v1/list')
      .then(response => {
        return setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array to run the effect only once on mount

  const [products, setProducts] = useState([]);
  console.log("🚀 ~ file: Home.jsx:117 ~ Home ~ products:", products)
  useEffect(async () => {
    try {
      let result = await api.products.findMany();
      if (result.status == 200) {
        setProducts(result.data.data)
      } else {
        alert(result.data.message)
      }
    } catch (err) {
      alert("server baỏ trì")
    }
  }, [])

  return (
    <div className="root_page">
      {/* Before Nav */}
      <section className="before_nav">
        <div className="before_nav_content">
          <h1 className="brand_name">JS_230410_CLIENT {t("hello")}  -  {t("about")}  User:
            {userStore?.data?.first_name}  {userStore?.data?.last_name}</h1>
          <div className="feature">

            {/* {
              feature.map((item, index) => (
                <span className="feature_item" key={Date.now() * Math.random()}>{item}</span>
              ))
            } */}
          </div>
          <span onClick={() => handleChange()}>{login}</span>
        </div>
      </section>
      <Navbar />
      <Carosel></Carosel>
      <br />
      <div style={{ display: 'flex', gap: '10px' }}>
        {/* <ProductCart/>
      <ProductCart/>
      <ProductCart/> */}
        {/* <div>abc</div> */}
        {console.log("data", data)}
        <div className="container">
          {/* {data.data?.map(data1 => (
            <div key={data1.id} className="user-card">
              <div className="card">
                <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                  <img
                    src={`${process.env.REACT_APP_SERVER_HOST}${data1.avatar}`}
                    className="img-fluid fixed-size-image"
                    alt="User Avatar"
                  />
                  <a href="#!">
                    <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }} />
                  </a>
                </div>
                <div className="card-body">
                  <span className="card-title">Card title</span>
                  <p className="card-text">{data1.name_prduct}</p>
                  <div className="button-container">
                    <a href="#!" className="btn btn-primary" onClick={() => handleClick(data1.id)}>
                      Add To Card
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))} */}
        </div>
      </div>
      {products.map(product => (
        <div key={product.id} className="user-card">
          <div className="card">
            <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
              <img
                src={`${product.avatar}`}
                className="img-fluid fixed-size-image"
                alt="User Avatar"
              />
              <a href="#!">
                <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }} />
              </a>
            </div>
            <div className="card-body">
              <span className="card-title">Card title</span>
              <p className="card-text">{product.name}</p>
              <div className="button-container">
                <a href="#!" className="btn btn-primary" onClick={()=>{
                   let datasss= 
                    {product_id:product.id,
                      quantity:1,
                      note :"aaaa"
                    }
                    
                  
                  return setProduct(datasss)
                  
                }}>
                  Add To Card
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* <section className="body_container">
        <div className="body_container_center">
          <Outlet/>
        </div>
      </section> */}
      <Footer />

    </div>
  );
}

export default Home;

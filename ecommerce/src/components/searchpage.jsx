import axios from 'axios';
import { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom"
 


function Searchpage({ cart, addToCart }) {
   const [query, setQuery] = useState("")
    const [availability, setAvailability] = useState("")
  const [price, setPrice] = useState("")
  const [relevance, setRelevance] = useState("")
  const [filtered, setFiltered] = useState([])
    const[Products,setProducts] =useState([])
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await axios.get("/utils/products.json");
        const outOfStock = JSON.parse(localStorage.getItem("outOfStock")) || [];
        setProducts(
        response.data.map((p) => ({
          ...p,
          available: !outOfStock.includes(p.id),
        }))
    
      )
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchApi();
  }, []);

  
  const location = useLocation();
 const { products = [] } = location.state || {};

 useEffect(() => {
  const allProducts = products.length ? products : Products;
  let result = allProducts;

  if (query || availability || price || relevance) {
    if (query) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (availability) {
      result = result.filter(
        (p) =>
          (availability === "in stock" && p.available === true) ||
          (availability === "out of stock" && p.available === false)
      );
    }

    if (price && price !== "all") {
      if (price === "low") result = result.filter((p) => p.price < 64);
      if (price === "mid") result = result.filter((p) => p.price >= 64 && p.price <= 98.5);
      if (price === "high") result = result.filter((p) => p.price > 98.5);
    }

    if (relevance) {
      result = result.filter((p) => p.relevance === relevance);
    }

    setFiltered(result);
  } else {
    setFiltered();
  }
}, [query, availability, price, relevance, products]);


  return (
    <>
    
    <div className='search-container'>
      <div className='title-container'>
        <h1>SEARCH</h1>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className='input-field'>
            <input type='text' placeholder='search'
             value={query}
              onChange={(e) => setQuery(e.target.value)}/>

            <button type="submit" className="search-btn" >
          <i className="fa-solid fa-magnifying-glass" ></i>
          </button>
          </div>
        </form>

        <div className="filter-container">
            <div className="filter">
            <h2>Filter:</h2>
              
                <select
                
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}>
              
               <option value="">Availability</option>
                <option value="in stock">In Stock</option>
                <option value="out of stock">Out of Stock</option>
              </select>

              <select onChange={(e) => setPrice(e.target.value)}>
              <option value="all">Price</option>
              <option value="low">Below $64</option>
              <option value="mid">$64 - $98.5</option>
             <option value="high">Above $98.5</option>
            </select>
            </div>
              
             <div className='filter'>
              <h2>Sort by:</h2>
              <select
                value={relevance}
                onChange={(e) => setRelevance(e.target.value)}
              >
                <option value="">Relevance</option>
                <option value="high">High</option>
                <option value="low">Low</option>
              </select>

          
            </div>

          </div>
           <div className="results">
       {filtered && filtered.length > 0 ? (
         filtered.map((item, index) => (
            <div key={item.id || index} className="product-card">
             <img src={item.image} alt={item.title} />
             <h3>{item.title}</h3>
             <span>${item.price}</span>
            
              <p>{item.available ? "Available" : "Out of Stock"}</p>
            </div>
           ))
        ) : (
          <p className="no-result">❌ No products found</p>
        )}

              </div>
            
      </div>

    </div>
    
    </>
  )
}

export default Searchpage
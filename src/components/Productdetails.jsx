import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductDetails({ addToCart }) {
  const { id } = useParams(); 
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || null);
  

  useEffect(() => {
    const fetchProduct = async () => {
      if (!product) {
        const res = await axios.get("/utils/products.json");
        const all = res.data;
        const found = all.find((item) => item.id === Number(id));
        setProduct(found);

      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <>
    <div className="productdetails">
       <div className="product-detail">
        <div className="productdetail-img">
         <img src={product.image} alt={product.title} />
        </div>
     <div className="productdetail-text">
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <div className="productdetails-text">
       <p>${product.price}</p>
      <h5>{product.category}</h5>
      </div>
      <div className="productdetail-button">
      <button onClick={() => addToCart(product)}>Add to Cart  <i className="fa-solid fa-cart-arrow-down"></i></button>
      </div>

      
     </div>
      
      </div>

    </div>
     
    </>
    
  );
}

export default ProductDetails;

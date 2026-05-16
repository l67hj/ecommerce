import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosStar } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; 

function Product({ cart, addToCart }) {
  const [products, setProducts] = useState([]);
  const [rating, setRating] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get("/utils/products.json");
      setProducts(res.data);
    };
    fetchApi();
  }, []);

  const handleRating = (id, rateValue) => {
    setRating((prev) => ({ ...prev, [id]: rateValue }));
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    Swal.fire({
      title: "Added to Cart!",
      text: `${product.title} has been added to your cart.`,
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  
  const filteredProducts = products.filter((product) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "men") return product.category.toLowerCase().includes("men");
    if (selectedCategory === "jewelry") return product.category.toLowerCase().includes("jewel");
    if (selectedCategory === "women") return product.category.toLowerCase().includes("women");
    return true;
  });

  const goToSearch = () => {
    navigate("/search", { state: { products } });
  };

  return (
    <>
      <div className="product-hero">
        <div className="product-intro">
          <h2>Our Featured Collections</h2>
          <p>
            Browse through our exclusive range of products — from classic men's wear to elegant women's jewelry.
          </p>
        </div>
      </div>

      <div className="product-container">
        <div className="searchbar">
          <button onClick={goToSearch} className="search">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        {filteredProducts.length === 0 ? (
          <p>No products found for this category.</p>
        ) : (
          <div className="product">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.title} />
                <h3>{product.title}</h3>
                <p className="para">{product.description}</p>
                <h5>{product.category}</h5>

                <div className="text-star">
                  <span>${product.price}</span>
                  <div className="star">
                    {[1, 2, 3, 4, 5].map((rate) => (
                      <IoIosStar
                        key={rate}
                        style={{
                          color:
                            rate <= (rating[product.id] || 0)
                              ? "#FFD700"
                              : "#808080",
                        }}
                        onClick={() => handleRating(product.id, rate)}
                      />
                    ))}
                  </div>
                </div>

              
                <button
                  className="button-two"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart <i className="fa-solid fa-cart-arrow-down"></i>
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="filter-buttons">
          <button
            className={selectedCategory === "all" ? "active" : ""}
            onClick={() => setSelectedCategory("all")}
          >
            All
          </button>
          <button
            className={selectedCategory === "men" ? "active" : ""}
            onClick={() => setSelectedCategory("men")}
          >
            1
          </button>
          <button
            className={selectedCategory === "jewelry" ? "active" : ""}
            onClick={() => setSelectedCategory("jewelry")}
          >
            2
          </button>
          <button
            className={selectedCategory === "women" ? "active" : ""}
            onClick={() => setSelectedCategory("women")}
          >
            3
          </button>
          
        </div>
      </div>
    </>
  );
}

export default Product;
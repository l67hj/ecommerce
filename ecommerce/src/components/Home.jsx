 import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Home({ addToCart }) {
  const [groupedProducts, setGroupedProducts] = useState({});
  const [userRatings, setUserRatings] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await axios.get("/utils/products.json");
        const data = response.data;

        const grouped = data.reduce((acc, product) => {
          if (!acc[product.category]) acc[product.category] = [];
          acc[product.category].push(product);
          return acc;
        }, {});

        setGroupedProducts(grouped);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchApi();
  }, []);

  
  const handleAddToCart = (item) => {
    addToCart(item);
    Swal.fire({
      title: "Added to Cart!",
      text: `${item.title} has been added to your cart.`,
      icon: "success",
      confirmButtonColor: "#8C5631",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  
  const renderStars = (productId) => {
    const rating = userRatings[productId] || 0;

    return (
      <>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <i
              key={i}
              className={`fa-star ${
                i < rating ? "fa-solid text-yellow-500" : "fa-regular text-gray-400"
              }`}
              onClick={() =>
                setUserRatings({ ...userRatings, [productId]: i + 1 })
              }
              style={{ cursor: "pointer" }}
            ></i>
          ))}
      </>
    );
  };

  return (
    <div className="background">
      <div className="first-section">
        <h1>
          Shop Smarter,<br />
          <span>Live Better</span>
        </h1>
        <p>
          Discover the latest trends, top deals, and quality products<br/> all in one
          place with ease. Enjoy doorstep delivery,<br/> hassle-free returns, and
          secure payments.
        </p>
        <Link to="/product">
          <button>Start Shopping</button>
        </Link>
      </div>
      

       <div className="context">
          <div className="catigory">
            <img src="pupple.png" />
            <p>TOPS</p>
          </div>

          <div className="catigory">
            <img src="product-img2.png" />
            <p>ELECTRONICS</p>
          </div>

          <div className="catigory">
            <img src="product-img4.png" />
            <p>BAG</p>
          </div>

          <div className="catigory">
            <img src="ring-silver.png" />
            <p>RINGS</p>
          </div>

          <div className="catigory">
            <img src="jacket.png" />
            <p>JACKET</p>
          </div>
        </div>


      <h2 className="text-2xl font-bold mb-6">Categories</h2>

      {Object.entries(groupedProducts).map(([category, items]) => (
        <div key={category} className="mb-10">
          <h3 className="text-xl font-semibold mb-4">{category}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="border rounded-xl shadow-md p-4 flex flex-col items-center"
              >
                <img
                  className="h-40 object-contain mb-3"
                  src={item.image}
                  alt={item.title}
                />
                <h4 className="font-medium text-center mb-2">{item.title}</h4>
                <div className="text-star">
                <p className="text-lg font-bold mb-1">${item.price}</p>

                <div className="flex items-center gap-1 mb-3">
                  {renderStars(item.id)}
                  {/* <span className="text-sm text-gray-600">
                    ({item.rating?.count || 0})
                  </span> */}
                </div>
                  </div>
                <div className="home-button flex gap-2">
                
                  <button
                    onClick={() => handleAddToCart(item)}
                    className=" button-one px-3 py-1 bg-orange-900 text-white rounded hover:bg-orange-950"
                  >
                    Add to Cart <i className="fa-solid fa-cart-arrow-down"></i>
                  </button>
                  
                
                  <button
                    onClick={() =>
                      navigate(`/productdetails/${item.id}`, {
                        state: { product: item },
                      })
                    }
                    className="button-one px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
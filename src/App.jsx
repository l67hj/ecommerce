import React, { useEffect, useState } from "react";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";

import Navbar from "./components/Navbar";
import About from "./components/about";
import Contact from "./components/Contact";
import SearchIcon from "./components/SearchIcon";
import Footer from "./components/Footer";
import ProductDetails from "./components/ProductDetails";
import Searchpage from "./components/Searchpage";
import CartIcon from "./components/CartIcon";
import CheckoutPage from "./components/checkoutpage";
import ReceiptPage from "./components/Receipt";
import Cartpage from "./components/Cartpage";
import Product from "./components/Product";

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");

    if (stored) {
      try {
        const parsed = JSON.parse(stored);

        if (parsed) {
          setCart(parsed);
        }
      } catch (err) {
        console.error("Error parsing cart:", err);
        setCart([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const exist = cart.find((item) => item.id === product.id);

    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQty = (product) => {
    setCart(
      cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (product) => {
    setCart(
      cart.map((item) =>
        item.id === product.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleDelete = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar cart={cart} />

      <Routes>
        {/* <Route path="/" element={<Home  addToCart={addToCart}/>} /> */}
        <Route
          path="/"
          element={
            <Home
              cart={cart}
              setCart={setCart}
              addToCart={addToCart}
            />
          }
        />

        <Route
          path="/Product"
          element={
            <Product
              cart={cart}
              setCart={setCart}
              addToCart={addToCart}
            />
          }
        />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/carticon" element={<CartIcon />} />

        <Route
          path="/cartpage"
          element={
            <Cartpage
              cart={cart}
              setCart={setCart}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
              handleDelete={handleDelete}
              total={total}
            />
          }
        />

        <Route path="/search" element={<SearchIcon />} />

        <Route
          path="/searchicon"
          element={
            <Searchpage
              cart={cart}
              addToCart={addToCart}
            />
          }
        />

        <Route
          path="/productDetails/:id"
          element={<ProductDetails addToCart={addToCart} />}
        />

        <Route
          path="/checkoutpage"
          element={
            <CheckoutPage
              cart={cart}
              setCart={setCart}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
              handleDelete={handleDelete}
              total={total}
            />
          }
        />

        <Route path="/receipt" element={<ReceiptPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;







// import React, { useEffect, useState } from "react";
// import "./index.css";
// import { Routes, Route } from "react-router-dom";
// import Product from "./components/product";
// import Navbar from "./components/Navbar";
// import About from "./components/About";
// import Contact from "./components/Contact";
// import SearchIcon from "./components/SearchIcon";

// import Footer from "./components/footer";
// import ProductDetails from "./components/productdetails";
// import Searchpage from "./components/searchpage";
// import CartIcon from "./components/cartIcon";
// import CheckoutPage from "./components/checkoutpage";
// import ReceiptPage from "./components/receipt";
// import Cartpage from "./components/cartpage";



// function App() {
//   const [cart, setCart] = useState([]); 


//   useEffect(() => {
//     const stored = localStorage.getItem("cart");
//     if (stored) {
//       try {
//         const parsed = JSON.parse(stored);
//         if (parsed) setCart(parsed);
//       } catch (err) {
//         console.error("Error parsing cart:", err);
//         setCart([]);
//       }
//     }
//   }, []);


//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   const addToCart = (product) => {
//     const exist = cart.find((item) => item.id === product.id);
//     if (exist) {
//       setCart(
//         cart.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         )
//       );
//     } else {
//       setCart([...cart, { ...product, quantity: 1 }]);
//     }
//   };

  
//   const increaseQty = (product) => {
//     setCart(
//       cart.map((item) =>
//         item.id === product.id
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       )
//     );
//   };

//   const decreaseQty = (product) => {
//     setCart(
//       cart.map((item) =>
//         item.id === product.id && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//     );
//   };

//   const handleDelete = (product) => {
//     setCart(cart.filter((item) => item.id !== product.id));
//   };


//   const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   return (
//     <>
//       <Navbar cart={cart} />

//       <Routes>
//         <Route path="/" element={<Home/>/> 
//         {/* // addToCart={addToCart} />} /> */}
//         <Route
//           path="/product"
//           element={<Product cart={cart} setCart={setCart} addToCart={addToCart} />}
//         />
//         <Route path="/footer" element={<About/>}/>
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/carticon" element={<CartIcon />} />
//         <Route path="/cartpage" element={<Cartpage  cart={cart}  setCart={setCart}  increaseQty={increaseQty}  decreaseQty={decreaseQty}  handleDelete={handleDelete}  total={total} /> } />
//         <Route path="/search" element={<SearchIcon />} />
//         <Route path="/searchicon" element={<Searchpage  cart={cart} addToCart={addToCart} />} />
//         <Route path="/productdetails/:id" element={<ProductDetails addToCart={addToCart} />} />
//           <Route path="/checkoutpage" element={<CheckoutPage  cart={cart}
//       setCart={setCart}
//       increaseQty={increaseQty}
//       decreaseQty={decreaseQty}
//       handleDelete={handleDelete}
//       total={total} />}/>
//           <Route path="/receipt" element={<ReceiptPage/>}/>
//       </Routes>

//       <Footer />
//     </>
//   );
// }

// export default App;
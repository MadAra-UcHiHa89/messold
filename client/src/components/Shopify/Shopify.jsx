import "./Shopify.css";
import { useState, useEffect } from "react";
import Product from "../Product/Product";

const Shopify = () => {
  const [products, setProducts] = useState([
    // {
    //   title: "Mask",
    //   vendor: "Mart",
    //   product_type: "scandals",
    //   image: {
    //     src: "https://cdn.shopify.com/s/files/1/0507/9390/6357/products/4_Colors_Blue_13x4x1_Middle_Part_Lace_Front_Wig_Brazilian_Straight.jpg?v=1611911289",
    //   },
    // },
  ]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    setFlag(true);
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:9090/products"
        // {
        //   method: "GET",
        //   headers: {
        //     // the content type header value is usually auto-set
        //     // depending on the request body
        //     "Content-Type": "text/plain;charset=UTF-8",
        //     "X-Shopify-Access-Token": "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",
        //     "Access-Control-Allow-Origin": "*",
        //   },
        // }
      );
      const data = await response.json();
      console.log(data);
      setProducts(data.products);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Messold Shopify Products</h1>
      <div
        className="shopfiy"
        style={{ display: "grid", gridTemplateColumn: "auto-fit,400px" }}
      >
        {flag &&
          products.map((product) => {
            return (
              <Product
                key={product.id}
                source={
                  product.image
                    ? product.image.src
                    : "https://cdn.shopify.com/s/files/1/0507/9390/6357/products/4_Colors_Blue_13x4x1_Middle_Part_Lace_Front_Wig_Brazilian_Straight.jpg?v=1611911289"
                }
                title={product.title}
                vendor={product.vendor}
                type={product.product_type}
              />

              // <li>Hi</li>
            );
          })}
      </div>
    </div>
  );
};

export default Shopify;

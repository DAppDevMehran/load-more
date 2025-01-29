import { useEffect, useState } from "react";
import "./styles.css";

export default function LoadMoreData() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [disableButton, setDisableButton] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${count * 20}`
      );
      const result = await response.json();

      if (result?.products?.length) {
        setProducts((prevData) => [...prevData, ...result.products]);
      }

      setDisableButton(result.products.length === 0 || products.length >= 100);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [count]);

  return (
    <div className="load-more-container">
      <div className="product-container">
        {products.map((item) => (
          <div className="product" key={item.id}>
            <img src={item.thumbnail} alt={item.title} />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
      <div className="button-container">
        <button
          disabled={disableButton || loading}
          onClick={() => setCount((prev) => prev + 1)}
        >
          {loading ? "Loading..." : "Load More Products"}
        </button>
        {disableButton && <p>You have reached 100 products.</p>}
      </div>
    </div>
  );
}

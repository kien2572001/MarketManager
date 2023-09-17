import "./style.scss";
import SmallProduct from "./SmallProduct";
import { useEffect, useState } from "react";
import { getTop4Products } from "api/product";
import { v4 as uuidv4 } from "uuid";

const HotSales = () => {
  const [hotSales, setHotSales] = useState([
    {
      id: 1,
      name: "Sầu Riêng Ri 6",
      price: 100000,
      sale: 95000,
      img: "https://chonoicairang.net/wp-content/uploads/2020/04/framesaurieng.jpg",
    },
    {
      id: 2,
      name: "Gạo Hữu Cơ - Hạt Ngọc Rồng",
      price: 150000,
      sale: 140000,
      img: "https://chonoicairang.net/wp-content/uploads/2020/04/gaohuuco.jpg",
    },
    {
      id: 3,
      name: "Cá Thác Lác Rút Xương Hậu Giang",
      price: 200000,
      sale: 170000,
      img: "https://chonoicairang.net/wp-content/uploads/2020/04/ca-thac-lac.jpg",
    },
    {
      id: 4,
      name: "Bưởi Da Xanh Loại 1",
      price: 55000,
      sale: 45000,
      img: "https://chonoicairang.net/wp-content/uploads/2020/04/buoidaxanh.jpg",
    },
  ]);

  useEffect(() => {
    const fetchHotSales = async () => {
      try {
        const response = await getTop4Products();
        //console.log(response);
        setHotSales(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHotSales();
  }, []);

  return (
    <div className="container-hotsales">
      <div className="hotsales">
        <div className="hotsales__blank"></div>
        <div className="hotsales__title">
          <b></b>
          <div className="hotsales__title--text">
            <h2>SẢN PHẨM BÁN CHẠY</h2>
          </div>
          <b></b>
        </div>
        <div className="hotsales__content">
          {hotSales.map((item, index) => {
            return <SmallProduct item={item} key={uuidv4()} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default HotSales;

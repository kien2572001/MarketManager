import "./style.scss";

const SmallProduct = (props) => {
  const { item } = props;

  return (
    <div className="container-smallproduct">
      <div className="smallproduct">
        <div className="decrease">
          <span>-</span>
          <span>5%</span>
        </div>
        <div className="smallproduct-infor">
          <div className="smallproduct__img">
            <img src={item.img} alt="" />
          </div>
          <div className="smallproduct__content">
            <div className="smallproduct__content--name">
              <p>{item.name}</p>
            </div>
            <div className="smallproduct__content--price">
              <p className="price">{item.price}đ</p>
              <p className="price-sale">{item.sale}đ</p>
            </div>
            <div className="add-to-cart">
              <button>THÊM VÀO GIỎ HÀNG</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallProduct;

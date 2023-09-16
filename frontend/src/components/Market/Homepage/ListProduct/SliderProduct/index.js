import "./style.scss";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import CardProduct from "./CardProduct";

const SliderProduct = (props) => {
  const { item } = props;
  //check length of item
  // if(item.length < 4){
  const lengthItem = item.length;

  return (
    <div className="container-sliderproduct">
      <Slide
        slidesToScroll={4}
        slidesToShow={4}
        indicators={true}
        autoplay={lengthItem <= 4 ? false : true}
      >
        {item.map((item, index) => {
          return (
            <div className="each-slide">
              <CardProduct item={item} />
            </div>
          );
        })}
      </Slide>
    </div>
  );
};

export default SliderProduct;

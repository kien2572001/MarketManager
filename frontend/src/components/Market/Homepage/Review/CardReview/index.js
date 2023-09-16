import "./style.scss";
import GradeIcon from "@mui/icons-material/Grade";

const CardReview = ({ item }) => {
  const StarRating = 5;
  return (
    <div className="container-cardreview">
      <div className="card-review">
        <div className="card-review__img">
          <img src="https://scontent.fhan20-1.fna.fbcdn.net/v/t1.6435-9/49728071_939592662895876_5424438335005261824_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Aqg1ucx8bIsAX8yw513&_nc_ht=scontent.fhan20-1.fna&oh=00_AfBeFCzuj91RnkbdgydtTrwxVQgs8t8Pj2w03mGZGfgCJA&oe=6524E6C5" />
        </div>
        <div className="card-review__content">
          <div className="card-review__star-rating">
            {/* for */}
            {Array(StarRating)
              .fill()
              .map((_, i) => (
                <GradeIcon sx={{ color: "#FFC048" }} />
              ))}
          </div>
          <div className="card-review__content--text">
            <p>
              Mình bị ghiền sầu riêng luôn kể từ lúc mua 2 quả ở Chợ nổi Cái
              Răng Online. Sầu riêng ngon, ngọt, hột lép tuyệt cú mèo luôn.
            </p>
          </div>
          <div className="card-review__content--name">
            <h3>Chị Thanh Lam</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardReview;

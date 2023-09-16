import "./style.scss";

const Contact = () => {
  return (
    <div className="container-contact">
      <div className="service-quality">
        <div className="service">
          <div className="service-logo">
            <img
              src="https://chonoicairang.net/wp-content/uploads/2020/04/icons8-guarantee-1.svg"
              alt="service-logo"
            />
          </div>
          <div className="service-content">
            <span>CAM KẾT CHẤT LƯỢNG</span>
          </div>
        </div>
        <div className="service">
          <div className="service-logo">
            <img
              src="https://chonoicairang.net/wp-content/uploads/2020/04/icons8-easy.svg"
              alt="service-logo"
            />
          </div>
          <div className="service-content">
            <span>ĐỔI TRẢ DỄ DÀNG</span>
          </div>
        </div>
        <div className="service">
          <div className="service-logo">
            <img
              src="https://chonoicairang.net/wp-content/uploads/2020/04/icons8-last_24_hours.svg"
              alt="service-logo"
            />
          </div>
          <div className="service-content">
            <span>HỖ TRỢ 24/7</span>
          </div>
        </div>
        <div className="service">
          <div className="service-logo">
            <img
              src="https://chonoicairang.net/wp-content/uploads/2020/04/icons8-shipped.svg"
              alt="service-logo"
            />
          </div>
          <div className="service-content">
            <span>GIAO HÀNG THẦN TỐC</span>
          </div>
        </div>
      </div>
      <div className="contact">
        <div className="contact-img">
          <img
            src="https://chonoicairang.net/wp-content/uploads/2020/05/banner-si-ngang.jpg"
            alt="contact-img"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;

import React, { useEffect, useLayoutEffect } from "react";
import { Card, Container, Row, Col, Image, Button } from "react-bootstrap";
import DashboardLayout from "layouts/DashboardLayout";
import { getShopBoatByOwnerId } from "api/shopBoat";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import EditModal from "./EditModal";
import Badge from "react-bootstrap/Badge";

const MerchantDashbroad = () => {
  const [cookies] = useCookies(["access_token"]);
  const [shopBoat, setShopBoat] = React.useState({
    name: "",
    description: "",
    address: "",
    avatar: "",
    isApproved: false,
  });

  useLayoutEffect(() => {
    const fetchShopBoat = async () => {
      try {
        const { id } = await jwt_decode(cookies.access_token);
        const response = await getShopBoatByOwnerId(id);
        setShopBoat(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchShopBoat();
  }, []);

  return (
    <DashboardLayout role="merchant">
      <Container>
        <Row>
          <Col>
            <Card>
              <Row>
                <Col>
                  <Card.Img
                    variant="top"
                    src={shopBoat?.avatar}
                    className="p-3 h-full rounded-lg"
                  />
                </Col>
                <Col>
                  <Card.Body>
                    <Card.Title>
                      <div className="flex justify-between border-b border-gray mb-2 pb-2">
                        <h2 className="">{shopBoat?.name}</h2>
                        <EditModal
                          shopBoat={shopBoat}
                          setShopBoat={setShopBoat}
                        />
                      </div>
                    </Card.Title>
                    <Card.Text className="mt-3">
                      <span className="font-semibold">Thông tin:</span>{" "}
                      {shopBoat?.description}
                    </Card.Text>
                    <Card.Text>
                      <span className="font-semibold mt-2">Địa chỉ:</span>{" "}
                      {shopBoat?.address}
                    </Card.Text>
                    <Card.Text>
                      <span className="font-semibold mt-2">Trạng thái:</span>{" "}
                      {shopBoat?.isApproved ? (
                        <Badge variant="success">Đã được cấp phép</Badge>
                      ) : (
                        <Badge variant="danger">Chưa được cấp phép</Badge>
                      )}
                    </Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </DashboardLayout>
  );
};

export default MerchantDashbroad;

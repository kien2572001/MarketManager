import React, { useEffect, useLayoutEffect } from "react";
import { Card, Container, Row, Col, Image, Button } from "react-bootstrap";
import DashboardLayout from "layouts/DashboardLayout";
import { getShopBoatByOwnerId } from "api/shopBoat";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import EditModal from "./EditModal";
import Badge from "react-bootstrap/Badge";
import Skeleton from "@mui/material/Skeleton";

const MerchantDashboard = () => {
  const [cookies] = useCookies(["access_token"]);
  const [shopBoat, setShopBoat] = React.useState(null);

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
    <DashboardLayout layoutRole={1}>
      <Container>
        <Row>
          <Col>
            <Card>
              <Row>
                <Col>
                  {shopBoat ? (
                    <Card.Img
                      variant="top"
                      src={shopBoat?.avatar}
                      className="p-3 h-full rounded-lg"
                    />
                  ) : (
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height="100%"
                    />
                  )}
                </Col>
                <Col>
                  <Card.Body>
                    <Card.Title>
                      {shopBoat ? (
                        <div className="flex justify-between border-b border-gray mb-2 pb-2">
                          <h2 className="">{shopBoat?.name}</h2>
                          <EditModal
                            shopBoat={shopBoat}
                            setShopBoat={setShopBoat}
                          />
                        </div>
                      ) : (
                        <Skeleton width={150} height={30} />
                      )}
                    </Card.Title>
                    <Card.Text className="mt-3">
                      {shopBoat ? (
                        <span className="font-semibold">Thông tin:</span>
                      ) : (
                        <Skeleton width={100} />
                      )}{" "}
                      {shopBoat?.description}
                    </Card.Text>
                    <Card.Text>
                      {shopBoat ? (
                        <span className="font-semibold mt-2">Địa chỉ:</span>
                      ) : (
                        <Skeleton width={80} />
                      )}{" "}
                      {shopBoat?.owner ? (
                        shopBoat?.owner?.address
                      ) : (
                        <Skeleton width={100} />
                      )}
                    </Card.Text>
                    <Card.Text>
                      {shopBoat ? (
                        <span className="font-semibold mt-2">Loại thuyền:</span>
                      ) : (
                        <Skeleton width={80} />
                      )}{" "}
                      {shopBoat?.type}
                    </Card.Text>
                    <Card.Text>
                      {shopBoat ? (
                        <span className="font-semibold mt-2">Mã số:</span>
                      ) : (
                        <Skeleton width={80} />
                      )}{" "}
                      {shopBoat?.code}
                    </Card.Text>
                    <Card.Text>
                      {shopBoat ? (
                        <span className="font-semibold mt-2">Trạng thái:</span>
                      ) : (
                        <Skeleton width={100} />
                      )}{" "}
                      {shopBoat?.status === "active" ? (
                        <Badge bg="success">Đang hoạt động</Badge>
                      ) : shopBoat?.status === "inactive" ? (
                        <Badge bg="danger">Chưa hoạt động</Badge>
                      ) : (
                        <Badge bg="warning">Bị khóa</Badge>
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

export default MerchantDashboard;

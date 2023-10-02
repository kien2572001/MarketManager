import "./style.scss"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const TourNavbar = () => {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">
                    <img width="60" height="70" src="https://s3.nucuoimekong.com/ncmk/wp-content/uploads/logo-nucuoimekong-100.webp" alt="logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Tất cả Tour" id="collapsible-nav-dropdown" class="text-black">
                            <NavDropdown.Item href="#action/3.1" >Tour Biển Đảo</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Tour Sài Gòn
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Tour Hành Hương</NavDropdown.Item>
                            {/* <NavDropdown.Divider /> */}
                            <NavDropdown.Item href="#action/3.4">
                                Tour Khách Đoàn
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#features">Tour Cần Thơ 123</Nav.Link>
                        <NavDropdown title="Tour Miền Tây" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Tour miền Tây từ Sài Gòn</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Tour miền Tây từ Cần Thơ
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Tour miền Tây từ Cà Màu</NavDropdown.Item>
                            {/* <NavDropdown.Divider /> */}
                            {/* <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item> */}
                        </NavDropdown>
                        <Nav.Link href="#pricing">Tour Miền Trung</Nav.Link>
                        <Nav.Link href="#pricing">Tour Miền Bắc</Nav.Link>
                        <Nav.Link href="#pricing">Tour Nước Ngoài</Nav.Link>
                        <NavDropdown title="Dịch vụ" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Combo du lịch</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Homestay
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Khách sạn</NavDropdown.Item>
                            <NavDropdown.Item href="http://localhost:3000/marketplace">Marketing Online</NavDropdown.Item>
                            {/* <NavDropdown.Divider /> */}
                            {/* <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item> */}
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">
                            <WorkOutlineIcon />
                        </Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            <AccountCircleOutlinedIcon />
                        </Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            <SearchOutlinedIcon />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default TourNavbar
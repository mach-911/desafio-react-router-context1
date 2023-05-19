import { useContext } from "react";
import context from "../mycontext";
import { Container, Row, Col, Card } from "react-bootstrap";

function Favoritos() {
  const { fotos, setFavoritos } = useContext(context);

  return (
    <Container>
      <h2 align="center">Fotos Favoritas</h2>
      <Row className="gap-3">
        {fotos
          .filter((foto) => foto.liked)
          .map((foto) => (
            <Col key={foto.id} xs={10} md={6} lg={4} xl={3} className="mx-auto">
              <Card onClick={() => setFavoritos(foto.id)}>
                <Card.Img
                  variant="top"
                  src={foto.src.medium}
                  style={{ height: "260px", objectFit: "cover" }}
                />
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default Favoritos;

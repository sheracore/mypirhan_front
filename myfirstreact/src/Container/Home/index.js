import React from "react";
import { Layout, Col, Row, Button } from "antd";
import history from "../../history";
import { withRouter } from "react-router";

const { Content } = Layout;

const HomePage = (props) => {
  console.log(props);

  return (
    <Content className="user-padd">
      <Row justify="center">
        <Col xs={21}>
          <Button
            onClick={() =>
              history.push({
                pathname: "/new-page",
                newData: { id: 1, name: "test" },
              })
            }
          >
            Go To New Page
          </Button>
        </Col>
      </Row>
    </Content>
  );
};

export default withRouter(HomePage);

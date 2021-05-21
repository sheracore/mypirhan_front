import React from "react";
import { Layout, Col, Row } from "antd";
import { withRouter } from "react-router";

const { Content } = Layout;

const NewPage = (props) => {
  console.log(props);
  return (
    <Layout>
      <Content>
        <Row>
          <Col>WellCome to the new page</Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default withRouter(NewPage);

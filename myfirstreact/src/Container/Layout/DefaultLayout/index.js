import React, { Suspense } from "react";
import { Route, Switch } from "react-router";
import { Layout, Col, Row } from "antd";
import routes from "../../../routes";

const { Header, Content, Footer } = Layout;

export default function DefaulLayout(props) {
  return (
    <Layout>
      <Header></Header>
      <Content>
        <Switch>
          <Suspense fallback={<p>...loading</p>}>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={(props) => <route.component {...props} />}
              />
            ))}
          </Suspense>
        </Switch>
      </Content>
      <Footer></Footer>
    </Layout>
  );
}

import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

function Index() {
  const navigator = useNavigate();

  return (
    <Result
      style={{ paddingTop: 100 }}
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button onClick={() => navigator("/")} type="primary">
          Back Home
        </Button>
      }
    />
  );
}

export default Index;

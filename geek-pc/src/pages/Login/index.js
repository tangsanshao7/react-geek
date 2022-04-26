import React from "react";
import logo from "../../assets/logo.png";
import "./index.scss";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "@/store/actions";
function Index() {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const onFinish = async (values) => {
    // console.log(values);
    const { mobile, code } = values;
    try {
      await dispatch(login(mobile, code));
      navigator("/");
    } catch (e) {
      // console.log(e);
      message.error(e.response?.data?.message || "登录失败");
    }
  };
  return (
    <>
      <div className="login">
        <div className="login-container">
          <img className="login-logo" src={logo} alt="" />
          <Form
            size="large"
            autoComplete="off"
            onFinish={onFinish}
            initialValues={{
              mobile: "13911111111",
              code: "246810",
              isAgree: true,
            }}
          >
            <Form.Item
              name="mobile"
              rules={[
                { required: true, message: "请输入手机号" },
                {
                  pattern: /^1[3456789]\d{9}$/,
                  message: "手机号格式不正确",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="请输入手机号" />
            </Form.Item>
            <Form.Item
              name="code"
              rules={[
                { required: true, message: "请输入验证码" },
                {
                  len: 6,
                  message: "验证码长度为6位",
                },
              ]}
            >
              <Input prefix={<LockOutlined />} placeholder="请输入验证码" />
            </Form.Item>
            <Form.Item
              name="isAgree"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject("请勾选同意协议"),
                },
              ]}
            >
              <Checkbox>我已阅读并同意「用户协议」和「隐私条款」</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" block htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Index;

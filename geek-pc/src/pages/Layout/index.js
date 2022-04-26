import React, { useEffect } from "react";
import { Layout, Menu, Popconfirm, Button } from "antd";
import "./index.scss";
import {
  PieChartOutlined,
  SolutionOutlined,
  FileWordOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import Dashboard from "../Dashboard";
import Article from "../Article";
import Publish from "../Publish";
import NotFound from "../NotFound";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { getUserInfo, logout } from "@/store/actions";
import { useDispatch, useSelector } from "react-redux";
const { Header, Sider, Content } = Layout;
function Index() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const location = useLocation();
  const menuSelectedKey = location.pathname.startsWith("/publish")
    ? "/publish"
    : location.pathname;

  const user = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    try {
      dispatch(getUserInfo());
    } catch {}
  }, [dispatch]);

  const onLogout = () => {
    dispatch(logout());
    navigator("/login");
  };

  return (
    <Layout className="geek-layout">
      <Sider width={148}>
        <div className="logo">GEEK</div>
        <Menu selectedKeys={[menuSelectedKey]} mode="inline" theme="dark">
          <Menu.Item icon={<PieChartOutlined />} key="/dashboard">
            <Link to={"/dashboard"}>数据面板</Link>
          </Menu.Item>
          <Menu.Item icon={<SolutionOutlined />} key="/article">
            <Link to={"/article"}>内容管理</Link>
          </Menu.Item>
          <Menu.Item icon={<FileWordOutlined />} key="/publish">
            <Link to={"/publish"}>发布文章</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header>
          <span style={{ fontSize: 16 }}>极客园自媒体端</span>
          <div>
            <span>{user.name}</span>
            <Popconfirm
              placement="bottomRight"
              title="您确认退出极客园自媒体端吗？"
              okText="确认"
              cancelText="取消"
              onConfirm={onLogout}
            >
              <Button type="link" icon={<LogoutOutlined />}>
                退出
              </Button>
            </Popconfirm>
          </div>
        </Header>
        <Content>
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/article" element={<Article />} />
            <Route path="/publish" element={<Publish />}>
              <Route path=":id" element={<Publish />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Index;

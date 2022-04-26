import {
  Breadcrumb,
  Button,
  Card,
  DatePicker,
  Form,
  message,
  Modal,
  Radio,
  Select,
  Tag,
} from "antd";
import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Table, Space, Image } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { delArticle, getArticles, getChannels } from "@/store/actions";

import defaultImg from "@/assets/error.png";
function Index() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  useEffect(() => {
    dispatch(getChannels());
    dispatch(getArticles({}));
  }, [dispatch]);

  // 删除功能
  const delArticleFn = (id) => {
    Modal.confirm({
      title: "您是否确认删除该文章？",
      cancelText: "取消",
      okText: "确认",
      onOk: async () => {
        await dispatch(delArticle(id));
        await dispatch(getArticles(params.current));
        message.success("删除成功");
      },
    });
  };

  // 跳转功能
  const editArticleFn = (id) => {
    navigator(`/publish/${id}`);
  };

  const { channels, results, page, per_page, total_count } = useSelector(
    (state) => state.article
  );

  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      key: "cover",
      render: (cover) => (
        <Image
          src={cover?.images?.[0] || defaultImg}
          style={{ objectFit: "cover" }}
          width={200}
          height={120}
        />
      ),
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const info = statusLabel[status];
        return <Tag color={info.color}>{info.text}</Tag>;
      },
    },
    {
      title: "发布时间",
      dataIndex: "pubdate",
      key: "pubdate",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
      key: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
      key: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
      key: "like_count",
    },
    {
      title: "操作",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Button
            onClick={() => editArticleFn(record.id)}
            type="link"
            icon={<EditOutlined />}
          />
          <Button
            type="link"
            onClick={() => {
              delArticleFn(record.id);
            }}
            icon={<DeleteOutlined />}
          />
        </Space>
      ),
    },
  ];

  const statusLabel = [
    { text: "草稿", color: "default" },
    { text: "待审核", color: "blue" },
    { text: "审核通过", color: "green" },
    { text: "审核拒绝", color: "red" },
  ];
  const params = useRef({
    page: 1, // 页码
    per_page: 20, // 每页数量
    channel_id: undefined,
    status: undefined,
    begin_pubdate: undefined,
    end_pubdate: undefined,
  });
  const onFinish = (values) => {
    params.current.status = values.status;
    params.current.channel_id = values.channel_id;
    if (values.dateArr) {
      params.current.begin_pubdate = values.dateArr[0].format(
        "YYYY-MM-DD HH:mm:ss"
      );
      params.current.end_pubdate = values.dateArr[1].format(
        "YYYY-MM-DD HH:mm:ss"
      );
    } else {
      params.current.begin_pubdate = undefined;
      params.current.end_pubdate = undefined;
    }
    params.current.page = 1;
    dispatch(getArticles(params.current));
  };

  const onPageChange = (page, pageSize) => {
    params.current.page = page;
    params.current.per_page = pageSize;
    dispatch(getArticles(params.current));
  };

  return (
    <div className="root">
      <Card
        title={
          // 面包屑
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        {/* 表单 */}
        <Form onFinish={onFinish}>
          <Form.Item label="状态：" name="status">
            <Radio.Group>
              <Radio value={undefined}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>已通过</Radio>
              <Radio value={3}>已拒绝</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="频道：" name="channel_id">
            <Select style={{ width: 288 }}>
              {channels.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="日期：" name="dateArr">
            <DatePicker.RangePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card
        title={`根据筛选条件共查询到 ${total_count} 条结果：`}
        style={{ marginTop: 24 }}
      >
        <Table
          columns={columns}
          dataSource={results}
          rowKey="id"
          pagination={{
            current: page,
            pageSize: per_page,
            total: total_count,
            showSizeChanger: true,
            position: ["bottomCenter"],
            onChange: onPageChange,
          }}
        ></Table>
      </Card>
    </div>
  );
}

export default Index;

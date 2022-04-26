import { getChannels } from "@/store/actions";
import {
  Breadcrumb,
  Button,
  Card,
  Form,
  Input,
  Radio,
  Select,
  Space,
  Upload,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { addArticle } from "@/store/actions/article";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { getArticle, editArticle } from "@/store/actions/article";

function Index() {
  const channels = useSelector((state) => state.article.channels);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getChannels());
  }, [dispatch]);

  const [type, setType] = useState(1);
  const onTypeChange = (e) => {
    setType(e.target.value);
    setFileList([]);
  };

  const [fileList, setFileList] = useState([]);
  const onUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };
  //  添加文章
  const navigator = useNavigate();
  const onFinish = async (values, draft = false) => {
    if (type !== fileList.length) {
      return message.warning("请按照选择的封面类型上传图片");
    }
    // 组织提交数据
    const data = {
      ...values,
      cover: {
        type,
        // 后台需要[string]类型
        // images: fileList.map((item) => item.response.data.url),
        images: fileList.map((item) => {
          return item?.response?.data?.url || item.url;
        }),
      },
    };
    if (params.id) {
      // 编辑
      data.id = params.id;
      await dispatch(editArticle(data));
    } else {
      // 添加
      await dispatch(addArticle(data));
    }
    message.success("保存成功");
    navigator("/article");
  };

  // 编辑自动填充
  const params = useParams();
  const [form] = Form.useForm();
  useEffect(() => {
    const setFormData = async () => {
      if (params.id) {
        const { title, cover, content, channel_id } = await dispatch(
          getArticle(params.id)
        );
        form.setFieldsValue({ title, content, channel_id });
        setType(cover.type);
        setFileList(cover.images.map((item) => ({ url: item })));
      } else {
        setType(1);
        setFileList([]);
        form.resetFields();
      }
    };
    setFormData();
  }, [dispatch, form, params]);
  const saveDarft = async () => {
    try {
      const values = await form.validateFields();
      onFinish(values, true);
    } catch (e) {}
  };
  return (
    <div className="root">
      <Card
        title={
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/article">内容管理</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>发布文章</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form onFinish={onFinish} labelCol={{ span: 4 }} form={form}>
          <Form.Item
            label="文章标题："
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="所属频道："
            name="channel_id"
            rules={[{ required: true, message: "请选择所属频道" }]}
          >
            <Select style={{ width: 400 }}>
              {channels.map((item) => {
                return (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item label="文章封面：">
            {/* 一个FormItem只能有一个元素 */}
            <Form.Item style={{ marginBottom: 0 }}>
              <Radio.Group value={type} onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {type > 0 ? (
              <div style={{ marginTop: 16 }}>
                <Upload
                  name="image"
                  listType="picture-card"
                  action="http://geek.itheima.net/v1_0/upload"
                  fileList={fileList}
                  onPreview={() => {}}
                  onChange={onUploadChange}
                >
                  {fileList.length < type ? (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  ) : null}
                </Upload>
              </div>
            ) : null}
          </Form.Item>

          <Form.Item
            label="文章内容："
            name="content"
            initialValue=""
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            <ReactQuill
              placeholder="请输入文章内容"
              initialValue=""
              wrapperCol={{ span: 16 }}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                {params.id ? "修改文章" : "发布文章"}
              </Button>
              <Button onClick={saveDarft}>存入草稿</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Index;

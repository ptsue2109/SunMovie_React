import { Button, Rate, Space, Switch, Table, Tag, message } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../../redux/hook";
import { useAppDispatch } from "../../../redux/hook";
import { Comenter } from "../../../service/commenApi";
type Props = {};

function ListCommentMovie({}: Props) {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state: any) => state);
  const [comments, setComments] = useState<any>([]);
  const { id } = useParams();
  useEffect(() => {
    getComments(String(id));
  }, [id]);

  const getComments = async (id: string) => {
    const { data } = await Comenter.listByMovies(id);
    setComments(data);
  };

  const changeStatus = async (comment: any, _: number) => {
    const status = _ === 0 ? 1 : 0;
    const { data } = await Comenter.updateStatus(comment._id, {
      ...comment,
      status,
    });
    if (data) {
      message.success("Cập nhật trạng thái thành công!");
    } else {
      message.error(`Lỗi!`);
    }
  };

  const columns = [
    {
      title: "#",
      dataIndex: "stt",
      key: "stt",
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: "Nội dung",
      dataIndex: "noidung",
      key: "noidung",
    },
    {
      title: "Đánh giá",
      dataIndex: "danhgia",
      key: "danhgia",
    },
    {
      title: "Hành Động",
      dataIndex: "hanhdong",
      key: "hanhdong",
    },
  ];

  const dataComment = comments?.map((item: any, key: any) => ({
    key,
    stt: key + 1,
    noidung: item.content,
    danhgia: <Rate allowHalf defaultValue={item.rating} />,
    hanhdong: (
      <Switch
        defaultChecked={!Boolean(item.status)}
        checkedChildren="Hiện"
        unCheckedChildren="Ẩn"
        onChange={() => changeStatus(item, item.status)}
      />
    ),
  }));

  return (
    <div>
      <div className="flex gap-5">
        <Button type="primary" style={{ marginBottom: "20px" }}>
          <Link to="/admin/movies">Danh sách phim</Link>
        </Button>
      </div>
      <Table columns={columns} dataSource={dataComment} />
    </div>
  );
}

export default ListCommentMovie;

import { useState } from "react"
import { Button, Card, DatePicker, Form, Input, Select, Skeleton } from "antd";
import { useAppSelector } from "../../../redux/hook";
import { MovieCountry, MoviLanguages, MovieLimitAge } from "../../../ultils/data";
import { validateMessages } from "../../../ultils/FormMessage";
import { convertMovieTime } from "../../../ultils";
import ImageUpload from "../../../components/upload";

type Props = {
  form?: any,
  onFinish?: any,
  image: any,
  setImage: any,
  onReset: any
}

const MovieForm = ({ form, onFinish, image, setImage, onReset }: Props) => {
  const { movieType } = useAppSelector((state: any) => state.movieTypeReducer);
 
  const validateRunTime = (rule: any, value: any, callback: any) => {
    if (value) {
      if (value >= 60 && value <= 180) {
        callback();
      } else { callback(`RunTime must be greater than 60 and les than 180`) }
    }
    else {
      callback();
    }
  };
  return (
    <>
      <Form form={form} layout="vertical" onFinish={onFinish} validateMessages={validateMessages}>
        <div className="grid grid-flow-col overflow-scroll">
          {image ? (
            <>
              <Card className="col-6 w-full">
                <Form.Item label="Image">
                  <ImageUpload imageList={image} limit={1} key={1} />
                </Form.Item>
                <Form.Item name="name" label="Name" rules={[{ required: true, min: 5 }]}   >
                  <Input />
                </Form.Item>

                <Form.Item name="runTime" label="Run Time" rules={[{ type: "number",required: true, validator: validateRunTime }]}>
                  <Input />
                </Form.Item>

                <Form.Item label="Movie Type" name="movieTypeId" rules={[{ required: true }]}   >
                  <Select mode="multiple">
                    {movieType &&
                      movieType?.map((item: any, index: any) => (
                        <Select.Option value={item._id} key={index}>
                          {item.movieName}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>

                <Form.Item name="ageLimit" label="Age Limit" rules={[{ required: true }]} className="w-full overflow-hidden">
                  <Select >
                    {MovieLimitAge?.map((item: any, index: any) => (
                      <Select.Option value={item?.name} key={index}>
                        {item.name} - {item?.desc}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item name="languages" label="Languages" rules={[{ required: true }]}    >
                  <Select>
                    {MoviLanguages?.map((item: any, index: any) => (
                      <Select.Option value={item?.name} key={index}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Card>
              <Card className="col-6 w-full mt-3">

                <Form.Item name="releaseDate" label="Release Date" rules={[{ required: true }]}  >
                  <DatePicker format="DD-MM-YYYY" />
                </Form.Item>
                <Form.Item name="country" label="Country" rules={[{ required: true }]}    >
                  <Select>
                    {MovieCountry?.map((item: any, index: any) => (
                      <Select.Option value={item?.name} key={index}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item name="actor" label="Actor" rules={[{ required: true }]}  >
                  <Input />
                </Form.Item>

                <Form.Item name="director" label="Director" rules={[{ required: true }]}     >
                  <Input />
                </Form.Item>

                <Form.Item name="trailerUrl" label="Trailer URL" rules={[{ required: true, type: "url" }]}>
                  <Input />
                </Form.Item>

                <Form.Item name="description" label="Description" rules={[{ required: true }]}   >
                  <Input.TextArea />
                </Form.Item>


                <Form.Item >
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>

                  <Button htmlType="button" onClick={onReset} className="ml-3">
                    Nhập lại
                  </Button>

                </Form.Item>


              </Card>

            </>
          ) : (<><Skeleton /></>)}
        </div>
      </Form >
    </>
  )
}

export default MovieForm
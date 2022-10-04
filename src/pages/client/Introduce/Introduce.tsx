import React from "react";

type Props = {};

const Introduce = (props: Props) => {
  return (
    <div className=" mb-16 md:max-w px-10 ">
      <h2 className=" flex justify-center item-center text-2xl pt-20 text-white">
        GIỚI THIỆU CHUNG
      </h2>
      <div className="flex justify-center item-center h-10 mt-6">
        <img
          src="https://res.cloudinary.com/hungtv/image/upload/v1664432336/logo1_f9bumt.png"
          alt=""
          className=""
        />
      </div>
      <div className="text-center ">
        <ul className=" flex flex-wrap justify-center mt-20  ">
          <li className="mx-20 ">
            <a href="" className="hover:text-white text-xl">
              Giới thiệu{" "}
            </a>
          </li>{" "}
          <li className="mx-20  ">
            <a href="" className="hover:text-white text-xl">
              Giới thiệu dịch vụ{" "}
            </a>
          </li>{" "}
          <li className="mx-20">
            <a href="" className="hover:text-white text-xl">
              Phòng chiếu{" "}
            </a>
          </li>
        </ul>
      </div>
      <div className="mt-10">
        <span className="text-sm text-white">
          Trung tâm Chiếu phim Quốc gia (tên giao dịch quốc tế là National
          Cinema Center) là đơn vị sự nghiệp công lập, trực thuộc Bộ Văn hóa,
          Thể thao và Du lịch, được thành lập vào ngày 29 tháng 12 năm 1997.
          Trung tâm Chiếu phim Quốc gia có chức năng tổ chức chiếu phim phục vụ
          các nhiệm vụ chính trị, xã hội, hợp tác quốc tế; điều tra xã hội học
          về nhu cầu khán giả để phục vụ cho công tác định hướng phát triển
          ngành Điện ảnh; trưng bày điện ảnh và tổ chức các hoạt động biểu diễn
          nghệ thuật.
        </span>
      </div>
      <div className=" ">
        <p className="item-center flex justify-center item-center">
          <img
            src="https://www.thiennhien.net/wp-content/uploads/2022/05/170522_ngongvavit.jpg"
            alt=""
            className="item-center mt-10"
            width={600}
          />
        </p>
        <h2 className="flex justify-center item-center text-white">
          Sờ Dồ Vịt chay Bộ
        </h2>
      </div>{" "}
      <div className=" ">
        <p className="item-center flex justify-center item-center">
          <img
            src="https://www.thiennhien.net/wp-content/uploads/2022/05/170522_ngongvavit.jpg"
            alt=""
            className="item-center mt-10"
            width={600}
          />
        </p>
        <h2 className="flex justify-center item-center text-white">
          Sờ Dồ Vịt chay Bộ
        </h2>
      </div>
    </div>
  );
};

export default Introduce;

import React from "react";
import { useAppSelector } from "../../../redux/hook";

type Props = {};

const ListCategories = (props: Props) => {
  const { categories, isErr, isFetching, isSucess } = useAppSelector(
    (state) => state.categoriesReducer
  );
  console.log(categories);

  return <div>List</div>;
};

export default ListCategories;

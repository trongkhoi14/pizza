import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosAdmin from "../../../../api/axiosAdmin";
import axiosClient from "../../../../api/axiosClient";
import ConfirmModal from "../../../../components/Modal/ConfirmModal";
import CategoryList from "./components/CategoryList";
import CategoryModal from "./components/CategoryModal";

export default function AdminCategory() {
  const [openModalCategory, setOpenModalCategory] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCloseModalCategory = () => {
    setOpenModalCategory(false);
    setCategory(null);
  };

  const handleOpenModalCategory = () => {
    setOpenModalCategory(true);
  };

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

  const handleEditBtnClick = (data) => {
    setOpenModalCategory(true);
    setCategory(data);
  };

  const handleDeleteBtnClick = (data) => {
    setOpenModalDelete(true);
    setCategory(data);
  };

  const handleConfirmDelete = async () => {
    try {
      if (category) {
        const res = await axiosAdmin.delete(
          `api/v1/product-category/${category._id}`
        );
        setCategoryList((list) => {
          return list.filter((l) => l._id !== category._id);
        });
        toast.success("Xóa danh mục thành công");
        setCategory(null);
        handleCloseModalDelete();
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const handleOnSubmit = async (e) => {
    try {
      setLoading(true);
      if (!category) {
        const { data } = await axiosAdmin.post("api/v1/product-category", e);
        setCategoryList((list) => [...list, data]);
        toast.success("Thêm danh mục thành công");
      } else {
        await axiosAdmin.put(`api/v1/product-category/${category._id}`, e);
        setCategoryList((list) => {
          return list.map((l) => {
            if (l._id === category._id) {
              return { ...l, ...e };
            }
            return l;
          });
        });
        setCategory(null);
        toast.success("Cập nhật danh mục thành công");
      }
      setLoading(false);
      handleCloseModalCategory();
    } catch (error) {
      setLoading(false);
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axiosAdmin.get("api/v1/product-category");
        setCategoryList(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="mt-5 mx-5 flex flex-col">
      <button
        onClick={handleOpenModalCategory}
        type="button"
        className="ml-auto text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Thêm danh mục
      </button>
      <CategoryList
        handleEditBtnClick={handleEditBtnClick}
        handleDeleteBtnClick={handleDeleteBtnClick}
        data={categoryList}
        loading={loading}
      />
      <CategoryModal
        loading={loading}
        handleOnSubmit={handleOnSubmit}
        onClose={handleCloseModalCategory}
        visible={openModalCategory}
        category={category}
      />
      <ConfirmModal
        content="Hành động này không thể hoàn tác, bạn sẽ bị mất dữ liệu!"
        visible={openModalDelete}
        title="Thông báo xác nhận"
        onClose={handleCloseModalDelete}
        confirmText="Xoá danh mục"
        handleConfirm={handleConfirmDelete}
      />
    </div>
  );
}

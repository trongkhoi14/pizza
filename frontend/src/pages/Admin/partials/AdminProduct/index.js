import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosAdmin from "../../../../api/axiosAdmin";
import axiosClient from "../../../../api/axiosClient";
import ConfirmModal from "../../../../components/Modal/ConfirmModal";
import ProductList from "./components/ProductList";
import ProductModal from "./components/ProductModal";
export default function AdminProduct() {
  const [openModalProduct, setOpenModalProduct] = useState(false);
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [product, setProduct] = useState(null);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sizes, setSizes] = useState(false);

  const handleCloseModalProduct = () => {
    setOpenModalProduct(false);
    setProduct(null);
  };

  const handleOpenModalProduct = () => {
    setOpenModalProduct(true);
  };

  const handleDeleteBtnClick = (data) => {
    setProduct(data);
    setOpenModalDelete(true);
  };
  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
    setProduct(null);
  };

  const handleEditBtnClick = (data) => {
    setProduct(data);
    setOpenModalProduct(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await axiosAdmin.delete(`api/v1/product/${product._id}`);
      setProductList((list) => {
        return list.filter((item) => item._id != product._id);
      });
      setProduct(null);
      toast.success("Xoá sản phẩm thành công");
      handleCloseModalDelete();
    } catch (error) {}
  };

  const handleOnSubmit = async (e, image) => {
    try {
      setLoading(true);
      if (!product) {
        const { data } = await axiosAdmin.post("api/v1/product", e);
        let formData = new FormData();
        formData.append("image", image);
        const { data: productImage } = await axiosAdmin.put(
          `api/v1/product/image/${data._id}`,
          formData,
          {
            headers: { "content-Type": "multipart/form-data" },
          }
        );

        const newData = {
          ...data,
          image: productImage.image,
        };
        setProductList((list) => [...list, newData]);
        toast.success("Thêm sản phẩm thành công");
      } else {
        const { data } = await axiosAdmin.put(
          `api/v1/product/${product._id}`,
          e
        );
        let newData = {
          ...data,
        };
        if (image !== product.image) {
          await axiosAdmin.delete(`api/v1/product/image/${data._id}`);
          let formData = new FormData();
          formData.append("image", image);
          const { data: productImage } = await axiosAdmin.put(
            `api/v1/product/image/${data._id}`,
            formData,
            {
              headers: { "content-Type": "multipart/form-data" },
            }
          );
          newData.image = productImage.image;
        }

        setProductList((list) => {
          return list.map((item) => {
            if (item._id == newData._id) {
              return newData;
            }
            return item;
          });
        });
        toast.success("Cập nhật sản phẩm thành công");
        setProduct(null);
      }
      setLoading(false);
      handleCloseModalProduct();
    } catch (error) {
      setLoading(false);
      toast.error(error?.message);
    }
  };
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axiosAdmin.get("api/v1/product");
        setProductList(data);
        setLoading(false);

        const { data: sizeList } = await axiosAdmin.get("api/v1/size");
        setSizes(sizeList);
      } catch (error) {
        setLoading(false);
      }
    })();

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
    <>
      <div className="flex mt-2">
        <button
          onClick={handleOpenModalProduct}
          type="button"
          className="ml-auto text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Thêm sản phẩm
        </button>
      </div>
      <ProductList
        loading={loading}
        handleDeleteBtnClick={handleDeleteBtnClick}
        data={productList}
        categoryList={categoryList}
        handleEditBtnClick={handleEditBtnClick}
      />
      <ProductModal
        product={product}
        categoryList={categoryList}
        handleOnSubmit={handleOnSubmit}
        onClose={handleCloseModalProduct}
        visible={openModalProduct}
        clearProduct={() => setProduct(null)}
        loading={loading}
        sizes={sizes}
      />
      <ConfirmModal
        loading={loading}
        content="Hành động này không thể hoàn tác, bạn sẽ bị mất dữ liệu!"
        visible={openModalDelete}
        title="Thông báo xác nhận"
        onClose={handleCloseModalDelete}
        confirmText="Xoá sản phẩm"
        handleConfirm={handleConfirmDelete}
      />
    </>
  );
}

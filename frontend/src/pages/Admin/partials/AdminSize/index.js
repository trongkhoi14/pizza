import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosAdmin from "../../../../api/axiosAdmin";
import SizeModal from "./components/SizeModal";
import SizeTable from "./components/SizeTable";

export default function AdminSize() {
  const [sizeList, setSizeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState(null);
  const [openSizeModal, setOpenSizeModal] = useState(false);

  const handleCloseSizeModal = () => {
    setOpenSizeModal(false);
    setSize(null);
  };

  const handleEditBtnClick = (data) => {
    setOpenSizeModal(true);
    setSize(data);
  };

  const handleOnSubmit = async (data) => {
    setLoading(true);
    if (size) {
      // update size
      try {
        const { data: newSize } = await axiosAdmin.put(
          "api/v1/size/" + size._id,
          data
        );
        sizeList.splice(
          sizeList.findIndex((s) => s._id === newSize._id),
          1,
          data
        );
        handleCloseSizeModal();
        setSizeList(sizeList);
        toast.success("Cập nhật size thành công");
      } catch (error) {
        toast.error(error?.message);
      }
    } else {
      // create new size
    }
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await axiosAdmin.get("api/v1/size");
        setSizeList(data);
      } catch (error) {
        toast(error?.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="p-5">
      <div className="flex items-center mb-5">
        <h2 className="text-xl font-semibold capitalize">Sizes</h2>
      </div>
      <SizeTable
        handleEditBtnClick={handleEditBtnClick}
        data={sizeList}
        loading={loading}
      />

      <SizeModal
        loading={loading}
        onSubmit={handleOnSubmit}
        onClose={handleCloseSizeModal}
        visible={openSizeModal}
        size={size}
      />
    </div>
  );
}

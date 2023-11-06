import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import BtnCancel from "../../../../../components/FormFields/BtnCancel";
import BtnSubmit from "../../../../../components/FormFields/BtnSubmit";
import InputField from "../../../../../components/FormFields/InputField";
import ModalContainer from "../../../../../components/Modal/ModalContainer";
import useValidForm from "../../../../../hooks/useValidForm";
export default function CategoryModal({
  loading,
  onClose = null,
  visible,
  handleOnSubmit,
  category = null,
}) {
  const { validCategory } = useValidForm();
  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
    },
    resolver: yupResolver(validCategory),
  });

  const onSubmit = (e) => {
    onSubmit && handleOnSubmit(e);
  };
  useEffect(() => {
    if (category) {
      reset(category);
    }
    return () => {
      reset({
        title: "",
      });
    };
  }, [visible]);

  return (
    <ModalContainer
      className=" !w-[25rem] !h-[15rem]"
      onClose={onClose}
      visible={visible}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-2">
            Tạo danh mục
          </h3>
        </div>
        <div className=" sm:overflow-hidden">
          <div className="px-4 py-4 space-y-6 ">
            <InputField
              error={errors["title"]}
              control={control}
              name="title"
              label="Tên danh mục"
            />
          </div>
        </div>
        <div className=" text-right space-x-6 flex justify-end items-center">
          <BtnCancel onClick={onClose}>Huỷ bỏ</BtnCancel>
          <BtnSubmit loading={loading}>
            {category ? "Cập nhật" : "Lưu"}
          </BtnSubmit>
        </div>
      </form>
    </ModalContainer>
  );
}

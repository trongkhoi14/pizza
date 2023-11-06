import React, { useEffect, useState } from "react";
import ModalContainer from "../../../../../components/Modal/ModalContainer";
import InputField from "../../../../../components/FormFields/InputField";
import TextareaField from "../../../../../components/FormFields/TextareaField";
import OptionFiled from "../../../../../components/FormFields/OptionFiled";
import BtnSubmit from "../../../../../components/FormFields/BtnSubmit";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FileField from "../../../../../components/FormFields/FileField";
import BtnCancel from "../../../../../components/FormFields/BtnCancel";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../../../utils/constant";
import useValidForm from "../../../../../hooks/useValidForm";

const fileTypes = ["JPG", "PNG"];

export default function ProductModal({
  onClose = null,
  visible,
  handleOnSubmit = null,
  categoryList = [],
  product = null,
  loading = false,
  sizes = [],
}) {
  const [file, setFile] = useState(null);
  const { validProduct } = useValidForm();
  const {
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm({
    defaultValues: {
      sizes: [],
      title: "",
      price: "",
      description: "",
      category: "",
      salePercent: "",
      image: {},
    },
    resolver: yupResolver(validProduct),
  });

  const { fields, append, remove } = useFieldArray({
    name: "sizes",
    control,
  });

  const handleRemoveSize = (index) => {
    remove(index);
  };

  const handleAddSize = () => {
    if (outputSize.length < 3) {
      append({
        size: "",
        price: "",
      });
    }
  };
  const handleChangeImg = (file) => {
    setFile(file[0]);
  };

  const handleRemoveImg = (index) => {
    // const newFile = file.filter((_, i) => i !== index);

    setFile(null);
  };

  const onSubmit = (e) => {
    if (!file) return toast.error("Vui lòng ít nhất 1 hình ảnh");
    handleOnSubmit && handleOnSubmit(e, file);
  };
  const outputSize = useWatch({
    name: "sizes",
    control,
  });
  // set initial value edit product
  useEffect(() => {
    if (product) {
      reset({
        ...product,
        category: product.category._id,
        salePercent: product.salePercent ? product.salePercent : "",
        sizes: [
          ...product.sizes.map((s) => {
            return {
              _id: s.size._id,
              price: s.price,
              size: s.size._id,
            };
          }),
        ],
      });
      setFile(product.image);
    }
    return () => {
      reset({
        sizes: [],
        title: "",
        price: "",
        description: "",
        category: "",
        salePercent: "",
      });
      setFile(null);
    };
  }, [visible]);
  return (
    <ModalContainer onClose={onClose} visible={visible}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-2">
            Thêm sản phẩm
          </h3>
        </div>
        <div className=" sm:overflow-hidden">
          <div className="px-4 py-5  space-y-4 sm:p-6">
            <InputField
              error={errors["title"]}
              control={control}
              name="title"
              label="Tên sản phẩm"
              placeholder="Nhập tên sản phẩm...."
            />

            <TextareaField
              error={errors["description"]}
              control={control}
              name="description"
              placeholder="Nhập mô tả...."
              label="Mô tả"
            />

            <InputField
              error={errors["price"]}
              control={control}
              name="price"
              label="Giá"
            />
            <InputField
              error={errors["salePercent"]}
              control={control}
              name="salePercent"
              label="Giảm giá(%)"
            />

            <OptionFiled
              error={errors["category"]}
              name="category"
              label="Danh mục"
              control={control}
              options={categoryList}
            />
            <div className="">
              <button
                onClick={handleAddSize}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Thêm kích cỡ
              </button>
            </div>
            {fields.map((fields, index) => {
              return (
                <div key={fields.id} className="space-y-4 border-[1px] p-2">
                  <OptionFiled
                    error={errors["sizes"] && errors["sizes"][index].size}
                    name={`sizes.${index}.size`}
                    label="Kích cỡ"
                    control={control}
                    options={sizes}
                  />
                  <InputField
                    error={errors["sizes"] && errors["sizes"][index]?.price}
                    name={`sizes.${index}.price`}
                    label="Giá"
                    control={control}
                  />
                  <button
                    onClick={() => handleRemoveSize(index)}
                    type="button"
                    className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Xoá
                  </button>
                </div>
              );
            })}
            <div>
              <FileField
                handleChange={handleChangeImg}
                name="image"
                id="image"
                label="Hình ảnh"
                fileTypes={fileTypes}
              />
              {file && (
                <div className="mt-1 flex items-center flex-wrap justify-center border-[1px]">
                  <ImgItem
                    handleRemoveImg={() => handleRemoveImg()}
                    img={
                      typeof file === "string"
                        ? BASE_URL + file
                        : convertFileToImg(file)
                    }
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end items-center space-x-6">
            <BtnCancel onClick={onClose}>Huỷ bỏ</BtnCancel>
            <BtnSubmit loading={loading}>Lưu</BtnSubmit>
          </div>
        </div>
      </form>
    </ModalContainer>
  );
}

const ImgItem = ({ img, handleRemoveImg }) => {
  return (
    <div className="relative w-56 h-56 mx-4 py-2 ">
      <img className="w-full h-full" src={img} alt="" />
      <span
        onClick={handleRemoveImg}
        className="absolute top-0 -right-1 translate-y-3 w-[20px] h-[20px] text-xs font-semibold bg-[crimson] flex justify-center items-baseline cursor-pointer hover:opacity-90 text-white rounded-full"
      >
        x
      </span>
    </div>
  );
};

const convertFileToImg = (file) => {
  return URL.createObjectURL(file);
};

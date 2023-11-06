import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import BtnCancel from "../../../../../components/FormFields/BtnCancel";
import BtnSubmit from "../../../../../components/FormFields/BtnSubmit";
import InputField from "../../../../../components/FormFields/InputField";
import ModalContainer from "../../../../../components/Modal/ModalContainer";
import useValidForm from "../../../../../hooks/useValidForm";

export default function SizeModal({
  onClose = null,
  visible,
  loading = false,
  onSubmit = null,
  size = null,
}) {
  const { validSize } = useValidForm();
  const {
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      diameter: "",
    },
    resolver: yupResolver(validSize),
  });

  useEffect(() => {
    if (size) {
      reset({
        ...size,
      });
    }
    return () => {
      reset({
        title: "",
        description: "",
        diameter: "",
      });
    };
  }, [visible]);

  return (
    <ModalContainer ignoreContainer onClose={onClose} visible={visible}>
      <div className="bg-white rounded max-w-xl w-full overflow-auto p-4 mx-8 max-h-[80vh]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-2">
              {size ? "Cập nhật" : "Thêm mới"}
            </h3>
          </div>
          <div className="overflow-hidden">
            <div className="py-5 space-y-4 px-4">
              <InputField
                error={errors["title"]}
                control={control}
                name="title"
                label="Tên size"
                placeholder="Nhập tên size (M, L, XL)"
              />

              <InputField
                control={control}
                name="description"
                label="Mô tả"
                placeholder="Nhập mô tả (nếu có)"
              />

              <InputField
                control={control}
                name="diameter"
                label="Đường kính"
                placeholder="Nhập dường kính (nếu có)"
              />
            </div>
            <div className="px-4 flex justify-end items-center space-x-6">
              <BtnCancel onClick={onClose}>Huỷ bỏ</BtnCancel>
              <BtnSubmit loading={loading}>Lưu</BtnSubmit>
            </div>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
}

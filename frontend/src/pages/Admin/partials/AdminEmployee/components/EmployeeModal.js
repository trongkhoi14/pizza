import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import BtnCancel from "../../../../../components/FormFields/BtnCancel";
import BtnSubmit from "../../../../../components/FormFields/BtnSubmit";
import InputField from "../../../../../components/FormFields/InputField";
import ModalContainer from "../../../../../components/Modal/ModalContainer";
import useValidForm from "../../../../../hooks/useValidForm";

export default function EmployeeModal({
  onClose = null,
  visible,
  loading = false,
  onSubmit = null,
  employee = null,
  employeeType = "",
}) {
  const { validEmployee } = useValidForm();
  const {
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm({
    defaultValues: {
      name: "",
      mobile: "",
      email: "",
      password: "",
      // birthday: "",
      // startDate: "",
      // endDate: "",
    },
    resolver: yupResolver(validEmployee),
  });

  useEffect(() => {
    if (employee) {
      reset({
        ...employee,
      });
    }
    return () => {
      reset({
        name: "",
        mobile: "",
        password: "",
        email: "",
        // birthday: "",
        // startDate: "",
        // endDate: "",
      });
    };
  }, [visible]);

  return (
    <ModalContainer ignoreContainer onClose={onClose} visible={visible}>
      <div className="bg-white rounded max-w-xl w-full overflow-auto p-4 mx-8 max-h-[80vh]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-2">
              Thêm {employeeType}
            </h3>
          </div>
          <div className="overflow-hidden">
            <div className="py-5 space-y-4 px-4">
              <InputField
                error={errors["name"]}
                control={control}
                name="name"
                label="Họ tên"
                placeholder="Nhập họ tên ..."
              />

              <InputField
                error={errors["mobile"]}
                control={control}
                name="mobile"
                label="Số điện thoại"
                placeholder="Nhập số điện thoại..."
              />

              <InputField
                error={errors["email"]}
                control={control}
                name="email"
                label="Email"
                placeholder="Nhập email ..."
              />

              <InputField
                type="password"
                error={errors["password"]}
                control={control}
                name="password"
                label="Mật khẩu"
                placeholder="Nhập mật khẩu ..."
              />

              {/* <InputField
								type="date"
								error={errors["birthday"]}
								control={control}
								name="birthday"
								label="Ngày sinh"
							/> */}

              {/* <div className="flex flex-col md:flex-row space-y-3 md:space-x-6 md:space-y-0">
								<div className="w-full">
									<InputField
										type="date"
										error={errors["startDate"]}
										control={control}
										name="startDate"
										label="Ngày bắt đầu"
									/>
								</div>

								<div className="w-full">
									<InputField
										type="date"
										error={errors["endDate"]}
										control={control}
										name="endDate"
										label="Ngày kết thúc"
									/>
								</div>
							</div> */}
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

import { yupResolver } from "@hookform/resolvers/yup";
import { unwrapResult } from "@reduxjs/toolkit";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BtnSubmit from "../../../../components/FormFields/BtnSubmit";
import InputField from "../../../../components/FormFields/InputField";
import { actionLogin } from "../../../../redux/slice/employeeSlice";
import useValidForm from "../../../../hooks/useValidForm";

export default function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { validLogin } = useValidForm();
  const [loading, setLoading] = useState(false);
  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    defaultValues: {
      mobile: "",
      password: "",
    },
    resolver: yupResolver(validLogin),
  });
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await dispatch(actionLogin(data));
      unwrapResult(res);
      setLoading(false);
      reset();
      navigate("/admin", { replace: true });
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 relative flex items-center justify-center">
      <div className="w-full relative z-10 max-w-xl">
        <div className="flex flex-col items-start justify-center p-10 bg-white shadow-2xl rounded-xl relative z-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full mt-3 mr-0 mb-0 ml-0 relative space-y-8"
          >
            <div className="relative">
              <InputField
                control={control}
                id="mobile"
                name="mobile"
                label={"Số điện thoại"}
                error={errors["mobile"]}
              />
            </div>
            <div className="relative">
              <InputField
                control={control}
                id="password"
                name="password"
                label={"Mật khẩu"}
                error={errors["password"]}
                type="password"
              />
            </div>
            <div className="relative">
              <BtnSubmit loading={loading} className="w-full">
                Đăng nhập
              </BtnSubmit>
            </div>
          </form>
          <div className="flex w-full justify-between pt-2">
            <div className="text-sm">
              <Link
                to="/"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Quên mật khẩu?
              </Link>
            </div>
          </div>
        </div>
        <svg
          viewBox="0 0 91 91"
          className="absolute top-0 left-0 z-0 w-32 h-32 -mt-12 -ml-12 text-green-500
                fill-current"
        >
          <g stroke="none" strokeWidth="1" fillRule="evenodd">
            <g fillRule="nonzero">
              <g>
                <g>
                  <circle cx="3.261" cy="3.445" r="2.72" />
                  <circle cx="15.296" cy="3.445" r="2.719" />
                  <circle cx="27.333" cy="3.445" r="2.72" />
                  <circle cx="39.369" cy="3.445" r="2.72" />
                  <circle cx="51.405" cy="3.445" r="2.72" />
                  <circle cx="63.441" cy="3.445" r="2.72" />
                  <circle cx="75.479" cy="3.445" r="2.72" />
                  <circle cx="87.514" cy="3.445" r="2.719" />
                </g>
                <g transform="translate(0 12)">
                  <circle cx="3.261" cy="3.525" r="2.72" />
                  <circle cx="15.296" cy="3.525" r="2.719" />
                  <circle cx="27.333" cy="3.525" r="2.72" />
                  <circle cx="39.369" cy="3.525" r="2.72" />
                  <circle cx="51.405" cy="3.525" r="2.72" />
                  <circle cx="63.441" cy="3.525" r="2.72" />
                  <circle cx="75.479" cy="3.525" r="2.72" />
                  <circle cx="87.514" cy="3.525" r="2.719" />
                </g>
                <g transform="translate(0 24)">
                  <circle cx="3.261" cy="3.605" r="2.72" />
                  <circle cx="15.296" cy="3.605" r="2.719" />
                  <circle cx="27.333" cy="3.605" r="2.72" />
                  <circle cx="39.369" cy="3.605" r="2.72" />
                  <circle cx="51.405" cy="3.605" r="2.72" />
                  <circle cx="63.441" cy="3.605" r="2.72" />
                  <circle cx="75.479" cy="3.605" r="2.72" />
                  <circle cx="87.514" cy="3.605" r="2.719" />
                </g>
                <g transform="translate(0 36)">
                  <circle cx="3.261" cy="3.686" r="2.72" />
                  <circle cx="15.296" cy="3.686" r="2.719" />
                  <circle cx="27.333" cy="3.686" r="2.72" />
                  <circle cx="39.369" cy="3.686" r="2.72" />
                  <circle cx="51.405" cy="3.686" r="2.72" />
                  <circle cx="63.441" cy="3.686" r="2.72" />
                  <circle cx="75.479" cy="3.686" r="2.72" />
                  <circle cx="87.514" cy="3.686" r="2.719" />
                </g>
                <g transform="translate(0 49)">
                  <circle cx="3.261" cy="2.767" r="2.72" />
                  <circle cx="15.296" cy="2.767" r="2.719" />
                  <circle cx="27.333" cy="2.767" r="2.72" />
                  <circle cx="39.369" cy="2.767" r="2.72" />
                  <circle cx="51.405" cy="2.767" r="2.72" />
                  <circle cx="63.441" cy="2.767" r="2.72" />
                  <circle cx="75.479" cy="2.767" r="2.72" />
                  <circle cx="87.514" cy="2.767" r="2.719" />
                </g>
                <g transform="translate(0 61)">
                  <circle cx="3.261" cy="2.846" r="2.72" />
                  <circle cx="15.296" cy="2.846" r="2.719" />
                  <circle cx="27.333" cy="2.846" r="2.72" />
                  <circle cx="39.369" cy="2.846" r="2.72" />
                  <circle cx="51.405" cy="2.846" r="2.72" />
                  <circle cx="63.441" cy="2.846" r="2.72" />
                  <circle cx="75.479" cy="2.846" r="2.72" />
                  <circle cx="87.514" cy="2.846" r="2.719" />
                </g>
                <g transform="translate(0 73)">
                  <circle cx="3.261" cy="2.926" r="2.72" />
                  <circle cx="15.296" cy="2.926" r="2.719" />
                  <circle cx="27.333" cy="2.926" r="2.72" />
                  <circle cx="39.369" cy="2.926" r="2.72" />
                  <circle cx="51.405" cy="2.926" r="2.72" />
                  <circle cx="63.441" cy="2.926" r="2.72" />
                  <circle cx="75.479" cy="2.926" r="2.72" />
                  <circle cx="87.514" cy="2.926" r="2.719" />
                </g>
                <g transform="translate(0 85)">
                  <circle cx="3.261" cy="3.006" r="2.72" />
                  <circle cx="15.296" cy="3.006" r="2.719" />
                  <circle cx="27.333" cy="3.006" r="2.72" />
                  <circle cx="39.369" cy="3.006" r="2.72" />
                  <circle cx="51.405" cy="3.006" r="2.72" />
                  <circle cx="63.441" cy="3.006" r="2.72" />
                  <circle cx="75.479" cy="3.006" r="2.72" />
                  <circle cx="87.514" cy="3.006" r="2.719" />
                </g>
              </g>
            </g>
          </g>
        </svg>
        <svg
          viewBox="0 0 91 91"
          className="absolute bottom-0 right-0 z-0 w-32 h-32 -mb-12 -mr-12 text-yellow-500
                fill-current"
        >
          <g stroke="none" strokeWidth="1" fillRule="evenodd">
            <g fillRule="nonzero">
              <g>
                <g>
                  <circle cx="3.261" cy="3.445" r="2.72" />
                  <circle cx="15.296" cy="3.445" r="2.719" />
                  <circle cx="27.333" cy="3.445" r="2.72" />
                  <circle cx="39.369" cy="3.445" r="2.72" />
                  <circle cx="51.405" cy="3.445" r="2.72" />
                  <circle cx="63.441" cy="3.445" r="2.72" />
                  <circle cx="75.479" cy="3.445" r="2.72" />
                  <circle cx="87.514" cy="3.445" r="2.719" />
                </g>
                <g transform="translate(0 12)">
                  <circle cx="3.261" cy="3.525" r="2.72" />
                  <circle cx="15.296" cy="3.525" r="2.719" />
                  <circle cx="27.333" cy="3.525" r="2.72" />
                  <circle cx="39.369" cy="3.525" r="2.72" />
                  <circle cx="51.405" cy="3.525" r="2.72" />
                  <circle cx="63.441" cy="3.525" r="2.72" />
                  <circle cx="75.479" cy="3.525" r="2.72" />
                  <circle cx="87.514" cy="3.525" r="2.719" />
                </g>
                <g transform="translate(0 24)">
                  <circle cx="3.261" cy="3.605" r="2.72" />
                  <circle cx="15.296" cy="3.605" r="2.719" />
                  <circle cx="27.333" cy="3.605" r="2.72" />
                  <circle cx="39.369" cy="3.605" r="2.72" />
                  <circle cx="51.405" cy="3.605" r="2.72" />
                  <circle cx="63.441" cy="3.605" r="2.72" />
                  <circle cx="75.479" cy="3.605" r="2.72" />
                  <circle cx="87.514" cy="3.605" r="2.719" />
                </g>
                <g transform="translate(0 36)">
                  <circle cx="3.261" cy="3.686" r="2.72" />
                  <circle cx="15.296" cy="3.686" r="2.719" />
                  <circle cx="27.333" cy="3.686" r="2.72" />
                  <circle cx="39.369" cy="3.686" r="2.72" />
                  <circle cx="51.405" cy="3.686" r="2.72" />
                  <circle cx="63.441" cy="3.686" r="2.72" />
                  <circle cx="75.479" cy="3.686" r="2.72" />
                  <circle cx="87.514" cy="3.686" r="2.719" />
                </g>
                <g transform="translate(0 49)">
                  <circle cx="3.261" cy="2.767" r="2.72" />
                  <circle cx="15.296" cy="2.767" r="2.719" />
                  <circle cx="27.333" cy="2.767" r="2.72" />
                  <circle cx="39.369" cy="2.767" r="2.72" />
                  <circle cx="51.405" cy="2.767" r="2.72" />
                  <circle cx="63.441" cy="2.767" r="2.72" />
                  <circle cx="75.479" cy="2.767" r="2.72" />
                  <circle cx="87.514" cy="2.767" r="2.719" />
                </g>
                <g transform="translate(0 61)">
                  <circle cx="3.261" cy="2.846" r="2.72" />
                  <circle cx="15.296" cy="2.846" r="2.719" />
                  <circle cx="27.333" cy="2.846" r="2.72" />
                  <circle cx="39.369" cy="2.846" r="2.72" />
                  <circle cx="51.405" cy="2.846" r="2.72" />
                  <circle cx="63.441" cy="2.846" r="2.72" />
                  <circle cx="75.479" cy="2.846" r="2.72" />
                  <circle cx="87.514" cy="2.846" r="2.719" />
                </g>
                <g transform="translate(0 73)">
                  <circle cx="3.261" cy="2.926" r="2.72" />
                  <circle cx="15.296" cy="2.926" r="2.719" />
                  <circle cx="27.333" cy="2.926" r="2.72" />
                  <circle cx="39.369" cy="2.926" r="2.72" />
                  <circle cx="51.405" cy="2.926" r="2.72" />
                  <circle cx="63.441" cy="2.926" r="2.72" />
                  <circle cx="75.479" cy="2.926" r="2.72" />
                  <circle cx="87.514" cy="2.926" r="2.719" />
                </g>
                <g transform="translate(0 85)">
                  <circle cx="3.261" cy="3.006" r="2.72" />
                  <circle cx="15.296" cy="3.006" r="2.719" />
                  <circle cx="27.333" cy="3.006" r="2.72" />
                  <circle cx="39.369" cy="3.006" r="2.72" />
                  <circle cx="51.405" cy="3.006" r="2.72" />
                  <circle cx="63.441" cy="3.006" r="2.72" />
                  <circle cx="75.479" cy="3.006" r="2.72" />
                  <circle cx="87.514" cy="3.006" r="2.719" />
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

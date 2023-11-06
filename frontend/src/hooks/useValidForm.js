import React from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

export default function useValidForm() {
  const { t } = useTranslation();

  const validCategory = yup.object().shape({
    title: yup.string().required("Tên danh mục không được bỏ trống"),
  });

  const sizeSchema = {
    size: yup.string().required("Kích cở không được bỏ trống"),
    price: yup
      .number()
      .required("Giá sản phẩm không được bỏ trống")
      .transform((value) =>
        isNaN(value) || value === null || value === undefined ? 0 : value
      )
      .test("test-num", "Giá tiền phải lớn hơn 0", (value) => value > 0),
  };

  const validProduct = yup.object().shape({
    title: yup.string().required("Tên sản phẩm không được bỏ trống"),
    price: yup
      .number()
      .required("Giá sản phẩm không được bỏ trống")
      .transform((value) =>
        isNaN(value) || value === null || value === undefined ? 0 : value
      )
      .test("test-num", "Giá tiền phải lớn hơn 0", (value) => value > 0),
    salePercent: yup
      .number()
      .transform((value) =>
        isNaN(value) || value === null || value === undefined ? 0 : value
      )
      .test("test-num", "Giá giảm phải bé hơn 100%", (value) => +value <= 100),
    description: yup.string().required("Mô tả không được bỏ trống"),
    category: yup.string().required("Danh mục không được bỏ trống"),
    sizes: yup.array().of(yup.object().shape(sizeSchema)),
  });

  const validLogin = yup.object().shape({
    mobile: yup
      .string()
      .required(t("content.phone-not-empty"))
      .test(
        "Phone number format",
        t("content.phone-not-in-correct"),
        (value) => {
          return value.match(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g);
        }
      ),
    password: yup.string().required(t("content.password-not-empty")),
  });

  const validRegister = yup.object().shape({
    email: yup
      .string()
      .required(t("content.email-not-empty"))
      .email(t("content.email-not-in-correct")),
    password: yup
      .string()
      .required(t("content.password-not-empty"))
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[_@$!%*?&\\.])[A-Za-z\d_@$!%*?&\\.]{8,20}$/,
        t("content.password-format")
      ),
    retypePassword: yup
      .string()
      .required(t("content.re-password"))
      .oneOf([yup.ref("password")], t("content.password-not-match")),
    name: yup
      .string()
      .required(t("content.name-not-empty"))
      .test("Username at least 2 words", t("content.name-2-words"), (value) => {
        return value.split(" ").length >= 2;
      }),
    // address: yup.string().required("Địa chỉ không được bỏ trống"),
    mobile: yup
      .string()
      .required(t("content.phone-not-empty"))
      .test(
        "Phone number format",
        t("content.phone-not-in-correct"),
        (value) => {
          return value.match(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g);
        }
      ),
    // birthday: yup.string().required("Ngày sinh không được bỏ trống"),
  });

  const validEmployee = yup.object().shape(
    {
      name: yup
        .string()
        .required("Tên nhân viên không được bỏ trống")
        .test(
          "Tên nhân viên tối thiểu 2 từ",
          "Tên nhân viên tối thiểu 2 từ",
          (value) => {
            return value.split(" ").length >= 2;
          }
        ),
      mobile: yup.string().required("Số điện thoại không được bỏ trống"),
      password: yup.string().required("Mật khẩu không được bỏ trống"),
      // startDate: yup
      // 	.date()
      // 	.nullable()
      // 	.transform((value) => (value instanceof Date && !isNaN(value) ? value : null))
      // 	.when("endDate", {
      // 		is: (endDate) => endDate !== null,
      // 		then: (schema) => schema.required("Vui lòng chọn ngày bắt đầu"),
      // 	}),
      // endDate: yup
      // 	.date()
      // 	.nullable()
      // 	.transform((value) => (value instanceof Date && !isNaN(value) ? value : null))
      // 	.when("startDate", {
      // 		is: (startDate) => startDate !== null,
      // 		then: (schema) =>
      // 			schema.min(yup.ref("startDate"), "Ngày kết thúc phải lớn hơn ngày bắt đầu"),
      // 	}),
    }
    // ["startDate", "endDate"],
  );

  const validCheckout = yup.object().shape({
    name: yup.string().required(t("content.name-not-empty")),
    payment: yup
      .string()
      .required(t("content.payment-method-not-empty")),
    method: yup.string().required(t("content.delivery-method-not-empty")),
    time: yup.string().required(t("content.delivery-time-not-empty")),
    address: yup.string().required(t("content.address-not-empty")),
    mobile: yup
      .string()
      .required(t("content.phone-not-empty"))
      .test(
        "Phone number format",
        t("content.phone-not-in-correct"),
        (value) => {
          return value.match(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g);
        }
      ),
    email: yup
      .string()
      .required(t("content.email-not-empty"))
      .email(t("content.email-not-in-correct")),
    hour: yup.string().when("time", {
      is: (time) => time === "today",
      then: (schema) => schema.required(t("content.select-time")),
    }),
  });

  const validSize = yup.object().shape({
    title: yup
      .string()
      .transform((value) => value.toLowerCase())
      .required("Vui lòng nhập tên size")
      .test("checkSize", "Size phải là XL, L hoặc M", (value) => {
        return ["xl", "l", "m"].includes(value);
      }),
  });

  return { validLogin, validRegister, validCheckout,validSize,validEmployee, validProduct, validCategory };
}

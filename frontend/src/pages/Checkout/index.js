import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosClient from "../../api/axiosClient";
import CartSummary from "../../components/Cart/CartSummary";
import InputField from "../../components/FormFields/InputField";
import OptionFiled from "../../components/FormFields/OptionFiled";
import RadioField from "../../components/FormFields/RadioField";
import TextareaField from "../../components/FormFields/TextareaField";
import ModalContainer from "../../components/Modal/ModalContainer";
import useValidForm from "../../hooks/useValidForm";
import cartSlice, { selectCartSummary } from "../../redux/slice/cartSlice";
import { calculateHoursDelivery, calculateTimeLine } from "../../utils/Utils";

const Widget = ({ children, title }) => {
  return (
    <div className="p-4 h-full">
      <div className="p-6 bg-white shadow-xl rounded-md h-full">
        <div className="relative mb-5">
          <div className="relative z-20 inline-block bg-white pr-3 text-lg text-light-blue font-bold">
            {title}
          </div>
          <div className="absolute z-10 top-1/2 w-full h-0.5 rounded-full bg-light-blue"></div>
        </div>
        <div className="space-y-3">{children}</div>
      </div>
    </div>
  );
};

export default function Checkout() {
  const { info: userInfo } = useSelector((state) => state.user);
  const { products = [] } = useSelector((state) => state.cart);
  const [displayHour, setDisplayHour] = useState(false);
  const [displayModalSuccess, setDisplayModalSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const summary = useSelector(selectCartSummary);
  const [displayModalExpired, setDisplayModalExpired] = useState(false);
  const [optionAddress, setOptionAddress] = useState(false);
  const dispatch = useDispatch();
  const { t,i18n } = useTranslation();
  const { validCheckout } = useValidForm();

  const navigate = useNavigate();

  const payments = useMemo(() => {
    return [
      {
        title: t("content.cash"),
        value: "cod",
        image: "images/cod.png",
      },
      // {
      //   title: "Momo",
      //   value: "momo",
      //   image: "images/momo.png",
      // },
      // {
      //   title: "Zalopay",
      //   value: "zalopay",
      //   image: "images/zalopay.png",
      // },
      // {
      //   title: "ATM/VISA",
      //   value: "atm/visa",
      //   image: "images/visa.png",
      // },
    ];
  }, [i18n.resolvedLanguage]);

  const time = useMemo(() => {
    return [
      {
        _id: "better",
        title: t("content.the-sooner-the-better"),
      },
      {
        _id: "today",
        title: t("content.today"),
      },
    ];
  }, [i18n.resolvedLanguage]);

  const method = useMemo(() => {
    return [
      {
        title: t("content.home-delivery"),
        value: "homedelivery",
      },
      {
        title: t("content.pickup"),
        value: "takeaway",
      },
    ];
  },[i18n.resolvedLanguage]);

  const addressStore = useMemo(() => {
    return [
      {
        _id: t("content.address-1"),
        title: t("content.address-1"),
      },
    ];
  },[i18n.resolvedLanguage]);

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      address: "",
      note: "",
      name: "",
      mobile: "",
      email: "",
      method: "",
      payment: "",
      time: "",
      hour: "",
    },
    resolver: yupResolver(validCheckout),
  });

  const handleCloseModalSuccess = () => {
    setDisplayModalSuccess(false);
    navigate("/menu", { replace: true });
  };

  const handleCloseModalExpired = () => {
    setDisplayModalSuccess(false);
    navigate("/menu", { replace: true });
  };

  const outputTime = useWatch({
    name: "time",
    control,
  });

  const outputDelivery = useWatch({
    name: "method",
    control,
  });
  useEffect(() => {
    const endTime = moment("3:31", "HH:mm");
    const startTime = moment("09:59", "HH:mm");
    const currentTime = moment(moment(), "HH:mm");
    
    if (currentTime.isBetween(endTime, startTime)) {
      setDisplayModalExpired(true);
    }
    
    if (!products?.length && displayModalSuccess !== true) {
      navigate("/menu", { replace: true });
    }
    

    if (outputDelivery === "takeaway") {
      setOptionAddress(true);
    } else {
      setOptionAddress(false);
      setValue("address", "");
    }
  }, [userInfo, outputDelivery]);

  useEffect(() => {
    if (outputTime === "today") {
      setDisplayHour(true);
    } else {
      setDisplayHour(false);
    }
  }, [outputTime]);

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });

    if (Object.keys(userInfo)?.length) {
      setValue("name", userInfo.name);
      setValue("email", userInfo.email);
      setValue("mobile", userInfo.mobile);
    }

    return () => {
      reset({
        address: "",
        note: "",
        name: "",
        mobile: "",
        email: "",
        method: "",
        payment: "",
        time: "",
        hour: "",
      });
    };
  }, []);
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      let newData = {};
      if (data.time === "better") {
        newData.method = {
          name: data.method,
          hour: calculateHoursDelivery() + "",
        };
      } else {
        newData.method = {
          name: data.method,
          hour: data.hour,
        };
      }
      newData.payment = {
        type: data.payment,
      };
      newData.address = data.address;
      newData.note = data.note;
      newData.name = data.name;
      newData.email = data.email;
      newData.mobile = data.mobile;
      newData.shippingFee = 22000;
      newData.cart = products.map((product) => {
        return {
          _id: product._id,
          quantity: product.quantity,
          size: product?.size?._id || "",
        };
      });
      const { status } = await axiosClient.post("api/v1/order", newData);
      if (status) {
        setDisplayModalSuccess(true);
        setLoading(false);
        dispatch(cartSlice.actions.clearState());
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.message);
    }
  };

  return (
    <>
      <div className="2xl:container 2xl:mx-auto bg-gray-100">
        <div className="flex flex-col h-full lg:px-20 md:px-6 p-6">
          <div className="mb-3 text-2xl text-center md:text-left uppercase font-bold">
            {t("content.payment")}
          </div>

          <form
            className="flex flex-wrap -mx-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="w-full md:w-1/2">
              <Widget title={t("content.contact-info")}>
                <InputField
                  error={errors["name"]}
                  control={control}
                  id="name"
                  name="name"
                  label={t("content.name")}
                />
                <InputField
                  error={errors["mobile"]}
                  control={control}
                  id="mobile"
                  name="mobile"
                  label={t("content.phone")}
                />
                <InputField
                  error={errors["email"]}
                  control={control}
                  id="email"
                  name="email"
                  label="Email"
                />
              </Widget>
            </div>
            <div className="w-full md:w-1/2">
              <Widget title={t("content.shipping-address")}>
                <RadioField
                  error={errors["method"]}
                  options={method}
                  control={control}
                  name="method"
                  label={t("content.shipping-method")}
                />
                {!optionAddress ? (
                  <InputField
                    error={errors["address"]}
                    control={control}
                    id="address"
                    name="address"
                    label={t("content.address")}
                  />
                ) : (
                  <OptionFiled
                    error={errors["address"]}
                    control={control}
                    label={t("content.address")}
                    name="address"
                    options={addressStore}
                  />
                )}
                <TextareaField
                  control={control}
                  id="note"
                  name="note"
                  label={t("content.note")}
                />
              </Widget>
            </div>

            {/* <div className="w-full md:w-1/2">
              <Widget title={t("content.shipping-method")}>
                <RadioField
                  error={errors["method"]}
                  options={method}
                  control={control}
                  name="method"
                />
              </Widget>
            </div> */}

            <div className="w-full md:w-1/2">
              <Widget title={t("content.delivery-time")}>
                <OptionFiled
                  error={errors["time"]}
                  control={control}
                  name="time"
                  options={time}
                />

                <div className={displayHour ? "block" : "hidden"}>
                  <OptionFiled
                    error={errors["hour"]}
                    name="hour"
                    label={t("content.hours")}
                    control={control}
                    options={calculateTimeLine()}
                  />
                </div>
              </Widget>
            </div>

            <div className="w-full md:w-1/2">
              <Widget title={t("content.payment-method")}>
                {/* <Payment /> */}
                <RadioField
                  error={errors["payment"]}
                  control={control}
                  name="payment"
                  options={payments}
                />
              </Widget>
            </div>
            <div className="flex justify-end sticky md:static pt-4 bottom-0 bg-gray-100 w-full z-30">
              <div className="lg:max-w-md w-full space-y-2 text-base md:text-lg">
                <CartSummary
                  loading={loading}
                  summary={summary}
                  isCheckout={true}
                  shipping={
                    outputDelivery === "takeaway" || !outputDelivery ? 0 : 22000
                  }
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <ModalContainer
        ignoreContainer={true}
        visible={displayModalSuccess}
        onClose={handleCloseModalSuccess}
      >
        <div className="bg-white p-6  md:mx-auto rounded transition">
          <svg
            viewBox="0 0 24 24"
            className="text-green-600 w-16 h-16 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
              {t("content.order-success")}
            </h3>
            <p className="text-gray-600 my-2">
              {t("content.order-success-info")}
            </p>

            <div className="py-10 text-center w-full">
              <Link
                to="/"
                className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded"
              >
                {t("content.go-back")}
              </Link>
            </div>
          </div>
        </div>
      </ModalContainer>

      <ModalContainer
        ignoreContainer={true}
        visible={displayModalExpired}
        onClose={handleCloseModalExpired}
      >
        <div className="bg-white p-6  md:mx-auto rounded transition">
          <svg
            viewBox="0 0 24 24"
            className="text-red-600 w-16 h-16 mx-auto my-6"
            fill="none"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            ></path>
          </svg>

          <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
              {t("content.notification")}
            </h3>
            <p className="text-gray-600 my-2">{t("content.shop-off")}</p>

            <div className="py-10 text-center w-full">
              <Link
                to="/"
                className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded"
              >
                {t("content.go-back")}
              </Link>
            </div>
          </div>
        </div>
      </ModalContainer>
    </>
  );
}

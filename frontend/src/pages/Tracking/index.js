import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import BtnSubmit from "../../components/FormFields/BtnSubmit";
import InputField from "../../components/FormFields/InputField";
import {
  MdOutlinePendingActions,
  MdOutlineDeliveryDining,
} from "react-icons/md";
import { FaPizzaSlice } from "react-icons/fa";
import { BiHappyBeaming } from "react-icons/bi";
import axiosClient from "../../api/axiosClient";
import { toast } from "react-toastify";
import DetailsModal from "./components/DetailsModal";
import moment from "moment";

const progress = {
  pending: {
    id: 0,
    width: "md:w-0",
    height: "0",
  },
  preparing: {
    id: 1,
    width: "md:w-1/3",
    height: "h-1/3",
  },
  delivering: {
    id: 2,
    width: "md:w-2/3",
    height: "h-2/3",
  },
  delivered: {
    id: 3,
    width: "md:w-[99%]",
    height: "h-[99%]",
  },
};

const progressElement = [
  {
    title: "pending",
    Icon: MdOutlinePendingActions,
  },
  {
    title: "preparing",
    Icon: FaPizzaSlice,
  },
  {
    title: "delivering",
    Icon: MdOutlineDeliveryDining,
  },
  {
    title: "delivered",
    Icon: BiHappyBeaming,
  },
];

export default function Tracking() {
  const { t } = useTranslation();
  const [order, setOrder] = useState(null);
  const [openOrderModal, setOpenOrderModal] = useState(false);

  const {
    formState: { errors },
    control,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const handleOpenOrderModal = () => {
    setOpenOrderModal(true);
  };

  const handleCloseOrderModal = () => {
    setOpenOrderModal(false);
  };

  const onSubmit = async ({ search }) => {
    try {
      const { status, data } = await axiosClient.get(
        "api/v1/order/search?p=" + encodeURIComponent(search)
      );
      if (status){
        setOrder(data)
      } 
      else {

        toast.error(t("content.order-notfound"));

      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const currentProgress =
    progress[`${order?.status}`] || progress[Object.keys(progress)[0]];

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <div className="2xl:container 2xl:mx-auto bg-gray-100 md:pb-10">
        <div className="flex flex-col h-full lg:px-20 md:px-6 p-6">
          <div className="mb-3 text-2xl text-center uppercase font-bold">
            {t("content.order_tracking")}
          </div>
          {/* form */}
          <div className="max-w-4xl w-full mx-auto">
            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
              <InputField
                name="search"
                id="search"
                control={control}
                error={errors["search"]}
                placeholder={t("content.phone-orderId")}
              />
              <BtnSubmit className="w-full bg-light-blue hover:bg-light-blue/75">
                {t("content.search")}
              </BtnSubmit>
            </form>
          </div>
          {/* tracking infor */}
          {order && (
            <div className="max-w-4xl mx-auto w-full">
              <div className="flex justify-between my-3">
                <div className="text-lg font-bold">Trạng thái đơn hàng</div>
                <div
                  onClick={handleOpenOrderModal}
                  className="rounded-full bg-light-teal px-5 py-1.5 font-semibold text-sm underline cursor-pointer hover:bg-light-teal/80"
                >
                  {order.orderId}
                </div>
              </div>

              <div className="relative">
                {/* overlays */}
                <div className="absolute top-0 left-8 bottom-0 h-full w-1 md:left-0 md:right-0 md:top-8 md:w-[99%] md:h-1 bg-gray-300"></div>
                {/* progress */}
                <div
                  className={`absolute top-0 left-8 bottom-0  ${
                    order.method?.name === "takeaway" &&
                    currentProgress.id === 1
                      ? "h-2/4"
                      : currentProgress.height
                  } w-1 md:left-0 md:right-0 md:top-8 ${
                    order.method?.name === "takeaway" &&
                    currentProgress.id === 1
                      ? "md:w-1/2"
                      : currentProgress.width
                  } md:h-1 bg-orange-400`}
                ></div>
                <div className="flex flex-col w-full md:flex-row justify-between space-y-8 md:space-y-0 ">
                  {progressElement.map(({ title, Icon }, i) => {
                    if (
                      order.method?.name === "takeaway" &&
                      title === "delivering"
                    )
                      return;
                    return (
                      <div
                        key={i}
                        className="relative flex flex-row md:flex-col items-center space-x-3 md:space-x-0 md:space-y-2"
                      >
                        <div
                          className={`w-16 h-16 shrink-0 flex items-center justify-center ${
                            currentProgress.id >= i
                              ? "bg-orange-400 text-white"
                              : "bg-gray-300"
                          } rounded-full`}
                        >
                          <Icon size={28} />
                        </div>
                        <div className="w-full flex flex-row md:flex-col justify-between items-center md:space-y-1 md:justify-center">
                          <div className="text-gray-600 text-sm capitalize">
                            {title}
                          </div>
                          {title === "pending" ? (
                            <div className="md:absolute md:text-center top-full left-1/2 -translate-x-1/2 text-gray-600 text-xs font-bold">
                              {moment(order.createdAt).format(
                                "DD/MM/YYYY HH:mm"
                              )}
                            </div>
                          ) : order.status === title ? (
                            <div className="md:absolute md:text-center top-full left-1/2 -translate-x-1/2 text-gray-600 text-xs font-bold">
                              {moment(order.updatedAt).format(
                                "DD/MM/YYYY HH:mm"
                              )}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* <div className="relative flex flex-row md:flex-col items-center space-x-3 md:space-x-0 md:space-y-2">
                    <div className="w-16 h-16 shrink-0 flex items-center justify-center bg-orange-400 text-white rounded-full">
                      <FaPizzaSlice size={28} />
                    </div>
                    <div className="w-full flex flex-row md:flex-col justify-between items-center md:space-y-1 md:justify-center">
                      <div className="text-gray-600 text-sm">Preparing</div>
                      <div className="text-gray-600 text-xs font-bold">
                        15:40 PM
                      </div>
                    </div>
                  </div>

                  <div className="relative flex flex-row md:flex-col items-center space-x-3 md:space-x-0 md:space-y-2">
                    <div className="w-16 h-16 shrink-0 flex items-center justify-center bg-gray-300 rounded-full">
                      <MdOutlineDeliveryDining size={28} />
                    </div>
                    <div className="w-full flex flex-row md:flex-col justify-between items-center md:space-y-1 md:justify-center">
                      <div className="text-gray-600 text-sm">Delivering</div>
                    </div>
                  </div>

                  <div className="relative flex flex-row md:flex-col items-center space-x-3 md:space-x-0 md:space-y-2">
                    <div className="w-16 h-16 shrink-0 flex items-center justify-center bg-gray-300 rounded-full">
                      <BiHappyBeaming size={28} />
                    </div>
                    <div className="w-full flex flex-row md:flex-col justify-between items-center md:space-y-1 md:justify-center">
                      <div className="text-gray-600 text-sm">Delivered</div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <DetailsModal
        visible={openOrderModal}
        order={order}
        onClose={handleCloseOrderModal}
      />
    </>
  );
}

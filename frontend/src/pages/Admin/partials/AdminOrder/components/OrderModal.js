import InputField from "../../../../../components/FormFields/InputField";
import ModalContainer from "../../../../../components/Modal/ModalContainer";
import { formatCurrency } from "../../../../../utils/string";
import Select from "../../../../../components/FormFields/Select";
import { ORDER_STATUS, STATUS_COLORS } from "../../../../../utils/constant";
import { calculateSalePrice } from "../../../../../utils/Utils";

function DataRow({ title, isColumn = false, children }) {
	const classWrapper = isColumn ? "flex-col space-y-1.5" : "flex-row items-baseline";
	const classTitle = isColumn ? "w-full" : "w-1/3";
	return (
		<div className={"flex p-2 " + classWrapper}>
			<div className={"block text-sm font-medium text-gray-700 pr-4 " + classTitle}>
				{title}:
			</div>
			<div className="flex-1 text-gray-500">{children}</div>
		</div>
	);
}

function ProductInfo({ data }) {
	const price = data.product.sizes?.length
		? data.product.sizes.find((i) => i.size === data.size._id).price
		: data.product.price;
	return (
		<div className="p-3 odd:bg-slate-100 divide-y-2 divide-gray-300">
			<div className="flex pb-2.5">
				<div className="space-y-1 text-sm w-2/3">
					<h4 className="font-bold capitalize">{data?.product?.title}</h4>
					{data?.size && (
						<div>
							Size: <span className="uppercase">{data?.size.title}</span>
						</div>
					)}
				</div>
				<div className="space-y-1.5 text-sm w-1/3 text-right">
					<div className="font-bold">x{data?.quantity}</div>
					<div className="flex flex-col space-y-2 ml-auto text-black">
                  {data.product.salePercent > 0   && (
                    <span className="text-xs line-through text-gray-500">
                      {formatCurrency(price)}
                    </span>
                  )}
                  <span className="text-base font-semibold">
					
                    {formatCurrency(
                      data.product.salePercent > 0 
                        ? calculateSalePrice(price, data.product.salePercent)
                        : price
                    )}
                  </span>
                </div>
				</div>
			</div>
			<div className="flex pt-2.5 border-t-2 justify-end space-x-3 items-center text-sm">
				<span className="text-sm font-bold">Tổng tiền:</span>
				<div className="text-red-500 font-bold">{formatCurrency(
                      (!!data.product.salePercent 
                        ? calculateSalePrice(price, data.product.salePercent)
                        : price) * data.quantity
                    )}</div>
			</div>
		</div>
	);
}

export default function OrderModal({ order = null, visible = false, onClose }) {
	const handleOrderStatusChange = (index) => {
		updateOrderStatus(ORDER_STATUS[index], order._id);
	};
	return (
		<ModalContainer ignoreContainer onClose={onClose} visible={visible}>
			<div className="bg-white rounded max-w-xl w-full overflow-auto p-4 mx-8 max-h-[80vh]">
				<div className="p-2">
					<h3 className="flex text-lg font-semibold leading-6 text-gray-900 mb-2">
						Chi tiết đơn hàng
						<span className="ml-auto font-bold ">{order?.orderId}</span>
					</h3>
				</div>
				<div className="overflow-hidden">
					<div>
						<DataRow title={"Địa chỉ"}>
							{order?.address}
						</DataRow>
						<DataRow title={"Khách hàng"}>{order?.name}</DataRow>
						<DataRow title={"Điện thoại"}>{order?.mobile}</DataRow>
						<DataRow title={"Email"}>{order?.email}</DataRow>
						<DataRow title={"Phí giao hàng"}>{formatCurrency(order?.shippingFee || 0)}</DataRow>
						<DataRow title={"Tổng tiền"}>{formatCurrency(order?.totalPrice)}</DataRow>
						<DataRow title={"Trạng thái"}>
							<span className={"uppercase font-bold " + STATUS_COLORS[order?.status]}>
								{order?.status}
							</span>
						</DataRow>
						<DataRow title={"Hình thức đặt hàng"}>
							<span className="uppercase font-bold">{order?.method.name}</span>{" "}
						</DataRow>
						<DataRow title={"Thời gian giao hàng"}>{order?.method.hour}</DataRow>
						<DataRow title={"Thanh toán"}>
							<span className="uppercase">{order?.payment.type}</span>
						</DataRow>
						<DataRow title={"Tài khoản đặt hàng"}>
							<span className="uppercase text-sky-600 font-bold">
								{order?.orderBy?.name}
							</span>
						</DataRow>
						<DataRow title={"Nhân viên giao hàng"}>
							{order?.shippedBy && (
								<span className="uppercase text-red-600 font-bold">
									{order.shippedBy.name} - {order.shippedBy.mobile}
								</span>
							)}
						</DataRow>
						<DataRow title={"Chi tiết sản phẩm"} isColumn>
							{order?.products.map((item, index) => (
								<ProductInfo key={index} data={item} />
							))}
						</DataRow>
					</div>
				</div>
			</div>
		</ModalContainer>
	);
}

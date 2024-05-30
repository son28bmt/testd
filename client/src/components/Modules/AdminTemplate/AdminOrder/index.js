import { useEffect, useState } from "react";
import billService from "../../../../services/bill.service";
import { Link } from "react-router-dom";
import SkeletonAdminItem from "../../../Share/SkeletonAdminItem";
import Modal from "../../../Share/Modal";
import formatNumberToPrice from "../../../../utils/formatNumberToPrice"

const AdminOrder = () => {

    const [orders, setOrders] = useState(null);
    const [isFormDeleteBill, setIsFormDeleteBill] = useState(null);
    const [isFormConfirmBill, setIsFormConfirmBill] = useState(null);

    const handleGetOrder = async () => {
        try {
            const orders = await billService.findAll(0);

            if(orders?.success) {
                setOrders(orders?.bills)
            }
        } catch (error) {
            
        }
    }

    const handleDeleteBill = async () => {
        try {
            const billRes = await billService.delete(isFormDeleteBill);

            if(billRes?.success) {
                let ordersNew = [...orders];
                const orderIndex = ordersNew.findIndex(item => item.billId == isFormDeleteBill);
                console.log("ordersNew: ", ordersNew)
                console.log("orderIndex: ", orderIndex)
                if (orderIndex !== -1) {
                    ordersNew.splice(orderIndex, 1);
                    setOrders(ordersNew);
                }
            }

            setIsFormDeleteBill(null);
        } catch (error) {
            setIsFormDeleteBill(null);
        }
    }

    const handleConfirmBill = async () => {
        try {
            const billRes = await billService.confirm(isFormConfirmBill);

            if(billRes?.success) {
                let ordersNew = [...orders];
                const orderIndex = ordersNew.findIndex(item => item.billId == isFormConfirmBill);
                console.log("ordersNew: ", ordersNew)
                console.log("orderIndex: ", orderIndex)
                if (orderIndex !== -1) {
                    ordersNew.splice(orderIndex, 1);
                    setOrders(ordersNew);
                }
            }

            setIsFormConfirmBill(null);
        } catch (error) {
            setIsFormConfirmBill(null);
        }
    }

    useEffect(() => {
        handleGetOrder();
    }, [])

    return (
        <div>
            <div>
                <div className="bg-white px-3 py-4 rounded-md shadow-sm">

                    <div className="overflow-y-auto relative border rounded-md mb-5">
                        <table className="table-auto w-full">
                            <colgroup>
                                <col style={{ width: "10%" }} />
                                <col style={{ width: "30%" }} />
                                <col style={{ width: "20%" }} />
                                <col style={{ width: "10%" }} />
                                <col style={{ width: "15%" }} />
                                <col style={{ width: "15%" }} />
                            </colgroup>
                            <thead className="text-gray-600 bg-gray-100">
                                <tr className="whitespace-nowrap [&>th]:px-2 [&>th]:py-2 [&>th]:font-semibold">
                                    <th className="rounded-tl-md">Id</th>
                                    <th>Sản phẩm</th>
                                    <th>Thông tin</th>
                                    <th>Ngày đặt</th>
                                    <th>Giá</th>
                                    <th className="rounded-tr-md">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y text-sm">
                                {
                                    (orders ? (
                                        orders?.map((bill, index) => {
                                            return (
                                                <tr
                                                    key={bill?.billId}
                                                    className="[&>td]:px-2 [&>td]:py-2 divide-x"
                                                >
                                                    <td className="text-center">
                                                        {bill?.billId}
                                                    </td>
                                                    <td className="">
                                                        <div className="flex">
                                                            <div className="w-20 h-28 flex-shrink-0 rounded-md border overflow-hidden mr-2">
                                                                <img
                                                                    alt=""
                                                                    className={`w-20 h-28 object-cover`}
                                                                    src={`${bill?.thumbnail}`}
                                                                />
                                                            </div>
                                                            <div>
                                                                <div className="mb-2 hover:underline line-clamp-2">
                                                                    <strong>
                                                                        <Link
                                                                            to={`/truyen/${bill?.billId}`}
                                                                            target="_blank"
                                                                        >
                                                                            {
                                                                                bill?.title
                                                                            }
                                                                        </Link>
                                                                    </strong>
                                                                </div>
                                                                
                                                                <div>Giá: {bill?.price}</div>
                                                                <div>Số lượng mua: {bill?.quantity}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {DataInfo(JSON.parse(bill?.info))}
                                                    </td>
                                                    <td>
                                                    <td>
                                                    {new Date(bill?.createdAt).toLocaleString()}
                                                    </td>
                                                    </td>
                                                    <td>
                                                        {formatNumberToPrice(bill?.price * bill?.quantity)} VNĐ
                                                    </td>
                                                    <td>
                                                        <div className="space-y-1">
                                                            <button
                                                                onClick={() => setIsFormConfirmBill(bill?.billId)}
                                                                className="btn bg-blue-500 hover:bg-blue-600 text-white"
                                                            >
                                                                Xác nhận
                                                            </button>
                                                            <button
                                                                onClick={() => setIsFormDeleteBill(bill?.billId)}
                                                                className="btn bg-red-500 hover:bg-red-600 text-white"
                                                            >
                                                                Xóa
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        // <SkeletonAdminItem count={20} />
                                        <div></div>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {!!isFormDeleteBill && (
                <Modal
                    size="medium"
                    title="Xóa đơn hàng?"
                    isShow={!!isFormDeleteBill}
                    setIsShow={(type) => setIsFormDeleteBill(null)}
                >
                    <div className="">
                        Bạn không thể khôi phục đơn hàng này nếu xóa đi.
                    </div>

                    <div className="text-right mt-4 flex justify-end">
                        <button
                            title="Nút hủy phương thức"
                            onClick={() => setIsFormDeleteBill(null)}
                            className="py-2 px-3 rounded-md border text-black bg-white hover:bg-gray-200 min-w-20"
                        >
                            Hủy
                        </button>
                        <button
                            title="Nút xóa đơn hàng"
                            onClick={handleDeleteBill}
                            className="py-2 px-3 flex items-center justify-center space-x-2 rounded-md border text-white bg-red-600 hover:bg-red-700 min-w-20 ml-2"
                        >
                            <span>Xóa</span>
                            {/* {nameTypeLoading === "button_delete_book" && (
                                <IconLoadingSpin size={14} />
                            )} */}
                        </button>
                    </div>
                </Modal>
            )}
            {!!isFormConfirmBill && (
                <Modal
                    size="medium"
                    title="Xóa truyện?"
                    isShow={!!isFormConfirmBill}
                    setIsShow={(type) => setIsFormConfirmBill(null)}
                >
                    <div className="">
                        Bạn có chắc chắn xác nhận đơn hàng này
                    </div>

                    <div className="text-right mt-4 flex justify-end">
                        <button
                            title="Nút hủy phương thức"
                            onClick={() => setIsFormConfirmBill(null)}
                            className="py-2 px-3 rounded-md border text-black bg-white hover:bg-gray-200 min-w-20"
                        >
                            Hủy
                        </button>
                        <button
                            title="Nút xác nhận đơn hàng"
                            onClick={handleConfirmBill}
                            className="py-2 px-3 flex items-center justify-center space-x-2 rounded-md border text-white bg-indigo-600 hover:bg-indigo-700 min-w-20 ml-2"
                        >
                            <span>Xác nhận</span>
                            {/* {nameTypeLoading === "button_delete_book" && (
                                <IconLoadingSpin size={14} />
                            )} */}
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default AdminOrder;

const DataInfo = (info) => {

    return (
        <div>
            <div>Tên: {info?.name}</div>
            <div>Số điện thoại: {info?.phone}</div>
            <div>{info?.city.label}</div>
            <div>{info?.district.label}</div>
            <div>{info?.ward.label}</div>
            <div>Địa chị cụ thể: {info?.specificAdress}</div>
            <div>Ghi chú: {info?.description}</div>
        </div>
    )
}
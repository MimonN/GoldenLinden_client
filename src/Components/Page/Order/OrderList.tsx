import React from 'react';
import { orderHeaderModel } from '../../../Interfaces';
import { MainLoader } from '../Common';
import OrderListProps from './orderListType';
import { useNavigate } from 'react-router-dom';
import { getStatusColor } from '../../../Helper';

function OrderList({ isLoading, orderData }: OrderListProps) {
  const navigate = useNavigate();
  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="table p-2 p-md-5">
          <h1 className="text-success">Orders List</h1>
          <div className="p-2">
            <div className="row border">
              <div className="col">ID</div>
              <div className="col d-none d-md-flex">Name</div>
              <div className="col d-none d-md-flex">Phone</div>
              <div className="col d-none d-md-flex">Total</div>
              <div className="col d-none d-md-flex">Items</div>
              <div className="col">Date</div>
              <div className="col">Status</div>
              <div className="col"></div>
            </div>

            {orderData.map((orderItem: orderHeaderModel) => {
              const badgeColor = getStatusColor(orderItem.status!);
              return (
                <div className="row border" key={orderItem.orderHeaderId}>
                  <div className="col">{orderItem.orderHeaderId}</div>
                  <div className="col d-none d-md-flex">{orderItem.pickupName}</div>
                  <div className="col d-none d-md-flex">{orderItem.pickupPhoneNumber}</div>
                  <div className="col d-none d-md-flex">
                    ${orderItem.orderTotal!.toFixed(2)}
                  </div>
                  <div className="col d-none d-md-flex">{orderItem.totalItems}</div>
                  <div className="col">
                    {new Date(orderItem.orderDate!).toLocaleDateString()}
                  </div>
                  <div className="col">
                    <span className={`badge bg-${badgeColor}`}>{orderItem.status}</span>
                  </div>
                  <div className="col">
                    <button
                      className="btn btn-success"
                      onClick={() =>
                        navigate(
                          '/order/orderDetails/' + orderItem.orderHeaderId
                        )
                      }
                    >
                      Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default OrderList;

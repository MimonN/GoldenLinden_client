import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../Storage/Redux/store';
import { useGetAllOrdersQuery } from '../../Apis/orderApi';
import { withAdminAuth } from '../../HOC';
import OrderList from '../../Components/Page/Order/OrderList';
import { MainLoader } from '../../Components/Page/Common';

function AllOrders() {
  const { data, isLoading } = useGetAllOrdersQuery('');
  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <OrderList isLoading={isLoading} orderData={data.result} />
      )}
    </>
  );
}

export default withAdminAuth(AllOrders);

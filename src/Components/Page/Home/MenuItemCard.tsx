import React, { useState } from 'react';
import { apiResponse, menuItemModel, userModel } from '../../../Interfaces';
import { Link } from 'react-router-dom';
import { useUpdateShoppingCartMutation } from '../../../Apis/shoppingCartApi';
import { MiniLoader } from '../Common';
import { toastNotify } from '../../../Helper';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Storage/Redux/store';
import { useNavigate } from 'react-router-dom';

interface Props {
  menuItem: menuItemModel;
}

function MenuItemCard(props: Props) {
  const navigate = useNavigate();
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [updateShoppingCart] = useUpdateShoppingCartMutation();
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const handleAddToCart = async (menuItemId: number) => {
    if (!userData.id) {
      navigate('/login');
      return;
    }

    setIsAddingToCart(true);

    const response: apiResponse = await updateShoppingCart({
      menuItemId: menuItemId,
      updateQuantityBy: 1,
      userId: userData.id,
    });
    if (response.data && response.data.isSuccess) {
      toastNotify('Item added to cart successfully!');
    }
    setIsAddingToCart(false);
  };

  return (
    <div className="col-md-6 col-lg-4 col-xl-3 col-sm-12 pt-3 d-flex align-items-stretch">
      <div
        className="card"
        style={{ boxShadow: '0 1px 7px 0 rgb(0 0 0 / 50%)' }}
      >
        <div className="card-body" style={{ paddingTop: '60px' }}>
          <Link
            to={`/menuItemDetails/${props.menuItem.id}`}
            className="d-flex justify-content-center"
          >
            <img
              src={process.env.REACT_APP_API_URL + props.menuItem.image}
              style={{
                borderRadius: '10%',
                maxHeight: '220px',
              }}
              alt=""
              className="col-12 w-auto image-box"
            />
          </Link>

          {props.menuItem.specialTag &&
            props.menuItem.specialTag.length > 0 && (
              <i
                className="bi bi-star btn btn-success"
                style={{
                  position: 'absolute',
                  top: '15px',
                  left: '15px',
                  padding: '5px 10px',
                  borderRadius: '3px',
                  outline: 'none !important',
                  cursor: 'pointer',
                }}
              >
                &nbsp; {props.menuItem.specialTag}
              </i>
            )}

          {isAddingToCart ? (
            <div style={{ position: 'absolute', top: '15px', right: '15px' }}>
              <MiniLoader />
            </div>
          ) : (
            <i
              className="bi bi-cart-plus btn btn-outline-danger"
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                padding: '5px 10px',
                borderRadius: '3px',
                outline: 'none !important',
                cursor: 'pointer',
              }}
              onClick={() => handleAddToCart(props.menuItem.id)}
            ></i>
          )}

          <div className="text-center">
            <p className="card-title m-0 text-success fs-3 d-flex align-items-center justify-content-center">
              <Link
                to={`/menuItemDetails/${props.menuItem.id}`}
                style={{ textDecoration: 'none', color: 'green' }}
              >
                {props.menuItem.name}
              </Link>
            </p>
            <p className="badge bg-secondary my-2" style={{ fontSize: '12px' }}>
              {props.menuItem.category}
            </p>
          </div>
          <p className="card-text" style={{ textAlign: 'center' }}>
            {props.menuItem.description}
          </p>
          <div className="row text-center">
            <h4 className='my-auto'>${props.menuItem.price}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuItemCard;

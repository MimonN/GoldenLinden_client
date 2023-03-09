import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateMenuItemMutation } from '../../Apis/menuItemApi';
import { inputHelper, toastNotify } from '../../Helper';

const menuItemData = {
  name: '',
  description: '',
  specialTag: '',
  category: '',
  price: '',
};

function MenuItemUpsert() {
  const [imageToStore, setImageToStore] = useState<any>();
  const [imageToDisplay, setImageToDisplay] = useState<string>('');
  const [menuItemInputs, setMenuItemInputs] = useState(menuItemData);
  const [loading, setLoading] = useState(false);
  const [createMenuItem] = useCreateMenuItemMutation();
  const navigate = useNavigate();

  const handleMenuItemInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, menuItemInputs);
    setMenuItemInputs(tempData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const imgType = file.type.split('/')[1];
      const validImgtypes = ['jpeg', 'jpg', 'png'];

      const isImageTypeValid = validImgtypes.filter((e) => {
        return e === imgType;
      });

      if (file.size > 1000 * 1024) {
        setImageToStore('');
        toastNotify('File must be less then 1 MB', 'error');
        return;
      } else if (isImageTypeValid.length === 0) {
        setImageToStore('');
        toastNotify('File must be in jpeg, jpg or png', 'error');
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      setImageToStore(file);
      reader.onload = (e) => {
        const imgUrl = e.target?.result as string;
        setImageToDisplay(imgUrl);
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!imageToStore) {
      toastNotify('Please upload an image', 'error');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('Name', menuItemInputs.name);
    formData.append('Description', menuItemInputs.description);
    formData.append('SpecialTag', menuItemInputs.specialTag);
    formData.append('Category', menuItemInputs.category);
    formData.append('Price', menuItemInputs.price);
    formData.append('File', imageToStore);

    const response = await createMenuItem(formData);
    if (response) {
      setLoading(false);
      navigate('/menuItem/menuitemlist');
    }

    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5">
      <h3 className="offset-2 px-2 text-success">Add Product</h3>
      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-5 offset-2">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              required
              name="name"
              value={menuItemInputs.name}
              onChange={handleMenuItemInput}
            />
            <textarea
              className="form-control mt-3"
              placeholder="Enter Description"
              name="description"
              rows={10}
              value={menuItemInputs.description}
              onChange={handleMenuItemInput}
            ></textarea>
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter Special Tag"
              name="specialTag"
              value={menuItemInputs.specialTag}
              onChange={handleMenuItemInput}
            />
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter Category"
              name="category"
              value={menuItemInputs.category}
              onChange={handleMenuItemInput}
            />
            <input
              type="number"
              className="form-control mt-3"
              required
              placeholder="Enter Price"
              name="price"
              value={menuItemInputs.price}
              onChange={handleMenuItemInput}
            />
            <input
              type="file"
              onChange={handleFileChange}
              className="form-control mt-3"
            />
            <div className="text-center">
              <button
                type="submit"
                style={{ width: '50%' }}
                className="btn btn-success mt-5"
              >
                Submit
              </button>
            </div>
          </div>
          <div className="col-md-5 text-center">
            <img
              src={imageToDisplay}
              style={{ width: '100%', borderRadius: '30px' }}
              alt=""
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default MenuItemUpsert;

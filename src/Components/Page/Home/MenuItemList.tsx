import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMenuItemsQuery } from '../../../Apis/menuItemApi';
import { menuItemModel } from '../../../Interfaces';
import { setMenuItem } from '../../../Storage/Redux/menuItemSlice';
import { RootState } from '../../../Storage/Redux/store';
import { MainLoader } from '../Common';
import MenuItemCard from './MenuItemCard';

function MenuItemList() {
  const [menuItems, setMenuItems] = useState<menuItemModel[]>([]);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetMenuItemsQuery(null);

  const searchValue = useSelector(
    (state: RootState) => state.menuItemStore.search
  );

  useEffect(() => {
    if (data && data.result) {
      const tempMenuArray = handleFilters(searchValue);
      setMenuItems(tempMenuArray);
    }
  }, [searchValue]);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setMenuItem(data.result));
      setMenuItems(data.result);
    }
  }, [isLoading]);

  const handleFilters = (search: string) => {
    let tempMenuItems = [...data.result];

    //search functionality
    if (search) {
      const tempSearchMenuItems = [...tempMenuItems];
      tempMenuItems = tempSearchMenuItems.filter((item: menuItemModel) =>
        item.name.toUpperCase().includes(search.toUpperCase())
      );
    }

    return tempMenuItems;
  };

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className="container row">
      {menuItems.length > 0 &&
        menuItems.map((menuItem: menuItemModel, index: number) => (
          <MenuItemCard menuItem={menuItem} key={index} />
        ))}
    </div>
  );
}

export default MenuItemList;

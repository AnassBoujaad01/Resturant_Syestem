import React from 'react';
import Categorie from '../../Components/Categorie';
import { useSelector, useDispatch } from 'react-redux';
import { ProductSlice } from './../../Redux/slices/productSlices/productSlice';

function Categories() {
  const { categoryList } = useSelector(state => state.category);
  const dispatch = useDispatch();


  const handleCategoryClick = (id) => {
    dispatch(ProductSlice.actions.setProducts(id));
  }

  const categories = Array.isArray(categoryList) && categoryList.length === 1 ? categoryList[0] : [];

  return (
    <div className='overflow-y-scroll' style={{ height: '90vh', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <div className='bg-grayColor w-full h-14 text-darkColor text-xl font-bold sticky top-0 z-1'>CATEGORIES</div>
      {/* Mapping over categories to render multiple categories */}
      {categories.map((category) => (
        <div className='mt-3' key={category.CategoryID} >
          {/* Assigning unique key prop to the div element */}
          <Categorie image={category.Image} name={category.Name} handleClick={() => handleCategoryClick(category.CategoryID)} />
        </div>
      ))}
    </div>
  );
}

export default Categories;

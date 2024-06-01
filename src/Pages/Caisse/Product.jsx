import React from 'react';
import Card from '../../Components/Card';
import { useSelector} from 'react-redux';
import NoItem from '../../Image/NoItem.jpeg';


function Product() {
 
  const ProductsList = useSelector(state => state.Product.productList);
  const Products = Array.isArray(ProductsList) && ProductsList.length > 0 ? ProductsList : [];


  return (
    <div className=' bg-whiteColor pt-5 overflow-y-scroll select-none ' style={{ height: '95vh', scrollbarWidth: 'none' }}>
      <div className='flex flex-wrap  justify-around relative   mx-[100px] 'style={{minWidth:'700px'}} >
        {Products.length === 0 ? (
          <div className='flex  justify-center items-center w-full h-full'>
            <div className="flex flex-col  items-center" >
              <img src={NoItem} alt="No Items Available" />
              <p className="text-center text-6xl font-bold mt-4 text-gray-500"  >No items available</p>
            </div>
          </div>
        ) : (
          Products.map((product, productIndex) => (
            <div key={productIndex} className="flex flex-wrap gap-6">
              {product.map((item, index) => (
                <Card 
                  key={index} 
                  image={item.Image} 
                  name={item.Name} 
                  price={item.Price} 
                />
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
  
}

export default Product;

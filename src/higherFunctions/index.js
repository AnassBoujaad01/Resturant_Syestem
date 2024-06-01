
//Higher  functons 

export const generatedID = () => {
    const now = new Date();

    return Date.now() + now.getHours() + Math.floor(Math.random() * 1000);
}

export const getDate = () => {
    const now = new Date();

    return now.getDate;
}

export const getTime = () => {
    const now = new Date();

    return now.getTime;
}

export const generatedItemID = () =>{
    const now = new Date();
    return  now.getMinutes+Math.floor(Math.random() * 1000)
}



//calc items
export const calculateItemCount = (itemsList) => {
    return itemsList.length;
};

// calc price 
export const calculateTotalPrice = (itemsList) => {
    // Assuming each item in itemsList has both price and quantity properties
    return itemsList.reduce((total, item) => total + (item.price * item.quantity), 0);
};

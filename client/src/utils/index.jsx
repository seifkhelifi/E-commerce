import axios from 'axios';

const productionUrl = ' http://localhost:5000/api/v1';

export const customFetch = axios.create({
 // withCredentials: true,
  baseURL: productionUrl,
  //headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
	//credentials: 'include',
});


export const customFetchwithCred = axios.create({
   withCredentials: true,
   baseURL: productionUrl,
  
 });
 

export const formatPrice = (price) => {
  const dollarsAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format((price / 100).toFixed(2));
  return dollarsAmount;
};

export const generateAmountOptions = (number) => {
  return Array.from({ length: number }, (_, index) => {
    const amount = index + 1;
    return (
      <option key={amount} value={amount}>
        {amount}
      </option>
    );
  });
};

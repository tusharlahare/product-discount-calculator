const products = {
    A: 20,
    B: 40, 
    C: 50  
  };
  
  function calculate() {
  
    let quantities = {};
    let giftWraps = {};
    
    for (let product in products) {
      let qty = parseInt(prompt(`Enter quantity for Product ${product}`));
      quantities[product] = qty;
      
      let giftWrap = prompt(`Gift wrap Product ${product} (y/n)`); 
      giftWraps[product] = giftWrap == "y";
    }
  
    let subtotal = Object.values(quantities).reduce((total, qty) => {
      return total + qty * products[Object.keys(quantities)[Object.values(quantities).indexOf(qty)]];
    }, 0);
  
    let [discountName, discountAmount] = getDiscount(quantities, subtotal);
  
    let shippingFee = Math.ceil(Object.values(quantities).reduce((total, qty) => total + qty) / 10) * 5;
  
    let giftWrapFee = Object.values(quantities).reduce((total, qty, index) => {
      return giftWraps[Object.keys(quantities)[index]] ? total + qty : total; 
    }, 0);
  
    let total = subtotal - discountAmount + shippingFee + giftWrapFee;
  
    printSummary(quantities, subtotal, discountName, discountAmount, shippingFee, giftWrapFee, total);  
  }
  
  function getDiscount(quantities, subtotal) {
  
    if (subtotal > 200) {
      return ["flat_10_discount", 10];
    } else if (Object.values(quantities).some(qty => qty > 10)) {
      let product = Object.keys(quantities).find(key => quantities[key] === Math.max(...Object.values(quantities)));
      return ["bulk_5_discount", quantities[product] * products[product] * 0.05];
    } else if (Object.values(quantities).reduce((total, qty) => total + qty) > 20) {
      return ["bulk_10_discount", subtotal * 0.1]; 
    } else if (Object.values(quantities).reduce((total, qty) => total + qty) > 30 && Object.values(quantities).some(qty => qty > 15)) {
      let discountAmount = 0;
      for (let product in quantities) {
        if (quantities[product] > 15) { 
          discountAmount += (quantities[product] - 15) * products[product] * 0.5;
        }
      }
      return ["tiered_50_discount", discountAmount];
    } else {
      return ["No discount", 0];
    } 
  }
  
  function printSummary(quantities, subtotal, discountName, discountAmount, shippingFee, giftWrapFee, total) {
  
    console.log("\nOrder Summary");
  
    Object.keys(quantities).forEach(product => {
      console.log(`${product} ${quantities[product]} ${quantities[product] * products[product]}`);
    });
    
    console.log(`Subtotal: ${subtotal}`);
  
    if (discountAmount > 0) {
      console.log(`${discountName} discount: ${discountAmount}`);
    }
  
    console.log(`Shipping fee: ${shippingFee}`);
    console.log(`Gift wrap fee: ${giftWrapFee}`);  
    console.log(`Total: ${total}`);   
  }
  
  calculate();
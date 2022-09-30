import {
  VIRTUAL_PAGE_VIEW,
  TRACK_VIEW_ITEM_LIST,
  TRACK_SELECT_ITEM,
  TRACK_VIEW_ITEM,
  TRACK_ADD_TO_CART,
  TRACK_REMOVE_FROM_CART,
  TRACK_VIEW_CART,
  TRACK_BEGIN_CHECKOUT,
  TRACK_ADD_SHIPPING_INFO,
  TRACK_ADD_PAYMENT_INFO,
  TRACK_PURCHASE,
  TRACK_VIEW_PROMOTION,
  TRACK_SELECT_PROMOTION,
  TRACK_NAVIGATION_CLICK,
  TRACK_LOGIN,
} from './actionTypes';

// Create all Analytics actions to be handled by the middleware, skips reducers

/**
 * Send the virtualPageView, page data
 */
export const virtualPageView = (pageProps) => {
  return {
    type: VIRTUAL_PAGE_VIEW,
    payload: {
      tealium_event: "page_view",
      ...pageProps,
    },
  }
}

/**
 * Send the view item list, product data
 */
export const viewItemList = (products, list) => {
  const ecomObj =  {
    item_list_id: [],
    item_list_name: [],
    item_id : [],
    item_name: [],
    item_index: [],
    item_brand: [],
    item_variant: [],
    item_price: [],
    item_category: [],
    item_category2: [],
    item_category3: [],
    item_category4: [],
    item_category5: [],
    currency: "USD",
  };
  products.forEach((
    {
      name,
      id,
      price,
      categories,
      variant_groups,
    },
    index
  ) => {
    ecomObj.item_list_id.push(list.id || "");
    ecomObj.item_list_name.push(list.name || "");
    ecomObj.item_id.push(id || "");
    ecomObj.item_name.push(name || "");
    ecomObj.item_index.push(index || "");
    ecomObj.item_brand.push("Blast" || "");
    ecomObj.item_variant.push(`${variant_groups[0]?.name}: ${variant_groups[0]?.options[0]?.name}` || "");
    ecomObj.item_price.push(parseFloat(price.formatted) || "");
    categories.forEach((cat, i) => ecomObj[i > 0 ? `item_category${i+1}` : 'item_category'].push(cat.name));
  });
  return {
    type: TRACK_VIEW_ITEM_LIST,
    payload: {
      tealium_event: "view_item_list",
      ...ecomObj,
    },
  }
}

/** 
 * A thunk for product impressions so that firing the action returns a promise.
 * We use this to sequence a state update in the collections component.
 */
export const trackViewItemList = (products, list) => (dispatch) => {
  dispatch(viewItemList(products, list));
  return Promise.resolve();
};


/**
 * Send the select item, product data
 */
export const trackSelectItem = (products, position, list) => {
  const ecomObj =  {
    item_list_id: [],
    item_list_name: [],
    item_id : [],
    item_name: [],
    item_index: [],
    item_brand: [],
    item_variant: [],
    item_price: [],
    item_category: [],
    item_category2: [],
    item_category3: [],
    item_category4: [],
    item_category5: [],
    currency: "USD",
  };
  products.forEach((
    {
      name,
      id,
      price,
      categories,
      variant_groups,
    }
  ) => {
    ecomObj.item_list_id.push(list.id || "");
    ecomObj.item_list_name.push(list.name || "");
    ecomObj.item_id.push(id || "");
    ecomObj.item_name.push(name || "");
    ecomObj.item_index.push(position || "");
    ecomObj.item_brand.push("Blast" || "");
    ecomObj.item_variant.push(`${variant_groups[0]?.name}: ${variant_groups[0]?.options[0]?.name}` || "");
    ecomObj.item_price.push(parseFloat(price.formatted) || "");
    categories.forEach((cat, i) => ecomObj[i > 0 ? `item_category${i+1}` : 'item_category'].push(cat.name));
  });
  return {
    type: TRACK_SELECT_ITEM,
    payload: {
      tealium_event: "select_item",
      ...ecomObj,
    },
  }
}

/**
 * Send the view item, product data
 */
export const trackViewItem = (product) => {
  const { name, id, price, categories, variant_groups } = product;
  const ecomObj =  {
    item_id : [id || ""],
    item_name: [name || ""],
    item_brand: ["Blast" || ""],
    item_variant: [`${variant_groups[0]?.name}: ${variant_groups[0]?.options[0]?.name}` || ""],
    item_price: [parseFloat(price.formatted) || ""],
    item_category: [],
    item_category2: [],
    item_category3: [],
    item_category4: [],
    item_category5: [],
    currency: "USD",
  };
  categories.forEach((cat, i) => ecomObj[i > 0 ? `item_category${i+1}` : 'item_category'].push(cat.name));
  return {
    type: TRACK_VIEW_ITEM,
    payload: {
      tealium_event: "view_item",
      ...ecomObj,
    },
  }
}

/**
 * Send the addToCart, product data
 */
export const trackAddToCart = (product, quantity, selected_options) => {
  const { name, id, price, categories, variant_groups } = product;
  const createVariantFromGroups = (selectedOption) => {
    const variantId = Object.keys(selectedOption)[0];
    const variant_option_id = selectedOption[Object.keys(selectedOption)[0]];
    const variant = variant_groups.find(variant => variant.id === variantId);
    const variant_name = variant?.name;
    const variant_option = variant?.options.find(option => option.id === variant_option_id);
    const variant_option_name = variant_option?.name;
    return `${variant_name}: ${variant_option_name}`
  }
  let variant = '';
  if(selected_options[0]?.group_name) {
    variant = selected_options.map(({group_name, option_name}) => `${group_name}: ${option_name}`).sort().join();
  } else {
    variant = createVariantFromGroups(selected_options);
  }
  const ecomObj =  {
    item_id : [id || ""],
    item_name: [name || ""],
    item_brand: ["Blast" || ""],
    item_variant: [variant || ""],
    item_price: [parseFloat(price.formatted) || ""],
    item_quantity: [quantity],
    item_category: [],
    item_category2: [],
    item_category3: [],
    item_category4: [],
    item_category5: [],
    currency: "USD",
  };
  categories.forEach((cat, i) => ecomObj[i > 0 ? `item_category${i+1}` : 'item_category'].push(cat.name));
  return {
    type: TRACK_ADD_TO_CART,
    payload: {
      tealium_event: "add_to_cart",
      ...ecomObj,
    },
  }
}

/**
 * Send the removeFromCart, product data
 */
export const trackRemoveFromCart = (product, quantity, selected_options) => {
  const { name, id, price, categories } = product;
  const ecomObj =  {
    item_id : [id || ""],
    item_name: [name || ""],
    item_brand: ["Blast" || ""],
    item_variant: [selected_options.map(({group_name, option_name}) => `${group_name}: ${option_name}`).sort().join() || ""],
    item_price: [parseFloat(price.formatted) || ""],
    item_quantity: [quantity],
    item_category: [],
    item_category2: [],
    item_category3: [],
    item_category4: [],
    item_category5: [],
    currency: "USD",
  };
  categories.forEach((cat, i) => ecomObj[i > 0 ? `item_category${i+1}` : 'item_category'].push(cat.name));
  return {
    type: TRACK_REMOVE_FROM_CART,
    payload: {
      tealium_event: "remove_from_cart",
      ...ecomObj,
    },
  }
}

/**
 * Send the view cart, product data
 */
export const trackViewCart = (products, cart_id) => {
  const ecomObj =  {
    cart_id,
    item_id : [],
    item_name: [],
    item_index: [],
    item_brand: [],
    item_variant: [],
    item_price: [],
    item_quantity: [],
    item_category: [],
    item_category2: [],
    item_category3: [],
    item_category4: [],
    item_category5: [],
    currency: "USD",
  };
  products.forEach((
    {
      name,
      id,
      price,
      quantity,
      categories,
      selected_options,
    }
  ) => {
    ecomObj.item_id.push(id || "");
    ecomObj.item_name.push(name || "");
    ecomObj.item_brand.push("Blast" || "");
    ecomObj.item_variant.push(selected_options.map(({group_name, option_name}) => `${group_name}: ${option_name}`).sort().join() || "");
    ecomObj.item_price.push(parseFloat(price.formatted) || "");
    ecomObj.item_quantity.push(quantity || "");
    categories.forEach((cat, i) => ecomObj[i > 0 ? `item_category${i+1}` : 'item_category'].push(cat.name));
  });
  return {
    type: TRACK_VIEW_CART,
    payload: {
      tealium_event: "view_cart",
      ...ecomObj,
    },
  }
}

/**
 * Send the begin checkout, product data
 */
export const trackBeginCheckout = (products, cart_id) => {
  const ecomObj =  {
    cart_id,
    item_id : [],
    item_name: [],
    item_index: [],
    item_brand: [],
    item_variant: [],
    item_price: [],
    item_quantity: [],
    item_category: [],
    item_category2: [],
    item_category3: [],
    item_category4: [],
    item_category5: [],
    currency: "USD",
  };
  products.forEach((
    {
      name,
      id,
      price,
      quantity,
      categories,
      selected_options,
    }
  ) => {
    ecomObj.item_id.push(id || "");
    ecomObj.item_name.push(name || "");
    ecomObj.item_brand.push("Blast" || "");
    ecomObj.item_variant.push(selected_options.map(({group_name, option_name}) => `${group_name}: ${option_name}`).sort().join() || "");
    ecomObj.item_price.push(parseFloat(price.formatted) || "");
    ecomObj.item_quantity.push(quantity || "");
    categories.forEach((cat, i) => ecomObj[i > 0 ? `item_category${i+1}` : 'item_category'].push(cat.name));
  });
  return {
    type: TRACK_BEGIN_CHECKOUT,
    payload: {
      tealium_event: "begin_checkout",
      ...ecomObj,
    },
  }
}

/**
 * Send the add shipping info, product data
 */
export const trackAddShippingInfo = (products, cart_id, shipping_tier) => {
  const { description, price } = shipping_tier;
  const ecomObj =  {
    shipping_tier: `${description} - ${price.formatted_with_code}`,
    cart_id,
    item_id : [],
    item_name: [],
    item_index: [],
    item_brand: [],
    item_variant: [],
    item_price: [],
    item_quantity: [],
    item_category: [],
    item_category2: [],
    item_category3: [],
    item_category4: [],
    item_category5: [],
    currency: "USD",
  };
  products.forEach((
    {
      name,
      id,
      price,
      quantity,
      categories,
      selected_options,
    }
  ) => {
    ecomObj.item_id.push(id || "");
    ecomObj.item_name.push(name || "");
    ecomObj.item_brand.push("Blast" || "");
    ecomObj.item_variant.push(selected_options.map(({group_name, option_name}) => `${group_name}: ${option_name}`).sort().join() || "");
    ecomObj.item_price.push(parseFloat(price.formatted) || "");
    ecomObj.item_quantity.push(quantity || "");
    categories.forEach((cat, i) => ecomObj[i > 0 ? `item_category${i+1}` : 'item_category'].push(cat.name));
  });
  return {
    type: TRACK_ADD_SHIPPING_INFO,
    payload: {
      tealium_event: "add_shipping_info",
      ...ecomObj,
    },
  }
}

/**
 * Send the add payment info, product data
 */
export const trackAddPaymentInfo = (products, cart_id) => {
  const ecomObj =  {
    cart_id,
    item_id : [],
    item_name: [],
    item_index: [],
    item_brand: [],
    item_variant: [],
    item_price: [],
    item_quantity: [],
    item_category: [],
    item_category2: [],
    item_category3: [],
    item_category4: [],
    item_category5: [],
    currency: "USD",
  };
  products.forEach((
    {
      name,
      id,
      price,
      quantity,
      categories,
      selected_options,
    }
  ) => {
    ecomObj.item_id.push(id || "");
    ecomObj.item_name.push(name || "");
    ecomObj.item_brand.push("Blast" || "");
    ecomObj.item_variant.push(selected_options.map(({group_name, option_name}) => `${group_name}: ${option_name}`).sort().join() || "");
    ecomObj.item_price.push(parseFloat(price.formatted) || "");
    ecomObj.item_quantity.push(quantity || "");
    categories.forEach((cat, i) => ecomObj[i > 0 ? `item_category${i+1}` : 'item_category'].push(cat.name));
  });
  return {
    type: TRACK_ADD_PAYMENT_INFO,
    payload: {
      tealium_event: "add_payment_info",
      ...ecomObj,
    },
  }
}

/**
 * Send the purchase, product data
 */
export const trackPurchase = (products, orderReceipt) => {
  const ecomObj =  {
    currency: 'USD',
    value: parseFloat(orderReceipt.order_value.formatted),
    coupon: orderReceipt.order.discount.code,
    payment_type: orderReceipt.transactions.map(trans => {
      return trans.payment_source.brand
    }).sort().join(),
    shipping_tier: `${orderReceipt.order.shipping.description} - ${orderReceipt.order.shipping.price.formatted}`,
    transaction_id: orderReceipt.id,
    affiliation: orderReceipt.merchant.business_name,
    tax: parseFloat(orderReceipt.tax.amount.formatted),
    shipping: parseFloat(orderReceipt.order.shipping.price.formatted),
    cart_id: orderReceipt.cart_id,
    item_list_id: [],
    item_list_name: [],
    item_id : [],
    item_name: [],
    item_index: [],
    item_brand: [],
    item_variant: [],
    item_price: [],
    item_quantity: [],
    item_category: [],
    item_category2: [],
    item_category3: [],
    item_category4: [],
    item_category5: [],
  };
  products.forEach((
    {
      name,
      id,
      price,
      quantity,
      categories,
      selected_options,
    }
  ) => {
    ecomObj.item_id.push(id || "");
    ecomObj.item_name.push(name || "");
    ecomObj.item_brand.push("Blast" || "");
    ecomObj.item_variant.push(selected_options.map(({group_name, option_name}) => `${group_name}: ${option_name}`).sort().join() || "");
    ecomObj.item_price.push(parseFloat(price.formatted) || "");
    ecomObj.item_quantity.push(quantity || "");
    categories.forEach((cat, i) => ecomObj[i > 0 ? `item_category${i+1}` : 'item_category'].push(cat.name));
  });
  return {
    type: TRACK_PURCHASE,
    payload: {
      tealium_event: "purchase",
      ...ecomObj,
    },
  }
}

/**
 * Send the select promotion, promotion data
 */
export const trackSelectPromotion = (promotion_id, promotion_name, creative_name, creative_slot, location_id) => {
  const ecomObj = {
    promotion_id: [promotion_id || ""],
    promotion_name: [promotion_name || ""],
    creative_name: [creative_name || ""],
    creative_slot: [creative_slot || ""],
    location_id: [location_id || ""]
  };
  return {
    type: TRACK_SELECT_PROMOTION,
    payload: {
      tealium_event: "select_promotion",
      ...ecomObj,
    },
  }
}


/**
 * Send the navigation click, page data
 */
export const trackNavigationClick = (link_name) => {
  return {
    type: TRACK_NAVIGATION_CLICK,
    payload: {
      tealium_event: "navigation_click",
      link_name
    },
  }
}

/**
 * Send the login, page data
 */
export const trackLogin = () => {
  return {
    type: TRACK_LOGIN,
    payload: {
      tealium_event: "login",
    },
  }
}

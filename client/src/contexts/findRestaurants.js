import React from 'react';
const RestaurantContext = React.createContext()

export const RestaurantProvider = RestaurantContext.Provider
export const RestaurantConsumer = RestaurantContext.Consumer

export default RestaurantContext
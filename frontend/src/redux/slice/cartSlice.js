import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import {
  calculateSalePrice,
  calculateTimeout,
  history,
} from "../../utils/Utils";
import { EXPIRE_TIME } from "../../utils/constant";

let timeId;

const ClearCartLocalStorage = () => {
  if (timeId) clearTimeout(timeId);
  const { products = [], time } =
    JSON.parse(localStorage.getItem("cart")) || {};
  if (products.length < 0) return;
  const timeOut = calculateTimeout(time, EXPIRE_TIME);
  if (!timeOut) {
    localStorage.removeItem("cart");
    history.navigate(0);
  }
  timeId = setTimeout(() => {
    return ClearCartLocalStorage();
  }, timeOut);
};

const updateLocalStorage = (data) => {
  localStorage.setItem(
    "cart",
    JSON.stringify({
      time: new Date(),
      products: data,
    })
  );
  timeId = setTimeout(() => {
    if (timeId) clearTimeout(timeId);

    localStorage.removeItem("cart");
    history.navigate(0);
  }, EXPIRE_TIME);
};

// export const addToCart = createAsyncThunk(
//   "cart/addToCart",
//   async ({ product, productList =[]  }) => {
//     try {
//       console.log(product);
//       const oldProduct = productList.find(
//         (p) => p._id === product._id && p.size?._id === product.size?._id
//       );
//       const newProduct = { ...product };

//       if (oldProduct) {
//         newProduct.quantity += oldProduct.quantity;
//       }

//       return { newProduct  };
//     } catch (error) {}
//   }
// );

// export const updateToCart = createAsyncThunk(
//   "cart/updateToCart",
//   async ({ product, index,  }) => {
//     try {

//       return { product, index };
//     } catch (error) {}
//   }
// );

// export const removeToCart = createAsyncThunk(
//   "cart/removeToCart",
//   async ({ index }) => {
//       return  index;
//   }
// );
export const setInitStateCart = createAsyncThunk(
  "cart/setInitStateCart",
  async (info) => {
    try {
      let newProducts = [];
      const { products = [] } = JSON.parse(localStorage.getItem("cart")) || [];
      // if (Object.keys(info)?.length) {
      //   const { data = [] } = await axiosClient.get("/api/v1/user/cart");
      //   newProducts = [...data];
      //   if (products.length) {
      //     if (newProducts.length) {
      //       newProducts.forEach((np, i) => {
      //         const index = products.findIndex(
      //           (p) => p._id === np._id && p.size?._id === np.size?._id
      //         );
      //         if (index > -1) {
      //           return (newProducts[i].quantity += products[index].quantity);
      //         }
      //       });
      //     }
      //     const localProduct = products.filter((p) => {
      //       const check = newProducts.find(
      //         (np) => p._id === np._id && p.size?._id === np.size?._id
      //       );
      //       if (!check) return true;
      //       return false;
      //     });

      //     newProducts = [...newProducts, ...localProduct];

      //     await Promise.all(
      //       newProducts.map(async (p) => {
      //         return await axiosClient.put(`/api/v1/user/cart`, {
      //           pid: p._id,
      //           size: p.size && p.size._id,
      //           quantity: p.quantity,
      //         });
      //       })
      //     );
      //   }
      //   localStorage.removeItem("cart");
      // }
      ClearCartLocalStorage();
      return products;
    } catch (error) {}
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    loading: false,
  },
  reducers: {
    clearState: (state, action) => {
      state.products = [];
      localStorage.removeItem("cart");
    },
    addToCart: (state, action) => {
      const newItem = action.payload;
      const index = state.products.findIndex(
        (i) => i._id === newItem._id && i.size?._id === newItem.size?._id
      );
      if (index < 0) {
        state.products.push(newItem);
      } else {
        state.products[index].quantity += newItem.quantity;
      }
      updateLocalStorage(state.products);
    },
    removeFromCart: (state, action) => {
      const index = action.payload;
      state.products.splice(index, 1);
      updateLocalStorage(state.products);
    },
    updateFromCart: (state, action) => {
      const { item, index } = action.payload;
      state.products[index] = item;
      updateLocalStorage(state.products);
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(addToCart.fulfilled, (state, { payload }) => {
      //   const newItem = payload.newProduct;
      //   const index = state.products.findIndex(
      //     (i) => i._id === newItem._id && i.size?._id === newItem.size?._id
      //   );
      //   if (index < 0) {
      //     state.products.push(newItem);
      //   } else {
      //     state.products[index] = newItem;
      //   }
      //     updateLocalStorage(state.products);
      // })
      // .addCase(updateToCart.fulfilled, (state, { payload }) => {
      //   state.products[payload.index] = payload.product;
      //     updateLocalStorage(state.products);

      // })
      // .addCase(removeToCart.fulfilled, (state, { payload }) => {
      //   state.products.splice(payload.index, 1);

      //     updateLocalStorage(state.products);

      // })
      .addCase(setInitStateCart.fulfilled, (state, { payload = [] }) => {
        state.products = payload;
      })
      .addCase(setInitStateCart.rejected, (state, { payload = [] }) => {
        state.products = [];
      });
  },
});

export const selectCartSummary = createSelector(
  (state) => state.cart.products,
  (list) =>
    list?.reduce(
      (val, item) => {
        val.totalPrice += item.price * item.quantity;
        val.promotion += item.salePercent
          ? (item.price - calculateSalePrice(item.price, item.salePercent)) *
            item.quantity
          : 0;
        return val;
      },
      {
        totalPrice: 0,
        promotion: 0,
      }
    )
);

export default cartSlice;

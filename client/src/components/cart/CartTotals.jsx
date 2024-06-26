import { Button, Popconfirm, message } from "antd";
import BarcodeScan from "../products/BarcodeScan";
import axios from "axios";
import useScanDetection from "use-scan-detection";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addProduct } from "../../redux/cartSlice";
import {
  ClearOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteProduct,
  increase,
  decrease,
  reset,
} from "../../redux/cartSlice";

const CartTotals = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [barcodeModal, setBarcodeModal] = useState(false);
  const [barcodeScan, setBarcodeScan] = useState("no barcode scanned");
  useScanDetection({
    onComplete: (code) => setBarcodeScan(code),
    minLength: 3,
  });
  const handleScanBarcode = async () => {
    try {
      const result = await axios.get(
        process.env.REACT_APP_SERVER_URL +
          `/api/products/get-one/${barcodeScan}`
      );
      dispatch(
        addProduct({ ...result.data, quantity: 1, key: result.data._id })
      );
      setBarcodeScan(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="cart h-full max-h-[calc(100vh_-_90px)] flex flex-col">
      <h2 className="bg-blue-600 text-white p-4 font-bold tracking-wide">
        Products in Cart
      </h2>
      <ul className="cart-items px-2 flex flex-col gap-y-3 pt-2 py-2 overflow-y-auto">
        {cart.cartItems.length > 0 ? (
          cart.cartItems
            .map((item) => (
              <li className="cart-item flex justify-between" key={item._id}>
                <div className="flex items-center">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-16 w-16 object-cover cursor-pointer"
                    onClick={() => dispatch(deleteProduct(item))}
                  />
                  <div className="flex flex-col pl-2">
                    <b>{item.title}</b>
                    <span>
                      {item.price && item.price.toFixed(2)} AED x{" "}
                      {item.quantity}
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Button
                    type="primary"
                    size="small"
                    className="w-full flex items-center justify-center !rounded-full"
                    icon={<PlusCircleOutlined />}
                    onClick={() => dispatch(increase(item))}
                  />
                  <span className="font-bold inline-block w-6 text-center">
                    {item.quantity}
                  </span>
                  <Button
                    type="primary"
                    size="small"
                    className="w-full flex items-center justify-center !rounded-full"
                    icon={<MinusCircleOutlined />}
                    onClick={() => {
                      if (item.quantity === 1) {
                        if (window.confirm("Delete the Product?")) {
                          dispatch(decrease(item));
                          message.info("Product removed from cart.");
                        }
                      }
                      if (item.quantity > 1) {
                        dispatch(decrease(item));
                      }
                    }}
                  />
                </div>
              </li>
            ))
            .reverse()
        ) : (
          <div className="text-center mt-2 font-bold">No items in cart...</div>
        )}
      </ul>
      <div className="cart-totals mt-auto">
        <div className="border-b border-t">
          <div className="flex justify-between p-2">
            <b>Subtotal</b>
            <span>
              <span>
                {cart.total && cart.total.toFixed(2) > 0
                  ? cart.total.toFixed(2)
                  : 0}{" "}
                AED
              </span>
            </span>
          </div>
          <div className="flex justify-between p-2">
            <b>Tax % {cart.tax}</b>
            <span className="text-red-700">
              {(cart.total * cart.tax) / 100 > 0
                ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                : 0}
              AED
            </span>
          </div>
        </div>
        <div className="border-b mt-4">
          <div className="flex justify-between p-2">
            <b className="text-xl text-green-500">Total Amount</b>
            <span className="text-xl">
              {(cart.total + (cart.total * cart.tax) / 100).toFixed(2) > 0
                ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                : 0}
              AED
            </span>
          </div>
        </div>
        <div className="py-4 px-2">
          <Button
            type="primary"
            size="large"
            className="w-full"
            disabled={cart.cartItems.length > 0 ? false : true}
            onClick={() => navigate("/cart")}
          >
            Add to Cart
          </Button>
          <Button
            type="primary"
            size="large"
            className="w-full my-2 "
            onClick={handleScanBarcode}
          >
            Scan Items
          </Button>
          <Popconfirm
            title="Delete Products"
            description="Are you sure you want to delete the products?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => dispatch(reset())}
            className="w-full mt-2 flex items-center justify-center"
          >
            {cart.cartItems.length > 0 ? (
              <Button
                type="primary"
                size="large"
                className="w-full mt-2 flex items-center justify-center"
                icon={<ClearOutlined />}
                danger
                disabled={cart.cartItems.length > 0 ? false : true}
              >
                Delete
              </Button>
            ) : (
              ""
            )}
          </Popconfirm>
          <BarcodeScan
            barcodeModal={barcodeModal}
            setBarcodeModal={setBarcodeModal}
          />
        </div>
      </div>
    </div>
  );
};

export default CartTotals;

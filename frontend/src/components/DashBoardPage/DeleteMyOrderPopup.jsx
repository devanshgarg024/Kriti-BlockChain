import React from "react";
import "./ClaimCredit/EarnCredit/ConfirmPopup.css";
import "./SellCredit/popups/SellConfirmPopuUp.css";
import ethsvg from "./SellCredit/popups/eth.svg";

const DeleteMyOrderPopup = (props) => {
  const handleDelete = () => {
    props.handleDeleteOrder(props.deleteOrderData.orderId);
    props.popupDelete(2);
  };
  return (
    <>
      <button className="popup-close" onClick={() => props.popupDelete(false)}>
        &times;
      </button>
      <div className="popup-title-parent">
        <h2 className="popup-title">Cancel Sell Order</h2>
        <p>Are you sure you want to cancel this sell order?</p>
      </div>

      <div class="success-container">
        <div class="success-circle">
          <svg
            class="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              class="checkmark-circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <text
              x="50%"
              y="55%"
              fontSize="50"
              // fontWeight="bold"
              textAnchor="middle"
              fill="black"
              dominantBaseline="middle"
            >
              ❓
            </text>
          </svg>
        </div>
      </div>
      <div className="ConfirmCredit-details">
        <h3>
          Amount to Sell :{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-lightning-fill"
            viewBox="0 0 16 16"
          >
            <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641z" />
          </svg>{" "}
          {props.deleteOrderData.amountToSell}
        </h3>
        <h3>Sell Order : </h3>
        <h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-lightning-fill"
            viewBox="0 0 16 16"
          >
            <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641z" />
          </svg>{" "}
          1 CCT = <img src={ethsvg} width="16" height="16" /> {props.deleteOrderData.pricePerToken}{" "}
          ETH
        </h3>
      </div>
      <div className="input-container">
        <button className="confirm-button confirm-button-Delete" onClick={() => handleDelete()}>
          Yes
        </button>
      </div>
    </>
  );
};

export default DeleteMyOrderPopup;

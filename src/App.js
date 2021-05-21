import React, { useState } from "react";
import { useSelector } from "react-redux";
import useModal from "./hooks/useModal";
import Modal from "./components/Modal";
import MC from "./images/mc_symbol.svg";
import visa from "./images/visa.svg";
import noname from "./images/debit-card.svg";

const GOLEFT = -1;
const GORIGHT = 1;
const GOLAST = 10;

function App() {
  const [currentView, changeCurrentView] = useState({
    doPayment: false,
    summaryShow: true,
    confirmShow: false,
  });

  const [currentCard, changeCard] = useState(0);
  const cards = useSelector((state) => state);
  const [modalShow, toggleModal] = useModal(false);

  const { number, holder, issuer, expM, expY } = cards[currentCard];
  const { doPayment, summaryShow, confirmShow } = currentView;

  const changeCurrentCardView = (direction) => {
    if (direction === GORIGHT && currentCard === cards.length - 1) {
      changeCard(0);
      return;
    }
    if (direction === GOLEFT && currentCard === 0) {
      changeCard(cards.length - 1);
      return;
    }
    if (direction === GOLAST) {
      changeCard(cards.length);
      return;
    }

    changeCard(() => currentCard + direction);
  };

  const chooseCard = (e) => {
    const conf = window.confirm(
      `Finish the payment with card ${e.currentTarget.id} ?`
    );
    if (conf === true) {
      changeCurrentView({
        doPayment: !doPayment,
        confirmShow: !confirmShow,
        summaryShow: !summaryShow,
      });
    }
  };

  return (
    <div className="allwrapper">
      {summaryShow && (
        <div>
          <p>You have 5 selected items</p>
          <p>Total: 2000$</p>
          <button
            onClick={() =>
              changeCurrentView({ ...currentView, doPayment: !doPayment })
            }
          >
            Check out
          </button>
        </div>
      )}

      {doPayment && (
        <>
          <h2>Select a card for paying:</h2>
          <div className="cardwrapper">
            <button onClick={() => changeCurrentCardView(GOLEFT)}>Prev</button>
            <div className="slider" id={number} onClick={chooseCard}>
              <img
                src={
                  cards[currentCard].issuer === "MasterCard"
                    ? MC
                    : cards[currentCard].issuer === "Visa"
                    ? visa
                    : noname
                }
                alt="symbol"
                width="50"
              />
              <div>
                {" "}
                <p>{holder}</p>
                <p>{number}</p>
                <p>{issuer}</p>
                <span>{expM} / </span>
                <span>{expY}</span>
              </div>
            </div>
            <button onClick={() => changeCurrentCardView(GORIGHT)}>Next</button>
            <br />
          </div>{" "}
          <button onClick={toggleModal}>Add New Card</button>
        </>
      )}

      {confirmShow && (
        <>
          <h1>Thank you!</h1>
          <p>Your payment was successful</p>
          <p>You was charged 2000$</p>
          <p>Used card number: {number}</p>
        </>
      )}

      {modalShow && (
        <Modal onHideModal={toggleModal} onAddingCard={changeCurrentCardView} />
      )}
    </div>
  );
}

export default App;

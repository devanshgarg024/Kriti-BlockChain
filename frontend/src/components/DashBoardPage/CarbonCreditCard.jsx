import "./CarbonCreditCard.css"; // Create this CSS file to style the card.

const CarbonCreditCard = () => {
  return (
    <div className="card">
      <h5 className="card-title">
        {" "}
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
        Carbon Credit Token(CCT)*
      </h5>
      {/* <div>*1 CCT is earned for every 10 kWh of renewable energy generated.</div> */}
      <div className="card-content">
        <div className="CCT">
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
          <strong>{" "} 1 CCT </strong>= 100 kWh
        </div>
        <ul className="card-list">
          <li>
            Use each CCT to offset emissions via AMPLY's government-backed
            program.
          </li>
          <li>
            Sell excess tokens or buy more to further cut your carbon footprint.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CarbonCreditCard;

import "./CarbonCreditCard.css"; // Create this CSS file to style the card.

const CarbonCreditCard = () => {
  return (
    <div className="card">
      <h5 className="card-title">⚡Carbon Credit Token(CCT)*</h5>
      {/* <div>*1 CCT is earned for every 10 kWh of renewable energy generated.</div> */}
      <div className="card-content">
        <div className="CCT"><strong>⚡1 CCT = 10 kWh</strong></div>
        <ul className="card-list">
          <li>Use each CCT to offset emissions via AMPLY's government-backed program.</li>
          <li>Sell excess tokens or buy more to further cut your carbon footprint.</li>
        </ul>
      </div>
    </div>
  );
};

export default CarbonCreditCard;
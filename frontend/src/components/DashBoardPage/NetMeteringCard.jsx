import "./NetMeteringCard.css";

const NetMeteringCard = () => {
  const data = [
    { type: "Wind", value: "756.24MWh", icon: "💨", change: "-5.50%" },
    { type: "Solar", value: "1237.63MWh", icon: "🌤️", change: "-5.50%" },
    { type: "Thermal", value: "2361.24MWh", icon: "🔥", change: "-5.50%" },
  ];

  return (
    <div className="card-container">
      <div className="card-container-sub">
        <h3 className="card-title">Net metering</h3>
        {data.map((item, index) => (
          <div key={index} className="card-row">
            <div className="card-icon">{item.icon}</div>
            <div className="card-content">
              <p className="card-value">
                {item.value} | {item.type}
              </p>
              <p className="card-change">
                <span className="red-arrow">↓ {item.change}</span> than last
                month
              </p>
            </div>
          </div>
        ))}
        <div className="card-footer">
          <p>April carbon offset</p>
          <button className="offset-value">367.37 MWh</button>
        </div>
      </div>
    </div>
  );
};

export default NetMeteringCard;

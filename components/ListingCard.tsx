export function ListingCard() {
  return (
    <article className="listing" aria-label="Example charger listing">
      <div className="listing-top">
        <span>Example listing</span>
        <span>Today</span>
      </div>
      <p className="listing-time">6:00–7:30</p>
      <p className="listing-meta">1 hour 30 min · buffer held until 7:45</p>
      <dl className="listing-facts">
        <div>
          <dt>Plug</dt>
          <dd>15A · about 3.3 kW</dd>
        </div>
        <div>
          <dt>Rate</dt>
          <dd>₹50 / hour</dd>
        </div>
        <div>
          <dt>This slot</dt>
          <dd>₹75</dd>
        </div>
      </dl>
      <p className="listing-note">A picture of the slot model. Not a live charger.</p>
    </article>
  );
}

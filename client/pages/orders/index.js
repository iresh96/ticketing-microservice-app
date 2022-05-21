const OrderIndex = ({ orders }) => {
  const getBadgeClass = (status) => {
    let className;

    switch (status) {
      case "awaiting:payment":
        className = "badge bg-info";
        break;

      case "created":
        className = "badge bg-secondary";
        break;
      case "cancelled":
        className = "badge bg-danger";
        break;
      case "complete":
        className = "badge bg-success";
        break;
      default:
        className = "badge bg-secondary";
        break;
    }
    return className;
  };

  const orderList = orders.map((order) => {
    console.log(getBadgeClass(order.status));
    return (
      <tr key={order.id}>
        <td>{order.ticket.title}</td>
        <td>{order.ticket.price}</td>
        <td>
          <span className={getBadgeClass(order.status)}>
            {order.status.toUpperCase()}
          </span>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h1>Tickets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Ticket Name</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{orderList}</tbody>
      </table>
    </div>
  );
};

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get("/api/orders");

  return { orders: data };
};

export default OrderIndex;

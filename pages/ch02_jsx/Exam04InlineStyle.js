function Exam04InlineStyle(props) {
  const name = "React";
  const myStyle = {
    backgroundColor: "black",
    color: "aqua",
    fontSize: "24px",
    fontWeight: "bold",
    padding: 8,
  };

  return (
    <div className="card">
      <div className="card-header">Exam04InlineStyle</div>
      <div className="card-body">
        <div
          style={{
            backgroundColor: "black",
            color: "aqua",
            fontSize: "24px",
            fontWeight: "bold",
            padding: 8,
          }}
        >
          {name}
        </div>
        <hr />
        <div style={myStyle}>{name}</div>
      </div>
    </div>
  );
}

export default Exam04InlineStyle;

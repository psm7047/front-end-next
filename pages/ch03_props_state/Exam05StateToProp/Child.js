function Child(props) {
    const changeImg = (event) => {
        props.changeImg();
    };

  return (
    <div className="card">
        <div className="card-header">
            Child
        </div>
        <div className="card-body">
            <button className="btn btn-info btn-sm" onClick={changeImg}>이미지 변경</button>
            <div className="mt-2">
                <img src={"/resources/img/" + props.img} alt="" width="150"/>
            </div>
        </div>
      </div>
  );
}

export default Child;
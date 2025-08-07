function Card({ image, name, id, onHandleClick }) {
  return (
    <div onClick={() => onHandleClick(id)}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
    </div>
  );
}

export { Card };

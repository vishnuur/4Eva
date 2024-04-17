import "./index.scss";

interface cardProps {
  name: string;
  phone: string;
  address: string;
  image: string;
}
export default function UserCards({ name, phone, address, image }: cardProps) {
  return (
    <div className="card-wrap">
      <img src={image}></img>
      <div className="card-details">
        <p className="card-title">{name}</p>
        <p className="card-phone">{phone}</p>
        <p className="card-address">{address}</p>
      </div>
    </div>
  );
}

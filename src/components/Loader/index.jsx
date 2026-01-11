import { ClipLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="flex-center" style={{ margin: "20px 0" }}>
      <ClipLoader color="var(--primary-color)" size={50} />
    </div>
  );
}

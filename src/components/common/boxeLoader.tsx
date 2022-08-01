import  {BoxesLoader} from "react-awesome-loaders";
import  "../../styles/boxLoader.css"
export const BoxesLoaderComponent = () => {
  return (
    <div className="boxLoaderContainer">
      <BoxesLoader
        boxColor={"#6366F1"}
        style={{ marginBottom: "20px" }}
        desktopSize={"128px"}
        mobileSize={"80px"}
      />
    </div>
  );
};
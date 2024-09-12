import { Theme } from "@radix-ui/themes";
import CustomAlert from "../components/custom-alert";
import "@radix-ui/themes/styles.css";

const Dashboard = () => {
  return (
    <div className="w-[80%] mx-auto ml-[15%]">
      <CustomAlert type="success" content="Hello Admin" />
    </div>
  );
};

export default Dashboard;

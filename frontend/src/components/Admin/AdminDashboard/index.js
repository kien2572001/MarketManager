import DashboardLayout from "../../../layouts/DashboardLayout";
import TextEditor from "components/Common/TextEditor";
import { useState } from "react";
import parse from "html-react-parser";

const AdminDashboard = () => {
  const [value, setValue] = useState("");
  return (
    <DashboardLayout layoutRole={0}>
      <h1>Admin Dashboard</h1>
      <TextEditor value={value} setValue={setValue} />
      <div>{parse(value)}</div>
    </DashboardLayout>
  );
};

export default AdminDashboard;

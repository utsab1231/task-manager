import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GET_TASK } from "../utils/constants.js";
import axios from "axios";
import TaskCard from "./TaskCard.jsx";

function TaskPage() {
  const user = JSON.parse(useSelector((state) => state.user));
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const headers = { auth: user.token };
    axios.get(GET_TASK, { headers: headers }).then((res) => {
      setUserData(res.data.data);
    });
  }, [user]);

  const sortedData = userData.sort((a, b) => {
    if (a.priority !== b.priority) {
      return b.priority - a.priority;
    } else {
      // If priorities are equal, sort by updatedAt in descending order
      return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
    }
  });

  return (
    <>
      <div className=" mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 gap-8 justify-center">
        {sortedData &&
          sortedData.map((task) => <TaskCard key={task._id} task={task} />)}
      </div>
    </>
  );
}

export default TaskPage;

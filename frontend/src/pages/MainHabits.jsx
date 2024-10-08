import React, { useState, useEffect } from "react";
import HabitPageTitle from "../components/habit/HabitPageTitle.jsx";
import HabitsDisplay from "../components/habit/HabitsDisplay.jsx";
import AddHabit from "../components/habit/modals/AddHabit.jsx";
import Verify from "../components/Verify.jsx";
import { useNavigate } from "react-router-dom";

const MainHabits = (props) => {
  const user = props.user || JSON.parse(localStorage.getItem('user'));
  console.log("USER IS EQUAL")
  console.log(user)
  const [addState, setAddState] = useState(false)
  const [tab, setTab] = useState("Main")
  const [sortState, setSortState] = useState(["none", "up"])

  const navigate = useNavigate()

  console.log("Enterd main habit and user is define: " + user)

  useEffect(() => {
    props.setLogged(true);
    props.setUser(user);

    if(!user){
      console.log("TIME TO NAVIGATE")
      navigate('/welcome')}
  }, []);

  useEffect(() => {
    if(!user || !user.verified){
      setAddState(false)
    }
  }, [addState]);

  // function to request new code


  // function to request 


  return (
    <>
    <div className="fixed inset-x-0 top-0 pt-0 z-50 mb-32">
      <HabitPageTitle user={user} addState={addState} setSortState={setSortState} setAddState={setAddState} tab={tab} setTab={setTab}/>
    </div>
    {user && user.verified ? <div className="relative overflow-hidden md:pt-28 lg:pt-32 pt-24 ">
    {(addState) ? (<AddHabit setAddState={setAddState} user={user}/>) : (<HabitsDisplay sortState={sortState} user={user} tab={tab}/>) }
    </div> :  user ? <Verify user={user} setUser={props.setUser}/>
            :  <div className="relative overflow-hidden md:pt-28 lg:pt-32 pt-24 text-center text-white"> Login to see habits</div>}
    </>
  );
};

export default MainHabits;

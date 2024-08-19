import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { IoIosColorPalette } from "react-icons/io";
import { FcExpand } from "react-icons/fc";
import LinearBar from "../LinearBar";
import BlocksBar from "../BlocksBar";
import { MdRemoveRedEye } from "react-icons/md";
import EditModal from "./EditModal";
import DateTools from "../../DateTools";

const SingleHabit = (props) => {
  const deleteHabit = props.deleteHabit;
  const setEdit = props.setEdit; 
  const setDel = props.setDel;   

  const initData = props.habit;
  const [habit, setHabit] = useState(initData);

  const startEdit = () => {
    setEdit([true, habit, setHabit])
  }

  const startDel = () => {
    setDel([true, habit])
  }


  return (
    <div className={` flex flex-col font-thin justify-between w-3/5 text-gray-300  rounded-3xl border-blue-900 rounded-tl-none rounded-bl-none bg-blue-900  border-2 bg-opacity-80 blur-30 my-2 backdrop-filter backdrop-blur-xl`}>
      
      <div className="flex flex-row w-full">

                  {/*  Main Display of Habit Data */}
                  <div className="flex flex-col w-full py-3 justify-center">
                      <div className={`px-3 mb-1 rounded-lg  text-base md:text-xl lg:text-4xl self-start leading-extra-tight font-normal`}>
                        <span className="font-thin"><i>{props.index + ") "}</i></span>{habit.desc}
                      </div>

                      <div className="flex flex-row items-center">
                              <div className="pl-3 flex flex-col ">
                                <div className="text-xs hidden md:hidden lg:block lg:text-sm text-center">Started: &nbsp;</div>
                                <div className="text-xs hidden md:hidden lg:block lg:text-sm text-center ">Ends: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div> 

                                
                                

                            </div>
                            <div className=" flex flex-row lg:flex-col  ">
                            <div className="self-center text-xs md:text-xs lg:text-sm"><i>{DateTools.dateRender(habit.createdAt)}</i></div>
                            <div className="self-center px-1 lg:hidden text-xs md:text-xs lg:text-sm"> ~ </div>
                              <div className="self-center text-xs md:text-xs lg:text-sm"><i>
                                {DateTools.dateRender(DateTools.DurationToDate(habit.createdAt, habit.duration))}</i></div>
                            </div>

                        

                            
                      </div>

                      <div className="mt-1 pl-3 text-xs md:text-xs lg:text-sm">
                       <i>Duration: {" " + habit.duration} days</i>
                      </div>


                    
     
                  </div>

                  

                  {/*  Left Side of the habit display containing icons */}
                  <div className="flex flex-col justify-between py-3">
                    <div className="flex flex-row pr-2">

                    <div 
                      className="duration-300 p-2 mr-1 cursor-pointer text-md lg:text-2xl my-auto bg-black bg-opacity-30 border-2 border-slate-600 hover:bg-gray-600 rounded-lg shadow-2xl"
                      onClick={() => {props.setView([true, habit])}}
                      >
                    <MdRemoveRedEye/>
                      </div>

                      <div 
                      className="duration-300 p-2 mr-1 cursor-pointer text-md lg:text-2xl my-auto bg-black bg-opacity-30 border-2 border-slate-600 hover:bg-slate-600 rounded-lg shadow-2xl"
                      onClick={startEdit}
                      >
                    <CiEdit/>
                      </div>

                      <div 
                      className="duration-300 p-2 cursor-pointer text-md lg:text-2xl my-auto bg-black bg-opacity-30 border-2 border-slate-600 hover:bg-slate-600 rounded-lg shadow-2xl"
                      onClick={startDel}
                      >
                    <RiDeleteBin6Line/>
                      </div>

                    </div>

                  

                  </div>
    
        
      </div>

      <div className="p-3 pt-1 w-full">
                        {!habit.discrete ? <LinearBar start={habit.createdAt} duration={habit.duration} /> : <BlocksBar start={habit.createdAt} end={habit.duration} />}
      </div>


          
    </div>
  );
};

export default SingleHabit;

// <div className="text-4xl flex flex-row items-center pb-2">

// <div className="p-2">

// </div>

// <div className="ml-2 text-3xl shadow-inner shadow-blue-950 bg-opacity-7 rounded-md border-white border-0 bg-blue-900 p-3">{habit.desc}</div>
// <div className="text-sm">
//   <button onClick={() => setColor('bg-blue-700')}>blue</button><br />
//   <button onClick={() => setColor('bg-red-950')}>red</button><br />
//   <button onClick={() => setColor('bg-green-300')}>green</button><br />
//   <button onClick={() => setColor('bg-yellow-900')}>green</button><br />
// </div>

// </div>

// <div>
// <div className=" text-sm">
//   Start Date : {dateRender(habit.createdAt)}
//   <br />
//   End Date : {dateRender(habit.endDate)}
//   {/* Archived : {habit.archived ? 'T ' : 'F '}
// Success : {habit.success ? 'T ' : 'F '}<br /> */}
//   {/* Discrete : {habit.discrete ? "T " : "F "} */}
 
//   {/* Habit ID : {habit._id}<br /> */}
// </div>
// </div>


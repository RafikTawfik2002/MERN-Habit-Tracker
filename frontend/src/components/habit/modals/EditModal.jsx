import React, { useEffect, useState, useRef } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import HabitDataServices from "../../../../services/habits"
import Slider from "../../Slider";
import DateTools from "../../../DateTools";
import habits from "../../../../services/habits";
import HabitDisplay from "../HabitsDisplay"


const EditModal = (props) => {


    const [message, setMessage] = useState("")
    const [habit, setHabit] = useState({...props.habit, duration: DateTools.DateToInput(DateTools.DurationToDate(props.habit.createdAt, props.habit.duration))})

    console.log(habit)

    const initDuration = props.habit.duration
    const initDate = DateTools.dateRender(DateTools.DurationToDate(props.habit.createdAt, props.habit.duration))
    console.log("from the edit modal")
    console.log(habit)



    const [isDuration, setIsDuration] = useState(false);
    const hasMounted = useRef(false);


    // useEffect( () => {
    //     console.log("use effect 2 ran")
    //     console.log(habit)
    //     setHabit(prevState => ({
    //         ...prevState,
    //         duration : DateTools.DateToInput(DateTools.DurationToDate(props.habit.createdAt, props.habit.duration))
    //       }));
    // }, [])

    useEffect( () => {
        if(hasMounted.current){
        console.log("use effect 1 ran")
        console.log(habit)
        setHabit(prevState => ({
            ...prevState,
            duration : ""
          }));
        }
        else{
            hasMounted.current = true
        }

    }, [isDuration])








    const handleInputChange = event => {
        const { name, value } = event.target; //get name and value from the target
        console.log("handle input ran")
        setHabit(prevState => ({
            ...prevState,
            [name]: value
          }));
      };

    const discrete = (on) => {
        console.log("discrete ran: " + on)
        setHabit(prevState => ({
            ...prevState,
            discrete: on
          }))
    }

 
        // function to validate form
    const validate = () => {
            // console.log("Endate is : " + habit.endDate) 
            // console.log("Endate to date is : " + new Date(habit.endDate.split('-').map(Number))) 
            // console.log("Endate to date is : " + new Date(2024, 7, 31).toUTCString()) 
            if(!habit.desc || !habit.duration){
                setMessage("Please fill all fields")
                return;
            }
            const date = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    
            if(!isDuration && !date.test(habit.duration)){
                setMessage("Invalid Date")
                return;
            }
            const num = /^[1-9]\d*$/;
            if(isDuration && !num.test(habit.duration)){
                setMessage("Duration must be a number")
                return;
            }
    
            if(isDuration && habit.duration < initDuration ){
                setMessage("Duration can only be extended")
                return;
            }
            if(!isDuration){
                //DateTools.DateToDuration(new Date(), habit.duration)
                const durationSet = DateTools.DateToDuration(habit.createdAt, new Date(habit.duration.split('-').map(Number)))
                console.log("calculating duration is: " + durationSet)
                if(durationSet < initDuration ){
                    setMessage("Duration can only be extended")
                    return;
                }

                updateHabit(durationSet)
            }
            else if(isDuration){
                updateHabit(habit.duration)
            }
            }



  // updating habit
        // function to add habit
        const updateHabit = (duration) => {
            console.log("updating using duration: " + duration )
            
            const newHabit = {
                desc: habit.desc,
                duration: duration,
                archived: ""+habit.archived,
                success: ""+habit.success,
                discrete: ""+habit.discrete,
                userID: habit.userID,
                lastLogin: ""+ (habit.lastLogin || 0),
                text: habit.text
            }
            
            
            HabitDataServices.updateHabit(habit._id, newHabit)
            .then((response) => {
                console.log("Setting habit discrete value to")
                console.log(habit)
                props.setHabit(previous => ({...previous, desc: habit.desc,
                    duration: Number(duration), discrete: habit.discrete, text: habit.text}))
                props.setEdit();
            })
            .catch((error) => {
                console.log(error)
          });

    }



  return (
    <div
      className="z-50 bg-black bg-opacity-70 fixed top-0 bottom-0 left-0 right-0  flex flex-row justify-center items-center"
      onClick={props.setEdit}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className={`flex flex-col font-thin w-[80%] md:w-[65%] lg:w-[45%] text-gray-200 tracking-wider rounded-3xl border-blue-900  bg-blue-900  border-2 bg-opacity-60 blur-30 backdrop-filter backdrop-blur-xl`}
      >

        <div className="my-12 mb-8 text-center lg:text-2xl md:text-xl text-md font-bold"> Edit Habit</div>

        <div className="flex flex-col mx-14 lg:text-lg md:text-lg text-md">

                <div>
                <label className="p-3 pt-0 pl-0">Habit Title:</label>
                <input 
                className="bg-blue-950 rounded-xl w-full mt-2 text-2xl"
                name="desc"
                value={habit.desc}
                autoComplete="off"
                onChange={handleInputChange}
                >

                
                    
                
                </input>
                </div>

                <div className="mt-8">
                <label className=" pt-0 pl-0">Habit Description:</label>
                <textarea 
                className="bg-blue-950 min-h-20 rounded-xl w-full mt-2 text-xs"
                name="text"
                value={habit.text}
                autoComplete="off"
                onChange={handleInputChange}
                >

                
                </textarea>
                </div>

                <div className="mt-7 text-sm tracking-normal text-center">
                    {isDuration ? "Duration" : "End date"} can only be extended
                </div>

                <div className="mt-1 text-xs tracking-normal text-center">
                    Current {!isDuration ? <>end date:  <i> {initDate} </i></> : ("duration:  " + initDuration)}
                </div>



                <div className="mt-1">
                <label className='p-3 pl-0'>{ !isDuration ? "Habit End Date" : "Duration in days"} </label>
                <input type={!isDuration ? "date" : "text"}
                    name='duration'
                    value={habit.duration}
                    onChange={handleInputChange}
                    className="block bg-blue-950 rounded-xl w-full mt-2"
                    autoComplete="off"
                    placeholder={ !isDuration ? "yyyy-mm-dd" : "Extend number of days"} 
                    // placeholder={ !duration ? "yyyy-mm-dd" : "Extend number of days"}
                />
                </div>

 


            <div className='flex justify-between items-center pt-9 text-gray-300 w-5/6  mx-auto'>
                <div>
                Block View
                </div>
                <div>

                <Slider setter={discrete} initial={habit.discrete}/>
                </div>
            </div>

            <div className='flex justify-between items-center pt-5 text-gray-300 w-5/6 mx-auto '>
            <div>
            Duration instead of end date
            </div>
            <div>

            <Slider setter={setIsDuration}/>
            </div>
        </div>



            <div className="mt-6 p-0 text-red-700 text-center">
                {message}
            </div>

 


            <div className="flex flex-row pt-5 mb-8 mt-2 items-center justify-evenly">
                
                <button
                className="py-2 rounded-xl border-green-500 duration-300 hover:bg-green-600 border bg-green-700 text-white w-[40%] my-3 mx-2"
                onClick={() => {validate()}}
                >
                    Save Changes
                </button>

                <button
                className="py-2 rounded-xl  border-gray-400 duration-300 hover:bg-gray-600 border bg-gray-700 text-white w-[40%] my-3 mx-2"
                onClick={props.setEdit}
                >
                    Cancel
                </button>
            </div>


            




           

        </div>
        
      </div>
    </div>
  );
};

export default EditModal;

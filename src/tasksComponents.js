import { useState } from "react";


class Task {
    name;
    isActive;


    constructor(name) {
        this.name = name
    }

}



// TODO: Re do this componentt and divide thefuntionality in diferent components

const TaskNode = (editMode = true) => {

    const [formData, setFormData] = useState({
    });

    const handleSubmit = (e) => {
        e.preventDefault();

    }


    const handleChange = ({ target: { name, value } }) => {
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    if (editMode) {

        return (
            <div>
                <form>

                    <label htmlFor="name" >Task's Name</label>
                    <input onChange={handleChange} id="name" name="name" type="text" placeholder="Jet a tech job!" required></input>

                    <label htmlFor="description" >Description</label>
                    <input onChange={handleChange} id="description" name="description" type="text" placeholder="Task's Description" ></input>

                    <label htmlFor="start">Start Date</label>
                    <input onChange={handleChange} id="start" name="start" type="date"></input>

                    <label htmlFor="finish">Finish Date</label>
                    <input onChange={handleChange} id="finish" name="finish" type="date"></input>

                    <button onClick={handleSubmit} type="submit">Done</button>

                </form>

            </div>
        )
    }


}
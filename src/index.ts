import dotenv from 'dotenv'
import Calendar from "./scripts/calendar";

dotenv.config()

const calendar = new Calendar();

async function StdOutput() {
    const GetProperty = async () => {
        const getProperty = await calendar.Get()
        console.log(`Get String: ${getProperty.string}`)
        console.log(`Get Json: ${JSON.stringify(getProperty.json).toString()}`)
    }

    const AddToYear = async () =>{
        const options = {
            played: 1,
            won: 1,
            draw: 0,
            lost: 0,
            for: 3,
            against: 1,
            gd: 2 
        }
        const addToYear = await calendar.Add([{selectedYear: 2010, inputData: options}])
        console.log(addToYear)  
    }

    const DeleteYear = async () => calendar.Delete(2013);
}
StdOutput();
import dotenv from 'dotenv'
import Calendar from "./scripts/charts";
import Terminal from './scripts/terminal';

dotenv.config()

const calendar = new Calendar();

// async function CalendarOutput() {
//     const GetProperty = async () => {
//         const getProperty = await calendar.Get()
//         console.log(`Get String: ${getProperty.string}`)
//         console.log(`Get Json: ${JSON.stringify(getProperty.json).toString()}`)
//     }

//     const AddToYear = async () => {
//         const options = {
//             team: '2',
//             played: 1,
//             wins: 2,
//             draws: 3,
//             losses: 4,
//             goalsScored: 5,
//             goalsAgainst: 6,
//         }
//         const addToYear = await calendar.Add([{ selectedYear: 2010, inputData: options }])
//         console.log(addToYear)
//     }

//     const DeleteYear = async () => calendar.Delete(2013);
// }

const terminal = new Terminal();

async function Administrator() {
    while (true) {
        await terminal.init();
    }
}
Administrator();

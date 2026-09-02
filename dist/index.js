"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const charts_1 = __importDefault(require("./scripts/charts"));
const terminal_1 = __importDefault(require("./scripts/terminal"));
dotenv_1.default.config();
const calendar = new charts_1.default();
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
const terminal = new terminal_1.default();
async function Administrator() {
    while (true) {
        await terminal.init();
    }
}
Administrator();

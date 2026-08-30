"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const calendar_1 = __importDefault(require("./scripts/calendar"));
dotenv_1.default.config();
const calendar = new calendar_1.default();
async function StdOutput() {
    const GetProperty = async () => {
        const getProperty = await calendar.Get();
        console.log(`Get String: ${getProperty.string}`);
        console.log(`Get Json: ${JSON.stringify(getProperty.json).toString()}`);
    };
    const AddToYear = async () => {
        const options = {
            played: 1,
            won: 1,
            draw: 0,
            lost: 0,
            for: 3,
            against: 1,
            gd: 2
        };
        const addToYear = await calendar.Add([{ selectedYear: 2010, inputData: options }]);
        console.log(addToYear);
    };
    const DeleteYear = async () => calendar.Delete(2013);
}
StdOutput();

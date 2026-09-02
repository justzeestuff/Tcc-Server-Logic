"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("node:readline/promises");
const node_process_1 = require("node:process");
class Terminal {
    pages;
    httpMethods;
}
exports.default = Terminal;
{ }
constructor();
{
    this.pages = ['კალენდარი', 'ცხრილები', 'საკონტაქტო', 'სიახლეები'];
    this.httpMethods = [{}];
}
async;
init();
{
    const appStart = 'გამარჯობა რისი შეცვლა გსურთ! \n';
    const ClientInterface = async () => {
        console.log(appStart);
        for (let i = 0; i < options.length; i++) {
            console.log(`[${i}]-${options[i]}`);
        }
    };
    const ClientInput = async () => {
        try {
            const rw = (0, promises_1.createInterface)({ input: node_process_1.stdin, output: node_process_1.stdout });
            const index = parseInt(await rw.question('აირჩიეთ რიცხვი: '));
            rw.close();
            if (isNaN(index) || index < 0 || index >= options.length) {
                console.log('მოცემული რიცხვი არასწორია გთხოვთ აირჩიეთ თავიდან');
                return ClientInterface();
            }
        }
        catch (err) {
            console.log(err);
            return UserSelection();
        }
    };
    await ClientInterface();
}

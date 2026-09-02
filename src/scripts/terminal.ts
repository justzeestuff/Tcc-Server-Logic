import { createInterface } from "node:readline/promises"
import { stdin, stdout } from "node:process"

export default class Terminal {
    private pages: { [key: string]: string };
    private httpMethods: { [key: string]: string }
    private terminalStart: string

    constructor() {
        this.pages = {
            'კალენდარი': 'cal',
            'ცხრილები': 'cha',
            'საკონტაქტო': 'con',
            'სიახლეები': 'new'
        }
        this.httpMethods = {
            'ინფორმაციის ნახვა': 'get',
            'ინფორმაციის შეცვლა | გაანახლება': 'put',
            'ინფორმაციის ამოშლა': 'del'
        }
        this.terminalStart = 'გამარჯობა რისი შეცვლა გსურთ!'
    }

    async Init() {
        this.TerminalInterface();
        this.Input()
    }

    TerminalInterface() {
        console.log(this.terminalStart)

        // List out avaliable pages
        Object.keys(this.pages).forEach((label, i) => {
            console.log(`[${i}]-${label}`)
        })

        // List out http methods
        Object.keys(this.httpMethods).forEach((label, i) => {
            console.log(`[${i}]-${label}`)
        })
    };

    async Input() {
        const rw = createInterface({ input: stdin, output: stdout });
        
        try {
            const input = await rw.question('აირჩიეთ რიცხვები:')
            rw.close();

            const nums: number[] = input.toString().split('').map(Number)

            const pageInput:   number = nums[0];
            const methodInput: number = nums[1];

            const cases: boolean[] = [
                pageInput > Object.entries(this.pages).length,
                pageInput < 0,

                methodInput > Object.entries(this.httpMethods).length,
                methodInput < 0,
            ]

            if(!cases.every((c => c))) console.log('შეყვანილი რიცხვი არასწორია!')
        }

        catch (err) {
            console.log(err);
        }
    }
}
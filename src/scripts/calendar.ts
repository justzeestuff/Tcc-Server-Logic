type YearStats = {
    played: number
    won: number
    draw: number
    lost: number
    for: number
    against: number
    gd: number
}

type CalendarStructure = {
    selectedYear: number
    inputData: YearStats
}

export default class Calendar {
    private username: string
    private token: string
    private repo: string
    private path: string

    constructor() {
        this.username = process.env.GITHUB_USERNAME!
        this.token = process.env.GITHUB_TOKEN!
        this.repo = process.env.GITHUB_REPOSITORY!
        this.path = "Calendar.json"
    }

    async Get() {
        const { Octokit } = await import("octokit")
        const octoKit = new Octokit({ auth: this.token })

        const { data } = await octoKit.rest.repos.getContent({
            owner: this.username,
            repo: this.repo,
            path: this.path
        })

        if (Array.isArray(data) || data.type !== 'file')
            throw new Error('Not a file')

        const string = Buffer.from(data.content, 'base64').toString('utf-8')
        const json = JSON.parse(string)

        return { json, string, sha: data.sha }
    }

    async Add(data: CalendarStructure[]) {
        const { Octokit } = await import("octokit")
        const octoKit = new Octokit({ auth: this.token })

        const { json, sha } = await this.Get()
        try {
            for (const entry of data) {
                const yearKey = entry.selectedYear.toString()
                json[yearKey] = entry.inputData

                console.log(json)
            }

            const result = await octoKit.rest.repos.createOrUpdateFileContents({
                owner: this.username,
                repo: this.repo,
                path: this.path,
                message: 'update',
                content: Buffer.from(JSON.stringify(json, null, 2), 'utf-8').toString('base64'),
                sha
            })

            console.log(result)
            return result
        }
        catch (err) {
            console.error(err)
        }
    }

    async Delete(yearInput: number) {
        const { json, sha } = await this.Get()
        delete json[yearInput.toString()]


        const { Octokit } = await import("octokit")
        const octoKit = new Octokit({ auth: this.token })
        try {
            const result = await octoKit.rest.repos.createOrUpdateFileContents({
                owner: this.username,
                repo: this.repo,
                path: this.path,
                message: 'update',
                content: Buffer.from(JSON.stringify(json, null, 2), 'utf-8').toString('base64'),
                sha
            })

            console.log(result)
            return result
        }
        catch(err){
            console.error(err)
            return err
        }
    }
}
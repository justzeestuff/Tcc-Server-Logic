"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Calendar {
    username;
    token;
    repo;
    path;
    constructor() {
        this.username = process.env.GITHUB_USERNAME;
        this.token = process.env.GITHUB_TOKEN;
        this.repo = process.env.GITHUB_REPOSITORY;
        this.path = "Calendar.json";
    }
    async Get() {
        const { Octokit } = await import("octokit");
        const octoKit = new Octokit({ auth: this.token });
        const { data } = await octoKit.rest.repos.getContent({
            owner: this.username,
            repo: this.repo,
            path: this.path
        });
        if (Array.isArray(data) || data.type !== 'file')
            throw new Error('Not a file');
        const string = Buffer.from(data.content, 'base64').toString('utf-8');
        const json = JSON.parse(string);
        return { json, string, sha: data.sha };
    }
    async Add(data) {
        const { Octokit } = await import("octokit");
        const octoKit = new Octokit({ auth: this.token });
        const { json, sha } = await this.Get();
        try {
            for (const entry of data) {
                const yearKey = entry.selectedYear.toString();
                json[yearKey] = entry.inputData;
                console.log(json);
            }
            const result = await octoKit.rest.repos.createOrUpdateFileContents({
                owner: this.username,
                repo: this.repo,
                path: this.path,
                message: 'update',
                content: Buffer.from(JSON.stringify(json, null, 2), 'utf-8').toString('base64'),
                sha
            });
            console.log(result);
            return result;
        }
        catch (err) {
            console.error(err);
        }
    }
    async Delete(yearInput) {
        const { json, sha } = await this.Get();
        delete json[yearInput.toString()];
        const { Octokit } = await import("octokit");
        const octoKit = new Octokit({ auth: this.token });
        try {
            const result = await octoKit.rest.repos.createOrUpdateFileContents({
                owner: this.username,
                repo: this.repo,
                path: this.path,
                message: 'update',
                content: Buffer.from(JSON.stringify(json, null, 2), 'utf-8').toString('base64'),
                sha
            });
            console.log(result);
            return result;
        }
        catch (err) {
            console.error(err);
            return err;
        }
    }
}
exports.default = Calendar;

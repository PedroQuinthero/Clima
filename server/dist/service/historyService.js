import fs from 'node:fs/promises';
// const historyFilePath = path.join(__dirname, 'searchHistory.json');
const historyFilePath = `db/db.json`;
class HistoryService {
    static async readHistory() {
        try {
            const data = await fs.readFile(historyFilePath, 'utf-8');
            return JSON.parse(data);
        }
        catch (error) {
            return [];
        }
    }
    static writeHistory(history) {
        fs.writeFile(historyFilePath, JSON.stringify(history, null, 2));
    }
    static async saveCity(city) {
        const history = await this.readHistory();
        const id = (Math.random() * 100000).toString();
        history.push({ id, city });
        this.writeHistory(history);
    }
    static async getHistory() {
        return this.readHistory();
    }
    static async deleteCity(id) {
        let history = await this.readHistory();
        history = history.filter(city => city.id !== id);
        this.writeHistory(history);
    }
}
export default HistoryService;

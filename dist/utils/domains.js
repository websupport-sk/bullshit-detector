"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDomains = void 0;
const getDomains = () => {
    let lastDatabaseUpdate = parseInt(localStorage.getItem('lastDatabaseUpdate'));
    let domainScores = JSON.parse(localStorage.getItem('domainScores'));
    const incompleteData = lastDatabaseUpdate === null || isNaN(lastDatabaseUpdate) || domainScores === null;
    const obsoleteData = Date.now() - lastDatabaseUpdate > 1000 * 60 * 60 * 24 * 7; // 7 days
    if (incompleteData || obsoleteData) {
        domainScores = fetchAndStoreDomains();
    }
    return domainScores;
};
exports.getDomains = getDomains;
function fetchAndStoreDomains() {
    return __awaiter(this, void 0, void 0, function* () {
        let domainScores = {};
        try {
            const domainsFile = yield fetch('http://127.0.0.1:8887/zoznam.txt');
            const text = yield domainsFile.text();
            const lines = text.split('\n');
            for (const line of lines) {
                let url, score;
                [url, score] = line.split(',');
                domainScores[url] = score;
            }
            localStorage.setItem('domainScores', JSON.stringify(domainScores));
            saveLastDatabaseUpdateTimeStamp();
        }
        catch (error) {
            // todo load fallback scores from file
        }
        return domainScores;
    });
}
function saveLastDatabaseUpdateTimeStamp() {
    const currentTimeStamp = Date.now();
    localStorage.setItem('lastDatabaseUpdate', currentTimeStamp.toString());
}
//# sourceMappingURL=domains.js.map
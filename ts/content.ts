import * as fs from "fs";
import * as path from "path";
import * as http from "http";
import { ParsedUrlQuery } from "querystring";
import * as url from "url";

export default class Content {

    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html>");
        // a weboldal fejrésze:
        res.write("<head>");
        res.write("<title> Faktoriális </title>");
        res.write("</head>");

        res.write("<body><form style='font-family:Courier; font-size:24px'>");
        res.write("<h1>Faktoriális számolása</h1>");
        const query: ParsedUrlQuery = url.parse(req.url as string, true).query;
        // tslint:disable-next-line: max-line-length
        const x: number = query.xInput === undefined || query.xInput === "" ? 5 : parseFloat(query.xInput as string); // number = 64 bites lebegőpontos szám
        res.write("<p>x= ");
        res.write(`<input type='number' name='xInput' value=${x} onChange='this.form.submit();'`);
        res.write("</p>");
        let faktor: number = x;
        for (let i: number = (x - 1); i < x; i--) {
            faktor = faktor * i;
        }
        res.write(`${x}! = ${faktor}`);
        res.write("</form></body>");
        res.write("</html>");
        res.end();
    }
}

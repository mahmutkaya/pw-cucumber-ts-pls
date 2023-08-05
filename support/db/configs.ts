import { config } from "mssql";

export const configs: {OTest: config, Dev: config} = {
    OTest: {
        driver: "SQL Server",
        server: "pl-dbtest1\\profitsql",
        database: "UurOnlineOtest",
        user: "uuronline",
        password: "quantum",
        port: 1433,
        options: {
            trustServerCertificate: true,
            encrypt: false,
            enableArithAbort: false
        }
    },
    Dev: {
        driver: "SQL Server",
        server: "pl-dbtest1\\profitsql",
        database: "UurOnlineOtest",
        user: "uuronline",
        password: "quantum",
        port: 1433,
        options: {
            trustServerCertificate: true,
            encrypt: false,
            enableArithAbort: false
        }
    }
}
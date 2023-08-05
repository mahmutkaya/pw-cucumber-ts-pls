import { ConnectionPool, IResult, Request, RequestError, TYPES } from "mssql";
import { configs } from "./configs";

let pool: ConnectionPool;
let request: Request;
let result: IResult<any>;

const connect = async () => {
  if (!pool) {
    pool = new ConnectionPool(configs[global.BASE_ENV]);
  }
  if (!pool.connected) {
    await pool.connect();
    request = new Request(pool);
  }
};

export const callStoredProcedure = async (
  procedureName: any,
  args?: Record<string, any>
) => {
  try {
    await connect();

    let k: keyof typeof args;
    for (k in args) {
      request.input(k, args[k]);
    }

    const result = await request.execute(procedureName);
    pool.close();
    return result.recordset;
  } catch (e) {
    if (e instanceof RequestError) {
      const er = `${e.message}
        name: ${e.name}
        code: ${e.code}
        serverName: ${e.serverName}
        procName: ${e.procName}
        number: ${e.number}
        state: ${e.state}
        class: ${e.class}
        lineNumber: ${e.lineNumber}`;
      throw new RequestError(er);
    }
  }
};

export const executeQuery = async (query: string) => {
  await connect();
  result = await request.query(query);
  pool.close();
};

export const getQueryRecordSet = async (query: string) => {
  await executeQuery(query);
  return result.recordset;
};

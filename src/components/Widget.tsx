import { Table } from "react-bootstrap";

export interface Rate {
  symbol: string;
  name: string;
  rate: number;
}

export interface Props {
  rates: Rate[];
  symbol: string;
  name: string;
  baseAmount: number;
  loading: boolean;
  lastUpdated: string;
}

export function Widget(props: Props) {
  return (
    <>
      <p>
        Base Currency: {props.symbol}
        <br />
        Base Amount: {props.baseAmount}
        <br />
        Last Updated: {props.lastUpdated}
      </p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {!props.loading &&
            props.rates.map((rate: Rate) => {
              return (
                <tr key={rate.symbol}>
                  <td>{rate.symbol}</td>
                  <td>{rate.rate}</td>
                </tr>
              );
            })}

          {props.loading && (
            <tr>
              <td colSpan={2}>Loading..</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}

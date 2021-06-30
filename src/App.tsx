import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Datatable } from "./components/datatable";
import { Button } from "reactstrap";

interface ServerResponse {
  data: Array<Crawl>;
}

interface Crawl {
  url: string;
  title: string;
  description: string;
  headings: Array<string>;
}

const initialCrawlData: Array<Crawl> = [
  {
    url: "",
    title: "",
    description: "",
    headings: [],
  },
];

const App = () => {
  const [crawlData, setCrawlData] = useState<Array<Crawl>>(initialCrawlData);
  const [columns] = useState([
    {
      title: "Title",
      value: "title",
    },
    {
      title: "Description",
      value: "description",
    },
    {
      title: "Headings",
      value: "headings",
      customRow(data: any) {
        return data.map((d: string, i: number) => <li key={"li" + i}>{d}</li>);
      },
    },
    {
      title: "URL",
      value: "url",
      customRow(data: string) {
        return (
          // eslint-disable-next-line react/jsx-no-target-blank
          <a target="_blank" href={data}>
            {data}
          </a>
        );
      },
    },
  ]);

  // API call

  const getCrowledData = () => {
    axios
      .get("http://localhost:3001/crawl")
      .then((response: AxiosResponse<ServerResponse>) => {
        console.log("res", response);
        setCrawlData(response.data.data);
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getCrowledData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const recrawlData = () => {
    axios
      .post("http://localhost:3001/crawl")
      .then((response: AxiosResponse<ServerResponse>) => {
        console.log("res", response);
      });
  };

  return (
    <>
      <div className="row mt-5">
        <div className="col-md-10">
          <h3 className="text-center">Website data</h3>
        </div>
        <div className="col-md-2">
          <Button onClick={recrawlData}>Recrawl</Button>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <Datatable data={crawlData} columns={columns}></Datatable>
        </div>
      </div>
    </>
  );
};

export default App;

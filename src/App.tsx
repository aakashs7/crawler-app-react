import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Datatable } from "./components/datatable";

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
        return data.map((d: string) => <li>{d}</li>);
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
  useEffect(() => {
    axios
      .get("http://localhost:3001/crawl")
      .then((response: AxiosResponse<ServerResponse>) => {
        console.log("res", response);
        setCrawlData(response.data.data);
      });
  }, []);

  return (
    <>
      <div className="row mt-5">
        <h3 className="text-center">Website data</h3>
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

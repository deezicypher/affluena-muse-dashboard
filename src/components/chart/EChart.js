
import React,{useState , useEffect} from "react";
import ReactApexChart from "react-apexcharts";
import { Row, Col,Button, Typography } from "antd";

import {MenuUnfoldOutlined} from "@ant-design/icons";
import axios from "axios";
import moment from 'moment';
import { Link } from "react-router-dom";


function EChart() {
  const { Title, Paragraph } = Typography;
  const [loading, setLoad] = useState(true);

  const[bcount, setBcount] = useState([])
  const[bdate, setBdate] = useState([])


  const items = [
    {
      Title: "3,6K",
      user: "Users",
    },
    {
      Title: "2m",
      user: "Clicks",
    },
    {
      Title: "$772",
      user: "Sales",
    },
    {
      Title: "82",
      user: "Items",
    },
  ];

  useEffect(() => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
    }
  axios.get('https://api.blockchain.info/charts/n-transactions?timespan=4days&cors=true')
      .then(res => {

        for (const x of res.data.values) {
          var p = x.y
          setBcount(e => [...e, parseInt(p / 1500)])

          var d = new Date(x.x * 1000)
          var c = moment(d).format('MMM Do ')
          setBdate(e => [...e, c])

        }
        setLoad(false)
      })}
      ,[]
  )

  const eChart = {
    series: [
      {
        name: "Transactions",
        data: bcount,
        color: "#fff",
      },
    ],
  
    options: {
      chart: {
        type: "bar",
        width: "100%",
        height: "auto",
  
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 5,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["transparent"],
      },
      grid: {
        show: true,
        borderColor: "#ccc",
        strokeDashArray: 2,
      },
      xaxis: {
        categories: bdate,
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
            ],
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
            ],
          },
        },
      },
  
      tooltip: {
        y: {
          formatter: function (val) {
            return " " + val + " ";
          },
        },
      },
    },
  };

  return (
    <>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={eChart.options}
          series={eChart.series}
          type="bar"
          height={220}
        />
      </div>
      <div className="chart-vistior">
        <Title level={5}>Affluena STAT.  (Last 4 Days)</Title>
        <Paragraph className="lastweek">
          Both Withdrawals and Deposit <span className="bnb2"> +30% </span>
        </Paragraph>
        <Paragraph className="lastweek">
          We have created multiple financial options for you to chose from and 
          earn alongside mission driven individuals.
        </Paragraph>
        <Link 
                 
                  className="ant-btn ant-btn-primary width-100"
                  to="/Fund"
                              
                >
                  
                  {<MenuUnfoldOutlined />} View Investment Options
                </Link>
      </div>
    </>
  );
}

export default EChart;


import React,{useState , useEffect} from "react";

import axios from "axios";
import moment from 'moment';
import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";

function LineChart() {
  const { Title, Paragraph } = Typography;

  const[bcount, setBcount] = useState([])
  const[bdate, setBdate] = useState([])

  const [pData, setPdata] = React.useState([]);
  const [pMonths, setPmonths] = React.useState([]);
  const [loading, setLoad] = React.useState(true);

  useEffect(() => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
    }
    axios.get('https://api.blockchain.info/charts/market-price?timespan=4days&cors=true')
      .then(res => {
        for (const x of res.data.values) {
          var p = x.y
          setPdata(e => [...e, parseInt(p)])
          var d = new Date(x.x * 1000)
          var c = moment(d).format('MMM Do ')
          setPmonths(e => [...e, c])
        }
        setLoad(false)
      })
      axios.get('https://api.blockchain.info/charts/n-transactions?timespan=5days&cors=true')
      .then(res => {

        for (const x of res.data.values) {
          var p = x.y
          setBcount(e => [...e, parseInt(p / 1500)])

          var d = new Date(x.x * 1000)
          var c = moment(d).format('MMM Do ')
          setBdate(e => [...e, c])

        }
        setLoad(false)
      })
  

      
    },[])



    const lineChart = {
      series: [
    
        {
          name: "BTC",
          data: pData,
          offsetY: 0,
        },
      ],
    
      options: {
        chart: {
          width: "100%",
          height: 350,
          type: "area",
          toolbar: {
            show: false,
          },
        },
    
        legend: {
          show: false,
        },
    
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
    
        yaxis: {
          labels: {
            style: {
              fontSize: "14px",
              fontWeight: 600,
              colors: ["#8c8c8c"],
            },
          },
        },
    
        xaxis: {
          labels: {
            style: {
              fontSize: "14px",
              fontWeight: 600,
              colors: [
                "#8c8c8c",
                "#8c8c8c",
                "#8c8c8c",
                "#8c8c8c",
                "#8c8c8c",
                "#8c8c8c",
                "#8c8c8c",
                "#8c8c8c",
                "#8c8c8c",
              ],
            },
          },
          categories: pMonths,
        },
    
        tooltip: {
          y: {
            formatter: function (val) {
              return val;
            },
          },
        },
      },
    };
  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Average BTC USD Market Activity </Title>
          <Paragraph className="lastweek">
          (Last 5days) <span className="bnb2"></span>
          </Paragraph>
        </div>
        <div className="sales">
          <ul>
            
            <li>{<MinusOutlined />}BTC</li>
          </ul>
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={lineChart.options}
        series={lineChart.series}
        type="area"
        height={350}
        width={"100%"}
      />
    </>
  );
}

export default LineChart;

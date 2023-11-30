// import { useState } from "react";
// import "./Display.css";
// const Display = ({ contract, account }) => {
//   const [data, setData] = useState("");
//   const getdata = async () => {
//     let dataArray;
//     const Otheraddress = document.querySelector(".address").value;
//     try {
//       if (Otheraddress) {
//         dataArray = await contract.display(Otheraddress);
//         console.log(dataArray);
//       } else {
//         dataArray = await contract.display(account);
//       }
//     } catch (e) {
//       alert("You don't have access");
//     }
//     const isEmpty = Object.keys(dataArray).length === 0;

//     if (!isEmpty) {
//       const str = dataArray.toString();
//       const str_array = str.split(",");
//       // console.log(str);
//       // console.log(str_array);
//       const images = str_array.map((item, i) => {
//         return (
//           <>
//           <a href={item} key={i} target="_blank" rel="noreferrer">{item}</a>
//             <img
//               key={i}
//               src={item}
//               alt="new"
//               className="image-list"
//             />
         
//           </>
//         );
//       });
//       setData(images);
//     } else {
//       alert("No image to display");
//     }
//   };
//   return (
//     <>
//       <div className="image-list">{data}</div>
//       <input
//         type="text"
//         placeholder="Enter Address"
//         className="address"
//       ></input>
//          <img
//               key={1}
//               src="https://gateway.pinata.cloud/ipfs/QmfJjZo54cZNGBVLAVP1J2bKUVVDb1sURP7CZLwaBjTi1S"
//               alt="new"
//               className="image-list"
              
//             ></img>
//       <button className="center button button-1" onClick={getdata}>
//         Get Data
//       </button>

//     </>
//   );
// };
// export default Display;
import { useState } from "react";
import { Table } from "antd";
import "antd/dist/reset.css";
import "./Display.css";

const Display = ({ contract, account }) => {
  const [data, setData] = useState([]);
  const columns = [
    {
      title: "Image Name",
      dataIndex: "name",
      key: "name",
      render: (text) => text.slice(0, 10),
    },
    {
      title: "Image Link",
      dataIndex: "link",
      key: "link",
      render: (text) => (
        <a href={text} target="_blank" rel="noreferrer">
          {text.slice(0, 10)}...
        </a>
      ),
    },
  ];

  const getdata = async () => {
    let dataArray;
    const otherAddress = document.querySelector(".address").value;
    try {
      if (otherAddress) {
        dataArray = await contract.display(otherAddress);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (e) {
      alert("You don't have access");
      return;
    }

    const isEmpty = dataArray.length === 0;

    if (!isEmpty) {
      const images = dataArray.map((item, i) => ({
        key: i,
        name: `Image ${i + 1}`,
        link: item,
      }));
      setData(images);
    } else {
      alert("No image to display");
    }
  };


  return (
    <>
      <input type="text" placeholder="Enter Address" className="address" />
      <button className="center button button-1" onClick={getdata}>
        Get Data
      </button>
     
      <Table dataSource={data} columns={columns} pagination={false} size="small" />
    </>
  );
};

export default Display;

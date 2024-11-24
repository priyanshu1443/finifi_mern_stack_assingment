"use client"
import { useState, useEffect } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faChevronLeft, faChevronRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";

import Header from "@/components/Header";
import TableRow from "@/components/TableRow";
import Options from "@/components/Options";
import Form from "@/components/Form";

export default function Home() {
  const [option, setOption] = useState("All");
  const [data, setData] = useState([])
  const [search, setSearch] = useState("")
  const [maxPage, setMaxPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [select, setSelect] = useState("")
  const [addUpdate, setAddUpdate] = useState(false)
  const [updateData, setUpdateData] = useState({})


  const handleLength = (length = 0) => {
    if (length === 0) {
      length = option === "All" ? data.length : data.filter((item) => item.Status === option).length
    }
    length % 10 > 0 ? setMaxPage(parseInt(length / 10)) : setMaxPage(length / 10)
  }

  const fetchData = async () => {
    try {
      const responce = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/invoices`)
      if (responce.status === 200) {
        setData(responce.data)
        handleLength(responce.data.length)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    handleLength()
  }, [option])

  const handleUpdateClick = () => {
    setUpdateData(data.find(item => item._id === select))
    setAddUpdate(true)
    document.getElementById(select).firstElementChild.checked = false
    setSelect("")
  }

  const handleDeleteClick = async () => {
    let invoice = data.find((item) => item._id === select)
    if (invoice) {
      try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/deleteInvoice/${invoice._id}`,)
        if (response.status === 200) {
          fetchData()
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  let options = ["All", "Open", "Awaiting Approval", "Approved", "Processing", "Paid", "Rejected", "Vendor Not Found", "Duplicate", "Void"]
  let tableHead = ["Vendor Name", "Invoice", "Status", "Net Amount", "Invoice Date", "Due Date", "Department", "Cost Center"]

  return (
    <>
      <Header />

      <hr className="border border-neutral-400" />

      <Options options={options} option={option} setOption={setOption} />

      <hr className="border border-neutral-400" />


      {/* search bar and action button code  */}
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="border-2 border-neutral-400 flex gap-1 rounded-2xl overflow-hidden">
          <div className=" flex items-center gap-4 px-3">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <div className="flex items-center justify-center gap-3">
              <p className="font-semibold">by vendor</p>
              <FontAwesomeIcon icon={faChevronDown} />
            </div>
          </div>
          <div className="" >
            <input
              type="text"
              className="border-l-2 border-neutral-400 px-3 py-1 outline-none "
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="bg-blue-800 text-white px-3 py-1 rounded-md active:bg-blue-900"
            onClick={() => {
              setUpdateData({ Vendor_Name: "", Invoice: "", Status: "", Net_Amount: "", Invoice_Date: "", Due_Date: "", Department: "", Cost_Cente: "" })
              setAddUpdate(true)
            }}
          >
            Add
          </button>
          <button
            className={` ${select == "" ? "bg-green-300" : "bg-green-800"} text-white px-3 py-1 rounded-md`}
            disabled={select === "" ? true : false}
            onClick={() => handleUpdateClick()}
          >
            Update
          </button>
          <button
            className={` ${select == "" ? "bg-red-300" : "bg-red-800"} text-white px-3 py-1 rounded-md`}
            disabled={select === "" ? true : false}
            onClick={() => handleDeleteClick()}
          >
            Delete
          </button>
        </div>
      </div>

      {/* table code which show data  */}
      <div className="px-3 py-1 h-[466px]">
        <table className="table-auto w-full border-collapse ">
          <thead>
            <tr >
              <th className="border-2 border-neutral-200 py-2"></th>
              {
                tableHead.map((data, index) =>
                  <th className="border-2 border-neutral-200 py-2" key={index + data}>{data}</th>
                )
              }
            </tr>
          </thead>
          <tbody>
            {
              data
                .filter((item) => option === "All" ? item : item.Status === option)
                .filter((item) => search === "" ? item : item.Vendor_Name && item.Vendor_Name.toLowerCase().includes(search.toLowerCase()))
                .slice(10 * currentPage, 10 * (currentPage + 1))
                .map((item) =>
                  <TableRow
                    key={item._id}
                    item={item}
                    select={select}
                    setSelect={setSelect}
                  />)
            }
          </tbody>
        </table>
      </div>

      {/* pagination functionality  */}
      <div className="flex items-center justify-end px-6 gap-3 py-4">
        <button
          className={`${currentPage === 0 ? "bg-blue-300" : "bg-blue-500"} px-3 py-[3px] cursor-pointer`}
          disabled={currentPage === 0 ? true : false}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <FontAwesomeIcon className="text-white" icon={faChevronLeft} />
        </button>
        <button
          className={`${currentPage === maxPage ? "bg-blue-300" : "bg-blue-500"} px-3 py-[3px] cursor-pointer`}
          disabled={currentPage === maxPage ? true : false}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <FontAwesomeIcon className="text-white" icon={faChevronRight} />
        </button>
      </div>

      {/* add data and update data functionality */}
      <div className={`border-2 border-blue-700 bg-white bg-opacity-10 absolute top-0 left-0 w-full h-full ${addUpdate ? "flex" : "hidden"} items-center justify-center  `}>
        {
          addUpdate ? (
            updateData.Vendor_Name === "" ? (
              <Form
                setAddUpdate={setAddUpdate}
                type={"Add"}
                updateDate={updateData}
                fetchData={fetchData}
              />
            ) : (
              <Form
                setAddUpdate={setAddUpdate}
                type={"Update"}
                updateDate={updateData}
                fetchData={fetchData}
              />
            )
          ) : null
        }
      </div>

    </>
  )
}

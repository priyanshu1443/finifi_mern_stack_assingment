"use client"
import React, { useState } from 'react'
import moment from 'moment'
import axios from 'axios'

const FormField = ({ error, label, value, setValue }) => {
    return (
        <div className=' px-2 py-2'>
            <label htmlFor={label} className="text-sm font-medium " >{label} :- </label>
            <br />
            <input
                className={`border-2 ${error && value === "" ? "border-red-500" : "border-black"} px-1 py-1 outline-none rounded-md w-52 mt-2`}
                type="text"
                id={label}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )
}

function Form({ setAddUpdate, type, updateDate, fetchData }) {
    const [name, setName] = useState(updateDate.Vendor_Name)
    const [invoice, setInvoice] = useState(updateDate.Invoice)
    const [status, setStatus] = useState(updateDate.Status)
    const [amount, setAmount] = useState(updateDate.Net_Amount)
    const [InvoiceDate, setInvoiceDate] = useState(type === "Update" ? moment(updateDate.Invoice_Date).format("DD-MM-YYYY") : "")
    const [dueDate, setDueDate] = useState(type === "Update" ? moment(updateDate.Due_Date).format("DD-MM-YYYY") : "")
    const [depart, setDepart] = useState(updateDate.Department)
    const [costCenter, setCostCenter] = useState(updateDate?.Cost_Center || "")
    const [error, setError] = useState(false)

    let options = ["Open", "Awaiting Approval", "Approved", "Processing", "Paid", "Rejected", "Vendor Not Found", "Duplicate", "Void"]

    const resetForm = () => {
        setName("");
        setInvoice("");
        setStatus("");
        setAmount("");
        setInvoiceDate("");
        setDueDate("");
        setDepart("");
        setCostCenter("");
        setError(false);
        setAddUpdate(false);
    }


    const handleAddDetails = async (data) => {
        console.log(data)
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/invoice`, data)
            if (response.status === 201) {
                setAddUpdate(false)
                fetchData()
                resetForm()
            } else {

                setError(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdateDetails = async (data) => {
        data._id = updateDate._id
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/updateInvoice`, data)
            if (response.status === 201) {
                setAddUpdate(false)
                fetchData()
                resetForm()
            } else {

                setError(true)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && invoice && status && amount && InvoiceDate && dueDate && depart && costCenter) {
            const data = {
                Vendor_Name: name,
                Invoice: invoice,
                Status: status,
                Net_Amount: amount,
                Invoice_Date: moment(InvoiceDate, "DD-MM-YYYY").toISOString(),
                Due_Date: moment(dueDate, "DD-MM-YYYY").toISOString(),
                Department: depart,
                Cost_Center: costCenter
            }
            if (type === "Add") {
                handleAddDetails(data)
            } else {
                handleUpdateDetails(data)
            }
        } else {
            setError(true)
        }
    }

    return (
        <div className=' w-full h-full xl:flex items-center justify-center flex-col ' >
            <form onSubmit={handleSubmit} className=' bg-white p-10 rounded-2xl shadow-lg shadow-neutral-300 w-[600px]' >
                <h1 className=' text-center uppercase font-semibold text-2xl py-5'>{type} Invoice</h1>
                <div className=' px-2 py-2 flex gap-10 flex-wrap'>
                    <FormField
                        error={error}
                        label={"Vendor Name"}
                        value={name}
                        setValue={setName}
                    />
                    <FormField
                        error={error}
                        label={"Invoice"}
                        value={invoice}
                        setValue={setInvoice}
                    />
                </div>
                <div className=' px-2 py-2 flex gap-10 flex-wrap'>
                    <div className=' px-2 py-2'>
                        <label className="text-sm font-medium " >Staus :- </label>
                        <br />
                        <input
                            className='border-2 border-black px-1 py-1 outline-none rounded-md w-52 mt-2'
                            list='datalist'
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        />
                        <datalist id="datalist">
                            {
                                options.map((item, index) => <option key={item + index} value={item}>{item}</option>)
                            }
                        </datalist>
                    </div>
                    <FormField
                        error={error}
                        label={"Net Amount"}
                        value={amount}
                        setValue={setAmount}
                    />
                </div>
                <div className=' px-2 py-2 flex gap-10 flex-wrap'>
                    <FormField
                        error={error}
                        label={"Invoice Date"}
                        value={InvoiceDate}
                        setValue={setInvoiceDate}
                    />
                    <FormField
                        error={error}
                        label={"Due Date"}
                        value={dueDate}
                        setValue={setDueDate}
                    />
                </div>
                <div className=' px-2 py-2 flex gap-10 flex-wrap'>
                    <FormField
                        error={error}
                        label={"Department"}
                        value={depart}
                        setValue={setDepart}
                    />
                    <FormField
                        error={error}
                        label={"Cost Center"}
                        value={costCenter}
                        setValue={setCostCenter}
                    />
                </div>
                <div className='px-2 py-2 flex items-center justify-center gap-5 mt-5'>
                    <input
                        type='submit'
                        className='px-4 py-[5px] rounded-2xl text-lg font-semibold text-white cursor-pointer  bg-blue-500 active:bg-blue-800'
                        value="Submit"
                    >
                    </input>
                    <button
                        className='px-4 py-[5px] rounded-2xl text-lg font-semibold text-white cursor-pointer  bg-red-500 active:bg-red-800'
                        onClick={() => setAddUpdate(false)}
                    >
                        Cancle
                    </button>
                </div>
            </form >
        </div >
    )
}

export default Form

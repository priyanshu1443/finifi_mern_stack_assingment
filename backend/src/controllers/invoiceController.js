import invoiceModel from "../model/invoiceModel.js"

export const addInvoice = async (req, res) => {
    const { Vendor_Name, Invoice, Status, Net_Amount, Invoice_Date, Due_Date, Department, Cost_Center } = req.body
    try {
        if (Vendor_Name && Invoice && Status && Net_Amount && Invoice_Date && Due_Date && Department && Cost_Center) {
            const responce = await invoiceModel.create({ Vendor_Name, Invoice, Status, Net_Amount, Invoice_Date, Due_Date, Department, Cost_Center })
            if (responce) {
                res.status(201).send({ data: "successful send data" })
            }
        } else {
            res.status(200).send({ data: "Please fill all the fields" })
        }
    } catch (error) {
        res.status(500).send({ error })
    }
}

export const getInvoices = async (req, res) => {
    try {
        const responce = await invoiceModel.find({}, { __v: 0 });
        if (responce) {
            res.status(200).send(responce)
        }
    } catch (error) {
        res.status(500).send({ error })
    }
}


export const updateInvoice = async (req, res) => {
    const { _id, Vendor_Name, Invoice, Status, Net_Amount, Invoice_Date, Due_Date, Department, Cost_Center } = req.body
    try {
        if (_id && Vendor_Name && Invoice && Status && Net_Amount && Invoice_Date && Due_Date && Department && Cost_Center) {
            const responce = await invoiceModel.findByIdAndUpdate({ _id }, { Vendor_Name, Invoice, Status, Net_Amount, Invoice_Date, Due_Date, Department, Cost_Center })
            if (responce) {
                res.status(201).send({ Message: "Data update successful" })
            }
        } else {
            res.status(200).send({ data: "Please fill all the fields" })
        }
    } catch (error) {
        res.status(500).send({ error })
    }
}

export const deleteInvoice = async (req, res) => {
    const _id = req.params.id
    try {
        if (_id) {
            const responce = await invoiceModel.findByIdAndDelete({ _id })
            if (responce) {
                res.status(200).send({ Message: "Data delete succssfull" })
            }
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

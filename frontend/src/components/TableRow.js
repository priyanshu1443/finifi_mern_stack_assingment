import React from 'react'
import moment from 'moment'

function TableRow({ item, select, setSelect }) {
    const keys = Object.keys(item)
    const handleSelect = (key) => {
        if (select !== "" && select == key) {
            document.getElementById(select).firstElementChild.checked = false
            setSelect("")
        } else {
            setSelect(key)
        }
    }

    return (
        <tr>
            {
                keys.map((key, index) => {
                    return (
                        <td
                            key={index}
                            id={item._id}
                            className="border-2 border-neutral-200 text-center py-2"
                        >
                            {
                                key === "_id" ?
                                    <input
                                        type="radio"
                                        name='select'
                                        id={item[key]}
                                        onClick={() => handleSelect(item[key])}
                                    />
                                    : key === "Invoice_Date" || key === "Due_Date" ?
                                        moment(item[key]).format("DD-MM-YYYY")
                                        : item[key]
                            }
                        </td>
                    )
                })
            }
        </tr>
    )
}

export default TableRow

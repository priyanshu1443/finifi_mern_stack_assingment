import React from 'react'

function Options({ options, option, setOption }) {
    return (
        <ul className=" h-12 px-4 flex items-center justify-between gap-2">
            {
                options.map((data, index) =>
                    <li
                        className={` ${data == option ? "font-semibold border-b-[4px]" : null} cursor-pointer border-blue-700 h-full flex items-center justify-center`}
                        key={data + index}
                        onClick={() => setOption(data)}
                    >
                        {data}
                    </li>)
            }
        </ul>
    )
}

export default Options

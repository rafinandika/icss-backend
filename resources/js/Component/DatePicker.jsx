import React, { useState } from 'react'
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import DatePicker from 'tailwind-datepicker-react'

const DatePickers = ({ title = "", background = "light" }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleChange = (selectedDate) => {
        handleClose();
    }

    const options = {
        title: title,
        autoHide: true,
        todayBtn: true,
        clearBtn: false,
        clearBtnText: "Clear",
        maxDate: new Date("2030-01-01"),
        minDate: new Date("1980-01-01"),
        theme: {
            background: "bg-gray-200",
            todayBtn: "",
            clearBtn: "",
            icons: "",
            text: "text-gray-700",
            disabledText: "bg-gray-400",
            input: "",
            inputIcon: "",
            selected: "",
        },
        icons: {
            // () => ReactElement | JSX.Element
            prev: () => <MdArrowBack />,
            next: () => <MdArrowForward />,
        },
        datepickerClassNames: "top-12",
        defaultDate: new Date(),
        weekDays: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Ming"],
        inputNameProp: "date",
        inputIdProp: "date",
        inputPlaceholderProp: "Select Date",
        inputDateFormatProp: {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    }
    return (
        <DatePicker options={options} onChange={handleChange} classNames='input' show={show} setShow={handleClose} />
    )
}

export default DatePickers
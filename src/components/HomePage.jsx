import { useState } from "react"
import Card from "./Card"

function HomePage() {

    const [initialformData, setInitialformData] = useState({
        cardholder: "JANE APPLESEED",
        cardnumber: "0000000000000000",
        expmonth: "00",
        expyear: "00",
        cvc: "000"
    });
    const [formData, setFormData] = useState({
        cardholder: "",
        cardnumber: "",
        expmonth: "",
        expyear: "",
        cvc: ""
    })
    const [errors, setErrors] = useState({
        cardholderError: "",
        cardnumberError: "",
        expmonthError: "",
        expyearError: "",
        cvcError: ""
    })
    const handleUserInput = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    function onFormSubmit(e) {
        e.preventDefault();

        setErrors({
            cardholderError: "",
            cardnumberError: "",
            expmonthError: "",
            expyearError: "",
            cvcError: "",
        });
        let hasErrors = false;

        if (!formData.cardholder) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                cardholderError: "Cardholder name is required.",
            }));
            hasErrors = true
        } else if (/^\d+$/.test(formData.cardholder)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                cardholderError: "Cardholder name should not contain numbers.",
            }));
            hasErrors = true
        }

        if (!formData.cardnumber) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                cardnumberError: "Card number is required.",
            }));
            hasErrors = true
        } else if (!/^\d+$/.test(formData.cardnumber)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                cardnumberError: "Card number must be numeric.",
            }));
            hasErrors = true
        } else if (formData.cardnumber.length !== 16) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                cardnumberError: "Card number must be 16 digits.",
            }));
            hasErrors = true
        }

        if (!formData.expmonth) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                expmonthError: "Expiration month is required.",
            }));
            hasErrors = true
        } else {
            if (
                !/^\d+$/.test(formData.expmonth) ||
                !(formData.expmonth >= "01" && formData.expmonth <= "12")
            ) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    expmonthError: "Expiration month must be a valid two-digit number (01-12).",
                }));
                hasErrors = true
            }
        }

        if (!formData.expyear) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                expyearError: "Expiration year is required.",
            }));
            hasErrors = true
        } else if (!/^\d+$/.test(formData.expyear) || formData.expyear.length !== 2) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                expyearError: "Expiration year must be a valid two-digit number.",
            }));
            hasErrors = true
        }

        if (!formData.cvc) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                cvcError: "CVC is required.",
            }));
            hasErrors = true
        } else if (!/^\d+$/.test(formData.cvc)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                cvcError: "CVC must be numeric.",
            }));
            hasErrors = true
        } else if (formData.cvc.length !== 3) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                cvcError: "CVC must be contain three digits.",
            }));
            hasErrors = true
        }
        if (!hasErrors) {
            setInitialformData({ ...formData })
            setFormData({
                cardholder: "",
                cardnumber: "",
                expmonth: "",
                expyear: "",
                cvc: ""
            })
        }
    }




    return (
        <div className="w-full flex justify-between relative">
            <div className="w-[30%] h-screen bg-[url('./assets/bgImage.png')]">
            </div>
            <div className="w-[70%] flex justify-center items-center bg-[#D9D9D9]">
                <form onSubmit={onFormSubmit} className="flex flex-col w-96 gap-8">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="cardholder" className="uppercase font-semibold text-[#220930] tracking-widest">cardholder name</label>
                            <input type="text" name="cardholder" id="cardholder" placeholder="e.g. Jane Appleseed" className="h-12 px-4 py-2 rounded-lg border-2 border-slate-500  font-semibold outline-0 bg-transparent" value={formData.cardholder} onChange={handleUserInput} />
                            <p className="text-red-500 text-xs">{errors.cardholderError}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="cardnumber" className="uppercase font-semibold text-[#220930] tracking-widest">card number</label>
                            <input type="text" name="cardnumber" id="cardnumber" placeholder="e.g. 1234 5678 9123 0000" className="h-12 px-4 py-2 rounded-lg border-2 border-slate-500  font-semibold outline-0 bg-transparent" value={formData.cardnumber} onChange={handleUserInput} />
                            <p className="text-red-500 text-xs">{errors.cardnumberError}</p>
                        </div>
                        <div className="flex gap-3 ">
                            <div className="flex flex-col gap-2">
                                <div className="flex">
                                    <label htmlFor="expmonth" className="uppercase font-semibold text-[#220930] tracking-widest">exp.date</label>
                                    <label htmlFor="expyear" className="uppercase font-semibold text-[#220930] tracking-widest">(MM/YY)</label>
                                </div>
                                <div className="flex gap-3">
                                    <input type="text" name="expmonth" id="expmonth" placeholder="MM" className="w-20 h-12 px-4 py-2 rounded-lg border-2 border-slate-500  font-semibold outline-0 bg-transparent" value={formData.expmonth} onChange={handleUserInput} />
                                    <input type="text" name="expyear" id="expyear" placeholder="YY" className=" w-20 h-12 px-4 py-2 rounded-lg border-2 border-slate-500  font-semibold outline-0 bg-transparent" value={formData.expyear} onChange={handleUserInput} />
                                </div>
                                <p className="text-red-500 text-xs">{errors.expmonthError || errors.expyearError}</p>
                            </div>
                            <div className="flex flex-col w-full gap-2">
                                <label htmlFor="cvc" className="uppercase font-semibold text-[#220930] tracking-widest">cvc</label>
                                <input type="text" name="cvc" id="cvc" placeholder="e.g. 123" className=" w-full h-12 px-4 py-2 rounded-lg border-2 border-slate-500  font-semibold outline-0 bg-transparent" value={formData.cvc} onChange={handleUserInput} />
                                <p className="text-red-500 text-xs">{errors.cvcError}</p>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="w-full h-12 py-2 rounded-lg font-semibold outline-0 bg-[#220930] text-white">Confirm</button>
                </form>
            </div>
            <Card
                holderName={initialformData.cardholder}
                cardNumber={initialformData.cardnumber}
                expMonth={initialformData.expmonth}
                expYear={initialformData.expyear}
                cvc={initialformData.cvc}
            />
        </div>
    )
}

export default HomePage

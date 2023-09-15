function Card({ holderName, cardNumber, expMonth, expYear, cvc }) {
    const formatCardNumber = (number) => {
        const groups = [];
        for (let i = 0; i < number.length; i += 4) {
            groups.push(number.slice(i, i + 4));
        }
        return groups;
    };
    return (
        <div className="absolute z-10 left-28 w-[30rem] top-20 flex flex-col gap-8">
            <div className=" h-60 bg-cover bg-no-repeat w-full rounded-lg bg-[url('./assets/card.png')] shadow-lg">
                <div className="flex flex-col justify-end h-full pb-8 gap-6 px-6">
                    <div className="w-full flex gap-8">
                        {formatCardNumber(cardNumber).map((group, index) => (
                            <p key={index} className="text-white font-semibold text-2xl tracking-[0.5rem]">
                                {group}
                            </p>
                        ))}
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="tracking-widest font-semibold text-white uppercase">{holderName}</p>
                        <p className="tracking-[0.3rem] font-semibold text-white">{expMonth}/{expYear}</p>
                    </div>
                </div>
            </div>
            <div className="ml-16 h-60 bg-cover bg-no-repeat w-full relative rounded-lg bg-[url('./assets/cardback.png')] shadow-xl">
                <div className="absolute right-16 items-center pb-3 flex h-full">
                    <p className="font-semibold tracking-[0.2rem] text-white">{cvc}</p>
                </div>
            </div>
        </div>
    )
}

export default Card

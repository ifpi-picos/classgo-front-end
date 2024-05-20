export default function Section({children}) {
    return (
        <section className="flex flex-grow flex-col justify-center items-center mt-[120px] w-1/5 bg-white text-neutral-800 2xl:w-[30%] lg:w-2/5 lg:mt-[100px] sm:w-3/5 xs:w-4/5">
            {children}
        </section>
    )
}

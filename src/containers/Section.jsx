export default function Section({children}) {
    return (
        <section className="flex flex-grow flex-col justify-center items-center mt-32 w-full z-30 bg-white text-neutral-800 xs:mt-24">
            {children}
        </section>
    )
}

export default function Section({children}) {
    return (
        <section className="flex flex-grow flex-col justify-center items-center mt-32 w-full">
            {children}
        </section>
    )
}

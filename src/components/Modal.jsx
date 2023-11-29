export default function Modal({visibleModal}) {
    if (!visibleModal) {
        return null
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center">
                <form className="w-2/5 h-96 flex flex-col justify-center items-center bg-gray-50">
                    <fieldset>
                        <span>form</span>
                    </fieldset>
                </form>
        </div>
    )
}

export default function ConfirmModal({openModal, closeModal, onSubimit, title, disabled}) {
    if (!openModal) {
        return null
    }

    return (
        <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-25">
            <form className="flex flex-col justify-center items-center w-1/4 bg-gray-50 rounded-xl" onSubmit={onSubimit}>
                <fieldset className="flex flex-col justify-center items-center w-11/12 my-4">
                    <div className="w-11/12 flex justify-center items-center mt-8 mb-4">
                        <span>{title}</span>
                    </div>

                    <div className="flex justify-evenly items-center w-full my-8">
                        <button className="bg-blue-500 px-6 py-3 text-gray-50 rounded-xl" disabled={disabled}>
                            Confirmar
                        </button>

                        <button className="bg-red-500 px-6 py-3 text-gray-50 rounded-xl" type="button" onClick={closeModal}>
                            Cancelar
                        </button>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}

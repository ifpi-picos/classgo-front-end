export default function Modal({openModal, closeModal, onChange, onSubimit, nameButton}) {

    if (!openModal) {
        return null
    }

    return (
        <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-25">
                <form className="flex flex-col justify-center items-center w-1/3 h-80 bg-gray-50 rounded-xl" onSubmit={onSubimit}>
                    <fieldset className="flex flex-col justify-evenly items-center w-11/12 h-72 rounded-xl">
                        <div>
                            <span>Nova Turma</span>
                        </div>

                        <div className="flex flex-col items-center w-4/5">
                            <input
                                className="w-full px-3 py-2 border-b-2 border-b-gray-300"
                                id="description"
                                name="description"
                                type="text"
                                placeholder="Nome da Turma"
                                minLength="3"
                                maxLength="30"
                                onChange={(e) => onChange(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex justify-evenly items-center w-4/5">
                            <button className="bg-green-500 px-6 py-3 text-gray-50 rounded-xl">
                                {nameButton}
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

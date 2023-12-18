export default function ClassModal({openModal, closeModal, title, description, onChangeDescription, totalLessons, onChangeTotalLessons, buttonBg, nameButton, onSubimit, disabled}) {

    if (!openModal) {
        return null
    }

    return (
        <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-25">
                <form className="flex flex-col justify-center items-center w-1/3 bg-gray-50 rounded-xl" onSubmit={onSubimit}>
                    <fieldset className="flex flex-col items-center w-11/12 my-12 rounded-xl">
                        <div className="mt-4">
                            <span>{title}</span>
                        </div>

                        <div className="flex flex-col items-center w-4/5 my-16">
                            <div className="flex justify-center items-center w-full mb-4">
                                <input
                                    className="w-full px-3 py-2 border-b-2 border-b-gray-300"
                                    id="description"
                                    name="description"
                                    type="text"
                                    placeholder="Nome da Turma"
                                    minLength="3"
                                    maxLength="18"
                                    value={description}
                                    onChange={(e) => onChangeDescription(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex justify-center items-center w-full">
                                <input
                                    className="w-full px-3 py-2 border-b-2 border-b-gray-300"
                                    id="totalLeassons"
                                    name="totalLeassons"
                                    type="number"
                                    placeholder="Total de Aulas"
                                    value={totalLessons}
                                    onChange={(e) => onChangeTotalLessons(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex justify-evenly items-center w-4/5 mb-4">
                            <button className={`${buttonBg} px-6 py-3 text-gray-50 rounded-xl`} disabled={disabled}>
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

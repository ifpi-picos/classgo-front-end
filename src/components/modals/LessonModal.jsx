export default function LessonModal({openModal, closeModal, title, description, onChangeDescription, date, onChangeDate, buttonBg, nameButton, onSubimit, disabled}) {
    if (!openModal) {
        return null
    }
    
    return (
        <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-25">
            <form className="flex flex-col justify-center items-center w-1/2 bg-gray-50 shadow-md rounded-xl" onSubmit={onSubimit}>
                <fieldset className="flex flex-col items-center w-11/12 my-12">
                    <div className="mt-4">
                        <span>
                            {title}
                        </span>
                    </div>

                    <div className="flex flex-col items-center w-4/5 my-16">
                        <div className="flex justify-center items-center w-full mb-8">
                            <input
                                className="w-full px-3 py-2 border-b-2 border-b-gray-300"
                                id="description"
                                name="description"
                                type="text"
                                placeholder="Descrição da Aula"
                                minLength="3"
                                maxLength="45"
                                value={description}
                                onChange={(e) => onChangeDescription(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex flex-col justify-center items-end w-full mb-4">
                            <label className="mb-4" htmlFor="date">
                                Data da Aula
                            </label>

                            <input
                                className="w-1/2 px-3 py-2 border-b-2 border-b-gray-300"
                                id="date"
                                name="date"
                                type="date"
                                value={date}
                                onChange={(e) => onChangeDate(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-end items-center w-4/5 mb-4">
                        <button className="bg-red-500 mr-12 px-4 py-3 text-gray-50 rounded-xl" type="button" onClick={closeModal}>
                            Cancelar
                        </button>

                        <button className={`${buttonBg} px-6 py-3 text-gray-50 rounded-xl`} disabled={disabled}>
                            {nameButton}
                        </button>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}

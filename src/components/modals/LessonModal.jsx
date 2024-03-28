import { HiX } from "react-icons/hi"

export default function LessonModal({title, openModal, closeModal, nextModal, description, onChangeDescription, date, onChangeDate}) {
    if (!openModal) {
        return null
    }
    
    return (
        <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-25">
            <form className="flex flex-col justify-center items-center w-1/2 bg-gray-50 shadow-md rounded-xl">
                <fieldset className="flex flex-col items-center w-11/12 mb-12">
                    <div className="flex justify-end w-full mt-6 mb-8">
                        <HiX className="cursor-pointer text-gray-500" title="Fechar" size="30" onClick={closeModal}/>
                    </div>

                    <div>
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

                    <div className="flex justify-end items-center w-4/5">
                        <button className={`bg-blue-500 px-6 py-3 text-gray-50 rounded-xl`} type="button" onClick={nextModal}>
                            Próximo
                        </button>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}

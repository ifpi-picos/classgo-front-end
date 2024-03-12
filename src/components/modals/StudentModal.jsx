export default function StudentModal({openModal, closeModal, title, name, onChangeName, buttonBg, nameButton, onSubimit, disabled}) {
    if (!openModal) {
        return null
    }

    return (
        <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-25">
            <form className="flex flex-col justify-center items-center w-1/3 bg-gray-50 rounded-xl" onSubmit={onSubimit}>
                <fieldset className="flex flex-col justify-center items-center w-11/12 my-8">
                    <div className="w-11/12 flex justify-center items-center mt-8">
                        <span>{title}</span>
                    </div>

                    <div className="flex flex-col items-center w-4/5 my-16">
                        <input
                            className="w-full px-3 py-2 border-b-2 border-b-gray-300"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Nome do Aluno"
                            minLength="3"
                            maxLength="45"
                            value={name}
                            onChange={(e) => onChangeName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex justify-evenly items-center w-4/5 mb-8">
                        <button className="bg-red-500 px-4 py-3 text-gray-50 rounded-xl" type="button" onClick={closeModal}>
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
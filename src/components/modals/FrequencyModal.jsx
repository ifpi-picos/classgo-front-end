import { HiX } from "react-icons/hi"

export default function FrequencyModal({openModal, closeModal, backModal, onSubmit, students = [], fakeFrequencies = [], frequencies = [], onChangeFrequencies, buttonBg, buttonName, disabled}) {
    if (!openModal) {
        return null
    }

    let newLessonFrequenciesConfirmed = fakeFrequencies

    const handleOnChangeNewLessonFrequency = (position) => {
        fakeFrequencies.map((frequency, index) => 
            position === index ? newLessonFrequenciesConfirmed.splice(index, 1, {studentId: frequency.studentId, presence: !frequency.presence}) : newLessonFrequenciesConfirmed.splice(index, 1, {studentId: frequency.studentId, presence: frequency.presence})
        )

        onChangeFrequencies(newLessonFrequenciesConfirmed)
    }

    const studentsList = students.map((student, index) => (
        <div key={student.id} className="flex items-center mb-4">
            <input
                className="w-4 h-4 mr-4"
                id={student.id}
                name="student"
                type="checkbox"
                onChange={() => handleOnChangeNewLessonFrequency(index)}
            />
            
            <label htmlFor={student.id}>
                {student.name}
            </label>
        </div>
    ))

    const studentsName = []

    students.map((student) => (
        frequencies.map((frequency) => (
            student.id === frequency.studentId ? studentsName.push(student.name) : null
        ))
    ))

    let editedLessonFrequenciesConfirmed = frequencies

    const handleOnChangeEditedLessonFrequency = (studentId) => {
        frequencies.map((frequency, index) => (
            frequency.studentId == studentId ? editedLessonFrequenciesConfirmed.splice(index, 1, {studentId: frequency.studentId, presence: !frequency.presence}) : editedLessonFrequenciesConfirmed.splice(index, 1, {studentId: frequency.studentId, presence: frequency.presence})
        ))

        onChangeFrequencies(editedLessonFrequenciesConfirmed)
    }

    const frequenciesList = frequencies.map((frequency, index) => (
        <div key={frequency.studentId} className="flex items-center mb-4">
            <input
                className="w-4 h-4 mr-4"
                id={frequency.studentId}
                name="frequency"
                type="checkbox"
                onChange={() => handleOnChangeEditedLessonFrequency(frequency.studentId)}
                defaultChecked={frequency.presence}
            />

            <label htmlFor={frequency.studentId}>
                {studentsName[index]}
            </label>
        </div>
    ))

    return (
        <div className="flex justify-center items-center fixed inset-0">
            <form className="flex flex-col justify-center items-center w-1/2 bg-gray-50 shadow-md rounded-xl" onSubmit={onSubmit}>
                <fieldset className="flex flex-col items-center w-11/12 mb-12">
                    <div className="flex justify-end w-full mt-6 mb-8">
                        <HiX className="cursor-pointer text-gray-500" title="Fechar" size="30" onClick={closeModal}/>
                    </div>
                    
                    <div>
                        <span>
                            Frequência
                        </span>
                    </div>

                    {students.length < 1 ? (
                        <div className="flex justify-center items-center w-3/4 h-64 my-16 overflow-x-hidden">
                            <span>Nenhum Aluno Adicionado</span>
                        </div>
                    ) : (
                        buttonName == "Registrar" ? (
                            <div className="flex flex-col w-3/4 h-64 my-16 overflow-x-hidden">
                                {studentsList}
                            </div>
                        ) : (
                            <div className="flex flex-col w-3/4 h-64 my-16 overflow-x-hidden">
                                {frequenciesList}
                            </div>
                        )
                    )}

                    <div className="flex justify-end items-center w-4/5">
                        <button className="bg-gray-500 mr-12 px-6 py-3 text-gray-50 rounded-xl" type="button" onClick={backModal}>
                            Voltar
                        </button>

                        <button className={`${buttonBg} px-6 py-3 text-gray-50 rounded-xl`} disabled={disabled}>
                            {buttonName}
                        </button>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}

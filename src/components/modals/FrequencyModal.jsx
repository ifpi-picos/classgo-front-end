import { HiX } from "react-icons/hi"

export default function FrequencyModal({openModal, closeModal, backModal, onSubmit, students = [], fakeFrequency = [], frequency = [], onChangeFrequency, buttonBg, buttonName, disabled}) {
    if (!openModal) {
        return null
    }

    let newLessonFrequencyConfirmed = fakeFrequency

    const handleOnChangeNewLessonFrequency = (position) => {
        fakeFrequency.map((value, index) => 
            position === index ? newLessonFrequencyConfirmed.splice(index, 1, {studentId: value.studentId, presence: !value.presence}) : newLessonFrequencyConfirmed.splice(index, 1, {studentId: value.studentId, presence: value.presence})
        )

        onChangeFrequency(newLessonFrequencyConfirmed)
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

    const studentsIdOffrequency = []

    frequency.map((frequency) => (
        studentsIdOffrequency.push(frequency.studentId)
    ))

    const studentsOffrequency = []

    students.map((student) => (
        studentsIdOffrequency.includes(student.id) ? studentsOffrequency.push(student) : null
    ))

    let editedLessonFrequencyConfirmed = frequency

    const handleOnChangeEditedLessonFrequency = (studentId) => {
        frequency.map((value, index) => (
            value.studentId == studentId ? editedLessonFrequencyConfirmed.splice(index, 1, {studentId: value.studentId, presence: !value.presence}) : editedLessonFrequencyConfirmed.splice(index, 1, {studentId: value.studentId, presence: value.presence})
        ))

        onChangeFrequency(editedLessonFrequencyConfirmed)
    }

    const frequencyList = frequency.map((frequency, index) => (
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
                {studentsOffrequency[index].name}
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
                                {frequencyList}
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

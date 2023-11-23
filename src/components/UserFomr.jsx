export default function Teladeperfil() {
    return (
        <div className= "flex items-center justify-center h-screen"> 
        
     
           
           <form action="entar" className="bg-white p-8 rounded shadow-md w-96">
            <div className="flex items-start justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg"  width="85" height="55"  fill="currentColor" className =" bi bi-person-fill" viewBox="0 0 16 16">
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
</svg>
            </div>
           <label htmlFor="em"> Email </label>
            <input type="email "  placeholder="Email"  id="email" className="block w-full mt-1 mb-4 p-2 border rounded"/> 
             <br />
             <label htmlFor="se"> senha</label>
            <input type="senha"  placeholder="Senha" id="senha" className="block w-full mt-1 mb-4 p-2 border rounded">
                </input> <br />
            <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded-full mb-4 "> Salvar  </button>
            <button type="subt" className="bg-red-500 text-white py-2 px-6 rounded-full ml-4"> Cancelar </button>

           </form>


        
        </div>
    )
}
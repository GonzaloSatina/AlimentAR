import React, { useState } from 'react'
function CreateCrowdfund({toggleModal}) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [target, setTarget] = useState(0)
  const [showNotification, setShowNotification] = useState(false)
  const handleSubmit = (event) => {
    event.preventDefault()
    window.contract.add_crowdfund({title:title, donate:target * 1, description:description})
    setShowNotification(!showNotification)
    alert(`crowdfund info: ${title} ${target} ${description}`)
  }
console.log(`its ${toggleModal}`);
  return (
    <div>
      {toggleModal == true && (
        <div className='addcrowdfund'>
          <form onSubmit={handleSubmit}>
            <label>
            Ingrese el título del proyecto:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label>
            Introduce el objetivo de la donación:
              <input
                type="number"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              />
            </label>
            <label>
            Introduzca la descripción del proyecto:
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <input type="submit" className='submit' />
          </form>
        </div>
      )}
      
      {showNotification && <Notification />}
    </div>
    
  )
}
function Notification() {
  return (
    <aside>
      <footer>
        <div>✔ Logrado </div> 
        <div>Nuevo proyecto añadido</div>
      </footer>
    </aside>
  )
}
export default CreateCrowdfund
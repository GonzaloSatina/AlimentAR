import React, { useState } from 'react'
const ONE_NEAR = 1_000_000_000_000_000_000_000_000
function ListCrowdfunds({ project }) {
  const [donationAmount, setDonationAmount] = useState(0)
  const [showDonateNotification, setShowDonateNotification] = useState(false)
  function donate(e) {
    e.preventDefault()
    console.log(donationAmount)
    window.contract.add_donation({ id: project.id, amount: donationAmount * 1 })
    setShowDonateNotification(!showDonateNotification)
  }
  return (
    <div className="project">
      <h2>{project.title}</h2>{' '}
      <span className="creator">{project.creator}</span>
      <h3>descripcion:</h3>
      <p>{project.description}</p>
      <h4>Objetivo: {project.donation_target} NEAR</h4>
      <h4>Votos: {project.total_votes}</h4>
      <button
        onClick={() => {
          window.contract.add_vote({ id: project.id })
        }}
      >
        Vote
      </button>
      <h4>Donaciones totales: {project.total_donations / ONE_NEAR} NEAR</h4>
      <form onSubmit={donate}>
        <input
          type="number"
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
        ></input>
        <button onClick={donate}>Donar</button>
      </form>
      {showDonateNotification && <DonateNotification />}
    </div>
  )
}
function DonateNotification() {
  return (
    <aside>
      <footer>
        <div>✔ Logrado </div>
        <div>La donación fue exitosa</div>
      </footer>
    </aside>
  )
}
export default ListCrowdfunds
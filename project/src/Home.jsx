import Footer from "./Footer.jsx"

function Home() {
  return (
    <>
      {/* Simple Welcome Section */}
      <div style={{ textAlign: 'center', padding: '6rem 2rem', color: 'white', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>
          Welcome to <span style={{ color: '#38bdf8' }}>HoodTech PC</span>
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Your trusted partner for custom gaming PCs, high-performance workstations, and computer components.
        </p>
      </div>

      <Footer />
    </>
  )
}

export default Home
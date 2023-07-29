import { useState, useEffect } from 'react'
import { Octokit } from 'octokit'

import './App.css'
import About from './components/About/About'
import Projects from './components/Projects/Projects'


function App() {
  const [screen, setScreen] = useState(1)
  const [active, setActive] = useState(1)
  const [repositories, setRepositories] = useState([])

  async function getRepos() {
      const octokit = new Octokit({
          auth: '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'
      })

      const res = await octokit.request('GET /users/{username}/repos', {
          username: 'DevSirHitsuji', 
          headers: {
              'X-Github-Api-Version': '2022-11-28' 
          }
      })
      console.log(res.data)
      setRepositories(res.data)
  }
  useEffect(() => {
      getRepos()
  }, [])

  return (
    <>
      <div className='fix-menu'>
        <header className='h-wellcome'>Wellcome to my world</header>
        <div className='menu'>
          <button className={`btn-about ${active ? " active" : ""}`} onClick={() => {
            setScreen(1)
            setActive(1)
            }}>About</button>
          <button className={`btn-projects ${active ? "" : " active"}`} onClick={() => {
            setScreen(0)
            setActive(0)
            }}>Projects</button>
        </div>
      </div>
      {screen ? <About/> : <Projects repositories={repositories}/>}

      <footer>
        <p>made by Gustavo Silva</p>
      </footer>
    </>
  )
}

export default App
 
import CompanionCard from "@/components/companionCard"
import CompanionList from "@/components/companionLists"
import Cta from "@/components/CTA"
import { recentSessions } from "@/constants"

const Page = () => {
  return (
    <main>
      <h1 className=''>Popular Companions</h1>

      <section className='home-section'>
        <CompanionCard
          id='123'
          name="Neura the brainy explorer"
          topic="Neural Network of the brain"
          subject="Science"
          duration={45}
          color="#ffda6e"
        />
        <CompanionCard
          id='124'
          name="Neura the brainy explorer"
          topic="Neural Network of the brain"
          subject="Science"
          duration={45}
          color="#ffda6e"
        />
        <CompanionCard
          id='125'
          name="Neura the brainy explorer"
          topic="Neural Network of the brain"
          subject="Science"
          duration={45}
          color="#ffda6e"
        />
      </section>

      <section className="home-section">
        <CompanionList
          title="Recently completed sessions"
          companions={recentSessions}
          classNames='w-2/3 max-lg:w-full' 
        />
        <Cta/>
      </section>
    </main>
  )
}

export default Page
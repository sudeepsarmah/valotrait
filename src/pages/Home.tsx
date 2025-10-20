import '@/css/Home.css'
import Button from '@/components/Button'
import { NavLink } from "react-router-dom"

export default function Home() {
    return (
        <section className="home-content">
            <div className='heading-section'>
                <h4 className='semi-title-heading'>Want to know why your teammates are frustated with you?</h4>
                <h1 className='title-heading'>Find your Valorant Personality Today</h1>
                {/* Mobile-priority Take Test button */}
                <div className="mobile-take-test">
                    <NavLink to="/questions">
                        <Button text="Take Test" className="get-started-btn" />
                    </NavLink>
                </div>
                <p className='heading-text'>Understand why your teammates don't like you. Is it because you don't listen to comms, or always found lurking when your team is entering a site? Evaluate your playstyle today and find out about your Valorant Personality out of the 16 types</p>
            </div>
            <div className='cta-section'>
                <p className='cta-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae sed provident ducimus, placeat unde nobis impedit incidunt maiores quam est expedita nostrum, at cupiditate numquam ab voluptatum error tempora perspiciatis!</p>
                <div className='cta-btns'>
                    {/* Same button stays here too for desktop */}
                    <NavLink to="/questions">
                        <Button text="Take Test" className="get-started-btn" />
                    </NavLink>
                    <NavLink to="/personalities">
                        <Button text="Read about the Personalities" className="read-personalities-btn" />
                    </NavLink>
                </div>
            </div>
            <div className='workflow-section-heading'>
                <h2 className='workflow-heading'>How it works <i className='bx  bxs-arrow-s-right'  ></i> </h2>
            </div>
            <div className='workflow-section'>
                <p><i className='bx-fw  bxs-test-tube'  ></i>Take the test consisting of 44 questions</p>
                <p><i className='bx-fw  bxs-chart-spline'  ></i> Find your strengths and flaws</p>
                <p><i className='bx-fw  bxs-fingerprint'  ></i> Get your Valorant Personality type out of the 16 types</p>
                <p><i className='bx-fw  bxs-share'  ></i> Share or download your results</p>
            </div>
        </section>
    )
}
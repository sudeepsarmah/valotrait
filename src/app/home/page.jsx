import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="flex flex-col">
        <div className="flex flex-col">
          <h1>ValoTraits</h1>
          <h3>Find your valorant personality</h3>
        </div>
        <p className="cta">
          <Link href={"/quiz"} className="cta-text">
            Take the quiz
          </Link>
        </p>
      </section>

      <div className="grid grid-cols-4 gap-4 mt-4">
        <div className="personalities">The Headshot Spear</div>
        <div className="personalities">The Last Bullet Hero</div>
        <div className="personalities">The Ghost Blade</div>
        <div className="personalities">The Shadow Clutcher</div>
        <div className="personalities">The Firestarter</div>
        <div className="personalities">The Guardian Wolf</div>
        <div className="personalities">The Silent Anchor</div>
        <div className="personalities">The Unseen Snare</div>
        <div className="personalities">The Master Charge</div>
        <div className="personalities">The Post-Plant General</div>
        <div className="personalities">The Mind Stalker</div>
        <div className="personalities">The Patient Predator</div>
        <div className="personalities">The Lightning Caller</div>
        <div className="personalities">The Iron Shepherd</div>
        <div className="personalities">The Trap Weaver</div>
        <div className="personalities">The Ice Vein</div>
      </div>

      <section className="grid grid-cols-3 gap-6 mt-6">
        <div>
          <h4>Take the test</h4>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Voluptatibus facilis hic exercitationem debitis possimus enim, cum
            libero reprehenderit odio velit explicabo animi maxime impedit ab
            officia minus consequatur dicta placeat.
          </p>
        </div>
        <div>
          <h4>Get your type</h4>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Voluptatibus facilis hic exercitationem debitis possimus enim, cum
            libero reprehenderit odio velit explicabo animi maxime impedit ab
            officia minus consequatur dicta placeat.
          </p>
        </div>
        <div>
          <h4>Share your results</h4>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Voluptatibus facilis hic exercitationem debitis possimus enim, cum
            libero reprehenderit odio velit explicabo animi maxime impedit ab
            officia minus consequatur dicta placeat.
          </p>
        </div>
      </section>
    </>
  );
}

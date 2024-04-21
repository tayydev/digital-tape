# TRY SETTR PRO YOURSELF
https://settr.pro
## Inspiration
Whitt and I love climbing at the William & Mary Rec Center rock climbing wall. But, we are frusturated by how the colored tape that is used to indicate different climbing routes constantly falls off. Students trying to climb at the wall are playing a constant guessing game of figuring out where tape is missing, or how routes were supposed to be set.
## What it does
Settr Pro provides tools to digitally mark how certain rock climbing routes are supposed to be taped, so that when the tape goes missing, there exists an authoritative source of truth. Settr Pro also increases the accessiblility of creating brand new routes for the W&M rec center wall; if someone has an idea for a climbing route, they can sketch it up digitally without having to have the experience and connections necessary to set a physical route.
## How we built it
Settr Pro is build with React/Next.js with MUI components. We use Cloudflare for DNS.
## Challenges we ran into
- Pixel math for route maps (in resizable windows)
- Styling issues for supporting a wide variety of different devices
## Accomplishments that we're proud of
Settr Pro is completely functional, and already set up to scale to more walls and more routes. Building new routes is straightforward and intuitive and saved routes can be easily viewed on mobile devices.
## What we learned
- Next.js is deeply featured and very cool, but it has so many features that all solve slightly different problems to the point it was confusing
- Prioritizing the skeleton of a project before polishing is helpful for mental focus/time management
- When trying to style css down to the pixel level (to draw route holds), there are a lot of challenges
- Centering a div is the 2nd hardest problem is cs behind the halting problem and off by one errors
## What's next for Settr Pro
- Show the app to other fellow climbers and get feedback
- Build out a bunch more walls/routes
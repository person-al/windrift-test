import { C, R, Section, Chapter, Nav } from 'core/components'
import useInventory from 'core/hooks/use-inventory'
import { PageType } from 'core/types'
import ChapterPage from './ChapterPage'

export const Page: PageType = () => {
    // Handle the stuff from chapter 1
    const [locationChoice] = useInventory(['locationChoice'])

    return (
        <ChapterPage>
            <Chapter filename="chapter2">
                <Section>
                    <p>
                        You lock the front door behind you quietly and take a deep breath, enjoying
                        the brisk night air. The mythical shop only pops up in liminal spaces, the
                        stories say, places where time doesn't feel real. Where your soul is primed
                        to shift from one plane to the next. You've searched many such places in the
                        last year, from thundering waterfalls to the florescent lights of Target on
                        Black Friday.
                    </p>
                    <p>
                        Today you {locationChoice ? 'feel like checking ' : 'can check either '}
                        <C
                            options={[
                                [
                                    'the subway platform',
                                    'the Waffle House parking lot',
                                    'the woods behind town'
                                ]
                            ]}
                            tag="locationChoice"
                        />
                        .
                    </p>
                </Section>
                <Section>
                    <R
                        tag="locationChoice"
                        options={{
                            subway: (
                                <>
                                    <p>
                                        The subway platform near your house isn't deserted, but it
                                        may as well be. Some sleep on the benches, bundled in
                                        blankets. Those few awake stare ahead, listlessly,
                                        uninterested in your soft footsteps.
                                    </p>
                                    <p>
                                        To your left, the train tracks. To your right, a series of
                                        pillars holding the roof above your head. Out of the corner
                                        of your eye, at the far edge of the platform, a soft green
                                        light flickers.
                                    </p>
                                </>
                            ),
                            waffle: (
                                <>
                                    <p>
                                        The Waffle House is unsurprisingly packed. Highschoolers on
                                        illicit late-night hangs, night workers on their 'lunch'
                                        break. But the parking lot is quiet. You sit on the hood of
                                        your car, surveying the landscape.
                                    </p>
                                    <p>
                                        Around you is a spattering of cars, the occasional dim
                                        streetlight. Not many areas for a magical shop to appear
                                        unnoticed. Except maybe.... you notice that the parking lot
                                        extends behind the Waffle House. And you can't quite see
                                        around the corner of the building.
                                    </p>
                                </>
                            ),
                            woods: (
                                <>
                                    <p>
                                        You've been to the woods before, but you haven't finished
                                        searching. You've exhausted the right-hand path: the one
                                        overgrown with vines and moss. The left-hand path, the one
                                        well-worn from hikers' boots remains unexplored. You had to
                                        get to it at some point. At least right now, there's no
                                        chance of hikers.
                                    </p>
                                    <p>
                                        You tread along for a few minutes, your phone out for light
                                        as you scan the horizon for anything out of the ordinary.
                                        Finally, you turn your phone off, letting the moonlight
                                        guide you instead. The darkness is nearly suffocating: you
                                        imagine any number of predators watching you from the dark.
                                        Just when you're ready to turn your phone back on, a shimmer
                                        catches your eye.
                                    </p>
                                </>
                            )
                        }}
                    />
                    <p>
                        You <C options={[['head towards it.']]} tag="chapter2-1" />
                    </p>
                </Section>
                <Section>
                    <R
                        tag="locationChoice"
                        options={{
                            subway: (
                                <>
                                    <p>
                                        It's coming from behind a pillar near the front of the
                                        platform. A man sleeps on a bench nearby and doesn't seem to
                                        notice. You walk as quietly and quickly as you can, not
                                        wanting to draw attention to yourself or the light.
                                    </p>
                                    <p>
                                        As you come towards it the light brightens, then goes out
                                        completely. You break into a jog. Right there, where the
                                        light used to be, is a circular wooden door.
                                    </p>
                                    <p>
                                        It's bright green, with a brass knob. There seems to be
                                        nothing behind it: it's just a circle of wood floating in
                                        midair. You have no time to waste.
                                    </p>
                                </>
                            ),
                            waffle: (
                                <>
                                    <p>
                                        You walk casually around the building: at first all you can
                                        see is more parking lot coming into view.
                                    </p>
                                    <p>And then you see it.</p>
                                    <p>
                                        Floating in mid-air, right next to a white Honda Civic is a
                                        door. A bright yellow, wooden door: rectangular with a long
                                        black handle. There seems to be nothing behind it, just the
                                        door itself. You have no time to waste.
                                    </p>
                                </>
                            ),
                            woods: (
                                <>
                                    <p>
                                        Right off the path is a lake, still as a mirror. You'd never
                                        heard of a lake on this path, granted you hadn't hiked it
                                        yourself before. Could it be a mirage? No, not in the dark.
                                    </p>
                                    <p>
                                        In the moonlight you see a small family of skunks drinking
                                        from the lake. You watch them from a distance, not wanting
                                        to disturb them. As they finally scurry off, you turn around
                                        and immediately bump your head on something hard.
                                    </p>
                                    <p>
                                        It's a wooden door, short and square. Blue with a
                                        rose-shaped ceramic handle. There seems to be nothing behind
                                        it: just a door floating in mid-air. You have no time to
                                        waste.
                                    </p>
                                </>
                            )
                        }}
                    />
                    <Nav text="You open the door." next="chapter3" />
                </Section>
            </Chapter>
        </ChapterPage>
    )
}

import * as React from 'react'
import { Nav, Section, Chapter, When } from 'core/components'
import { Next, PageType } from 'core/types'
import useInventory from 'core/hooks/use-inventory'
import { useDispatch } from 'react-redux'
import { makeChoice } from 'core/features/choice'
import { AnyAction } from 'redux'
import { Button } from '@chakra-ui/button'
import ChapterPage from './ChapterPage'
import { useBlockchainContext } from 'stories/src/components/BlockchainContext'
import { MintModal } from 'stories/src/components/MintModal'
import { Link } from '@chakra-ui/layout'
import { CONTRACT_INFO } from 'stories/src/constants'

export const Page: PageType = () => {
    const dispatch = useDispatch()
    const [wantToBuy] = useInventory(['wantToBuy'])
    const { signer, contractConnection, chainId } = useBlockchainContext()
    const [gemsRemain, setGemsRemain] = React.useState<boolean>(true)
    const [hasMinted, setHasMinted] = React.useState<boolean>(false)
    const [mintSuccess, setMintSuccess] = React.useState<boolean>(false)

    React.useEffect(() => {
        contractConnection &&
            contractConnection
                .totalMinted()
                .then((result: number) => {
                    setGemsRemain(result < 7)
                })
                .catch((err: Error) => {
                    console.log(err)
                })
    }, []) // only check on first render

    React.useEffect(() => {
        // don't check if there is no signer or we just successfully minted
        if (!signer || signer.length == 0 || mintSuccess) {
            return
        }
        contractConnection &&
            contractConnection
                .totalMintedTo(signer)
                .then((result: number) => {
                    setHasMinted(result > 0)
                })
                .catch((err: Error) => {
                    console.log(err)
                })
    }, [signer])

    return (
        <ChapterPage>
            <Chapter filename="chapter5">
                <Section>
                    {wantToBuy === 'Yes' && <p>"I'm sure."</p>}
                    {wantToBuy === 'no' && (
                        <>
                            <p>
                                "Hm...you're right. Maybe they'd be better off with someone else.
                                What else do you have?"
                            </p>
                            <p>
                                She smiles at you, her sharp teeth glistening in the dim light.
                                "You're not ready, child. That is okay. Come back another day,
                                perhaps. My collection is always growing. Someday I'll have exactly
                                what you need, I feel it in my bones."
                            </p>
                            <p>
                                You thank her quickly and <Nav text="leave" next="chapter6" />. You
                                get the sense you're lucky she's not offended.
                            </p>
                        </>
                    )}

                    {!signer && wantToBuy === 'Yes' && (
                        <p>
                            <i>Psst! Connect your wallet above.</i>
                        </p>
                    )}

                    {/*Wants to buy and gems are available*/}
                    <When condition={wantToBuy === 'Yes' && signer && !hasMinted && gemsRemain}>
                        <>
                            <p>
                                With a snap of her finders, The Shopkeeper stretches out her palm to
                                reveal a small wooden box covered in unintelligble symbols. She
                                opens it to reveal a small, dim gem. It looks pale and dusty, almost
                                translucent.
                            </p>

                            <When
                                condition={mintSuccess}
                                otherwise={
                                    <div>
                                        <MintModal
                                            onSuccess={() => {
                                                setMintSuccess(true)
                                            }}
                                            onError={(err: string) => {
                                                if (err.includes('user rejected transaction')) {
                                                    dispatch(
                                                        makeChoice(
                                                            'wantToBuy',
                                                            'no',
                                                            Next.None
                                                        ) as unknown as AnyAction
                                                    )
                                                    return
                                                }
                                            }}
                                        />{' '}
                                        <Button
                                            onClick={() => {
                                                dispatch(
                                                    makeChoice(
                                                        'wantToBuy',
                                                        'no',
                                                        Next.None
                                                    ) as unknown as AnyAction
                                                )
                                            }}>
                                            Nevermind
                                        </Button>
                                    </div>
                                }>
                                <p>
                                    "When I first took the gems," she said, stroking her frilly
                                    fingers across its surface, "They glowed so beautifully. They
                                    faded with age. I'm not sure they remember their past anymore."
                                </p>
                                <p>
                                    But as she places the gem in your out-stretched palm, it begins
                                    to glow, taking on a shiny red hue. Like a glistening ruby.
                                </p>
                                <p>
                                    "Hah!" The Shopkeeper barks. "I suppose you just needed a little
                                    adventure, huh?" She smiles up at you, her sharp teeth looking
                                    more friendly than before. "It was a pleasure doing business
                                    with you. You're welcome back any time."
                                </p>
                                <p>
                                    "Thank you," you bow deeply before turning to{' '}
                                    <Nav text="open the door" next="chapter6" />. "This was truly a
                                    magical experience. I will take care of it well."
                                </p>
                            </When>
                        </>
                    </When>
                    {/*Wants to buy and gems are not available*/}
                    <When condition={wantToBuy === 'Yes' && signer && !hasMinted && !gemsRemain}>
                        <p>
                            Funny, you're not the first to come in asking about that. Unfortunately,
                            the gems are gone. Though perhaps by now{' '}
                            <Link color="cyan.500" href={CONTRACT_INFO[chainId].openSeaLink}>
                                other merchants
                            </Link>{' '}
                            have found them.
                        </p>
                    </When>
                    {/*Wants to buy but has already minted*/}
                    <When condition={wantToBuy === 'Yes' && signer && hasMinted}>
                        <p>
                            "No, no. We've done business already. The gems came from 7 and must go
                            to 7. Though perhaps{' '}
                            <Link color="cyan.500" href={CONTRACT_INFO[chainId].openSeaLink}>
                                others
                            </Link>{' '}
                            are less principled than I. I have nothing else for you!"
                        </p>
                        <p>
                            You thank her quickly and <Nav text="leave" next="chapter6" /> before
                            her mood sours further.
                        </p>
                    </When>
                </Section>
            </Chapter>
        </ChapterPage>
    )
}
